import styles from './FlipButton.module.css'
import OnSVG from './OnSVG.jsx'
import OffSVG from './OffSVG.jsx'

export default function FlipButton({name, value, flip}){
  return (value==='1'
        ? <OnSVG fill="MediumSeaGreen" size="50px" cls={styles.on} 
            name={name} 
            value={value} 
            onClick={()=>flip(name)} 
        />
        : <OffSVG fill="gray" size="50px"  cls={styles.off} 
            name={name} 
            value={value} 
            onClick={()=>flip(name)} 
        />)
}
