import { useState } from 'react'
import './App.css'
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Step from './Step.jsx'
import SimpleForm from './SimpleForm.jsx'
import pwaTemplate from './pwaTemplate.js'

function App() {
  const [state, setState] = useState({
    usr:"USERNAME",
    rep:"REPOSITORY_NAME",
    parseUrl:"",
    devEnv:"http://localhost:3000",
    proEnv:"https://myproject.onrender.com",
    devPort:"", //5173
    prePort:"", //4173
    pwaPlug:'0',
    name:null,
    shortName:null,
    themeColor:null,
    description:null,

  })

  const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/\.]+)(\.git)?/;

  const steps = [
    { legend:'<i class="bi bi-terminal-fill fs-3"></i>  Create project', cmd: purified('bash',`npm create vite@latest`) },
    { legend:'<i class="bi bi-terminal fs-3"></i>  Add this if yours is a PWA (don\'t forget to include the three images in /public)', cmd: purified('bash',`npm install --save-dev vite-plugin-pwa`) },

    { legend: '<i class="bi bi-terminal-fill fs-3"></i>  ... cd into the project.  Setup the vite.config.js', cmd: purified('bash', `echo "import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' ${state.pwaPlug==='1' ? `\n\nimport { VitePWA } from 'vite-plugin-pwa'` : ''}

// https://vitejs.dev/config/
export default defineConfig({
  base:'/${state.rep}/', ${state.devPort && `\n\n  server: { port: ${state.devPort} },`} ${state.prePort && `\n\n  preview: { port: ${state.prePort} },`}

plugins: [react()${state.pwaPlug==='1' ? `${pwaTemplate(state)}` : ''}],
  
})" > vite.config.js`)}, 
    { legend: '<i class="bi bi-terminal-fill fs-3"></i>  ... Add these scripts', cmd : purified('bash', `npm pkg set 'scripts.predeploy'='vite build' && npm pkg set 'scripts.deploy'='gh-pages -d dist'`)},
    { legend: '<i class="bi bi-terminal-fill fs-3"></i>  ... Install this dependency' ,cmd:purified('bash', `npm install --save-dev gh-pages`) },
    { legend: '<i class="bi bi-terminal fs-3"></i> (Optional) If needed, setup environment-based configurations.', cmd:purified('bash',`echo "VITE_API_URL=${state.devEnv}" >> .env.development && echo "VITE_API_URL=${state.proEnv}" >> .env.production && echo "const apiUrl = import.meta.env.VITE_API_URL;
export default apiUrl;" >> ./src/config.js
`)},
{legend: '<i class="bi bi-filetype-jsx fs-3"></i>  (Optional) Then, import it into your src/App.jsx', cmd:purified('javascript',`//apiUrl will be ${state.devEnv} while developing locally.
// and ${state.proEnv} in production.
import apiUrl from './config'
` )},
    { legend: '<i class="bi bi-terminal-fill fs-3"></i> ... When it\'s all said and done... It\'s time to deploy!', cmd: purified('bash', `npm run deploy`) }
  ]

  const tsar_bomba = purified('bash',`echo "import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/${state.rep}/',
  plugins: [react()],
})" > vite.config.js && echo "VITE_API_URL=${state.devEnv}" > .env.development && echo "VITE_API_URL=${state.proEnv}" > .env.production && echo "const apiUrl = import.meta.env.VITE_API_URL;
export default apiUrl;" > ./src/config.js && npm pkg set 'scripts.predeploy'='vite build' && npm pkg set 'scripts.deploy'='gh-pages -d dist' && npm install --save-dev gh-pages`)


  const little_boy = purified('bash',`echo "import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/${state.rep}/',
  plugins: [react()],
})" > vite.config.js && npm pkg set 'scripts.predeploy'='vite build' && npm pkg set 'scripts.deploy'='gh-pages -d dist' && npm install --save-dev gh-pages`)


  function getInput(e){
    setState({...state, [e.target.name]:e.target.value})
  }
  
  function parseUrl(e){
    const url = state[e.target.name]
    const match = url.match(regex);
    let username = (match) ? match[1] : '' 
    let repositoryName = (match) ? match[2] : '' 
    setState({...state, usr:username, rep: repositoryName})
  }


  function purified(lng, mrkp){
    return DOMPurify.sanitize(hljs.highlight(mrkp, {language: lng}).value)
    // return DOMPurify.sanitize(mrkp)
  }


  function toClipBoard(e) {
    try {
      /* Resolved - text copied to clipboard successfully */
      navigator.clipboard.writeText(e.currentTarget.textContent);
      //console.log(e.currentTarget.textContent)
      // console.log(e.currentTarget.textContent);
    } catch (err) {
      console.error('Failed to copy: ', err);
      /* Rejected - text failed to copy to the clipboard */
    }
  }


  return (
    <>
      {console.log(state)}

      <h1 className='text-center'>Quick Start!</h1>
      <p className='text-center'>This tutorial assumes you have already setup your <strong>remote repository!</strong></p>
      
      <SimpleForm getInput={getInput} parseUrl={parseUrl} state={state}   />

      <Step steps={steps} toClipBoard={toClipBoard} />

      <h1 className='text-center'>Push it to the limit!</h1>
      <p className='text-center'> <i className="bi bi-radioactive fs-3"></i> These below can <strong>nuke</strong> some data. Use only if you're in a hurry and there's not much to lose!</p>
      <h6 className='text-muted'> <i className="bi bi-file-code-fill fs-2"></i> One-liner with the essentials. Only thing left is to run the <strong>deploy</strong> script!</h6>
      <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:little_boy}}></code></pre>



      <h6 className='text-muted'> <i className="bi bi-file-code fs-2"></i> This one also includes the <strong>optional</strong> configuration. Only for those that wanna go <strong>Full Nuclear!</strong></h6>
      <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:tsar_bomba}}></code></pre>

      <h1 className='text-center'>PWA Plugin</h1>
      <p className='text-center'> <i className="bi bi-radioactive fs-3"></i>  <strong>nuke</strong> some data. Use only if you're in a hurry and there's not much to lose!</p>
    </>
  )
}

export default App
