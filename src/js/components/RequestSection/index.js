import apiCofig from '../../../api-list.json'

export const RequestSectionHtml = ({ children }) => ({
  children: `
    <section class="request-section">
      <aside class="request-format">
        ${children}
      </aside>
      <h1></h1>
      <div class="request-url">
        <div class="code-wrap"></div>
      </div>
    </section>`
})

//side effects
export const RequestSectionActions = (state, lastState) => {
  const title = document.querySelector('.request-section h1')
  const url = document.querySelector('.request-url div')

  if (state.currentApiIndex !== lastState.currentApiIndex) {
    title.textContent = apiCofig.apis[state.currentApiIndex].title;
  }
  if (state.format !== lastState.format) {
    url.textContent =
      apiCofig.apis[state.currentApiIndex].method + ' ' +
      apiCofig.apis[state.currentApiIndex]['url-' + state.format]
  }
}


