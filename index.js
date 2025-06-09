let boxes=document.querySelectorAll('.box')
let resetbtn = document.querySelector('#reset')
let turno=true;

const winpatterns=[
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]
]

const disableboxes=()=>{
    for (let box of boxes){
        box.disabled=true
    }
}
const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false
        box.innerText=""
    }
}
boxes.forEach(box => {
    box.addEventListener("click",()=>{
        if (turno==true){
            box.innerText='O'
            turno=false
        }
        else{
            box.innerText='X'
            turno=true
        }
        box.disabled=true;
        checkwinner()
    })
});

const checkwinner=()=>{
    for (let pattern of winpatterns){
        let pos1=boxes[pattern[0]].innerText
        let pos2=boxes[pattern[1]].innerText
        let pos3=boxes[pattern[2]].innerText

        if(pos1!="" &&pos2!="" &&pos3!=""){
            if(pos1==pos2 &&pos2==pos3){
                b=pos1 + " wins the game"
                alert(b)
                disableboxes()
            }
        }
    }}

const resetgame=()=>{
    turno=true;
    enableboxes()

}
