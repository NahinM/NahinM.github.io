const board = document.getElementById("board");
const nav = document.getElementById("nav");
let size = 20;
const flagBoard = document.getElementById("flags");
// display the play ground
function frame(){
    for(let i=0;i<size*size;i++){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("id",`${i}`);
        board.appendChild(cell);
    }
}

// data containers
const mine = [];
const data = [];
let isFlag = false;
let totalMines = 0, TotalFound=0;
let gameOver = false;
let totalFlag = 0;
// funtions
function valid(i,j){
    return 0<=i && i<size && 0<=j && j<size;
}

function isMine(r,c){
    for(let i=0;i<mine.length;i++) if((r*size+c)==mine[i]) {
        return 1;
    }
    return 0;
}

function countMines(r,c){
    let count = 0;
    const dr = [-1,-1,-1, 0,0, 1,1,1];
    const dc = [-1, 0, 1,-1,1,-1,0,1];

    for(let i=0;i<8;i++) {
        let rr = r+dr[i], cc = c+dc[i];
        if(valid(rr,cc)){
            count += isMine(rr,cc);
        }
    }
    return count;
}

function revealArround(){
    let flag = true;
    const dr = [-1,-1,-1, 0,0, 1,1,1];
    const dc = [-1, 0, 1,-1,1,-1,0,1];

    for(let r=0;r<size;r++){
        for(let c=0;c<size;c++){
            if(data[r*size+c] == "0"){
                for(let i=0;i<8;i++) {
                    let rr = r+dr[i], cc = c+dc[i];
                    let x = rr*size+cc;
                    if(valid(rr,cc)){
                        document.getElementById(`${x}`).innerHTML = `${data[x]!="0"?data[x]:""}`;
                    }
                }
                
            }
        }
    }
}

// get all the data ready
function getDataReady(){
    // genarate random mine positions
    for(let r = 0; r<50; r++){
        let x = Math.floor((Math.random() * size*size) + 1);
        mine.push(x);
    }

    // get the data placed in the positions
    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            if(isMine(i,j)) {
                data.push("x");
                totalMines+=1;
            } else {
                let c = countMines(i,j);
                data.push(`${c}`)
            }
        }
    }
}

// starting the game
function startGame(){
    size = Number(document.getElementById("Size").value);
    board.style.gridTemplateColumns = `repeat(${size},50px)`;
    frame();
    getDataReady();
    revealArround();
    document.getElementById("mines").innerHTML = totalMines;
    document.getElementById("btc").style.border = "1px solid #00fffb";
}

// startGame();

board.addEventListener("click" , (e)=> {
    if(gameOver) return;
    id = Number(e.target.id);
    const cell = document.getElementById(`${id}`);
    if(isFlag) {
        if(cell.innerHTML!="" && cell.innerHTML!="f") return;
        cell.innerHTML = cell.innerHTML=="f"?"":"f";
        if(data[id]=="x") TotalFound += cell.innerHTML=="f"?1:-1;
        totalFlag += cell.innerHTML=="f"?1:-1;
        flagBoard.innerHTML = totalFlag;
        if(totalMines==TotalFound && totalFlag==TotalFound){
            window.alert("You Won!!");
            gameOver=true;
        }
    }
    else if(cell.innerHTML!="f"){
        if(data[id]=="x"){
            window.alert(`You Lose!! Found(${TotalFound})`);
            gameOver = true;
        }
        cell.innerHTML = `${data[id]}`;
    }
});

nav.addEventListener("click",(e)=>{
    id = e.target.id;
    if(id=="nav") return;
    isFlag = (id=="btf");
    document.getElementById(id).style.border = "1px solid #00fffb";
    document.getElementById(id=="btf"?"btc":"btf").style.border = "1px solid yellow";
});