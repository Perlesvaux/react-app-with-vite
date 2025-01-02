import pwaTemplate from './pwaTemplate.js'
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export function steps_purify(state){


  return [
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


}



export function tsar_bomba_purify (state){ 
  return purified('bash',`echo "import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
base:'/${state.rep}/',
plugins: [react()],
})" > vite.config.js && echo "VITE_API_URL=${state.devEnv}" > .env.development && echo "VITE_API_URL=${state.proEnv}" > .env.production && echo "const apiUrl = import.meta.env.VITE_API_URL;
export default apiUrl;" > ./src/config.js && npm pkg set 'scripts.predeploy'='vite build' && npm pkg set 'scripts.deploy'='gh-pages -d dist' && npm install --save-dev gh-pages`) 
}


export function little_boy_purify (state) { 
 return purified('bash',`echo "import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
base:'/${state.rep}/',
plugins: [react()],
})" > vite.config.js && npm pkg set 'scripts.predeploy'='vite build' && npm pkg set 'scripts.deploy'='gh-pages -d dist' && npm install --save-dev gh-pages`)
}




function purified(lng, mrkp){
  return DOMPurify.sanitize(hljs.highlight(mrkp, {language: lng}).value)
// return DOMPurify.sanitize(mrkp)
}

