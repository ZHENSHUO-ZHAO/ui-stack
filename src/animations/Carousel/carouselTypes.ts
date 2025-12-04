import type { MotionValue } from "motion";

export type layoutDataType<T> = {
  cardWidth: number;
  cardHeight: number;
  baseX: number;
  snapSize: number;
  contentList: T[];
  CardComponent: React.ComponentType<cardItemType<T>>;
};

export type cardDataType = {
  card: HTMLLIElement | null;
  offset: number;
  index: number;
};

export type cardItemType<T> = {
  content: T;
};

export type cardPropType = {
  dragX: MotionValue<number>;
  data: cardDataType;
};

export type dotPropType = {
  index: number;
  onScroll: (index: number) => void;
  viewContentIndex: number;
};

export type onNextCbType = { (toRight: boolean): void };

export type nextButtonPropType = { isToRight: boolean; onNext: onNextCbType };
