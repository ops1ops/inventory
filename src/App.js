import React, { useCallback, useState } from 'react';

import './App.css';
import Inventory from './components/Inventory';
import {
  formatCoordinates,
  getIdIncrement,
  getInventory,
  getInventoryItems,
  validateCoordinates,
  withIds,
} from './utils';
import { ITEM_TYPES } from './constants';
import { StoreContext } from './store/context';

const incrementId = getIdIncrement();

const allInventories = withIds([
  {
    width: 4,
    height: 4,
  },
  {
    width: 16,
    height: 26,
  },
  {
    width: 2,
    height: 2,
  }
], incrementId);

const allItems = withIds([
  {
    typeId: ITEM_TYPES.smallBag,
    coordinates: formatCoordinates(1, 1),
    inventoryId: '1', // item's inventory // required
    childInventoryId: '3', // if item is not inventory => null // not required
  },
  {
    typeId: ITEM_TYPES.roubles,
    coordinates: formatCoordinates(2, 2),
    inventoryId: '3',
    childInventoryId: null,
  },
  {
    typeId: ITEM_TYPES.roubles,
    coordinates: formatCoordinates(5, 23),
    inventoryId: '2',
    childInventoryId: null,
  },
  {
    typeId: ITEM_TYPES.roubles,
    coordinates: formatCoordinates(3, 4),
    inventoryId: '2',
    childInventoryId: null,
  },
  {
    typeId: ITEM_TYPES.roubles,
    coordinates: formatCoordinates(4, 4),
    inventoryId: '2',
    childInventoryId: null,
  },
  {
    typeId: ITEM_TYPES.roubles,
    coordinates: formatCoordinates(7, 3),
    inventoryId: '2',
    childInventoryId: null,
  },
]);

const validatedItems = validateCoordinates(allItems, allInventories);

const App = () => {
  const initialInventories = allInventories.slice(0, 2).map(({ id }) => id);
  const [items, setItems] = useState(validatedItems);

  const moveItem = useCallback((itemId, newCoordinates, newInventoryId) => {
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === itemId);
      const newItems = prevItems.slice();

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
          initialInventories.map((id) => (
            <Inventory key={id} items={getInventoryItems(items, id)} {...getInventory(allInventories, id)} />
          ))
        }
      </div>
    </StoreContext.Provider>
  );
}

export default App;
