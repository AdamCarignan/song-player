export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value.icon}`
    if (binding.arg === 'full') {
      iconClass = binding.value
    }
    if (binding.value.position) {
      iconClass += ` float-${binding.value.position}`
    }
    if (binding.value.color) {
      iconClass += ` text-${binding.value.color}-400`
    }
    if (binding.value.size) {
      iconClass += ` text-${binding.value.size}`
    }
    el.innerHTML += `<i class="${iconClass}"></i>`
  }
}
