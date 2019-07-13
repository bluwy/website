// Slide button
const slideBtns = document.querySelectorAll('.btn-slide')
let prevSlideDirection = document.querySelector('#btn-slide-options input[type=radio]:checked').value
document.querySelectorAll('#btn-slide-options input[type=radio]').forEach(function(radio) {
  radio.addEventListener('click', function(e) {
    slideBtns.forEach(function(btn) {
      btn.classList.remove(prevSlideDirection)
      btn.classList.add(radio.value)
      prevSlideDirection = radio.value
    })
  })
})

// Line button
const lineBtns = document.querySelectorAll('.btn-line')
let prevLinePosition = document.querySelector('#btn-line-options input[type=radio]:checked').value
document.querySelectorAll('#btn-line-options input[type=radio]').forEach(function(radio) {
  radio.addEventListener('click', function() {
    lineBtns.forEach(function(btn) {
      btn.classList.remove(prevLinePosition)
      btn.classList.add(radio.value)
      prevLinePosition = radio.value
    })
  })
})

// Pulse button
const pulseBtns = document.querySelectorAll('.btn-pulse')
document.querySelector('#btn-pulse-options #pulse-fill').addEventListener('click', function(e) {
  console.log(e)
  pulseBtns.forEach(function(btn) {
    btn.classList.toggle(e.target.value)
  })
})
