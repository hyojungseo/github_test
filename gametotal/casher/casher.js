let ticket = 2200;
let number = 0;
let userticket = 0;
let adminmticket = 0;
let $admincount = [0,0,0,0,0,0];
let $usercount = [0,0,0,0,0,0];
let moneyList = [50000,10000,5000,1000,500,100];
let num = 5;
let time = "";
let total = 0;
// [관리자] 식권 + 버튼 눌렀을때
function adminplus(data){
    let index = 0;
    let $plusList = document.querySelectorAll(".adminplus");
    let $number = document.querySelectorAll(".adminnumber");
    console.log(data);
    for(let i = 0;i<$plusList.length;i++){
        if(data == $plusList[i]){
            index = i;
            break;
        }
    }
    console.log("index: "+index);
    number = $number[index].innerText;
    number++;
    $number[index].innerText = number;
    $admincount[index] = number;
    if(index == 6){
        adminmticket = number;
    }
    console.log("adminmticket: "+adminmticket);
}
// [사용자] 식권 + 버튼 눌렀을때
function userplus(data){
    let index = 0;
    let $plusList = document.querySelectorAll(".userplus");
    let $number = document.querySelectorAll(".usernumber");
    console.log(data);
    for(let i = 0;i<$plusList.length;i++){
        if(data == $plusList[i]){
            index = i;
            break;
        }
    }
    console.log("index: "+index);
    number = $number[index].innerText;
    number++;
    $number[index].innerText = number;
    $usercount[index]= number;
    if(index == 6){
        userticket = number;
    }
    console.log("userticket: "+userticket);

        total = 0;
        for(let i = 0;i<moneyList.length;i++){
            total+=moneyList[i]*$usercount[i];
        }
        document.querySelector("#intomoney").innerText = "총 투입금액 "+(total)+"원 입니다.";
        

    if(userticket!=0){
        document.querySelector("#resulttext").innerText = "총 결제금액 "+(userticket*ticket)+"원 입니다.";
        document.querySelector("#resulttext").style.display = "block";
    }else{
        document.querySelector("#resulttext").style.display = "none";
        document.querySelector("#resulttext").style.display = "block";
    }
}


