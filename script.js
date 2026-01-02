console.log("Hello, World, javascript script thingy is work :DDD");


let horse_clicks = 0;
let horse_click_gain = 1;
let horse_automatic_click_gain = 0;

function change_txt(element_id, new_text) {
    document.getElementById(element_id).textContent = new_text;
}

const wait = ms => new Promise(r => setTimeout(r, ms));

async function smooth_click_change(new_click_value){
    
    change_value = new_click_value - horse_clicks

    for (let i=0; i>=10; i++){
        // temporary, add to later
    }
}



const rainbow = document.getElementById("number_counter");
let hue = 0;

setInterval(() => {
    rainbow.style.color = `hsl(${hue}, 100%, 50%)`;
    hue = (hue + 5) % 360; // keep hue between 0-359
}, 30); // changes every 100ms






const horse = document.getElementById("horse_image");

horse.addEventListener("click", () => {
    console.log("Horse image clicked!");
    horse_clicks += horse_click_gain;
    change_txt("number_counter", "Horse clicks: " + horse_clicks.toString());
    const neigh = new Audio("sounds/neigh.mp3");
    neigh.play();
});


class Upgrade {
    constructor(name, cost, effect) {
        this.name = name;
        this.cost = cost;
        this.effect = effect;
        this.purchased_by_user = false;

        
        this.element = document.createElement('div');
        this.element.textContent = `${this.name} - Cost: ${this.cost}`;

        this.element.classList.add('box', 'upgrade');
        document.getElementById('static_upgrades_container').appendChild(this.element);

        this.element.addEventListener('click', () => {
            console.log(`Attempting to purchase upgrade: ${this.name}`);
        });

    }


    display() {
        console.log(`Upgrade: ${this.name}, Cost: ${this.cost}, Effect: ${this.effect}`);
    }

    try_to_buy(current_clicks) {
        if (this.purchased_by_user) {
            console.log(`Upgrade already purchased: ${this.name}`);
            return false;
        }


        if (current_clicks >= this.cost) {
            console.log(`Purchased upgrade: ${this.name}`);
            this.purchased_by_user = true;
            return true;
        } else {
            console.log(`Not enough clicks to purchase: ${this.name}`);
            return false;
        }
    }
}


// tophat upgrade

const hat_upgrade = new Upgrade("Fancy Hat", 10, "Makes your horse look stylish.");
const hat = document.getElementById("tophat_image");

hat_upgrade.element.addEventListener('click', () => {
    if (hat_upgrade.try_to_buy(horse_clicks)) {
        horse_clicks -= hat_upgrade.cost;
        change_txt("number_counter", "Horse clicks: " + horse_clicks.toString());
        hat_upgrade.element.style.textDecoration = "line-through";
        hat_upgrade.element.style.backgroundColor = "rgba(131, 246, 129, 1)";
        hat.style.display = "block";
        horse_click_gain += 1;
    } else {

        if (hat_upgrade.purchased_by_user) {
            return;
        }
        
        hat_upgrade.element.style.backgroundColor = "rgba(243, 61, 61, 1)";
        const deny_click = new Audio("sounds/deny_click.mp3");
        deny_click.play();

        wait(500).then(() => {
            hat_upgrade.element.style.backgroundColor = "rgb(50, 50, 50)";
        });
    }
});


// monacle upgrade

const monocle_upgrade = new Upgrade("Monocle", 25, "Gives your horse an air of sophistication.");
const monocle = document.getElementById("monocle_image");

monocle_upgrade.element.addEventListener('click', () => {
    if (monocle_upgrade.try_to_buy(horse_clicks)) {
        horse_clicks -= monocle_upgrade.cost;
        change_txt("number_counter", "Horse clicks: " + horse_clicks.toString());
        monocle_upgrade.element.style.textDecoration = "line-through";
        monocle_upgrade.element.style.backgroundColor = "rgba(131, 246, 129, 1)";
        monocle.style.display = "block";
        horse_click_gain += 2;
    } else {
        
        if (monocle_upgrade.purchased_by_user) {
            return;
        }

        monocle_upgrade.element.style.backgroundColor = "rgba(243, 61, 61, 1)";
        const deny_click = new Audio("sounds/deny_click.mp3");
        deny_click.play();

        wait(500).then(() => {
            monocle_upgrade.element.style.backgroundColor = "rgb(50, 50, 50)";
        });
    }
});









// upgrades you can buy more than 1 of

class Multi_buy_upgrade{
    constructor(name, cost, when_bought_multiplier){
        this.name = name;
        this.cost = cost;
        this.when_bought_multiplier = when_bought_multiplier;
        this.amount_purchased = 0;

        this.element = document.createElement("div");
        this.element.textContent = `${this.name} - Cost: ${this.cost}`;

        this.element.classList.add('box', 'upgrade');
        document.getElementById('multi_buy_upgrades_container').appendChild(this.element);

        this.element.addEventListener("click", () => {
            console.log(`Attempting to purchase upgrade: ${this.name}`);
            if (this.try_to_buy(horse_clicks)){

                this.amount_purchased += 1;
                horse_clicks -= this.cost;
                this.cost *= this.when_bought_multiplier;
                change_txt("number_counter", "Horse clicks: " + horse_clicks.toString());

                this.element.style.textDecoration = "line-through"
                this.element.style.backgroundColor = "rgba(131, 246, 129, 1)";
                this.element.textContent = `${this.name} - Cost: ${Math.round(this.cost)}`;

                console.log("successfully modified stats of " + this.name + ". cost: " + this.cost.toString() + ". when_bought_multiplier: " + this.when_bought_multiplier)

                wait(500).then(() => {
                    this.element.style.backgroundColor = "rgb(50, 50, 50)";
                });
            }
        });
    }



    // really just "check if can buy"
    try_to_buy(current_clicks) {

        if (current_clicks >= this.cost) {
            console.log(`Purchased upgrade: ${this.name}`);
            return true;
        } else {
            console.log(`Not enough clicks to purchase: ${this.name}`);
            return false;
        }
    }
}












// horse_automatic_click_gain defined at start

async function automatic_horse_clicks_increase() {
    while (true){
        horse_clicks += horse_automatic_click_gain
        await wait(1000)
        
        change_txt("number_counter", "Horse clicks: " + horse_clicks.toString());
    }
}

automatic_horse_clicks_increase();


