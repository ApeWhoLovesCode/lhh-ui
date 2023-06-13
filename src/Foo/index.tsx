import React, { type FC } from 'react';

type PropsType = {
  /** 标题 */
  title: string
}

const Foo: FC<PropsType> = (props) => <h4>{props.title}</h4>;

export default Foo;
