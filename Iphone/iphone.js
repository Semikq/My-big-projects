//! On/Off display
const iphone = document.getElementById("iphone")
const iphoneDisplay = document.getElementById("iphoneDisplay")
let is = true

document.getElementById("buttomScreenOnOff").onclick = screenOnOff

function screenOnOff(){
    iphone.classList.contains('black-background') ? iphone.classList.remove('black-background') : iphone.classList.add('black-background')
    iphoneDisplay.style.display = is ? "none" : "flex"
    stateSound.style.display = "none"
    document.getElementById("sound").style.display = "none"
    is = !is
}
//! On/Off display

//? Sound
//! Turn sound on or off
const buttonSoundOnOff = document.getElementById("buttonSoundOnOff")
const stateSound = document.createElement("div")
const bell = document.createElement("span")
const mode = document.createElement("div")
const slienceMode = document.createElement("p")
const onOff = document.createElement("p")
let isSound = true
let timerState
stateSound.classList.add("stateSound")
bell.classList.add("bell")
mode.classList.add("mode")
slienceMode.innerText = "Slience mode"
slienceMode.style.color = "rgba(130,130,138,255);"
onOff.style.color = "rgba(178,178,186,255)"

function toggleSound(){
    clearTimeout(timerState)
    isSound = !isSound
    bell.style.backgroundImage = isSound ? "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"%3E%3Cpath fill=\"%235c5c5c\" d=\"M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2\"/%3E%3C/svg%3E')" : "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"%3E%3Cpath fill=\"%235c5c5c\" d=\"M20.84 22.73L18.11 20H3v-1l2-2v-6c0-1.14.29-2.27.83-3.28L1.11 3l1.28-1.27l19.72 19.73zM19 15.8V11c0-3.1-2.03-5.83-5-6.71V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v.29c-.61.18-1.2.45-1.74.8zM12 23a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2\"/%3E%3C/svg%3E')"
    onOff.innerText = isSound ? "Enabled" : "Disabled"
    buttonSoundOnOff.style.background = isSound ? "black" : "linear-gradient(90deg, red 50%, rgb(20, 20, 20) 50%)";
    if(is === true){
        stateSound.style.display = "flex"
        iphone.append(stateSound)
        mode.append(slienceMode, onOff)
        stateSound.append(bell, mode)
        timerState = setTimeout(function(){stateSound.style.display = "none"}, 1500)
    }
}

buttonSoundOnOff.addEventListener("click", toggleSound)
//! Turn sound on or off

//TODO Sound manipulation
const arrSound = []
let timerSound

function checkSound(){
    if(arrSound.length === 0){
        document.getElementById("iconSound").style.backgroundImage =  "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"%3E%3Cg fill=\"none\"%3E%3Cpath fill=\"%235c5c5c\" d=\"M4.158 13.93a3.752 3.752 0 0 1 0-3.86a1.5 1.5 0 0 1 .993-.7l1.693-.339a.45.45 0 0 0 .258-.153L9.17 6.395c1.182-1.42 1.774-2.129 2.301-1.938C12 4.648 12 5.572 12 7.42v9.162c0 1.847 0 2.77-.528 2.962c-.527.19-1.119-.519-2.301-1.938L7.1 15.122a.45.45 0 0 0-.257-.153L5.15 14.63a1.5 1.5 0 0 1-.993-.7\"/%3E%3Cpath stroke=\"%235c5c5c\" stroke-linecap=\"round\" stroke-width=\"2\" d=\"m15 15l6-6m0 6l-6-6\"/%3E%3C/g%3E%3C/svg%3E')";
    }else if(arrSound.length >= 1 && arrSound.length <= 5){
        document.getElementById("iconSound").style.backgroundImage = "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"%3E%3Cg fill=\"none\"%3E%3Cpath fill=\"%235c5c5c\" d=\"M4.158 13.93a3.752 3.752 0 0 1 0-3.86a1.5 1.5 0 0 1 .993-.7l1.693-.339a.45.45 0 0 0 .258-.153L9.17 6.395c1.182-1.42 1.774-2.129 2.301-1.938C12 4.648 12 5.572 12 7.42v9.162c0 1.847 0 2.77-.528 2.962c-.527.19-1.119-.519-2.301-1.938L7.1 15.122a.45.45 0 0 0-.257-.153L5.15 14.63a1.5 1.5 0 0 1-.993-.7\"/%3E%3Cpath stroke=\"%235c5c5c\" stroke-linecap=\"round\" stroke-width=\"2\" d=\"M14.536 8.464a5 5 0 0 1 .027 7.044\"/%3E%3C/g%3E%3C/svg%3E')";
    }else if(arrSound.length >= 6){
        document.getElementById("iconSound").style.backgroundImage = "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"%3E%3Cg fill=\"none\"%3E%3Cpath fill=\"%235c5c5c\" d=\"M4.158 13.93a3.752 3.752 0 0 1 0-3.86a1.5 1.5 0 0 1 .993-.7l1.693-.339a.45.45 0 0 0 .258-.153L9.17 6.395c1.182-1.42 1.774-2.129 2.301-1.938C12 4.648 12 5.572 12 7.42v9.162c0 1.847 0 2.77-.528 2.962c-.527.19-1.119-.519-2.301-1.938L7.1 15.122a.45.45 0 0 0-.257-.153L5.15 14.63a1.5 1.5 0 0 1-.993-.7\"/%3E%3Cpath stroke=\"%235c5c5c\" stroke-linecap=\"round\" stroke-width=\"2\" d=\"M14.536 8.464a5 5 0 0 1 .027 7.044m4.094-9.165a8 8 0 0 1 .044 11.27\"/%3E%3C/g%3E%3C/svg%3E')";
    }
}

