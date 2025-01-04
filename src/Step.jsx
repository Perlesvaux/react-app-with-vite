import styles from './Step.module.css'
import Copy from './Copy.jsx'

export default function Step({steps, toClipBoard}){

  return (<div style={{width:'90vh'}}>
      {
        steps.map((step, indx ) =>
        <div key={indx}>
          { step.legend &&
            (<>
              <div className={styles.legend}>
                {step.svg}
                <div dangerouslySetInnerHTML={{__html:step.legend}} /> 
              </div>
              <pre>
                <code dangerouslySetInnerHTML={{__html:step.cmd}} />
                <Copy onClick={()=>toClipBoard(step.clipboard)}/>
              </pre>
            </>)
          }
        </div>)
      }
  </div>)
}
