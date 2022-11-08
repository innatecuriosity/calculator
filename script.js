
// math operations

function add(a, b) {return a+b;}

function subtract(a, b) {return a-b;}

function multiply(a, b) {return a*b;}

function divide(a, b) {return a/b;}

function power(a, b) {return a**b}

function isNumber(a) {
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].includes(a) & a != "") {
        return true;
    }
    return false;
}
function isOperator(a) {
    if (Object.getOwnPropertyNames(operationsTable).includes(a)) {
        return true;
    }
    return false;
}
function isParenthesis(a) {
    if (a=="(") {return "start"}
    if (a==")") {return "end"}
    return false;
}

// chose an operation based on sign
const operationsTable = {
    "^":power,
    "*":multiply,
    "/":divide,
    "-":subtract,
    "+":add,


}

function choseOperation(a, b, sign) {
    return operationsTable[sign](a, b);
}



// separates numbers and signs, returns an array ex. "2+4" => [2, "+", 4]

function separate(input) {
    let group = []
    let current = "";
    for (let i=0; i<input.length; i++) {
        // wraps up
        if (input[i]==")") {
            if (current != "") elements.push(Number(current));
            return group;
        }
        // if its a number (or decimal) adds to current, and continues
        if (isNumber(input[i])) {
            current += input[i];
            continue;
        } 
        // of its an operator or parenthesis, adds current to elements, then ads sign to elements
        else if (isOperator(input[i])) {
            if (current != "") group.push(Number(current));
            group.push(input[i]);
            current = "";
            continue;
        // pushes group, starts a new one
        } else if (isParenthesis(input[i])) {
            if (current != "") group.push(Number(current));
            group.push(input[i]);
            current = "";
            continue;
        }
    }
    // pushes what remains
    if (current != "") group.push(Number(current));
    console.log(group);

    return group;
}


function separateRecursion(input) {

    let group = [];
    let current = "";
    let next;

    for (let i=0; i<input.length; i++) {
        // wraps up or starts another separateRecurson
        if (input[i]==")") {
            if (current != "") group.push(Number(current));
            console.log("ended" + group + "length: " + i);
            return [group, i+1];

        } else if (input[i] == "(") {
            if (current != "") {group.push(Number(current))}

            console.log("starting new:" + input.slice(i+1));

            next = separateRecursion(input.slice(i+1));
            group.push(next[0]);
            i += next[1];
            
            continue;
        }
        

        // if its a number (or decimal) adds to current, and continues
        if (isNumber(input[i])) {
            current += input[i];
            continue;
        } 
        // of its an operator or parenthesis, adds current to elements, then ads sign to elements
        else if (isOperator(input[i])) {
            if (current != "") group.push(Number(current));
            group.push(input[i]);
            current = "";
            continue;
        // pushes group, starts a new one
        } 
    }
    // pushes what remains

    if (current != "") group.push(Number(current));
    console.log(group);
    //
    return group;
    
}

//calculates array without parenthesis
function calculateSimple(list) {
    
    //loops through operations
    for (operation of Object.getOwnPropertyNames(operationsTable))
        // resolves all calculations for given operation, replaces the three elements with the result   
        while (list.includes(operation)) {
            for (let i = 1; i<list.length; i++) {
                if (list[i] == operation) {
                    let a=1;
                    let b=1;
                    if (typeof(list[i-1])=="number") {a = list[i-1]}
                    if (typeof(list[i+1])=="number") {b = list[i+1]} 
                    result = operationsTable[operation](a, b);
                    list.splice(i-1, 3, result);
                    break;
                }
            }
        }

    return list;
}


function calculate(input) {
    let elements = separateRecursion(input);

    console.log(elements)
    elements = calculateSimple(elements);
    return elements;

}





//button event actions

function onInput(event) {
    let button = event.target;

    switch (button.id) {
        case ("wCE"):
            clearEveryting();
            return "cleared";
        case "wDel":
            deleteLast();
            return "deleted";
        case "s=":
            equals();
            return "calculated";
    }

    displayCalculation.textContent += button.textContent;
    return button.textContent;
}

function deleteLast() {
    displayCalculation.textContent = displayCalculation.textContent.slice(0, -1);

}

function clearEveryting() {
    displayCalculation.textContent = "";
    displayAnswer.textContent = "";
}

function equals() {
    displayAnswer.textContent = calculate(displayCalculation.textContent);
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
    "n.":{"row":[1], "col":[1],},

    "wDel":{"row":[1], "col":[3],},

    "wCE":{"row":[6], "col":[3,2],},
}

for (i in buttons) {
    const key = document.createElement("div");
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
            
            switch (i) {
                case "wDel":
                    key.textContent = "\u2190";
                    break; 

            }
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