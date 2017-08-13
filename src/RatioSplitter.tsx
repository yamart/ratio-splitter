import * as React from 'react'; 
import * as ReactDOM from 'react-dom'; 

interface RatioSplitterState {
    minWidthReached?:boolean;
    fullWidthReached?:boolean;
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
    parentEl:HTMLDivElement;
    sideEl:HTMLDivElement;
    contentEl:HTMLDivElement;
    prevHeight:number;

    constructor(props:any) {
        super(props);

        this.onResize = this.onResize.bind(this);
        this.prevHeight = 0;
        this.state = {
            minWidthReached: false,
            fullWidthReached: false
        }
    }

    componentDidMount() {
        this.el = this.refs['rs-el'] as HTMLDivElement;
        this.parentEl = this.el.parentElement as HTMLDivElement;
        this.sideEl = this.refs['rs-side'] as HTMLDivElement;
        this.contentEl = this.refs['rs-content'] as HTMLDivElement;

        this.onResize();
        window.addEventListener('resize', this.onResize);
    }

    componentDidUpdate(prevProps:RatioSplitterProps, prevState:RatioSplitterState) {
        if(prevProps.active !== this.props.active && !this.props.active) {
            this.reset();
        }

        if(this.state.fullWidthReached) {
            this.reset();
        } else {
            this.onResize();
        }

        if(prevProps.ratio !== this.props.ratio || 
           prevProps.sideContent !== this.props.sideContent ||
           prevProps.contentMinWidth !== this.props.contentMinWidth) {
            this.onResize();
        }

        document.body.setAttribute('rs-width-reached',this.state.minWidthReached+'');
        document.body.setAttribute('rs-active',(this.props.active && !this.state.fullWidthReached)+'');        
    }   

    onResize() {
        if(!this.props.active)
            return;

        this.setSpacing();
    }

    setSpacing() {
        let ratio = this.props.ratio,
            el = this.parentEl,
            w = el.clientWidth,
            h = el.clientHeight,
            sideWidth = w - h*ratio;

        this.minWidthReached(sideWidth);

        if(this.fullWidthReached(sideWidth))
            return;

        if(h !== this.prevHeight) {
            this.prevHeight = h;
            this.contentEl.style.marginLeft = (h*ratio) + 'px';
        }
    }

    minWidthReached(sideWidth:number) {
        if(this.props.contentMinWidth && sideWidth < this.props.contentMinWidth && !this.state.fullWidthReached) {
            !this.state.minWidthReached && this.setState({ minWidthReached: true });
        } else {
            this.state.minWidthReached && this.setState({ minWidthReached: false });
        }
    }

    fullWidthReached(sideWidth:number) {
        let fwr = sideWidth <= 0;
        fwr !== this.state.fullWidthReached && this.setState({ fullWidthReached: fwr });
        return fwr;
    }

    reset() {
        this.prevHeight = 0;
        this.contentEl.style.marginLeft = '';
    }

    render() {
        let state = this.state,
            props = this.props;
        
        return (
            <div className='ratio-splitter' 
                 ref='rs-el' 
                 data-active={props.active && !state.fullWidthReached} 
                 data-width-reached={state.minWidthReached} 
                 data-alternative={props.alternative}>

                <div className='rs-side' ref='rs-side'>{ props.sideContent }</div>
                <div className='rs-content' ref='rs-content'>{ props.children }</div>

            </div>
        );
    }
}

export default RatioSplitter;