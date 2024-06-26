import { attachPropertiesToComponent } from '../utils/attach-properties-to-component';
import './index.scss';
import _ScrollCircle from './scrollCircle';
import ScrollCircleItem from './scrollCircleItem';

const ScrollCircle = attachPropertiesToComponent(_ScrollCircle, {
  Item: ScrollCircleItem,
});

export type { ScrollCircleItemType, ScrollCircleProps, ScrollCircleInstance } from './type';
export { ScrollCircle, ScrollCircleItem };
export default ScrollCircle;
