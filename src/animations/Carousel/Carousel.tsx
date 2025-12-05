import { useEffect, useState } from "react";
import CarouselContent from "./CarouselContent";
import type { layoutDataType, cardItemType } from "./carouselTypes";
import useMeasure from "./measureHook";

export default function Carousel<T>({
  aspectRatio,
  CardComponent,
  contentList,
}: {
  aspectRatio: number;
  CardComponent: React.ComponentType<cardItemType<T>>;
  contentList: T[];
}) {
  const [ref, size] = useMeasure<HTMLDivElement>();
  const [layoutData, setLayoutData] = useState<layoutDataType<T>>({
    cardWidth: Number.NaN,
    cardHeight: Number.NaN,
    baseX: Number.NaN,
    snapSize: Number.NaN,
    contentList,
    CardComponent,
  });

  useEffect(() => {
    if (size.width != 0) {
      const cardWidth = size.width * 0.5;
      setLayoutData({
        ...layoutData,
        cardWidth,
        cardHeight: cardWidth / aspectRatio,
        baseX: -2 * cardWidth,
        snapSize: cardWidth,
      });
      // console.log(`cardWidth = ${cardWidth}, size.width = ${size.width}`);
    }
  }, [size.width]);

  return (
    <div
      ref={ref}
      className="overflow-hidden flex flex-col justify-center items-center gap-5 w-full"
    >
      {Number.isNaN(layoutData.cardWidth) || (
        <CarouselContent layoutData={layoutData} />
      )}
    </div>
  );
}