document.getElementById("buttonSoundAdd").addEventListener("click", function(){
    clearTimeout(timerSound);
    if(is === true){
        document.getElementById("sound").style.cssText = "display: flex; flex-direction: column-reverse;";
    }
    if(arrSound.length < 10){
        const block = document.createElement("div");
        block.style.cssText = "background: rgb(245, 243, 237); width: 50px; height: 12px;";
        arrSound.push(block);
        if(arrSound.length === 1){
            block.style.cssText += "border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;";
        }else if(arrSound.length === 10){
            block.style.cssText += "border-top-left-radius: 10px; border-top-right-radius: 10px;";
        }
        document.getElementById("sound").appendChild(block);
    }
    timerSound = setTimeout(function(){document.getElementById("sound").style.display = "none";}, 1500);
    checkSound()
});

document.getElementById("buttonSoundVolume").addEventListener("click", function(){
    clearTimeout(timerSound)
    if(is === true){
        document.getElementById("sound").style.cssText = "display: flex; flex-direction: column-reverse;";
    }
    if(arrSound.length === 1){
        document.getElementById("iconSound").style.backgroundImage = "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none'%3E%3Cpath fill='%235c5c5c' d='M4.158 13.93a3.752 3.752 0 0 1 0-3.86a1.5 1.5 0 0 1 .993-.7l1.693-.339a.45.45 0 0 0 .258-.153L9.17 6.395c1.182-1.42 1.774-2.129 2.301-1.938C12 4.648 12 5.572 12 7.42v9.162c0 1.847 0 2.77-.528 2.962c-.527.19-1.119-.519-2.301-1.938L7.1 15.122a.45.45 0 0 0-.257-.153L5.15 14.63a1.5 1.5 0 0 1-.993-.7'/%3E%3Cpath stroke='%235c5c5c' stroke-linecap='round' stroke-width='2' d='m15 15l6-6m0 6l-6-6'/%3E%3C/g%3E%3C/svg%3E')";
    }
    let lastBlock = arrSound.pop()
    document.getElementById("sound").removeChild(lastBlock)
    timerSound = setTimeout(function(){document.getElementById("sound").style.display = "none"}, 1500)
    checkSound()
})
//TODO Sound manipulation
//? Sound

//! Time
function updateClock() {
    fetch('https://worldtimeapi.org/api/ip')
    .then(response => response.json())
    .then(data => {
        const { datetime } = data;
        const timeString = new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('time').textContent = timeString;
    })
}

setInterval(updateClock, 1000);
updateClock()
//! Time

