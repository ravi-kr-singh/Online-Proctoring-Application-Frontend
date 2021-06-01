
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

const spinner = document.getElementById("spinner");

function showSpinner() {
    spinner.style ="display:block;"
  
}

function hideSpinner() {
    spinner.style ="display:none;"
   
}

var JWT_Token;

function begin() {
    showSpinner();

    var data = {};
    data.username = $('#username').val();
    data.password = $('#password').val()

    $.ajax({
        type: "POST",
        datatype:"application/json",
        url: "https://nmnrna.pythonanywhere.com/login",
       
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: (data) => { 
            // console.log(`JWT TOken : ${data}`)
            hideSpinner();
            JWT_Token =`${data}`;
            window.location.href = 'start_test.html';
           
            console.log(JWT_Token)
            
          
        },
        error: function(xhr, status, error) {
            hideSpinner();
            console.log(`ERROR`)
            document.getElementById('error-output').style ="display:block;margin:auto!important;margin: 15px 0!important;";
            document.getElementById('error-output').textContent = `Error : Username or Password not correct!`;
        }
    });
    
  

}
