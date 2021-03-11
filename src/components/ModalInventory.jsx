import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Inventory from './Inventory';
import { getStyleBySize } from '../utils';

Modal.setAppElement('#root');

const ModalInventory = ({ parentSize, parentType, ...rest }) => {
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
      {
        isOpened && (
          <div className="modal-inventory">
            <button onClick={closeModal}>close</button>
            <Inventory parentType={parentType} {...rest} />
          </div>
        )
      }
    </div>
  );
};

ModalInventory.propTypes = {};

export default ModalInventory;
