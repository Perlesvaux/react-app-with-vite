import styles from './SimpleForm.module.css'
import color from './color.module.css'
//import OnSVG from './OnSVG.jsx'
//import OffSVG from './OffSVG.jsx'
//import FlipButton from './FlipButton.jsx'



export default function SimpleForm({getInput, parseUrl, state}){

  return (
      <div className={styles.container}>
        <label htmlFor="parseUrl" className={state.pwaPlug==='1' ? color.pwa : color.default } >URL to your GitHub repo
          <input type="text" name="parseUrl" onChange={getInput} onKeyUp={parseUrl}  value={state.parseUrl} /> 
        </label>
        <label htmlFor="devPort" className={color.default} >Development PORT 
          <input type="text" name="devPort" onChange={getInput} value={state.devPort}/> 
        </label>
        <label htmlFor="prePort" className={color.default} >Preview PORT 
          <input type="text" name="prePort" onChange={getInput} value={state.prePort}/> 
        </label>


      {
          state.backend==='1' &&
          (<>
        <label htmlFor="envVar" className={color.envvars} >Give your env variable a name
          <input type="text" name="envVar" onChange={getInput} value={state.envVar}/> 
        </label>
        <label htmlFor="devEnv" className={color.envvars} >URL to Development backend
          <input type="text" name="devEnv" onChange={getInput} value={state.devEnv}/> 
        </label>
        <label htmlFor="proEnv" className={color.envvars} >URL to Production backend 
          <input type="text" name="proEnv" onChange={getInput} value={state.proEnv}/> 
        </label>
          </>)
      }



    {
      state.pwaPlug==='1' && 
      (<>
        <label htmlFor="name" className={color.pwa} > PWA Name: 
          <input type="text" name="name" onChange={getInput} value={state.name}/> 
        </label>
        <label htmlFor="shortName" className={color.pwa} >PWA Short Name: 
          <input type="text" name="shortName" onChange={getInput} value={state.shortName}/> 
        </label>
        <label htmlFor="themeColor" className={color.pwa} >PWA Theme Color: 
          <input type="text" name="themeColor" onChange={getInput} value={state.themeColor}/> 
        </label>
        <label htmlFor="description" className={color.pwa} >PWA Description: 
          <input type="text" name="description" onChange={getInput} value={state.description}/> 
        </label>

      </>)
    }



      </div>

  )

}
