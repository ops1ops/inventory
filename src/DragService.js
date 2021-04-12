import { CELL_SIZE } from './constants';
import { formatCoordinates } from './utils';

class DragService {
  getItemData = (event) => {
    return {
      coordinates: this.getTouchedItemCellCoordinates(event),
      touchedItemCellCoordinates: this.getTouchedItemCellCoordinates(event),
      id: event.target.dataset.id,
      typeId: event.target.dataset.type_id,
      inventoryId: event.path[3].className.split(' ')[1], // inventory id where we took item
    }
  }

  getTouchedItemCellCoordinates = (event) => {
    const { offsetX, offsetY } = event;

    const touchedItemCellX = Math.ceil(offsetX / CELL_SIZE);
    const touchedItemCellY = Math.ceil(offsetY / CELL_SIZE);

    return formatCoordinates(touchedItemCellX, touchedItemCellY);
  }
}

export default DragService;