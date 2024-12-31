export default function Step({steps, toClipBoard}){

  return (<>
      {
        steps.map((step) =>
        <div key={step.legend}>
         <h6 className='text-muted'   dangerouslySetInnerHTML={{__html:step.legend}}></h6>
         <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:step.cmd}}></code></pre>
        </div>)
      }
  </>)
}
