import React, { useContext, useMemo, useRef } from 'react';
import { formatCoordinates, getDropCellCoordinates, getItemByCoordinates } from '../utils';
import Cell from './Cell';
import Item from './Item';
import { StoreContext } from '../store/context';
import { buildInventoryMap } from '../validators/validateItems';
import useDragOver from '../hooks/useDragOver';
import useDragStart from '../hooks/useDragStart';
import useDrop from '../hooks/useDrop';

const Inventory = ({ height, width, items, id }) => {
  const { mouseOverCoordinatesState, draggingItem } = useContext(StoreContext);
  const [mouseOverCoords] = mouseOverCoordinatesState;

  const map = useMemo(() => buildInventoryMap(items, { width, height }), [height, items, width]);

  const ref = useRef();

	useDragStart(ref);

	useDragOver(ref);

	useDrop(ref, id, width, height);

  const renderItem = (x, y) => {
    const itemProps = getItemByCoordinates(items, formatCoordinates(x, y));

    return itemProps && <Item isDragging={draggingItem.typeId === itemProps.typeId} {...itemProps} />
  };

  const dropCoordinates =
    mouseOverCoords &&
    draggingItem.coordinates &&
    formatCoordinates(...getDropCellCoordinates(mouseOverCoords, draggingItem.coordinates).map((a) => a + 1));

  return (
    <div id={id} className="inventory" ref={ref}>
			{map.map((row, y) => (
				<div key={y} draggable="false" className="row">
					{row.map((filler, x) => (
						<Cell key={x+y} x={x} y={y} filler={filler} dropCoordinates={dropCoordinates} draggingItem={draggingItem}>
              {renderItem(x + 1, y + 1)}
            </Cell>
					))}
				</div>
			))}
    </div>
  );
};

export default Inventory;
