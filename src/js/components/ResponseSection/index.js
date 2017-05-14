import apiCofig from '../../../api-list.json'
import Prism from 'prismjs'
import 'prismjs/themes/prism-twilight.css'

//template
export const ResponseSectionHtml = () => ({
  children: `
    <section class="response-section">
      <div class="code-wrap">
        <pre><code></code></pre>
      </div>
    </section>`
})

//side effects
export const ResponseSectionActions = (state, lastState) => {
  if (state.currentApiIndex !== lastState.currentApiIndex || state.format !== lastState.format) {

    const api = apiCofig.apis[state.currentApiIndex];
    const conf = {}
    conf.method = api.method
    conf.headers = api.headers || {}
    if(api.body) {
      conf.body = api.body
    }

    fetchAPI({
        url: apiCofig.apis[state.currentApiIndex]['url-' + state.format],
        conf,
        isJSON: (state.format === 'json')
    })
  }
}

function fetchAPI({ url, conf, isJSON }) {
  let responseNode = document.querySelector('.response-section pre code')
  fetch(url, conf).then(res => {

    responseNode.innerHTML = `HTTP ${res.status} ${res.statusText}
Content-Type: ${res.headers.get("content-type")}

`
    return res.text()
  }).then(text => {
    responseNode.innerHTML +=  Prism.highlight(text, isJSON? Prism.languages.javascript: Prism.languages.xml)
  })
  .catch(e => {
    console.log('Handle error', e)
  })
}
