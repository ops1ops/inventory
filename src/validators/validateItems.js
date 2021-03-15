import {
  deepClone,
  formatCoordinates,
  getInventory,
  getInventoryItems,
  isPointInBounds,
  parseCoordinates,
} from '../utils';
import { ITEM_PARAMS } from '../mockData/itemParams';

const fillMap = (map, { coordinates, typeId, inventoryId }) => {
  const newMap = deepClone(map);
  const [x, y] = parseCoordinates(coordinates);
  const { width, height } = ITEM_PARAMS[typeId];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const mapY = y + i - 1;
      const mapX = x + j - 1;

      if (newMap[mapY][mapX] === 1) {
        throw Error(`Item (coordinates: ${coordinates}) in inventory (id: ${inventoryId}) overlaps with another item at ${formatCoordinates(mapX + 1, mapY + 1)}`);
      }

      newMap[mapY][mapX] = 1;
    }
  }

  return newMap;
};

const buildInventoryMap = (items, { width, height }) => {
  const map = Array(height).fill(Array(width).fill(0));

  return items.reduce(fillMap, map);
}

const validateItems = (items, allInventories) => {
  items.forEach(({ coordinates, inventoryId }) => {
    const { width, height } = getInventory(allInventories, inventoryId);
    const [x, y] = parseCoordinates(coordinates);

    if (!isPointInBounds(x, y, width, height)) {
      throw Error(`Item with coordinates "${coordinates}" is not in bounds of inventory (id: ${inventoryId}) with size "${formatCoordinates(width, height)}"`);
    }
  });

  allInventories.forEach((inventory) => {
    const inventoryItems = getInventoryItems(items, inventory.id);

    buildInventoryMap(inventoryItems, inventory);
  });

  return items;
};

export default validateItems;