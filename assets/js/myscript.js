// A2qCzZbtWHHrhvKZUQS4hSw7av8  --- API key
// https://ci-jshint.herokuapp.com/api?api_key=A2qCzZbtWHHrhvKZUQS4hSw7av8  -- paste link to see the expiry for api key


const API_KEY = "A2qCzZbtWHHrhvKZUQS4hSw7av8"; //api key
const API_URL = "https://ci-jshint.herokuapp.com/api"; // api url
                //Now Bootstrap 5, which we’ve used to format this project, allows us to trigger modals
                //using JavaScript, and they conveniently supply the methods for this.
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

                // need to wire up the button, 
                // going to get the element with the ID of status which is our button.
                // We're going to add a click event listen to it. 
                // And then we're going to call  the git status function.
                // Now we're passing in 'e' there which is a reference to the event.
                // We won’t actually use it  in these lessons, but it’s 
                // good practice to pass the event  object into our handler function.
                // So, let’s start writing our getStatus function.

// document.getElementById("status").addEventListener("click", e => getStaus(e));
                    // Firstly, it needs to make a  GET request to the API_URL 
                    // with the API_KEY.
                    // And secondly, it needs to pass this data to a function that will display it.
                    // So, let’s get started with our first task.
                    // And this will be an asynchronous function.
                    // We briefly mentioned these before.
                    // When we’re handling promises, we have two ways of doing it.
                    // We can chain “.then”s as we did before, 
                    // or we can wrap the promises in  an async function - like this -
                    // and then await the promise coming true.
// async function getStatus(e) {
                                        // build our query string.
                                        // The query string will consist of the URL and 
                                        // the parameters that we need  to send over to the API.
                                        // Let’s just pop back over to the API instructions 
                                        // and see what parameter we need  to send with a GET request.
                                        // So, we need to supply api_key as a parameter.
                                // constant called queryString. The first variable is going to be our API_URL.
                                // And then, question mark 'API_KEY = ' and then the next variable is going to be our API_KEY.
                                // And this follows the format in the instructions.
                                // Now that we’ve done that, let’s “await” our response.
                                // So again, we want another constant, 'response = await fetch(queryString);'.
                                // When the response comes back, we'll need to convert it to json.
                                // Remember that the json() method also returns 
                                // a promise, so we need to await that too.
                                // So, 'const data = await response.json'.
                                // So, at this stage in our function, we can assume that we'll have some data back.
                                // It will either be our key expiry data, or it will be an error.    
    
document.getElementById("status").addEventListener("click", e => getStatus(e));

async function getStatus(e) {
    const queryString = `${API_URL}?api_key${API_KEY}`;
    const response = await fetch(queryString);
    const data = await response.json();
                                // If everything has gone well, a property is set on the response object.
                                // And this property is the “ok” property.
                                // If the server returns the HTTP status code of 200 then, then you’ll remember, our request
                                // has been successful and the “ok” property will be set to True.
                                // If it returns an error code, then the “ok” property will be set to false.
                                // For now, let’s add an if to check if our response.ok property is set to True.
                                // And if it is, we'll console.log out our response.
                                // So let’s save and run our project and see what happens then when we click the button.
                                // And remember to open the console in Developer Tools so you can see the result.

    if (response.ok){
        console.log(data);
    }
}                    

