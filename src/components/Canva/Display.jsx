import Canvas from './Canvas'
import { useSelector } from 'react-redux'

const Display = () => {
   
  const adInfo = useSelector((state) => state.ad)
  // console.log(adInfo)
   
  return (
    <div className='sm:w-1/2 w-screen sm:h-screen h-[30rem] flex justify-center items-center  bg-gradient-to-r from-sky-300 to-sky-150'>
      
    <Canvas adInfo={adInfo}/>

    </div>
  )
}
export default Display