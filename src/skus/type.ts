import { ReactNode } from "react";
import { NativeProps } from "../utils/native-props";

export type SkusProps = { 
  data: SkusItem[]
  onChange?: () => void
} & NativeProps

export type SkusItem = {
  stock: number;
  params: {
    name: string;
    value: string;
    // ... 
  }[];
  // ... 其他省略
};
