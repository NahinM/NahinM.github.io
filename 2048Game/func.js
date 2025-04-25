function slide(dir,r,c){
    const dr = [1,-1,0,0];
    const dc = [0,0,1,-1];

    let tr=r, tc=c, tem = [0,0,0,0], at=0, prev=0;
    for(let i=0; i<4; i++){
        let num = grid[tr][tc];
        tr+= dr[dir];
        tc+= dc[dir];

        if(num==0) continue;
        if(prev==0) {prev = num;continue;}
        if(prev==num) {
            tem[at++] = prev<<1;
            prev=0;
        }else{
            tem[at++] = prev;
            prev = num;
        }
    }
    tem[at++] = prev;
    tr = r; tc = c;
    for(let i=0; i<4; i++){
        grid[tr][tc] = tem[i];
        tr+=dr[dir];
        tc+=dc[dir];
    }
}

function swapAction(dir){
    if(dir==left) for(let i=0; i<4; i++) slide(left,i,0);
    if(dir==right) for(let i=0; i<4; i++) slide(right,i,3);
    if(dir==up) for(let i=0; i<4; i++) slide(up,0,i);
    if(dir==down) for(let i=0; i<4; i++) slide(down,3,i);
}

function getNum(){
    let r = Math.floor(Math.random()*10), total=0;
    let n = Math.floor(Math.random() * 2);

    for(let i=0; i<4; i++) for(let j=0; j<4; j++) {
        if(grid[i][j]==0) total++;
        if(total==r) {
            grid[i][j] = (2<<n);
            return;
        }
    }
}