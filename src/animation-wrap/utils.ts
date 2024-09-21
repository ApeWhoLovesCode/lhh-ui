import { AnimationWrapPosition } from "./type";

/** 获取 curtain 的 transform */
export const getTransformCurtain = ({
  distance,
  position,
}: {
  distance: number;
  position: AnimationWrapPosition;
}) => {
  switch (position) {
    case "right":
      return `translateX(${distance}%)`;
    case "bottom":
      return `translateY(${distance}%)`;
    case "left":
      return `translateX(-${distance}%)`;
    case "top":
      return `translateY(-${distance}%)`;
    case "right-bottom":
      return `translate(${distance}%, ${distance}%)`;
    case "right-top":
      return `translate(${distance}%, -${distance}%)`;
    case "left-bottom":
      return `translate(-${distance}%, ${distance}%)`;
    case "left-top":
      return `translate(-${distance}%, -${distance}%)`;
    default:
      return `translateX(${distance}%)`;
  }
};

/** 将颜色转化为透明色 */
export const handleLinearGradient = (color: string) => {
  if (color.includes("#")) {
    if (color.length === 4) {
      color = color.substring(1);
      // 处理 '#abc' 成 '#aabbcc'
      color = "#" + color.replace(/(.)/g, "$1$1");
    }
    return color + "00";
  }
  if (color.includes("rgb")) {
    return color.replace("rgb", "rgba").replace(")", ",0)");
  }
  return color;
};
