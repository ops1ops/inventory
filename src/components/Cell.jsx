import React from 'react';
import { formatCoordinates } from '../utils';

const Cell = ({ x, y }) => {
  return (
    <div id={formatCoordinates((x + 1), (y + 1))} draggable="false" className="cell" />
  );
};

export default Cell;
