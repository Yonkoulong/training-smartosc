import React, { Component } from 'react';
import {
    Link
}  from "react-router-dom";

class Features extends Component {
    state = {  } 
    render() { 
        return (
            <div className="features">
                <Link to="/" className="home-link"><button className="home">Home</button></Link>
                <button className="back" onClick={() => this.props.undo()}>Undo</button>
                <button className="solve" onClick={() => this.props.solve()}>Solve</button>
                <button className="new-game" onClick={() => this.props.onReset()}>New Game</button>
            </div>
        );
    }
}
 
export default Features;