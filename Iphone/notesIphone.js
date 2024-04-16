






//! On/Off
const iphone = document.getElementById("iphone");
const main = document.getElementById("main");
const footer = document.getElementById("footer");
let is = false;

document.getElementById("buttomScreenOnOff").onclick = screenOnOff;

function screenOnOff() {
    const elements = [...main.children, ...footer.children]
    if (is === false) {
        iphone.classList.add('black-background');
        elements.forEach(element => {
            element.style.display = "none";
        });
        is = true;
    } else {
        iphone.classList.remove('black-background');
        elements.forEach(element => {
            element.style.display = "flex";
        });
        is = false;
    }
}

//!

//? Sound
const buttonSoundOnOff = document.getElementById("buttonSoundOnOff")
const stateSound = document.createElement("div")
const bell = document.createElement("span")
const mode = document.createElement("div")
const slienceMode = document.createElement("p")
const onOff = document.createElement("p")
let isSound = false
let timerState
stateSound.classList.add("stateSound")
bell.classList.add("bell")
mode.classList.add("mode")
slienceMode.innerText = "Slience mode"
slienceMode.style.color = "rgba(130,130,138,255);"
onOff.style.color = "rgba(178,178,186,255)"

buttonSoundOnOff.addEventListener("click", function(){
    if(isSound === false){
        if(timerState){
            clearTimeout(timerState)
        }
        bell.style.backgroundImage = "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"%3E%3Cpath fill=\"%235c5c5c\" d=\"M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2\"/%3E%3C/svg%3E')"
        onOff.innerText = ""
        onOff.innerText = "Enabled"
        buttonSoundOnOff.style.background = "linear-gradient(90deg, red 50%, rgb(20, 20, 20) 50%)";
        document.getElementById("main").append(stateSound)
        mode.append(slienceMode, onOff)
        stateSound.append(bell, mode)
        isSound = true
        timerState = setTimeout(function(){stateSound.style.display = "none"}, 1500)
    }else if(isSound === true){
        if(timerState){
            clearTimeout(timerState)
        }
        bell.style.backgroundImage = "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"%3E%3Cpath fill=\"%235c5c5c\" d=\"M20.84 22.73L18.11 20H3v-1l2-2v-6c0-1.14.29-2.27.83-3.28L1.11 3l1.28-1.27l19.72 19.73zM19 15.8V11c0-3.1-2.03-5.83-5-6.71V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v.29c-.61.18-1.2.45-1.74.8zM12 23a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2\"/%3E%3C/svg%3E')"
        onOff.innerText = ""
        onOff.innerText = "Disabled"
        buttonSoundOnOff.style.background = "black";
        document.getElementById("main").append(stateSound)
        mode.append(slienceMode, onOff)
        stateSound.append(bell, mode)
        isSound = false
        timerState = setTimeout(function(){stateSound.style.display = "none"}, 1500)
    }
})
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
    if(is === false){
        document.getElementById("sound").style.cssText = "display: flex; flex-direction: column-reverse;";
    }
    if(timerSound){
        clearTimeout(timerSound);
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
    if(is === false){
        document.getElementById("sound").style.cssText = "display: flex; flex-direction: column-reverse;";
    }
    if(arrSound.length === 1){
        document.getElementById("iconSound").style.backgroundImage = "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none'%3E%3Cpath fill='%235c5c5c' d='M4.158 13.93a3.752 3.752 0 0 1 0-3.86a1.5 1.5 0 0 1 .993-.7l1.693-.339a.45.45 0 0 0 .258-.153L9.17 6.395c1.182-1.42 1.774-2.129 2.301-1.938C12 4.648 12 5.572 12 7.42v9.162c0 1.847 0 2.77-.528 2.962c-.527.19-1.119-.519-2.301-1.938L7.1 15.122a.45.45 0 0 0-.257-.153L5.15 14.63a1.5 1.5 0 0 1-.993-.7'/%3E%3Cpath stroke='%235c5c5c' stroke-linecap='round' stroke-width='2' d='m15 15l6-6m0 6l-6-6'/%3E%3C/g%3E%3C/svg%3E')";
    }
    let lastBlock = arrSound.pop()
    document.getElementById("sound").removeChild(lastBlock)
    if(timerSound){
        clearTimeout(timerSound)
    }
    timerSound = setTimeout(function(){document.getElementById("sound").style.display = "none"}, 1500)
    checkSound()
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