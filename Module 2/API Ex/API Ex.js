async function getBaconipsum() {

  // first build the API call string by starting with the URL
  var apiString = "https://baconipsum.com/api/";

  // next add the parameters to the string using the drop down lists
  var theNewParagraphs = document.getElementById("newParagraphs").value;

  // get the selected Bacon Ipsum type
  var theNewType = document.getElementById("newType").value;

  // get the selected encryption algorithm
  var theNewAlgorithm = document.getElementById("newAlgorithm").value;

  // build the API string
  apiString = apiString + "?type=" + theNewType + "&paras=" + theNewParagraphs;

  alert(apiString);  // show the API string

  // now make the API call to the web service using the string and store what is returned in response
  var response = await fetch(apiString);

  // finally, print the response in the various formats
  document.getElementById("myRawData").innerHTML = "";   // clear what was previously shown
  document.getElementById("myFormattedData").innerHTML = "";   // clear what was previously shown

  // clear the previous encrypted data
  document.getElementById("myEncryptedData").innerHTML = "";

  var jsonData = await response.json();  // read the response as JSON
  
  // stringify and print out the JSON object in the RawData section
  document.getElementById("myRawData").innerHTML = JSON.stringify(jsonData);
 
  // loop through the JSON object one paragraph at a time and print each in the FormattedData section
  for (var para in jsonData) {   

      document.getElementById("myFormattedData").innerHTML +=
          "<p>" + jsonData[para] + "</p>";

      // store the encrypted paragraph
      var encryptedParagraph = "";

      // use Caesar Cipher if selected
      if (theNewAlgorithm == "caesar") {
          encryptedParagraph = caesarCipher(jsonData[para]);
      }

      // use Reverse Cipher if selected (recommended from the AI)
      else if (theNewAlgorithm == "reverse") {
          encryptedParagraph = reverseCipher(jsonData[para]);
      }

      // print the encrypted paragraph
      document.getElementById("myEncryptedData").innerHTML +=
          "<p>" + encryptedParagraph + "</p>";
  }

  return true;
}


// encrypt text using a Caesar Cipher
function caesarCipher(theText) {

    // store the encrypted text
    var encryptedText = "";

    // go through the text one character at a time
    for (var i = 0; i < theText.length; i++) {

        // get the current character
        var letter = theText[i];

        // check for lowercase letters
        if (letter >= "a" && letter <= "z") {

            // convert the letter to its character code
            var code = letter.charCodeAt(0);

            // move the letter 3 positions
            code = code + 3;

            // go back to a if we pass z
            if (code > 122) {
                code = code - 26;
            }

            // add the encrypted letter
            encryptedText += String.fromCharCode(code);
        }

        // check for uppercase letters
        else if (letter >= "A" && letter <= "Z") {

            // convert the letter to its character code
            var code = letter.charCodeAt(0);

            // move the letter 3 positions
            code = code + 3;

            // go back to A if we pass Z
            if (code > 90) {
                code = code - 26;
            }

            // add the encrypted letter
            encryptedText += String.fromCharCode(code);
        }

        // keep other characters unchanged
        else {
            encryptedText += letter;
        }
    }

    // return the encrypted text
    return encryptedText;
}


// encrypt text using a Reverse Cipher (recommended from the AI)
function reverseCipher(theText) {

    // store the encrypted text
    var encryptedText = "";

    // go through the text backwards
    for (var i = theText.length - 1; i >= 0; i--) {

        // add each character to the encrypted text
        encryptedText += theText[i];
    }

    // return the encrypted text
    return encryptedText;
}