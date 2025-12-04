import { createContext } from "react";
import type { layoutDataType } from "./carouselTypes";

export const LayoutContext = createContext<layoutDataType<unknown> | null>(
  null
);
