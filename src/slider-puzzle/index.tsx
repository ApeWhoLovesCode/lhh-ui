import SliderPuzzle_ from "./slider-puzzle";
import './index.less';
import { SliderPuzzleCanvasProps, SliderPuzzleInstance, SliderPuzzleItemProps, SliderPuzzleProps } from "./type";
import { attachPropertiesToComponent } from "../utils/attach-properties-to-component";
import SliderPuzzleItem from "./slider-puzzle-item";
import SliderPuzzleCanvas from "./slider-puzzle-canvas"

const SliderPuzzle = attachPropertiesToComponent(SliderPuzzle_, {
  Item: SliderPuzzleItem,
  Canvas: SliderPuzzleCanvas,
});

export { SliderPuzzle }
export default SliderPuzzle
export type {
  SliderPuzzleProps,
  SliderPuzzleItemProps,
  SliderPuzzleCanvasProps,
  SliderPuzzleInstance,
}