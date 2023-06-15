import './index.less';
import { ScrollCircle as _ScrollCircle, ScrollRotateItem } from './scrollCircle';
import { attachPropertiesToComponent } from '../utils/attach-properties-to-component';

const ScrollCircle = attachPropertiesToComponent(_ScrollCircle, { Item: ScrollRotateItem });

export { ScrollCircle };
export default ScrollCircle;

export type { ScrollCircleProps, ScrollRotateItemType } from './type';
