//import css this can be splited into component level later
import '../css/main.scss'

//import only needed modules from rxjs
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/startWith'

//import child components
import { HeaderHtml, HeaderObservable, HeaderActions } from './containers/Header'
import { SectionHtml, SectionObservable, SectionActions } from './containers/Section'

// Create initial state of applicaion
const initState = {
  currentApiIndex: 0,
  navigationOpen: false,
  formatTypeOpen: false,
  format: 'json'
}

//create a null state to trigger inital updates
let lastState = {
  currentApiIndex: null,
  navigationOpen: null,
  formatTypeOpen: null,
  format: null
}

//get the app node and render all markup
const root = document.getElementById('app')
root.innerHTML = `${HeaderHtml().children} ${SectionHtml().children}`

//merge all observables from child components and
//initialize the state
const state = Observable.merge(
  HeaderObservable(),
  SectionObservable()
).scan((state, changeFn) => changeFn(state), initState).startWith(initState)

//subscribe to state changes
state.subscribe((state) => {
  HeaderActions(state, lastState)
  SectionActions(state, lastState)
  lastState = state
});
