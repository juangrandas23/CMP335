// Main function that validates the form and checks the word
function validateANDcheck() {

    // Get the word entered by the user
    let theNewWord = document.forms["palindromeForm"]["newWord"].value;

    // Get the algorithm number entered by the user
    let theNewNumber = document.forms["palindromeForm"]["newNumber"].value;

    // Check if the word input is empty
    if (theNewWord == "") {

        // Tell the user to enter a word
        alert("Please enter a word.");

        // Stop the function
        return false;
    }

    // Check if the user entered something other than 1 or 2
    else if ((theNewNumber != 1) && (theNewNumber != 2)) {

        // Tell the user to enter a valid algorithm number
        alert("Please enter a 1 or 2 for the algorithm.");

        // Clear the incorrect algorithm number
        document.forms["palindromeForm"]["newNumber"].value = "";

        // Stop the function
        return false;
    }


    // If both inputs are correct, continue
    else {

        // Check if the user selected algorithm 1
        if (theNewNumber == 1) {

            // Send the word to algorithm 1
            // Store true or false in result
            let result = checkPalindrome1(theNewWord);

            // Create an object to store the word and result
            let palindromeResult = {

                // Store the original word
                word: theNewWord,

                // Store true or false
                isPalindrome: result
            };

            // Find the algorithm 1 list in the HTML
            // Add the word and its result to the list
            document.getElementById("algorithm1Results").innerHTML +=
                "<li>" + palindromeResult.word + ": " +
                palindromeResult.isPalindrome + "</li>";
        }


        // Check if the user selected algorithm 2
        else if (theNewNumber == 2) {

            // Send the word to algorithm 2
            // Store true or false in result
            let result = checkPalindrome2(theNewWord);

            // Create an object to store the word and result
            let palindromeResult = {

                // Store the original word
                word: theNewWord,

                // Store true or false
                isPalindrome: result
            };

            // Find the algorithm 2 list in the HTML
            // Add the word and its result to the list
            document.getElementById("algorithm2Results").innerHTML +=
                "<li>" + palindromeResult.word + ": " +
                palindromeResult.isPalindrome + "</li>";
        }


        // Clear the word input after checking the word
        document.forms["palindromeForm"]["newWord"].value = "";

        // Clear the algorithm input
        document.forms["palindromeForm"]["newNumber"].value = "";
    }
}

//ALGORITHM 1

function checkPalindrome1(word) {

    // Start at the first letter of the word
    let start = 0;

    // Start at the last letter of the word
    let end = word.length - 1;


    // Keep checking until the two positions meet in the middle
    while (start < end) {

        // Compare the letter at the start with the letter at the end
        if (word[start] != word[end]) {

            // If the letters are different, it is not a palindrome
            return false;
        }

        // Move the start position one letter forward
        start++;

        // Move the end position one letter backward
        end--;
    }


    // If no different letters were found, it is a palindrome
    return true;
}

//ALGORITHM 2

function checkPalindrome2(word) {

    // split("") separates the word into individual letters
    // reverse() reverses the order of the letters
    // join("") puts the letters back together
    // Compare the original word with the reversed word
    return word == word.split("").reverse().join("");
}

//Clear Lists

// Function to clear the algorithm 1 results
function clearAlgorithm1() {

    // Find the algorithm 1 list and remove everything inside it
    document.getElementById("algorithm1Results").innerHTML = "";
}

// Function to clear the algorithm 2 results
function clearAlgorithm2() {

    // Find the algorithm 2 list and remove everything inside it
    document.getElementById("algorithm2Results").innerHTML = "";
}