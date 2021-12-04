import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

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

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Приходят изменения по тем полям, на которые есть подписка
  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn)
  // }

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
    // this.storeSub.unsubscribe()
  }
}
