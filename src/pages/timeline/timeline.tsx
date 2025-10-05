import { useEffect, useMemo, useState } from "react";

import superMilk from "@/assets/super_milk.png";
import magicCrystals from "@/assets/magic_crystals.png";
import human from "@/assets/human.jpeg";
import myself from "@/assets/myself.jpeg";
import TimelinePost from "./components/timeline-post";

const TIMELINE_DATA_URL = `${import.meta.env.BASE_URL}data/timeline.json`;

const imageMap = {
  superMilk,
  magicCrystals,
  human,
  myself,
} as const;

type ImageKey = keyof typeof imageMap;

interface TimelinePostJson {
  title: string;
  subtitle: string;
  description: string[];
  images: Array<{ id: ImageKey; alt: string }>;
}

export default function Timeline() {
  const [posts, setPosts] = useState<TimelinePostJson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await fetch(TIMELINE_DATA_URL);
        if (!response.ok) {
          throw new Error(`타임라인 데이터를 불러오지 못했습니다. (${response.status})`);
        }

        const data = (await response.json()) as TimelinePostJson[];
        setPosts(data);
      } catch (fetchError) {
        console.error(fetchError);
        setError("타임라인을 불러오는 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  const resolvedPosts = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      images: post.images.reduce<Array<{ src: string; alt: string }>>(
        (acc, { id, alt }) => {
          const src = imageMap[id];
          if (src) {
            acc.push({ src, alt });
          }
          return acc;
        },
        []
      ),
    }));
  }, [posts]);

  return (
    <div className="flex w-full flex-col items-center gap-12 px-6 py-12 text-white">
      <header className="flex w-full max-w-2xl flex-col gap-3 text-left">
        <h1 className="text-3xl font-bold text-white">타임라인</h1>
        <p className="text-sm text-white/70">
          연휴 동안 심심해서 만든 신기능이에요. 저희 모일 때마다 여기에 기록을 해볼거에요. 블로그처럼.
        </p>
      </header>

      {isLoading && (
        <p className="text-sm text-white/60">타임라인을 준비 중입니다...</p>
      )}

      {error && !isLoading && (
        <p className="text-sm text-red-300">{error}</p>
      )}

      {!isLoading && !error && (
        <div className="flex w-full flex-col items-center gap-10">
          {resolvedPosts.map((post) => (
            <TimelinePost
              key={`${post.title}-${post.subtitle}`}
              title={post.title}
              subtitle={post.subtitle}
              description={post.description}
              images={post.images}
            />
          ))}
        </div>
      )}
    </div>
  );
}
