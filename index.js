import Lenis from '@studio-freight/lenis';

let artistNames = document.getElementsByClassName('word');
let albumNames = document.getElementsByClassName('word-album');
let index = 0;
let trackIndex = 0;
let distances = [];
let tracksArray = [];
let tracksArrayLeftDist = [];
const trailer = document.getElementById('trailer');
const track = document.getElementById("image-track");
const navTop = document.getElementById('top-nav')
const navBottom = document.getElementById('bottom-nav')
const bgImage = document.querySelector('#background-image')
const images = [...document.querySelectorAll(".img")];
const hoverImages = document.getElementsByClassName('hover-reveal-img')
const hoverReveal = document.getElementById('hover-reveal')
const articleImage = document.querySelector('.article-image');
const blank = document.getElementById('blank')
const overlay = document.getElementById('content-overlay')
const bands = [...document.querySelectorAll('.band')];
const trackOne = document.querySelector('#trackone')
const tracks = [...document.querySelectorAll('article')]
const fixedContent = document.querySelector('.fixed-container-content')
const backButton = document.querySelector('.back');
const middle = {
    x: innerWidth / 2,
    y: innerHeight / 2
};


let lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
    orientation: 'horizontal'
})

changeStyles();

const animateTrailer = (e, interacting) => {  
    const x = e.clientX - trailer.offsetWidth / 2;
    const y = e.clientY - trailer.offsetHeight / 2;

    const keyframes = {
        transform: `translate(${x}px, ${y}px) scale(${interacting ? 5 : 1})`,
    }

    const otherframes = {
        transform: `translate(${x - 160}px, ${y - 160}px)`,
    }
    
    trailer.animate(keyframes, {
        duration: 800,
        fill: 'forwards'
    })

    hoverReveal.animate(otherframes, {
        duration: 800,
        fill: 'forwards'
    })
}

window.onmousemove = e => {
    let interacting = false;

    if (index > 0 || trackIndex > 0) {
        interacting = true;
    }
    else {
        interacting = false;
    }

    animateTrailer(e, interacting)
}

track.addEventListener("mouseover", function() {
    images.forEach((img, i) => {
        if (img.matches(':hover')) {
            index = (i+1);
            changeStyles();
        }
        else if (blank.matches(':hover')) {
            index = 0;
            changeStyles();
        }
        else {
            removeStyles();  
        }     
    })
});

track.addEventListener('mouseleave', function() {
    index = 0;
    changeStyles();
})

for(const img of track.getElementsByClassName("img")) {
    img.animate({
        objectPosition: `${distanceFC(middle, img)}% 50%`
    },
    {
         fill: "forwards"
    });
}

function changeNav(percentOfScroll, colorMapStart, colorMapEnd) {
    if (percentOfScroll < 0.3)  {
        navTop.style.width = "101%";
        navTop.style.backgroundColor = `rgb(${colorMapEnd.r}, ${colorMapEnd.g}, ${colorMapEnd.b})`;
        navTop.style.transition = "1.7s ease";
        navBottom.style.width = "101%";
        navBottom.style.backgroundColor = `rgb(${colorMapEnd.r}, ${colorMapEnd.g}, ${colorMapEnd.b})`;
        navBottom.style.transition = "1.7s ease";
    }
    else { 
        navTop.style.width = `${percentOfScroll+1}%`;
        navTop.style.transition = "0.45s ease-out";
        navBottom.style.width = `${percentOfScroll+1}%`;
        navBottom.style.transition = "0.45s ease-out";
        navTop.style.backgroundColor = `rgb(
            ${mapRange(percentOfScroll, 0, 100, colorMapStart.r, colorMapEnd.r)},
            ${mapRange(percentOfScroll, 0, 100, colorMapStart.g, colorMapEnd.g)},
            ${mapRange(percentOfScroll, 0, 100, colorMapStart.b, colorMapEnd.b)})`;
        navBottom.style.backgroundColor = `rgb(
            ${mapRange(percentOfScroll, 0, 100, colorMapStart.r, colorMapEnd.r)},
            ${mapRange(percentOfScroll, 0, 100, colorMapStart.g, colorMapEnd.g)},
            ${mapRange(percentOfScroll, 0, 100, colorMapStart.b, colorMapEnd.b)}
        )`;
    }
}

function translateWords() {
    artistNames[index].style.transform = `translate(0, -25.3vh) scale(1, 1.7)`;
    albumNames[index].style.transform = `translate(0, 26vh) scale(1, 1.7)`;
}

function removebg() {
    bgImage.style.backgroundImage = 'none';
}

