/* create variables to store the range and numbers */
var low;
var high;
var numbers = [];


function setRange() {

    // place the values in the form into variables
    var theLowValue = document.forms["rangeForm"]["lowValue"].value;
    var theHighValue = document.forms["rangeForm"]["highValue"].value;

    // validate that something was entered as a low value
    if (theLowValue == "") {

        // no low value was entered so tell the user
        alert("Please enter a low value.");
        return false;
    }

    // validate that something was entered as a high value
    else if (theHighValue == "") {

        // no high value was entered so tell the user
        alert("Please enter a high value.");
        return false;
    }

    // validate that the low value is less than the high value
    else if (Number(theLowValue) >= Number(theHighValue)) {

        // the range is not valid so tell the user and clear the fields
        alert("Please enter a low value that is less than the high value.");
        document.forms["rangeForm"]["lowValue"].value = "";
        document.forms["rangeForm"]["highValue"].value = "";
        return false;
    }

    else {

        // the low and high values are valid
        // so save the values as numbers
        low = Number(theLowValue);
        high = Number(theHighValue);

        // tell the user that the range was set
        alert("The range is " + low + " to " + high + ".");

        return true;
    }
}


function validateANDadd() {

    // place the value in the form into a variable
    var theNewNumber = document.forms["myForm"]["newNumber"].value;

    // validate that something was entered as a number
    if (theNewNumber == "") {

        // no number was entered so tell the user
        alert("Please enter a number.");
        return false;
    }

    // validate that the number is inside the range
    else if ((Number(theNewNumber) < low) || (Number(theNewNumber) > high)) {

        // the number is not inside the range so tell user and clear the field
        alert("Please enter a number between " + low + " and " + high + ".");
        document.forms["myForm"]["newNumber"].value = "";
        return false;
    }

    else {

        // a valid number was entered
        // so add the number to the array
        numbers.push(Number(theNewNumber));

        // display the numbers
        document.getElementById("numbersResult").innerHTML =
            "Numbers: " + numbers;

        // calculate and display the mean
        document.getElementById("meanResult").innerHTML =
            "Mean: " + calculateMean();

        // calculate and display the median
        document.getElementById("medianResult").innerHTML =
            "Median: " + calculateMedian();

        // calculate and display the mode
        document.getElementById("modeResult").innerHTML =
            "Mode: " + calculateMode();

        // erase the form field
        document.forms["myForm"]["newNumber"].value = "";

        return true;
    }
}


function calculateMean() {

    // create a variable for the total
    var total = 0;

    // go through all the numbers in the array
    for (var i = 0; i < numbers.length; i++) {

        // add each number to the total
        total = total + numbers[i];
    }

    // divide the total by the amount of numbers
    var mean = total / numbers.length;

    // return the mean
    return mean;
}


function calculateMedian() {

    // sort the numbers from smallest to largest
    numbers.sort(function(a, b) {
        return a - b;
    });

    // check if the amount of numbers is even
    if (numbers.length % 2 == 0) {

        // find the two middle positions
        var middle1 = (numbers.length / 2) - 1;
        var middle2 = numbers.length / 2;

        // calculate the average of the two middle numbers
        var median = (numbers[middle1] + numbers[middle2]) / 2;

        // return the median
        return median;
    }

    else {

        // find the middle position
        var middle = (numbers.length - 1) / 2;

        // return the middle number
        return numbers[middle];
    }
}


function calculateMode() {

    // create variables to store the mode and counts
    var mode = numbers[0];
    var highestCount = 1;
    var currentCount = 1;

    // go through the numbers starting with the second number
    for (var i = 1; i < numbers.length; i++) {

        // check if the current number is the same as the previous number
        if (numbers[i] == numbers[i - 1]) {

            // increase the current count
            currentCount = currentCount + 1;
        }

        else {

            // start counting the new number
            currentCount = 1;
        }

        // check if the current count is the highest count
        if (currentCount > highestCount) {

            // save the new highest count
            highestCount = currentCount;

            // save the number as the mode
            mode = numbers[i];
        }
    }

    // check if no number was repeated
    if (highestCount == 1) {

        // return no mode
        return "No mode";
    }

    else {

        // return the mode
        return mode;
    }
}