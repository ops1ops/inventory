import React from 'react';

import './App.css';
import Inventory from './components/Inventory';
import { formatCoordinates } from './utils';

const items = {
  [formatCoordinates(1, 1)]: {
    width: 1,
    height: 1
  }
}

const App = () => {

	return (
		<div className="container">
      <Inventory type="bag" items={items} height={4} width={4} />
      <Inventory type="stash" items={items} height={8} width={8} />
		</div>
	);
}

export default App;
