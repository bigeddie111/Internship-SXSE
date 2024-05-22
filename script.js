const myAudio = document.getElementById("myAudio")
const videoElement = document.querySelectorAll('.screen');
const progressBars = document.querySelectorAll('.progress');
let soundClicked = false;
const closeButton = document.querySelector('#closeButton');
const downloadButton = document.querySelector("#download")
const mainElement = document.querySelector('#main');
let currentScreen = 0;
soundButton = document.getElementById('soundButton');
let click = 0;
const body = document.getElementById("body");
let clickedDownload = false;

//Timeout function
function sounds() {
    // setTimeout(function(){}, 5);
    if (soundClicked) {
       soundClicked = false;
       return true;
    } else {
        return false;
    }
}

//Function to change screen to right
function changeRight() {
    if (currentScreen >= videoElement.length) {
        currentScreen = 0;
        videoElement.forEach((video) => {
                video.classList.remove('active');
                video.classList.add('hidden');
        });
        progressBars.forEach((progress) => {
            progress.classList.remove('done');
        }); 

        videoElement[0].classList.remove('hidden');
        videoElement[0].classList.add('active');
        progressBars[0].classList.add('done');
        videoElement[0].play();
        videoElement[0].muted = false;
        return;

    }


    let active = false
    videoElement.forEach((video) => {
        if (video.classList.contains('active')) {
            active = true
            video.classList.remove('active');
            video.classList.add('hidden');
            video.muted = true;
            return;
        }

        if (active) {
            video.classList.remove('hidden');
            video.classList.add('active');
            active = false
            video.play();
            let done = false;
            progressBars.forEach((progress) => {
                if (progress.classList.contains('done')) {
                    done = true;
                    return
                }
                if (done) {
                    progress.classList.add('done');
                    done = false;
                    return
                }

            })

        }

    });
}

//Function to change screen to left
function changeLeft() {
    if (currentScreen < 0) {
        currentScreen = videoElement.length - 1;
    }

    videoElement.forEach((video, index) => {
        if (index === currentScreen) {
            video.classList.remove('hidden');
            video.classList.add('active');
            video.play();
            let done = false;
            progressBars.forEach((progress, pIndex) => {
                if (pIndex <= index) {
                    progress.classList.add('done');
                } else {
                    progress.classList.remove('done');
                }
            });
        } else {
            video.classList.remove('active');
            video.classList.add('hidden');
            video.muted = true;
        }
    });
}

//Sound Button functionality
soundButton.addEventListener('click', function() {
    soundClicked = !soundClicked; // Toggle soundClicked value
    myAudio.muted = !myAudio.muted; // Toggle audio mute
    // Change sound button image
    if (myAudio.muted) {
        soundButton.src = "./assets/mute.png";
        myAudio.muted = true;
    } else {
        soundButton.src = "./assets/sound.png";
        myAudio.muted = false;
    }
});

//Close Button functionality
closeButton.addEventListener('click', function() {
    mainElement.style.display = 'none';
});

//Code to Avoid changing screens on clicking download button
downloadButton.addEventListener('mouseleave', () => {
  clickedDownload = false;                             
})

downloadButton.addEventListener("mouseover", () => {
    clickedDownload = true
})

//Mulitple actions on clicking the screen
document.addEventListener("click", (event) => {
    click = click + 1;

    const bounding = mainElement.getBoundingClientRect();
    const bleft = bounding.left;
    const bright = bounding.right;
    const leftend =  bleft + bounding.width/2;

    //Moves the screen left or right based on which side of the mainElement is clicked
    if (event.clientX > bleft && event.clientX < leftend){
        currentScreen--;
        if (sounds()) {
            return;
        }
        changeLeft();

    } else if ((event.clientX < bright && event.clientX > leftend) && (clickedDownload == false)) {
        console.log(clickedDownload);
        currentScreen++;
        if (sounds()){
        return;
        }
        changeRight();
        } 

    //Makes sure the screens video doesn't play on multiple clicks outside the main body 
    if (click === 1){
        myAudio.play();
        videoElement.forEach(videoElement => {
            videoElement.play();
        })
    } 
})


//Changes Screens on Right Arrow
document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowRight") {
    myAudio.play();
    currentScreen++;

    if (sounds()){
        return;
    }

   changeRight();

    }
});


//Changes Screens on Left Arrow
document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowLeft") {
        myAudio.play();
        currentScreen--;

        if (sounds()) {
            return;
        }

        changeLeft();
    }
});
