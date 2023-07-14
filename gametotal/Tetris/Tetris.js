const row = 22;
const col = 12;
let backbord = [];
let colorList = ["white", "green", "red", "purple", "orange", "blue", "yellow", "skyblue", "gray", "black"];
let block = -1; // 현재 나오고 있는 블록
let color= -1; // 현재 나오고 있는 블록 색깔
let y = 0;
let x = 0;
const white = 0;
const gray = 8;
const black = 9;
let timecount = 0;
let checkmove = "";
let blockmake = false;
let shape=[];
let doing = true;
let gameover = false;
let time = null;

//게임 다시 시작
function ReStart(){
    location.href = "Tetris.html";
}


//게임시작
function gameStart(){
    blockRandom();
    document.querySelector("#ReStart").style.display = "block";
    document.querySelector("#Start").setAttribute("disabled",true);
    time =  setInterval(down,300);

   document.addEventListener("keydown",(e)=>{
    console.log(e.code);

    if(e.code == "Space"){//아래로 한번에 이동
        while(doing){down()}
        doing = true;
    }else if(e.code == 'ArrowRight'){
            right();
    }else if(e.code == 'ArrowDown'){
        down();
    }else if(e.code == 'ArrowLeft'){
            left();
    }else if(e.code == 'ArrowUp'){// 회전시키기
        rotate();
    }
   
})

}


// 회전시키기

function rotate(){
    let after = [];
    for(let i = 0;i<shape.length;i++){
        let temp = [];
        for(let j = shape[i].length-1;j>=0;j--){
           temp.push(shape[j][i]);
        }
        after.push(temp); 
       }

      
    let replaceblock = getreplaceblock(shape);
    let bolckround = getreplaceblock(after);
    checkmove = getcheckmove(bolckround,0,0);
    
    if(checkmove == true){
        setBord(replaceblock,0,0,white); // 바뀌기전 0 으로 변경
        shape='';
        shape = after;
        setBord(bolckround,0,0,color); // 바뀐후 색깔 넣어주기
    }else{
        setBord(replaceblock,0,0,black); // 바닥에 닿으면 검은색으로 변경
    }
}

//블록으로 왼쪽 움직이기
function left(){
    let nexty = 0;
    let nextx = -1;

    timecount++;
    console.log("timecount: "+timecount);
    
    //shape = blockList[block].shape;
    let replaceblock = getreplaceblock(shape); // 블록 있는 위치 확인하기
     checkmove = getcheckmove(replaceblock,nexty,nextx); // 움직인 위치 확인하기
    
    if(checkmove == true){
        setBord(replaceblock,0,0,white); // 바뀌기전 0 으로 변경
        setBord(replaceblock,nexty,nextx,color); // 바뀐후 색깔 넣어주기
        x--;
    }
}

function lineClear(){// 한줄 완성되면 한줄 삭제

    let checkindex = -1;
    for(let i = 1;i<row-1;i++){
        let count = 0;
        for(let j = 1;j<col-1;j++){
            if(backbord[i][j] == black){
                count++;
            }
        }
        if(count>=10){
            checkindex = i;
            for(let k = checkindex;k>=1;k--){
             for(let j = 1;j<col-1;j++){
                backbord[k][j] = backbord[k-1][j];
                }
             }
             backbord[1]=[8,0,0,0,0,0,0,0,0,0,0,8];
            break;
        }
    }

    for(let i = 1;i<col-1;i++){
        if(backbord[4][i] == black){
            setgameover();
            break;
        }
    }
    setcolor();
}


//블록 오른쪽으로 움직이기
function right(){
    let nexty = 0;
    let nextx = 1;

    timecount++;
    console.log("timecount: "+timecount);
    
    //shape = blockList[block].shape;
    let replaceblock = getreplaceblock(shape); // 블록 있는 위치 확인하기
     checkmove = getcheckmove(replaceblock,nexty,nextx); // 움직인 위치 확인하기
    
    if(checkmove == true){
        
            setBord(replaceblock,0,0,white); // 바뀌기전 0 으로 변경
            setBord(replaceblock,nexty,nextx,color); // 바뀐후 색깔 넣어주기
                x++; 
             
    }
}


// 블록 아래로 내려가기
function down(){

    let nexty = 1;
    let nextx = 0;

    timecount++;
    //console.log("timecount: "+timecount);
    
    //shape = blockList[block].shape;
    let replaceblock = getreplaceblock(shape); // 블록 있는 위치 확인하기
     checkmove = getcheckmove(replaceblock,nexty,nextx); // 움직인 위치 확인하기
    
    if(checkmove == true){
        setBord(replaceblock,0,0,white); // 바뀌기전 0 으로 변경
        setBord(replaceblock,nexty,nextx,color); // 바뀐후 색깔 넣어주기
        y+=1;
    }else{
        setBord(replaceblock,0,0,black); // 바닥에 닿으면 검은색으로 변경
        doing = false;
        blockRandom();//랜덤으로 block설정하기 & block 색깔 넣어주기
        lineClear(); // 한줄 완성되면 한줄 삭제
    }

}

