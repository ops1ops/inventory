import { v4 as uuidv4 } from 'uuid';

import { CELL_SIZE, COORDINATES_SEPARATOR } from '../constants';

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

export const isPointInBounds = (x, y, boundsX, boundsY) => {
  return x >= 1 && y >= 1 && x <= boundsX && y <= boundsY;
}

export const deepClone = (object) => JSON.parse(JSON.stringify(object));

export const sortItemsByCoordinates = (items) =>
  items
  .slice()
  .sort(({ coordinates: coordsA }, { coordinates: coordsB }) => {
    const [aX, aY] = parseCoordinates(coordsA);
    const [bX, bY] = parseCoordinates(coordsB);

    if (aX === bX) {
      return aY - bY;
    }

    return aX - bX;
  });

export const getDropCellCoordinates = (mouseOverCell, touchedItemCell) => {
  const [touchedItemCellX, touchedItemCellY] = parseCoordinates(touchedItemCell);
  const [mouseOverCellX, mouseOverCellY] = parseCoordinates(mouseOverCell);

  const x = mouseOverCellX - touchedItemCellX;
  const y = mouseOverCellY - touchedItemCellY;

  return [x, y];
}
