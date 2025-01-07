import { useReducer } from 'react'
//import { useReducer, useEffect } from 'react'
import styles from './App.module.css'
//import 'bootstrap-icons/font/bootstrap-icons.css';
import pezote from '/favicon.ico'
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
            <Step steps={serve} toClipBoard={toClipBoard} />
          </aside>
        </section>
        
        <section> 
          <h1 className='text-center'>Quick Start!</h1>
          <p className='text-center'>This tutorial assumes you have already setup your <strong>remote repository!</strong></p>
          <Step steps={steps} toClipBoard={toClipBoard} />
        </section>

      </main>
  )
}
