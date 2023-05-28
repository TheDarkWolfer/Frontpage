function displayClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    const clock = `${hours}:${minutes}:${seconds}`;
  
    document.getElementById('clock').innerHTML = clock;

    //format the date in "day name, day number, month name, year"
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
    const day = dayNames[date.getDay()];

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const dayNumber = date.getDate();

    const dateDisplay = `${day}, ${dayNumber} ${month} ${year}`;
    document.getElementById('date').innerHTML = dateDisplay;
  }
  
  // Update the clock every hundredth of a second
  setInterval(displayClock, 100);
  
// const slideshowContainer = document.querySelector('.slideshow-container');

//   // Function to create the slideshow
// function createSlideshow(images) {
//     let index = 0;

//     // Function to change the image
//     function changeImage() {
//       const image = images[index];

//       // Create an img element
//       const img = document.createElement('img');
//       img.classList.add('slideshow-image');
//       img.src = image;

//       // Remove the previous image
//       const previousImage = slideshowContainer.querySelector('.slideshow-image');
//       if (previousImage) {
//         previousImage.remove();
//       }

//       // Add the new image
//       slideshowContainer.appendChild(img);

//       // Increment the index
//       index = (index + 1) % images.length;

//       // Schedule the next image change after 3 seconds
//       setTimeout(changeImage, 5000);
//     }

//     // Start the slideshow
//     changeImage();
//   }

//   // Fetch the images from the subfolder
//   fetchImagesFromSubfolder('./images')
//     .then(images => {
//       // Create the slideshow using the fetched images
//       createSlideshow(images);
//     })
//     .catch(error => {
//       console.error('Error fetching images:', error);
//     });

//   // Function to fetch images from a subfolder
//   function fetchImagesFromSubfolder(subfolderPath) {
//     return new Promise((resolve, reject) => {
//       fetch(subfolderPath)
//         .then(response => response.text())
//         .then(html => {
//           const parser = new DOMParser();
//           const doc = parser.parseFromString(html, 'text/html');
//           const images = Array.from(doc.querySelectorAll('img')).map(img => img.src);
//           resolve(images);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   }

function redirectSearch(event) {
  event.preventDefault();

  const searchInput = document.getElementById('searchInput').value;
  let searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(searchInput)}`;

  // Check if the user agent contains "Tor"
  if (navigator.userAgent.includes('Tor')) {
    searchUrl = `https://3g2upl4pq6kufc4m.onion/?q=${encodeURIComponent(searchInput)}`;
  }

  window.location.href = searchUrl;
}


const placeholderTexts = [
    'Search... |',
    'sEarch... /',
    'seArch... -',
    'seaRch... \\',
    'searCh... |',
    'searcH... /',
    'search... -',
    'search... \\',
  ];
  
let currentIndex = 0;
const searchInput = document.getElementById('searchInput');
  
setInterval(() => {
    currentIndex = (currentIndex + 1) % placeholderTexts.length;
    searchInput.placeholder = placeholderTexts[currentIndex];
  }, 500);
  

  var holdTimer;

  function startHoldTimer() {
    holdTimer = setTimeout(function() {
      // Your function to be triggered after a certain hold time
      switchStreams();
    }, 600); // Adjust the time (in milliseconds) as needed
  }
  
  function stopHoldTimer() {
    clearTimeout(holdTimer);
  }
  
  //var button = document.getElementById("tv-button");
  
  //button.addEventListener("mousedown", startHoldTimer);
  //button.addEventListener("mouseup", stopHoldTimer);
  //button.addEventListener("mouseleave", stopHoldTimer);
  



const text=document.getElementById("quote");
const author=document.getElementById("author");

const quoteDiv = document.getElementById('quoteOfTheDay');

  quoteDiv.addEventListener('click', function() {
    getNewQuote();
  });

const getNewQuote = async () =>
{

    //api for quotes
    var url="https://type.fit/api/quotes";    

    // fetch the data from api
    const response=await fetch(url);
    //console.log(typeof response);
    //convert response to json and store it in quotes array
    const allQuotes = await response.json();

    // Generates a random number between 0 and the length of the quotes array
    const indx = Math.floor(Math.random()*allQuotes.length);

    //Store the quote present at the randomly generated index
    const quote=allQuotes[indx].text;

    //Store the author of the respective quote
    const auth=allQuotes[indx].author;

    if(auth==null)
    {
        author = "Anonymous";
    }

    //function to dynamically display the quote and the author
    text.innerHTML=quote;
    author.innerHTML="~ "+auth;
}
getNewQuote();

