import React from 'react';


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
			page: 0,
			offset: 0,
			prevScrollTop: 0,
			rows: {}, // caches rows
		};
	}

	componentDidMount () {
		this.props.onDebug({ ...this.state });
	}

	onScroll () {
		const { prevScrollTop } = this.state;
		const { height } = this.props;

		if (!this.el.current) {
			return;
		}

		const scrollTop = this.el.current.scrollTop;

		let debugState = {};

		console.log('scroll distance: ', Math.abs(scrollTop - prevScrollTop));
		if (Math.abs(scrollTop - prevScrollTop) > height) {
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

		const page = Math.floor(scrollTop * ((virtualHeight - height) / (scrollableHeight - height)) * (1 / pageHeight));
		console.log('new page ', page);

		const newState = {
			page,
			offset: Math.round(page * jumpinessCoefficient),
			prevScrollTop: scrollTop
		};

		this.setState(() => (newState));

		return newState;
	}

	onNearScroll () {
		const { page, offset, pageHeight, jumpinessCoefficient } = this.state;
		const scrollTop = this.el.current.scrollTop;

		const newState = {};
		if (scrollTop + offset > (page + 1) * pageHeight) {
			newState.page = page+1;
			newState.offset = Math.round(page * jumpinessCoefficient);
			newState.prevScrollTop = scrollTop - jumpinessCoefficient;
			this.el.current.scrollTop = newState.prevScrollTop;
		} else if (scrollTop + offset < page * pageHeight) {
			newState.page = page-1;
			newState.offset = Math.round(page * jumpinessCoefficient);
			newState.prevScrollTop = scrollTop + jumpinessCoefficient;
			this.el.current.scrollTop = newState.prevScrollTop;
		} else {
			newState.prevScrollTop = scrollTop;
		}

		console.log('(onNearScroll) new state: ', newState);

		this.setState(() => (newState));

		return newState;
	}

	getRows () {
		const { offset, rowHeight, virtualHeight } = this.state;
		const { data, height } = this.props;

		if (!this.el.current) {
			return null;
		}

		// calculate the viewport + buffer
		let y = this.el.current.scrollTop + offset,
			buffer = height,
			top = Math.floor((y - buffer) / rowHeight),
			bottom = Math.ceil((y + height + buffer)/rowHeight);

		top = Math.max(0, top);
		bottom = Math.min(virtualHeight / rowHeight, bottom);

		console.log(top, bottom);

		let rows = [];
		for (let i=top; i<=bottom; i++) {
			rows.push(
				<div key={data[i]} style={{
					height: 50,
					position: 'absolute',
					top: data[i] * 50 - offset
				}}>
					{data[i]}
				</div>
			);
		}
		return rows;
	}

	render () {
		const { height } = this.props;
		const { virtualHeight } = this.state;

		return (
			<div style={{
				height,
				width: 300,
				float: 'left',
				border: '1px solid black',
				overflow: 'auto'
			}} ref={this.el}
			onScroll={this.onScroll}>
				<div style={{
					height: virtualHeight,
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


/*
Visual representation of the approach:

--------
   --------
      --------
         --------
            --------
               --------
                  --------
                     --------
                        --------
                           --------
                              --------
                                 --------
                                    --------
                                       --------
                                          --------

==================================================

[=] - real scrollable height (h)
[-] - "pages";  total height of all (n) pages is (th) = (ph) * (n)

The overlap between pages is (cj) and is the distance the scrollbar
will jump when we adjust the scroll position during page switch.

To keep things smooth, we need to minimize both (n) and (cj).
Setting (ph) at 1/100 of (h) is a good start.
*/


// these should be calculated based on incoming data

/*
var th = 1000000000;            // virtual height
var h =  1000000;               // real scrollable height

var ph = h / 100;               // page height
var n = Math.ceil(th / ph);     // number of pages
var vp = 400;                   // viewport height
var rh = 50;                    // row height
var cj = (th - h) / (n - 1);    // "jumpiness" coefficient

var page = 0;                   // current page
var offset=0;                   // current page offset
var prevScrollTop = 0;

var rows = {};                  // cached row nodes

var viewport, content;


$(function() {
	viewport = $("#viewport");
	content = $("#content");

	viewport.css("height", vp);
	content.css("height", h);

	viewport.scroll(onScroll);
	viewport.trigger("scroll");
});

// function onScroll() {
// 	var scrollTop = viewport.scrollTop();
//
// 	if (Math.abs(scrollTop-prevScrollTop) > vp)
// 		onJump();
// 	else
// 		onNearScroll();
//
// 	renderViewport();
//
// 	logDebugInfo();
// }

function onNearScroll() {
	var scrollTop = viewport.scrollTop();

	// next page
	if (scrollTop + offset > (page+1)*ph) {
		page++;
		offset = Math.round(page * cj);
		viewport.scrollTop(prevScrollTop = scrollTop - cj);
		removeAllRows();
	}
	// prev page
	else if (scrollTop + offset < page*ph) {
		page--;
		offset = Math.round(page * cj);
		viewport.scrollTop(prevScrollTop = scrollTop + cj);
		removeAllRows();
	}
	else
		prevScrollTop = scrollTop;
}

function onJump() {
	var scrollTop = viewport.scrollTop();
	page = Math.floor(scrollTop * ((th-vp) / (h-vp)) * (1/ph));
	offset = Math.round(page * cj);
	prevScrollTop = scrollTop;

	removeAllRows();
}

function removeAllRows() {
	for (var i in rows) {
		rows[i].remove();
		delete rows[i];
	}
}

function renderViewport() {
	// calculate the viewport + buffer
	var y = viewport.scrollTop() + offset,
		buffer = vp,
		top = Math.floor((y-buffer)/rh),
		bottom = Math.ceil((y+vp+buffer)/rh);

	top = Math.max(0,top);
	bottom = Math.min(th/rh,bottom);

	// remove rows no longer in the viewport
	for (var i in rows) {
		if (i < top || i > bottom) {
			rows[i].remove();
			delete rows[i];
		}
	}

	// add new rows
	for (var i=top; i<=bottom; i++) {
		if (!rows[i])
			rows[i] = renderRow(i);
	}
}

function renderRow(row) {
	return $("<div class='row' />")
		.css({
			top: row*rh - offset,
			height: rh
		})
		.text("row " + (row+1))
		.appendTo(content);
}

function logDebugInfo() {
	var dbg = $("#debug");
	dbg.empty();
	dbg.append("n = " + n + "<br>");
	dbg.append("ph = " + ph + "<br>");
	dbg.append("cj = " + cj + "<br>");
	dbg.append("<hr>");
	dbg.append("page = " + page + "<br>");
	dbg.append("offset = " + offset + "<br>");
	dbg.append("virtual y = " + (prevScrollTop + offset) + "<br>");
	dbg.append("real y = " + prevScrollTop + "<br>");
	dbg.append("rows in the DOM = " + $(".row").length + "<br>");
}
*/