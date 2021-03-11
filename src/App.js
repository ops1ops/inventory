import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import Inventory from './components/Inventory';
import { findObjectInObject, formatCoordinates, getItemDetailsById, removeItem } from './utils';
import { ITEM_DIRECTIONS, ITEM_TYPES } from './constants';
import { StoreContext } from './store/context';

const bagItems = {
  [formatCoordinates(1, 1)]: {
    id: uuidv4(),
    typeId: ITEM_TYPES.smallBag,
    direction: ITEM_DIRECTIONS.vertical,
    inventory: {
      width: 3,
      height: 3,
      type: 'qwe-0',  // uniq id
      items: {
        [formatCoordinates(2, 2)]: {
          id: uuidv4(),
          typeId: ITEM_TYPES.smallBag,
          direction: ITEM_DIRECTIONS.vertical,
          inventory: {
            width: 2,
            height: 2,
            type: 'qwe-1',
            items: {
              [formatCoordinates(1, 1)]: {
                id: uuidv4(),
                typeId: ITEM_TYPES.roubles,
              }
            }
          }
        },
      },
    },
  },
}

const stashItems = {
  [formatCoordinates(2, 2)]: {
    id: uuidv4(),
    typeId: ITEM_TYPES.roubles,
    direction: ITEM_DIRECTIONS.vertical,
  },
  [formatCoordinates(4, 5)]: {
    id: uuidv4(),
    typeId: ITEM_TYPES.roubles,
    direction: ITEM_DIRECTIONS.vertical,
  },
  [formatCoordinates(7, 3)]: {
    id: uuidv4(),
    typeId: ITEM_TYPES.roubles,
    direction: ITEM_DIRECTIONS.vertical,
  },
  [formatCoordinates(15, 23)]: {
    id: uuidv4(),
    typeId: ITEM_TYPES.roubles,
    direction: ITEM_DIRECTIONS.vertical,
  },
  [formatCoordinates(10, 10)]: {
    id: uuidv4(),
    typeId: ITEM_TYPES.roubles,
    direction: ITEM_DIRECTIONS.vertical,
  },
  [formatCoordinates(11, 11)]: {
    id: uuidv4(),
    typeId: ITEM_TYPES.roubles,
    direction: ITEM_DIRECTIONS.vertical,
  },
  [formatCoordinates(12, 15)]: {
    id: uuidv4(),
    typeId: ITEM_TYPES.roubles,
    direction: ITEM_DIRECTIONS.vertical,
  },
}

const App = () => {
  const [{ bag, stash }, setItems] = useState({ bag: bagItems, stash: stashItems });

  const moveItemToOtherInventory = ({inventoryType: inventoryFrom, id}, {coordinates, inventoryType: inventoryTo}) => {
    setItems((prevItems) => {
      const {[inventoryFrom]: inventory} = prevItems;
      const [prevCoordinates, data] = getItemDetailsById(inventory, id);

      return {
        ...prevItems,
        [inventoryFrom]: removeItem(inventory, prevCoordinates),
        [inventoryTo]: {
          ...prevItems[inventoryTo],
          [coordinates]: data,
        },
      }
    })
  };

  const moveItemInInventory = (inventoryType, coordinates, itemId, parentTypes) => {
    setItems((prevItems) => {
      const { [inventoryType]: inventory } = prevItems;
      const [prevCoordinates, data] = getItemDetailsById(inventory, itemId);

      return {
        ...prevItems,
        [inventoryType]: {
          ...removeItem(inventory, prevCoordinates),
          [coordinates]: data,
        },
      }
    })
  }

  return (
    <StoreContext.Provider value={{moveItemInInventory, moveItemToOtherInventory}}>
      <div className="container">
        <Inventory type="bag" items={bag} height={4} width={4}/>
        <Inventory id='id' type="stash" items={stash} height={26} width={16}/>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
