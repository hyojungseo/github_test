
let $horseList = document.querySelectorAll(".horse")
let $horsetable = "";
let size = 40;
let horsecount = 5;
let myInterval = "";
let time = 0;
let horsecolor=['red','orange','yellow','green','blue'];
let horsemove=[0,0,0,0,0];
let gameover = false;
let rank = [0,0,0,0,0];
let checkindex=-1;
let first = 0;
let rankcount = 0;
let timeresult=[0,0,0,0,0];

// 말 선택할때
function choice(data){
    console.log(data);
        for(let i = 0;i<$horseList.length;i++){
        if(data != $horseList[i]){
            $horseList[i].checked = false;
        }else{
            checkindex = i;
        }
    }

}

// 선택완료 버튼 클릭시
function choiceover(data){

    for(let i = 0;i<$horseList.length;i++){
        $horseList[i].setAttribute("disabled",true);
    }
    data.setAttribute("disabled",true);
    
    if(checkindex != -1){
        myInterval = setInterval(gamestart,100);
    }
}

function gamestart(){
    $horsetable = document.querySelector("#horsetable");

    // 시간설정
    console.log("time: "+time);
    if(gameover == true){
        clearInterval(myInterval);
        gameresult();
    }

        // 랜덤으로 말들이 움직이는 숫자 정하기
    let random = [0,0,0,0,0];
    for(let i = 0;i<horsecount;i++){
        let r = Math.floor(Math.random()*3);
        random[i] = r;
    }
    
    // 말들이 움직이는 색깔 정해주기
   
        let score = 0;
        for(let i = 0;i<horsecount;i++){
            console.log("i: "+i+" horsemove[i]: "+horsemove[i]);
            
            if(horsemove[i]+random[i]>=39){
                score++;
                timeresult[i] += time;
                console.log(timeresult);
                $horsetable.children[i].children[horsemove[i]].style.backgroundColor = "";
                horsemove[i] = 39;
                $horsetable.children[i].children[39].style.backgroundColor = horsecolor[i];
            }else{
                $horsetable.children[i].children[horsemove[i]].style.backgroundColor = "";
                horsemove[i]+=random[i];
                $horsetable.children[i].children[horsemove[i]].style.backgroundColor = horsecolor[i];
            }
        }
    
        if(score == horsecount){
            gameover = true;
        }
    time++;
    console.log("horsemove:"+horsemove);
}

// 게임 끝 결과
function gameresult(){
    console.log("게임 끝")
    
    $result = document.querySelector("#result");
    $result.style.display = "block";
    $score = document.querySelectorAll(".score");
    
    // 랭킹 확인하기
    for(let i = 0;i<horsecount;i++){
        let count = 1;
        for(let j = 0;j<horsecount;j++){
            if(timeresult[i]<timeresult[j]){
                count++;
            }
        }
        rank[i] = count;
    }

    let $resultname = document.querySelectorAll(".resultname");
    // 1등이면 배경색 바꿔주기
    
    for(let i = 0;i<horsecount;i++){
        $score[i].innerHTML = rank[i]+"등";
        if(rank[i] == 1){
            first = i;
            $score[i].style.backgroundColor= "yellow";
            $resultname[i].style.backgroundColor= "yellow";
        }
    }
    
    
    // 선택한 결과와 1등이 맞으면 정답
    if(checkindex == first){
        document.querySelector("#resultmessage").innerHTML = "정답입니다."
    }else{
        document.querySelector("#resultmessage").innerHTML = "정답이 아닙니다."
    }
    
}

//경주마 이동판 만들기
function makebord(){
    let $horsetable = document.querySelector("#horsetable");

    for(let i = 0;i<5;i++){
            let $tr = document.createElement("tr");
        for(let j = 0;j<size;j++){
            let $td = document.createElement("td");
            $tr.append($td);
        }
        $horsetable.append($tr);
    }
   
    for(let i = 0;i<horsecount;i++){
        $horsetable.children[i].children[0].innerHTML = i+1;
        $horsetable.children[i].children[0].style.textAlign ="center";
        $horsetable.children[i].children[0].style.backgroundColor=horsecolor[i];
    }

}

function restart(){
    location.href='Horse race.html';
}

//경주마 이동판 만들기
makebord();