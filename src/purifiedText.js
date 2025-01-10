import hljs from 'highlight.js/lib/core'; // Core functionality
import javascript from 'highlight.js/lib/languages/javascript'; // JavaScript syntax
import bash from 'highlight.js/lib/languages/bash'; // Bash syntax
// Register only those languages we'll be using
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('bash', bash);

// Finally, import the css style to be used
//import 'highlight.js/styles/idea.css';
//import 'highlight.js/styles/github.css';
//import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/styles/felipec.css';




import pwaTemplate from './pwaTemplate.js'
import DOMPurify from 'dompurify';
//import hljs from 'highlight.js';

import CodeSVG from './CodeSVG.jsx'
import TerminalSVG from './TerminalSVG.jsx'
import BoltSVG from './BoltSVG.jsx'
import ObjSVG from './ObjSVG.jsx'

import styles from './color.module.css'

const size_svg = "50px";
const envvars = TerminalSVG(  { size:size_svg , className:styles.envvars } )
const pwa  = TerminalSVG(  { size:size_svg , className:styles.pwa     } )
const ghpages   = TerminalSVG(  { size:size_svg , className:styles.ghpages } )
const init           = BoltSVG(      { size:size_svg , className:styles.init    } )
const serve     = CodeSVG(      { size:size_svg , className:styles.serve   } )
const config     = ObjSVG(       { size:size_svg , className:styles.config  } )


export function steps_purify(state){

const create_vite_project = 'npm create vite@latest'
const vite_config = `echo "import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' ${state.pwaPlug==='1' ? `\n\nimport { VitePWA } from 'vite-plugin-pwa'` : ''}

// https://vitejs.dev/config/
export default defineConfig({
  base:'/${state.rep}/', ${state.devPort && `\n\n  server: { port: ${state.devPort} },`} ${state.prePort && `\n\n  preview: { port: ${state.prePort} },`}

plugins: [react()${state.pwaPlug==='1' ? `${pwaTemplate(state)}` : ''}],
  
})" > vite.config.js`
const ghpages_scripts =  `npm pkg set 'scripts.predeploy'='vite build' && \\\nnpm pkg set 'scripts.deploy'='gh-pages -d dist'`
const install_ghpages =  `npm install --save-dev gh-pages`
const include_statics_in_public = `npm install --save-dev vite-plugin-pwa`
const env_variables = `echo "VITE_${state.envVar.toUpperCase()}=${state.devEnv}" >> .env.development && \\\necho "VITE_${state.envVar.toUpperCase()}=${state.proEnv}" >> .env.production`  
const env_var = `import.meta.env.VITE_${state.envVar.toUpperCase()}`   
const deploy_cmd = `npm run deploy`

  return [
    {
      svg: init,
      legend:'Create project', 
      cmd: purified('bash', create_vite_project), 
      clipboard: create_vite_project,
    },

    { 
      svg: config,
      legend: '... cd into the project.  Setup the vite.config.js', 
      cmd: purified('bash', vite_config),
      clipboard: vite_config,
    },
    { 
      svg:ghpages,
      legend: state.ghpages==='0'? '' :  '... Add these scripts', 
      cmd: purified('bash', ghpages_scripts),
      clipboard:ghpages_scripts,
    },
    { 
      svg:ghpages,
      legend: state.ghpages==='0'? '' :  '... Install this dependency',
      cmd:purified('bash', install_ghpages),
      clipboard: install_ghpages,
    },
    { 
      svg: pwa,
      legend:state.pwaPlug==='0'? '' : 'Install this dependency (don\'t forget to include the three images in /public)', 
      cmd: purified('bash',include_statics_in_public),
      clipboard: include_statics_in_public,
    },
    { 
      svg:envvars,
      legend: state.backend==='0'? '' :  `Setup development/production env variables.`, 
      cmd:purified('bash',env_variables),
      clipboard: env_variables,
    },
    {
      svg:envvars,
      legend: state.backend==='0'? '' :  '... This variable below stores its value', 
      cmd:purified('javascript', env_var),
      clipboard: env_var,
    },
    { 
      svg:ghpages,
      legend: state.ghpages==='0'? '' :  '... When it\'s all said and done... It\'s time to deploy!', 
      cmd: purified('bash', deploy_cmd),
      clipboard: deploy_cmd,
    }
  ]


}

const vite_dev = `npm run dev -- --host`
const vite_build = `npm run build`
const vite_preview =  `npm run preview -- --host`

export function serve_purify() {
  return [
    {
      svg:serve,
      legend: 'Serve (development)',
      cmd:purified('bash', vite_dev),
      clipboard: vite_dev,
    },
    {
      svg:serve,
      legend: 'Build',
      cmd:purified('bash', vite_build),
      clipboard: vite_build,
    },
    {
      svg:serve,
      legend: 'Serve (production)',
      cmd:purified('bash', vite_preview),
      clipboard: vite_preview,  
    }
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
  return DOMPurify.sanitize(hljs.highlight(mrkp, {language: 'bash'}).value)
  //return DOMPurify.sanitize(mrkp)
// return DOMPurify.sanitize(mrkp)
}

export function newRepo(state) {
  return purified('bash', `#...Either create a new local repository on the command line
echo "# ${state.rep}" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/${state.usr}/${state.rep}.git
git push -u origin main

#...or push an existing one 
git remote add origin https://github.com/Perlesvaux/prueba2.git
git branch -M main
git push -u origin main`)
}
