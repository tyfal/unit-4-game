class character {

    // constructor - pass image and set metrics
    constructor(name, img) {
        this.name = name;
        this.health = 100;
        this.attack = 6;
        this.id = name.replace(" ", "-");
        this.imgUrl = img;
        this.imgElement = $("<img src='" + img + "' id='" + this.id + "'>");
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

        enemyDiv.append("<p>Decide whom to battle next. Be wary...");

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

        for (var i = 0; i < enemies.length; i++) {
            this.faceoff(player, enemies[i]);
        }

    }

    faceoff(player, enemy) {

        var _self = this;
        var _enemy = enemy;
        var _player = player;

        enemy.imgElement.on("click", function () {

            var playerDiv = $("#playerDiv");
            var enemyDiv = $("#enemyDiv");
            var attackBtn = $("<button id='attackBtn'>Attack</button>");

            _enemy.attack = _self.setAdvantage(_player, _enemy);

            playerDiv.prepend("<ul id='playerInfo'><li>Health: " + _player.health + "</li><li id='playerAttack'>Attack: " + _player.attack + "</li></ul>");
            playerDiv.append("<h3 id='vs'>vs.</h3>", _enemy.imgElement, "<ul id='enemyInfo'><li id='enemyHealth'>Health: " + _enemy.health + "</li><li>Attack: " + _enemy.attack + "</li></ul>", attackBtn);

            attackBtn.on("click", function () {
                
                _enemy.health -= _player.attack;
                
                _player.attack = Math.round(_player.attack * 1.5);

                $("#playerInfo").html("<ul id='playerInfo'><li>Health: " + _player.health + "</li><li id='playerAttack'>Attack: " + _player.attack + "</li></ul>");
                $("#enemyInfo").html("<ul id='enemyInfo'><li id='enemyHealth'>Health: " + _enemy.health + "</li><li>Attack: " + _enemy.attack + "</li></ul>");
                if (_enemy.health <= 0) {
                    $("#enemyInfo").remove();
                    $("#playerInfo").remove();
                    $("#vs").remove();
                    $('#attackBtn').remove();
                    $("#" + _enemy.id).css('opacity', '0.5');
                    $("#" + _enemy.id).css('background', 'rgb(51, 2, 2)');
                    $("#" + _enemy.id).off("click");
                    enemyDiv.append(_enemy.imgElement);
                }
                if (_player.health <= 0) {
                    $("#" + _player.id).css('opacity', '0.5');
                    $("#" + _player.id).css('background', 'rgb(2, 2, 51)');
                    $("h1").text("You lost!!!")
                }

                _player.health -= _enemy.attack;

            });

        });

    }

    setAdvantage(player, enemy) {

        var attackVal = 6

        if (enemy.name === "Darth Vader" && player.name === "Anakin Skywalker" ||
            enemy.name === "Storm Trooper" && player.name === "Darth Vader" ||
            enemy.name === "Rey" && player.name === "Storm Trooper" ||
            enemy.name === "Anakin Skywalker" && player.name === "Rey") attackVal = 60;

        if (enemy.name === "Darth Vader" && player.name === "Rey" ||
            enemy.name === "Storm Trooper" && player.name === "Anakin Skywalker" ||
            enemy.name === "Rey" && player.name === "Darth Vader" ||
            enemy.name === "Anakin Skywalker" && player.name === "Storm Trooper") attackVal *= 3;

        return attackVal;

    }

}

