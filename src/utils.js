import { v4 as uuidv4 } from 'uuid';

import { CELL_SIZE, COORDINATES_SEPARATOR } from './constants';

export const parseCoordinates = (coordinates) => coordinates.split(COORDINATES_SEPARATOR).map(Number);

export const formatCoordinates = (x, y) => `${x}${COORDINATES_SEPARATOR}${y}`;

export const withIds = (items, generateId = uuidv4) => {
  return items.map((item) => ({ ...item, id: generateId() }))
}

export const getStyleBySize = ({ width, height }) =>
  ({ width: `${width * CELL_SIZE}px`, height: `${height * CELL_SIZE}px` });

export const getIdIncrement = () => {
  let id = 1;

  return () => (id++).toString();
}

export const getInventoryItems = (items, inventoryId) => items.filter((item) => inventoryId === item.inventoryId);

export const getInventory = (inventories, inventoryId) =>
  inventories.find((inventory) => inventoryId === inventory.id);

export const getItemByCoordinates = (items, coordinates) => items.find((item) => item.coordinates === coordinates);

const isPointInBounds = (x, y, boundsX, boundsY) => {
  return x >= 0 && y >= 0 && x <= boundsX && y <= boundsY;
}

export const validateCoordinates = (items, allInventories) => {
  items.forEach(({ coordinates, inventoryId }) => {
    const { width, height } = getInventory(allInventories, inventoryId);
    const [x, y] = parseCoordinates(coordinates);

    if (!isPointInBounds(x, y, width, height)) {
      throw Error(`Item with coordinates "${coordinates}" is not in bounds of inventory (id: ${inventoryId}) size "${formatCoordinates(width, height)}"`);
    }
  });

  return items;
}