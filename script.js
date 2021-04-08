window.addEventListener("load", sidenVises);

let points;
let liv;
let tid;
let spilletErSlut;

function sidenVises() {
    console.log("sidenVises");

    //Vis startskærm, lydknapper og spilknap
    document.querySelector("#start").classList.remove("hide");
    document.querySelector("#start_button").addEventListener("click", startGame);
    document.querySelector("#sound_on_button").addEventListener("click", muteSoundOff);
    document.querySelector("#sound_off_button").addEventListener("click", muteSoundOn);
    document.querySelector("#sound_on_button").classList.remove("hide");
    document.querySelector("#sound_off_button").classList.remove("hide");
    document.querySelector("#start_button").classList.add("pulse");

    //Skjul slutskærme
    document.querySelector("#level_complete").classList.add("hide");
    document.querySelector("#game_over").classList.add("hide");
    
    //***************

    //Afspil musik på startskærm ved klik på muteOff knap --> muteSoundOn
    
    //Fjern musik på startskærm ved klik på muteOn knap --> muteSoundOff
}

function muteSoundOff() {
    
    document.querySelector("#sound_off_button").classList.remove("hide");
    document.querySelector("#sound_on_button").classList.add("hide");
    document.querySelector("#sound_background").pause();        

}

function muteSoundOn() {
    

    document.querySelector("#sound_on_button").classList.remove("hide");
    document.querySelector("#sound_off_button").classList.add("hide");
    document.querySelector("#sound_background").play();

}


function startGame() {

    console.log("startGame");

    //Skjul startskærm og slutskærme  
    document.querySelector("#level_complete").classList.add("hide");
    document.querySelector("#game_over").classList.add("hide");

    document.querySelector("#start_button").removeEventListener("click", startGame);

    document.querySelector("#start").classList.add("hide");

    document.querySelector("#sound_on_button").classList.add("hide");

    document.querySelector("#sound_off_button").classList.add("hide");

    spilletErSlut = false;
    
    document.querySelector("#surhector_sprite").classList.remove("svimmel");
     document.querySelector("#surhector_sprite").classList.remove("glad");


    //Nulstil point, tid og liv
    points = 0;
    document.querySelector("#score_board").textContent = points;
    liv = 3;
    document.querySelector("#energy_board_sprite1").classList.remove("grey");
    document.querySelector("#energy_board_sprite2").classList.remove("grey");
    document.querySelector("#energy_board_sprite3").classList.remove("grey");
    tid = 30;
    document.querySelector("#time_count").textContent = tid;
    startTimer();


    //afspil baggrundsmusik
    document.querySelector("#sound_background").volume = 0.2;
    document.querySelector("#sound_background").play();

    //Skjul broccoli og bøf til at starte med
    document.querySelector("#boef_container1").classList.add("hide");
    document.querySelector("#broccoli_container1").classList.add("hide");

    //lave et tilfældigt tal mellem 1 og 11 så elementer kan få en random startposition 
    let myRandom = Math.floor((Math.random() * 10) + 1);


    //Giv elementer en random start position
    document.querySelector("#boef_container1").classList.add("position" + myRandom);
    myRandom = Math.floor((Math.random() * 10) + 1);
    document.querySelector("#broccoli_container1").classList.add("position" + myRandom);
    console.log("position" + myRandom);

    if (Math.random() > 0.7) {
        document.querySelector("#boef_container1").classList.add("fadeout");
        document.querySelector("#boef_container1").classList.remove("hide");
    } else {
        document.querySelector("#broccoli_container1").classList.add("fadeout");
        document.querySelector("#broccoli_container1").classList.remove("hide");

    }

    //*********************

    //Klik på bøf --> ClickBoef
    document.querySelector("#boef_container1").addEventListener("click", clickBoef);

    //Klik på broccoli --> ClickBroccoli
    document.querySelector("#broccoli_container1").addEventListener("click", clickBroccoli);


    //Når animation slutter --> genstartElement
    document.querySelector("#boef_container1").addEventListener("animationend", genstartElement);
    document.querySelector("#broccoli_container1").addEventListener("animationend", genstartElement);

}

//Vent 30 sekunder --> stopSpillet

function startTimer() {
    console.log("startTimer");

    if (tid > 1) {
        setTimeout(startTimer, 1000);
    } else {
        stopSpillet();
    }

    tid--;
    document.querySelector("#time_count").textContent = tid;
}

function clickBoef() {
    console.log("clickBoef");

    //Ryd op så man ikke kan klikke på den samme ting mere end én gang
    document.querySelector("#boef_container1").removeEventListener("click", clickBoef);

    // Få 1 point
    points++;

    //Vis samlet antal point

    document.querySelector("#score_board").textContent = points;


    //Remove fadeout animation
    this.classList.remove("fadeout");

    //Bøf forsvinder (fader ud)
    this.classList.add("gone");

    //Smaskelyd fra hund forekommer
    document.querySelector("#sound_smask").play();

    //Hund er glad (ændrer ansigtsudtryk)
    document.querySelector("#surhector_sprite").classList.add("glad");

    //Fade animation færdig --> genstartElement
    this.addEventListener("animationend", genstartElement);
}

