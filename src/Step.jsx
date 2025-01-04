import styles from './Step.module.css'
import Copy from './Copy.jsx'

export default function Step({steps, toClipBoard}){

  return (<div style={{width:'90vh'}}>
      {
        steps.map((step, indx ) =>
        <div key={indx}>
          { step.legend &&
            (<>
              <span  style={{display:"flex", alignItems:"center" }}>
                {step.svg}
                <h6 className='text-muted' dangerouslySetInnerHTML={{__html:step.legend}}></h6> 
              </span>
              <pre><code className='text-start btn btn-dark' dangerouslySetInnerHTML={{__html:step.cmd}}></code>
                <Copy onClick={()=>toClipBoard(step.clipboard)}/>
              </pre>

            </>)
          }
        </div>)
      }
  </div>)
}
