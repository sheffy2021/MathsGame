let playing = false;
let score;
let countdown;
let timeLeft;
let correctAnswer;
let correctPosition;
let highestScore;


// -----------a click on start button----------

document.getElementById("start-reset").onclick= function(){
    if(playing == true){
        //reload game
        location.reload()
    }else{
        playing = true
        display("congratulations","none");
        display("game-over","none");
        document.getElementById("start-reset").innerHTML = "Reset Game";
        //set score to zero
        score = 0;
        document.getElementById("score-value").innerHTML = score;
        //show countdown box
        visibility("time-left","visible");
        timeLeft = 60;
        document.getElementById("time-value").innerHTML = timeLeft;
        startCountdown();
        
        //generate new Q&A
        if(document.getElementById("level").value =="Bg"){
            generateQA(6);
            highestScore = document.getElementById("bg-highest-score").innerHTML;
            document.getElementById("level-text").innerHTML="<p> Highest Score: " +highestScore+"</p>";
            display("level-text","block")
        }
        else if(document.getElementById("level").value =="Adv"){
            generateQA(11);
            highestScore = document.getElementById("adv-highest-score").innerHTML;
            document.getElementById("level-text").innerHTML="<p>Highest Score: " +highestScore+"</p>";
            display("level-text","block")
        }
        else if(document.getElementById("level").value =="Pro"){
            generateQA(14);
            highestScore = document.getElementById("pro-highest-score").innerHTML;
            document.getElementById("level-text").innerHTML="<p>Highest Score: " +highestScore+"</p>";
            display("level-text","block")
        }
    }
}

// -----------a click on answer box----------

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
        if(timeLeft>0){

        if(playing==true){
            if(this.innerHTML==correctAnswer){
                score++;
                //hide wrong box and show correct box
                document.getElementById("score-value").innerHTML=score;
                display("wrong","none");
                display("correct","block");
                setTimeout(function(){
                    display("correct","none");
                },1000)
                //generate new Q&A
                if(document.getElementById("level").value =="Bg"){
                    generateQA(6);
                }
                else if(document.getElementById("level").value =="Adv"){
                    generateQA(11);}
                else if(document.getElementById("level").value =="Pro"){
                    generateQA(14);}
            }else{
                //show wrong box and hide correct box
                
                display("wrong","block");
                display("correct","none");
                setTimeout(function(){
                    display("wrong","none");
                },1000)
            }
        }
    }
    
}
}

// ----------------functions---------------

//start countdown 
function startCountdown(){
    countdown = setInterval(function(){
        timeLeft -= 1;
        document.getElementById("time-value").innerHTML = timeLeft;
        if(timeLeft==0){//game over
            stopCountdown();
            if(score>=highestScore){
                display("congratulations","block")
                document.getElementById("congratulations").innerHTML = 
                "<p>Congratulations!</p><p>you score the highest. <br> proceed to next level.<br> 👏🙌💖</p>";
            }
            else{
                
                display("game-over","block");
                document.getElementById("game-over").innerHTML = 
                "<p>game over!</p><p>your score is " +score+ ".</p>";
                visibility("time-left", "hidden");
                display("correct", "none");
                display("wrong", "none");
                document.getElementById("start-reset").innerHTML = "Start Game";
            }
       }
    },1000)
}


//stop counter
function stopCountdown(){
    clearInterval(countdown);
}

//hide and show element with visibility
function visibility(id, choice){
    document.getElementById(id).style.visibility = choice;
}

//hide and show an element with display property 
function display(id, choice){
    document.getElementById(id).style.display = choice;
}

//generate new Q&A
function generateQA(unit){
    let x= Math.round(unit*Math.random())+1;
    let y= Math.round(unit*Math.random())+1;
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x +"x"+ y;
    correctPosition= Math.round(3*Math.random())+1;
    document.getElementById("box"+correctPosition)
    .innerHTML = correctAnswer;//fill one box with correct answer

    //fill other boxes with wrong answers

    let answers=[correctAnswer];

    for(i=1; i<5; i++){
        if(i != correctPosition){
            let wrongAnswer;
            do{
                wrongAnswer=(Math.round(unit*Math.random())+1)
            *(Math.round(unit*Math.random())+1);
            }
            while(answers.indexOf(wrongAnswer)>-1);
            document.getElementById("box"+i).innerHTML=wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}




// -----------a click on start button----------

//if playing
    //reload game
//if not playing
    //set playing to true
    //set score to zero
    //show countdown box
    //reduce time by 1 second in loop
        //time left?
            //yes-> continue
            //no-> gameover
    //change button to reset game
    //generate new Q&A

// --------------a click on answer box-----------------

//if playing
    //correct?
        //yes
            //increase score
            //show correct box for 1 sec
            //generate new Q&A
        //no
            //show try again box for 1 sec
