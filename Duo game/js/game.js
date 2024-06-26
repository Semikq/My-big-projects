import { globalToken } from "./auth.js";
import {globalRoom} from "./playerMenu.js"
import {logged_as} from "./duoGame.js"
import { Profile } from "./api/profile.js";

let cardsToSpawn = null

export async function load(game){
    const response = await fetch("game.html")
    const text = await response.text();
    document.body.innerHTML = text;
    document.getElementById("playGroundContOne").append(useCard(game.card))

    document.getElementById("newCard").addEventListener("click", function(){
        fetch(`https://duo.shuttleapp.rs/api/rooms/${globalRoom.id}/game/play`, {method: "POST", headers: {"Authorization": globalToken}})
    })

    if(cardsToSpawn != null){
        spawnPlayersCards(cardsToSpawn)
        console.log(cardsToSpawn)
    }

    console.log(game.players)

    let mapPlayers = game.players.map(item => item.id).indexOf(logged_as.id);
    let enemies = game.players.map((x) => x);
    enemies.splice(mapPlayers, 1);

    spawnEnemyCards(enemies[0].cards)

    if(enemies[1]){
        document.getElementById("playerThree").append(numberEnemyCard(game.players[1].cards, "left"));
    }
    if(enemies[2]){
        document.getElementById("playerFour").append(numberEnemyCard(game.players[2].cards, "right"));
    }

    if(game.players[game.turn].id === logged_as.id){
        document.getElementById("containerOne").classList.remove("activePlayersOne")
        document.getElementById("containerThree").classList.add("activePlayersThree")
    }else{
        document.getElementById("containerThree").classList.remove("activePlayersThree")
        document.getElementById("containerOne").classList.add("activePlayersOne")
    }

    window.addEventListener('resize', renderCards);
}

function numberEnemyCard(num, side){
    const divCardEnemy = createElementWithClass("div", "enemyLeftAndRight");
    const divLeftElement = createElementWithClass("div", "contNumber");
    const divCenterElement = createElementWithClass("div", "contCenter");
    const divRightElement = createElementWithClass("div", "contNumber");
    const p = createElementWithClass("p", (side === "left") ? "enemyLeft" : "enemyRight");

    divLeftElement.innerHTML = `<ion-icon class="${(side === "left") ? "enemyLeft" : "enemyRight"}" name="skull-outline"></ion-icon>`;
    p.innerText = num;
    divCenterElement.append(p);
    divRightElement.innerHTML = `<ion-icon class="${(side === "left") ? "enemyLeft" : "enemyRight"}" name="skull-outline"></ion-icon>`;

    divCardEnemy.append(divLeftElement, divCenterElement, divRightElement);
    return divCardEnemy;
}

export function update(newTurn){
    document.getElementById("playGroundContOne").innerHTML = ""
    document.getElementById("playGroundContOne").append(useCard(newTurn.card))

    if(newTurn.players[newTurn.turn].id === logged_as.id){
        document.getElementById("containerOne").classList.remove("activePlayersOne")
        document.getElementById("containerThree").classList.add("activePlayersThree")
    }else{
        document.getElementById("containerThree").classList.remove("activePlayersThree")
        document.getElementById("containerOne").classList.add("activePlayersOne")
    }

    console.log(newTurn.players)

    let mapPlayers = newTurn.players.map(item => item.id).indexOf(logged_as.id);
    newTurn.players.splice(mapPlayers, 1);
    spawnEnemyCards(newTurn.players[0].cards)

    try{
        document.getElementById("playerThree").innerHTML = ""
        document.getElementById("playerFour").innerHTML = ""

        if(newTurn.players[1]){
            document.getElementById("playerThree").append(numberEnemyCard(newTurn.players[1].cards, "left"));
        }
        if(newTurn.players[2]){
            document.getElementById("playerFour").append(numberEnemyCard(newTurn.players[2].cards, "right"));
        }
    }catch{}
}

