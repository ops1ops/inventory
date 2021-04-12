import React, { useCallback, useState } from 'react';

import Inventory from './components/Inventory';
import { deepClone, getInventoryItems } from './utils';
import { StoreContext } from './store/context';
import { allItems } from './mockData/items';
import { allInventories } from './mockData/inventories';
import './App.css';
import validateItems from './validators/validateItems';

const validatedItems = validateItems(allItems, allInventories);
const rootInventories = allInventories.slice(0, 2);

const App = () => {
  const [items, setItems] = useState(validatedItems);
  const [draggingItem, setDraggingItem] = useState({});
  const dropCoordinatesState = useState();
  const mouseOverCoordinatesState = useState();

  const moveItem = useCallback((itemId, newCoordinates, newInventoryId) => {
    setItems((prevItems) => {
      const newItems = deepClone(prevItems);
      const itemIndex = prevItems.findIndex((item) => item.id === itemId);

      newItems[itemIndex].coordinates = newCoordinates;

      if (newInventoryId) {
        newItems[itemIndex].inventoryId = newInventoryId;
      }

      return newItems;
    });
  }, []);

  const contextValue = {
    moveItem,
    allInventories,
    items,
    dropCoordinatesState,
    mouseOverCoordinatesState,
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
