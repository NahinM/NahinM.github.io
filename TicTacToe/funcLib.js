const board = document.getElementById("board");
const playerMsg = document.getElementById("player");
let player = true;
let draw = 0;
let cellMarked;
let end = false;

function init(){
    for(let i=0;i<9;i++){
        let elem = document.createElement("div");
        elem.setAttribute("id",`${i}`);
        elem.setAttribute("class","cell");
        elem.innerHTML = '';
        board.appendChild(elem);
    }
} init();

function startGame(){
    draw = 0;
    cellMarked  = ['','','','','','','','',''];
    player = true;
    playerMsg.innerHTML = `player:${player?"X":"O"}`;
} startGame();

function reStart(){
    end = false;
    for(let i=0; i<9; i++){
        document.getElementById(`${i}`).innerHTML = '';
    } startGame();
}

board.addEventListener('click', (e)=> {
    if(end) return;
    let id = e.target.id;
    mark(id);
});

function mark(id){
    const cell = document.getElementById(id);
    if(cell.innerHTML!='') return;
    cell.innerHTML = player?"X":"O";
    if(iswin()) {
        playerMsg.innerHTML = `player:${player?"X":"O"} Won`;
        end = true;
        return;
    }
    draw++;
    if(draw==9){
        playerMsg.innerHTML = "Match Draw!";
        return;
    }
    player = !player;
    playerMsg.innerHTML = `player:${player?"X":"O"}`;
}

const winComb = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function iswin(){
    for(let x in winComb){
        let cmb = winComb[x];
        const cell1 = document.getElementById(`${cmb[0]}`).innerText;
        const cell2 = document.getElementById(`${cmb[1]}`).innerText;
        const cell3 = document.getElementById(`${cmb[2]}`).innerText;
        if(cell1!='' && cell1==cell2 && cell2==cell3) return true;
    }
    return false;
}
