import type { cardContent } from "./carouselContent";
import type { cardItemType } from "./Carousel";

export function CardItem({ content }: cardItemType<cardContent>) {
  return (
    <div className="self-start size-full text-5xl font-black p-10 flex flex-col gap-10 justify-center items-start">
      <h1>{content.title}</h1>
      <p>{content.desc}</p>
    </div>
  );
}
