import '../css/main.scss'
import { Observable } from 'rxjs/Rx'
//import apiConfig from '../api-list.json'

import {
	HeaderHtml,
	HeaderObservable,
	HeaderActions
} from './containers/Header'
import {
	SectionHtml,
	SectionObservable,
	SectionActions
} from './containers/Section'

const initState = {
	currentApiIndex: 0,
	navigationOpen: false,
	format: 'json'
}

const root = document.getElementById('app')
root.innerHTML = `${HeaderHtml(initState)} ${SectionHtml(initState)}`

const state = Observable.merge(
	HeaderObservable(),
	SectionObservable()
).scan((state, changeFn) => changeFn(state), initState);

let lastState = initState
state.subscribe((state) => {
	HeaderActions(state, lastState)
	SectionActions(state, lastState)
	lastState = state
});
