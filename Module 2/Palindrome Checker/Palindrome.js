// Main function that validates the form and checks the word
function validateANDcheck() {

    // Get the word entered by the user
    let theNewWord = document.forms["palindromeForm"]["newWord"].value;

    // Get the algorithm number entered by the user
    let theNewNumber = document.forms["palindromeForm"]["newNumber"].value;

    // Get the case sensitivity option selected by the user
    let caseOption = document.forms["palindromeForm"]["caseOption"].value;

    // Check if the word input is empty
    if (theNewWord.trim() == "") {

        // Tell the user to enter a word
        alert("Please enter a word.");

        // Stop the function
        return false;
    }

    // Check if the user entered something other than 1, 2, or 3
    else if ((theNewNumber != "1") &&
             (theNewNumber != "2") &&
             (theNewNumber != "3")) {

        // Tell the user to enter a valid algorithm number
        alert("Please enter a 1, 2, or 3 for the algorithm.");

        // Clear the incorrect algorithm number
        document.forms["palindromeForm"]["newNumber"].value = "";

        // Stop the function
        return false;
    }

    // If both inputs are correct, continue
    else {

        // Store the word that will be checked
        let wordToCheck = theNewWord;

        // Check if the user selected case insensitive
        if (caseOption == "insensitive") {

            // Convert the word to lowercase
            wordToCheck = theNewWord.toLowerCase();
        }

        // Check if the user selected algorithm 1
        if (theNewNumber == "1") {

            // Send the word to algorithm 1
            let result = checkPalindrome1(wordToCheck);

            // Create an object to store the word and result
            let palindromeResult = {
                word: theNewWord,
                isPalindrome: result
            };

            // Add the result to algorithm 1 list
            addResult("algorithm1Results", palindromeResult);
        }

        // Check if the user selected algorithm 2
        else if (theNewNumber == "2") {

            // Send the word to algorithm 2
            let result = checkPalindrome2(wordToCheck);

            // Create an object to store the word and result
            let palindromeResult = {
                word: theNewWord,
                isPalindrome: result
            };

            // Add the result to algorithm 2 list
            addResult("algorithm2Results", palindromeResult);
        }

        // Check if the user selected algorithm 3
        else if (theNewNumber == "3") {

            // Send the word to algorithm 3
            let result = checkPalindrome3(wordToCheck);

            // Create an object to store the word and result
            let palindromeResult = {
                word: theNewWord,
                isPalindrome: result
            };

            // Add the result to algorithm 3 list
            addResult("algorithm3Results", palindromeResult);
        }

        // Clear the word input
        document.forms["palindromeForm"]["newWord"].value = "";

        // Clear the algorithm input
        document.forms["palindromeForm"]["newNumber"].value = "";
    }

    // Prevent the form from reloading the page
    return false;
}


// FUNCTION TO ADD RESULTS

function addResult(listId, palindromeResult) {

    // Find the correct list
    let resultList = document.getElementById(listId);

    // Create a new list item
    let newItem = document.createElement("li");

    // Add the word and result as text
    newItem.textContent = palindromeResult.word + ": " +
        palindromeResult.isPalindrome;

    // Add the new item to the list
    resultList.appendChild(newItem);
}


// ALGORITHM 1

function checkPalindrome1(word) {

    // Start at the first letter
    let start = 0;

    // Start at the last letter
    let end = word.length - 1;

    // Compare letters until the positions meet
    while (start < end) {

        if (word[start] != word[end]) {
            return false;
        }

        // Move the positions toward the middle
        start++;
        end--;
    }

    return true;
}


// ALGORITHM 2

function checkPalindrome2(word) {

    // Reverse the word and compare it with the original
    return word == word.split("").reverse().join("");
}


// ALGORITHM 3

function checkPalindrome3(word) {

    // If the word has one or zero letters, it is a palindrome
    if (word.length <= 1) {
        return true;
    }

    // Compare the first and last letters
    if (word[0] != word[word.length - 1]) {
        return false;
    }

    // Remove the first and last letters and check again
    return checkPalindrome3(word.substring(1, word.length - 1));
}


// CLEAR LISTS

// Clear algorithm 1 results
function clearAlgorithm1() {
    document.getElementById("algorithm1Results").innerHTML = "";
}

// Clear algorithm 2 results
function clearAlgorithm2() {
    document.getElementById("algorithm2Results").innerHTML = "";
}

// Clear algorithm 3 results
function clearAlgorithm3() {
    document.getElementById("algorithm3Results").innerHTML = "";
}