const board = document.getElementById("board");

for(let i=0;i<16; i++){
    const cell = document.createElement("div");
    cell.setAttribute("id",`${i}`);
    cell.classList.add("cell");
    board.appendChild(cell);
}


function frame(){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            document.getElementById(`${i*4+j}`).innerHTML = (grid[i][j]!=0?grid[i][j]:"");
        }
    }
} 
getNum();
frame();

document.addEventListener("keydown", (e)=> {
    if(e.key!="w" && e.key!="s" && e.key!="a" && e.key!="d" && e.key != "ArrowUp" && e.key != "ArrowDown" && e.key != "ArrowLeft" && e.key != "ArrowRight") return;
    if(e.key=="w" || e.key== "ArrowUp") swapAction(up);
    if(e.key=="s" || e.key=="ArrowDown") swapAction(down);
    if(e.key=="a"|| e.key=="ArrowLeft") swapAction(left);
    if(e.key=="d"|| e.key=="ArrowRight") swapAction(right);
    getNum();
    frame();
});

let startX, startY;

document.addEventListener('touchstart', (e) => {
  e.preventDefault();
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const deltaX = endX - startX;
  const deltaY = endY - startY;

  // Check if it's a swipe
  if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        swapAction(right);
        getNum();
        frame();
      } else {
        swapAction(left);
        getNum();
        frame();
      }
    } else {
      if (deltaY > 0) {
        swapAction(down);
        getNum();
        frame();

      } else {
        swapAction(up);
        getNum();
        frame();
      }
    }
  }
});
