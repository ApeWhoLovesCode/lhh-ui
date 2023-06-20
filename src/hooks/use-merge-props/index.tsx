import { useMemo } from 'react';
import omit from '../../utils/omit';

export type MergePropsOptions = {
  _ignorePropsFromGlobal?: boolean;
};

/** 将某些属性变为必选 */
type RequireKey<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: T[P] };

function useMergeProps<PropsType, K extends keyof PropsType>(
  componentProps: PropsType & MergePropsOptions,
  defaultProps: Partial<PropsType>,
  globalComponentConfig: Partial<PropsType> = {},
): RequireKey<PropsType, K> {
  const { _ignorePropsFromGlobal } = componentProps;
  const _defaultProps = useMemo(() => {
    return {
      ...defaultProps,
      ...(_ignorePropsFromGlobal ? {} : globalComponentConfig),
    };
  }, [defaultProps, globalComponentConfig, _ignorePropsFromGlobal]);

  const props = useMemo(() => {
    // Must remove property of MergePropsOptions before passing it to component
    const mProps = omit(componentProps, [
      '_ignorePropsFromGlobal',
    ]) as PropsType;

    // https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react/src/ReactElement.js#L312
    for (const propName in _defaultProps) {
      if (mProps[propName] === undefined) {
        mProps[propName] = _defaultProps[propName]!;
      }
    }

    return mProps;
  }, [componentProps, _defaultProps]);

  return props as RequireKey<PropsType, K>;
}

export default useMergeProps;
export { useMergeProps };
