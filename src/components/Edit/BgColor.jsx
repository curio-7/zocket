import { useEffect,useState } from "react"
import { useDispatch } from "react-redux"
import {adBgColor} from '../../app/adSlice.js'
import { SketchPicker } from 'react-color'
import Queue from '../../utils/lastPick.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeDropper } from '@fortawesome/free-solid-svg-icons'

function BgColor() {

    const [color,setColor] = useState(); //default color is setted in store
    const [recentcolor,setRecentColor]=useState(new Queue())
    const [showpicker,setShowPicker]=useState(false)
    const [c,setc]=useState('') //for storing the color value

    const dispatch = useDispatch()

    const recentColorHandler = () => {
        let newrecentcolor=new Queue()
        newrecentcolor=Object.assign(recentcolor)
        // console.log(c)
        // console.log(color)
        if(c===color){
        return
        }
        if(Object.keys(recentcolor.array).length>=5){
            newrecentcolor.pop()
            newrecentcolor.push(color)
        }
        else{
            newrecentcolor.push(color)
        }
    
        setRecentColor(newrecentcolor)
    }

    useEffect(() => {
        dispatch(adBgColor(color))
    }, [color,dispatch])

    const handleChangeComplete = (color) => {
        setColor(color.hex)
    }

    const openEyeDropper = async () => {
        if ('EyeDropper' in window) {
            let eyeDropper = new window.EyeDropper();
            const { sRGBHex } = await eyeDropper.open();
            setColor(sRGBHex)
        }
        else{
            alert('Use Supproted Browser')
        }
    }



  return (
   <>
    <div>
        <h1 className='text-slate-500 text-sm font-bold'>Choose your color <FontAwesomeIcon icon={faEyeDropper} /></h1>
        <div className='flex mt-2 '>
            { Object.values(recentcolor.array).map((color,ind)=>(
                <div key={ind} onClick={()=>setColor(color)} style={{ backgroundColor: color }} 
                className= {` w-7 mr-2 h-7 text-lg font-bold rounded-full cursor-pointer text-center `}/>
            )) 
            }
            <div className='w-7 h-7 text-lg font-bold bg-slate-100  rounded-full cursor-pointer text-center' onClick={()=>setShowPicker(true)}>+</div>
            {
                showpicker && <div className='absolute z-10'> <div onClick={()=>{setShowPicker(false);setc(color);recentColorHandler();}} 
                className='fixed top-0 left-0 bottom-0 right-0 z-0'/> 
                <SketchPicker color={color} onChange={handleChangeComplete}/> 
                <div className='w-full border-2 bg-white border-slate-300 h-10 font-mono text-xs font-bold text-center pt-2 cursor-pointer z-20 absolute' onClick={openEyeDropper}>Pick color from this page</div>
                
                </div> 
            }
        </div> 
    </div>
   </>
  )
}

export default BgColor
