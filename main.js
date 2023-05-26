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
    ' ',
    '|'
  ];
  
let currentIndex = 0;
const searchInput = document.getElementById('searchInput');
  
setInterval(() => {
    currentIndex = (currentIndex + 1) % placeholderTexts.length;
    searchInput.placeholder = placeholderTexts[currentIndex];
  }, 500);
  
  function switchStreams() {
    var stream1 = document.getElementById('stream1');
    var stream2 = document.getElementById('stream2');
    var streambutton = document.getElementById('stream_switch');
  
    // Check if stream1 is currently visible
    if (stream1.style.display !== 'none') {
      // Hide stream1 and show stream2
      stream1.style.display = 'none';
      stream2.style.display = 'block';
      streambutton.innerHTML = 'Lo-Fi girl';
    } else {
      // Hide stream2 and show stream1
      stream1.style.display = 'block';
      stream2.style.display = 'none';
      streambutton.innerHTML = 'Fancy view';
    }
  }

const text=document.getElementById("quote");
const author=document.getElementById("author");

const getNewQuote = async () =>
{

    //api for quotes
    var url="https://type.fit/api/quotes";    

    // fetch the data from api
    const response=await fetch(url);
    console.log(typeof response);
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

setInterval(getNewQuote,10000);

function whatIWantLoaded() {
  getNewQuote();
  switchStreams();
}



window.onload = whatIWantLoaded();