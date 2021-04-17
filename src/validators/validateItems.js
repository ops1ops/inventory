import { deepClone, formatCoordinates, getInventory, isPointInBounds, parseCoordinates } from '../utils/utils';
import { ITEM_PARAMS } from '../mockData/itemParams';

export const fillMap = (map, { coordinates, typeId }) => {
  const newMap = deepClone(map);
  const [x, y] = parseCoordinates(coordinates);
  const { width, height } = ITEM_PARAMS[typeId];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const mapY = y + i - 1;
      const mapX = x + j - 1;

      newMap[mapY][mapX] = 1;
    }
  }

  return newMap;
};

export const buildInventoryMap = (items, { width, height }) => {
  const emptyMap = Array(height).fill(Array(width).fill(0));

  return items.reduce(fillMap, emptyMap);
};

const validateItems = (items, allInventories) => {
  items.forEach(({ coordinates, inventoryId }) => {
    const { width, height } = getInventory(allInventories, inventoryId);
    const [x, y] = parseCoordinates(coordinates);

    if (!isPointInBounds(x, y, width, height)) {
      throw Error(`Item with coordinates "${coordinates}" is not in bounds of inventory (id: ${inventoryId}) with size "${formatCoordinates(width, height)}"`);
    }
  });

  return items;
};

export default validateItems;