function addCard(obj, index, total, overlapWidth) {
    const divCard = createElementWithClass("div", "card");
    const divLeftElement = createElementWithClass("div", "contNumber");
    const pLeft = createElementWithClass("p", "number");
    const divCenterElement = createElementWithClass("div", "contCenter");
    const divRightElement = createElementWithClass("div", "contNumber");
    const pRight = document.createElement("p");

    if(obj.effect.Atk || obj.effect.Add){
        pRight.classList.add("number")
    }else{
        pRight.classList.add("element")
    }

    divCard.addEventListener('mouseover', () => {
        divCard.classList.add('persistent-hover');
    });
    divCard.addEventListener('mouseleave', () => {
        setTimeout(() => {
            divCard.classList.remove('persistent-hover');
        }, 100);
    }); 

    divCard.addEventListener("click", function(){
        fetch(`https://duo.shuttleapp.rs/api/rooms/${globalRoom.id}/game/play/${index}`, {method: "POST", headers: {"Authorization": globalToken}})
    })

    setPosition(divCard, index, total, overlapWidth)
    return creationCard(obj, divCard, divLeftElement, divCenterElement, divRightElement, pLeft, pRight)
}

function enemyCard(index, total, overlapWidth) {
    const divCardEnemy = createElementWithClass("div", "enemyCard");
    const divLeftElement = createElementWithClass("div", "contNumber");
    const divCenterElement = createElementWithClass("div", "contCenter");
    const divRightElement = createElementWithClass("div", "contNumber");

    divLeftElement.innerHTML = `<ion-icon class="enemy" name="skull-outline"></ion-icon>`;
    divCenterElement.innerHTML = `<ion-icon class="enemy" name="skull-outline"></ion-icon>`;
    divRightElement.innerHTML = `<ion-icon class="enemy" name="skull-outline"></ion-icon>`;

    setPosition(divCardEnemy, index, total, overlapWidth)

    divCardEnemy.append(divLeftElement, divCenterElement, divRightElement);
    return divCardEnemy;
}

function spawnEnemyCards(cardLength){
    const containerOne = document.getElementById("containerOne")
    if(containerThree !== null){
        containerOne.innerHTML = '';
        let overlapWidth = 50;
        const totalCardWidth = (cardLength - 1) * (140 - overlapWidth) + 140;
    
        if (totalCardWidth > containerThree.offsetWidth) {
            overlapWidth = (cardLength * 140 - containerThree.offsetWidth) / (cardLength - 1);
            if (overlapWidth < 10) overlapWidth = 10;
        }
    
        for(let i = 0; i < cardLength; i++){
            containerOne.append(enemyCard(i, cardLength, overlapWidth));
        }
    }
}

function useCard(card){
    console.log(card)
    console.log(isNaN(card))
    const divCard = createElementWithClass("div", "centerCard");
    const divLeftElement = createElementWithClass("div", "contNumber");
    const pLeft = createElementWithClass("p", "number");
    const divCenterElement = createElementWithClass("div", "contCenter");
    const divRightElement = createElementWithClass("div", "contNumber");
    const pRight = document.createElement("p")
    if(card.effect.Atk || card.effect.Add){
        pRight.classList.add("number")
    }else{
        pRight.classList.add("element")
    }

    return creationCard(card, divCard, divLeftElement, divCenterElement, divRightElement, pLeft, pRight)
}

