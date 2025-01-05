import { useReducer } from 'react'
//import { useReducer, useEffect } from 'react'
import styles from './App.module.css'
//import 'bootstrap-icons/font/bootstrap-icons.css';
import Step from './Step.jsx'
import SimpleForm from './SimpleForm.jsx'
import Togglers from './Togglers.jsx'
import { steps_purify, serve_purify, tsar_bomba_purify, little_boy_purify } from './purifiedText.js'

const initialState = {
    usr:"USERNAME",
    rep:"REPOSITORY_NAME",
    parseUrl:"",
    envVar:"API_URL",
    devEnv:"http://localhost:3000",
    proEnv:"https://myproject.onrender.com",
    devPort:'', //5173
    prePort:'', //4173
    pwaPlug:'0',
    backend:'0',
    ghpages:'0',
    name:'',
    shortName:'',
    themeColor:'',
    description:'',

  }

function reducer(state, action){
  switch(action.type){
    case "set":
    return { ...state, [action.field]:action.value }

  }
}

export default function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/\.]+)(\.git)?/;
  const steps = steps_purify(state)
  const serve = serve_purify()
  //const tsar_bomba = tsar_bomba_purify(state)
  //const little_boy = little_boy_purify(state)

  //useEffect(() => {
  //  function updateTheme(){
  //    const isDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches
  //    if (isDarkMode){
  //      import('highlight.js/styles/felipec.css'); // Dark mode style
  //    } else {
  //      import('highlight.js/styles/github.css'); // Light mode style
  //    }
  //  }
  //
  //  updateTheme()
  //
  //  const mediaQuery = window.matchMedia('(prefers-color-scheme:dark)')
  //  mediaQuery.addEventListener('change', updateTheme)
  //
  //  return ()=> mediaQuery.removeEventListener('change', updateTheme)
  //
  //} )
  

  
  function parseUrl(e){
    const url = state[e.target.name]
    const match = url.match(regex);
    let username = (match) ? match[1] : '' 
    let repositoryName = (match) ? match[2] : '' 
    //setState({...state, usr:username, rep: repositoryName})
    dispatch({type:'set', field:'usr', value:username })
    dispatch({type:'set', field:'rep', value:repositoryName })
  }

  function getInput(e){
    dispatch({type:'set', field:e.target.name, value:e.target.value})
  }

  function flip(field) {
    //dispatch({type:'set', field:e.currentTarget.name, value: e.currentTarget.value==='0' ? '1' : '0' })
    //dispatch({type:'set', field:e.target.name, value: e.target.value==='0' ? '1' : '0' })
    dispatch({type:'set', field:field, value:state[field] ==='0' ? '1' : '0' })

    
  }


  function toClipBoard(copied) {
    try {
      /* Resolved - text copied to clipboard successfully */
      navigator.clipboard.writeText(copied);
      console.log(copied)
      // console.log(e.currentTarget.textContent);
    } catch (err) {
      console.error('Failed to copy: ', err);
      /* Rejected - text failed to copy to the clipboard */
    }
  }


  return (
      <main className={styles.tutorial}>

      {console.log(state)}
        <section>
          <aside className={styles.menu}>
            <Togglers state={state} flip={flip}/>
            <SimpleForm getInput={getInput} parseUrl={parseUrl} state={state} flip={flip} />
          </aside>
        </section>
        
        <section> 
          <h1 className='text-center'>Quick Start!</h1>
          <p className='text-center'>This tutorial assumes you have already setup your <strong>remote repository!</strong></p>
          <Step steps={steps} toClipBoard={toClipBoard} />
          <Step steps={serve} toClipBoard={toClipBoard} />
        </section>

      </main>
  )
}




      //<h1 className='text-center'>Push it to the limit!</h1>
      //<p className='text-center'> <i className="bi bi-radioactive fs-3"></i> These below can <strong>nuke</strong> some data. Use only if you're in a hurry and there's not much to lose!</p>
      //<h6 className='text-muted'> <i className="bi bi-file-code-fill fs-2"></i> One-liner with the essentials. Only thing left is to run the <strong>deploy</strong> script!</h6>
      //<pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:little_boy}}></code></pre>
      //
      //<h6 className='text-muted'> <i className="bi bi-file-code fs-2"></i> This one also includes the <strong>optional</strong> configuration. Only for those that wanna go <strong>Full Nuclear!</strong></h6>
      //<pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:tsar_bomba}}></code></pre>
