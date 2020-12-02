var isplaying = false;
var correctanswer = 0;
var score = 0;

function startgame()
{
    if(isplaying)
    {
        location.reload();
    }
    else{
        document.getElementById("gameover").style.display = "none";
        document.getElementById("timervalue").innerHTML = 60;
        score = 0;
        document.getElementById("scorevalue").innerHTML = 0;
        var startgamebar = document.getElementById("startgame");
        startgamebar.innerHTML = "Reset Game";

        var timeremainingbar = document.getElementById("timeremaining");
        timeremainingbar.style.display = "inline";

        setQuestion();

        starttimer();
        isplaying = true;
    }
}

function starttimer()
{
    var timervalue = document.getElementById("timervalue");
    var timerc = timervalue.innerHTML;
    var timer = setInterval(function(){
        timerc--; 
        timervalue.innerHTML = timerc
        if(timerc==0)
        {
            clearInterval(timer);
            gameOver();
            return;
        }
    }, 1000);
}

function checkAnswer(id)
{
    if(!isplaying)
        return;
    var option = document.getElementById(id);
    if(option.innerHTML==correctanswer)
    {
        var correctbox = document.getElementById("correct");
        var wrongbox = document.getElementById("wrong");
        wrongbox.style.display = "none";
        correctbox.style.display = "inline";
        score++;
        document.getElementById("scorevalue").innerHTML = score;
        var sto = setTimeout(function(){correctbox.style.display = "none";}, 1000);
        setQuestion();
        return;
    }
    else{
        var correctbox = document.getElementById("correct");
        var wrongbox = document.getElementById("wrong");
        
        correctbox.style.display = "none";
        wrongbox.style.display = "inline";
        var sto = setTimeout(function(){wrongbox.style.display = "none";}, 1000);
        return ;
    }
}

function setQuestion()
{
    var fn = Math.floor(Math.random()*9+1);
    var sn = Math.floor(Math.random()*9+1);
    var displayboard = document.getElementById("displayboard");
    displayboard.innerHTML = fn+"x"+sn;
    correctanswer = fn*sn;

    var options = document.getElementsByClassName("option");
    optionset = new Set();
    for(var i=0;i<options.length;i++)
        {
            val = Math.floor(Math.random()*99+1);
            while(optionset.has(val) || val==correctanswer)
                val = Math.floor(Math.random()*99+1);
            optionset.add(val);
            options[i].innerHTML = val;
        }

    var coption = Math.floor(Math.random()*4);
    options[coption].innerHTML = fn*sn;
}

function gameOver()
{
    document.getElementById("timeremaining").style.display = "none";
    document.getElementById("finalscore").innerHTML = score;
    document.getElementById("gameover").style.display = "block";
    isplaying = false;
}