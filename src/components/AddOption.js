import React from 'react';

export default class AddOption extends React.Component {
    state = { 
        error: undefined
    }
    handleAddOption = (e) => {
        e.preventDefault();
        const option = e.target.elements.option.value.trim(); // option is the value of the name attribute given to the targeted element. trim allows us to prevent empty submissions
        const error =  this.props.handleAddOption(option);
       
        this.setState(() => ({error})); // Since we have a property whose value comes from a var with the same name, we can leave it off
    
        if (!error) {
            e.target.elements.option.value = ''; // If there isnt an error when the form is submitted, clear it
        }
    };
    render() {
        return (
            <div>
            {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="text" name="option"></input>
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
};