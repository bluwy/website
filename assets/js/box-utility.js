function AutoRadioToClass(targetSelector, radiosParentSelector) {
  const btns = document.querySelectorAll(targetSelector)
  let prev = ''
  const radioClick = function(evt) {
    const radioValue = evt.target.value
    if (radioValue !== prev) {
      btns.forEach(function(btn) {
        btn.classList.remove(prev)
        btn.classList.add(radioValue)
        prev = radioValue
      })
    }
  }
  document.querySelectorAll(radiosParentSelector + ' input[type=radio]').forEach(function(radio) {
    if (radio.checked) { prev = radio.value }
    radio.addEventListener('click', radioClick)
  })
}

function AutoCheckboxToClass(targetSelector, checkboxParentSelector) {
  const btns = document.querySelectorAll(targetSelector)
  const checkboxClick = function(evt) {
    btns.forEach(function(btn) {
      btn.classList.toggle(evt.target.value)
    })
  }
  document.querySelectorAll(checkboxParentSelector + ' input[type=checkbox]').forEach(function(checkbox) {
    checkbox.addEventListener('click', checkboxClick)
  })
}
