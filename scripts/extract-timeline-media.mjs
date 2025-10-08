#!/usr/bin/env node

import { mkdir, readdir, stat, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import exifr from 'exifr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const TIMELINE_DIR = path.join(projectRoot, 'public', 'timeline');
const OUTPUT_PATH = path.join(projectRoot, 'public', 'data', 'timeline-media.json');
const OVERRIDES_PATH = path.join(projectRoot, 'public', 'data', 'timeline-overrides.json');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif']);
const MIME_BY_EXTENSION = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.heic': 'image/heic',
  '.heif': 'image/heif',
};

async function collectImagePaths(dir, prefix = '') {
  const entries = await readdir(path.join(dir, prefix), { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const relPath = path.join(prefix, entry.name);
    if (entry.isDirectory()) {
      results.push(...await collectImagePaths(dir, relPath));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(ext)) {
      continue;
    }

    results.push(relPath.replace(/\\/g, '/'));
  }

  return results;
}

function createMediaId(input) {
  return crypto.createHash('md5').update(input).digest('hex');
}

function toISO(value) {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

function toNullableNumber(value) {
  if (value == null) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (Array.isArray(value) && value.length === 2 && value[1]) {
    return value[0] / value[1];
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeExposure(exposureTime) {
  if (exposureTime == null) return null;

  const number = toNullableNumber(exposureTime);
  if (!number || number <= 0) {
    return typeof exposureTime === 'string' ? exposureTime : null;
  }

  if (number >= 1) {
    return Number(number.toFixed(4).replace(/\.0+$/, ''));
  }

  const denominator = Math.round(1 / number);
  return `1/${denominator}`;
}

function normalizeKeywords(rawKeywords) {
  if (!rawKeywords) return [];
  if (Array.isArray(rawKeywords)) {
    return rawKeywords
      .flatMap((item) => (typeof item === 'string' ? item.split(',') : []))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof rawKeywords === 'string') {
    return rawKeywords
      .split(/[,;\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

async function loadOverrides() {
  try {
    const raw = await readFile(OVERRIDES_PATH, 'utf8');
    const overrides = JSON.parse(raw);
    if (!Array.isArray(overrides)) {
      console.warn('[extract-timeline-media] overrides 파일이 배열이 아닙니다. 무시합니다.');
      return [];
    }

    return overrides;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    console.warn(`[extract-timeline-media] overrides 파일을 읽는 중 오류: ${error.message}`);
    return [];
  }
}

function applyOverride(record, override) {
  if (!override) return record;

  const { location, camera, dimensions, settings, ...rest } = override;
  Object.assign(record, rest);

  if (location) {
    record.location = {
      ...record.location,
      ...location,
    };
  }

  if (camera) {
    record.camera = {
      ...record.camera,
      ...camera,
    };
  }

  if (dimensions) {
    record.dimensions = {
      ...record.dimensions,
      ...dimensions,
    };
  }

  if (settings) {
    record.settings = {
      ...record.settings,
      ...settings,
    };
  }
}

async function ensureOutputDir() {
  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
}

async function main() {
  console.time('[extract-timeline-media] 완료까지');

  const imagePaths = await collectImagePaths(TIMELINE_DIR);
  const overrides = await loadOverrides();
  const overrideIndex = new Map();

  for (const item of overrides) {
    if (!item) continue;
    const key = item.id || item.mediaId || item.src;
    if (!key) continue;
    overrideIndex.set(key, item);
  }

  const records = [];

  for (const relativePath of imagePaths.sort((a, b) => a.localeCompare(b))) {
    const absolutePath = path.join(TIMELINE_DIR, relativePath);
    const src = `/timeline/${relativePath}`;
    const id = createMediaId(src);
    const fileStats = await stat(absolutePath);

    let exif = null;
    try {
      exif = await exifr.parse(absolutePath, {
        tiff: true,
        ifd0: true,
        exif: true,
        gps: true,
      });
    } catch (error) {
      console.warn(`[extract-timeline-media] EXIF 파싱 실패 (${relativePath}): ${error.message}`);
    }

    const record = {
      id,
      src,
      fileName: path.basename(relativePath),
      relativePath,
      extension: path.extname(relativePath).toLowerCase(),
      mimeType: MIME_BY_EXTENSION[path.extname(relativePath).toLowerCase()] ?? 'application/octet-stream',
      fileSize: fileStats.size,
      fileCreatedAt: toISO(fileStats.birthtime),
      fileModifiedAt: toISO(fileStats.mtime),
      capturedAt: toISO(exif?.DateTimeOriginal || exif?.CreateDate || exif?.ModifyDate),
      camera: {
        make: exif?.Make ?? null,
        model: exif?.Model ?? null,
        lensModel: exif?.LensModel ?? null,
      },
      location: {
        latitude: typeof exif?.latitude === 'number' ? exif.latitude : toNullableNumber(exif?.GPSLatitude),
        longitude: typeof exif?.longitude === 'number' ? exif.longitude : toNullableNumber(exif?.GPSLongitude),
        altitude: toNullableNumber(exif?.GPSAltitude),
      },
      dimensions: {
        width: toNullableNumber(exif?.ExifImageWidth ?? exif?.PixelXDimension ?? exif?.ImageWidth),
        height: toNullableNumber(exif?.ExifImageHeight ?? exif?.PixelYDimension ?? exif?.ImageHeight),
      },
      orientation: toNullableNumber(exif?.Orientation),
      keywords: normalizeKeywords(exif?.Keywords ?? exif?.tags ?? exif?.subjects),
      settings: {
        iso: toNullableNumber(exif?.ISO),
        exposureTime: normalizeExposure(exif?.ExposureTime ?? exif?.ShutterSpeedValue),
        fNumber: toNullableNumber(exif?.FNumber ?? exif?.ApertureValue),
        focalLength: toNullableNumber(exif?.FocalLength),
      },
      metadataSource: {
        capturedAt: exif?.DateTimeOriginal ? 'exif:DateTimeOriginal' : exif?.CreateDate ? 'exif:CreateDate' : exif?.ModifyDate ? 'exif:ModifyDate' : 'file:mtime',
      },
    };

    const override = overrideIndex.get(id) || overrideIndex.get(src) || overrideIndex.get(relativePath);
    applyOverride(record, override);

    if (!record.capturedAt) {
      record.capturedAt = toISO(fileStats.mtime);
      record.metadataSource.capturedAt = 'file:mtime';
    }

    if (record.location.latitude == null || record.location.longitude == null) {
      record.location = {
        latitude: record.location.latitude ?? null,
        longitude: record.location.longitude ?? null,
        altitude: record.location.altitude ?? null,
      };
    }

    record.keywords = Array.from(new Set(record.keywords)).sort((a, b) => a.localeCompare(b));

    records.push(record);
  }

  await ensureOutputDir();
  await writeFile(OUTPUT_PATH, `${JSON.stringify(records, null, 2)}\n`, 'utf8');

  console.log(`[extract-timeline-media] ${records.length}개의 사진 메타데이터를 ${path.relative(projectRoot, OUTPUT_PATH)}에 저장했습니다.`);
  console.timeEnd('[extract-timeline-media] 완료까지');
}

main().catch((error) => {
  console.error('[extract-timeline-media] 실행 실패', error);
  process.exitCode = 1;
});
