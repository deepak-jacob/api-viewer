import { Observable } from 'rxjs/Rx'

//template
export const FormatButtonHtml = () => ({
  children: `
    <form class="format-type-form">
      <button class="button-primary">json</button>
      <div class="dropdown-menu">
        <a data-action="json">json</a>
        <a data-action="xml">xml</a>
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
    .fromEvent(document.querySelector('.format-type-form .button-primary'), 'click')
    .map((event) => {
      event.preventDefault()
    })
    .map(stateReducerFormatButton)

const FormatChangeButtonObservable = () =>
  Observable
    .fromEvent(document.querySelector('.format-type-form .dropdown-menu a'), 'click')
    .filter((event) => {
      event.preventDefault()
    })
    .map((event) => event.target.dataset.action)
    .map(stateReducerFormat)

//reducer
const stateReducerFormat = formatType => state => {
  return Object.assign({}, state, {
    format: formatType
  });
}

const stateReducerFormatButton = () => state => {
  const SHOW_CLASS_NAME = 'show'
  const dropDownNode = document.querySelector('.format-type-form .dropdown-menu')
  const isOpen = dropDownNode.classList.contains(SHOW_CLASS_NAME)
  isOpen ? dropDownNode.classList.remove(SHOW_CLASS_NAME) : dropDownNode.classList.add(SHOW_CLASS_NAME)
  return state;
}

//side effects
export const FormatButtonActions = (state, lastState) => {
  if (state.format !== lastState.format) {
    const ele = document.querySelector('.format-type-form .button-primary')
    ele.textContent = state.format
  }
}


