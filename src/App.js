import React from 'react';
import MonsterList from './MonsterList';
import './App.css';


// this'll be loaded piecemeal and pass in as an pagination object for a quick hash lookup
const data = [];
for (let i=0; i<100000; i++) {
	data.push(i);
}


// const Debug = (props) => {
// 	if (props === null) {
// 		return null;
// 	}
// 	const { numPages, pageHeight, jumpinessCoefficient, offset, prevScrollTop, page } = props;
//
// 	return (
// 		<ul style={{
// 			float: 'left',
// 			textAlign: 'left',
// 			border: '1px solid blue',
// 			padding: 10,
// 			marginLeft: 20
// 		}}>
// 			<li><label>numPages:</label> {numPages}</li>
// 			<li><label>pageHeight:</label> {pageHeight}</li>
// 			<li><label>jumpinessCoefficient:</label> {jumpinessCoefficient}</li>
// 			<li><label>page:</label> {page}</li>
// 			<li><label>offset:</label> {offset}</li>
// 			<li><label>virtual y:</label> {prevScrollTop + offset}</li>
// 			<li><label>real y:</label> {prevScrollTop}</li>
// 		</ul>
// 	);
// };


const App = () => {
//	const [debugProps, setDebugProps] = useState(null);

	return (
		<div className="App">
			<h1>Massive List rendering</h1>

			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<div style={{ flex: 1, paddingRight: 10 }}>
					<h3>100</h3>
					<MonsterList
						height={400}
						rowHeight={50}
						data={data}
						totalResults={100}
					/>
					<p>(No jumping)</p>
				</div>
				<div style={{ flex: 1, paddingRight: 10 }}>
					<h3>1,000</h3>
					<MonsterList
						height={400}
						rowHeight={50}
						data={data}
						totalResults={1000}
					/>
					<p>(No jumping)</p>
				</div>
				<div style={{ flex: 1, paddingRight: 10 }}>
					<h3>100,000</h3>
					<MonsterList
						height={400}
						rowHeight={50}
						data={data}
						totalResults={100000}
					/>
					<p>(jumping)</p>
				</div>
				<div style={{ flex: 1, paddingRight: 10 }}>
					<h3>1,000,000</h3>
					<MonsterList
						height={400}
						rowHeight={50}
						data={data}
						totalResults={1000000}
					/>
				</div>
				<div style={{ flex: 1, paddingRight: 10 }}>
					<h3>20,000,000</h3>
					<MonsterList
						height={400}
						rowHeight={50}
						data={data}
						totalResults={20000000}
					/>
				</div>
				<div style={{ flex: 1, paddingRight: 10 }}>
					<h3>50,000,000</h3>
					<MonsterList
						height={400}
						rowHeight={50}
						data={data}
						totalResults={50000000}
					/>
				</div>
				<div style={{ flex: 1, paddingRight: 10 }}>
					<h3>100,000,000</h3>
					<MonsterList
						height={400}
						rowHeight={50}
						data={data}
						totalResults={100000000}
					/>
				</div>
				<div style={{ flex: 1 }}>
					<h3>1,000,000,000</h3>
					<MonsterList
						height={400}
						rowHeight={50}
						data={data}
						totalResults={1000000000}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
