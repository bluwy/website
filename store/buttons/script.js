// Slide button
AutoRadioToClass('.btn-slide', '#btn-slide-options')

// Line button
AutoRadioToClass('.btn-line', '#btn-line-options')

// Pulse button
AutoCheckboxToClass('.btn-pulse', '#btn-pulse-options')

// Highlight button
const highlightBtns = document.querySelectorAll('.btn-highlight')
highlightBtns.forEach(function(btn) {
  const highlighter = btn.querySelector('span')

  btn.addEventListener('mouseenter', function() {
    highlighter.style.opacity = '1'
  })
  btn.addEventListener('mousemove', function(evt) {
    const rect = btn.getBoundingClientRect()
    highlighter.style.left = (evt.clientX - rect.left) + 'px'
    highlighter.style.top = (evt.clientY - rect.top) + 'px'
  })
  btn.addEventListener('mouseleave', function() {
    highlighter.style.opacity = '0'
  })
})

// Tilt button
AutoRadioToClass('.btn-tilt', '#btn-tilt-options')

// Loading line button
AutoRadioToClass('.btn-loading-line', '#btn-loading-line-options')
