
import React, {useEffect, useState} from "react";
import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";

type MusicPlayerProps={
    themeColor: string,
    themeName: string,
    playing: boolean,
    themePlaylist: string
}


function MusicPlayer(props:MusicPlayerProps){
    //TODO - currently only plays previews - refactor this to authenticate and play whole songs
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
                // event for changing playlist
                document.querySelectorAll('.theme-button').forEach(
                  episode => {
                    episode.addEventListener('click', () => {
                        let uri = episode.id
                        EmbedController.loadUri(uri)
                    });
                  })
                  // event for stopping/starting playlist
                  document.querySelector('#timer-toggle')?.addEventListener('click', ()=>{
                    EmbedController.togglePlay()
                  })
              };
              IFrameAPI.createController(element, options, callback)
          }
  })
    return(
        <div style={{backgroundColor: props.themeColor}}>
            <SpotifyPlayer/>
        </div>
    )

}
export default MusicPlayer