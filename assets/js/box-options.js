const boxes = document.querySelectorAll('.box .box-content')

boxes.forEach(function(box) {
  const toggle = box.querySelector('.box-options-toggle')

  if (toggle !== null) {
    toggle.addEventListener('click', function() {
      box.classList.toggle('active')
    })
  }
})

document.addEventListener('click', function(evt) {
  boxes.forEach(function(box) {
    if (box.classList.contains('active') && !box.contains(evt.target)) {
      box.classList.remove('active')
    }
  })
})
