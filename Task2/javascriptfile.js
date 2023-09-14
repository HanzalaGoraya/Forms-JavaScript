const email = document.getElementById("email");
const password = document.getElementById("password");


// Function to validate the email
const validateEmail = (inputEmail)=> inputEmail.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

// Function to validate password
const validatePassword = (inputPassword) => inputPassword.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);



// Function used to display errors
const generateError = (errorName, errorMsg) =>{
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    if(errorName == "email"){
        emailError.innerText = errorMsg;    
    }else if(errorName == "password"){
        passwordError.innerText = errorMsg;
    }
}

const formValidate = (inputEmail, inputPassword) =>{
    if(!validateEmail(inputEmail)){
        emailError = "please enter a valid email address";
        generateError("email",emailError);
        return;
    }
    if(!validatePassword(inputPassword)){
        passwordError = "please enter correct password";
        generateError(generateError("password",passwordError));
        return;
    }
  
}

function signup(){

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const imageURL = document.getElementById('image').value;
    const captureImageURL = document.getElementById('photo').value;
   
    

    // Store user data in local storage (you might want to add more error handling)
    const userData = {
        firstname,
        lastname,
        email,
        password,
        address,
        phone,
        image:imageURL,
        captureImageURL:imageURL,
       
    };
    console.log(userData); 

    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirect to another page or perform further actions
    // For now, we'll just display an alert
    
}

function login(){

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

   
    

    // Store user data in local storage (you might want to add more error handling)
    const userData = {
        email,
        password,
    };
    console.log(userData); 

    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirect to another page or perform further actions
    // For now, we'll just display an alert
    
}


function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }


  (function() {

    var width = 320; // We will scale the photo width to this
    var height = 0; // This will be computed based on the input stream

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');
        

        navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function(err) {
                console.log("An error occurred: " + err);
            });

        video.addEventListener('canplay', function(ev) {
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
            }
        }, false);

        startbutton.addEventListener('click', function(e) {
            takepicture();
            e.preventDefault();
        }, false);

        clearphoto();
    }


    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);

            //video.stop();
             video.srcObject.getVideoTracks().forEach(function (track) {

                track.stop();
             }
        
  )} else {
            clearphoto();
        }
    }

   
   
    window.addEventListener('load', startup, false);
})();


