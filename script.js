const video = document.getElementById('video');
const btn = document.getElementById('button');
let mediaStream;

// Prompt to select media stream, pass to video element, then play
const selectMediaStream = async () => {
  try {
    mediaStream = await navigator.mediaDevices.getDisplayMedia();
    video.srcObject = mediaStream;
    video.onloadedmetadata = () => {
      video.play();
    };
  } catch (err) {
    console.error('Something went wrong:', err.message);
  }
};

btn.addEventListener('click', async () => {
  // If the mediaStream prompt was rejected, a click on the btn will prompt it again
  if (!mediaStream) selectMediaStream();
  else if (!document.pictureInPictureElement) {
    btn.disabled = true;
    await video.requestPictureInPicture();
    btn.disabled = false;
  } else if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
    selectMediaStream();
  }
});

// On Load
selectMediaStream();
