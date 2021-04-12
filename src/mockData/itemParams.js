export const ITEM_TYPES = {
  roubles: 'Roubles',
  smallBag: 'Sling bag',
  attack: 'Attack 2',
  hexgrid: 'Hexgrid',
}

export const ITEM_PARAMS = {
  [ITEM_TYPES.roubles]: {
    image: 'https://github.com/RatScanner/EfTIcons/blob/master/name/item_money_ruble_small.png?raw=true',
    width: 1,
    height: 1,
  },
  [ITEM_TYPES.smallBag]: {
    image: 'https://github.com/RatScanner/EfTIcons/blob/master/name/item_equipment_backpack_molle.png?raw=true',
    width: 2,
    height: 2,
  },
  [ITEM_TYPES.attack]: {
    image: 'https://cdn.discordapp.com/attachments/499325755721777161/821439225316638750/item_equipment_backpack_sso.png',
    width: 6,
    height: 7,
  },
  [ITEM_TYPES.hexgrid]: {
    image: 'https://cdn.discordapp.com/attachments/499325755721777161/821435630487076924/371.png',
    width: 3,
    height: 3
  }
};