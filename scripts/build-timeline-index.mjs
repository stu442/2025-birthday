#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const POSTS_PATH = path.join(projectRoot, 'public', 'data', 'timeline.json');
const MEDIA_PATH = path.join(projectRoot, 'public', 'data', 'timeline-media.json');
const OUTPUT_PATH = path.join(projectRoot, 'public', 'data', 'timeline-entries.json');

function createSlug(input) {
  return input
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function createPostId(post, index) {
  if (post.id && typeof post.id === 'string') {
    return post.id;
  }
  const datePart = post.date ?? `entry-${index}`;
  const titlePart = post.title ? createSlug(post.title) : '';
  const safeTitle = titlePart || `timeline-${index}`;
  return `${datePart}-${safeTitle}`;
}

function summarizeMediaMetadata(media) {
  if (!media) return null;
  const {
    id,
    src,
    capturedAt,
    location,
    camera,
    settings,
  } = media;
  return {
    id,
    src,
    capturedAt,
    location,
    camera,
    settings,
  };
}

function pickEntryLocation(mediaList) {
  for (const media of mediaList) {
    if (media && media.location && media.location.latitude != null && media.location.longitude != null) {
      return {
        latitude: media.location.latitude,
        longitude: media.location.longitude,
        altitude: media.location.altitude ?? null,
        mediaId: media.id,
      };
    }
  }
  return null;
}

async function main() {
  const rawPosts = await readFile(POSTS_PATH, 'utf8');
  const rawMedia = await readFile(MEDIA_PATH, 'utf8');
  const posts = JSON.parse(rawPosts);
  const mediaItems = JSON.parse(rawMedia);

  if (!Array.isArray(posts)) {
    throw new Error('timeline.json must be an array');
  }
  if (!Array.isArray(mediaItems)) {
    throw new Error('timeline-media.json must be an array');
  }

  const mediaBySrc = new Map();
  const mediaById = new Map();

  for (const media of mediaItems) {
    mediaBySrc.set(media.src, media);
    mediaById.set(media.id, media);
  }

  const entries = posts.map((post, index) => {
    const postId = createPostId(post, index);
    const gallery = [];
    const missingMedia = [];

    for (const media of post.media ?? []) {
      if (!media || typeof media !== 'object') continue;
      if (!media.src) {
        gallery.push({ ...media, mediaId: null });
        continue;
      }

      const matched = mediaBySrc.get(media.src);
      if (!matched) {
        missingMedia.push(media.src);
        gallery.push({ ...media, mediaId: null });
        continue;
      }

      gallery.push({
        ...media,
        mediaId: matched.id,
        metadata: summarizeMediaMetadata(matched),
      });
    }

    if (missingMedia.length > 0) {
      console.warn(`[build-timeline-index] 매칭되지 않은 미디어가 있습니다 (${postId}):`, missingMedia.join(', '));
    }

    const mediaIds = gallery
      .map((item) => item.mediaId)
      .filter((value) => typeof value === 'string');

    const linkedMedia = mediaIds
      .map((id) => mediaById.get(id))
      .filter(Boolean);

    return {
      id: postId,
      title: post.title ?? null,
      subtitle: post.subtitle ?? null,
      date: post.date ?? null,
      tags: post.tags ?? [],
      description: post.description ?? [],
      media: gallery,
      mediaIds,
      primaryMediaId: mediaIds[0] ?? null,
      location: pickEntryLocation(linkedMedia),
    };
  });

  await writeFile(OUTPUT_PATH, `${JSON.stringify(entries, null, 2)}\n`, 'utf8');
  console.log(`[build-timeline-index] ${entries.length}개의 타임라인 엔트리를 ${path.relative(projectRoot, OUTPUT_PATH)}에 저장했습니다.`);
}

main().catch((error) => {
  console.error('[build-timeline-index] 실행 실패', error);
  process.exitCode = 1;
});
