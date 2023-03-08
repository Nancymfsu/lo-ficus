
import React, {useEffect, useState} from "react";
import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";

type MusicPlayerProps={
    themeColor: string,
    themeName: string,
    playing: boolean,
    themePlaylist: string
}


function MusicPlayer(props:MusicPlayerProps){
    useEffect(() => {
        
    }, [props.themeName, props.themePlaylist])

    
    console.log('music player rendered')
    return(
        <div style={{backgroundColor: props.themeColor}}>
            <h3>Music {props.playing? 'should':'should not'} be playing</h3>
            <h4>Theme is {props.themeName}</h4>
            <SpotifyPlayer/>
        </div>
    )

}
export default MusicPlayer