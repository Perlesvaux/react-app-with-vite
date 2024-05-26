import { useState } from 'react'
import './App.css'
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [state, setState] = useState({
    usr:"USERNAME",
    rep:"REPOSITORY_NAME",
    parseUrl:"",
    devEnv:"http://localhost:3000",
    proEnv:"https://myproject.onrender.com"
  })

  const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/\.]+)(\.git)?/;

  const steps = [
    { legend:'<i class="bi bi-terminal-fill fs-3"></i>  Create project', cmd: purified('bash',`npm create vite@latest`) },

    { legend: '<i class="bi bi-terminal-fill fs-3"></i>  ... cd into the project.  Setup the vite.config.js', cmd: purified('bash', `echo "import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/${state.rep}/',
  plugins: [react()],
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

  const nuke = `echo "import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/${state.rep}/',
  plugins: [react()],
})" > vite.config.js && echo "VITE_API_URL=${state.devEnv}" > .env.development && echo "VITE_API_URL=${state.proEnv}" > .env.production && echo "const apiUrl = import.meta.env.VITE_API_URL;
export default apiUrl;" > ./src/config.js && npm pkg set 'scripts.predeploy'='vite build' && npm pkg set 'scripts.deploy'='gh-pages -d dist' && npm install --save-dev gh-pages`


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
    // return DOMPurify.sanitize(hljs.highlight(mrkp, {language: lng}).value)
    return DOMPurify.sanitize(mrkp)
  }


async function toClipBoard(e) {
  try {
    await navigator.clipboard.writeText(e.target.innerText);
    console.log(e.target.innerText);
    /* Resolved - text copied to clipboard successfully */
  } catch (err) {
    console.error('Failed to copy: ', err);
    /* Rejected - text failed to copy to the clipboard */
  }
}


  return (
    <>

      <h1 className='text-center'>Quick Start!</h1>
      <p className='text-center'>This tutorial assumes you have already <strong>pushed</strong> your local changes to your <strong>remote repository!</strong></p>
      
      <div className='flx'>
        <label htmlFor="parseUrl" className='optn text-center badge text-bg-dark fs-6'>Enter the URL to your GitHub repo
          <input type="text" name="parseUrl" onChange={getInput} onKeyUp={parseUrl}  value={state.parseUrl} /> 
        </label>
        <label htmlFor="devEnv" className='optn text-center badge text-bg-dark fs-6'>Development backend
          <input type="text" name="devEnv" onChange={getInput} value={state.devEnv}/> 
        </label>
        <label htmlFor="proEnv" className='optn text-center badge text-bg-dark fs-6'>Production backend 
          <input type="text" name="proEnv" onChange={getInput} value={state.proEnv}/> 
        </label>
      </div>
      {
        steps.map((step) =>
        <div key={step.legend}>
         <h6 className='text-muted'   dangerouslySetInnerHTML={{__html:step.legend}}></h6>
         <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:step.cmd}}></code></pre>
        </div>)
      }

      <h1 className='text-center'>Push it to the limit!</h1>
      <p className='text-center text-muted'> <i className="bi bi-radioactive fs-3"></i> This one below can <strong>nuke</strong> some data. Use only if you're in a hurry and there's not much to lose!</p>
      <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:nuke}}></code></pre>
    </>
  )
}

export default App
