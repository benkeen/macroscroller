import React from 'react';


let testPrevScrollTop = 0;
let testOffset = 0;
let testPage = 0;

export default class MongoList extends React.Component {
	constructor (props) {
		super(props);
		this.onScroll = this.onScroll.bind(this);
		this.onJump = this.onJump.bind(this);
		this.el = React.createRef();

		const virtualHeight        = 1000000000; //th
		const realScrollableHeight = 1000000; // h

		const pageHeight = realScrollableHeight / 100;
		const numPages =  Math.ceil(virtualHeight / pageHeight);

		this.state = {
			virtualHeight, // (th)
			scrollableHeight: realScrollableHeight, // h
			pageHeight, // ph
			numPages, // n
			rowHeight: 50,  // rh
			jumpinessCoefficient: (virtualHeight - realScrollableHeight) / (numPages - 1), // cj
			// page: 0,
			// offset: 0,
			// prevScrollTop: 0,
			rows: {}, // caches rows
		};
	}

	componentDidMount () {
		this.props.onDebug({ ...this.state });
	}

	onScroll () {
		//const { prevScrollTop } = this.state;
		const { height } = this.props;

		if (!this.el.current) {
			return;
		}

		const scrollTop = this.el.current.scrollTop;

		let debugState = {};

		// problem: keeps getting caught in a "jump"
		if (Math.abs(scrollTop - testPrevScrollTop) > height) {
			debugState = this.onJump();
		} else {
			debugState = this.onNearScroll();
		}

		this.props.onDebug({ ...this.state, debugState });
	}

	onJump () {
		const { virtualHeight, scrollableHeight, jumpinessCoefficient, pageHeight } = this.state;
		const { height } = this.props;
		const scrollTop = this.el.current.scrollTop;

		testPage = Math.floor(scrollTop * ((virtualHeight - height) / (scrollableHeight - height)) * (1 / pageHeight));
		console.log('new page ', testPage);

		const newState = {
			page: testPage,
			// offset: Math.round(page * jumpinessCoefficient),
			//prevScrollTop: scrollTop
		};

		testOffset = Math.round(testPage * jumpinessCoefficient);
		testPrevScrollTop = scrollTop;
		// this.setState(() => (newState));

		return newState;
	}

	onNearScroll () {
		//const { page, offset, pageHeight, jumpinessCoefficient } = this.state;
		const { pageHeight, jumpinessCoefficient } = this.state;
		const scrollTop = this.el.current.scrollTop;

		const newState = {};
		if (scrollTop + testOffset > (testPage + 1) * pageHeight) {
			testPage = testPage+1;
			// newState.offset = Math.round(page * jumpinessCoefficient);
			//newState.prevScrollTop = scrollTop - jumpinessCoefficient;

			testOffset = Math.round(testPage * jumpinessCoefficient);
			testPrevScrollTop = scrollTop - jumpinessCoefficient;

			//this.el.current.scrollTop = newState.prevScrollTop;
			this.el.current.scrollTop = testPrevScrollTop;
		} else if (scrollTop + testOffset < testPage * pageHeight) {
			testPage = testPage-1;
			//newState.offset = Math.round(page * jumpinessCoefficient);
			//newState.prevScrollTop = scrollTop + jumpinessCoefficient;

			testOffset = Math.round(testPage * jumpinessCoefficient);
			testPrevScrollTop = scrollTop + jumpinessCoefficient;

			this.el.current.scrollTop = testPrevScrollTop;
		} else {
			//newState.prevScrollTop = scrollTop;
			testPrevScrollTop = scrollTop;
		}

		// if (newState.prevScrollTop < 0 ) {
		// 	//console.log('...!');
		// 	newState.prevScrollTop = 0;
		// }

		if (testPrevScrollTop < 0 ) {
			//console.log('...!');
			testPrevScrollTop = 0;
		}

		//console.log('(onNearScroll) new state: ', newState);

		this.setState(() => (newState));

		return newState;
	}

	getRows () {
		const { rowHeight, virtualHeight } = this.state;
		const { height } = this.props;

		if (!this.el.current) {
			return null;
		}

		// calculate the viewport + buffer
		let y = this.el.current.scrollTop + testOffset,
			buffer = height,
			top = Math.floor((y - buffer) / rowHeight),
			bottom = Math.ceil((y + height + buffer)/rowHeight);

		top = Math.max(0, top);
		bottom = Math.min(virtualHeight / rowHeight, bottom);

		let rows = [];

		//console.log(;
		for (let i=top; i<=bottom; i++) {

			rows.push(
				<div key={i} style={{
					height: 50,
					position: 'absolute',
					top: i * 50 - testOffset
				}}>
					{i}
				</div>
			);
		}
		return rows;
	}

	render () {
		const { height } = this.props;
		const { scrollableHeight } = this.state;

		return (
			<div style={{
				height,
				width: 300,
				float: 'left',
				border: '1px solid black',
				overflow: 'auto'
			}}
		    ref={this.el}
			onScroll={this.onScroll}>
				<div style={{
					height: scrollableHeight,
					position: 'relative',
					width: 300,
					overflow: 'hidden'
				}}>
					{this.getRows()}
				</div>
			</div>
		);
	}
}
