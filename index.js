let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let aiBtn = document.querySelector('#playAI');
let turno = true;
let isAI = false;

const winpatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let [a, b, c] = pattern;
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 && val1 === val2 && val2 === val3) {
            setTimeout(() => {
                alert(`${val1} wins the game`);
                disableBoxes();
            }, 100);
            return true;
        }
    }

    // Check for draw
    if ([...boxes].every(box => box.innerText !== "")) {
        setTimeout(() => {
            alert("It's a tie!");
        }, 100);
        return true;
    }

    return false;
};

const aiMove = () => {
    let available = [...boxes].filter(box => box.innerText === "");
    if (available.length === 0) return;

    let randomBox = available[Math.floor(Math.random() * available.length)];
    randomBox.innerText = 'X';
    randomBox.disabled = true;
    turno = true;
    checkWinner();
};

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;

        if (turno) {
            box.innerText = 'O';
            box.disabled = true;
            turno = false;
            if (!checkWinner() && isAI) {
                setTimeout(aiMove, 300);
            }
        }
    });
});

resetBtn.addEventListener('click', () => {
    turno = true;
    isAI = false;
    enableBoxes();
});

aiBtn.addEventListener('click', () => {
    turno = true;
    isAI = true;
    enableBoxes();
});
