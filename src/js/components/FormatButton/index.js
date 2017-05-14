import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/merge'

//template
export const FormatButtonHtml = () => ({
  children: `
    <form class="format-type-form">
      <button type="button" class="button-primary">json</button>
      <div class="dropdown-menu">
        <a href="#" data-action="json">json</a>
        <a href="#" data-action="xml">xml</a>
      </div>
    </form>`
})

//thunk Observable
export const FormatButtonObservable = () => Observable.merge(
  PrimaryButtonObservable(),
  FormatChangeButtonObservable()
)

const PrimaryButtonObservable = () =>
  Observable
    .fromEvent(document, 'click')
    .map(stateReducerFormatButton)

const FormatChangeButtonObservable = () =>
  Observable
    .fromEvent(document.querySelectorAll('.format-type-form .dropdown-menu a'), 'click')
    .filter((event) => {
      event.preventDefault()
      return true
    })
    .map((event) => event.target.dataset.action)
    .map(stateReducerFormat)

//reducer
const stateReducerFormatButton = (event) => state => {
  const isClickedToggle = event.target.matches('.format-type-form .button-primary')
  return Object.assign({}, state, {
    formatTypeOpen: isClickedToggle ? !state.formatTypeOpen : false
  });
}

const stateReducerFormat = formatType => state => {
  return Object.assign({}, state, {
    format: formatType
  });
}

//side effects
export const FormatButtonActions = (state, lastState) => {
  FormatButtonLabelActions(state, lastState)
  FormatButtonDropdownActions(state, lastState)
}

export const FormatButtonLabelActions = (state, lastState) => {
  if (state.format !== lastState.format) {
    const ele = document.querySelector('.format-type-form .button-primary')
    ele.textContent = state.format
  }
}

export const FormatButtonDropdownActions = (state, lastState) => {
  if (state.formatTypeOpen !== lastState.formatTypeOpen) {
    const SHOW_CLASS_NAME = 'show'
    const ele = document.querySelector('.format-type-form .dropdown-menu')
    if(state.formatTypeOpen) {
      ele.classList.add(SHOW_CLASS_NAME)
    } else {
      ele.classList.remove(SHOW_CLASS_NAME)
    }
  }
}
