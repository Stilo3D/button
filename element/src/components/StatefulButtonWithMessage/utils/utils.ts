/**
 * Get the valid class name for the message position
 * @param position - position of the message left/right/top/bottom
 * @returns valid class name
 */
export const displayMessageAtCorrectPosition = (position: string): string => {
  switch (position) {
    case "left":
      return "elementContainerMsgLeft";
    case "top":
      return "elementContainerMsgTop";
    case "bottom":
      return "elementContainerMsgBottom";
    default:
      return "elementContainerMsgRight";
  }
};
