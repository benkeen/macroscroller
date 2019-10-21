import React, { useState } from 'react';
import ListSizeDemos from './ListSizeDemos';
import './App.css';

const App = () => {
	const [tab, selectTab] = useState(1);

	const getContent = () => {
		if (tab === 1) {
			return <ListSizeDemos />;
		}
		return null;
	};

	return (
		<div className="App">
			<h1>Massive List rendering</h1>

			<span className="navLink" onClick={() => selectTab(1)}>List size demos</span> | <span className="navLink" onClick={() => selectTab(2)}>With async loaded data</span>
			{getContent()}
		</div>
	);
};

export default App;
