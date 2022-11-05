
// math operations

function add(a, b) {return a+b;}

function subtract(a, b) {return a-b;}

function multiply(a, b) {return a*b;}

function divide(a, b) {return a/b;}

// chose an operation based on sign
const operationsTable = {
    "+":add,
    "-":subtract,
    "*":multiply,
    "/":divide,
}

function choseOperation(a, b, sign) {
    return operationsTable[sign](a, b);
}