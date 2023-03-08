import React, { useEffect, useState } from 'react';
import {FaLeaf, FaCoffee, FaHeadphones} from 'react-icons/fa'
import Clock from '../Clock/Clock'
import MusicPlayer from '../MusicPlayer/MusicPlayer';

export enum Theme{
  Coffee = 'coffee',
  Forest = 'forest',
  Focus = 'focus'
}

function Timer(){
  const [count, setCount] = useState(0)
  const [timerStatus, setTimerStatus] = useState(false)
  const [theme, setTheme] = useState<Theme>(Theme.Coffee)
  const [themeColor, setThemeColor] = useState('grey')
  const [themeIcon, setThemeIcon] = useState(<FaCoffee/>)
  const [themePlaylist, setThemePlaylist] = useState('spotify:artist:1dABGukgZ8XKKOdd2rVSHM')
  
  useEffect(()=>{
    // this does the countdown
      const interval = setInterval(()=>{
        if(timerStatus && count > 0){
          setCount(count-1)
        }
      }, 1000)
    return () => {
      clearInterval(interval);
    }
  }, [timerStatus, count])

  useEffect(()=>{
    // play audio when timer running
    // TODO - fix bug where changing themes causes music to stop but timer to keep going
    let uri = themePlaylist
    var element = document.getElementById(uri);
    if(timerStatus){
      let event = new Event('dblclick');
      element?.dispatchEvent(event);
    } else {
      let event = new Event('change');
      element?.dispatchEvent(event);
    }
  },[timerStatus, themePlaylist])

  // set the theme
  useEffect(()=>{
    //TODO - refactor this into theme objects
    if(theme === Theme.Coffee){
     setThemeColor('black')
     setThemeIcon(<FaCoffee/>)
     setThemePlaylist('spotify:artist:1dABGukgZ8XKKOdd2rVSHM')
    }
    if(theme === Theme.Forest){
      setThemeColor('green')
      setThemeIcon(<FaLeaf/>)
      setThemePlaylist('spotify:playlist:7Mcg7fPQaM2e5SIIRrVWeZ')
    }
    if(theme === Theme.Focus){
      setThemeColor('blue')
      setThemeIcon(<FaHeadphones/>)
      setThemePlaylist('spotify:playlist:37i9dQZF1DX5trt9i14X7j')
    }

  }, [theme])  



  return (
    <div style={{backgroundColor: themeColor}}>
      <div id={'theme-selector'} style={{flexDirection:'row'}}>
        {/* TODO - refactor this into a map function that iterates on themes */}
          <button className='theme-button' onClick={()=>setTheme(Theme.Coffee)} id='spotify:artist:1dABGukgZ8XKKOdd2rVSHM' style={{backgroundColor: theme === Theme.Coffee? 'grey': 'white'}}><FaCoffee/></button>
          <button className='theme-button' onClick={()=>setTheme(Theme.Focus)} id='spotify:playlist:37i9dQZF1DX5trt9i14X7j' style={{backgroundColor: theme === Theme.Focus? 'grey': 'white'}}><FaHeadphones/></button>
          <button className='theme-button' onClick={()=>setTheme(Theme.Forest)} id='spotify:playlist:7Mcg7fPQaM2e5SIIRrVWeZ' style={{backgroundColor: theme === Theme.Forest? 'grey': 'white'}}><FaLeaf/></button>
      </div>
      <div data-testid="Timer">
      </div>
      <div style={{flexDirection:'row'}}>
         {/* TODO - refactor this into a map function that iterates on timers */}
      <button onClick={()=>setCount(5*60)}>5 min</button>
      <button onClick={()=>setCount(10*60)}>10 min</button>
      <button onClick={()=>setCount(15*60)}>15 min</button>
      <button onClick={()=>setCount(count+60)}>Add time</button>
      <button id='timer-toggle' onClick={()=>setTimerStatus(!timerStatus)}>{timerStatus? 'Stop' :'Start'}</button>
      </div>
      <Clock time={count} theme={themeColor}/>
      <MusicPlayer themeColor={themeColor} themeName={theme} playing={timerStatus} themePlaylist={themePlaylist}/>
    </div>
  )
}



export default Timer;
