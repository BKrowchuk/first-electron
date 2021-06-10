const { desktopCapturer, remote } = require('electron');
const {Menu} = remote;

// Buttons 
const videoElement = document.getElementById("video");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const videoSelectBtn = document.getElementById("videoSelectBtn");
videoSelectBtn.onclick= getVideoSources;


// Get the available video sources
async function getVideoSources() {
    const inputSources = await desktopCapturer.getSources({
        types: ['window', 'screen']
    });

    const videoOptionsMenus = Menu.buildFromTemplate(
        inputSources.map(source => {
            return{
                label: source.name,
                click: () => selectSource(source)
            };
        })
    );
    videoOptionsMenus.popup();
}

// async function selectSource(source) {
//     videoSelectBtn.innerText = source.name;

//     const constraints = {
//         audio: false,
//         video: {
//             mandatory: {
//                 chromeMediaSource: 'desktop',
//                 chromeMediaSourceId: source.id
//             }
//         }
//     };

//     const stream = await navigator.mediaDevices
//         .getUserMedia(constraints);
    
//     videoElement.srcObject = stream;
//     videoElement.onplay();
// }