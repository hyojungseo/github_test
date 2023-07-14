let size = 4;
let backbord = [];
let time = [0,0,0];
let min = 0;
let mysetInterval ="";
let $bord = "";
let start = false;
let movekey = "";
let nocount = "";

// 보드판 만들기
function makebord() {
    $bord = document.querySelector("#bord");
    
    for(let i = 0;i<size;i++){
        let $tr = document.createElement("tr");
        let temp = [];
        for(let j = 0;j<size;j++){
            let $td = document.createElement("td");
            temp.push(0);
            $tr.append($td);
        }
        backbord.push(temp);
        $bord.append($tr);
    }

    console.log(backbord);
    // 숫자 생성
    randomnumber();
    start = true;
}

// 숫자 생성하기
function randomnumber(){
    if(start){
        let count = 0;
        while(true){
            let ry = Math.floor(Math.random()*3);
            let rx = Math.floor(Math.random()*3);
            if(backbord[ry][rx] == 0){
                backbord[ry][rx] = 2;
                $bord.children[ry].children[rx].innerHTML = backbord[ry][rx];
                $bord.children[ry].children[rx].setAttribute("class","random");
                break;
            }else{
               count++;
            }
            if(count>=size*size){
                overcheck(); // 주변에 합쳐질 숫자들이 있는지 없는지 확인하기
            }
        }
    }else{
        while(true){
        let ry = Math.floor(Math.random()*3);
        let rx = Math.floor(Math.random()*3);
        let r1y = Math.floor(Math.random()*3);
        let r1x = Math.floor(Math.random()*3);

    if(backbord[ry][rx] == 0 && backbord[r1y][r1x] == 0 && ry != r1y && rx != r1x){
        backbord[ry][rx] = 2;
        backbord[r1y][r1x] = 2;
        $bord.children[ry].children[rx].innerHTML = backbord[ry][rx];
        $bord.children[ry].children[rx].setAttribute("class","random");
        $bord.children[r1y].children[r1x].innerHTML = backbord[r1y][r1x];
        $bord.children[r1y].children[r1x].setAttribute("class","random");
        break;
        }
    }
    } 
    console.log(backbord);
}

// 주변에 합쳐질 숫자들이 있는지 없는지 확인하기
function overcheck(){
    let count = 0;

    for(let i = 0;i<size;i++){
        for(let j = 0;j<size;j++){
            if(backbord[i][j] == backbord[i-1][j] && i-1>=0){
                count++;
            }
            if(backbord[i][j] == backbord[i+1][j] && i+1<size){
                count++;
            }
            if(backbord[i][j] == backbord[i][j-1] && j-1>=0){
                count++;
            }
            if(backbord[i][j] == backbord[i][j+1] && j+1<size){
                count++;
            }
        }
    }

    if(count == 0){
        gameover();
    }
}


