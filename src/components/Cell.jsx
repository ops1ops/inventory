import React from 'react';
import { formatCoordinates } from '../utils';
import { CELL_SIZE } from '../constants';

const Cell = ({ x, y, children }) => {
  return (
    <div
      id={formatCoordinates(x + 1, y + 1)}
      className="cell"
      style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
      draggable="false"
    >
      {children}
    </div>
  );
};

export default Cell;
