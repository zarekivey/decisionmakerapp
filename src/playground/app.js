class DecisionMaker extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.state = {
            options: []
        };
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
    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
          options: prevState.options.filter((option) => optionToRemove !== option) // filter + the provided functionm allow us to remove the slected function(argument passed in)
        }));
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOption (option) {
        if (!option) { // If an empty string is inputed
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1) { // If the option has alkready been used. A new item will = -1.
            return 'This option already exists';
        }
        this.setState((prevState) => ({options: prevState.options.concat(option)})); // ***** IMPORTANT the concat method allows you to add on to an array without manipulating any previous data. This is ideal. You can pass an array into concat, this will merge the arrays
    }
    render() {
        const subtitle = 'Put your life in the hands of a computer';

       return ( // When we create instances of react components , we can pass data/key value pairs into them to make them dynamic. That data can then be used inside of said component
        <div> 
            <Header subtitle={subtitle}/>
            <Action 
                hasOptions={this.state.options.length > 0} 
                handlePick={this.handlePick}
            />
            <Options 
                options={this.state.options} 
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption 
                handleAddOption={this.handleAddOption}
            />
        </div>
       );
    }
}

const Header = (props) => { // This creates a React Component
        return (
          <div>
            <h1>{props.title}</h1> 
            {props.subtitle && <h2>{props.subtitle}</h2>}
          </div>  
        );
};

Header.defaultProps = { // defaultProps is an object where we speciify what props we want to give a default value to
    title: 'Decision Maker' // If no title prop is set, this default title will render 
}

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >   What should I do?</button>
        </div>
    );
}
const Options = (props) => {
    return (
        <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {props.options.length === 0 && <p>Please add an option to get started.</p>}
        { // This recieves an option and outputs it into its own
            props.options.map((option) => (
            <Option
                key={option}
                optionText={option}
                handleDeleteOption={props.handleDeleteOption}
            />
            ))
        }
        </div>
    );
};
      
const Option = (props) => {
    return (
      <div>
        {props.optionText}
        <button onClick={(e) => {
            props.handleDeleteOption(props.optionText)
        }}
        >
        Remove
        </button>
      </div>
    );
};

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined //  By default there is no error
        }
    }
    handleAddOption (e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim(); // option is the value of the name attribute given to the targeted element. trim allows us to prevent empty submissions
        const error =  this.props.handleAddOption(option);
       
        this.setState(() => ({error})); // Since we have a property whose value comes from a var with the same name, we can leave it off
    
        if (!error) {
            e.target.elements.option.value = ''; // If there isnt an error when the form is submitted, clear it
        }
    }
    render() {
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"></input>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

// const User = () => {
//     return(
//         <div>
//             <p>Name: </p>
//             <p>Age: </p>
//         </div>
//     )
// }

ReactDOM.render(<App />, document.getElementById('app'))