import { useState } from 'react'
import './App.css'
//import 'bootstrap-icons/font/bootstrap-icons.css';
import Step from './Step.jsx'
import SimpleForm from './SimpleForm.jsx'
import { steps_purify, tsar_bomba_purify, little_boy_purify } from './purifiedText.js'

export default function App() {
  const [state, setState] = useState({
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

  })

  const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/\.]+)(\.git)?/;

  const steps = steps_purify(state)

  const tsar_bomba = tsar_bomba_purify(state)

  const little_boy = little_boy_purify(state)



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


    </>
  )
}




      //<h1 className='text-center'>Push it to the limit!</h1>
      //<p className='text-center'> <i className="bi bi-radioactive fs-3"></i> These below can <strong>nuke</strong> some data. Use only if you're in a hurry and there's not much to lose!</p>
      //<h6 className='text-muted'> <i className="bi bi-file-code-fill fs-2"></i> One-liner with the essentials. Only thing left is to run the <strong>deploy</strong> script!</h6>
      //<pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:little_boy}}></code></pre>
      //
      //<h6 className='text-muted'> <i className="bi bi-file-code fs-2"></i> This one also includes the <strong>optional</strong> configuration. Only for those that wanna go <strong>Full Nuclear!</strong></h6>
      //<pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:tsar_bomba}}></code></pre>
