const API_KEY = "A2qCzZbtWHHrhvKZUQS4hSw7av8";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

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