function changeStyles() {
    let percentOfScroll = mapRange(scrollX, 0, 2600, 0, 100)
    let colorMapEnd = {
        r: 0,
        g: 0,
        b: 0
    }
    let colorMapStart = {
        r: 0,
        g: 0,
        b: 0
    }

    artistNames[index].classList.add('hovered');
    albumNames[index].classList.add('hovered');
    if (albumNames[index].classList.contains('hovered') && (!overlay.classList.contains('active'))) {
        if (albumNames[index].classList.contains('project')) {
            translateWords();
            colorMapStart = {
                r: 20,
                g: 20,
                b: 20
            }
            colorMapEnd = {
                r: 186,
                g: 196,
                b: 184
            }
            changeNav(percentOfScroll, colorMapStart, colorMapEnd);
            trailer.style.backgroundColor = `rgb(${colorMapEnd.r}, ${colorMapEnd.g}, ${colorMapEnd.b})`
            removeStyles();
            removebg();
        }
        else if (albumNames[index].classList.contains('guts')) {
            translateWords();
            colorMapStart = {
                r: 12,
                g: 6,
                b: 46
            };
            colorMapEnd = {
                r: 221,
                g: 196,
                b: 184
            };
            changeNav(percentOfScroll, colorMapStart, colorMapEnd);
            trailer.style.backgroundColor = `rgb(${colorMapEnd.r}, ${colorMapEnd.g}, ${colorMapEnd.b})`
            bgImage.style.backgroundImage = 'url(/guts.jpg)';
            removeStyles();
        }
        else if (albumNames[index].classList.contains('mag')) {
            colorMapStart = {
                r: 27,
                g: 23,
                b: 22 
            };
            colorMapEnd = {
                r: 173,
                g: 178,
                b: 158
            };
                
            changeNav(percentOfScroll, colorMapStart, colorMapEnd);
            translateWords();
            trailer.style.backgroundColor = `rgb(185, 79, 191)`
            bgImage.style.backgroundImage = 'url(/magbaydel.jpg)';
            removeStyles();
        }
        else if (albumNames[index].classList.contains('lady')) {
            colorMapStart = {
                r: 173,
                g: 81,
                b: 28
            }
            colorMapEnd = {
                r: 69,
                g: 91,
                b: 84
            }
            changeNav(percentOfScroll, colorMapStart, colorMapEnd);
            translateWords();
            trailer.style.backgroundColor = `rgb(${colorMapEnd.r}, ${colorMapEnd.g}, ${colorMapEnd.b})`
            bgImage.style.backgroundImage = 'url(/lady.jpg)';
            removeStyles();
        }
        else if (albumNames[index].classList.contains('melodrama')) {
            colorMapStart = {
                r: 236,
                g: 164,
                b: 100
            }
            colorMapEnd = {
                r: 5,
                g: 62,
                b: 163
            }
            changeNav(percentOfScroll, colorMapStart, colorMapEnd);
            translateWords();
            trailer.style.backgroundColor = `rgb(${colorMapEnd.r}, ${colorMapEnd.g}, ${colorMapEnd.b})`
            bgImage.style.backgroundImage = 'url(/melodrama.jpeg)'
            removeStyles();
        }
        else if (albumNames[index].classList.contains('bewitched')) {
            colorMapStart = {
                r: 64,
                g: 17,
                b: 1
            }
            colorMapEnd = {
                r: 209,
                g: 209,
                b: 209
            }
            changeNav(percentOfScroll, colorMapStart, colorMapEnd);
            translateWords();
            trailer.style.backgroundColor = `rgb(${colorMapEnd.r}, ${colorMapEnd.g}, ${colorMapEnd.b})`
            bgImage.style.backgroundImage = 'url(/laufey.jpg)';
            removeStyles();
        }
        else if (albumNames[index].classList.contains('loveliest')) {
            colorMapStart = {
                r: 112,
                g: 107,
                b: 92
            }
            colorMapEnd = {
                r: 249,
                g: 216,
                b: 124
            }
            changeNav(percentOfScroll, colorMapStart, colorMapEnd);
            translateWords();
            trailer.style.backgroundColor = `rgb(${colorMapEnd.r}, ${colorMapEnd.g}, ${colorMapEnd.b})`
            bgImage.style.backgroundImage = 'url(/loveliest.webp)';
            removeStyles();
        }
}   }

function mapRange(input, inputStart, inputEnd, outputStart, outputEnd) {
    let output = 0;
    return output = (input - inputStart) * ((outputEnd - outputStart) / (inputEnd - inputStart)) + outputStart;
}

function removeStyles() {
    for(let n = 0; n < images.length + 1; n++){
        if (n !== index) {
        artistNames[n].classList.remove('hovered');
        albumNames[n].classList.remove('hovered');
        artistNames[n].style.transform = `translate(0, 0)`
        albumNames[n].style.transform = `translate(0, 0)`
        }
    }
}

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
  translateBand();
}

