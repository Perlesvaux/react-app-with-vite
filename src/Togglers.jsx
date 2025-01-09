import styles from './Togglers.module.css'
import color from './color.module.css'
import FlipButton from './FlipButton.jsx'
import {newRepo} from './purifiedText.js'
import HelpSVG from './HelpSVG.jsx'


export default function Togglers({state, flip}){
  
  return (<div className={styles.container} >

      <label htmlFor="ghpages"> 
        <article popover="" id="ghpages">
          <p>Host your project directly from your GitHub repo!</p>
          <li><a href="https://github.com/new" target="_blank"> Create a new remote repository </a> if you haven't already.</li>
          <li>Then, push your local repository</li>
          <pre> <code dangerouslySetInnerHTML={{__html:newRepo(state)}} /> </pre>
        </article>
        <span> GitHub Pages? <button className={color.ghpages} popovertarget="ghpages" ><HelpSVG  size="25px" /></button></span>
        <FlipButton name="ghpages" value={state.ghpages} flip={flip} className={color.ghpages}/>
      </label>

      <label htmlFor="backend"> 
        <article popover="" id="backend">
          <p>Environment variables (or "env" variables) are like little notes or settings your app reads when it runs.</p> 
          <p>They store things like passwords, API keys, URLs, database credentials or settings outside your code, so:</p>
          <li><strong>Keep secrets safe</strong>: You don’t have to write them directly in your code.</li>
          <li><strong>Easily change settings</strong>: Instead of editing the app, you change the variable.</li>
          <p><a href="https://vite.dev/guide/env-and-mode" target="_blank"> Find more about it here</a></p>
        </article>
        <span>Environment variables?<button className={color.envvars} popovertarget="backend"><HelpSVG size="25px"/></button></span>
        <FlipButton name="backend" value={state.backend} flip={flip} className={color.envvars}/>
      </label>

      <label htmlFor="pwaPlug" >
      <article popover="" id="pwaPlug">
        <p>A <strong>Progressive Web App</strong> (PWA) looks and feels like a regular website, but it can also act like a mobile app you can install on your phone or desktop.</p>
        <p>Key Features:</p>
        <li><strong>Offline Mode</strong>: It can work even when there's no internet (thanks to caching).</li>
        <li><strong>Installable</strong>: You can "install" it from your browser—no app store needed!</li>
        <li><strong>Low Cost</strong>: Easier and cheaper to build than separate mobile apps for each platform.</li>
        <li><strong>Fast</strong>: PWAs load quickly because they store parts of the app on your device.</li>
        <li><strong>Responsive</strong>: They look great on all devices (mobile, tablet, desktop).</li>
        <li><strong>Cross-Platform</strong>: One app works everywhere (on Android, iOS, and desktop browsers).</li>
        <li><strong>Updates Automatically</strong>: Users always see the latest version—no need to download updates</li>
      </article>
      <span>Will this be a PWA? <button className={color.pwa} popovertarget="pwaPlug"><HelpSVG size="25px"/></button> </span>
        <FlipButton name="pwaPlug" value={state.pwaPlug} flip={flip} className={color.pwa}/>
      </label>


  </div>)


}

          //<label> NO <input type="radio" id="backend0" name="backend" value="0"  onChange={getInput} checked={state.backend === '0'} /></label>
          //<label> YES <input type="radio" id="backend1" name="backend" value="1"  onChange={getInput} checked={state.backend === '1'}/></label>
