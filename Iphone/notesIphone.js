






//! On/Off
const buttomScreenOnOff = document.getElementById("buttomScreenOnOff")
const iphone = document.getElementById("iphone")
let is = false

buttomScreenOnOff.onclick = screenOnOff

function screenOnOff() {
    if(is === false){
        iphone.classList.add('black-background')
        is = true
    }else{
        iphone.classList.remove('black-background')
        is = false
    }
}
//!

//? Sound
const buttonSoundOnOff = document.getElementById("buttonSoundOnOff")
const stateSound = document.createElement("div")
const bellOn = document.createElement("span")
const mode = document.createElement("div")
const slienceMode = document.createElement("p")
const onOff = document.createElement("p")
let isSound = false
let timerState
stateSound.classList.add("stateSound")
bellOn.classList.add("bell")
mode.classList.add("mode")
slienceMode.innerText = "Slience mode"
slienceMode.style.color = "gray"
onOff.style.color = "gainsboro"

buttonSoundOnOff.addEventListener("click", function(){
    if(isSound === false){
        stateSound.style.display = "flex"
        if(timerState){
            clearTimeout(timerState)
        }
        onOff.innerText = ""
        onOff.innerText = "Enabled"
        buttonSoundOnOff.style.background = "linear-gradient(90deg, red 50%, black 50%)";
        document.getElementById("main").append(stateSound)
        mode.append(slienceMode, onOff)
        stateSound.append(bellOn, mode)
        isSound = true
        timerState = setTimeout(function(){stateSound.style.display = "none"}, 1500)
    }else if(isSound === true){
        stateSound.style.display = "flex"
        if(timerState){
            clearTimeout(timerState)
        }
        onOff.innerText = ""
        onOff.innerText = "Disabled"
        buttonSoundOnOff.style.background = "black";
        document.getElementById("main").append(stateSound)
        mode.append(slienceMode, onOff)
        stateSound.append(bellOn, mode)
        isSound = false
        timerState = setTimeout(function(){stateSound.style.display = "none"}, 1500)
    }
})

const buttonSoundAdd = document.getElementById("buttonSoundAdd")
const buttonSoundVolume = document.getElementById("buttonSoundVolume")
const sound = document.getElementById("sound")
const arrSound = []
let timerSound

buttonSoundAdd.addEventListener("click", function(){
    sound.style.cssText = "display: flex; flex-direction: column-reverse;"
    if(timerSound){
        clearTimeout(timerSound)
    }
    if(arrSound.length < 10){
        const block = document.createElement("div")
        block.style.cssText = "background: rgb(245, 243, 237); width: 50px; height: 12px;"
        arrSound.push(block)
        if(arrSound.length === 1){
            block.style.cssText += "border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;";
        }else if(arrSound.length === 10){
            block.style.cssText += "border-top-left-radius: 10px; border-top-right-radius: 10px;";
        }
        sound.appendChild(block)
    }
    timerSound = setTimeout(function(){sound.style.display = "none"}, 1500)
})

buttonSoundVolume.addEventListener("click", function(){
    sound.style.cssText = "display: flex; flex-direction: column-reverse;"
    let lastBlock = arrSound.pop()
    sound.removeChild(lastBlock)
    if(timerSound){
        clearTimeout(timerSound)
    }
    timerSound = setTimeout(function(){sound.style.display = "none"}, 1500)
})
//?


//TODO Clock
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
//TODO