import './App.css'
import Box from './components/Edit/Box'
import Display from './components/Canva/Display'
import { Provider } from 'react-redux'
import {store} from './app/store.js'

function App() {

  return (
    <Provider store={store}>
      <div className='flex flex-col sm:flex-row w-screen'>
    
      <Display/>
      <Box/>

      </div>
    </Provider>
  )
}

export default App
