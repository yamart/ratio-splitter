import * as React from 'react'; 

function VerticalAlignment(props) {
    return (
        <div className="va-container">
            <div className="va-content">
                { props.children }
            </div>
        </div>
    )
}

export default VerticalAlignment;