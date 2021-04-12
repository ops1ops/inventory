import { ITEM_PARAMS, ITEM_TYPES } from '../mockData/itemParams';
import { formatCoordinates, parseCoordinates } from '../utils';

export const isItemContainCell = ({ typeId, coordinates }, { x, y }) => {
  const { width, height } = ITEM_PARAMS[typeId];
  const [itemX, itemY] = parseCoordinates(coordinates);

  const isXAxisOverlap = x >= itemX && x <= itemX + width - 1;
  const isYAxisOverlap = y >= itemY && y <= itemY + height - 1;

  return isXAxisOverlap && isYAxisOverlap;
};

isItemContainCell({ typeId: ITEM_TYPES.roubles, coordinates: formatCoordinates(1,1) }, { x: 2, y: 2 })

const throughMatrix = ({ width, height }, callback) => {
  for (let y = 1; y <= height; y++) {
    for (let x = 1; x <= width; x++) {
      callback(x, y);
    }
  }
}

export const canMoveItem = (map, { typeId }, coordinates) => {
  const { width, height } = ITEM_PARAMS[typeId];
  const [toMoveX, toMoveY] = parseCoordinates(coordinates);
  let canMove = true;

  for (let y = 1; y <= height; y++) {
    for (let x = 1; x <= width; x++) {
      // callback(x, y);
    }
  }

  return canMove;
};