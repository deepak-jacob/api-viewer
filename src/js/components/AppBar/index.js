import { Observable } from 'rxjs/Rx'
import apiCofig from '../../../api-list.json'

//template
export const AppBarHtml = (children) => {
	return `
		<header>
			<a href="#menu" class="menu-three-dot">Menu</a>
			<div>${apiCofig.title}</div>
			<div class="dropdown-menu">
				${children}
			</div>
		</header>`;
}

//thunk observable
export const AppBarObservable = () =>
	Observable
		.fromEvent(document, 'click')
		.map(stateReducer)

//reducer
const stateReducer = event => state => {
	const isClickedToggle = event.target.matches('header .menu-three-dot')
	return Object.assign({}, state, {
		navigationOpen: isClickedToggle? !state.navigationOpen: false
	});
}

//side effects
export const AppBarActions = (state, lastState) => {
	if(state.navigationOpen !== lastState.navigationOpen) {
		const ele = document.querySelector('header .dropdown-menu');
		state.navigationOpen? ele.classList.add('show'): ele.classList.remove('show')
	}
}


