import './index.less';
import { ScrollCircle as _ScrollCircle } from './scrollCircle';
import { ScrollCircleItem } from './scrollCircleItem';
import { attachPropertiesToComponent } from '../utils/attach-properties-to-component';

const ScrollCircle = attachPropertiesToComponent(_ScrollCircle, { Item: ScrollCircleItem });

export { ScrollCircle };
export default ScrollCircle;

export type { ScrollCircleProps, ScrollCircleItemType } from './type';
