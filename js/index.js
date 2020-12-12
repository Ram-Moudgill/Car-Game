const start = document.getElementById('start')
const guide = document.getElementById('guide')
const gameArea = document.querySelector('#gamearea')
const home = document.querySelector('#home')
const disValue = document.querySelector('#distance')
const petValue = document.querySelector('#petrol')
const moveValue = document.querySelector('#moves')
const petrolDiv = document.getElementById('petroldiv')
const gameBtn = document.getElementsByClassName('main__btn')
const width = window.innerWidth / 105
const gameOver = document.querySelector('#gameover')
const audio = new Audio('/sound/sound.mp3')
let y = 0
const car = document.querySelector('#car')
let petrol = 30
let moves = 0
let carPosition = 0
let endPoint = 100
const getRandom = () => {
  const petrolPump = []
  for (i = 0; i <= 4; i++) {
    petrolPump.push(
      Math.floor(Math.random() * (i * 20 - i * 20 + 10) + i * 20 + 10)
    )
  }
  return petrolPump
}
let data = []
start.addEventListener('click', () => {
  home.classList.add('hide')
  gameArea.classList.remove('hide')
  data = getRandom()
  data.map((item) => {
    petrolDiv.innerHTML += `<span  class='pump__position' style='left:${
      item * width
    }px' ><i class="fas fa-gas-pump gas-pump text-center mb-2 "></i></br>
    <span class=' font-weight-bold'>${item}Km</span></span>`
  })
})
gameBtn[0].addEventListener('click', () => {
  moves++
  moveValue.innerHTML = moves
  const step = Math.ceil(Math.random() * 6)
  petrol = petrol - step
  if (petrol <= 0) {
    audio.play()
    gameOver.classList.remove('hide')
    petrolDiv.innerHTML = ''
    car.style.left = '0px'
    petrol = 30
    carPosition = 0
    moves = 0
    y = 0
    moveValue.innerHTML = '0'
    petValue.innerHTML = '30'
    disValue.innerHTML = '0'
    setTimeout(() => {
      gameOver.classList.add('hide')
      home.classList.remove('hide')
    }, 2500)
  } else {
    carPosition += step
    if (carPosition >= data[y]) {
      petrol = petrol + 20
      audio.play()
      y++
    }
    disValue.innerHTML = carPosition
    petValue.innerHTML = petrol
    car.style.left = `${carPosition * width}px`
    let reach = document.getElementById('reached')
    if (carPosition >= endPoint) {
      gameArea.classList.add('hide')
      reach.classList.remove('hide')
      reach.innerHTML = `<h3>Reached in ${moves} Moves<h3/>`
      setTimeout(() => {
        audio.play()
        reach.classList.add('hide')
        home.classList.remove('hide')
        petrolDiv.innerHTML = ''
        car.style.left = '0px'
        petrol = 30
        carPosition = 0
        moves = 0
        y = 0
        moveValue.innerHTML = '0'
        petValue.innerHTML = '30'
        disValue.innerHTML = '0'
      }, 2500)
    }
  }
})
