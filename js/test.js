
var changeChances = 5
document.addEventListener('visibilitychange', function(){
	if (changeChances==0){
		alert("Ending Test");
		submitTest();
	}
	else{
		// document.title = document.visibilityState;
		alert("WARNING: You have switched tab, this can lead to disqualification");
		changeChances--;
		 console.log(changeChances);
	}
});




function submitTest() {
	window.location.href = 'finish_test.html';
}



function startTimer(duration, display) {
	var timer = duration, minutes, seconds;
	var interval = setInterval(function () {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.textContent = minutes + ":" + seconds;

		if (--timer < 0) {
			display.textContent = 0;
			submitTest();
			clearInterval(interval)
		}
	}, 1000);
}

window.onload = function () {
	var time_for_test = 60 * 30, //30 Mins
		display = document.querySelector('#time');
	startTimer(time_for_test, display);
};

// const webcamElement = document.getElementById('webcam');
// const canvasElement = document.getElementById('canvas');
// const webcam = new Webcam(webcamElement, 'user', canvasElement);
// webcam.start()
//   .then(result =>{
//     console.log("webcam started");
// 	console.log("in")
// 	callfaceapi(result.snap())
//   })
//   .catch(err => {
//     console.log(err);
// });
function dataURItoBlob(dataURI) {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	var byteString = atob(dataURI.split(',')[1]);

	// separate out the mime component
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);

	// create a view into the buffer
	var ia = new Uint8Array(ab);

	// set the bytes of the buffer to the correct values
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	// write the ArrayBuffer to a blob, and you're done
	var blob = new Blob([ab], { type: mimeString });
	return blob;

}


(function () {

	var width = 320; // We will scale the photo width to this
	var height = 0; // This will be computed based on the input stream

	var streaming = false;

	var video = null;
	var canvas = null;
	// var photo = null;
	// var startbutton = null;

	function startup() {
		video = document.getElementById('video');
		canvas = document.getElementById('canvas');
		// photo = document.getElementById('photo');
		// startbutton = document.getElementById('startbutton');

		navigator.mediaDevices.getUserMedia({
			video: true,
			audio: false
		})
			.then(function (stream) {
				video.srcObject = stream;
				video.play();
			})
			.catch(function (err) {
				console.log("An error occurred: " + err);
			});

		video.addEventListener('canplay', function (ev) {
			if (!streaming) {
				height = video.videoHeight / (video.videoWidth / width);

				if (isNaN(height)) {
					height = width / (4 / 3);
				}

				video.setAttribute('width', width);
				video.setAttribute('height', height);
				canvas.setAttribute('width', width);
				canvas.setAttribute('height', height);
				streaming = true;
				var chances = 2;
				interval = setInterval(() => {
					console.log("in set interval")
					var context = canvas.getContext('2d');
					if (width && height) {
						canvas.width = width;
						canvas.height = height;
						context.drawImage(video, 0, 0, width, height);

						var data = canvas.toDataURL('image/png');
						apiresponse = callfaceapi(dataURItoBlob(data))
						setTimeout(() => {
							
						}, 1000*20);
						if(apiresponse!=2){
							chances--;
						}
						console.log("api response is"+apiresponse+" and chances left are"+ chances)
						if(chances==0){
							console.log("ending game as student cheated / spoofed")
							clearInterval(interval)
							endGame()
						}
					}
				}, 1000 * 60);

			}
		}, false);

		console.log("a")

		// setInterval(() => {
		// 	console.log("in set interval")
		// 	var context = canvas.getContext('2d');
		// 	if (width && height) {
		// 		canvas.width = width;
		// 		canvas.height = height;
		// 		context.drawImage(video, 0, 0, width, height);

		// 		var data = canvas.toDataURL('image/png');
		// 		callfaceapi(data)
		// 	} 
		// }, 1000*60);

		// startbutton.addEventListener('click', function(ev) {
		// 	takepicture();
		// 	ev.preventDefault();
		// }, false);

		// clearphoto();
	}


	// function clearphoto() {
	// 	var context = canvas.getContext('2d');
	// 	context.fillStyle = "#AAA";
	// 	context.fillRect(0, 0, canvas.width, canvas.height);

	// 	var data = canvas.toDataURL('image/png');
	// 	photo.setAttribute('src', data);
	// }

	// function takepicture() {
	// 	var context = canvas.getContext('2d');
	// 	if (width && height) {
	// 		canvas.width = width;
	// 		canvas.height = height;
	// 		context.drawImage(video, 0, 0, width, height);

	// 		var data = canvas.toDataURL('image/png');
	// 		photo.setAttribute('src', data);
	// 	} else {
	// 		clearphoto();
	// 	}
	// }

	window.addEventListener('load', startup, false);

})();

function callfaceapi(image) {
	console.log("Calling FACE API")
	var myHeaders = new Headers();
	myHeaders.append("Authorization", JWT_Token);

	var formdata = new FormData();
	formdata.append("image", image, "my.jpeg");

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formdata,
		redirect: 'follow'
	};

	var res = 0;
	fetch("https://nmnrna.pythonanywhere.com/face", requestOptions)
		.then(response => response.text())
		.then(result => {
			console.log(result)
			res = result
			alert("api response is: " + result)
		})
		.catch(error => console.log('error', error));

	return res;
}

function readURL(input) {
	console.log("readurl called")
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#blah')
				.attr('src', e.target.result)
				.width(150)
				.height(200);
		};

		reader.readAsDataURL(input.files[0]);
		callfaceapi(input.files[0])
	}
}
