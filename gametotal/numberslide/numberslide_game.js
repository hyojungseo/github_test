let backbord = [];
let $frontbord = [];
let front = [];
let size = 4;
let count = 0;
let $restart = document.querySelector("#gameover");
let $hint = [];
let answer = [0, 0];

function init() {
    // 보드판 만들기
    bord();
    // 보드판 섞기
    shakebord();
    // 안에 글자 넣기
    textin();
    // 정답판 만들기
    showresult();

}

// 정답판 만들기
function showresult(){
    let $table = document.querySelector("#showResult");
    for (let i = 0; i < size; i++) {
        let $tr = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            let $td = document.createElement("td");
            if(backbord[i][j]!=0){
                $td.innerText = backbord[i][j];
            }
            $td.style.backgroundColor = "lightpink"
            
            $td.style.color = "black"
            $tr.append($td);
        }
        $table.append($tr);
    }
}


// 보드판 만들기
function bord() {
    let $table = document.querySelector("#mainbord");
   
    let num = 1;

    for (let i = 0; i < size; i++) {
        let temp = [];
        let $temp = [];
        let $tr = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            let $td = document.createElement("td");
            $tr.append($td);
            $temp.push($td);
            temp.push(num);
            num++;
        }
        $table.append($tr);
        front.push(temp);
        $frontbord.push($temp);
    }
    front[3][3] = 0;

    let what = 1;
    for (let i = 0; i < size; i++) {
        let temp1 = [];
        for (let j = 0; j < size; j++) {

            temp1.push(what);
            what++;
        }
        backbord.push(temp1);
    }

    backbord[3][3] = 0;
    console.log(backbord);
}

// 보드판 섞기
function shakebord() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let r = Math.floor(Math.random() * size);
            let r1 = Math.floor(Math.random() * size);
            let input = front[i][j];
            front[i][j] = front[r][r1];
            front[r][r1] = input;
        }
    }

}

// 안에 글자 넣기
function textin() {

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (front[i][j] == 0) {
                $frontbord[i][j].innerText = "";

            } else {
                $frontbord[i][j].innerText = front[i][j];
                $frontbord[i][j].style.backgroundColor="lightblue";
            }
            $frontbord[i][j].addEventListener("click", movenumber); // 누르면 숫자 옮기기
        }
    }
    console.log($frontbord);
}

// 누르면 숫자 움직이기
function movenumber() {
    let number = this.innerText;
    console.log(number);

    let x = -1;
    let y = -1;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (this.innerHTML == $frontbord[i][j].innerHTML) {
                x = i;
                y = j;
                break;
            }
        }
    }

    // 상
    if (0 <= x - 1 &&  $frontbord[x- 1][y].innerText == "") {
        $frontbord[x- 1][y].innerText=number;
        $frontbord[x- 1][y].style.backgroundColor="lightblue";
        this.innerText="";
        this.style.backgroundColor="";
    }else
    // 하
    if (x + 1 < size && $frontbord[x+ 1][y].innerText=="") {
        $frontbord[x+ 1][y].innerText=number;
        $frontbord[x+ 1][y].style.backgroundColor="lightblue";
        this.innerText="";
        this.style.backgroundColor="";
    }else
    // 좌
    if ( y + 1 < size && $frontbord[x][y+1].innerText=="") {
        $frontbord[x][y+1].innerText=number;
        $frontbord[x][y+1].style.backgroundColor="lightblue";
        this.innerText="";
        this.style.backgroundColor="";
    }else
    // 우
    if (0 <= y - 1 && $frontbord[x][y-1].innerText=="") {
        $frontbord[x][y-1].innerText=number;
        $frontbord[x][y-1].style.backgroundColor="lightblue";
        this.innerText="";
        this.style.backgroundColor="";
    }



    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if ($frontbord[i][j].innerText != "") {
                front[i][j] = $frontbord[i][j].innerText;
            } else {
                front[i][j] = 0;
            }
        }
    }
    // 전체가 맞았는지 확인하기
    wincheck();
}


// 전체가 맞았는지 확인하기
function wincheck() {

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (backbord[i][j] == $frontbord[i][j].innerText) {
                count++;
            } else {
                count = 0;
            }
        }
    }
    console.log("count: " + count);
    //전부 맞으면 restart 버튼
    if (count == size * size) {
        $restart.style.display = "block";
        $restart.addEventListener("click", removeAll);  // 모든 내용 다시 시작하기


        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                $frontbord[i][j].removeEventListener("click", movenumber);
            }
        }
    } else {
        count = 0;
    }
}

//restart
function removeAll() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            $frontbord[i][j].innerHTML = "";
        }
    }
    count = 0;
    $restart.style.display = "none";
    shakebord();
    textin();
}