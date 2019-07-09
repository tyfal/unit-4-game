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

    // initiates battle when selected
    enemyClick(player) {
        var _self = this;
        this.imgElement.on("click", function (player) {
            $(this).appendTo("#playerDiv");
            
        })
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

        var _self = this;

        $(".character").on("click", function (thisGame) {
            $(this).addClass("player");
            for (var i = 0; i < 4; i++) {
                if (!(cList[i].imgElement.hasClass("player"))) {
                    cList[i].imgElement.addClass("enemy");
                }
            }

            _self.battle(vader, trooper, anakin, rey);

        });

    }

    battle(vader, trooper, anakin, rey) {

        var playerDiv = $("#playerDiv");
        var enemyDiv = $("#enemyDiv");

        playerDiv.empty();
        enemyDiv.empty();

        enemyDiv.append("<p>Decide whom you'll battle first. Be wary...");

        var enemies = [];

        for (var i = 0; i < arguments.length; i++) {

            var char = arguments[i];

            if (char.imgElement.hasClass("player")) {
                playerDiv.append(char.imgElement);
                var player = char;
            }

            else {
                enemyDiv.append(char.imgElement);
                enemies.push(char);
            }

        }

        for (var i = 0; i<enemies.length; i++) {
            this.faceoff(player, enemies[i]);
        }

    }

    faceoff(player, enemy) {

        var _self = this;
        var _enemy = enemy;
        var _player = player;

        enemy.imgElement.on("click", function() {

            var playerDiv = $("#playerDiv");
            var enemyDiv = $("#enemyDiv");
            var attackBtn = $("<button id='attackBtn'>Attack</button>");
    
            playerDiv.prepend("<ul><li>Health: "+_player.health+"</li><li>Attack: "+ _player.attack+"</li></ul>");
            playerDiv.append("<h3>vs.</h3>",_enemy.imgElement,"<ul><li>Health: "+_enemy.health+"</li><li>Attack: "+_enemy.attack+"</li></ul>",attackBtn);

            // while (enemy.health > 0) {

            //     attackBtn.on("click", function() {

            //         _enemy.health -= _player.attack;

            //     });

            // }         

        });

    }

}

