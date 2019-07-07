class character {

    // constructor - pass image and set metrics
    constructor(name, img) {
        this.name = name;
        this.health = 100;
        this.attack = 20;
        this.counterAttack = 20;
        this.id = name.replace(" ", "-");
        this.imgUrl = img;
        this.imgElement = $("<img src='" + img + "' id='" + this.id + "'>");
    }

    // attack - increase incrementally with each pass
    attack() {

        if (player) {
            this.attack *= 1.5;
        }

        return this.attack;
    }

    // takeHit - decrease with each attack from opponent 
    takeHit(enemyAttack) {

        this.health -= enemyAttack;

        return this.health;

    }

}


class battle {

    // constructor - pass players
    constructor(character1, character2, character3, character4) {

        var playerDiv = $("#playerDiv");
        var enemyDiv = $("#enemyDiv");

        playerDiv.empty();
        enemyDiv.empty();

        enemyDiv.append("<p>Decide whom you'll battle first. Be wary...");

        for (var i = 0; i < arguments.length; i++) {

            var char = arguments[i];

            console.log(char.imgElement.attr("class"));

            if (char.imgElement.hasClass("player")) {
                playerDiv.append(char.imgElement);
            }

            else {
                enemyDiv.append(char.imgElement);

            }

        }



    }

    // battle - for each player set up player/enemy stand off


    // victor - determining victor


}

class game {

    constructor() {

        var playerDiv = $("#playerDiv");
        var enemyDiv = $("#enemyDiv");

        var vader = new character("Darth Vader", "assets/images/vader.png");
        var trooper = new character("Storm Trooper", "assets/images/trooper.png");
        var anakin = new character("Anakin Skywalker", "assets/images/anakin.png");
        var rey = new character("Rey", "assets/images/rey.png");

        var cList = [vader, trooper, anakin, rey];

        for (var i = 0; i < cList.length; i++) {
            var char = cList[i];
            char.imgElement.addClass("character");
            playerDiv.append(char.imgElement);
        }

        $(".character").on("click", function () {
            $(this).addClass("player");
            for (var i = 0; i < 4; i++) {
                if (!(cList[i].imgElement.hasClass("player"))) {
                    cList[i].imgElement.addClass("enemy");
                }
            }
            new battle(vader, trooper, anakin, rey);
        });

    }
}