// 게임 시작하기
function gamestart(){


    //타이머 시간 체크  
    mysetInterval = setInterval(starttime,100);
    document.querySelector("#startbutton").setAttribute("disabled",true);
    starttime();
    
    
    
    // key 눌렀을때 
    window.addEventListener("keydown",(e)=>{
        console.log(e.code);
        if(e.code == "ArrowUp"){
            movekey = "ArrowUp";
            moveup();
        }else if(e.code == "ArrowDown"){
            movekey = "ArrowDown";
            movedown();
        }else if(e.code == "ArrowLeft"){
            movekey = "ArrowLeft";          
            moveleft();  
        }else if(e.code == "ArrowRight"){
            movekey = "ArrowRight";
            moveright();
            }
        })
    }


    // 위쪽 움직였을때
    function moveup(){
        console.log("위쪽으로 간다!!!!!!");
        
        setup();// 위쪽으로 값을 정렬하기
        console.log(backbord);

        addnumber();
        for(let i = 0;i<size;i++){
            for(let j = 0;j<size;j++){
                if(backbord[i][j]!=0){
                    checkother(i ,j);// 주변에 값이 있는지 확인하기
                }
            }
        }
        
        setup();
        randomnumber();
        addnumber();
        
        console.log(backbord);
        
        }
        // 위쪽으로 값을 정렬하기
        function setup(){

            let upbord = backbord;

            for(let j = 0;j<size;j++){
                let index = 0;
                for(let i = 0;i<size;i++){
                    if(upbord[i][j] !=0 && index<size){
                        let input = upbord[i][j];
                        upbord[i][j] = upbord[index][j];
                        upbord[index][j] = input;
                        index++;
                    }
                }
             }
             backbord = "";
             backbord = upbord;
        }


      // 아래쪽으로 움직였을때
      function movedown(){
          console.log("아래쪽으로 간다!!!!!!");
          
        setdown();// 아래쪽으로 값을 정렬하기
        console.log(backbord);
        addnumber();
        for(let i = size-1;i>=0;i--){
            for(let j = size-1;j>=0;j--){
                if(backbord[i][j]!=0){
                    checkother(i ,j);// 주변에 값이 있는지 확인하기
                }
            }
        }

        addnumber();

        setdown();// 아래쪽으로 값을 정렬하기

        addnumber();

        randomnumber();
        console.log(backbord);
        
        }
        // 아래쪽으로 값을 정렬하기
        function setdown(){
            let downbord=backbord;
            for(let j = 0;j<size;j++){
            let index = size-1;
            for(let i = size-1;i>=0;i--){
                if(downbord[i][j] !=0 && index>-1){
                    let input = downbord[i][j];
                    downbord[i][j] = downbord[index][j];
                    downbord[index][j] = input;
                    index--;
                    console.log(index);
                }
            }
         }
         backbord = "";
         backbord = downbord;
        }

       // 왼쪽 움직였을때
       function moveleft(){
        console.log("왼쪽 간다!!!!!!");
        
        setleft();// 왼쪽으로 값을 정렬하기
        console.log(backbord);
        addnumber();
        for(let i = 0;i<size;i++){
            for(let j = 0;j<size;j++){
                if(backbord[i][j]!=0){
                    checkother(i ,j);// 주변에 값이 있는지 확인하기
                }
            }
        }

        addnumber();

        setleft();

        addnumber();

        randomnumber();
        console.log(backbord);
        
        }
        // 왼쪽으로 값을 정렬하기
        function setleft(){
            let leftbord = backbord;
            for(let i = 0;i<size;i++){
                let index = 0;
                for(let j = 0;j<size;j++){
                    if(leftbord[i][j]!=0){
                        let input = leftbord[i][j];
                        leftbord[i][j] = leftbord[i][index];
                        leftbord[i][index] = input;
                        index++;
                    }
                }
            }
            backbord = "";
            backbord = leftbord;
    }


   // 오른쪽 움직였을때
   function moveright(){
    console.log("오른쪽 간다!!!!!!");
    
    setright();// 오른쪽 값을 정렬하기

    console.log(backbord);

    addnumber();
    for(let i = 0;i<size;i++){
        for(let j = size-1;j>=0;j--){
            if(backbord[i][j]!=0){
                checkother(i ,j);// 주변에 값이 있는지 확인하기
            }
        }
    }
    
    setright();
    addnumber();
    
    randomnumber();

    console.log(backbord);
    }
    // 오른쪽 값을 정렬하기
    function setright(){

        let rigthbord = backbord;
        for(let i = 0;i<size;i++){
            let index = size-1;
            for(let j = size-1;j>=0;j--){
                if(rigthbord[i][j]!=0 && index>-1){
                    let input = rigthbord[i][j];
                    rigthbord[i][j] = rigthbord[i][index];
                    rigthbord[i][index] = input;
                    index--;
                }
            }
        }
        backbord = "";
        backbord = rigthbord;
    }


    // 주변에 값이 있는지 확인하기
    function checkother(tempy,tempx){
        
        if(movekey == "ArrowRight"){
        if((tempx-1)>=0){
        if(backbord[tempy][tempx] == backbord[tempy][(tempx-1)]){
            console.log("tempy: "+tempy+" tempx: "+tempx);
            console.log("tempy: "+tempy+" (tempx-1): "+(tempx-1));
            backbord[tempy][tempx]+=backbord[tempy][(tempx-1)];
            backbord[tempy][(tempx-1)] = 0;
        }
        console.log(backbord);
     }
    }else if(movekey == "ArrowLeft"){
        if((tempx+1)<size){
            if(backbord[tempy][tempx] == backbord[tempy][(tempx+1)]){
                console.log("tempy: "+tempy+" tempx: "+tempx);
                console.log("tempy: "+tempy+" (tempx+1): "+(tempx+1));
                backbord[tempy][tempx]+=backbord[tempy][(tempx+1)];
                backbord[tempy][(tempx+1)] = 0;
            }
            console.log(backbord);
        }
    }else if(movekey=="ArrowUp"){
        if((tempy+1)<size){
            if(backbord[tempy][tempx] == backbord[(tempy+1)][tempx]){
                console.log("tempy: "+tempy+" tempx: "+tempx);
                console.log("tempy+1: "+(tempy+1)+" tempx: "+tempx);
                backbord[tempy][tempx]+=backbord[(tempy+1)][tempx];
                backbord[(tempy+1)][tempx] = 0;
            }
            console.log(backbord);
        }
    }else if(movekey == "ArrowDown"){
        if((tempy-1)>=0){
            if(backbord[tempy][tempx] == backbord[(tempy-1)][tempx]){
                console.log("tempy: "+tempy+" tempx: "+tempx);
                console.log("(tempy-1): "+(tempy-1)+" tempx: "+tempx);
                backbord[tempy][tempx]+=backbord[(tempy-1)][tempx];
                backbord[(tempy-1)][tempx] = 0;
            }
            console.log(backbord);
        }
    }

}


