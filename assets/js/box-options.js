document.querySelectorAll('.box .box-content').forEach(function(box) {
  const toggle = box.querySelector('.box-options-toggle')

  if (toggle !== null) {
    toggle.addEventListener('click', function() {
      box.classList.toggle('active')
    })
  }
})
