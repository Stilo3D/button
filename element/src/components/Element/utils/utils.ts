export const displayMessageAtCorrectPosition = (position: string): string => {
  switch (position) {
    case "left":
      return "elementContainerMsgLeft";
    case "right":
      return "elementContainerMsgRight";
    case "top":
      return "elementContainerMsgTop";
    case "bottom":
      return "elementContainerMsgBottom";
    default:
      return "elementContainerMsgRight";
  }
};
