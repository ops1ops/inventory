import { getIdIncrement, withIds } from '../utils';

const incrementId = getIdIncrement();

export const allInventories = withIds([
  {
    width: 4,
    height: 4,
  },
  {
    width: 16,
    height: 26,
  },
  {
    width: 5,
    height: 5,
  },
  {
    width: 3,
    height: 3,
  },
  {
    width: 7,
    height: 7,
  },
  {
    width: 8,
    height: 8,
  },

], incrementId);