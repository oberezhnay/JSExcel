import {ExcelComponent} from '@/core/ExcelComponent';
import {defaultTitle} from '../../constants';
import {$} from '../../core/dom';
import {ActiveRoute} from '../../core/routes/ActiveRoute';
import {debounce} from '../../core/utils';
import {changeTitle} from '../../redux/actions';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `              
      <input type="text" class="input" value="${title}"> 
      <div>
        <div class="button">
          <span class="material-icons" data-button="exit">
            exit_to_app
            </span>
        </div>
        <div class="button">
          <span class="material-icons" data-button="remove">
            delete_outline
            </span>
        </div>
      </div>
    `
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const decision = confirm('Do you really want to delete this table?')

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
