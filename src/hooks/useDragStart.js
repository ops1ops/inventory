import { DATA_TRANSFER, UNDRAGGABLE_CLASSES } from '../constants';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../store/context';
import DragService from '../DragService';

const useDragStart = (inventoryRef) => {
  const { setDraggingItem } = useContext(StoreContext);

  useEffect(() => {
    const inventory = inventoryRef.current;

    const dragService = new DragService();

    const onDragStart = (event) => {
      if (UNDRAGGABLE_CLASSES.includes(event.target.className) || !event.target.dataset) {
        event.preventDefault();

        return;
      }

      const item = dragService.getItemData(event);

      event.dataTransfer.setData(DATA_TRANSFER.item, JSON.stringify(item));

      setDraggingItem(item);
    }

    inventory.addEventListener("dragstart", onDragStart);

    return () => {
      inventory.removeEventListener("dragstart", onDragStart);
    };
  }, [inventoryRef, setDraggingItem]);
};

export default useDragStart;
