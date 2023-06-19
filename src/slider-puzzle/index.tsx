import { attachPropertiesToComponent } from '../utils/attach-properties-to-component';
import './index.less';
import SliderPuzzle_ from './slider-puzzle';
import SliderPuzzleCanvas from './slider-puzzle-canvas';
import SliderPuzzleItem from './slider-puzzle-item';
import {
  SliderPuzzleCanvasProps,
  SliderPuzzleInstance,
  SliderPuzzleItemProps,
  SliderPuzzleProps,
} from './type';

const SliderPuzzle = attachPropertiesToComponent(SliderPuzzle_, {
  Item: SliderPuzzleItem,
  Canvas: SliderPuzzleCanvas,
});

export { SliderPuzzle, SliderPuzzleItem, SliderPuzzleCanvas };
export type {
  SliderPuzzleProps,
  SliderPuzzleItemProps,
  SliderPuzzleCanvasProps,
  SliderPuzzleInstance,
};
export default SliderPuzzle;
