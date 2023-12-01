# The Review Project

My first ever website, created using HTML, CSS, JavaScript (notes and details at the bottom).

The website features album reviews but in a much more appealing and immersive layout. It is very unpractical but creating it helped me learn the basics of HTML, CSS, and JavaScript (and it was fun).

https://jonathanramrattan.netlify.app/ 

## Installation

(using npm)

Installl dependencies: 

`npm install`

Compile the code for development and start a local server:

`npm start`

Create the build:

`npm run build`


## Demo

This demo is running on a 1920x1080 display in Google Chrome (more on the lack of optimization below)

### Homepage to Article

Homepage featuring multiple albums (only one of which is complete) to article transition

https://github.com/ramrattanjonathan/thereviewproject/assets/150748418/9047dd28-5f10-4318-8877-70ab5ef3f655

### Sample Article (Lorde's Melodrama Review)

Sample album review with unique designs and layouts for each track (disregard video compression, github video limit is 10mb)

https://github.com/ramrattanjonathan/thereviewproject/assets/150748418/64157391-1289-4d64-b985-db0bd39a87ac


## Notes & Details

### Inspirations and Design Choices

I wanted to create this website without using libraries as I felt the use of libraries would make this project way too easy and would limit my understanding of the concepts I set out to learn. Despite this, I caved in on using Lenis for smooth scrolling as I could not figure out how to recreate that effect myself (maybe in the future), but no others (GSAP is installed but never used).

I created this website to get insight on how awwwards websites are created as I was very intrigued by their designs and wanted to find out how difficult they really were to make.

The homepage slider is inspired by Aristide Benoist's portfolio here: https://aristidebenoist.com/ and Camille Mormal: https://camillemormal.com/

The design of the review itself is inspired by Root-Food: https://root-food.com/


## Optimizations

This website is not optimized for any display other than mine (1920x1080) and doesn't run very well (The chapters bug out on other devices). This is the first website I have ever created and I will use that as an excuse for now. However, I've created a list of problems/solutions that could make this run better AND scale on other displays, which I will try to incorporate in future projects:

- Creating less HTML elements (used a lot to repeat typography for style but another approach could definitely be used). (HTML)
- Creating references (href) to each article so that the browsers back button could be used for navigation. (HTML)
- Utilizing a larger variety of units (px, vw, vh, %, rem, etc) in CSS to help scale the article better on different displays. (CSS)
- Incorporating margins and padding to ensure articles scale better on different displays. (CSS)
- Using the @media property and creating a new layout for smaller screens. (CSS)
- Limiting the amount of code that runs on every animation frame. (JS)
- Utilizing objects in JavaScript to help run animations rather than using inline CSS. (JS)
- Utilizing the dataset property in HTML for indices and the likes. (HTML, JS)

  

