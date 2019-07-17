const boxes = document.querySelectorAll('.box .box-content[tabindex="0"]')

boxes.forEach(function(box) {
  box.addEventListener('click', function(evt) {
    if (evt.target === box) {
      box.classList.add('active')
    }
  })
  box.addEventListener('keyup', function(evt) {
    if (evt.keyCode === 13) {
      box.click()
    }
  })
})

document.addEventListener('click', function(evt) {
  boxes.forEach(function(box) {
    if (box.classList.contains('active') && !box.contains(evt.target)) {
      box.classList.remove('active')
    }
  })
})