requestAnimationFrame(raf)

function distanceFC(mid, image) {
    let imagePosition = image.getBoundingClientRect();
    const x1 = imagePosition.left;
    const x2 = mid.x;
    const xDistance = x1 - x2;
	return mapRange(xDistance, -2600, 2165, 0, 100);
}

window.onscroll = (e) => {
    changeStyles();

    images.forEach((img, i) => {
        distances[i] = distanceFC(middle, img)
        img.animate({
            objectPosition: `${distances[i]}% 50%`,
        },
        {
            duration: 1200, fill: "forwards"
        });
    })
}

// melodrama click  ---------------------------------------------------------------------------------------------

track.addEventListener('click', () => {
    let currIndex = index - 1;
    const credits = [...document.querySelectorAll('.credits')];
    const titles = [...document.querySelectorAll('.title')];
    const article = document.querySelector('.section');

    lenis.destroy()
    bands[1].classList.add('inview1');
    bands[2].classList.add('inview2');
    bands[3].classList.add('inview3');
    bands[0].classList.add('is-sticky');
    bands[bands.length - 1].classList.add('inview4');
    

    for(let i = 0; i < images.length; i++) {
        if (i !== (currIndex)) {
            images[i].classList.add('out');
            navBottom.style.width = '0%'
            navTop.style.width = '0%'
            albumNames[i].style.transform = `translate(0, 0)`
            artistNames[i].style.transform = `translate(0, 0)`
        } 
    }

    for (let i = 0; i < credits.length; i++) {
        credits[i] = credits[i].classList.add('active')
        titles[i] = titles[i].classList.add('active');
    }

    backButton.classList.add('active');
    articleImage.classList.add('active');
    images[currIndex].classList.add('active');
    overlay.classList.add('active');
    track.classList.add('out');
    article.classList.add('active');
    trackOne.classList.add('active');
    fixedContent.scrollTo(0, 0);

    lenis = new Lenis({
        content: fixedContent,
        lerp: 0.1,
        smooth: true,
        orientation: 'horizontal'
    })
})

