import './index.scss';
import { attachPropertiesToComponent } from '../utils/attach-properties-to-component';
import SliderPuzzle_ from './slider-puzzle';
import SliderPuzzleCanvas from './slider-puzzle-canvas';
import SliderPuzzleItem from './slider-puzzle-item';

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
} from './type';
export default SliderPuzzle;
