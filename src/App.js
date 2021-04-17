import React, { useCallback, useState } from 'react';

import Inventory from './components/Inventory';
import { deepClone, getInventoryItems } from './utils/utils';
import { StoreContext } from './store/context';
import { allItems } from './mockData/items';
import { allInventories } from './mockData/inventories';
import validateItems from './validators/validateItems';
import { canMoveItem } from './validators/canMoveItem';
import './App.css';

const validatedItems = validateItems(allItems, allInventories);
const rootInventories = allInventories.slice(0, 2);

const App = () => {
  const [items, setItems] = useState(validatedItems);
  const [draggingItem, setDraggingItem] = useState({});
  const dropCoordinatesState = useState();
  const [mouseOverCoordinates, setMouseOverCoordinates] = useState();

  const moveItem = useCallback((itemId, newCoordinates, newInventoryId) => {
    setItems((prevItems) => {
      const newItems = deepClone(prevItems);
      const itemIndex = prevItems.findIndex((item) => item.id === itemId);
      const newItem = newItems[itemIndex];
      const inventoryId = newInventoryId || newItem.inventoryId;
      const newInventoryItems = prevItems.filter((inventory) => inventory.inventoryId === inventoryId);

      newItem.coordinates = newCoordinates;

      if (!canMoveItem(newItem, newInventoryItems)) {
        return prevItems;
      }

      if (newInventoryId) {
        newItem.inventoryId = newInventoryId;
      }

      return newItems;
    });
  }, []);

  const contextValue = {
    moveItem,
    allInventories,
    items,
    dropCoordinatesState,
    mouseOverCoordinates,
    setMouseOverCoordinates,
    draggingItem,
    setDraggingItem
  };

  return (
    <StoreContext.Provider value={contextValue}>
      <div className="container">
        {
          rootInventories.map((inventory) => (
            <Inventory key={inventory.id} items={getInventoryItems(items, inventory.id)} {...inventory} />
          ))
        }
      </div>
    </StoreContext.Provider>
  );
}

export default App;
