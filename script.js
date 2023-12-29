const sketchsize = 600;

let rows = 16;
let columns = 16;
let color = "black";
//Handling color selection 
const color_button = document.querySelector('input[type="color"]');
color_button.addEventListener("input", function(e) {
    color = e.target.value;
});




// various references and creation of div element to the html elements.
const body = document.querySelector("body");
const erase = document.querySelector("#erase");
const draw = document.querySelector("#draw");

//creating the sketch-pad.
const container = document.createElement("div");
container.classList.add("container");
container.setAttribute("style", `height: ${sketchsize}px; width: ${sketchsize}px`);
body.appendChild(container);

//Initiating the current mode to drawing.
let currentmode = "draw"; 
draw.setAttribute("style", "background-color: navy; color: white; ");


//Function to create the grid using flexbox, the height and width adjusted on the no. of rows and columns.
function creategrid() {
    container.innerHTML = "";
for(let i = 1; i <= (rows*columns); i++){
    const container_element = document.createElement("div");
    container_element.classList.add("container-element");
    container_element.setAttribute("style", `height: ${sketchsize / rows}px; width: ${sketchsize / columns}px`);
    container.appendChild(container_element);
    }
}
//creating the grid.
creategrid();

// Handling drawing to the sketch-pad.

const changecolor = function (e) {
    const target = e.target;
    if (target.classList.contains("container-element")) {
        if (currentmode === "draw") {
            target.style.backgroundColor = color;
        } else if (currentmode === "erase") {
            target.style.backgroundColor = "whitesmoke";
        }
    }
};

container.addEventListener("mousedown", function (event) {
    event.preventDefault();
    changecolor(event);

    // Add a global mousemove event listener
    document.addEventListener("mousemove", changecolor);

    // Add a global mouseup event listener to stop drawing
    document.addEventListener("mouseup", function () {
        // Remove the global mousemove event listener
        document.removeEventListener("mousemove", changecolor);
    }, { once: true }); // Use 'once' option to ensure this listener only triggers once
});

// Changing the pixel event listener.
const pixelBt = document.querySelector(".pixel-button");
pixelBt.addEventListener("click", function() {
        let pixel = prompt("Enter No. of Squares per side!");
        if (pixel <= 100) {
            rows = pixel;
            columns = pixel;
            creategrid();
        } else {
            alert("The Entered value is not correct. Enter the correct Number or within 100.");
        }
});

//Handling the clear Button
const clear = document.querySelector(".clear-button");
clear.addEventListener("click", function() {
    creategrid();
});

//Handling the erase-draw button
erase.addEventListener("click", function() {
    erase.setAttribute("style", "background-color: navy; color: white; ");
    draw.setAttribute("style", "");
    currentmode = "erase";
});

draw.addEventListener("click", function() {
    draw.setAttribute("style", "background-color: navy; color: white; ");
    erase.setAttribute("style", "");
    currentmode = "draw";
});

