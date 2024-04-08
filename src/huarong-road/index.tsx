import { attachPropertiesToComponent } from '../utils/attach-properties-to-component';
import './index.scss';
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
  HeroesIndex,
} from './type';
export default HuarongRoad;
