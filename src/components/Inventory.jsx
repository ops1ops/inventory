import React, { useEffect } from 'react';
import { CELL_SIZE, DATA_TRANSFER } from '../constants';
import { formatCoordinates, parseCoordinates } from '../utils';
import Cell from './Cell';

const DROP_CELL_CLASS = 'cell';
const UNDRAGGABLE_CLASSES = [DROP_CELL_CLASS];

const Inventory = ({ height, width }) => {
	useEffect(() => {
		let dragged;

		document.addEventListener("dragover", function(event) {
			event.preventDefault();
		}, false);

		document.addEventListener("dragstart", function(event) {
      if (UNDRAGGABLE_CLASSES.includes(event.target.className)) {
        event.preventDefault();

        return;
      }

      dragged = event.target;

      const { offsetX, offsetY } = event;

      const touchedItemCellX = Math.ceil(offsetX / CELL_SIZE);
      const touchedItemCellY = Math.ceil(offsetY / CELL_SIZE);
      const touchedCellCoordinates = formatCoordinates(touchedItemCellX, touchedItemCellY);

      event.dataTransfer.setData(DATA_TRANSFER.coordinates, touchedCellCoordinates);
      event.dataTransfer.setData(DATA_TRANSFER.size, event.target.dataset.size);
		}, false);

		document.addEventListener("drop", function(event) {
			event.preventDefault();

      if (event.target.className !== DROP_CELL_CLASS) {
        return;
      }

      const [touchedItemCellX, touchedItemCellY] = parseCoordinates(event.dataTransfer.getData(DATA_TRANSFER.coordinates));
      const [itemWidth, itemHeight] = parseCoordinates(event.dataTransfer.getData(DATA_TRANSFER.size));
      const [mouseOverCellX, mouseOverCellY] = parseCoordinates(event.target.id);

      const dropCellX = mouseOverCellX - touchedItemCellX;
      const dropCellY = mouseOverCellY - touchedItemCellY;

      const lastItemCellX = dropCellX + itemWidth;
      const lastItemCellY = dropCellY + itemHeight;
      const isItemInInventory = lastItemCellY <= height && lastItemCellX <= width;

      if (!isItemInInventory) {
        return;
      }

      const target = document.getElementById(`${dropCellX + 1}-${dropCellY + 1}`);

			if (target && target.className === DROP_CELL_CLASS) {
        target.appendChild(dragged);
			}
		}, false);
	}, []);


  return (
    <div className="inventory">
			{Array(height).fill().map((_, y) => (
				<div key={y} draggable="false" className="row">
					{Array(width).fill().map((_, x) => (
						<Cell key={x+y} x={x} y={y} />
					))}
				</div>
			))}
    </div>
  );
};

Inventory.propTypes = {};

export default Inventory;
