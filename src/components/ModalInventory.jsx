import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import Inventory from './Inventory';
import { getInventory, getInventoryItems, getStyleBySize } from '../utils';
import { StoreContext } from '../store/context';

Modal.setAppElement('#root');

const ModalInventory = ({ parentSize, id }) => {
  const { items, allInventories } = useContext(StoreContext)
  const [isOpened, setOpened] = useState(false);

  const closeModal = (event) => {
    event.stopPropagation();

    setOpened(false);
  }

  const openModal = () => {
    setOpened(true);
  }

  return (
    <div onDoubleClick={openModal} className="modal-inventory-container" style={getStyleBySize(parentSize)}>
      <Modal isOpen={isOpened} className="modal-inventory" style={{ zIndex: 1 }}>
        <div className="modal-inventory">
          <button onClick={closeModal}>close</button>
          <Inventory id={id} items={getInventoryItems(items, id)} {...getInventory(allInventories, id)} />
        </div>
      </Modal>
    </div>
  );
};

ModalInventory.propTypes = {};

export default ModalInventory;
