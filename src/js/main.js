import '../css/main.scss'
import { Observable } from 'rxjs/Rx'

import { HeaderHtml, HeaderObservable, HeaderActions } from './containers/Header'
import { SectionHtml, SectionObservable, SectionActions } from './containers/Section'

const initState = {
  currentApiIndex: 0,
  navigationOpen: false,
  format: 'json'
}

let lastState = {
  currentApiIndex: null,
  navigationOpen: null,
  format: null
}

const root = document.getElementById('app')
root.innerHTML = `${HeaderHtml().children} ${SectionHtml().children}`

const state = Observable.merge(
  HeaderObservable(),
  SectionObservable()
).scan((state, changeFn) => changeFn(state), initState).startWith(initState)

state.subscribe((state) => {
  HeaderActions(state, lastState)
  SectionActions(state, lastState)
  lastState = state
});
