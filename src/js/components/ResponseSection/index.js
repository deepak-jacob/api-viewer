import apiCofig from '../../../api-list.json'
//import hljs from 'Highlight.js'

export const ResponseSectionHtml = () => ({
  children: `<section class="response-section"><pre></pre></section>`
})

//side effects
export const ResponseSectionActions = (state, lastState) => {
  if (state.currentApiIndex !== lastState.currentApiIndex || state.format !== lastState.format) {

    const responseNode = document.querySelector('.response-section pre')
    const api = apiCofig.apis[state.currentApiIndex];
    const conf = {}
    conf.method = api.method
    conf.headers = api.headers || {}
    if(api.body) {
      conf.body = api.body
    }

    fetch(`${api.url}?format=${state.format}`, conf)
      .then(res => res.json())
      .then(json => {
        responseNode.textContent =  JSON.stringify(json, undefined, 2)
      })
      .catch(e => {
        console.log('Handle error', e)
      })
  }
}


