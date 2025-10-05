import { useEffect, useMemo, useState } from "react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TimelinePostProps {
  title: string;
  subtitle: string;
  date: string;
  description: string[];
  media: Array<{
    type: "image" | "video";
    src: string;
    alt: string;
    poster?: string;
  }>;
  tags?: string[];
}

export default function TimelinePost({
  title,
  subtitle,
  date,
  description,
  media,
  tags = [],
}: TimelinePostProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = media.length;
  const hasMultipleSlides = totalSlides > 1;

  const formattedDate = useMemo(() => {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  }, [date]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCurrentIndex(carouselApi.selectedScrollSnap());

    const handleSelect = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", handleSelect);
    carouselApi.on("reInit", handleSelect);

    return () => {
      carouselApi.off("select", handleSelect);
      carouselApi.off("reInit", handleSelect);
    };
  }, [carouselApi]);

  return (
    <article className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg backdrop-blur">
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <header className="flex flex-col gap-2 text-left">
          <time
            className="text-xs uppercase tracking-widest text-white/60"
            dateTime={date}
          >
            {formattedDate}
          </time>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          {subtitle && (
            <span className="text-sm text-white/70">{subtitle}</span>
          )}
          {tags.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-lime-300/10 px-3 py-1 text-xs font-medium text-lime-200"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        {totalSlides > 0 && (
          <div className="relative pb-8">
            <Carousel
              className="relative"
              opts={{ loop: totalSlides > 1 }}
              setApi={setCarouselApi}
            >
              <CarouselContent>
                {media.map((item, index) => (
                  <CarouselItem
                    key={`${item.alt}-${index}`}
                    className="overflow-hidden"
                  >
                    <div className="aspect-square w-full overflow-hidden rounded-2xl bg-black/40">
                      {item.type === "image" ? (
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <video
                          controls
                          playsInline
                          className="h-full w-full object-cover"
                          poster={item.poster}
                        >
                          <source src={item.src} type="video/mp4" />
                          {item.alt}
                        </video>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {hasMultipleSlides && (
                <>
                  <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white hover:bg-black/80" />
                  <CarouselNext className="-right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white hover:bg-black/80" />
                </>
              )}
            </Carousel>
            {hasMultipleSlides && (
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2">
                {media.map((item, index) => (
                  <span
                    key={`${item.alt}-${index}`}
                    className={`h-1.5 w-6 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-lime-300"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1 text-left text-sm leading-relaxed text-white/80">
          {description.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
