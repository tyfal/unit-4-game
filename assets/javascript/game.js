class character {

    // constructor - pass image and set metrics
    constructor(name, img) {
        this.name = name;
        this.health = 100;
        this.attack = 20;
        this.counterAttack = 20;
        this.imgUrl = img;
        this.imgElement = $("<img src='"+img+"' id='"+this.name.replace(" ","-")+"'>");
        this.player = false;

    }

    // setPlayer - change player status to true
    setPlayer() {
        this.player = true;
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

        for (var i=0; i<arguments.length; i++) {

            var char = arguments[i];

            if (char.player) {
                playerDiv.append(char.imgElement);
                char.imgElement.attr("class", "player");
            }

            else {
                enemyDiv.append(char.imgElement);
                char.imgElement.attr("class", "enemy");
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

        for (var i=0; i<cList.length; i++) {
            var char = cList[i];
            playerDiv.append(char.imgElement);
        }

        vader.imgElement.on("click", function() {
            vader.setPlayer();
            new battle(vader, trooper, anakin, rey);
        });

        trooper.imgElement.on("click", function() {
            trooper.setPlayer();
            new battle(vader, trooper, anakin, rey);
        });

        anakin.imgElement.on("click", function() {
            anakin.setPlayer();
            new battle(vader, trooper, anakin, rey);
        });

        rey.imgElement.on("click", function() {
            rey.setPlayer();
            new battle(vader, trooper, anakin, rey);
        });

    }
}