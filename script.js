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
    change_txt("number_counter", "Horse clicks: " + Math.round(horse_clicks).toString());
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
        // this.element.textContent = `${this.name} - Cost: ${this.cost}`; -- old code
        
        // new code
        // title
        this.title = document.createElement("div");
        this.title.textContent = `${this.name} - Cost: ${this.cost}`;
        this.title.classList.add("upgrade-title");
        
        // effect
        this.effectText = document.createElement("div");
        this.effectText.textContent = this.effect;
        this.effectText.classList.add("upgrade-effect")

        this.element.appendChild(this.title);
        this.element.appendChild(this.effectText);

        // end of new code

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

const hat_upgrade = new Upgrade("Fancy Hat", 10, "Makes your horse look stylish. (also +1 horse click gain)");
const hat = document.getElementById("tophat_image");

hat_upgrade.element.addEventListener('click', () => {
    if (hat_upgrade.try_to_buy(horse_clicks)) {
        const purchased_sound = new Audio("sounds/purchased.mp3")

        horse_clicks -= hat_upgrade.cost;
        horse_click_gain += 1;

        change_txt("number_counter", "Horse clicks: " + Math.round(horse_clicks).toString());
        hat_upgrade.element.style.textDecoration = "line-through";
        hat_upgrade.element.style.backgroundColor = "rgba(131, 246, 129, 1)";
        hat.style.display = "block";
        purchased_sound.play()
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

const monocle_upgrade = new Upgrade("Monocle", 25, "Gives your horse an air of sophistication. (also +2 horse click gain)");
const monocle = document.getElementById("monocle_image");

monocle_upgrade.element.addEventListener('click', () => {
    if (monocle_upgrade.try_to_buy(horse_clicks)) {
        const purchased_sound = new Audio("sounds/purchased.mp3")

        horse_clicks -= monocle_upgrade.cost;
        horse_click_gain += 2;

        change_txt("number_counter", "Horse clicks: " + Math.round(horse_clicks).toString());
        monocle_upgrade.element.style.textDecoration = "line-through";
        monocle_upgrade.element.style.backgroundColor = "rgba(131, 246, 129, 1)";
        monocle.style.display = "block";
        purchased_sound.play()
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
    constructor(name, cost, effect, when_bought_multiplier){
        this.name = name;
        this.cost = cost;
        this.effect = effect
        this.when_bought_multiplier = when_bought_multiplier;
        this.amount_purchased = 0;

        this.element = document.createElement("div");
        this.element.classList.add('box', 'upgrade');
        // start of text contents
        // this.element.textContent = `${this.name} - Cost: ${this.cost}`; -- old code
        
        // title
        this.title = document.createElement("div");
        this.title.textContent = `${this.name} - Cost: ${this.cost}`;
        this.title.classList.add("upgrade-title");

        // effect
        this.effectText = document.createElement("div");
        this.effectText.textContent = this.effect;
        this.effectText.classList.add("upgrade-effect");

        // amount bought
        this.amountBoughtText = document.createElement("div");
        this.amountBoughtText.textContent = this.amount_purchased.toString();
        this.amountBoughtText.classList.add("upgrade-amount-bought");
        


        this.element.appendChild(this.title)
        this.element.appendChild(this.effectText)
        this.element.appendChild(this.amountBoughtText)

        // end of text contents
        document.getElementById('multi_buy_upgrades_container').appendChild(this.element);

        this.element.addEventListener("click", () => {
            console.log(`Attempting to purchase upgrade: ${this.name}`);
            if (this.try_to_buy(horse_clicks)){
                const purchased_sound = new Audio("sounds/purchased.mp3")

                this.amount_purchased += 1;
                this.amountBoughtText.textContent = this.amount_purchased.toString();
                horse_clicks -= this.cost;
                this.cost = Math.round(this.cost * this.when_bought_multiplier);
                change_txt("number_counter", "Horse clicks: " + Math.round(horse_clicks).toString());
                this.title.textContent = `${this.name} - Cost: ${this.cost}`
                
                // need to add sfx
                this.element.style.backgroundColor = "rgba(131, 246, 129, 1)";
                purchased_sound.play()

                console.log("successfully modified stats of " + this.name + ". cost: " + this.cost.toString() + ". when_bought_multiplier: " + this.when_bought_multiplier)

                wait(500).then(() => {
                    this.element.style.backgroundColor = "rgb(50, 50, 50)";
                });
            } else {
                const deny_click = new Audio("sounds/deny_click.mp3");

                this.element.style.backgroundColor = "rgba(243, 61, 61, 1)";
                deny_click.play()

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

// upgrades go here

const bigger_cursor = new Multi_buy_upgrade('Bigger cursor', 10, '+1 horse click gain', 1.2)
const clicker = new Multi_buy_upgrade("Clicker", 5, "invisible cursor to click your horse", 1.3)
















function update_click_gain() {
    // reset to 1
    horse_click_gain = 1

    // hat upgrade detection
    if (hat_upgrade.purchased_by_user) {
        horse_click_gain += 1
    }

    // monocle upgrade detection
    if (monocle_upgrade.purchased_by_user) {
        horse_click_gain += 2
    }

    // bigger cursor upgrade
    horse_click_gain += bigger_cursor.amount_purchased
}


function update_automatic_clicks() {
    // reset to 0
    horse_automatic_click_gain = 0

    // clicker upgrade
    horse_automatic_click_gain += clicker.amount_purchased
}



// automatic click gain code

// horse_automatic_click_gain defined at start

async function automatic_horse_clicks_increase() {
    while (true){
        let horse_clicks_before = horse_clicks
        if (horse_automatic_click_gain < 50){
            // lower bound animation (under 50 increase)
            await horse_clicks_animation(horse_clicks + horse_automatic_click_gain, 500)
            await wait(500)
        } else {
            // upper bound animation (equal or over 50 increase)
            await horse_clicks_animation(horse_clicks + horse_automatic_click_gain, 1000)
        }
        console.log(horse_clicks_before + "  =>  " + horse_clicks + "  due to automatic click gain")

        console.log("updating stats ['horse click gain','automatic horse click gain']")

        update_click_gain()
        update_automatic_clicks()

        console.log(`click gain: ${horse_click_gain}, automatic click gain: ${horse_automatic_click_gain}`)

    }
}





async function horse_clicks_animation(new_value, wait_time_in_ms){
    const increment = (new_value - horse_clicks) / 10;
    const wait_time = Math.round(wait_time_in_ms / 10);

    for (let i= 0; i< 10; i++) {
        horse_clicks += increment;
        change_txt("number_counter", "Horse clicks: " + Math.round(horse_clicks).toString());
        await wait(wait_time);
    }
}

automatic_horse_clicks_increase();


// for some reason this makes it so that the horse clicks value gets set to 0. why is this?


