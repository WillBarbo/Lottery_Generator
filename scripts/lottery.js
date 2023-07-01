formLottery.addEventListener("submit",(e)=>{
    e.preventDefault();

    const formData = new FormData(formLottery);

    console.log(randomNumber(formData.get('max_roll'),formData.get('num_roll')));
    
})

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