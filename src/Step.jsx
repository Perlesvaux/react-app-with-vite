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
              <pre><code onClick={()=>toClipBoard(step.clipboard)} className='text-start btn btn-dark' dangerouslySetInnerHTML={{__html:step.cmd}}></code></pre>
            </>)
          }
        </div>)
      }
  </div>)
}
