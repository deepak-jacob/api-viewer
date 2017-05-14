import { Observable } from 'rxjs/Observable'
import apiCofig from '../../../api-list.json'
import 'rxjs/add/observable/fromEvent'

//template
export const NavigationHtml = () => ({
  children: `
    <div class="user-actions">
      ${apiCofig.apis.map((ele, index) => `
        <a href="#apilist" data-index="${index}">${ele.title}</a>
      `)}
    </div>`
})

//thunk observable
export const NavigationObservable = () =>
  Observable
    .fromEvent(document.querySelector('.user-actions'), 'click')
    .filter((event) => {
      event.preventDefault()
      return event.target && event.target.nodeName.toLowerCase() == 'a'
    })
    .map((event) => event.target.dataset.index)
    .map(stateReducer)

//reducer
const stateReducer = action => state => {
  const newState = Object.assign({}, state)
  newState.currentApiIndex = action
  return newState
}
