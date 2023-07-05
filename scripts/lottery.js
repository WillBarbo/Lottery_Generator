formLottery.addEventListener("submit",(e)=>{
    e.preventDefault();

    const formData = new FormData(formLottery);
    
    let maxRoll = parseInt(formData.get('max_roll'));
    let numberRoll = parseInt(formData.get('num_roll'));

    if (maxRoll < numberRoll){
        numberRoll = maxRoll;
    }
    
    const rolls = randomNumber(maxRoll,numberRoll);

    result.textContent = rolls[0];
    for (let i = 1; i < rolls.length; i++){
        result.appendChild(document.createTextNode("  "+rolls[i]));;
    }    
})

function randomNumber(max,number){

    let base = []
    let bet = []
    let roll = 0

    for (let i = 1; i <= max; i++) {
        base.push(i);
    }
    
    for (let i = 0; i < number; i++) {

        roll = Math.round(Math.random() * (base.length - 1) + 1)

        bet.push(base.splice(roll-1,1));
    }

    bet.sort((a,b) => (a - b))

    return bet
};