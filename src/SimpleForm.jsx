import styles from './SimpleForm.module.css'

const optn = `${styles.optn} text-center badge text-bg-dark fs-6`
const pwafield = `${styles.optn} text-center badge text-bg-light fs-6`
const container = `${styles.container} container text-bg-dark`
const spaced = {justifyContent:'space-between'}

export default function SimpleForm({getInput, parseUrl, state}){

  return (<>
      <div className={container}>
        <label htmlFor="parseUrl" className={state.pwaPlug==='1' ? pwafield : optn } style={spaced}>Enter the URL to your GitHub repo
          <input type="text" name="parseUrl" onChange={getInput} onKeyUp={parseUrl}  value={state.parseUrl} /> 
        </label>
        <label htmlFor="devPort" className={optn} style={spaced}>Development PORT 
          <input type="text" name="devPort" onChange={getInput} value={state.devPort}/> 
        </label>
        <label htmlFor="prePort" className={optn} style={spaced}>Preview PORT 
          <input type="text" name="prePort" onChange={getInput} value={state.prePort}/> 
        </label>
        <label htmlFor="devEnv" className={optn} style={spaced}>URL to Development backend
          <input type="text" name="devEnv" onChange={getInput} value={state.devEnv}/> 
        </label>
        <label htmlFor="proEnv" className={optn} style={spaced}>URL to Production backend 
          <input type="text" name="proEnv" onChange={getInput} value={state.proEnv}/> 
        </label>
        <label htmlFor="pwaPlug" className={optn} style={spaced}>Will this be a PWA? 
          <label> NO <input type="radio" id="pwaPlug0" name="pwaPlug" value="0"  onChange={getInput} checked={state.pwaPlug === '0'} /></label>
          <label> YES <input type="radio" id="pwaPlug1" name="pwaPlug" value="1"  onChange={getInput} checked={state.pwaPlug === '1'}/></label>
        </label>
    {
      state.pwaPlug==='1' && 
      (<>
        <label htmlFor="name" className={pwafield} style={spaced}> PWA Name: 
          <input type="text" name="name" onChange={getInput} value={state.name}/> 
        </label>
        <label htmlFor="shortName" className={pwafield} style={spaced}>PWA Short Name: 
          <input type="text" name="shortName" onChange={getInput} value={state.shortName}/> 
        </label>
        <label htmlFor="themeColor" className={pwafield} style={spaced}>PWA Theme Color: 
          <input type="text" name="themeColor" onChange={getInput} value={state.themeColor}/> 
        </label>
        <label htmlFor="description" className={pwafield} style={spaced}>PWA Description: 
          <input type="text" name="description" onChange={getInput} value={state.description}/> 
        </label>

      </>)
    }
      </div>

  </>)

}
