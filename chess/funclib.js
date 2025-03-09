function valid(r,c){
    return 0<=r && r<8 && 0<=c && c<8;
}

function group(p){
    if('a' < p && p < 'z') return "white";
    return "black";
}

function mark(r,c){
    if(board[r][c] == " "){
        marking.field[r][c] = "*";
        return true;
    }
    if(group(marking.selected.elm) != group(board[r][c])) marking.field[r][c] = "x";
    return false;
}

function place(r,c,p){
    board[r][c] = p;
}

function remove(r,c){
    board[r][c] = " ";
}

function clrmark(){
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            marking.field[i][j] = " ";
        }
    }
    marking.selected.elm = null;
    marking.selected.position = null;
}

function walk(r,c){
    let p = board[r][c];
    p = p!="P"?p.toLocaleLowerCase():p;
    const n = move[p].upto;
    const steps = move[p].steps;
    
    for(let s=0; s<steps.length; s++){
        let ri = steps[s][0], ci = steps[s][1];
        let rr = ri+r, cc = ci+c;
        for(let i=0; i<n && valid(rr,cc); i++){
            if(!mark(rr,cc))break;
            rr += ri;
            cc += ci;
        }
    }
}

function updateState(){
    for(let i=0; i<8; i++){
        for(let j=0; j<8; j++){
            let cell = document.getElementById(`${i*8+j}`);
            cell.innerHTML = marking.field[i][j];
            cell.style.color = "#39ff03";
            cell.style.textShadow = "0px 0px 3px black";
            if(board[i][j]!=" ") {
                const p = board[i][j];
                cell.innerHTML = icon[p];
                cell.style.color = (group(p)=="white"?"white":"black");
                cell.style.textShadow = ("0px 0px 3px "+(group(p)=="white"?"black":"white"));
            }
        }
    }
}