import './App.css';
import Inventory from './components/Inventory';
import Item from './components/Item';

const App = () => {
	return (
		<div className="container">
			<Item width={2} height={2} />
			<Inventory height={8} width={8} />
		</div>
	);
}

export default App;
