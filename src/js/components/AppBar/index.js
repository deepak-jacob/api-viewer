import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

//TODO move this to ajax call so as we dont need a build each time
//when we change api configs
import apiCofig from '../../../api-list.json'

//template
export const AppBarHtml = ({ children }) => ({
  children: `
    <header>
      <a href="#menu" class="menu-three-dot">Menu</a>
      <div>${apiCofig.title}</div>
      <div class="dropdown-menu">
        ${children}
      </div>
    </header>`
})

//thunk observable
export const AppBarObservable = () =>
  Observable
    .fromEvent(document, 'click')
    .map(stateReducer)

//reducer
const stateReducer = event => state => {
  const isClickedToggle = event.target.matches('header .menu-three-dot')
  return Object.assign({}, state, {
    navigationOpen: isClickedToggle ? !state.navigationOpen : false
  });
}

//side effects
export const AppBarActions = (state, lastState) => {
  if (state.navigationOpen !== lastState.navigationOpen) {
    const ele = document.querySelector('header .dropdown-menu');
    state.navigationOpen ? ele.classList.add('show') : ele.classList.remove('show')
  }
}