function clickBroccoli() {
    console.log("clickBroccoli");


    //Ryd op så man ikke kan klikke på den samme ting mere end én gang
    document.querySelector("#broccoli_container1").removeEventListener("click", clickBroccoli);


    //Vis samlet antal liv
    document.querySelector("#energy_board_sprite" + liv).classList.add("grey");

    //Mist et liv
    liv--;
    //Mist et point
    points--;

    //Vis samlet antal point
    document.querySelector("#score_board").textContent = points;

    //remove fadeout animation
    this.classList.remove("fadeout");

    //Broccoli forsvinder (disappear)
    this.classList.add("disappear");

    //Pivelyd fra hund 
    document.querySelector("#sound_piv").volume = 0.5;
    document.querySelector("#sound_piv").play();


    //Hund er svimmel (ændrer ansigtsudtryk)
    document.querySelector("#surhector_sprite").classList.add("svimmel");

    //*********************


    //Fade animation færdig --> genstartElement
    this.addEventListener("animationend", genstartElement);

    //Ingen liv tilbage --> gameOver
    if (liv <= 0) {
        stopSpillet();
    } else {
        this.addEventListener("animationend", genstartElement);
    }
}

function genstartElement() {
    console.log("genstartElement");

    //Fjern eksisterende position 

    this.classList = "";

    this.offsetLeft;

    let myRandom = Math.floor((Math.random() * 10) + 1);


    //Giv elementet en ny (random) position, vis elementer og genstart fadeout animation
    
    this.classList = "position" + myRandom + " fadeout";
    console.log("position" + myRandom);


    if (Math.random() > 0.7) {
        document.querySelector("#boef_container1").classList.add("hide");
        document.querySelector("#boef_container1").classList.add("fadeout");;
        document.querySelector("#broccoli_container1").classList.remove("hide");
    } else {
        document.querySelector("#broccoli_container1").classList.add("hide");
        document.querySelector("#broccoli_container1").classList.add("fadeout");
        document.querySelector("#boef_container1").classList.remove("hide");
    }

    //Hund går tilbage til neutrale ansigt
    document.querySelector("#surhector_sprite").classList.remove("svimmel");
    document.querySelector("#surhector_sprite").classList.remove("glad");

    //Gøre så man kan trykke på ting igen
    document.querySelector("#boef_container1").addEventListener("click", clickBoef);
    document.querySelector("#broccoli_container1").addEventListener("click", clickBroccoli);

}

function stopSpillet() {
    console.log("stopSpillet");

    if (spilletErSlut==false) {
        spilletErSlut = true;

        //Stop alle animationer
        document.querySelector("#boef_container1").classList = "";
        document.querySelector("#broccoli_container1").classList = "";

        //Fjern alle eventlisteners
        document.querySelector("#boef_container1").removeEventListener("click", clickBoef);
        document.querySelector("#broccoli_container1").removeEventListener("click", clickBroccoli);

        //Stop timer    
        tid = 0;

        //*********************

        //Færre end 10 points --> gameOver
        //Ellers --> levelComplete

        if (points >= 10) {
            levelComplete();
        } else {
            gameOver();
        }
    }
}

function gameOver() {
    console.log("gameOver");
    
    //Stop baggrundsmusik
    document.querySelector("#sound_background").pause();

    //Spil game_over musik
    document.querySelector("#sound_game_over").play();
    document.querySelector("#sound_game_over").volume = 1;

    //Skriv “Game over - du fik XX point” ud i konsollen.
    console.log("Game over - øv, du fik kun" + points + "points." + "Du har" + liv + "liv  tilbage");

    //TODO: Vis taberskærm
    document.querySelector("#game_over").classList.remove("hide");

    //Klik på home knap --> gå til startskærm (sidenVises)
    document.querySelector("#home_game_over_button").addEventListener("click", sidenVises);

    //Klik på genstart knap --> startGame
    document.querySelector("#genstart_game_over_button").addEventListener("click", startGame);

}

function levelComplete() {
    console.log("levelComplete");

    //Stop baggrundsmusik
    document.querySelector("#sound_background").pause();

    //Spil level_complete musik
    document.querySelector("#sound_level_complete").play();
    document.querySelector("#sound_level_complete").volume = 0.8;

    //Skriv “Level complete - du fik XX point” ud i konsollen.
    console.log("Level complete - tillykke, du fik samlet" + points + "bøffer");

    //TODO: Vis vinder skærm
    document.querySelector("#level_complete").classList.remove("hide");

    //Klik på home knap --> gå til startskærm (sidenVises) 
    document.querySelector("#home_level_complete_button").addEventListener("click", sidenVises);

    //Klik på genstart knap --> startGame  
    document.querySelector("#genstart_level_complete_button").addEventListener("click", startGame);
}
