import { Tabs as _Tabs, Tab } from './tabs';
import './index.scss';
import { attachPropertiesToComponent } from '../utils/attach-properties-to-component';

const Tabs = attachPropertiesToComponent(_Tabs, {
  Tab,
});

export { Tabs, Tab };
export default Tabs;
export type { TabsProps, TabsInstance, TabProps } from './type';
