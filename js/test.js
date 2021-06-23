

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
    // Call submit answer api here.
    webcam.stop()
	window.location.href = 'finish_test.html';
}




function callfaceapi(image) {
	console.log("Calling FACE API")
	var myHeaders = new Headers();
	JWT_Token = localStorage.getItem('SavedToken');
	console.log(JWT_Token)
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
			alert("Api response is : " + result)
		})
		.catch(error => console.log('error', error));

	return res;
}





function dataURItoBlob(dataURI) {
	var byteString = atob(dataURI.split(',')[1]);
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}


	var blob = new Blob([ab], { type: mimeString });
	return blob;

}

function startTimer(duration, display) {
	var timer = duration, minutes, seconds;
	var interval = setInterval(function () {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.textContent = minutes + ":" + seconds;

		if(timer%60 == 0 && timer != 1800){
			let picture = webcam.snap();
			apiresponse = callfaceapi(dataURItoBlob(picture))
			console.log("Face api called and timer " + timer);
		}

		if (--timer < 0) {
			display.textContent = 0;
			endGame();
			clearInterval(interval)
		}
	}, 1000);
}

window.onload = function () {
	var fiveMinutes = 60 * 30, //30 Mins
	display = document.querySelector('#time');
	startTimer(fiveMinutes, display);
};



