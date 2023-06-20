import React, { useEffect, useRef, useState } from 'react';
import useMergeProps from '../hooks/use-merge-props';
import colorVar from '../style/var';
import { isObj, randomStr, range, withNativeProps } from '../utils';
import { CirclePropsType } from './type';

const classPrefix = `lhhui-circle`;
/** 圆的一周 2π */
const PERIMETER = 2 * Math.PI;
/** 一开始的角度，由于是顶部所以是 -90° */
const BEGIN_ANGLE = -Math.PI / 2;
/** 最大值 */
const MAX = 100;

const defaultProps = {
  value: 0,
  size: 100,
  speed: 100,
  color: colorVar.blue,
  layerColor: colorVar.gray1,
  lineCap: 'round' as CanvasLineCap,
  strokeWidth: 6,
  clockwise: true,
};
type RequireType = keyof typeof defaultProps;

const Circle = (comProps: CirclePropsType) => {
  const props = useMergeProps<CirclePropsType, RequireType>(
    comProps,
    defaultProps,
  );
  const {
    value,
    size,
    strokeWidth,
    color,
    text,
    speed,
    clockwise,
    lineCap,
    layerColor,
    fill,
    children,
    ...ret
  } = props;

  const idRef = useRef(randomStr(classPrefix));
  const canvasRef = useRef<CanvasRef>({
    ctx: undefined,
    curVal: 0,
    curColor: '',
    timer: undefined,
    ratio: 1,
  });
  const [ready, setReady] = useState(false);

  const ratioSize = size * canvasRef.current.ratio;

  /** 在canvas上绘画 */
  const drawCanvas = (
    context: CanvasRenderingContext2D,
    strokeStyle: string,
    beginAngle: number,
    endAngle: number,
    fill?: string,
  ) => {
    const position = ratioSize / 2;
    const _strokeWidth = strokeWidth * canvasRef.current.ratio;
    const radius = position - _strokeWidth / 2;
    context.strokeStyle = strokeStyle as string;
    context.lineWidth = _strokeWidth;
    context.lineCap = lineCap;
    context.beginPath();
    context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
    context.stroke();
    if (fill) {
      context.fillStyle = fill;
      context.fill();
    }
  };

  /** 画圆 */
  const drawCircle = (curVal: number) => {
    canvasRef.current.ctx?.clearRect(0, 0, ratioSize, ratioSize);
    /** 绘画背景圆环 */
    drawCanvas(canvasRef.current.ctx!, layerColor, 0, PERIMETER, fill);
    const formatVal = range(curVal, 0, MAX);
    /** 绘画当前进度的圆环 */
    if (formatVal !== 0) {
      const progress = PERIMETER * (formatVal / 100);
      const endAngle = clockwise
        ? BEGIN_ANGLE + progress
        : 3 * Math.PI - (BEGIN_ANGLE + progress);
      drawCanvas(
        canvasRef.current.ctx!,
        canvasRef.current.curColor,
        BEGIN_ANGLE,
        endAngle,
      );
    }
  };

  /** 设置进度条颜色 */
  const setCurColor = () => {
    if (isObj(color)) {
      const _color = color as unknown as Record<string, string>;
      const keysArr = Object.keys(color).sort(
        (a, b) => parseFloat(a) - parseFloat(b),
      );
      canvasRef.current.curColor = _color[keysArr.at(-1) ?? ''];
    } else {
      canvasRef.current.curColor = color as string;
    }
  };

  const _cancelAnimationFrame = () => {
    if (canvasRef.current.timer !== void 0) {
      cancelAnimationFrame(canvasRef.current.timer);
      canvasRef.current.timer = void 0;
    }
  };

  /** 渲染圆环进度条 */
  const renderCircle = () => {
    if (speed <= 0 || speed > 1000) {
      drawCircle(value);
      return;
    }
    _cancelAnimationFrame();
    const _step = speed / MAX;
    const setStep = () => {
      const _v = canvasRef.current.curVal;
      if (Math.abs(_v - value) < _step) {
        canvasRef.current.curVal = value;
      } else {
        canvasRef.current.curVal += (_v < value ? 1 : -1) * _step;
      }
      drawCircle(canvasRef.current.curVal);
    };
    (function run() {
      setStep();
      if (canvasRef.current.curVal !== value) {
        canvasRef.current.timer = requestAnimationFrame(run);
      } else {
        _cancelAnimationFrame();
      }
    })();
  };

  useEffect(() => {
    if (ready) {
      renderCircle();
    }
  }, [value, ready]);

  /** 设置进度条颜色并绘画 */
  useEffect(() => {
    if (ready) {
      setCurColor();
      drawCircle(canvasRef.current.curVal);
    }
  }, [color, ready]);

  /** 绘画圆环 */
  useEffect(() => {
    if (ready) {
      drawCircle(canvasRef.current.curVal);
    }
  }, [size, ready]);

  /** 初始化获取 canvas 上下文 */
  useEffect(() => {
    const init = () => {
      const canvas = document.querySelector(
        `#${idRef.current}`,
      ) as HTMLCanvasElement;
      if (!canvas) return;
      canvasRef.current.ctx = canvas.getContext('2d')!;
      canvasRef.current.ratio = window.devicePixelRatio || 1;
      setReady(true);
      setCurColor();
      renderCircle();
    };
    setTimeout(() => {
      init();
    }, 10);

    return () => {
      _cancelAnimationFrame();
    };
  }, []);

  return withNativeProps(
    ret,
    <div className={classPrefix}>
      <canvas
        id={idRef.current}
        className={`${classPrefix}-canvas`}
        width={ratioSize}
        height={ratioSize}
        style={{ width: size + 'px', height: size + 'px' }}
      ></canvas>
      <div className={`${classPrefix}-text`}>{text ?? children}</div>
    </div>,
  );
};

export default Circle;

type CanvasRef = {
  /** canvas 上下文 */
  ctx?: CanvasRenderingContext2D;
  /** 当前进度条的值 */
  curVal: number;
  /** 当前进度条的颜色 */
  curColor: string;
  timer?: number;
  /** 分辨率比例 */
  ratio: number;
};
