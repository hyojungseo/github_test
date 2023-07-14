let bord = [];
let $snaketable= "";
let sy = [];
let sx = [];
let myInterval = "";
let gameOver = false;
let mytimeout = "";
let time = 5;
let bordsize=  15;
let y = [0,0,0,0];
let x = [0,1,2,3];
let snakesize = y.length;
let itemx = 0;
let itemy = 0;
let item = 9;
let dir = 1;
let applenumber = 0;
let snakebody = true;

function back(){
    location.href="total.html";
}

// 시작
function gameStart(){
    console.log("startgame");
    myInterval = setInterval(movesnake,100);
    document.querySelector("#playbutton").setAttribute("disabled",true);
    document.querySelector("#playbutton").style.color="black";
    document.querySelector("#playbutton").style.backgroundColor="lightgray";
}

// 매초마다 뱀 움직이기
function movesnake(){

   $snaketable = document.getElementById("#snaketable");
    console.log(gameOver);
    if(gameOver == true){
        gamerestart();
        clearInterval(myInterval);
    }

    console.log("dir:"+dir);
    
    let tempy = y[snakesize-1];
    let tempx = x[snakesize-1];
    console.log("전: "+tempy,tempx);

    
        if(dir == 1){
            tempx++;
        }else if(dir == 2){
            tempx--;
        }else if(dir == 3){
            tempy++;
        }else if(dir == 0){
            tempy--;
        }
       
        
        if(tempx<0 || tempx>=bordsize){
            document.querySelector("#settime").innerHTML = "아야! 벽에 부딪혔어요ㅠㅠ";
            gameOver = true;
            return;
        }
        
        if(tempy<0 || tempy>=bordsize){
            document.querySelector("#settime").innerHTML = "아야! 벽에 부딪혔어요ㅠㅠ";
            gameOver = true;
            return;
        }
        console.log("후: "+tempy,tempx);
        console.log("bord[tempy][tempx]: "+bord[tempy][tempx]);
        if(bord[tempy][tempx] != 0 && bord[tempy][tempx] != 9){
            document.querySelector("#settime").innerHTML = "아이쿠... 몸이 부딪혔네...";
            gameOver = true;
            return;
        }
    
        
        if(applenumber == 10){
            document.querySelector("#settime").innerHTML = "10개 다 먹었어요~!";
            gameOver = true;
            return;
        }
        
        // 사과 먹었을때
        if(bord[tempy][tempx] == item){
            y.unshift(tempy);
            x.unshift(tempx);
    
            snakesize++;
            applenumber++;
            document.querySelector("#applenumber").innerHTML = applenumber;
            makeitem();
        }
        
        for(let i =0;i<snakesize;i++){
            bord[y[i]][x[i]] = 0;
            document.querySelector("#snaketable").children[y[i]].children[x[i]].setAttribute("class","");
        }
        
        for(let i = 1;i<snakesize;i++){
            y[i-1] = y[i];
            x[i-1] = x[i];
        }
        y[snakesize-1] = tempy;
        x[snakesize-1] = tempx;
    
        console.log("y: "+y);
        console.log("x: "+x);
        
    
        for(let i = 0;i<snakesize;i++){
            bord[y[i]][x[i]] =i+1; 
            document.querySelector("#snaketable").children[y[i]].children[x[i]].setAttribute("class","snakebody");
        }
        
        document.querySelector("#snaketable").children[y[snakesize-1]].children[x[snakesize-1]].setAttribute("class","snakehead");
    }
        

 //게임 끝나고 다시 시작하기
 function gamerestart(){
    console.log(time);
    if(time>0){
        document.querySelector("#settime").innerHTML = time+"초 후에 다시 시작합니다.";
        document.querySelector("#settime").style.color="red";
        time--;
        mytimeout = setTimeout(gamerestart,1000);
    }else if(time == 0){
        document.querySelector("#settime").innerHTML = "";
        clearInterval(mytimeout);
        location.href="snakegame.html"; 
    }
}

 
// 보드판 만들기
function makebord(){
    
    let $bord = document.body;
    let $table = document.createElement("table");
    $table.id = "snaketable";

    for(let i = 0;i<bordsize;i++){
        let $tr = document.createElement("tr");
        let temp = [];
        for(let j = 0;j<bordsize;j++){
            let $td = document.createElement("td");
            $tr.append($td);
            temp.push(0);
        }
        $table.append($tr);
        bord.push(temp);
    }
    $bord.append($table);
    snakecolor();
    makeitem();
}

// 뱀 위치 맞춰서 넣어주기
function snakecolor(){
    $snaketable = document.querySelector("#snaketable");
    for(let i = 0;i<snakesize;i++){
        bord[y[i]][x[i]]= i+1;
        $snaketable.children[y[i]].children[x[i]].setAttribute("class","snakebody");
    }
    $snaketable.children[y[snakesize-1]].children[x[snakesize-1]].setAttribute("class","snakehead");
}

// 사과 넣어주기
function makeitem(){
    console.log(itemy+","+itemx);
    $snaketable = document.querySelector("#snaketable");
    if(bord[itemy][itemx] == item){
        $snaketable.children[itemy].children[itemx].setAttribute("id","");
        document.querySelector("#appleImg").remove();
        bord[itemy][itemx] = 0;
    }
    
    while(true){

        let r = Math.floor(Math.random()*bordsize);
        let r1 = Math.floor(Math.random()*bordsize);

        if(bord[r][r1] == 0){
            bord[r][r1] = item;
            itemy = r;
            itemx = r1;
            $snaketable.children[r].children[r1].setAttribute("id","apple");
            let temp = `<img id="appleImg" src="image/apple.png" style="width:40px; height:40px;margin:0px auto;">`;
            document.querySelector("#snaketable").children[r].children[r1].innerHTML=temp;
            break;
        }
    }
}

//커서 눌렀을때 이벤트
window.addEventListener("keydown",(e)=>{
        console.log("방향: "+e.code);
        // 1.동 2. 서 3. 남 0.북
        if(e.code == "ArrowRight" && dir != 2){
                dir = 1; 
        }else if(e.code == "ArrowUp" && dir!=3){
                dir = 0; 
        }else if(e.code == "ArrowDown" && dir!=0){
                dir = 3;
        }else if(e.code == "ArrowLeft" && dir != 1){
                dir = 2;
        }
});

makebord();