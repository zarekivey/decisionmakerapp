class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this)
        this.handleMinusOne = this.handleMinusOne.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.state = { // This is the default state object *******
            count: 0
        };
    }
    componentDidMount() {
        const stringCount = localStorage.getItem('count')
        const count = parseInt(stringCount, 10) // turning the returned string back into a number

        if (!isNan(count)) {
            this.setState(() => ({ count }))
        }
    }
    componentDidUpdate(prevState) {
        if (prevState.count !== this.state.count) {
            localStorage.setItem('count', this.state.count)
        }
    }
    handleAddOne() { // ** COMPONENT STATE
        this.setState((prevState) => { // setState allows us to manipulate the state object. It gets called as a function, with an argument thats a function. This function retruns an object that specifies the state values we want to change and the new value we wewant to assign. The first argument (prevSate) is = the state object before the changes are applied
            return {
                count: prevState.count + 1
            };
        });
    }
    handleMinusOne() {
        this.setState((prevState) => {
            return {
              count: prevState.count - 1 
            };
        });
    }
    handleReset() {
        this.setState(() => {
            return {
                count: 0
            }
        });
    }
    render () {
        return (
        <div>
            <h1>Count: {this.state.count} </h1>
            <button onClick={this.handleAddOne}>+1</button>
            <button onClick={this.handleMinusOne}>-1</button>
            <button onClick={this.handleReset}>Reset</button>
        </div>
        )
    }
}

ReactDOM.render(<Counter />, document.getElementById('app'))

// let count = 0;
// const addOne = () => { // The onClick attribute allows this function to be executed upon clicking that html button
//     count++;
//     rednerCounterApp(); // Calling this function which contains the events allows their effects to be rendered
// };
// const minusOne = () => {
//     count --;
//     rednerCounterApp();
// };
// const reset = () => {
//     count = 0;
//     rednerCounterApp();
// };


// Line 13 The first part of this operator acts as a true or false, so if app.subtitle exist, then execute the next part. 
// Line 14 Ternary operator for condtional rendering.
/*
const user = {
    name: 'Zarek',
    age: 26,
    location: 'Atlanta'
};
function getLocation(location) {
    if (location) { //  If theres a location, return it
        return <p>Location: {location}</p>;
    } else { // If theres not a location, return unknown
        return undefined  // If the expressionn resolves to undefined, nothing is going to show up. 
    }
}
const templateTwo = (
    <div>
        <h1>{user.name ? user.name : 'Anonymous'}</h1> 
        {(user.age && user.age >= 18) && <p>Age: {user.age}</p>} 
        {getLocation(user.location)}
    </div>
);
*/
// const appRoot = document.getElementById('app');

// const rednerCounterApp = () => {
//     const templateTwo = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne}>+1</button> 
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>reset</button>
//         </div>
//     );

//     ReactDOM.render(templateTwo, appRoot); // .render takes 2 arguments, the JSX templateyoud like to render, and where you'd like to render it.
// };

// rednerCounterApp(); // We put the objects that render the clicks in a function becuase they need to be rendered twice. The effect of clicking the buttoinms wont take effect because the jsx renders first, so we have to render the events twice
