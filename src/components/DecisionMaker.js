import React from 'react'
import AddOption from './AddOption';
import Header from './Header'
import Action from './Action'
import Options from './Options'
import OptionModal from './OptionModal'

export default class DecisionMaker extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };
    handleClearSelectedOption = () => {
        this.setState(() => ({selectedOption: undefined}))
    }
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
          options: prevState.options.filter((option) => optionToRemove !== option) // filter + the provided functionm allow us to remove the slected function(argument passed in)
        }));
    }
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({ selectedOption: option }));
    }
    handleAddOption = (option) => {
        if (!option) { // If an empty string is inputed
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1) { // If the option has alkready been used. A new item will = -1.
            return 'This option already exists';
        }
        this.setState((prevState) => ({options: prevState.options.concat(option)})); // ***** IMPORTANT the concat method allows you to add on to an array without manipulating any previous data. This is ideal. You can pass an array into concat, this will merge the arrays
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options'); // Retrieving that array when the app refreshes
            const options = JSON.parse(json); // Turning it back into an object
    
            if (options) { // Only use setState if the info was valid
                this.setState(() => ({ options })) // Setting the options state back to what that arrays value was
            }
        } catch (e) { 
            // If the JSON data is invalid, do nothing
        }
    }
    componentDidUpdate(prevProps, prevState) { // After the componenet updates, after a value changes
        if (prevState.options.length !== this.state.options.length) { // If the new option length is different from the OG , we want to save it
            const json = JSON.stringify(this.state.options); // Saving the new array in a json string
            localStorage.setItem('options', json); // Saving that new array with the key value name options
        }
    }
    componentWillUnmount() {
        console.log('Component will unmount')
    }
    render() {
        const subtitle = 'Let the computer dedcide for you';

       return ( // When we create instances of react components , we can pass data/key value pairs into them to make them dynamic. That data can then be used inside of said component
        <div> 
            <Header subtitle={subtitle}/>
            <div className="container">
                <Action 
                    hasOptions={this.state.options.length > 0} 
                    handlePick={this.handlePick}
                />
                <div className="widget">
                    <Options 
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
                </div>
            </div>
            <OptionModal 
                selectedOption={this.state.selectedOption}
                handleClearSelectedOption={this.handleClearSelectedOption}
            />
        </div>
       );
    }
}