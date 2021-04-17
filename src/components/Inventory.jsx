import React, { useContext, useMemo, useRef } from 'react';
import { formatCoordinates, getDropCellCoordinates, getItemByCoordinates } from '../utils/utils';
import Cell from './Cell';
import Item from './Item';
import { StoreContext } from '../store/context';
import { buildInventoryMap } from '../validators/validateItems';
import useDragOver from '../hooks/useDragOver';
import useDragStart from '../hooks/useDragStart';
import useDrop from '../hooks/useDrop';

const Inventory = ({ height, width, items, id }) => {
  const { mouseOverCoordinates, draggingItem } = useContext(StoreContext);

  const map = useMemo(() => buildInventoryMap(items, { width, height }), [height, items, width]);

  const ref = useRef();

	useDragStart(ref);

	useDragOver(ref, id);

	useDrop(ref, id, width, height);

  const renderItem = (x, y) => {
    const itemProps = getItemByCoordinates(items, formatCoordinates(x, y));

    return itemProps && <Item isDragging={draggingItem.typeId === itemProps.typeId} {...itemProps} />
  };

  const dropCoordinates =
    mouseOverCoordinates?.coords &&
    draggingItem.coordinates &&
    formatCoordinates(...getDropCellCoordinates(mouseOverCoordinates.coords, draggingItem.coordinates).map((a) => a + 1));

  return (
    <div id={id} className="inventory" ref={ref}>
			{map.map((row, y) => (
				<div key={y} draggable="false" className="row">
					{row.map((filler, x) => (
						<Cell
              key={x+y}
              x={x}
              y={y}
              filler={filler}
              shouldBeColored={mouseOverCoordinates?.inventoryId === id}
              dropCoordinates={dropCoordinates}
              draggingItem={draggingItem}
            >
              {renderItem(x + 1, y + 1)}
            </Cell>
					))}
				</div>
			))}
    </div>
  );
};

export default Inventory;
