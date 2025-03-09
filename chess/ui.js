const BOARD = document.getElementById("board");

for(let i=0; i<8; i++)
    for(let j=0; j<8; j++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("id",`${i*8+j}`);
    cell.style.backgroundColor = ground.color[(i+j)%2];
    BOARD.appendChild(cell);
}
updateState();

BOARD.addEventListener("click", (e)=>{
    let id = Number(e.target.id);
    let c = id%8;
    let r = (id-c)/8;

    console.log(marking.selected);
    // cases -> empty,elm{ capture, marking, reposition }
    // empty
    if(marking.selected.elm != null){
        // capture && reposition && invalid capture
        const prv = marking.selected.position;
        const rr = prv[0], cc = prv[1];
        
        if(marking.field[r][c]!=" "){
            remove(rr,cc);
            place(r,c,marking.selected.elm);
            clrmark();
        }else if(board[r][c] != " "){
            clrmark();
            marking.selected.elm = board[r][c];
            marking.selected.position = [r,c];
            walk(r,c);
        }else clrmark();
    }
    // marking
    else if(board[r][c] != " "){
        clrmark();
        marking.selected.elm = board[r][c];
        marking.selected.position = [r,c];
        walk(r,c);
    }else clrmark();
    
    updateState();
});