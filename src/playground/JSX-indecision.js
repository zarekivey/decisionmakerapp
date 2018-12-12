console.log('App.js is running');

 const app = {
    title: 'Indecison App',
    subtitle: 'Put life in the hands of a computer',
    options: []
};
// JSX - JavaScript XML, a JS synatx exstention. Helps define templates and inject data into them. 
const onFormSubmit = (e) => { // We use e to call the event object
    e.preventDefault(); // This prevents the full page refresh upon form submission
    
    const option = e.target.elements.option.value; // target will point to the element that the event started on, elements pulls the elements list, option is the one we used, and we want the options value.

    if (option) { // This will only tun if the form isnt blank
        app.options.push(option); // This will push the inputed item into the options array
        e.target.elements.option.value = ''; // Once its been inputed the valuie will return back to being blank
        render();
    }
};

const onRemoveAll = () => {
    app.options = [];
    render();
};

const onMakeDecision = () => { // Generates a random option.
    const randomNum = Math.floor(Math.random() * app.options.length); 
    const option = app.options[randomNum];
    alert(option);
};

const appRoot = document.getElementById('app');

const render = () => {
    const template = ( // When putting multiple elements on the same line, they must be wrapped in a div
        <div> 
            <h1>{app.title}</h1> 
            {app.subtitle && <p>{app.subtitle}</p>} 
            <p>{app.options.length > 0 ? 'Here are your options' : 'No Options'}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
               { /* Array of JSX in JSX - This creates list items as they are inputed */
                  app.options.map((option) => <li key={option}>{option}</li>) 
               }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
        </div>
    ); 

    ReactDOM.render(template, appRoot);
}

render();
