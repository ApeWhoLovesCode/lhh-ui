import { attachPropertiesToComponent } from '../utils/attach-properties-to-component';
import './index.less';
import HuarongRoad_ from './huarong-road';
import HuarongRoadItem from './huarong-road-item';

const HuarongRoad = attachPropertiesToComponent(HuarongRoad_, {
  Item: HuarongRoadItem,
});

export { HuarongRoad, HuarongRoadItem };
export type {
  HuarongRoadProps,
  HuarongRoadItemProps,
  HuarongRoadInstance,
} from './type';
export default HuarongRoad;
