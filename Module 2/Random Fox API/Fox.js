async function getRandomFox() {

    // first build the API call string by starting with the URL
    var apiString = "https://randomfox.ca/floof/";

    // make the API call and store the response
    var response = await fetch(apiString);

    // read the response as JSON
    var jsonData = await response.json();

    // show the fox image
    document.getElementById("foxImage").src = jsonData.image;

    return true;
}