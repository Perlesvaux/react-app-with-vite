import styles from './Togglers.module.css'
import color from './color.module.css'
import FlipButton from './FlipButton.jsx'


export default function Togglers({state, flip}){
  
  return (<div className={styles.container} >

      <label htmlFor="ghpages"  > <abbr title="Host your project directly from your GitHub repo!">GitHub Pages?</abbr> 
        <FlipButton name="ghpages" value={state.ghpages} flip={flip} className={color.ghpages}/>
      </label>

      <label htmlFor="backend" > <abbr title="i.e.: API keys, URLs, database credentials">Environment variables?</abbr> 
        <FlipButton name="backend" value={state.backend} flip={flip} className={color.envvars}/>
      </label>

      <label htmlFor="pwaPlug" > <span>Will this be a <abbr title="Progresive Web App: A web app with offline features that can be installed locally">PWA</abbr>? </span>
        <FlipButton name="pwaPlug" value={state.pwaPlug} flip={flip} className={color.pwa}/>
      </label>


  </div>)


}

          //<label> NO <input type="radio" id="backend0" name="backend" value="0"  onChange={getInput} checked={state.backend === '0'} /></label>
          //<label> YES <input type="radio" id="backend1" name="backend" value="1"  onChange={getInput} checked={state.backend === '1'}/></label>
