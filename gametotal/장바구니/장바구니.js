let things=[0,0,0];
let price = ["20000","15000","13000"];


function changecheck(click){
    let $checkbox = document.querySelectorAll(".checkbox");

    let index = -1;
    for(let i = 0;i<$checkbox.length;i++){
        if($checkbox[i] == click){
            index = i;
        }
    }

    console.log("index: "+index);
    console.log(click);
    if(index == 0){
        for(let i = 0;i<$checkbox.length;i++){
            if($checkbox[index].checked == false){
                $checkbox[i].checked = false;
                document.querySelector("#checknumber").innerHTML="전체선택(0/3)";
            }else{
                $checkbox[i].checked = true;
                document.querySelector("#checknumber").innerHTML="전체선택(3/3)";
            }
        }
    }else{
        let count = 0;
        for(let i = 1;i<$checkbox.length;i++){
            if($checkbox[i].checked == true){
                count++;
            }
        }
        document.querySelector("#checknumber").innerHTML="전체선택("+count+"/3)";
        if(count == 3){
            for(let i = 0;i<$checkbox.length;i++){
                    $checkbox[i].checked = true;
            }
        }else if(count == 0){
            for(let i = 0;i<$checkbox.length;i++){
                $checkbox[i].checked = false;
            }
        }else{
            $checkbox[0].checked = false;
        }
    }

}


function backminus(click){ // 사진 하단 화면에서 물건 선택했을때
    let $numbercheck = document.querySelectorAll(".numbercheck");
    let $number = document.querySelectorAll(".backnumber");
    let $numberminus = document.querySelectorAll(".numberminus");
    let $backminus = document.querySelectorAll(".backminus");
    let $dollar = document.querySelectorAll(".dollar");


    console.log(click);
    for(let i = 0;i<$number.length;i++){
        if($backminus[i] == click || $numberminus[i] == click){
            if(things[i]>0){
                things[i]-=1;
                $number[i].innerHTML = things[i];
                $numbercheck[i].innerHTML = things[i];
                $dollar[i].innerHTML = ((things[i]*price[i])+"원");
                break;
            }
        }
    }
}

function backpluse(click){// 사진 하단 화면에서 물건 선택했을때
    let $number = document.querySelectorAll(".backnumber");
    let $backminus = document.querySelectorAll(".backpluse");
    let $numbercheck = document.querySelectorAll(".numbercheck");
    let $numberpluse = document.querySelectorAll(".numberpluse");
    let $dollar = document.querySelectorAll(".dollar");

    for(let i = 0;i<$number.length;i++){
        if($backminus[i] == click || $numberpluse[i] == click){
            if(things[i]<5){
                things[i]+=1;
                $number[i].innerHTML = things[i];
                $numbercheck[i].innerHTML = things[i];
                $dollar[i].innerHTML = ((things[i]*price[i])+"원");
                break;
            }else{
                alert("5개 이하로 주문해 주세요.")
            }
        }
    }
}

function insertbag(click){
    console.log(click);
    let $mybagList = document.querySelectorAll(".mybagList");//장바구니 담기 버튼
    let $numbercheck = document.querySelectorAll(".numbercheck");
    let $backnumber = document.querySelectorAll(".backnumber");
    let check = -1;
    console.log(click);
    for(let i = 0;i<$mybagList.length;i++){
        if($mybagList[i] == click){
            check = i;
        }
    }
    console.log("check: "+check);
    if(things[check] == 0){
        alert("물품의 수량을 1개 이상 선택해 주세요.")
    }else{
        document.querySelector("#cartlist").style.display = "block";
    }
}

function menudeletAll(){
    let $baglist = document.querySelectorAll(".baglist");
    
    for(let i = 0;i<$baglist.length;i++){
        $baglist[i].remove();
    }
}

function menudelet(click){
    console.log("click:"+click)
    let $delet = document.querySelectorAll(".delet");
    let $baglist = document.querySelectorAll(".baglist");
    let index = -1;
    for(let i = 0;i<$delet.length;i++){
        if(click==$delet[i]){
            index = i;
        }
    }
    console.log("index:"+index)
    if(index!=-1){
        $baglist[index].remove
    }
    
}