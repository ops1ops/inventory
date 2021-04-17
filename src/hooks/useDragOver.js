import throttle from 'lodash/throttle';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../store/context';

const useDragOver = (inventoryRef, inventoryId) => {
  const { setMouseOverCoordinates } = useContext(StoreContext);

  useEffect(() => {
    let prevMouseOver;
    const inventory = inventoryRef.current;

    const processDragOver = (event) => {
      const mouseOverCoordinates = event.target.id;

      if (mouseOverCoordinates !== prevMouseOver) {
        prevMouseOver = mouseOverCoordinates;

        setMouseOverCoordinates({ coords: mouseOverCoordinates, inventoryId });
      }
    }

    const throttledProcessDragOver = throttle(processDragOver, 10);

    const onDragOver = (event) => {
      event.preventDefault();

      throttledProcessDragOver(event);
    }

    inventory.addEventListener("dragover", onDragOver);
    
    return () => {
      inventory.removeEventListener("dragover", onDragOver);
    };
  }, [inventoryId, inventoryRef, setMouseOverCoordinates]);
};

export default useDragOver;