//보드판에 숫자 넣어주기
function addnumber(){

    // 같은 숫자들 있는지 확인하기

    for(let i = 0;i<size;i++){
        for(let j = 0;j<size;j++){
             $bord.children[i].children[j].innerHTML = " ";
             $bord.children[i].children[j].setAttribute("class","");
        }
    }

    // 해당 숫자에 색깔 채워주기
    let check = false;
    for(let i = 0;i<size;i++){
        for(let j = 0;j<size;j++){
            if(backbord[i][j]!=0){
                if(backbord[i][j] == 2){
                    $bord.children[i].children[j].innerHTML = backbord[i][j];
                    $bord.children[i].children[j].setAttribute("class","random2");
                }else if(backbord[i][j] == 4){
                    $bord.children[i].children[j].innerHTML = backbord[i][j];
                    $bord.children[i].children[j].setAttribute("class","random4");
                }else if(backbord[i][j] == 8){
                    $bord.children[i].children[j].innerHTML = backbord[i][j];
                    $bord.children[i].children[j].setAttribute("class","random8");
                }else if(backbord[i][j] == 16){
                    $bord.children[i].children[j].innerHTML = backbord[i][j];
                    $bord.children[i].children[j].setAttribute("class","random16");
                }else if(backbord[i][j] == 32){
                    $bord.children[i].children[j].innerHTML = backbord[i][j];
                    $bord.children[i].children[j].setAttribute("class","random32");
                }else if(backbord[i][j] == 64){
                    $bord.children[i].children[j].innerHTML = backbord[i][j];
                    $bord.children[i].children[j].setAttribute("class","random64");
                }else if(backbord[i][j] == 128){
                    $bord.children[i].children[j].innerHTML = backbord[i][j];
                    $bord.children[i].children[j].setAttribute("class","random128");
                }else if(backbord[i][j] == 256){
                    $bord.children[i].children[j].innerHTML = backbord[i][j];
                    $bord.children[i].children[j].setAttribute("class","random256");
                }else if(backbord[i][j] == 512){
                    $bord.children[i].children[j].innerHTML = backbord[i][j];
                    $bord.children[i].children[j].setAttribute("class","random512");
                }else if(backbord[i][j] == 1024){
                    $bord.children[i].children[j].innerHTML = backbord[i][j];
                    $bord.children[i].children[j].setAttribute("class","random1024");
                }else if(backbord[i][j] == 2048){
                    $bord.children[i].children[j].innerHTML = backbord[i][j];
                    $bord.children[i].children[j].setAttribute("class","random2048");
                    gameover();//2048 나오면 게임 끝
                }
            }
        }
    }



}

// 게임 끝났을때
function gameover(){
    gameover = true;
    document.querySelector("#restartbutton").style.display="block";
    for(let i = 0;i<size;i++){
        for(let j = 0;j<size;j++){
            backbord[i][j].children[i].children[j].setAttribute("disabled",true);
        }
    }

}


// 타이머 시간 체크
function starttime(){
    if(gameover == true){
        clearInterval(mysetInterval);
    }
    let $clock = document.querySelector("#time");
        // 시간을 정하면서 시 ,분 ,초
        // time=[시,분,초] 과정으로 출력되어야 하므로 범위를 다시 설정했다.
        for(let i = time.length;i>0;i--){
            time[2] = min;
            if(time[i]==60){
            time[i-1]+=1;
            time[i] = 0;
            min = 0;
            }
        }
        
     min++;
    // console.log(time);
     let temp = "";
     for(let i = 0;i<time.length;i++){
        if(time[i]<10){
            temp+="0"+time[i];
        }else{
            temp+=time[i];
        }
        temp+=":";
    } 
    $clock.innerHTML = temp.substring(0,temp.length-1);
    
}

function restart(){
    location.href="2048.html";
}


//보드판 만들기
makebord();