function creationCard(obj, elementDiv, left, center, right, pL, pR){

    switch (obj.element) {
        case "Air":
            elementDiv.style.background = "lightskyblue";
            elementDiv.style.color = "lightskyblue";
            break;
        case "Wood":
            elementDiv.style.background = "sienna";
            elementDiv.style.color = "sienna";
            break;
        case "Water":
            elementDiv.style.background = "steelblue";
            elementDiv.style.color = "steelblue";
            break;
        case "Fire":
            elementDiv.style.background = "red";
            elementDiv.style.color = "red";
            break;
        case "Energy":
            elementDiv.style.background = "orange";
            elementDiv.style.color = "orange";
            break;
        case "Earth":
            elementDiv.style.background = "saddlebrown";
            elementDiv.style.color = "saddlebrown";
            break;
    }

    if (obj.effect.Atk) {
        center.innerText = obj.element;
        pL.innerText = obj.effect.Atk;
        pR.innerText = obj.effect.Atk;
        if (obj.effect.Atk >= 10) {
            double(pL, pR);
        }
    } else if (obj.effect.Add) {
        center.innerHTML = `<ion-icon name="dice-outline"></ion-icon>`;
        pL.innerText = `+${obj.effect.Add}`;
        pR.innerText = `+${obj.effect.Add}`;
        double(pL, pR);
    } else if (obj.effect === "Flow") {
        center.innerHTML = `<ion-icon class="number" name="sync-outline"></ion-icon>`;
        pL.innerHTML = `<ion-icon class="number" name="sync-outline"></ion-icon>`;
        pR.innerHTML = `<ion-icon class="number" name="sync-outline"></ion-icon>`;
    } else if (obj.effect === "Stun") {
        center.innerHTML = `<ion-icon class="number" name="flash-outline"></ion-icon>`;
        pL.innerHTML = `<ion-icon class="number" name="flash-outline"></ion-icon>`;
        pR.innerHTML = `<ion-icon class="number" name="flash-outline"></ion-icon>`;
    }

    left.append(pL);
    right.append(pR);
    elementDiv.append(left, center, right);
    return elementDiv;
}

function createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
}

function double(firstElement, secondElement) {
    firstElement.classList.remove("number");
    secondElement.classList.remove("number");
    firstElement.classList.add("doubleNumber");
    secondElement.classList.add("doubleNumber");
}

export function spawnPlayersCards(cards) {
    const containerThree = document.getElementById("containerThree");
    if(containerThree !== null){
        containerThree.innerHTML = '';
        let overlapWidth = 50;
        const totalCardWidth = (cards.length - 1) * (140 - overlapWidth) + 140;
    
        if (totalCardWidth > containerThree.offsetWidth) {
            overlapWidth = (cards.length * 140 - containerThree.offsetWidth) / (cards.length - 1);
            if (overlapWidth < 10) overlapWidth = 10;
        }
    
    
        cards.forEach((obj, index) => {
            containerThree.append(addCard(obj, index, cards.length, overlapWidth));
        });
    }else{
        cardsToSpawn = cards
    }
}

function setPosition(divCard ,index, total, overlapWidth){
    const cardWidth = 140;
    const deckWidth = (total - 1) * (cardWidth - overlapWidth) + cardWidth;
    const startPosition = `calc(50% - ${deckWidth / 2}px)`;

    divCard.style.left = `calc(${startPosition} + ${index * (cardWidth - overlapWidth)}px)`;
    divCard.style.zIndex = index;
}

function renderCards() {
    let containerThreeCard = containerThree.getElementsByClassName("card")
    let containerOneCard = containerOne.getElementsByClassName("enemyCard")

    let overlapWidth = 50;
    const totalCardWidth = (containerThreeCard.length - 1) * (140 - overlapWidth) + 140;

    if (totalCardWidth > containerThree.offsetWidth) {
        overlapWidth = (containerThreeCard.length * 140 - containerThree.offsetWidth) / (containerThreeCard.length - 1);
        if (overlapWidth < 10) overlapWidth = 10;
    }
    console.log(1)

    for(let [index, element] of Object.entries(containerThreeCard)){
        setPosition(element ,index , containerThreeCard.length, overlapWidth)
    }

    for(let [index, element] of Object.entries(containerOneCard)){
        setPosition(element ,index , containerOneCard.length, overlapWidth)
    }
}

export async function GameOver(value){
    let playerWin = await Profile.load(value[0].id)
    document.getElementById("playerWin").innerText = playerWin.display_name
    document.getElementById("blockWin").classList.add("active")
    document.getElementById("exitButton").addEventListener("click", function() {
        location.reload();
    });
}