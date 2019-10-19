import React, { useState } from 'react';
import MongoList from './MongoList';
import './App.css';


const data = [];
for (let i=0; i<2000; i++) {
	data.push(i);
}


const Debug = (props) => {
	if (props) {
		return null;
	}
	const { numPages, pageHeight, jumpinessCoefficient, page } = props;

	return (
		<ul style={{ float: 'left', border: '1px solid blue', padding: 10, marginLeft: 20 }}>
			<li><label>numPages:</label> {numPages}</li>
			<li><label>pageHeight:</label> {pageHeight}</li>
			<li><label>jumpinessCoefficient:</label> {jumpinessCoefficient}</li>
			<li><label>page:</label> {page}</li>
			<li><label>numPages:</label> {numPages}</li>
			<li><label>numPages:</label> {numPages}</li>
			<li><label>numPages:</label> {numPages}</li>
			<li><label>numPages:</label> {numPages}</li>
		</ul>
	);
};

// dbg.append("page = " + page + "<br>");
// dbg.append("offset = " + offset + "<br>");
// dbg.append("virtual y = " + (prevScrollTop + offset) + "<br>");
// dbg.append("real y = " + prevScrollTop + "<br>");
// dbg.append("rows in the DOM = " + $(".row").length + "<br>");


const App = () => {
	const [debugProps, setDebugProps] = useState(null);

	return (
		<div className="App">
			<h1>MongoList</h1>

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
