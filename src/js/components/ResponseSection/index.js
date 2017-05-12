import apiCofig from '../../../api-list.json'

export const ResponseSectionHtml = () => {
	return `
		<section class="response-section">

		</section>`;
}

//side effects
export const ResponseSectionActions = (state, lastState) => {
	const responseNode = document.querySelector('.response-section')
	if(state.currentApiIndex !== lastState.currentApiIndex) {
		responseNode.textContent = apiCofig.apis[state.currentApiIndex].title
	}
	if(state.format !== lastState.format) {
		responseNode.textContent = `${apiCofig.apis[state.currentApiIndex].title}?format=${state.format}`
	}
}
