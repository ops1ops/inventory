import { ITEM_PARAMS } from '../mockData/itemParams';
import { parseCoordinates } from './utils';

export const isItemContainCell = ({ typeId, coordinates }, { x, y }) => {
  const { width, height } = ITEM_PARAMS[typeId];
  const [itemX, itemY] = parseCoordinates(coordinates);

  const isXAxisOverlap = x >= itemX && x <= itemX + width - 1;
  const isYAxisOverlap = y >= itemY && y <= itemY + height - 1;

  return isXAxisOverlap && isYAxisOverlap;
};
