// Variables
var sideLength;
var size;
var blocksDone;
var startTime;
var endTime;

init();

// Functions
// Initialize the program with a default side length of 5
function init() {
    reset(5);
    // Add event listener for the reset button
    document.querySelector("button").addEventListener("click", function() {
        reset(sideLength);
    });
}

function reset(num) {
    sideLength = num;
    size = num * num;
    blocksDone = startTime = endTime = 0;
    // Generate a Schulte Grid
    var tblStr = getTblStr(sideLength);
    // Put it into the page (remember that innerHTML is not a function)
    document.querySelector("div#grid").innerHTML = tblStr;
    loadEventListeners();
}

function getTblStr(sideLength) {
    // Generate a number serie according to side length
    var numbers = getRandNumSerie(size);
    // Turn that serie into an HTML formatted table
    var tblStr = "<table cellspacing=\"0\">";
    for (var i = 0; i < sideLength; i++) {
        tblStr += "<tr>"
        for (var j = 0; j < sideLength; j++) {
            tblStr += "<td>"
            tblStr += numbers[sideLength * i + j];
            tblStr += "<//td>"
        }
        tblStr += "<//tr>"
    }
    tblStr += "<//table>";
    return tblStr;
}

// Generate a random number serie according to the specified size
function getRandNumSerie(size) {
    var numSerie = [];
    for (var i = 0; i < size; i++) {
        // Create a candidate integer
        var temp = Math.ceil(Math.random() * 25);
        // Check for repetition
        for (var j = 0; j <= i; j++) {
            // If repeat found, try again
            if (temp === numSerie[j]) {
                i--;
                break;
            // Succeeds if no repetition
            } else if (j == i) {
                numSerie[i] = temp;
            }
        }
    }
    return numSerie;
}

// Add event listeners for every block
function loadEventListeners() {
    var tds = document.querySelectorAll("td");
    for (var i = 0; i < 25; i++) {
        tds[i].addEventListener("click", function() {
            // If the player is clicking in the right order, text turns green
            if (this.textContent == blocksDone + 1) {
                if (blocksDone === 0) {
                    startTime = new Date();
                }
                this.classList.add("done");
                blocksDone++;
                if (blocksDone === size) {
                    endTime = new Date();
                    var timeTaken = endTime - startTime;
                    // document.querySelector("table").classList.add("vanish");
                    document.querySelector("#grid").innerHTML =
                        "<p id=\"message\">" + "You have finished in " +
                        "<span id=\"highlight\">" +
                        Math.round(timeTaken / 1000) +
                        "</span>" + " seconds!" + "</p>";
                }
            }
        });
    }
}