//? Calculator
const backCalculator = document.createElement("div")
const tcalc = document.createElement("div")
const mcalc = document.createElement("div")
const bcalc = document.createElement("div")
const resultCalc = document.createElement("div")
let arrCalc = []
let sign = false
let mark = ""
let numOld = ""
let isClearCalc = false
let isPercentCalc = false
backCalculator.classList.add("backCalculator")
tcalc.classList.add("tcalc")
mcalc.classList.add("mcalc")
bcalc.classList.add("bcalc")
resultCalc.classList.add("resultCalc")
const mArr = [
    ["clear", "C"],
    [7, "7"],
    [4, "4"],
    [1, "1"],
    ["+/-", "+/-"],
    [8, "8"],
    [5, "5"],
    [2, "2"],
    ["%", "%"],
    [9, "9"],
    [6, "6"],
    [3, "3"],
    ["/", "/"],
    ["*", "x"],
    ["-", "-"],
    ["+", "+"]
]
const bArr = [
    [0, "0"],
    [".", "."],
    ["=", "="]
]
document.getElementById("calculatorApp").addEventListener("click", function(){
    if(mcalc.getElementsByClassName("buttonCalc").length === 0){
        CreateButtonCalculator()
    }
    iphoneDisplay.style.display = "none"
    collapseButton.style.display = "flex"
    resultCalc.addEventListener("click", function(){
        arrCalc.pop()
        displayResult()
    })
    tcalc.append(resultCalc)
    backCalculator.append(tcalc, mcalc, bcalc)
    iphone.append(backCalculator)
    isApp = !isApp
})
function CreateButtonCalculator(){
    for (const [key, value] of mArr){
        const buttonCalc = document.createElement("input");
        buttonCalc.type = "button";
        buttonCalc.value = value;
        buttonCalc.classList.add("buttonCalc")
        if(value === "/" || value === "x" || value === "-" || value === "+"){
            buttonCalc.classList.add("orangeCalc")
        }else if(value === "C" || value === "+/-" || value === "%"){
            buttonCalc.classList.add("grayCalc")
        }else{
            buttonCalc.classList.add("blackCalc")
        }
        buttonCalc.addEventListener("click", function(){
            displayResult(key)
        })
        mcalc.appendChild(buttonCalc);
    }

    for(const [key, value] of bArr){
        const buttonCalc = document.createElement("input");
        buttonCalc.type = "button";
        buttonCalc.value = value;
        if(key === 0 && value === "0"){
            buttonCalc.classList.add("zero");
        }else{
            buttonCalc.classList.add("buttonCalc")
            if(value === "="){
                buttonCalc.classList.add("orangeCalc")
            }else{
                buttonCalc.classList.add("blackCalc");
            }
        }
        buttonCalc.addEventListener("click", function(){
            displayResult(key)
        })
        bcalc.appendChild(buttonCalc)
    }
}
function displayResult(value){
    if(value === "clear"){
        mark = ""
        arrCalc = []
        sign = false
        if(isClearCalc === true){
            arrCalc = []
            sign = false
            mark = ""
            numOld = 0
            isClearCalc = false
        }
        isClearCalc = true
    }
    isClearCalc = false

    if(mark && sign === true){
        arrCalc = []
        sign = false
    }
    if(arrCalc.length < 11){
        if(!isNaN(value)){
            arrCalc.push(value)
        }else if(value === "." && !(arrCalc.includes(".")) && arrCalc.length !== 0){
            arrCalc.push(value)
        }
    }
    if(value === "+/-"){
        if(arrCalc.length !== 0){
            if(!(arrCalc.includes("-"))){
                arrCalc.unshift("-")
            }else{
                arrCalc.shift()
            }
        }
    }
    if(value === "%"){
        if(arrCalc.length !== 0){
            if(isPercentCalc === false){
                arrCalc = ((arrCalc.join("") / 100).toString()).split("")
                isPercentCalc = true
            }else if(isPercentCalc === true){
                arrCalc = ((arrCalc.join("") * 100).toString()).split("")
                isPercentCalc = false
            }
        }
    }
    if(arrCalc.length !== 0 || numOld !== 0){
        if(value === "="){
            switch (mark){
                case "+": resultCalc.textContent = numOld + parseFloat(arrCalc.join("")); arrCalc = []; arrCalc.push(resultCalc.textContent);
                break;
                case "-": resultCalc.textContent = numOld - parseFloat(arrCalc.join("")); arrCalc = []; arrCalc.push(resultCalc.textContent);
                break;
                case "*": resultCalc.textContent = numOld * parseFloat(arrCalc.join("")); arrCalc = []; arrCalc.push(resultCalc.textContent);
                break;
                case "/": resultCalc.textContent = numOld / parseFloat(arrCalc.join("")); arrCalc = []; arrCalc.push(resultCalc.textContent);
                break;
            }
        }
        switch (value){
            case "+": mark = "+"; sign = true; numOld = parseFloat(resultCalc.textContent); arrCalc = []; isPercentCalc = false;
            break;
            case "-": mark = "-"; sign = true; numOld = parseFloat(resultCalc.textContent); arrCalc = []; isPercentCalc = false;
            break;
            case "*": mark = "*"; sign = true; numOld = parseFloat(resultCalc.textContent); arrCalc = []; isPercentCalc = false;
            break;
            case "/": mark = "/"; sign = true; numOld = parseFloat(resultCalc.textContent); arrCalc = []; isPercentCalc = false;
            break;
        }
    }

    if(sign === true){
        resultCalc.textContent = parseFloat(resultCalc.textContent)
    }else if(value !== "="){
        resultCalc.textContent = arrCalc.join("")
    }
}
//? Calculator

let isApp = false
document.getElementById("collapseButton").addEventListener("click", function(){
    if(isApp === true){
        iphone.removeChild(backCalculator)
        iphoneDisplay.style.display = "flex"
        collapseButton.style.display = "none"
        isApp = !isApp
    }
})