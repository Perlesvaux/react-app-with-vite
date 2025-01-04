import styles from './Copy.module.css'
import CopySVG from './CopySVG.jsx'
import CheckSVG from './CheckSVG.jsx'

import {useState} from 'react'
export default function Copy({ onClick }){

  const [svg, setSvg] = useState(true)

  function flipped(){
    setSvg(false)
    setTimeout(() => setSvg(true), 1492); // Change back after 2 seconds
  }
  
  return svg 
  ? <CopySVG 
      className={styles.copy} 
      fill="silver" 
      size="33px" 
      onClick={()=>{onClick(); flipped()}} 
    /> 
  : <CheckSVG 
      fill="palegreen" 
      size="33px" 
    />
}
