// higher order component (HOC) - a React component that renders another component
// let's use reuse code
// render hijacking
// prop manipulation
// abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// regular function that returns a HOC: can be reused on tons of components.
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>this is private info, please don't share it.</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                <p>you have to be logged in to do that!</p>                
            )}
            {/* {!props.isAuthenticated && <p>you have to be logged in to do that!</p>}
            {props.isAuthenticated && <WrappedComponent {...props}/>} */}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="INFORMATIONS"/>, document.getElementById("app"));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="INFORMATIONS"/>, document.getElementById("app"));