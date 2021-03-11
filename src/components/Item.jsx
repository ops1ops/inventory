import React from 'react';
import { CELL_SIZE, ITEM_PARAMS } from '../constants';
import { formatCoordinates } from '../utils';
import ModalInventory from './ModalInventory';

const Item = ({ id, typeId, inventory, parentType }) => {
  const { width, height, image } = ITEM_PARAMS[typeId];

	return (
    <div
      draggable="true"
      data-size={formatCoordinates(width, height)}
      data-id={id}
      data-type_id={typeId}
      className="item-child"
      style={{ width: `${width * CELL_SIZE}px`, height: `${height * CELL_SIZE}px`, backgroundImage: `url("${image}"` }}
    >
      <div className="item-content">
        <span>{typeId}</span>
      </div>
      {inventory && <ModalInventory parentType={parentType} parentSize={{ width, height }} {...inventory} />}
    </div>
	);
};

export default Item;
