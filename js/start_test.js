function snackbarfunction2() {
  document.getElementById('snackbar2').style ="visibility:visible;";
	var x = document.getElementById("snackbar2");
	x.className = "show";
	document.getElementById('test_page').style ="display:none;";

}



function requestFullScreen(element) {
  // Supports most browsers and their versions.
  
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

  if (requestMethod) { // Native full screen.
      requestMethod.call(element);
      
  } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
          wscript.SendKeys("{F11}");
         
      }
  }
}

var elem = document.documentElement; // Make the body go full screen.

function startGame() {
  document.getElementById('start_test_page').style ="display:none;";
  document.getElementById('test_page').style ="display:block;";
  requestFullScreen(elem);
  
  start_timer();

}

function enableFullScreen(){
  document.getElementById('snackbar2').style ="visibility:hidden;";
  document.getElementById('test_page').style ="display:block;";
  requestFullScreen(elem);
}


if (document.addEventListener)
{
  
 document.addEventListener('fullscreenchange', exitHandler, false);
 document.addEventListener('mozfullscreenchange', exitHandler, false);
 document.addEventListener('MSFullscreenChange', exitHandler, false);
 document.addEventListener('webkitfullscreenchange', exitHandler, false);
}

function exitHandler()
{
  if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
 {
   
      snackbarfunction2();
 
 }
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
