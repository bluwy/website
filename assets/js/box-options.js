document.querySelectorAll('.box').forEach(function(box) {
  const toggle = box.querySelector('.box-options-toggle')
  const options = box.querySelector('.box-options')

  if (toggle !== null && options !== null) {
    toggle.addEventListener('click', function() {
      options.classList.toggle('hide')
    })
  }
})