setInterval(getNewQuote,30000);



// Physics simulation parameters
const gravity = 0.5; // Gravity force
const friction = 0.9; // Friction coefficient

// Click and drag parameters
let isDragging = false;
let dragElement = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Get all elements with physics or draggable enabled
const elements = document.querySelectorAll('.physics, .draggable');

// Create an array to store element data
const elementData = [];

// Initialize element data
elements.forEach((element) => {
  const data = {
    element,
    x: 0, // Initial x position
    y: 0, // Initial y position
    vx: 0, // Initial x velocity
    vy: 0, // Initial y velocity
    tag: element.getAttribute('data-tag'), // Tag for collision handling or draggable
    isLocked: element.classList.contains('locked'), // Check if element is locked
    isDraggable: element.classList.contains('draggable'), // Check if element is draggable
  };

  element.addEventListener('mousedown', handleMouseDown);
  element.addEventListener('mouseup', handleMouseUp);

  elementData.push(data);
});

// Function to update element positions
function updatePositions() {
  elementData.forEach((data) => {
    if (!data.isLocked) {
      // Update velocity based on gravity
      data.vy += gravity;

      // Update position based on velocity
      data.x += data.vx;
      data.y += data.vy;

      // Apply friction
      data.vx *= friction;
      data.vy *= friction;

      // Prevent objects from going outside the screen
      const rect = data.element.getBoundingClientRect();
      if (data.x < 0) {
        data.x = 0;
        data.vx *= -1;
      } else if (data.x + rect.width > window.innerWidth) {
        data.x = window.innerWidth - rect.width;
        data.vx *= -1;
      }
      if (data.y < 0) {
        data.y = 0;
        data.vy *= -1;
      } else if (data.y + rect.height > window.innerHeight) {
        data.y = window.innerHeight - rect.height;
        data.vy *= -1;
      }
    }

    // Update element style
    data.element.style.transform = `translate(${data.x}px, ${data.y}px)`;
  });
}

// Function to handle collisions
function handleCollisions() {
  for (let i = 0; i < elementData.length; i++) {
    const data1 = elementData[i];

    if (!data1.isDraggable) {
      // Check collision with other elements
      for (let j = i + 1; j < elementData.length; j++) {
        const data2 = elementData[j];

        // Check if elements have the same tag for collision handling
        if (data1.tag === data2.tag) {
          const rect1 = data1.element.getBoundingClientRect();
          const rect2 = data2.element.getBoundingClientRect();

          // Detect collision
          if (
            rect1.right > rect2.left &&
            rect1.left < rect2.right &&
            rect1.bottom > rect2.top &&
            rect1.top < rect2.bottom
          ) {
            // Swap velocities for a simple bounce effect
            const tempVx = data1.vx;
            const tempVy = data1.vy;
            data1.vx = data2.vx;
            data1.vy = data2.vy;
            data2.vx = tempVx;
            data2.vy = tempVy;
          }
        }
      }
    }
  }
}

// Function to handle mouse down event
function handleMouseDown(event) {
  const target = event.currentTarget;
  const data = elementData.find((item) => item.element === target);

  if (data && data.isDraggable) {
    isDragging = true;
    dragElement = data;
    dragOffsetX = event.clientX - data.x;
    dragOffsetY = event.clientY - data.y;
  }
}

// Function to handle mouse up event
function handleMouseUp() {
  isDragging = false;
  dragElement = null;
}

// Function to handle mouse move event
function handleMouseMove(event) {
  if (isDragging && dragElement) {
    dragElement.x = event.clientX - dragOffsetX;
    dragElement.y = event.clientY - dragOffsetY;
    dragElement.element.style.transform = `translate(${dragElement.x}px, ${dragElement.y}px)`;
  }
}

// Add mouse move event listener to the document
document.addEventListener('mousemove', handleMouseMove);

// Animation loop
function animate() {
  updatePositions();
  handleCollisions();
  requestAnimationFrame(animate);
}


function whatIWantLoaded() {
  getNewQuote();
  animate();
}

window.onload = whatIWantLoaded();