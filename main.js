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
  

//As of today, June 1st 2023, I am feeling unbearable emotionnal distress.
//Life is currently painful, and going on is worse than hell. But I'm still here.
//May Artemis gaze upon my struggle and grant me the strength to go on, for my pain is unbearable.

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
  }, 250);
  

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

  try {
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

  catch {
    quoteDiv = document.getElementById("quoteOfTheDay");
    quoteDiv.style.backgroundImage = "url('static.gif')";

  }
}
getNewQuote();

setInterval(getNewQuote,30000);

$(function() {
  $(".sticky-note").draggable();
});

function createStickyNote() {
  const textarea = $("<textarea>", { id: "stickyNote", class: "sticky-note", placeholder: "Write something.." });

  // Enable dragging functionality using jQuery UI draggable
  textarea.draggable({
    cancel: ".editable", // Exclude the textarea from being draggable
    containment: "window" // Limit dragging within the window
  });

  // Handle mouse events for dragging, editing, and deletion
  textarea.mousedown(function(event) {
    if (event.which === 3) {
      // Right-click to enable dragging
      $(this).addClass("draggable");
    } else if (event.which === 1 && !$(this).hasClass("draggable")) {
      // Left-click to start editing
      $(this).addClass("editable");
    }
  }).mouseup(function(event) {
    if (event.which === 3) {
      // Right-click to disable dragging
      $(this).removeClass("draggable");
    } else if (event.which === 1) {
      // Left-click to stop editing
      $(this).removeClass("editable");
    }
  }).draggable({
    containment: "window"
  });

  // Make the trash can a droppable target
  $("#trash-can").droppable({
    accept: ".sticky-note", // Only accept elements with the "sticky-note" class
    drop: function(event, ui) {
      // Delete the dropped sticky note
      ui.draggable.remove();
    }
  });

  $("body").append(textarea);
}

function saveStickyNotes() {
  const stickyNotes = $(".sticky-note");

  // Create an array to store the note data
  const notesData = [];

  // Iterate over each sticky note
  stickyNotes.each(function() {
    const note = $(this);
    const noteId = note.attr("id");
    const noteText = note.find("textarea").val();
    const notePosition = note.position();

    // Create an object with note data
    const noteData = {
      id: noteId,
      text: noteText,
      position: {
        left: notePosition.left,
        top: notePosition.top
      }
    };

    // Add the note data to the array
    notesData.push(noteData);
  });

  // Store the notes data in localStorage
  localStorage.setItem("stickyNotes", JSON.stringify(notesData));

  console.log("Saved the sticky notes bosslady!");
}





function createStickyNote(noteId, noteText, notePosition) {
  const stickyNote = $("<div>", { id: noteId, class: "sticky-note" });
  const textarea = $("<textarea>", { class: "sticky-note-text", placeholder: "Write something.." });

  // Set the note text if provided
  if (noteText) {
    textarea.val(noteText);
  }

  // Set the note position if provided
  if (notePosition) {
    stickyNote.css({ left: notePosition.left, top: notePosition.top });
  }

  stickyNote.append(textarea);
  $("body").append(stickyNote);
}



function clearStickyNotes() {
  // Remove all sticky notes from the DOM
  $(".sticky-note").remove();

  // Clear the saved sticky notes from localStorage
  localStorage.removeItem("stickyNotes");

  console.log("Cleared the sticky notes!");
}

function removeStickyNoteFromStorage(noteId) {
  const stickyNotesDataJson = localStorage.getItem("stickyNotes");
  if (stickyNotesDataJson) {
    const stickyNotesData = JSON.parse(stickyNotesDataJson);

    // Remove the sticky note data from the object using the note ID as the key
    delete stickyNotesData[noteId];

    // Convert the updated sticky notes data to JSON string
    const updatedStickyNotesDataJson = JSON.stringify(stickyNotesData);

    // Store the updated sticky notes data in localStorage
    localStorage.setItem("stickyNotes", updatedStickyNotesDataJson);
  }

  console.log("Removed sticky note from storage:", noteId);
}





function whatIWantLoaded() {
  getNewQuote();
  //loadStickyNotes();
}

window.onload = whatIWantLoaded();