// 보드판 설정 변수
let fronttable=[];
let backtable=[];
let $tdtable=[];
let size = 5;

// 게임 클릭해야하는 수 & 힌트
let checknumber = 1;

//시계 변수
let num = 1;
let min = 0;
let time=[0,0,0];
let timeevent = "";
let id = null;

// 보드판 만들기
function makebord(){
    let $divtable = document.querySelector("#table");
    let $table = document.createElement("table");
    let num = 1;
    for(let i = 0;i<size;i++){
            let $tr = document.createElement("tr");
            let fronttemp = [];
            let backtemp=[];
            let $temp=[];
        for(let j = 0;j<size;j++){
            let $td = document.createElement("td");
            $tr.append($td);
            fronttemp.push(num);
            backtemp.push(num+25);
            $temp.push($td);
            num++;
        }
        $tdtable.push($temp);
        $table.append($tr);
        fronttable.push(fronttemp);
        backtable.push(backtemp);
    }
    $divtable.append($table);
}


// 보드판 섞기
function shakebord(){
    
    for(let i = 0;i<size;i++){
        for(let j = 0;j<size;j++){
            let ri = Math.floor(Math.random()*size);
            let rj = Math.floor(Math.random()*size);
            let temp = fronttable[i][j];
            let temp2 = backtable[i][j];
            fronttable[i][j] = fronttable[ri][rj];
            backtable[i][j] = backtable[ri][rj];
            fronttable[ri][rj] = temp;
            backtable[ri][rj] = temp2;
        }
    }
    
}
// 시작하면 보드판 숫자 보여주기
function showbord(){
    // 보드판 보여주고 게임 시작하기
    gamestart();
    for(let i = 0;i<size;i++){
        for(let j = 0;j<size;j++){
            $tdtable[i][j].innerHTML = fronttable[i][j];
            $tdtable[i][j].style.backgroundColor = "lightblue"
            $tdtable[i][j].addEventListener("click",gamestart); // td 클릭하면 이벤트 발생
        }
    }
}

// 힌트 확인하기
function hintcheck(){
    for(let i = 0;i<size;i++){
        for(let j = 0;j<size;j++){
            if(checknumber == $tdtable[i][j].innerHTML){
                $tdtable[i][j].style.backgroundColor="tomato";
                break;
            }
        }
    }
}


function init(){
    // 보드판 만들기
    makebord();
    // 보드판 섞기 
    shakebord();
     
}

 // 게임시작 : 카운트 시작 & 숫자 시작 & td 클릭하면 이벤트 발생
function gamestart(){
    document.querySelector("#startbutton").setAttribute("disabled",true)
    if(id==null){
        timeevent = setInterval(timetext,100);
    }
    let $here = this;
    if(this.innerHTML == checknumber){
        console.log(this.innerHTML);
        console.log(checknumber);
        for(let i = 0;i<size;i++){
            for(let j = 0;j<size;j++){
                if($here.innerHTML ==  $tdtable[i][j].innerHTML){
                    if(checknumber<=25){
                        $tdtable[i][j].innerHTML = backtable[i][j];
                        $tdtable[i][j].style.backgroundColor="lightblue"
                    }else{
                        $tdtable[i][j].innerHTML = "";
                        console.log("왜 안들어와"+checknumber);
                        $tdtable[i][j].style.backgroundColor="lightgray"
                    }
                }
             }
         }
         checknumber++;
        }
        id = checknumber;
        // 게임 끝내기!
        if(checknumber> 50){
            gameover();
         }
}

function gameover(){
    for(let i = 0;i<size;i++){
        for(let j = 0;j<size;j++){
            $tdtable[i][j].removeEventListener("click",gamestart);
            $tdtable[i][j].style.cursor="none";
        }
    }
    clearInterval(timeevent);
    let $div = document.querySelector("#restart");
    let $button = document.createElement("button");
    $button.setAttribute("id","restartbutton");
    $button.innerHTML = "restart"
    $button.addEventListener("click",restart); // 게임 끝 재시작
    $div.append($button);
}
// 게임 끝 재시작
function restart(){
    location.href="1to50_main.html";
}

// 초시계 시작  -- 버튼을 누를수록 초시계 시간이 점점 빨라지는 버그
// 조건을 id값으로 설정했는데 어디에서 null조건을 걸어줘야 하는지 헷갈렸는데
// 이벤트가 실행되는 곳에 조건을 설정했더니 이벤트가 반영되었다. 
function timetext(){
   
        let $clock = document.querySelector("#clock");
    
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
   // console.log(temp);
    $clock.innerHTML = temp.substring(0,temp.length-1);

}



//------------------------ 
function main(){
 init();
}