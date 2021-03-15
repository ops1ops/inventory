import { formatCoordinates, withIds } from '../utils';
import { ITEM_TYPES } from './itemParams';

export const allItems = withIds([
  {
    typeId: ITEM_TYPES.smallBag,
    coordinates: formatCoordinates(1, 1),
    inventoryId: '1', // item's inventory // required
    childInventoryId: '3', // if item is not inventory => null // not required
  },
  {
    typeId: ITEM_TYPES.smallBag,
    coordinates: formatCoordinates(15, 23),
    inventoryId: '2',
    childInventoryId: '5',
  },
  {
    typeId: ITEM_TYPES.attack,
    coordinates: formatCoordinates(5, 15),
    inventoryId: '2',
    childInventoryId: '6',
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
  {
    typeId: ITEM_TYPES.roubles,
    coordinates: formatCoordinates(3, 3),
    inventoryId: '3',
    childInventoryId: null,
  },
  {
    typeId: ITEM_TYPES.smallBag,
    coordinates: formatCoordinates(4, 4),
    inventoryId: '3',
    childInventoryId: null,
  },
]);