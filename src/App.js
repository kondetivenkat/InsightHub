
import React,{useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App=()=>{
  const apikey = 'bda4364587dd4ae6807c5cecb98972df';
  const pageSize=5;

  const [progress, setProgress] = useState(0)
  
    return (
      <Router>
        <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
        />
        <Navbar/>
      <div className='container'>
        
        <Routes>
        <Route path="/" element={<News setProgress={setProgress}  key='home' pageSize={pageSize} apikey={apikey} country="in" category="general"/> }/> 
        <Route path="/business" element={<News setProgress={setProgress}  key='business' pageSize={pageSize} apikey={apikey} country="in" category="business"/>} /> 
        <Route path="/entartainment" element={<News setProgress={setProgress}  key='entertainment' pageSize={pageSize} apikey={apikey} country="in" category="entertainment"/>}/>  
        <Route path="/general" element={<News setProgress={setProgress}  key='general' pageSize={pageSize} apikey={apikey} country="in" category="general"/> }/> 
        <Route path="/health" element={<News setProgress={setProgress}  key='health' pageSize={pageSize} apikey={apikey} country="in" category="health"/> }/> 
        <Route path="/sports" element={ <News setProgress={setProgress}  key='sports' pageSize={pageSize} apikey={apikey} country="in" category="sports"/>}/>
        <Route path="/technology" element={<News setProgress={setProgress}  key='technology' pageSize={pageSize} apikey={apikey} country="in" category="technology"/> }/> 
        <Route path="/science" element={<News setProgress={setProgress}  key='science' pageSize={pageSize} apikey={apikey} country="in" category="science"/>}/> 
        </Routes>
      </div>
  
    </Router>
    ) 
}
export default App

