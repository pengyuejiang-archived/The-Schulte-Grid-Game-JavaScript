// Variables
var sideLength = 5;
var size = sideLength * sideLength;
var blocksDone = 0;
var isGameOver = false;

init();

// Functions
// Initialize the program with a default side length of 5
function init() {
    // Generate a 5x5 Schulte Grid
    var tblStr = getTblStr(sideLength);
    // Put it into the page (remember that innerHTML is not a function)
    document.querySelector("div.grid").innerHTML = tblStr;
    loadEventListeners();
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

function getTblStr(sideLength) {
    // Generate a number serie according to side length
    var numbers = getRandNumSerie(size);
    // Turn that serie into an HTML formatted table
    var tblStr = "<table>";
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

// Add event listeners for every block
function loadEventListeners() {
    var tds = document.querySelectorAll("td");
    for (var i = 0; i < 25; i++) {
        tds[i].addEventListener("click", function() {
            // If the player is clicking in the right order, text turns green
            if (this.textContent == blocksDone + 1) {
                this.classList.add("done");
                blocksDone++;
            }
            if (blocksDone === size) {
                isGameOver = true;
                alert("You won!");
            }
        });
    }
}
