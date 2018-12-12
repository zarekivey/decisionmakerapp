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
          options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({ selectedOption: option }));
    }
    handleAddOption = (option) => {
        if (!option) { 
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1) { 
            return 'This option already exists';
        }
        this.setState((prevState) => ({options: prevState.options.concat(option)})); // ***** IMPORTANT the concat method allows you to add on to an array without manipulating any previous data. This is ideal. You can pass an array into concat, this will merge the arrays
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options'); 
            const options = JSON.parse(json); 
    
            if (options) { 
                this.setState(() => ({ options })) 
            }
        } catch (e) { 
           
        }
    }
    componentDidUpdate(prevProps, prevState) { 
        if (prevState.options.length !== this.state.options.length) { 
            const json = JSON.stringify(this.state.options); 
            localStorage.setItem('options', json); 
        }
    }
    componentWillUnmount() {
        console.log('Component will unmount')
    }
    render() {
        const subtitle = 'Let the computer dedcide for you';

       return (
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