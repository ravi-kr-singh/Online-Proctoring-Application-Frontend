

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

JWT_Token = localStorage.getItem('SavedToken');


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
			alert("Api response is : " + result)
		})
		.catch(error => console.log('error', error));

	return res;
}



let picture = webcam.snap();

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

console.log(JWT_Token)
apiresponse = callfaceapi(dataURItoBlob(picture))