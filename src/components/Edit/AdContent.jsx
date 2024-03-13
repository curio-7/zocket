import { useEffect,useState } from "react"
import { useDispatch } from "react-redux"
import { adText } from "../../app/adSlice.js"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faWandSparkles } from '@fortawesome/free-solid-svg-icons'

function AdContent() {

    const [text,setText] = useState()
    const dispatch = useDispatch()

    const textHandler = (e) => {
        setText(e.target.value)
    }

    useEffect(() =>{
        dispatch(adText(text))
    },[text,dispatch])

  return (
    <div className='flex flex-col border-2 border-slate-300 sm:w-4/5 sm:h-14 w-5/6 h-13 rounded-lg  '>
      <label className=' mx-3 mt-1 mb-1 text-slate-500 text-xs font-bold'>Ad Content</label>
      <input type="text" className='mx-3 focus:outline-none ' onChange={(e)=>textHandler(e)}/>
      {/* <FontAwesomeIcon icon={faWandSparkles} className="ml-auto mx-3 mt-[-20px] text-xs cursor-pointer" /> */}

    </div>
  )
}

export default AdContent

