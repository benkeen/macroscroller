import React, { useState } from 'react';
import ListSizeDemos from './ListSizeDemos';
import WithData from './WithData';
import './App.css';

const App = () => {
	const [tab, selectTab] = useState(1);

	const getContent = () => {
		if (tab === 1) {
			return <ListSizeDemos />;
		} else if (tab === 2) {
			return <WithData />;
		}
		return null;
	};

	return (
		<div className="App">
			<h1>Massive List rendering</h1>

			<span className="navLink" onClick={() => selectTab(1)}>List size demos</span> |&nbsp;
			<span className="navLink" onClick={() => selectTab(2)}>Passing in all data</span> |&nbsp;
			<span className="navLink" onClick={() => selectTab(3)}>Async loading data</span>

			{getContent()}
		</div>
	);
};

export default App;
