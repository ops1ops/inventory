import React from 'react';
import { formatCoordinates, getStyleBySize } from '../utils/utils';
import ModalInventory from './ModalInventory';
import { ITEM_PARAMS } from '../mockData/itemParams';

const Item = ({ id, typeId, childInventoryId }) => {
  const { width, height, image } = ITEM_PARAMS[typeId];

	return (
    <div
      draggable="true"
      className="item-child"
      data-size={formatCoordinates(width, height)}
      data-id={id}
      data-type_id={typeId}
      style={{ ...getStyleBySize({ width, height }) }}
    >
      <div className="item-content">
        <span>{typeId}</span>
      </div>
      {childInventoryId && <ModalInventory id={childInventoryId} typeId={typeId} />}
      <div className="background" style={{ backgroundImage: `url("${image}"` }} />
    </div>
	);
};

export default Item;
