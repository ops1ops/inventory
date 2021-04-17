import { parseCoordinates } from '../utils/utils';
import { ITEM_PARAMS } from '../mockData/itemParams';

export const getItemBounds = ({ typeId, coordinates }) => {
  const [x, y] = parseCoordinates(coordinates);
  const { width, height } = ITEM_PARAMS[typeId];

  const lastXCoordinate = x + width - 1;
  const lastYCoordinate = y + height - 1;

  const xBounds = [x, lastXCoordinate];
  const yBounds = [y, lastYCoordinate];

  return { x: xBounds, y: yBounds };
}

export const checkBoundsOverlap = (firstBounds, secondBounds) => {
  const [firstStart, firstEnd] = firstBounds;
  const [secondStart, secondEnd] = secondBounds;

  const firstBoundsLength = firstEnd - firstStart;
  const secondBoundsLength = secondEnd - secondStart;
  const areFirstBoundsLonger = firstBoundsLength > secondBoundsLength;

  const [comparingStart, comparingEnd] = areFirstBoundsLonger ? secondBounds : firstBounds;
  const [startToCompare, endToCompare] = areFirstBoundsLonger ? firstBounds : secondBounds;

  const isIncluding = comparingStart >= startToCompare && comparingEnd <= endToCompare;

  const isLeftOverlap = comparingStart < startToCompare && comparingEnd >= startToCompare;
  const isRightOverlap = comparingStart > startToCompare && comparingStart <= endToCompare;
  const isOverlap = isLeftOverlap || isRightOverlap;

  return isIncluding || isOverlap;
}

export const checkItemsOverlap = (itemsBounds, { x: itemX, y: itemY }) => {
  for (let { x, y } of itemsBounds) {
    if (checkBoundsOverlap(x, itemX) && checkBoundsOverlap(y, itemY)) {
      return true;
    }
  }

  return false;
}

export const canMoveItem = (item, inventoryItems) => {
  const itemsBounds = inventoryItems.map((inventoryItem) => getItemBounds(inventoryItem));
  const itemBounds = getItemBounds(item);

  const hasOverlap = checkItemsOverlap(itemsBounds, itemBounds);

  return !hasOverlap;
};