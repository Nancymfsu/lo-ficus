

declare global {
    interface Window {
        onSpotifyIframeApiReady:any;
    }
}


export default function SpotifyPlayer() {
    return (
        <div>
            <div id="embed-iframe">
            </div>
        </div>
    )
  }
