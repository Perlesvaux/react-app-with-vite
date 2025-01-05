import styles from './FlipButton.module.css'
import OnSVG from './OnSVG.jsx'
import OffSVG from './OffSVG.jsx'

export default function FlipButton({name, value, flip}){
  return value==='1'
    ? <button  
        className={styles.on} 
        onClick={()=>flip(name)} 
      > 
        <OnSVG fill="MediumSeaGreen" size="33px"  />
      </button>
    : <button
        className={styles.off} 
        onClick={()=>flip(name)} 
      >
       <OffSVG fill="AntiqueWhite" size="33px" />
     </button>
         
}
