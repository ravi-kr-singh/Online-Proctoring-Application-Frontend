function startGame() {
    window.location.href = 'test.html';
  
}

const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);



webcam.start()
  .then(result =>{
    console.log("Webcam started");
  })
  .catch(err => {
    console.log(err);
});


webcam.start();
