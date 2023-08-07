formLottery.addEventListener('click', e => {
  e.preventDefault()

  const el = e.target
    
  if (el.classList.contains('submit')) formData(focus)
  else if (el.classList.contains('all')) {
    focus = focusOn(el)
  } else if (el.classList.contains('even')) {
    focus = focusOn(el)
  } else if (el.classList.contains('odd')) {
    focus = focusOn(el)
  } else if (el.classList.contains('prime')) {
    focus = focusOn(el)
  } else if (el.classList.contains('fibonacci')) {
    focus = focusOn(el)
  }
})

function focusOn(el) {
  const isOn = formLottery.querySelectorAll('.btn')
  const j = isOn.length
  let focus = ''
  for (let i = 0; i < j; i++) {
    const k = isOn[i] === el ? 'add' : 'remove'
    isOn[i].classList[k]('on')
  }

  const extra = formLottery.querySelector('.on')
  if (extra.classList.contains('all')) focus = 'all'
  else if (extra.classList.contains('even')) focus = 'even'
  else if (extra.classList.contains('odd')) focus = 'odd'
  else if (extra.classList.contains('prime')) focus = 'prime'
  else {
    focus = 'fibonacci'
  }
  
  return focus
}


function formData() {
  const formData = new FormData(formLottery)

  let maxRoll = parseInt(formData.get('max_roll'))
  let numberRoll = parseInt(formData.get('num_roll'))

  displayMax = document.querySelector('.max_roll')
  displayNumber = document.querySelector('.num_roll')

  if (maxRoll > 99999999) {
    maxRoll = 99999999
    displayMax.value = maxRoll
  }
  
  const rolls = randomNumber(maxRoll, numberRoll, focus)

  result.textContent = rolls[0]
  for (let i = 1; i < rolls.length; i++) {
    result.appendChild(document.createTextNode(',  ' + rolls[i]))
  }
}

function randomNumber(max, number, focus) {
  let base = []
  let bet = []
  let roll = 0

  if (focus === 'even') {
    for (let i = 2; i <= max; i += 2) {
      base.push(i)
    }
  } else if (focus === 'odd') {
    for (let i = 1; i <= max; i += 2) {
      base.push(i)
    }
  } else if (focus === 'prime') {
    base.push(2)
    for (let i = 3; i <= max; i += 2) {
      if (i === 3 || i === 5 || i === 7) {
        base.push(i)
      } else if (i % 3 !== 0 && i % 5 !== 0 && i % 7 !== 0) {
        base.push(i)
      }
    }
  } else if (focus === 'fibonacci') {
    base.push(1)
    let j = 0
    for (let i = 2; i <= max; i += j) {
      j = base[base.length - 1]
      base.push(i)
    }
  } else {
    for (let i = 1; i <= max; i++) {
      base.push(i)
    }
  }

  if (number > base.length) {
    number = base.length
    formLottery.querySelector('.num_roll').value = number
    num_error.innerHTML = `Number of Rolls > Possible Rolls: Number of Rolls Adjusted to ${number}`
  } else {
    num_error.innerHTML = ''
  }

  for (let i = 0; i < number; i++) {
    roll = Math.round(Math.random() * (base.length - 1) + 1)

    bet.push(base.splice(roll - 1, 1))
  }

  bet.sort((a, b) => a - b)

  return bet
}
