import React from 'react';

const BROWSER_LIMIT_DOM_EL_HEIGHT_HARD_MAX = 1000000;


export default class MonsterList extends React.Component {

	constructor (props) {
		super(props);
		this.onScroll = this.onScroll.bind(this);
		this.onJump = this.onJump.bind(this);

		this.el = React.createRef();

		const virtualHeight = props.rowHeight * props.totalResults;
		const realScrollableHeight = Math.min(virtualHeight, BROWSER_LIMIT_DOM_EL_HEIGHT_HARD_MAX);

		const pageHeight = realScrollableHeight / 100;
		const numPages =  Math.ceil(virtualHeight / pageHeight);

		this.state = {
			mounted: false,
			virtualHeight,
			scrollableHeight: realScrollableHeight,
			pageHeight,
			numPages,
			jumpinessCoefficient: (virtualHeight - realScrollableHeight) / (numPages - 1),
		};

		// setting/getting this from state is too slow
		this.prevScrollTop = 0;
		this.offset = 0;
		this.page = 0;
	}

	componentDidMount () {
		if (!this.state.mounted) {
			this.setState(() => ({ mounted: true }));
		}
	}

	onScroll () {
		const { height } = this.props;

		if (!this.el.current) {
			return;
		}
		const scrollTop = this.el.current.scrollTop;

		if (Math.abs(scrollTop - this.prevScrollTop) > height) {
			this.onJump();
		} else {
			this.onNearScroll();
		}

		// just for repainting
		this.setState(() => ({ trackedState: scrollTop }));
	}

	onJump () {
		const { virtualHeight, scrollableHeight, jumpinessCoefficient, pageHeight } = this.state;
		const { height } = this.props;
		const scrollTop = this.el.current.scrollTop;

		this.page = Math.floor(scrollTop * ((virtualHeight - height) / (scrollableHeight - height)) * (1 / pageHeight));
		this.offset = Math.round(this.page * jumpinessCoefficient);
		this.prevScrollTop = scrollTop;
	}

	onNearScroll () {
		const { pageHeight, jumpinessCoefficient } = this.state;
		const scrollTop = this.el.current.scrollTop;

		if (scrollTop + this.offset > (this.page + 1) * pageHeight) {
			this.page = this.page+1;
			this.offset = Math.round(this.page * jumpinessCoefficient);
			this.prevScrollTop = scrollTop - jumpinessCoefficient;
			this.el.current.scrollTop = this.prevScrollTop;
		} else if (scrollTop + this.offset < this.page * pageHeight) {
			this.page = this.page-1;
			this.offset = Math.round(this.page * jumpinessCoefficient);
			this.prevScrollTop = scrollTop + jumpinessCoefficient;
			this.el.current.scrollTop = this.prevScrollTop;
		} else {
			this.prevScrollTop = scrollTop;
		}
	}

	getRows () {
		const { virtualHeight } = this.state;
		const { height, rowHeight } = this.props;

		if (!this.el.current) {
			return null;
		}

		let y = this.el.current.scrollTop + this.offset,
			buffer = height,
			top = Math.floor((y - buffer) / rowHeight),
			bottom = Math.ceil((y + height + buffer) / rowHeight);

		top = Math.max(0, top);
		bottom = Math.min(virtualHeight / rowHeight, bottom);

		let rows = [];
		for (let i=top; i<=bottom; i++) {
			rows.push(
				<div key={i} style={{
					height: rowHeight,
					position: 'absolute',
					top: i * rowHeight - this.offset
				}}>
					{i+1}
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
				width: '100%',
				float: 'left',
				border: '1px solid black',
				overflow: 'auto'
			}}
		    ref={this.el}
			onScroll={this.onScroll}>
				<div style={{
					height: scrollableHeight,
					position: 'relative',
					width: '100%',
					overflow: 'hidden'
				}}>
					{this.getRows()}
				</div>
			</div>
		);
	}
}

MonsterList.defaultProps = {
	onDebug: () => {}
};
