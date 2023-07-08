formLottery.addEventListener('click', e => {
  e.preventDefault()

  const el = e.target
  let focus = ''

  if (el.classList.contains('submit')) formData()
  else if (el.classList.contains('even')) {
    focusOn(el)
  } else if (el.classList.contains('odd')) {
    focusOn(el)
  } else if (el.classList.contains('prime')) {
    focusOn(el)
  } else if (el.classList.contains('fibonacci')) {
    focusOn(el)
  }
})

function focusOn(el) {
  const isOn = formLottery.querySelectorAll('.btn')
  const j = isOn.length
  if (el.classList.contains('on')) {
    el.classList.remove('on')
    focus = ''
  } else {
    for (let i = 0; i < j; i++) {
      const k = isOn[i] === el ? 'add' : 'remove'
      isOn[i].classList[k]('on')
    }
    const extra = formLottery.querySelector('.on')
    if (extra.classList.contains('even')) focus = 'even'
    else if (extra.classList.contains('odd')) focus = 'odd'
    else if (extra.classList.contains('prime')) focus = 'prime'
    else {
      focus = 'fibonacci'
    }
  }
}

function formData() {
  const formData = new FormData(formLottery)

  let maxRoll = parseInt(formData.get('max_roll'))
  let numberRoll = parseInt(formData.get('num_roll'))

  display = document.querySelector('.num_roll')

  if (maxRoll < numberRoll) {
    numberRoll = maxRoll
    display.value = maxRoll
    alert(`'number of rolls' > 'highest number'`)
  }

  const rolls = randomNumber(maxRoll, numberRoll)

  result.textContent = rolls[0]
  for (let i = 1; i < rolls.length; i++) {
    result.appendChild(document.createTextNode(',  ' + rolls[i]))
  }
}

function randomNumber(max, number) {
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
    for (let i = 3; i <= max; i++) {
      for (let j = 0; j < base.length; j++) {
        if (i % base[j] === 0) {
          break
        }
        if (j === base.length - 1) {
          base.push(i)
        }
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
    display.value = number
    alert(`'number of rolls' > 'possible numbers'`)
  }

  for (let i = 0; i < number; i++) {
    roll = Math.round(Math.random() * (base.length - 1) + 1)

    bet.push(base.splice(roll - 1, 1))
  }

  bet.sort((a, b) => a - b)

  return bet
}
