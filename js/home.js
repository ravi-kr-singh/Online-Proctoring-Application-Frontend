var questionDiv = document.getElementById('question');
var answer = document.getElementById('answer');
var btn = document.getElementById('btn');
var modal = document.getElementById('modal');
var startBtn = document.getElementById('start');

var questionP = document.getElementById('q')
var ask = [
	{
		question: 'What is s the primary difference between process and thread?'
	},
	{
		question: 'List out different OOPS principles?'
	},
	{
		question: 'What is an abstract class?'
	},
	{
		question: 'Distinguish between constructor and method'
	},
	{
		question: 'List out Layers of OSI Model'
	}
];
var score = document.getElementById('score');
var scoreNb = 0;
var number = 0;

var modalHeader = document.getElementById('modal-header');
var headerH2 = modalHeader.querySelector('h2');
var correction = document.getElementById('correction');

var changeChances = 3
document.addEventListener('visibilitychange', function(){
	if (changeChances==0){
		alert("Ending Test");
		endGame();
	}
	else{
		// document.title = document.visibilityState;
		alert("WARNING: You have switched tab, this can lead to disqualification");
		changeChances--;
		// console.log(document.visibilityState);
	}
});

function startGame() {
	questionDiv.style.display = 'block';
	answer.style.display = 'block';
	btn.style.display = 'block';
	startBtn.style.display = 'none';
	questionP.innerHTML = ask[number].question;
	score.innerHTML = scoreNb;
}

function nextQuestion() {
	if (answer.value === ask[number].answer) {
		scoreNb++;
		number++;
		score.innerHTML = scoreNb;
		questionP.innerHTML = ask[number].question;
		answer.value = '';
	} else if (number === 4) {
		finalQuestion();
	} else {
		number++;
		questionP.innerHTML = ask[number].question;
		answer.value = '';
	}
}

function finalQuestion() {
	if (answer.value === 'Green') {
		scoreNb++;
		endGame();
	} else {
		endGame();
	}
}

function endGame() {
	modal.style.display = 'block';
	headerH2.innerHTML = 'Submission Completed.';
	correction.innerHTML = 'Done!';
}

function resetGame() {
	modal.style.display = 'none';
	questionDiv.style.display = 'none';
	answer.style.display = 'none';
	btn.style.display = 'none';
	startBtn.style.display = 'block';
	answer.value = '';
	scoreNb = 0;
	number = 0;
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
			endGame();
			clearInterval(interval)
		}
	}, 1000);
}

window.onload = function () {
	var fiveMinutes = 60 * 5,
		display = document.querySelector('#time');
	startTimer(fiveMinutes, display);
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
	console.log("called")
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1hbiIsImV4cCI6MTYyMjM4MTA3MH0.6IAevd6B0kYqwcZW6qn-himwhOtLpRsUDeNPF9JKwkw");

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
