import styles from './Step.module.css'
import Copy from './Copy.jsx'

export default function Step({steps, toClipBoard}){

  return (<div>
      {
        steps.map((step, indx ) =>
        <div key={indx} className={styles.block}>
          { step.legend &&
            (<>
              <div className={styles.legend}>
                <div>
                  {step.svg}
                  <strong dangerouslySetInnerHTML={{__html:step.legend}} /> 
                </div> 
                <Copy onClick={()=>toClipBoard(step.clipboard)}/>
              </div>
              <pre>
                <code dangerouslySetInnerHTML={{__html:step.cmd}} />
              </pre>
            </>)
          }
        </div>)
      }
  </div>)
}
