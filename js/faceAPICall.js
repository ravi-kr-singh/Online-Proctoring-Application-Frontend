function callfaceapi(image) {
    console.log("called")
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1hbiIsImV4cCI6MTYyMjMwNzI4M30.Li-ujBuV_iGBXyCycFYpwtiN4KrgGTVgI1N-3uZQXXY");

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
            console.log(result)
            alert("api response is: "+ result)
        })
        .catch(error => console.log('error', error));
}

function readURL(input) {
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