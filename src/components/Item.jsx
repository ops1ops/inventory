import React from 'react';
import { CELL_SIZE } from '../constants';
import { formatCoordinates } from '../utils';

const Item = ({ width, height }) => {
	return (
    <div
      draggable="true"
      data-size={formatCoordinates(width, height)}
      className="item-child"
      style={{ width: `${width * CELL_SIZE}px`, height: `${height * CELL_SIZE}px` }}
    />
	);
};

export default Item;
