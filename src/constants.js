export const CELL_SIZE = 50;

export const DATA_TRANSFER = {
  coordinates: 'touched item cell coordinates',
  id: 'item id',
  typeId: 'type id',
  inventoryType: 'inventory type',
}

export const COORDINATES_SEPARATOR = '-';

export const ITEM_DIRECTIONS = {
  vertical: 'vertical',
  horizontal: 'horizontal'
};

export const ITEM_TYPES = {
  roubles: 'Roubles',
  smallBag: 'Sling bag',
}

export const ITEM_PARAMS = {
  [ITEM_TYPES.roubles]: {
    image: 'https://tarkov-market.com/img/roubles_lg.png',
    width: 1,
    height: 1,
  },
  [ITEM_TYPES.smallBag]: {
    image: 'https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/thumb/7/72/Tactical_Sling_bag.png/320px-Tactical_Sling_bag.png?version=eb617d17d23014022a52ae9ff21a4a54',
    width: 2,
    height: 2,
  }
};
