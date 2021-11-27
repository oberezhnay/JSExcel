import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    console.log(options)

    this.prepare()
  }

  // Настройка компонента до init
  prepare() {

  }

  // возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // Уведомление слушателей о событии event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // Инициализация компонента
  // Добавление DOM слушателей
  init() {
    this.initDOMListeners()
  }

  // Удаление компонента
  // Очистка слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
