import styles from './FlipButton.module.css'
import OnSVG from './OnSVG.jsx'
import OffSVG from './OffSVG.jsx'

export default function FlipButton({name, value, flip}){
  return (<div 
    name={name} 
    value={value} 
    onClick={()=>flip(name)} 
  > 
    { 
      value==='1'
        ? <OnSVG fill="MediumSeaGreen" size="50px" cls={styles.on} />
        : <OffSVG fill="gray" size="50px"  cls={styles.off} /> 
    } 
  </div>)
}
