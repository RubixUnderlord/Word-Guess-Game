$(document).ready(function () {
    var wins = 0
    var loses = 0
    var life = 13;
    var chosenWord = "";
    var wordBank = ["ABRUBPTLY", "FUSHCIA", "HAPHAZARD", "QUARTZ", "LYMPH"];
    $("#start").on("click", function () {
        randomWord()
        start()
    });
    $("#makeWord").on("click", function () {
        makeWord()
    });
    $("#submit").on("click", function () {
        var word = $("#word").val();
        chosenWord = word.toUpperCase();
        console.log(chosenWord);
        start()
    });


    var restartBtn = $("<button>");
    restartBtn.addClass("col");
    restartBtn.text("Restart");
    restartBtn.attr('id', 'restart remove');
    $("#restart").append(restartBtn);
    $("#restart").on("click", function () {
        $(this).attr('id', 'hide');
        start()
    });

    function randomWord() {
        var randomIndex = Math.floor(Math.random() * wordBank.length);
        chosenWord = wordBank[randomIndex];
    }
    function makeWord() {
        $("#word").removeClass("hide");
        $("#submit").removeClass("hide");
    }

    function start() {
        life = 13
        console.log("something");
        $("#start").addClass("hide");
        $("#makeWord").addClass("hide");
        $("#word").addClass("hide");
        $("#submit").addClass("hide");
        $(".game").removeClass("hide");
        $("#wins").text(`wins: ${wins}`);
        $("#loses").text(`loses: ${loses}`);
        var wordLength = [];
        for (var i = 0; i < chosenWord.length; i++) {
            if(chosenWord[i] === " "){
                wordLength[i] = "\xa0";
            }else{
                wordLength[i] = "_";
            }
        }


        for (var i = 65; i < 91; i++) {
            var letterBtn = $("<button>");
            letterBtn.addClass("col-md-1 visible");
            letterBtn.attr("data-letter", String.fromCharCode(i));
            letterBtn.text(String.fromCharCode(i));
            letterBtn.click(function () {
                var chosenLetter = $(this).attr("data-letter");
                $(this).addClass("hide");
                $(this).off();
                console.log(chosenLetter);
                console.log(life);
                for (var l = 0; l < chosenWord.length + 1; l++) {
                    if (chosenWord[l] === chosenLetter) {
                        for (var p = l; p < chosenWord.length; p++) {
                            if (chosenWord[p] === chosenLetter) {
                                wordLength[p] = chosenLetter;
                                $("#remainingWord").text(`Word: ${wordLength.join(" ")}`);
                            }
                        }
                        break
                    }
                    if (l === chosenWord.length) {
                        life--
                        break
                    }
                }
                if (life === parseInt(0)) {
                    $("#remainingWord").text("You Lose");
                    $(".visible").addClass("disappear");
                    loses++
                    console.log(`${loses}`);
                    $("#hide").removeAttr('id', 'hide');
                    $("#loses").text(`loses: ${loses}`);
                } else if (chosenWord === wordLength.join("")) {
                    $("#remainingWord").text(`You Win`);
                    $(".visible").addClass("disappear");
                    wins++
                    console.log(`${wins}`);
                    $("#hide").removeAttr('id', 'hide');
                    $("#wins").text(`wins: ${wins}`);
                } else {
                }

            });
            $("#letters").append(letterBtn);

        }




        $("#remainingWord").text(`Word: ${wordLength.join(" ")}`);
    };
});