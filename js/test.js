

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
    
	var myHeaders = new Headers();
	JWT_Token = localStorage.getItem('SavedToken');
	myHeaders.append("Authorization", JWT_Token);

	const data = '{"Answer1":"John", "age":30, "car":null}'
	var data = {};
    data.ans1 = $('#ans1').val();
	data.ans2 = $('#ans2').val();
	data.ans3 = $('#ans3').val();
	data.ans4 = $('#ans4').val();
	data.ans5 = $('#ans5').val();
   

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		dataType: "json",
		data: JSON.stringify(data)
		
	};

	
	fetch("https://nmnrna.pythonanywhere.com/submit", requestOptions)
		.then(response => response.json())
		.then(result => {
			
            console.log('answers submitted to server :', result);
			webcam.stop()
			window.location.href = 'finish_test.html';
            
		})
		.catch(error => {
			console.log('error', error)
			webcam.stop()
			window.location.href = 'finish_test_fail.html';
		});


	

}


warnings = 0;


function callfaceapi(image) {

	var myHeaders = new Headers();
	JWT_Token = localStorage.getItem('SavedToken');
	console.log("JWT Token"+JWT_Token)
	myHeaders.append("Authorization", JWT_Token);

	var formdata = new FormData();
	formdata.append("image", image, "my.jpeg");

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formdata,
		redirect: 'follow'
	};

	
	fetch("https://nmnrna.pythonanywhere.com/face", requestOptions)
		.then(response => response.text())
		.then(result => {
			console.log("face call api result : " + result)
			apiresponse = result

			if(apiresponse !="face ok,no mobile"  ){
				warnings++;
				
				let alertmsg;
				if(apiresponse == "no face,mobile detected"){
					alertmsg = " Mobile detected and also no face detected."
				}
				else if(apiresponse == "more than one face,mobile detected"){
					alertmsg = " More than one face detected and also mobile detected."
				}
				else if(apiresponse == "face not ok,mobile detected"){
					alertmsg = "face is not correct and also mobile detected."
				}
				else if(apiresponse == "face ok,mobile detected"){
					alertmsg = "Mobile detected."
				}
				else if(apiresponse == "no face,no mobile"){
					alertmsg = "No face detected."
				}
				else if(apiresponse == "more than one face,no mobile"){
					alertmsg = "More than one face detected."
				}
				else if(apiresponse == "face not ok,no mobile"){
					alertmsg = "face is not correct."
				}
				else{
					alertmsg = "unknown response";
				}
				alert("Warning : " + alertmsg)
				if(warnings == 4){
					submitTest();
				}
			}


			
		})
		.catch(error => console.log('error', error));

	
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

		if( (timer%30 == 0  && timer!=1800) || timer == 1785){
			let picture = webcam.snap();
			callfaceapi(dataURItoBlob(picture))
		
			console.log("Face api called at Timer :  " + timer);
			
			
		}

		if (--timer < 0) {
			display.textContent = 0;
			submitTest();
			clearInterval(interval)
		}
	}, 1000);
}

window.onload = function () {
	var fiveMinutes = 60 * 30, //30 Mins
	display = document.querySelector('#time');
	startTimer(fiveMinutes, display);
};



