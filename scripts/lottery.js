let maxRoll = 60;
let numberRoll = 6;
let betNumber = 4;

// Considerando que estao sendo inputados somente numeros.
// Fazer o check antes.

function randomNumber(max,number){
    let bet = []
    let roll = 0
    
    for (let i = 0; i < number; i++) {
        roll = Math.round(Math.random() * (max - 1) + 1)

        if (bet.indexOf(roll) === -1){
            bet.push(roll)
        }
        else {
            i--
        }
    }

    bet.sort((a,b) => (a - b))

    return bet
};

for (let i = 0; i < betNumber; i++){
    console.log(randomNumber(maxRoll,numberRoll))
};

