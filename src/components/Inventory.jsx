import React, { useContext, useEffect } from 'react';
import { CELL_SIZE, DATA_TRANSFER, ITEM_PARAMS } from '../constants';
import { formatCoordinates, parseCoordinates } from '../utils';
import Cell from './Cell';
import Item from './Item';
import { StoreContext } from '../store/context';

const DROP_CELL_CLASS = 'cell';
const UNDRAGGABLE_CLASSES = [DROP_CELL_CLASS];

const Inventory = ({ height, width, items, type, id, parentIds = [], parentType = [] }) => {
  const { moveItemInInventory, moveItemToOtherInventory } = useContext(StoreContext);

  if (!type) {
    console.error('MISSING TYPE IN INVENTORY');
  }

	useEffect(() => {
	  const trackableZone = document.querySelector(`.${type}`);

    trackableZone.addEventListener("dragover", (event) => {
			event.preventDefault();
		}, false);

    trackableZone.addEventListener("dragstart", (event) => {
      if (UNDRAGGABLE_CLASSES.includes(event.target.className)) {
        event.preventDefault();

        return;
      }

      const { offsetX, offsetY } = event;

      const touchedItemCellX = Math.ceil(offsetX / CELL_SIZE);
      const touchedItemCellY = Math.ceil(offsetY / CELL_SIZE);
      const touchedCellCoordinates = formatCoordinates(touchedItemCellX, touchedItemCellY);

      event.dataTransfer.setData(DATA_TRANSFER.coordinates, touchedCellCoordinates);
      event.dataTransfer.setData(DATA_TRANSFER.id, event.target.dataset.id);
      event.dataTransfer.setData(DATA_TRANSFER.typeId, event.target.dataset.type_id);
      event.dataTransfer.setData(DATA_TRANSFER.inventoryType, event.path[3].className.split(' ')[1]);
		}, false);

    trackableZone.addEventListener("drop", (event) => {
			event.preventDefault();

      if (event.target.className !== DROP_CELL_CLASS) {
        return;
      }

      const [touchedItemCellX, touchedItemCellY] = parseCoordinates(event.dataTransfer.getData(DATA_TRANSFER.coordinates));
      const [mouseOverCellX, mouseOverCellY] = parseCoordinates(event.target.id);
      const typeId = event.dataTransfer.getData(DATA_TRANSFER.typeId);
      const { width: itemWidth, height: itemHeight } = ITEM_PARAMS[typeId];

      const dropCellX = mouseOverCellX - touchedItemCellX;
      const dropCellY = mouseOverCellY - touchedItemCellY;

      const lastItemCellX = dropCellX + itemWidth;
      const lastItemCellY = dropCellY + itemHeight;

      const isFirstCellInInventory = dropCellX >= 0 && dropCellY >= 0;
      const isLastCellInInventory = lastItemCellY <= height && lastItemCellX <= width;
      const isItemInInventory = isFirstCellInInventory && isLastCellInInventory;

      if (!isItemInInventory) {
        return;
      }

      const dropCoordinates = formatCoordinates(dropCellX + 1, dropCellY + 1);

      const itemInventoryType = event.dataTransfer.getData(DATA_TRANSFER.inventoryType);
      const id = event.dataTransfer.getData(DATA_TRANSFER.id);

      if (itemInventoryType === type) {
        moveItemInInventory(itemInventoryType, dropCoordinates, id, parentType);
      } else {
        const movingItem = { inventoryType: itemInventoryType, id };
        const inventoryToMove = { coordinates: dropCoordinates, inventoryType: type };

        moveItemToOtherInventory(movingItem, inventoryToMove);
      }
		}, false);
	}, []);

  const renderItem = (x, y) => {
    const itemProps = items[formatCoordinates(x, y)];

    return itemProps && <Item parentType={parentType.concat(type)} {...itemProps} />
  }

  return (
    <div className={"inventory " + type}>
			{Array(height).fill().map((_, y) => (
				<div key={y} draggable="false" className="row">
					{Array(width).fill().map((_, x) => (
						<Cell key={x+y} x={x} y={y}>
              {renderItem(x + 1, y + 1)}
            </Cell>
					))}
				</div>
			))}
    </div>
  );
};

Inventory.propTypes = {};

export default Inventory;
