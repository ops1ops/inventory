import React from 'react';
import { formatCoordinates } from '../utils';

const Cell = ({ x, y, children }) => {
  return (
    <div id={formatCoordinates((x + 1), (y + 1))} draggable="false" className="cell">
      {children}
    </div>
  );
};

export default Cell;