function translateBand() {

    for (let i = 0; i < tracks.length; i++) {
        tracksArray[i] = tracks[i].getBoundingClientRect();
        tracksArrayLeftDist[i] = mapRange(tracksArray[i].left, 0, innerWidth, 100, 0);
    }

    for (let i = 1; i < bands.length - 1; i++) {
        let isStickyLeft = [...document.querySelectorAll('.is-sticky-left')];
        if (lenis.direction == 1) {
            if ((tracksArray[i].left > 80 * (isStickyLeft.length + 1)) && (tracksArray[i].left < (innerWidth - 240))) {
                bands[i].classList.add('animating');
            }
            else {
                bands[i].classList.remove('animating');
            }
        } 
            
        else if (lenis.direction == -1) {
            if (i > 10) {
                if ((tracksArray[i].left > 80 * (isStickyLeft.length)) && (tracksArray[i].left < (innerWidth - 150))) {
                    bands[i].classList.add('animating');
                }
                else {
                    bands[i].classList.remove('animating');
                }
            }
            else if (i > 9) {
                if ((tracksArray[i].left > 80 * (isStickyLeft.length)) && (tracksArray[i].left < (innerWidth - 230))) {
                    bands[i].classList.add('animating');
                }
                else {
                    bands[i].classList.remove('animating');
                }
            }
            else {
                if ((tracksArray[i].left > 80 * (isStickyLeft.length)) && (tracksArray[i].left < (innerWidth - 310))) {
                    bands[i].classList.add('animating');
                }
                else {
                    bands[i].classList.remove('animating');
                }
            }
        }
        
        if (tracksArray[i].left < 80 * (isStickyLeft.length + 1) && (!bands[i].classList.contains('out-left'))) {
            bands[i].classList.add('is-sticky-left')
        }
    }

    for (let i = 1; i < bands.length - 1; i++) {
        if (bands[i].classList.contains('animating')) {
            bands[i].style.transition = 'transform 0ms'
            bands[i].style.transform = `translate(${(-tracksArrayLeftDist[i])}vw, 0)`
            bands[i].classList.remove('is-sticky-right');
            bands[i].classList.remove('is-sticky-left');
            if (i < 11) {
                bands[i + 1].classList.add('is-sticky-right');
                bands[i + 2].classList.add('is-sticky-right');
            }
            else if (i == 11) {
                bands[i + 1].classList.add('is-sticky-right');
            }
        }
        else if (bands[i].classList.contains('is-sticky-right')) {
            let isStickyRight = [...document.querySelectorAll('.is-sticky-right')]
            if (!isStickyRight[1].classList.contains('inview4')) {
                isStickyRight[0].style.transition = `transform 700ms ease`
                isStickyRight[0].style.transform = `translate(-240px, 0)`
                isStickyRight[1].style.transition = `transform 700ms ease`
                isStickyRight[1].style.transform = `translate(-160px, 0)`
            } 
            else {
                isStickyRight[0].style.transition = `transform 700ms ease`
                isStickyRight[0].style.transform = `translate(-160px, 0)`
                isStickyRight[1].style.transition = `transform 700ms ease`
                isStickyRight[1].style.transform = `translate(-80px, 0)`
            }
           
            if (isStickyRight.length >= 3) {
                if (!isStickyRight[2].classList.contains('inview4')) {
                    isStickyRight[2].classList.add('out-right');
                    isStickyRight[2].style.transform = `translate(${0}px, 0)`
                    isStickyRight[2].classList.remove('is-sticky-right');
                    isStickyRight.shift();
                }
            }
        }
        else if (bands[i].classList.contains('is-sticky-left')) {
            let isStickyLeft = [...document.querySelectorAll('.is-sticky-left')]

            isStickyLeft[0].style.transform = `translate(${-innerWidth + 80}px, 0)`
            if (isStickyLeft.length > 1) {
                isStickyLeft[1].style.transform = `translate(${-innerWidth + 160}px, 0)`
            }
            else if (isStickyLeft.length > 2) {
                isStickyLeft[2].style.transform = `translate(${-innerWidth + 240}px, 0)`
            }

            if (isStickyLeft.length == 3) {
                isStickyLeft[0].classList.add('out-left');
                isStickyLeft[0].style.transition = `transform 400ms ease`
                isStickyLeft[1].style.transition = `transform 400ms ease`
                isStickyLeft[2].style.transition = `transform 400ms ease`
                isStickyLeft[0].style.transform = `translate(${-innerWidth - 80}px, 0)`
                isStickyLeft[0].classList.remove('is-sticky-left');
                isStickyLeft.shift();
            }
        }
        else if (!bands[i].classList.contains('animating') && bands[i+1].classList.contains('is-sticky-right') && i > 1) {
            let outLeft = [...document.querySelectorAll('.out-left')];
            let isStickyLeft = [...document.querySelectorAll('.is-sticky-left')]
            if (outLeft.length > 0 && isStickyLeft.length < 2) {
                outLeft[outLeft.length - 1].classList.add('is-sticky-left');
                outLeft[outLeft.length - 1].classList.remove('out-left');
                outLeft.pop();
            }
        }
    }
}

for (let i = 0; i < bands.length; i++) {
    bands[i].addEventListener('click', () => {
        lenis.scrollTo(tracks[i]);
    })
    
    bands[i].addEventListener('mouseover', () => {
        hoverImages[i].style.transform = `scale(1, 1)`    
        trailer.style.opacity = `0`    
    })

    bands[i].addEventListener('mouseout', () => {
        trackIndex = 0;
        hoverImages[i].style.transform = `scale(0, 0)`
        trailer.style.opacity = `0.7`   
    })
}

backButton.addEventListener('mouseover', () => {
    trackIndex = 1;
})

backButton.addEventListener('mouseleave', () => {
    trackIndex = 0;
})

function removeImagesOut() {
    for(let i = 0; i < images.length; i++) {
        images[i].classList.remove('out');
        track.classList.remove('out');
    }
}

backButton.addEventListener('click', () => {
    const credits = [...document.querySelectorAll('.credits')];
    const titles = [...document.querySelectorAll('.title')];
    const article = document.querySelector('.section');

    lenis.destroy()

    for (let i = 0; i < bands.length; i++) {
        bands[i].classList.remove('inview1')
        bands[i].classList.remove('inview2')
        bands[i].classList.remove('inview3')
        bands[i].classList.remove('inview4')
        bands[i].classList.remove('is-sticky');
        bands[i].classList.remove('is-sticky-left');
        bands[i].classList.remove('is-sticky-right');
        bands[i].classList.remove('animating');
        bands[i].removeAttribute('style')
    }

    for (let i = 0; i < credits.length; i++) {
        credits[i] = credits[i].classList.remove('active')
        titles[i] = titles[i].classList.remove('active');
    }

    overlay.classList.remove('active');
    backButton.classList.remove('active');
    articleImage.classList.remove('active')
    article.classList.remove('active');
    trackOne.classList.remove('active');
    index = 0;
    changeStyles();

    setTimeout(removeImagesOut, 1200);

    lenis = new Lenis({
        lerp: 0.1,
        smooth: true,
        orientation: 'horizontal'
    })
})

    















