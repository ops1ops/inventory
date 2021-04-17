import React from 'react';
import { formatCoordinates, getStyleBySize } from '../utils/utils';
import { isItemContainCell } from '../utils/cell';

const DEFAULT_COLOR = 'gray';

/**
 * map with all items -> if item in cell its filled with 1 -> we pass to function current state (0 or 1)
 * function accepts current dragging item params (coordinates and typeId) and cell state (filler and coordinates)
 * and returns our cell color
 */
const getCellColor = (cell, item) => {
  const isContains = isItemContainCell(item, cell);

  if (isContains) {
    const isCellFilled = cell.filler === 1;

    return isCellFilled ? 'indianred' : 'green';
  }

  return DEFAULT_COLOR;
};

const Cell = ({ x, y, children, style, filler, draggingItem, dropCoordinates, shouldBeColored, ...rest }) => {
  const sizedX = x + 1;
  const sizedY = y + 1;

  const cellSize = { width: 1, height: 1 };
  const cell = { x: sizedX, y: sizedY, filler };

  const background = shouldBeColored && draggingItem.typeId && dropCoordinates
    ? getCellColor(cell, { ...draggingItem, coordinates: dropCoordinates })
    : DEFAULT_COLOR;

  return (
    <div
      {...rest}
      id={formatCoordinates(sizedX, sizedY)}
      className="cell"
      style={{ ...style, ...getStyleBySize(cellSize), background }}
      draggable="false"
    >
      {children}
    </div>
  );
};

export default Cell;
