import React, { useState } from 'react';
import MongoList from './MongoList';
import './App.css';


const data = [];
for (let i=0; i<10000; i++) {
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

			<MongoList
				height={400}
				data={data}
				onDebug={setDebugProps}
			/>
			<Debug {...debugProps} />
		</div>
	);
};

export default App;
