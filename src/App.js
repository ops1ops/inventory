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

  return (
    <StoreContext.Provider value={{ moveItem, allInventories, items }}>
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
