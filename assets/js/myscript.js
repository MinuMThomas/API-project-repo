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

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

async function postForm(e) {
// Firstly, a function to make the request. And secondly, a function to display the data.
// So, let’s start by wiring up our Run Checks  button, and then we’ll have a look at the  
// instructions and see what we need to do. Our function this time, will be called postForm
// because that’s what we’re doing  - we’re POSTing the form to the API. 
// you’ll need to check the ID of  the Run Checks button in the HTML code.
// How did you get on?
// Well here’s the code to wire up our Run Checks button.
// As you can see, it's very similar  to our previous event listener.
// Ok, so let’s go back to the API instructions  and we'll see how to make a POST request.
// the names of the different fields on our form  
// correspond to these parameter names. So, we're going to need to do two things. 
// Firstly, get the form data  and then post it to the API.
// So what I'm just going to do first, is copy  this code fragment here. I'm going to copy it  
// because I want to paste it into my function  later on, we will make some changes to it.  
const form = new FormData (document.getElementById("checksform"));


                // for (let e of form.entries()) {
                //     console.log(e);
                // }

                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Authorization": API_KEY,
                    },
                    body: form,
                });  
                
                
    const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        throw new Error(data.error);
    }
}

async function getStatus(e) {

    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        console.log(data.expiry);
    } else {
        throw new Error (data.error);
    }
}

function displayStatus(data){
        // set the  heading text to API key status  
        // I set the results variable to the content that  I want in the body using template literals.  
        // Then using document.getElementById and the  IDs I gave you earlier I set the content.  
        // And finally, the results modal is shown
    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}




function displayErrors(data) {

    let results = "";

    let heading = `JSHint Results for ${data.file}`;
    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}:</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}
// create a template literal this  time and give the heading of 'JShint Results for'  
// and then we're going to pick up the  file value from our return to json.
// Now we can have an if statement if the total  number of errors that have been returned is  
// equal to zero. Then, we're just going to set  our results variable here to a div.   
// We'll give it a class of no errors; we're not actually  styling these classes at the moment but it's  
// handy to have them there in case we wanted to.  And we're just going to say no errors reported.
// If, however our total errors count is more  than zero then we have errors. So let's set  
// our results variable again. Again, we're using  template literals here. So the first line  
// is going to say 'Total Errors',  
// we'll create a span with a class here so that  we could format it if we wanted to in our CSS.
// And then we'll pass in the error count  that's coming in here from our data object.
// Okay so 'Total Errors', all right. And now we'll  iterate through each of those errors.   
// So we'll say, 'for let error of data.error_list' and  if you're wondering where I'm getting these  
// names from you can check back  in the json that was returned  
// in the console to see exactly where  all of these key names are coming from. 
// But what we're going to do is first of all, report  the line number where these errors are happening.  
// And also JShint conveniently reports the column  number as well. So I'm just going to put a comma,  
// delete this closing div, because we want it to be  our lines and our columns to be in the same one.
// And then, we're going to say  column. Again, we'll put in just a  
// span with a class here in case we wanted  to add some color or some different text  
// formatting to it. And we'll pass in the column  number. And then finally, we'll close that div.
// We'll add one more line onto  our results variable here,  
// which is going to be another template literal.  And we'll give it the class here of error  
// and then we'll actually pass in the error  text that's coming back from our json.
// Okay, so that's the content created,  what I'd like you to do now is pause  
// the video and add three lines of code. I  want you to set the heading in the modal


function chcapterInShort {
    // why APIs are necessary for  modern web development,  
    // learned about the json format, and how most modern APIs  have the option to return data in that format. 
//  developed skills with JavaScript  fetch, received first API key  
// and used both the POST and GET methods to interact  with an API. There's a lot of information here but  

}
