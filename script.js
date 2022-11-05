
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

// adding buttons
const grid = document.querySelector(".grid-container");

// button map
const totalRows = 6;

//rows is from bottom up, cols is from left to right
const buttons= {
    "+":{"row":[4,2], "col":[4],},
    "-":{"row":[5], "col":[4],},
    "/":{"row":[5], "col":[2],},
    "*":{"row":[5], "col":[3],},
    "=":{"row":[2,2], "col":[4],},
    "n0":{"row":[1], "col":[2],},
    "n1":{"row":[2], "col":[1],},
    "n2":{"row":[2], "col":[2],},
    "n3":{"row":[2], "col":[3],},
    "n4":{"row":[3], "col":[1],},
    "n5":{"row":[3], "col":[2],},
    "n6":{"row":[3], "col":[3],},
    "n7":{"row":[4], "col":[1],},
    "n8":{"row":[4], "col":[2],},
    "n9":{"row":[4], "col":[3],},
}

for (i in buttons) {
    const key = document.createElement("button");
    key.textContent=i;
    key.setAttribute("id","key-"+i);
    key.classList="button";

    if (buttons[i]["row"].length == 1) {key.style.cssText= `grid-row:${totalRows + 1 - buttons[i]["row"][0]};`}
    else if (buttons[i]["row"].length == 2) {key.style.cssText= `grid-row:${totalRows + 1 - buttons[i]["row"][0]} / span ${buttons[i]["row"][1]};`}
    // for some reason gridColumn needs to be set after gridRow.... this took me a fucking hour. I hate this.
    if (buttons[i]["col"].length == 1) {key.style.gridColumn= buttons[i]["col"][0]}
    else if  (buttons[i]["col"].length ==2) {key.style.gridColumn= `${buttons[i]["col"][1]}/ span${buttons[i]["col"][1]};`}
    

    grid.appendChild(key);
    //add other stuff to key
}