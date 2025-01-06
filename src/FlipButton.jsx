import styles from './FlipButton.module.css'
import OnSVG from './OnSVG.jsx'
import OffSVG from './OffSVG.jsx'

export default function FlipButton({name, value, flip, className}){
  return value==='1'
    ? <button  
        className={className}
        onClick={()=>flip(name)} 
      > 
        <OnSVG />
      </button>
    : <button
        className={styles.off} 
        onClick={()=>flip(name)} 
      >
       <OffSVG />
     </button>
         
}
