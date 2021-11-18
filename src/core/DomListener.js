import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} Component`
        )
      }
      console.log(this, method)
      // тоже самое что addEventListener
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    });
  }

  removeDOMListeners() {
    console.log('removeDL')
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      console.log(this, method)
      this.$root.off(listener, this[method])
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
