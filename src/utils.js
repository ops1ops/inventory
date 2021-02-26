import { COORDINATES_SEPARATOR } from './constants';

export const parseCoordinates = (coordinates) => coordinates.split(COORDINATES_SEPARATOR).map(Number);

export const formatCoordinates = (x, y) => `${x}${COORDINATES_SEPARATOR}${y}`;