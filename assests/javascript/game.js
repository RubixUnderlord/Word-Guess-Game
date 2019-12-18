$(document).ready(function () {
    var wordBank = ["ABRUBPTLY", "FUSHCIA", "HAPHAZARD", "QUARTZ", "LYMPH"];
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var wordLength = [];

    function restart(){
        var restartBtn = $("<button>");
        restartBtn.addClass("col");
        restartBtn.text("Restart");
        restartBtn.attr('id', 'start');
        $("#restart").append(restartBtn);
        $("#hide").removeAttr('id', 'hide');
    }

    $("#start").click(function () {
        var life = 13;
        var randomIndex = Math.floor(Math.random() * wordBank.length);
        var chosenWord = wordBank[randomIndex];
        $("#start").addClass("hide");
        $(".game").removeClass("hide");
        for (var i = 0; i < chosenWord.length; i++) {
            wordLength[i] = "_";
        }


        for (var i = 0; i < letters.length; i++) {
            var letterBtn = $("<button>");
            letterBtn.addClass("col-md-1 visible");
            letterBtn.attr("data-letter", letters[i]);
            letterBtn.text(`${letters[i]}`);
            letterBtn.click(function () {
                var chosenLetter = $(this).attr("data-letter");
                $(this).addClass("hide");
                $(this).off();
                console.log(chosenLetter);
                console.log(life);
                var wordPreGuess = wordLength;
                for (var l = 0; l < chosenWord.length; l++) {
                    if (chosenWord[l] === chosenLetter) {
                        wordLength[l] = chosenLetter;
                        $("#remainingWord").text(`Word: ${wordLength.join(" ")}`);

                    }
                }
                if (wordPreGuess == wordLength) {
                    life--
                }
                if (life === parseInt(0)) {
                    $("#remainingWord").text("You Lose");
                    $(".visible").addClass("disappear");
                    restart();
                } else if (chosenWord === wordLength.join("")) {
                    $("#remainingWord").text(`You Win`);
                    $(".visible").addClass("disappear");
                    restart();
                } else {
                }

            });
            $("#letters").append(letterBtn);

        }




        $("#remainingWord").text(`Word: ${wordLength.join(" ")}`);
    });
});