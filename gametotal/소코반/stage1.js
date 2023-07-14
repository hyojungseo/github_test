
let $bord = "";
let mhx = 5;
let mhy = 3;
let boxy = 0;
let boxx = 0;
let count = 0;
let gamestart = true;
let dir = -1;
let size = 10;
let stage = 1;
let listy="";
let listx="";
let bord ="";

if(stage == 1){
    bord =[
        [0,0,0,6,6,6,0,0,0,0],
        [0,0,0,6,4,6,0,0,0,0],
        [0,0,0,6,2,6,6,6,6,0],
        [0,6,6,6,3,8,3,4,6,0],
        [0,6,4,2,3,2,6,6,6,0],
        [0,6,6,6,6,3,6,0,0,0],
        [0,0,0,0,6,4,6,0,0,0],
        [0,0,0,0,6,6,6,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
}
// dir>> 1.위  2. 오른  3.왼  4. 아래

// 2.잔디 3.치즈 4.도착위치 5.치즈가 안에 있을때 8.쥐  6.벽
function stage1(){
    stage = 1;
   
    bord =[
        [0,0,0,6,6,6,0,0,0,0],
        [0,0,0,6,4,6,0,0,0,0],
        [0,0,0,6,2,6,6,6,6,0],
        [0,6,6,6,3,8,3,4,6,0],
        [0,6,4,2,3,2,6,6,6,0],
        [0,6,6,6,6,3,6,0,0,0],
        [0,0,0,0,6,4,6,0,0,0],
        [0,0,0,0,6,6,6,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    gamestart = true;
    clearbord();
    intocolor();
}
 
function stage2(){
    mhy = 1;
    mhx = 1;
    movephoto();
    stage = 2;
    bord =[
        [6,6,6,6,6,0,0,0,0,0],
        [6,8,2,2,6,0,0,0,0,0],
        [6,2,3,3,6,0,6,6,6,0],
        [6,2,3,2,6,0,6,4,6,0],
        [6,6,6,2,6,6,6,4,6,0],
        [0,6,6,2,2,2,2,4,6,0],
        [0,6,2,2,2,6,2,2,6,0],
        [0,6,2,2,2,6,6,6,6,0],
        [0,6,6,6,6,6,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    gamestart = true;
    clearbord();
    intocolor();
    $(".mouse").css({'transform': 'rotate('+ 360+'deg)'});
}
function stage3(){
    mhy = 2;
    mhx = 1;
    stage = 3;
    movephoto();
    bord =[
        [0,6,6,6,6,6,6,0,0,0],
        [0,6,2,2,2,2,6,6,6,6],
        [0,6,2,2,2,2,2,2,2,6],
        [6,6,3,6,6,6,2,2,2,6],
        [6,2,8,2,3,2,2,3,2,6],
        [6,2,2,2,6,2,3,2,6,6],
        [6,6,4,4,6,2,2,2,6,0],
        [0,6,4,4,6,2,2,2,6,0],
        [0,6,6,6,6,6,6,6,6,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    gamestart = true;
    clearbord();
    intocolor();
    $(".mouse").css({'transform': 'rotate('+ 360+'deg)'});
}

// 화면 보드판 reset 시키기
function clearbord(){
    for(let i = 0;i<size;i++){
        for(let j = 0;j<size;j++){
            $bord.children[i].children[j].style.backgroundColor = "";
            $bord.children[i].children[j].setAttribute("class","");
        }
    }
    $(".brick").css({'transform': 'rotate('+ 360+'deg)'});
    $(".cheese").css({'transform': 'rotate('+ 360+'deg)'});
}

// 보드판 표 만들기
function makebord(){
    
    $bord = document.querySelector("#bord");
    
    for(let i = 0;i<size;i++){
        let $tr = document.createElement("tr");
        for(let j = 0;j<size;j++){
        let $td = document.createElement("td");
        $tr.append($td);
        }
        $bord.append($tr);
    }
    console.log(bord);
    intocolor();
}

// 보드판 숫자에 맞춰 색깔 & 이미지 채우기
function intocolor(){

    for(let i = 0;i<size;i++){
        for(let j = 0;j<size;j++){
            if(bord[i][j]!=0){
                if(bord[i][j] == 6){
                    $bord.children[i].children[j].setAttribute("class","brick");
                }else if(bord[i][j]==2){
                    $bord.children[i].children[j].setAttribute("class","road");
                }else if(bord[i][j] == 8){
                    mhy = i;
                    mhx = j;
                    $bord.children[i].children[j].setAttribute("class","mouse");
                }else if(bord[i][j] == 4){
                    $bord.children[i].children[j].setAttribute("class","arrive");
                }else if(bord[i][j] == 3){
                    $bord.children[i].children[j].setAttribute("class","cheese");
                }
            }
        }
    }

    $(".cheese").css({'transform': 'rotate('+ 360+'deg)'});
    $(".brick").css({'transform': 'rotate('+ 360+'deg)'});
    findcheeze();// 치즈가 다 찼는지 확인한다.

}


// 치즈가 다 찼는지 확인한다.
function findcheeze(){
    if(stage == 1){
         listy=[1,4,6,3];
         listx=[4,2,5,7];
        count = 4;
    }else if(stage == 2){
         listy=[3,4,5];
         listx=[7,7,7];
        count = 3;
    }else if(stage == 3){
        listy=[6,6,7,7];
        listx=[2,3,2,3];
        count = 4;
    }

    for(let i = 0;i<listx.length;i++){
        if(bord[listy[i]][listx[i]]==3){
            count--;
            $bord.children[listy[i]].children[listx[i]].style.backgroundColor="lightgray";
        }else{
            $bord.children[listy[i]].children[listx[i]].style.backgroundColor="red";
        }
        console.log("bord: "+bord[listy[i]][listx[i]]);
    }

    console.log("count: "+count)
    if(count == 0){
        gamestart = false;

    }
}
// dir>> 1.위  2. 오른  3.왼  4. 아래
window.addEventListener("keydown",(e)=>{
    console.log(e.code);
    console.log("mhy: "+mhy +"mhx: "+mhx);
    if(e.code =="ArrowLeft"){
        // 왼쪽
        dir = 3;
        movephoto();

        if(gamestart == true){
            // 그냥 이동할때
            if(bord[mhy][mhx-1] == 2 && mhx>-1){
                bord[mhy][mhx] = 2;
                bord[mhy][mhx] = bord[mhy][mhx-1];
                mhx--;
                bord[mhy][mhx] = 8;
                console.log("mhy: "+mhy +"mhx: "+mhx);
                // 상자랑 같이 이동할때 
                }else if(bord[mhy][mhx-1] == 3 && bord[mhy][(mhx-2)] != 3 && bord[mhy][(mhx-2)]< 5 ){
                    bord[mhy][mhx] = 2;
                    boxy = mhy;
                    boxx = (mhx-1);
                    bord[boxy][(boxx-1)] = 3;
                    boxx--;
                    bord[mhy][(mhx-1)] = 8;
                    mhx--;
                }   

        intocolor(); //$bord에 색깔 넣어주기
        movephoto() // 쥐 이미지 회전시키기
       
        }

    }else if(e.code == "ArrowRight"){
        // 오른쪽
        // dir>> 1.위  2. 오른  3.왼  4. 아래
        dir = 2;
        movephoto();
       
        if(gamestart == true){
            // 그냥 이동할때
            if(bord[mhy][mhx+1] == 2 && mhx<size){
                bord[mhy][mhx] = 2;
                bord[mhy][mhx] = bord[mhy][mhx+1];
                mhx++;
                bord[mhy][mhx] = 8;
                console.log("mhy: "+mhy +"mhx: "+mhx);
                // 상자랑 같이 이동할때 
            }else if(bord[mhy][mhx+1] == 3 && bord[mhy][(mhx+2)] < 5 && bord[mhy][(mhx+2)] !=3){
                bord[mhy][mhx] = 2;
                boxy = mhy;
                boxx = (mhx+1);
                bord[boxy][(boxx+1)] = 3;
                boxx++;
                bord[mhy][(mhx+1)] = 8;
                mhx++;
            }   

            intocolor(); //$bord에 색깔 넣어주기
            movephoto() // 쥐 이미지 회전시키기
       
        }
    }else if(e.code == "ArrowDown"){
         // dir>> 1.위  2. 오른  3.왼  4. 아래
         dir = 4;
         movephoto();

        if(gamestart == true){
            // 그냥 이동할때
            if(bord[mhy+1][mhx] ==2 && mhx<size){
                bord[mhy][mhx] = 2;
                bord[mhy][mhx] = bord[mhy+1][mhx];
                mhy++;
                bord[mhy][mhx] = 8;
                
                //상자랑 같이 이동할때
            } else if(bord[mhy+1][mhx] == 3 && bord[(mhy+2)][mhx] < 5 && bord[(mhy+2)][mhx] !=3){
                bord[mhy][mhx] = 2;
                boxy = (mhy+1);
                boxx = mhx;
                bord[boxy+1][boxx] = 3;
                bord[mhy+1][mhx] = 8;
                boxy++;
                console.log("mhy: "+mhy +"mhx: "+mhx);
                console.log("boxy: "+boxy +"mhx: "+boxx);
            }   
            intocolor(); //$bord에 색깔 넣어주기
            movephoto() // 쥐 이미지 회전시키기
        }
        
        
    }else if(e.code == "ArrowUp"){
         // dir>> 1.위  2. 오른  3.왼  4. 아래
         dir = 1;
        movephoto();

        if(gamestart == true){
            // 그냥 이동할때
        if(bord[mhy-1][mhx] == 2 && mhy-1>-1){
                bord[mhy][mhx] = 2;
                bord[mhy][mhx] = bord[mhy-1][mhx];
                mhy--;
                bord[mhy][mhx] = 8;
                console.log("mhy: "+mhy +"mhx: "+mhx);
                // 상자랑 같이 이동할때 
        }   else if(bord[mhy-1][mhx] == 3 && bord[(mhy-2)][mhx] < 5 && bord[(mhy-2)][mhx] !=3 ){
            bord[mhy][mhx] = 2;
            boxy = (mhy-1);
            boxx = mhx;
            bord[boxy-1][boxx] = 3;
            boxy--;
            bord[mhy-1][mhx] = 8;
            mhy--;
        }    
        
        intocolor(); //$bord에 색깔 넣어주기
        movephoto() // 쥐 이미지 회전시키기
         }

     }
        
})

function movephoto(){
 // dir>> 1.위  2. 오른  3.왼  4. 아래

 for(let i = 0;i<size;i++){
    for(let j = 0;j<size;j++){
        if(bord[i][j] == 8){
            $bord.children[i].children[j].setAttribute("class","mouse");
        }
    }
}

    if(dir == 1){
        // up
        $(".mouse").css({'transform': 'rotate('+ 360+'deg)'});
        $(".cheese").css({'transform': 'rotate('+ 360+'deg)'});
    }else if(dir == 2){
        //right
        $(".mouse").css({'transform': 'rotate('+ 90+'deg)'});
        $(".cheese").css({'transform': 'rotate('+ 360+'deg)'});
    }else if(dir == 3){
        //left
        $(".mouse").css({'transform': 'rotate('+ 270+'deg)'});
        $(".cheese").css({'transform': 'rotate('+ 360+'deg)'});
    }else if(dir == 4){
        //down
        $(".mouse").css({'transform': 'rotate('+ 180+'deg)'});
        $(".cheese").css({'transform': 'rotate('+ 360+'deg)'});
    }
}

function restart(){
    if(stage == 2){
        stage2();
    }else if(stage == 1){
        location.href="stage1.html";
    }else if(stage == 3){
        stage3();
    }
}
makebord();
stage1();
