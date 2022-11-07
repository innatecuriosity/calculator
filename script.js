
// math operations

function add(a, b) {return a+b;}

function subtract(a, b) {return a-b;}

function multiply(a, b) {return a*b;}

function divide(a, b) {return a/b;}

function power(a, b) {return a**b}

function clearEveryting() {
    displayCalculation.textContent = "";
    displayAnswer.textContent = "";
}
// chose an operation based on sign
const operationsTable = {
    "+":add,
    "-":subtract,
    "*":multiply,
    "/":divide,
    "^":power,
}


function choseOperation(a, b, sign) {
    return operationsTable[sign](a, b);
}

//action to add a symbol to the calculatin

function onInput(event) {
    let button = event.target;

    switch (button.id) {
        case ("wCE"):
            clearEveryting();
            return true;
    }

    displayCalculation.textContent += button.textContent;
    return button.textContent;
}

// adding buttons
const displayCalculation = document.querySelector(".display.calculation");
const displayAnswer = document.querySelector(".display.answer")
const grid = document.querySelector(".grid-container");

// button map
const totalRows = 6;

//rows is from bottom up, cols is from left to right
const buttons= {
    "s+":{"row":[4,2], "col":[4],},
    "s-":{"row":[5], "col":[4],},
    "s/":{"row":[5], "col":[2],},
    "s*":{"row":[5], "col":[3],},
    "s^":{"row":[5], "col":[1],},
    
    "s=":{"row":[2,2], "col":[4],},
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
    "s(":{"row":[6], "col":[1],},
    "s)":{"row":[6], "col":[2],},

    "wCE":{"row":[6], "col":[3,2],},
}

for (i in buttons) {
    const key = document.createElement("button");
    key.textContent=i;
    key.setAttribute("id",i);
    key.classList.add("button");

    switch (i[0]) {
        case "n":
            key.textContent= i[1];
            key.classList.add("number");
            break;
        case "s":
            key.textContent = i[1];
            key.classList.add("symbol");
            break;
        case "w":
            key.textContent = i.slice(1);
            key.fontSize="auto";
            break;
    }

    //on click
    key.addEventListener("click", onInput);

    

    
    

    if (buttons[i]["row"].length == 1) {key.style.cssText= `grid-row:${totalRows + 1 - buttons[i]["row"][0]};`}
    else if (buttons[i]["row"].length == 2) {key.style.cssText= `grid-row:${totalRows + 1 - buttons[i]["row"][0]} / span ${buttons[i]["row"][1]};`}
    // for some reason gridColumn needs to be set after gridRow.... this took me a fucking hour. I hate this.
    if (buttons[i]["col"].length == 1) {key.style.gridColumn= buttons[i]["col"][0]}
    else if  (buttons[i]["col"].length ==2) {key.style.gridColumn= `${buttons[i]["col"][0]} / span ${buttons[i]["col"][1]}`}
    

    grid.appendChild(key);
    //add other stuff to key
}