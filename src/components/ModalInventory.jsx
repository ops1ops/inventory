import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import Inventory from './Inventory';
import { getInventory, getInventoryItems } from '../utils/utils';
import { StoreContext } from '../store/context';

Modal.setAppElement('#root');

const ModalInventory = ({ id, typeId }) => {
  const { items, allInventories } = useContext(StoreContext)
  const [isOpened, setOpened] = useState(false);

  const closeModal = (event) => {
    event.stopPropagation();

    setOpened(false);
  };

  const openModal = () => {
    setOpened(true);
  };

  // TODO: make modal draggable
  return (
    <div onDoubleClick={openModal} className="modal-inventory-container">
      <Modal isOpen={isOpened} className="modal-inventory" shouldCloseOnEsc>
        <div className="modal-inventory-header">
          <span className="header-text">{typeId} ({id})</span>
          <button onClick={closeModal} className="close-button">X</button>
        </div>
        <Inventory id={id} items={getInventoryItems(items, id)} {...getInventory(allInventories, id)} />
      </Modal>
    </div>
  );
};

ModalInventory.propTypes = {};

export default ModalInventory;
