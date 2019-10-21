import React from 'react';
import MonsterList from './MonsterListDemo';

let data = [];

const getVirtualHeight = (rows, rowHeight) => rows * rowHeight + 'px';


export default () => (
	<div style={{ display: 'flex', flexDirection: 'row' }}>
		<div style={{ flex: 1, paddingRight: 10 }}>
			<h3>5</h3>
			<MonsterList
				height={400}
				rowHeight={50}
				data={data}
				totalResults={5}
			/>
			<label>{getVirtualHeight(5, 50)}</label>
			<p>(No scroll at all)</p>
		</div>
		<div style={{ flex: 1, paddingRight: 10 }}>
			<h3>100</h3>
			<MonsterList
				height={400}
				rowHeight={50}
				data={data}
				totalResults={100}
			/>
			<label>{getVirtualHeight(100, 50)}</label>
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
			<label>{getVirtualHeight(1000, 50)}</label>
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
			<label>{getVirtualHeight(100000, 50)}</label>
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
			<label>{getVirtualHeight(1000000, 50)}</label>
		</div>
		<div style={{ flex: 1, paddingRight: 10 }}>
			<h3>20,000,000</h3>
			<MonsterList
				height={400}
				rowHeight={50}
				data={data}
				totalResults={20000000}
			/>
			<label>{getVirtualHeight(20000000, 50)}</label>
		</div>
		<div style={{ flex: 1, paddingRight: 10 }}>
			<h3>50,000,000</h3>
			<MonsterList
				height={400}
				rowHeight={50}
				data={data}
				totalResults={50000000}
			/>
			<label>{getVirtualHeight(50000000, 50)}</label>
		</div>
		<div style={{ flex: 1, paddingRight: 10 }}>
			<h3>100,000,000</h3>
			<MonsterList
				height={400}
				rowHeight={50}
				data={data}
				totalResults={100000000}
			/>
			<label>{getVirtualHeight(100000000, 50)}</label>
		</div>
		<div style={{ flex: 1 }}>
			<h3>1,000,000,000</h3>
			<MonsterList
				height={400}
				rowHeight={50}
				data={data}
				totalResults={1000000000}
			/>
			<label>{getVirtualHeight(1000000000, 50)}</label>
		</div>
	</div>
);
