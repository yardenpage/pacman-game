//music
var backgroundMusic;
var deadMusic;
var eatFruitMusic;
var lifeMusic;
var timeMusic;
var gameoverMusic;
backgroundMusic = new Audio("sounds/MardyBum.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = .25;
backgroundMusic.load(); 
deadMusic= new Audio("sounds/pacman_death.wav");
deadMusic.volume = .25;
deadMusic.load();
eatFruitMusic= new Audio("sounds/pacman_eatfruit.wav");
eatFruitMusic.volume = .25;
eatFruitMusic.load();
lifeMusic= new Audio("sounds/pacman_life.wav");
lifeMusic.volume = .25;
lifeMusic.load();
timeMusic= new Audio("sounds/pacman_eattime.wav");
timeMusic.volume = .25;
timeMusic.load();
gameoverMusic= new Audio("sounds/pacman_intermission.wav");
gameoverMusic.volume = .25;
gameoverMusic.load();

// local storage contains a ×©×× test2017
if (typeof (Storage) !== "undefined") {
    localStorage.setItem("a","a");
    localStorage.setItem("test2017","test2017");  
}
else {
    swal("Not supports");
}


$(document).ready(function(){
       $('#sendRegister').click(function() {
        if ($('#register-form').valid()) {
			  var password=document.getElementById("pwd1").value;
             var name=document.getElementById("username").value;
            addUser(name, password);
             }
    });
		//valid jQuery
$.validator.addMethod('strongPassword', function(value,element){
    return /\d/.test(value)&&/[a-zA-Z]/i.test(value);
},'your password must be combination of numbers and letters.')

//method check the last and first names are just letters.
$.validator.addMethod('justLetters', function(value,element){
    return /[a-zA-Z]/i.test(value);
},'your name must include just letters.')


$("#register-form").validate({
    rules:{
        username: "required",
        pwd1: {
        strongPassword:true,
        required:true,
        minlength: 8 
        },
        pwd2:{
            strongPassword:true,
            required:true,
            minlength: 8 
        },
        firstname:{
            required:true,
            justLetters:true
            }, 
        lastname:{
            required:true,
            justLetters:true
            }, 
        mail: {
            required:true,
            email: true
        },
    },
        messages:{
            username: "Please enter an username",
        pwd1: {
            required:"Please enter a password",
            minlength:"Your password must be at least 8 characters"
            },
        pwd2: {
            required:"Please enter your password again",
            },
        firstname:{
            required:"Please enter your First Name"
        }, 
        lastname:{
            required:"Please enter your Last Name"
        }, 
        mail: {
            required:"Please enter an email",
            email: "Please enter a valid Email"
            },
        }

});

    $("#formin").validate({
    rules:{
        usernamein:"required",
        passwordin:"required"
    },
    messages:{
        usernamein: "Please enter your username",
        passwordin: "Please enter your password"
    }

});
		
});

	
















function WelcomeClick(){
	if(!backgroundMusic.paused){
	backgroundMusic.pause();
	backgroundMusic.currentTime=0;
	}
	window.clearInterval(interval);
window.clearInterval(ghostInterval);
window.clearInterval(Mouthopen);
    document.getElementById('Welcome').style.display='inline-block';
    document.getElementById('Welcome').style.visibility='visible';
    document.getElementById('inrollmentPage').style.display='none';
    document.getElementById('inrollmentPage').style.visibility='hidden';
    document.getElementById('loginPage').style.display='none';
    document.getElementById('loginPage').style.visibility='hidden';
    document.getElementById('aboutPage').style.display='none';
    document.getElementById('aboutPage').style.visibility='hidden';
    document.getElementById('game').style.display='none';
    document.getElementById('game').style.visibility='hidden';
    document.getElementById('Choose').style.display='none';
    document.getElementById('Choose').style.visibility='hidden';
} 
function InrollmentClick() {
	if(!backgroundMusic.paused){
	backgroundMusic.pause();
	backgroundMusic.currentTime=0;
	}
		window.clearInterval(interval);
window.clearInterval(ghostInterval);
window.clearInterval(Mouthopen);
	document.getElementById('inrollmentPage').style.display='inline-block';
                            document.getElementById('inrollmentPage').style.visibility='visible';
                            document.getElementById('Welcome').style.display='none';
                            document.getElementById('Welcome').style.visibility='hidden';
                            document.getElementById('loginPage').style.display='none';
                            document.getElementById('loginPage').style.visibility='hidden';
                            document.getElementById('aboutPage').style.display='none';
                            document.getElementById('aboutPage').style.visibility='hidden';
                            document.getElementById('game').style.display='none';
                            document.getElementById('game').style.visibility='hidden';
                            document.getElementById('Choose').style.display='none';
                            document.getElementById('Choose').style.visibility='hidden';
                           } 
function LoginClick() {
	if(!backgroundMusic.paused){
	backgroundMusic.pause();
	backgroundMusic.currentTime=0;
	}
		window.clearInterval(interval);
window.clearInterval(ghostInterval);
window.clearInterval(Mouthopen);
    document.getElementById('loginPage').style.display='inline-block';
    document.getElementById('loginPage').style.visibility='visible';
    document.getElementById('Welcome').style.display='none';
    document.getElementById('Welcome').style.visibility='hidden';
    document.getElementById('inrollmentPage').style.display='none';
    document.getElementById('aboutPage').style.display='none';
    document.getElementById('aboutPage').style.visibility='hidden';
    document.getElementById('game').style.display='none';
    document.getElementById('game').style.visibility='hidden';
    document.getElementById('Choose').style.display='none';
    document.getElementById('Choose').style.visibility='hidden';
} 
function AboutClick() {
	if(!backgroundMusic.paused){
	backgroundMusic.pause();
	backgroundMusic.currentTime=0;
	}
		window.clearInterval(interval);
window.clearInterval(ghostInterval);
window.clearInterval(Mouthopen);
    document.getElementById('aboutPage').style.display='inline-block';
    document.getElementById('aboutPage').style.visibility='visible';
    document.getElementById('Welcome').style.display='none';
    document.getElementById('Welcome').style.visibility='hidden';
    document.getElementById('loginPage').style.display='none';
    document.getElementById('loginPage').style.visibility='hidden';
    document.getElementById('inrollmentPage').style.display='none';
    document.getElementById('inrollmentPage').style.visibility='hidden';
    document.getElementById('game').style.display='none';
    document.getElementById('game').style.visibility='hidden';
    document.getElementById('Choose').style.display='none';
    document.getElementById('Choose').style.visibility='hidden';
    document.getElementsByClassName("close")[0].onclick=function() {
        document.getElementById('aboutPage').style.display = "none";
    } 
    window.onclick = function(event) {
        if (event.target == document.getElementById('aboutPage')) {
            document.getElementById('aboutPage').style.display = 'none';
        }
    }
}
function GameClick() {
	if(!backgroundMusic.paused){
	backgroundMusic.pause();
	backgroundMusic.currentTime=0;
	}
		window.clearInterval(interval);
window.clearInterval(ghostInterval);
window.clearInterval(Mouthopen);
    document.getElementById('game').style.display='inline-block';
    document.getElementById('game').style.visibility='visible';
    document.getElementById('Welcome').style.display='none';
    document.getElementById('Welcome').style.visibility='hidden';
    document.getElementById('loginPage').style.display='none';
    document.getElementById('loginPage').style.visibility='hidden';
    document.getElementById('inrollmentPage').style.display='none';
    document.getElementById('inrollmentPage').style.visibility='hidden'; 
    document.getElementById('Choose').style.display='none';
    document.getElementById('Choose').style.visibility='hidden';
    startnewgame();
}   
function ChooseClick() {
    document.getElementById('Choose').style.display='inline-block';
    document.getElementById('Choose').style.visibility='visible';
    document.getElementById('Welcome').style.display='none';
    document.getElementById('Welcome').style.visibility='hidden';
    document.getElementById('loginPage').style.display='none';
    document.getElementById('loginPage').style.visibility='hidden';
    document.getElementById('inrollmentPage').style.display='none';
    document.getElementById('inrollmentPage').style.visibility='hidden'; 
    document.getElementById('game').style.display='none';
    document.getElementById('game').style.visibility='hidden';
}  

//add user to local storage
function addUser(name, password)
{
    if (typeof(Storage) !== "undefined")
    {
        localStorage.setItem(name, password);
        swal("Registreation suceess");                
    }
    else{
        swal("Not supports");
    }
	WelcomeClick();
return false;
}

//login exist user
function LogincheckUserAndPassword(username, password)
{
	if(username.length==0 || password.length==0)
	{
		 swal("Username or password are blank!");
	}
	else{
    var pass = localStorage.getItem(username);
    if (pass==undefined)
    {
        swal("The user name is not exist!");
    }
    else 
    {
        if (pass!= password)
        {
            swal("The password is not correct!");					
        }
        else 
        {
            swal("You signin succefully!");
            lblName.value=username;
            ChooseClick();
          
        }
    }
	}
			  return false;
}
function DisplayGame(quantity, point5, point15, point25, time, ghosts){
    GhostNum=ghosts.value;
    GameTime=time.value;
    color5=point5.value;
    color15=point15.value;
    color25=point25.value;
    cnt=quantity.value;
    GameClick();
    return false;
}

//game
           