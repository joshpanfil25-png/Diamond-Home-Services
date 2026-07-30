"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

// Lite YouTube embed: renders only a thumbnail + play button until clicked,
// so no YouTube JS loads with the page. On click, swaps in the
// privacy-enhanced youtube-nocookie iframe with autoplay.
export default function LiteYouTube({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[10px] bg-diamond-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-diamond-red"
        >
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            width={480}
            height={360}
            className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-diamond-red shadow-lg transition-transform group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-diamond-white text-diamond-white" />
            </span>
          </span>
          <span className="absolute bottom-3 left-3 right-3 text-left text-sm font-semibold text-diamond-white drop-shadow">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
