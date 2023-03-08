import React, { useEffect, useState } from 'react';
import {FaLeaf, FaCoffee, FaHeadphones} from 'react-icons/fa'
import Clock from '../Clock/Clock'
import SpotifyPlayer from '../SpotifyPlayer/SpotifyPlayer';

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
    // being able to reference the specific instance of the interval helps avoid duplicated timers
    // setTimer can't be cleared the same way
      const interval = setInterval(()=>{
        if(timerStatus && count > 0){
          setCount(count-1)
        }
      }, 100)
      // gotta clear the interval
    return () => {
      clearInterval(interval);
    }
  }, [timerStatus, count])

  useEffect(()=>{
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

  useEffect(()=>{
        const script = document.createElement("script")
        script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1"
        script.async = true
        document.body.appendChild(script)
        window.onSpotifyIframeApiReady = (IFrameAPI:any) => {
              let element = document.getElementById('embed-iframe')
              let options = {
                width: '90%',
                height: '400',
                uri: 'spotify:artist:1dABGukgZ8XKKOdd2rVSHM'
              };
              let callback = (EmbedController:any) => {
                document.querySelectorAll('.theme-button').forEach(
                  episode => {
                    episode.addEventListener('click', () => {
                        let uri = episode.id
                        EmbedController.loadUri(uri)
                      // click event handler logic goes here
                    });
                  })
                  document.querySelector('#timer-toggle')?.addEventListener('click', ()=>{
                    EmbedController.togglePlay()
                  })
              };
              IFrameAPI.createController(element, options, callback)
          }
  })

  return (
    <div style={{backgroundColor: themeColor}}>
      <div>

      <div id={'theme-selector'} style={{flexDirection:'row'}}>
          <button className='theme-button' onClick={()=>setTheme(Theme.Coffee)} id='spotify:artist:1dABGukgZ8XKKOdd2rVSHM' style={{backgroundColor: theme === Theme.Coffee? 'grey': 'white'}}><FaCoffee/></button>
          <button className='theme-button' onClick={()=>setTheme(Theme.Focus)} id='spotify:playlist:7Mcg7fPQaM2e5SIIRrVWeZ' style={{backgroundColor: theme === Theme.Focus? 'grey': 'white'}}><FaHeadphones/></button>
          <button className='theme-button' onClick={()=>setTheme(Theme.Forest)} id='spotify:playlist:37i9dQZF1DX5trt9i14X7j' style={{backgroundColor: theme === Theme.Forest? 'grey': 'white'}}><FaLeaf/></button>
      </div>
      </div>
      <div data-testid="Timer">
      </div>
      <div style={{flexDirection:'row'}}>
      <button onClick={()=>setCount(5*60)}>5 min</button>
      <button onClick={()=>setCount(10*60)}>10 min</button>
      <button onClick={()=>setCount(15*60)}>15 min</button>
      <button onClick={()=>setCount(count+60)}>Add time</button>
      <button id='timer-toggle' onClick={()=>setTimerStatus(!timerStatus)}>{timerStatus? 'Stop' :'Start'}</button>
      </div>
      <Clock time={count} theme={themeColor}/>
      <SpotifyPlayer/>
    </div>
  )
}



export default Timer;
