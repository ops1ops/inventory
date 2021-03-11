import { CELL_SIZE, COORDINATES_SEPARATOR } from './constants';

export const parseCoordinates = (coordinates) => coordinates.split(COORDINATES_SEPARATOR).map(Number);

export const formatCoordinates = (x, y) => `${x}${COORDINATES_SEPARATOR}${y}`;

export const getItemDetailsById = (items, id) => {
  return Object.entries(items).find(([_, { id: itemId }]) => itemId === id);
};

export const removeItem = (items, coordinates) => {
  const { [coordinates]: coords, ...rest } = items;

  return rest;
}

export const getStyleBySize = ({ width, height }) =>
  ({ width: `${width * CELL_SIZE}px`, height: `${height * CELL_SIZE}px` });
