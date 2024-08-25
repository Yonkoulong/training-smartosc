import React, { Component } from 'react';
import Square from './Square';

class SubGrid extends Component {
    render() { 
        return (
            <table>
                <tbody>
                    <tr>
                        <Square squares={this.props.subGrid[0]} handleChange={this.props.onChange}/>
                        <Square squares={this.props.subGrid[1]} handleChange={this.props.onChange}/>
                        <Square squares={this.props.subGrid[2]} handleChange={this.props.onChange}/>
                    </tr>
                    <tr>
                        <Square squares={this.props.subGrid[3]} handleChange={this.props.onChange}/>
                        <Square squares={this.props.subGrid[4]} handleChange={this.props.onChange}/>
                        <Square squares={this.props.subGrid[5]} handleChange={this.props.onChange}/>
                    </tr>
                    <tr>
                        <Square squares={this.props.subGrid[6]} handleChange={this.props.onChange}/>
                        <Square squares={this.props.subGrid[7]} handleChange={this.props.onChange}/>
                        <Square squares={this.props.subGrid[8]} handleChange={this.props.onChange}/>
                    </tr>
                </tbody>
            </table>
        );
    }
};
 
export default SubGrid;
