import * as React from 'react'; 
import * as ReactDOM from 'react-dom'; 
import RatioSplitter from './RatioSplitter';

class App extends React.Component<any,any> {
    constructor(props:any) {
        super(props);
    } 

    render() {
        let state = this.state;
        
        return (
            <div className='app-component'>
                <RatioSplitter ratio={0.77071006}
                               active={true} 
                               sideContent={(<img src='image.jpg' />)}
                               contentMinWidth={300}
                               alternative={'card'}>
                    <div className="content">
                        <h1>Ratio Splitter</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget odio diam. Nulla facilisi. Maecenas sapien quam, lacinia ut egestas id, dapibus nec turpis. Praesent orci orci, scelerisque at augue id, gravida tristique justo. Nam vehicula, enim eu maximus euismod, arcu neque sagittis turpis, non feugiat nulla felis ac lacus. Fusce a finibus neque. Aliquam erat volutpat. Vestibulum commodo ipsum at felis aliquet, ut aliquam nunc auctor. Vestibulum placerat orci et vulputate condimentum. In vehicula lacinia justo, at maximus nulla varius vel. Nulla porta lorem a orci lacinia, luctus varius sapien cursus. Sed at elementum mauris.</p>
                    </div>
                </RatioSplitter>
            </div>
        );
    }
}

ReactDOM.render(<App />,document.getElementById('container'));