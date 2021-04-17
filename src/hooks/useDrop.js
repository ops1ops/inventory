import { useContext, useEffect } from 'react';
import { DATA_TRANSFER, DROP_CELL_CLASS } from '../constants';
import { formatCoordinates, getDropCellCoordinates } from '../utils/utils';
import { ITEM_PARAMS } from '../mockData/itemParams';
import { StoreContext } from '../store/context';

const useDrop = (inventoryRef, id, width, height) => {
  const { moveItem, setDraggingItem, setMouseOverCoordinates } = useContext(StoreContext);

  useEffect(() => {
    const inventory = inventoryRef.current;

    const onDrop = (event) => {
      event.preventDefault();

      if (event.target.className !== DROP_CELL_CLASS) {
        return;
      }

      const item = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER.item));

      const { coordinates: touchedItemCell, typeId, id: itemId, inventoryId: itemInventoryId } = item;

      const mouseOverCell = event.target.id;
      const [dropCellX, dropCellY] = getDropCellCoordinates(mouseOverCell, touchedItemCell);

      const { width: itemWidth, height: itemHeight } = ITEM_PARAMS[typeId];

      const lastItemCellX = dropCellX + itemWidth;
      const lastItemCellY = dropCellY + itemHeight;

      const isFirstCellInInventory = dropCellX >= 0 && dropCellY >= 0;
      const isLastCellInInventory = lastItemCellY <= height && lastItemCellX <= width;
      const isItemInInventory = isFirstCellInInventory && isLastCellInInventory;

      if (!isItemInInventory) {
        return;
      }

      const coordinatesToMove = formatCoordinates(dropCellX + 1, dropCellY + 1);

      const inventoryId = itemInventoryId === id ? null : id;

      moveItem(itemId, coordinatesToMove, inventoryId);
      setDraggingItem({});
      setMouseOverCoordinates();
    };

    inventory.addEventListener("drop", onDrop);

    return () => {
      inventory.removeEventListener("drop", onDrop);
    };
  }, [height, id, moveItem, inventoryRef, setDraggingItem, width]);
};

export default useDrop;
