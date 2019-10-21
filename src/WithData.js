import React, { useState } from 'react';
import MonsterList from './MonsterList';

const getFakeData = (numRows, page) => {
	const urgh = [];
	for (var i=0; i<numRows; i++) {
		urgh.push({
			label: `Label ${i} (${page})`
		});
	}
	return urgh;
};


const Loading = () => <span style={{ color: 'red' }}>Loading...</span>;

const Row = (data, styles) => (
	<div style={styles}>
		{data.label}
	</div>
);


const WithData = () => {
	const [pages, setPages] = useState({});
	const [totalResults, setTotalResults] = useState(null); // passing in `null` cause the component to immediately request the first page

	// gets called every time a user scrolls to data that hasn't been loaded yet. It gets fed the pages currently
	// needed to be loaded
	const fakeAsyncLoadPage = (pagesToLoad) => {
		pagesToLoad.forEach((page) => {
			setTimeout(() => {
				setPages({
					...pages,
					[`page${page}`]: getFakeData(200, page)
				});
				setTotalResults(1000000);
			}, 1000);
		});
	};

	return (
		<MonsterList
			height={400}
			rowHeight={20}
			data={pages}
			totalResults={totalResults}
			batchSize={200}
			debounceTime={200}
			onRequestLoad={fakeAsyncLoadPage}
			components={{
				loading: Loading,
				row: Row
			}}
		/>
	);
};

export default WithData;