import React, { useState } from 'react';
import MonsterList from './MonsterList';
import './App.css';


// this'll be loaded piecemeal and pass in as an pagination object for a quick hash lookup
const data = [];
for (let i=0; i<100000; i++) {
	data.push(i);
}


const Debug = (props) => {
	if (props === null) {
		return null;
	}
	const { numPages, pageHeight, jumpinessCoefficient, offset, prevScrollTop, page } = props;

	return (
		<ul style={{
			float: 'left',
			textAlign: 'left',
			border: '1px solid blue',
			padding: 10,
			marginLeft: 20
		}}>
			<li><label>numPages:</label> {numPages}</li>
			<li><label>pageHeight:</label> {pageHeight}</li>
			<li><label>jumpinessCoefficient:</label> {jumpinessCoefficient}</li>
			<li><label>page:</label> {page}</li>
			<li><label>offset:</label> {offset}</li>
			<li><label>virtual y:</label> {prevScrollTop + offset}</li>
			<li><label>real y:</label> {prevScrollTop}</li>
		</ul>
	);
};


const App = () => {
	const [debugProps, setDebugProps] = useState(null);

	return (
		<div className="App">
			<h1>Massive List rendering</h1>

			<MonsterList
				height={400}
				rowHeight={50}
				data={data}
				total
				onDebug={setDebugProps}
			/>
			<Debug {...debugProps} />
		</div>
	);
};

export default App;
