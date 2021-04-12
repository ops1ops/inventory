import throttle from 'lodash/throttle';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../store/context';

const useDragOver = (inventoryRef) => {
  const { mouseOverCoordinatesState: [_, setMouseOverCoords] } = useContext(StoreContext);

  useEffect(() => {
    let prevMouseOver;
    const inventory = inventoryRef.current;

    const processDragOver = (event) => {
      const mouseOverCoordinates = event.target.id;

      if (mouseOverCoordinates !== prevMouseOver) {
        prevMouseOver = mouseOverCoordinates;

        setMouseOverCoords(mouseOverCoordinates);
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
  }, [inventoryRef, setMouseOverCoords]);
};

export default useDragOver;
