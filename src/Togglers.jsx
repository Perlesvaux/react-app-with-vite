import styles from './Togglers.module.css'
import FlipButton from './FlipButton.jsx'


const ghpgs = ''
const pwafield = ''
const bckndfield = ''
const spaced = {}
export default function Togglers({state, flip}){
  
  return (<div className={styles.container} >

      <label htmlFor="ghpages" className={ghpgs} style={spaced}>GitHub Pages? 
        <FlipButton name="ghpages" value={state.ghpages} flip={flip}/>
      </label>

      <label htmlFor="backend" className={bckndfield} style={spaced}>Is there a backend? 
        <FlipButton name="backend" value={state.backend} flip={flip}/>
      </label>

      <label htmlFor="pwaPlug" className={pwafield} style={spaced}>Will this be a PWA? 
        <FlipButton name="pwaPlug" value={state.pwaPlug} flip={flip}/>
      </label>


  </div>)


}

          //<label> NO <input type="radio" id="backend0" name="backend" value="0"  onChange={getInput} checked={state.backend === '0'} /></label>
          //<label> YES <input type="radio" id="backend1" name="backend" value="1"  onChange={getInput} checked={state.backend === '1'}/></label>
