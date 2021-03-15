export const ITEM_TYPES = {
  roubles: 'Roubles',
  smallBag: 'Sling bag',
  attack: 'Attack 2',
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
  },
  [ITEM_TYPES.attack]: {
    image: 'https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/thumb/0/07/Attack.PNG/320px-Attack.PNG?version=93f1c964d7d1345fee71644aadc0d551',
    width: 6,
    height: 7,
  }
};