import styles from './Copy.module.css'
import CopySVG from './CopySVG.jsx'
import CheckSVG from './CheckSVG.jsx'

import {useState} from 'react'
export default function Copy({ onClick }){

  const [svg, setSvg] = useState(
    <CopySVG 
      className={styles.copy} 
      fill="silver" 
      size="33px" 
      onClick={onClick}  
    />
  )


function flipped (){
    setSvg(
      <CheckSVG
        fill="palegreen"
        size="33px"
      />
    )
    setTimeout(() => setSvg(
      <CopySVG 
        className={styles.copy} 
        fill="silver" 
        size="33px" 
        onClick={onClick}  
      />
    ), 2000); // Change back after 2 seconds
  }

  
  return <button onClick={flipped}> {svg} </button>
}
