"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageCarouselProps {
  images: string[];
  title: string;
}

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        loop: true,
        align: "start",
      }}
      className="relative w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={image}>
            <AspectRatio ratio={16 / 9} className="overflow-hidden bg-muted">
              <Image
                src={image}
                alt={`${title} — image ${index + 1} of ${images.length}`}
                fill
                sizes="(max-width: 672px) 100vw, 672px"
                className="object-cover"
                priority={index === 0}
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
