import React, { Component } from 'react';
import SubGrid from './SubGrid'

export default class Column extends Component {
    render() {
        
        return (
            <div className="column">
                <SubGrid subGrid={this.props.column.slice(0, 9)} onChange={this.props.handleChange}/>
                <SubGrid subGrid={this.props.column.slice(9, 18)} onChange={this.props.handleChange}/>
                <SubGrid subGrid={this.props.column.slice(18, 27)} onChange={this.props.handleChange}/>
            </div>
        )
    }
}
