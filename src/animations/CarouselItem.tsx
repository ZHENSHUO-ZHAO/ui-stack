import type { cardContent } from "./carouselContent";
import type { cardItemType } from "./Carousel";

export function CardItem({ content }: cardItemType<cardContent>) {
  return (
    <div className="self-start w-full text-5xl space-y-10 p-10">
      <h1>{content.title}</h1>
      <p>{content.desc}</p>
    </div>
  );
}