// [사용자] 식권 - 버튼 눌렀을때
function userminus(data){
    let index = 0;
    let $minusList = document.querySelectorAll(".userminus");
    let $number = document.querySelectorAll(".usernumber");
    console.log(data);
    for(let i = 0;i<$minusList.length;i++){
        if(data == $minusList[i]){
            index = i;
            break;
        }
    }
    console.log("index: "+index);
    number = $number[index].innerText;
    console.log("number: "+number);
    if(number<=0){
        alert("수량을 확인해 주세요.");
    }else{
        number--;
    }
    $number[index].innerText = number;
    $usercount[index]= number;
    if(index == 6){
        userticket = number;
    }
    console.log("userticket: "+userticket);

    total = 0;
        for(let i = 0;i<moneyList.length;i++){
            total+=moneyList[i]*$usercount[i];
        }
        document.querySelector("#intomoney").innerText = "총 투입금액 "+(total)+"원 입니다.";

    if(userticket!=0){
        document.querySelector("#resulttext").style.color="block";
        document.querySelector("#resulttext").innerText = "총 결제금액 "+(userticket*ticket)+"원 입니다.";
        }else{
        document.querySelector("#resulttext").style.display = "none";
        }
    
}
// [관리자] 식권 - 버튼 눌렀을때
function adminminus(data){
    let index = 0;
    let $minusList = document.querySelectorAll(".adminminus");
    let $number = document.querySelectorAll(".adminnumber");
    console.log(data);
    for(let i = 0;i<$minusList.length;i++){
        if(data == $minusList[i]){
            index = i;
            break;
        }
    }
    console.log("index: "+index);
    number = $number[index].innerText;
    
    if(number<=0){
        alert("수량을 확인해 주세요.");
    }else{
        number--;
    }
    $number[index].innerText = number;
    $admincount[index] = number;
    if(index == 6){
        adminmticket = number;
    }
}
// 구입하기 누르고 결과
function result(){
    if(userticket!=0){

        // 식권 수량까지 배열에 들어가 있어서 식권 수량은 제외하기
        //$admincount.pop();
        //$usercount.pop();
        let size = $admincount.length-1;
        // 임시로 배열 만들기
        let tempadmin = $admincount;
        let tempuser = $usercount;
        console.log("관리자: "+tempadmin);
        console.log("사용자: "+tempuser);
    
        // 얼마 지폐인지 확인하는 리스트
        let usermoney = 0;
        let adminmoney = 0;
    
        // 식권 자판기가 가지고 있는 총 금액과 사용자가 지불한 금액이 얼마인지 확인
        for(let i = 0;i<size;i++){
            usermoney+=moneyList[i]*$usercount[i];
            adminmoney+=moneyList[i]*$admincount[i];
        }
    
        // 관리자 돈
         console.log("관리자 돈:"+adminmoney);
        // 사용자돈
         console.log("사용자돈: "+usermoney);
    
        // 거스름돈 얼마인지 확인하기
        let charge = total-(userticket*ticket);
        let tempcharge = charge;
        console.log("charge: "+charge);
        console.log("adminmoney: "+adminmoney+ " charge: "+charge);
        
        // 식권자판기의 식권이 없을때
        if(adminmticket<=0){
            document.querySelector("#resulttext").innerText = "식권이 부족하여 관리자에게 문의하세요.";
            charge = 0;
        }
        // 식권 자판기의 거스름돈이 부족하면 안내문구
        else if(adminmoney<tempcharge){
            document.querySelector("#resulttext").innerText = "거스름돈이 부족합니다. 관리자에게 문의하세요.";
            document.querySelector("#resulttext").style.color ="red";
            charge = 0;
    
            // 사용자가 지불한 금액이 적으면 안내문구
        }else if(usermoney<userticket*ticket){
            document.querySelector("#resulttext").innerText = "투입한 금액이 부족합니다.";
            document.querySelector("#resulttext").style.color ="red";
            charge = 0;
        }else{
    
            for(let i = 0;i<size;){
                if(tempcharge>=moneyList[i] && tempadmin[i]>0){
                    tempcharge-=moneyList[i];
                    tempadmin[i]-=1;
                }else{
                    i++;
                }
            }
            // 거스름돈이 지불 가능하면 바로 적용시키기
            console.log("tempcharge: "+tempcharge);
            if(tempcharge == 0){
                for(let i = 0;i<size;i++){
                    tempadmin[i]+=tempuser[i];
                    tempuser[i] = 0;
                }
    
                // 식권수량 판매된 만큼 빼기
                adminmticket-=userticket;
                console.log("adminmticket: "+adminmticket);
               // 임시 배열 원래 배열에 다시 저장시키기
               $admincount=[0,0,0,0,0,0];
               for(let i = 0;i<size;i++){
                    $admincount[i] = tempadmin[i];
                    $usercount[i] = tempuser[i];
               }
               $admincount[size] = adminmticket;
               console.log($admincount);
               console.log($usercount);
               document.querySelector("#resulttext").innerText = "거스름돈은"+charge+"원 입니다." +5+"초후에 처음 화면으로 돌아갑니다.";
                time = setInterval(timeover,1000);// 사용자 화면을 처음으로 되돌리기
            }else{
                document.querySelector("#resulttext").innerText = "거스름돈이 부족합니다. 관리자에게 문의하세요.";
                document.querySelector("#resulttext").style.color="red";
                charge = 0;
            }
        }
    }

}

// 사용자 화면을 처음으로 되돌리기
function timeover(){
    document.querySelector("#resulttext").innerText = "결제가 완료 되었습니다. "+num+"초후에 처음 화면으로 돌아갑니다.";
    num--;
    let $usermoneylist = document.querySelectorAll(".usernumber");
    let $adminmoneylist = document.querySelectorAll(".adminnumber");
    // 사용자의 식권자판기는 다시 리셋시키기
    if(num==0){
        for(let i = 0;i<$usermoneylist.length;i++){
            $usermoneylist[i].innerText = 0;
            $adminmoneylist[i].innerText = $admincount[i];
        }
        
        document.querySelector("#resulttext").innerText = "";
        document.querySelector("#intomoney").innerText = "";
        stoptime();
    }
}

function stoptime(){
    num = 5;
    clearInterval(time);
}