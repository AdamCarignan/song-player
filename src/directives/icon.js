export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value}`
    if (binding.arg === 'full') {
      iconClass = binding.value
    }
    if (binding.modifiers.right) {
      iconClass += ' float-right'
    }
    if (binding.modifiers.left) {
      iconClass += ' float-left'
    }
    if (binding.modifiers.yellow) {
      iconClass += ' text-yellow-400'
    }
    if (binding.modifiers.green) {
      iconClass += ' text-green-400'
    }
    if (binding.modifiers.xl) {
      iconClass += ' text-xl'
    }
    if (binding.modifiers.l) {
      iconClass += ' text-l'
    }
    el.innerHTML += `<i class="${iconClass}"></i>`
  }
}
