function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
      
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

function clickablePaths() {
    let paths = document.querySelectorAll("path");
    let pathName = [];

    paths.forEach(path => {
        pathName.push(path.getAttribute("name"));
    });

    return pathName;
}


function endOfGame() {
    
    let element_score = document.createElement("div");
    let element_timer = document.createElement("div");
    element_score.className = "label_score_time";
    element_timer.className = "label_score_time";
    element_score.innerText = document.getElementById("score").innerText;
    element_timer.innerText = document.getElementById("timer").innerText;
    document.getElementById("label_score").append(element_score);
    document.getElementById("label_timer").append(element_timer);
    myPopup.classList.add("show");
    clearInterval(timer);
};

function restart() {
    tr = 0;
    index = 0;
    clearInterval(timer);
    randomStates = shuffle(states);
    document.getElementById("RandomState").innerText = randomStates[index];
    $("path").removeClass("FirstTry SecondTry ThirdTry Fail blinking");
    document.getElementById("timer").innerText = "0:00";
    seconds = 0;
    timer = setInterval(upTimer, 1000);
    document.getElementById("score").innerText = "0%";

};
function upTimer() {
    ++seconds;
    var minute = Math.floor((seconds) / 60);
    var updSecond = seconds - (minute * 60);
    document.getElementById("timer").innerText = minute + ":" + updSecond;
};

document.getElementById("closePopup").addEventListener("click", () => {
    $(".label_score_time").remove();
});


document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(timer);
    } else {
        timer = setInterval(upTimer, 1000);
    }
});

let tr = 0;
let index = 0;
let seconds = 0;
let timer;
const states = clickablePaths();
let randomStates = shuffle(states);
document.getElementById("RandomState").innerText = randomStates[index];  

$(document).ready(() => {
    timer = setInterval(upTimer, 1000);

    $("path").click( function() {
        console.log(tr);
        if (randomStates[index] == ($(this).attr('name'))) {
            switch (tr) {
                case 0:
                    $(this).addClass("FirstTry");
                    document.getElementById("score").innerText = Math.floor((document.getElementsByClassName("FirstTry").length / states.length) * 100) + "%";
                    break;
                case 1:
                    $(this).addClass("SecondTry");
                    tr = 0;
                    break;
                case 2:
                    $(this).addClass("ThirdTry");
                    tr = 0;
                    break;
                case 3:
                    $(this).removeClass("blinking");
                    tr = 0;
                    break;
            }
            index++;
            if (index == states.length) {
                endOfGame();
            }
            else {
                document.getElementById("RandomState").innerText = randomStates[index]; 
            }
        }
        else {
            if (tr == 2) {
                let right = document.getElementsByName(randomStates[index]);
                $(right).addClass("Fail");
                $(right).addClass("blinking");
                tr++;
            } else if (tr < 2) {
                tr++;
            }

        }

    });


});







