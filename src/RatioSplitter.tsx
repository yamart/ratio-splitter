import * as React from 'react'; 
import * as ReactDOM from 'react-dom'; 

interface RatioSplitterState {
    minWidthReached:boolean;
}

interface RatioSplitterProps {
    ratio:number;
    active:boolean;
    sideContent:any;
    contentMinWidth?:number;
    alternative?:string;
}

class RatioSplitter extends React.Component<RatioSplitterProps,RatioSplitterState> {
    el:HTMLDivElement;
    sideEl:HTMLDivElement;
    contentEl:HTMLDivElement;
    prevHeight:number;

    constructor(props:any) {
        super(props);

        this.onResize = this.onResize.bind(this);
        this.prevHeight = 0;
        this.state = {
            minWidthReached: false
        }
    }

    componentDidMount() {
        this.el = this.refs['rs-el'] as HTMLDivElement;
        this.sideEl = this.refs['rs-side'] as HTMLDivElement;
        this.contentEl = this.refs['rs-content'] as HTMLDivElement;

        this.onResize();
        window.addEventListener('resize', this.onResize);
    }

    componentDidUpdate(prevProps:RatioSplitterProps, prevState:RatioSplitterState) {
        if(prevProps.active !== this.props.active && !this.props.active) {
            this.reset();
        }

        if(prevProps.ratio !== this.props.ratio || 
           prevProps.sideContent !== this.props.sideContent ||
           prevProps.contentMinWidth !== this.props.contentMinWidth) {
            this.onResize();
        }
    }   

    onResize() {
        if(!this.props.active)
            return;

        this.setSpacing();
    }

    setSpacing() {
        let ratio = this.props.ratio,
            el = this.el,
            w = this.el.clientWidth,
            h = window.innerHeight,
            sideWidth = w - h*ratio;
        
        if(this.minWidthReached(sideWidth)) 
            return;

        if(h !== this.prevHeight) {
            this.prevHeight = h;
            this.contentEl.style.marginLeft = (h*ratio) + 'px';
        }

        this.fullWidthReached(sideWidth);
    }

    minWidthReached(sideWidth:number) {
        if(this.props.contentMinWidth && sideWidth < this.props.contentMinWidth) {
            if(!this.state.minWidthReached) {
                this.reset();
                this.setState({ minWidthReached: true });
            }
            return true;
        } else {
            this.state.minWidthReached && this.setState({ minWidthReached: false });
            return false;
        }
    }

    fullWidthReached(sideWidth:number) {
        let el = this.el;
        if(sideWidth <= 0) {
            !el.hasAttribute('data-full-width') && el.setAttribute('data-full-width','true');
        } else if(el.getAttribute('data-full-width') == 'true') {
            el.removeAttribute('data-full-width');
        }
    }

    reset() {
        this.prevHeight = 0;
        this.contentEl.style.marginLeft = '';
        this.el.removeAttribute('data-full-width');
    }

    render() {
        let state = this.state,
            props = this.props;
        
        return (
            <div className='ratio-splitter' ref='rs-el' data-active={props.active && !state.minWidthReached} data-alternative={props.alternative}>
                <div className='rs-side' ref='rs-side'>{ props.sideContent }</div>
                <div className='rs-content' ref='rs-content'>{ props.children }</div>
            </div>
        );
    }
}

export default RatioSplitter;