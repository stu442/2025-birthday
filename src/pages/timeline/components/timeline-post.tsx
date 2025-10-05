import { useEffect, useState } from "react";

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
  description: string[];
  images: Array<{ src: string; alt: string }>;
}

export default function TimelinePost({
  title,
  subtitle,
  description,
  images,
}: TimelinePostProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;
  const hasMultipleImages = totalImages > 1;

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
        <header className="flex flex-col gap-1 text-left">
          <span className="text-sm uppercase tracking-widest text-lime-300/70">
            {subtitle}
          </span>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
        </header>

        <div className="relative pb-8">
          <Carousel
            className="relative"
            opts={{ loop: true }}
            setApi={setCarouselApi}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem
                  key={`${image.alt}-${index}`}
                  className="overflow-hidden"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-2xl bg-black/40">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {hasMultipleImages && (
              <>
                <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white hover:bg-white/80" />
                <CarouselNext className="-right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white hover:bg-white/80" />
              </>
            )}
          </Carousel>
          {hasMultipleImages && (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2">
              {images.map((image, index) => (
                <span
                  key={`${image.alt}-${index}`}
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

        <div className="flex flex-col gap-1 text-left text-sm leading-relaxed text-white/80">
          {description.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