function getreplaceblock(shape){// 블록 있는 위치 확인하기
    let replaceblock = [];
    for(let i = 0;i<shape.length;i++){
        for(let j = 0;j<shape[i].length;j++){
            if(shape[i][j] != 0){
                replaceblock.push([i+y,j+x]);
            }
        }
    }
    //console.log(replaceblock);
    return replaceblock;
}

function getcheckmove(replaceblock,nexty,nextx){// 움직인 위치 확인하기
    let check = true;
    for(let i = 0;i<replaceblock.length;i++){

        let yy = replaceblock[i][0];
        let xx = replaceblock[i][1];
        

        if(backbord[(yy+nexty)][(xx+nextx)] >= gray){
            check = false;
        }

    }
    return check;

}

function setBord(replaceblock,newy,newx,color){ // 보드판에 숫자 넣어주기
    let $bord = document.querySelector("#bord");

    for(let i = 0;i<replaceblock.length;i++){
        let yy = replaceblock[i][0];
        let xx = replaceblock[i][1];

        backbord[yy+newy][xx+newx] = color;
        $bord.children[yy+newy].children[xx+newx].className = colorList[color];
    }

}

// 블록 리스트들
let blockList=[
    {
        name:'s',
        count:1,
        shape:[
            [0,1,1],
            [1,1,0],
            [0,0,0]
        ]
    },
    {
        name:'z',
        count:2,
        shape:[
            [2,2,0],
            [0,2,2],
            [0,0,0]
        ]
    },
    {
        name:'t',
        count:3,
        shape:[
            [3,3,3],
            [0,3,0],
            [0,0,0]
        ]
    },
    {
        name:'l',
        count:4,
        shape:[
            [0,0,0],
            [4,0,0],
            [4,4,4]
        ]
    },
    {
        name:'j',
        count:5,
        shape:[
            [0,0,0],
            [0,0,5],
            [5,5,5]
        ]
    },
    {
        name:'o',
        count:6,
        shape:[
            [6,6],
            [6,6]
        ]
    },
    {
        name:'i',
        count:7,
        shape:[
            [0,7,0,0],
            [0,7,0,0],
            [0,7,0,0],
            [0,7,0,0],
        ]
    }
]


function init(){
    makebord();  //보드판 만들기
    setborder();
    setcolor();
}

function setcolor(){ //보드판에 색깔 넣어주기

    let $bord = document.querySelector("#bord");

    for(let i = 0;i<row;i++){
        for(let j = 0;j<col;j++){
            $bord.children[i].children[j].className = colorList[backbord[i][j]];
        }
    }
}


function makebord(){//보드판 만들기
    
    let $bord = document.querySelector("#bord"); 
    
    for(let i = 0;i<row;i++){
        let temp = [];
        let $tr = document.createElement("tr");
        for(let j  =0;j<col;j++){
            let $td = document.createElement("td");
            $tr.append($td);
            temp.push(0);
        }
        backbord.push(temp);
        $bord.append($tr);
    }
}

function setborder(){ //보드판에 테두리 넣기

    let $bord = document.querySelector("#bord"); 

    for(let i = 0;i<col;i++){ // 가로
        backbord[0][i] = gray;
        backbord[21][i] = gray;
    }
    for(let i = 0;i<row;i++){ //세로
        backbord[i][0] = gray;
        backbord[i][11] = gray;
    }
}


function blockRandom(){//랜덤으로 block설정하기 & block 색깔 넣어주기

    y = 1;
    x = 4;
    
    let $bord = document.querySelector("#bord"); 

    let r =Math.floor(Math.random()*7)+1;
    console.log("r: "+r);

    for(let i = 0;i<blockList.length;i++){
        if(r == blockList[i]["count"]){
            console.log(blockList[i]["name"]);
            block = i;
            break;
        }
    }
    color = (block+1);
    shape = blockList[block].shape;
    let indexy = 0;
    let size = blockList[block].shape.length;
    console.log("size: "+size);
    for(let i = y;i<y+size;i++){
        let indexx = 0;
        for(let j = x;j<x+size;j++){
            backbord[i][j] = blockList[block].shape[indexy][indexx];
           
         indexx++;
        }
        indexy++;
    }
}

function setgameover(){//게임 끝났을때!
    clearInterval(time);
    alert("Gameover");
    ReStart()
}

init();