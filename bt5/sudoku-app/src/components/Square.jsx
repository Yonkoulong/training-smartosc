import React, { Component, useDebugValue } from 'react'

export default class Square extends Component {
    constructor(props) {
        super(props);
    }

    doChange = (e) => {
        this.setState({ 
            value: e.target.value
        })
        this.props.handleChange(e.target.value, e.target.id);
    }

    render() {
        let className = this.props.squares.prefilled ? "square square-blue" : "square square-white";
        if (this.props.squares.incorrect === true) {
            className = "square square-red";
        }
        
        return (
            <td>
                <div className={className}>
                    <input type="text" pattern="as" inputMode="numeric" maxLength="1"
                        value={this.props.squares.value || ''}
                        id={this.props.squares.id} 
                        disabled={this.props.squares.prefilled}
                        onChange={(e) => this.doChange(e)}
                    />   
                </div>
            </td>
        )
    }
}
