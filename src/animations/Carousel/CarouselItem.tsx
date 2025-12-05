import type { cardContent } from "./cardContent";
import type { cardItemType } from "./carouselTypes";

export function CardItem({ content }: cardItemType<cardContent>) {
  return (
    <div className="self-start size-full p-3 flex flex-col gap-3 justify-center items-center md:p4 md:gap-3 lg:p-5 lg:gap-4 xl:p-6 xl:gap-5">
      <h1 className="text-3xl font-black md:text-4xl lg:text-5xl xl:text-6xl">
        {content.title}
      </h1>
      <p className="text-center text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl">
        {content.desc}
      </p>
    </div>
  );
}
