let size = 3;
    let bordlist = [];
    let $tablelist = [];
    let check = false;
    let win = 0;
    
    // 보드판 표
    function init(){
        //보드판 표 만들기
        let $divtable = document.querySelector("#table");
        let $table = document.createElement("table");

        for(let i = 0;i<size;i++){
            let $tr = document.createElement("tr");
            let temp = [];
            let $temp=[];
            for(let j = 0;j<size;j++){
            let $td = document.createElement("td");
            $td.addEventListener("click",makeplayer); // player가 o,x 표시하도록 설정
            $temp.push($td);
            $tr.append($td);
            temp.push(0);
            }
            $table.append($tr);
            $tablelist.push($temp);
            bordlist.push(temp);
        }
        $divtable.append($table);

        console.log(bordlist);
        console.log($tablelist);

    }
    // 하단 게임결과 & 리셋버튼 만들기
    function gameresult(text){
        let $result = document.querySelector("#result");
        let $button = document.createElement("button");
        let $span = document.createElement("div");
        $span.setAttribute("id","text");
        $span.innerText = text;
        $button.innerText="restart";
        $button.addEventListener("click",onloadevent); // 리셋버튼 누르고 온로드 시키기
        $result.append($button);
        $result.append($span);

    }
    function onloadevent(){
        location.href="tictactoe_main.html";
    }

    // player가 o,x 표시하도록 설정
    function makeplayer(){
            let $player = document.querySelectorAll(".player");
        for(let i = 0;i<size;i++){
            for(let j = 0;j<size;j++){
                if($tablelist[i][j] == this && this.innerText==""){
                    if(check == false){
                        $tablelist[i][j].innerText="O";
                        $tablelist[i][j].style.backgroundColor="lightgreen";
                        $player[0].style.backgroundColor ="lightgray";
                        $player[1].style.backgroundColor ="lightcoral";
                        bordlist[i][j] = 1;
                    }else{
                        $tablelist[i][j].innerText="X";
                        $tablelist[i][j].style.backgroundColor="lightblue";
                        $player[0].style.backgroundColor ="lightcoral";
                        $player[1].style.backgroundColor ="lightgray";
                        bordlist[i][j] = 2;
                    }
                    check =! check;
                }
            }
        }

        // 게임 끝 점수 결과 확인하기 & 이벤트 제거
       let scoreresult = checkwinner();
       let $resulttext = document.querySelector("#resulttext");
       if(scoreresult == 1 || scoreresult == 2 || scoreresult == 3){
             removeEvent();
            if(scoreresult == 1){
                let winner = " O를 선택한 player가 이겼습니다.";
                gameresult(winner); 
            }else if(scoreresult == 2){
                let winner =" X를 선택한 player가 이겼습니다.";
                gameresult(winner); 
            }
            else if(scoreresult == 3){
                let winner ="무승부 입니다.";
                gameresult(winner);     
            }
       }

    }
    // 게임 끝나고 이벤트 없애기
    function removeEvent(){
        for(let i = 0;i<size;i++){
            for(let j = 0;j<size;j++){
                $tablelist[i][j].removeEventListener("click",makeplayer);
            }
        }
    }

    // 이기는 조건 체크하기
    function checkwinner(){

        // 가로세로체크
        for(let i = 0;i<size;i++){
                if(bordlist[0][i] == 1 && bordlist[1][i] == 1 && bordlist[2][i] == 1){
                    win = 1;
                }
                if(bordlist[0][i] == 2 && bordlist[1][i] == 2 && bordlist[2][i] == 2){
                    win = 2;
                }
                if(bordlist[i][0] == 2 && bordlist[i][1] == 2 && bordlist[i][2] == 2){
                    win = 2;
                }
                if(bordlist[i][0] == 1 && bordlist[i][1] == 1 && bordlist[i][2] == 1){
                    win = 1;
                }
        }

        // 대각선 체크
        if(bordlist[0][0] == 1 && bordlist[1][1] == 1 && bordlist[2][2] == 1){
            win = 1;
        }
        if(bordlist[0][0] == 2 && bordlist[1][1] == 2 && bordlist[2][2] == 2){
            win = 2;
        }
        if(bordlist[0][2] == 1 && bordlist[1][1] == 1 && bordlist[2][0] == 1){
            win = 1;
        }
        if(bordlist[0][2] == 2 && bordlist[1][1] == 2 && bordlist[2][0] == 2){
            win = 2;
        }

        // 무승부
        let count = size*size;
        for(let i = 0;i<size;i++){
            for(let j = 0;j<size;j++){
                if(bordlist[i][j] == 0){
                    count++;
                }
            }
        }
        if(count == size*size){
            win = 3;
        }

        console.log(count);
        return win;

    }

    // 함수 불러서 시작하기!
    init();