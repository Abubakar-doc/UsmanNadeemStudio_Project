function hidePreloader() {
  var loader = document.getElementById("preloader");
  loader.style.display = "none";
  document.body.style.overflow = 'hidden';
}

window.addEventListener("load", function () {
  hidePreloader();
  document.body.style.overflow = '';
});

///

function removeFocus() {
  document.activeElement.blur();
}

///

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleries = document.querySelectorAll('.gallery');

  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      // Remove active class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      // Add active class to the clicked button
      this.classList.add("active");

      galleries.forEach(gallery => {
        const itemsToShow = target === "all" ? gallery.querySelectorAll(".item") : gallery.querySelectorAll(`[data-id='${target}']`);

        gallery.querySelectorAll(".item").forEach(item => {
          item.style.display = "none";
          item.classList.remove('jiggle');
        });

        itemsToShow.forEach((item, index) => {
          setTimeout(() => {
            item.style.display = "block";
            item.classList.add('jiggle');
          }, index * 50);
        });
      });
    });
  });
});

///

function adjustGalleryLayout(target) {
  const galleries = document.querySelectorAll(".portfolio-gallery");

  // Hide all galleries except the one corresponding to the clicked button
  galleries.forEach(gallery => {
    if (gallery.getAttribute('data-id') !== target) {
      gallery.style.display = "none";
    }
  });

  // Show the gallery corresponding to the clicked button
  const selectedGallery = document.querySelector(`[data-id="${target}"]`);
  if (selectedGallery) {
    selectedGallery.style.display = "grid";
    selectedGallery.querySelectorAll(".item").forEach(item => {
      item.classList.add('jiggle'); // Add jiggle class to the displayed items
    });
  }
}

// Add event listeners to the parent filter buttons
document.querySelectorAll('#parent-filter-btns .filter-btn-p').forEach(button => {
  button.addEventListener('click', function () {
    const target = this.getAttribute('data-target');

    // Remove active class from all parent buttons
    document.querySelectorAll('#parent-filter-btns .filter-btn-p').forEach(btn => {
      btn.classList.remove('active');
    });

    // Add active class to the clicked parent button
    this.classList.add('active');

    // Adjust gallery layout based on the clicked button
    adjustGalleryLayout(target);
  });
});

// Add event listeners to the parent filter buttons
document.querySelectorAll('#parent-filter-btns .filter-btn-p').forEach(button => {
  button.addEventListener('click', function () {
    const target = this.getAttribute('data-target');

    // Reset active status to "All" button
    const allButton = document.querySelector('#filter-btns .filter-btn-p[data-target="all"]');
    if (allButton) {
      allButton.classList.add('active');
    }

    // Remove active class from all parent buttons
    document.querySelectorAll('#parent-filter-btns .filter-btn-p').forEach(btn => {
      btn.classList.remove('active');
    });

    // Add active class to the clicked parent button
    this.classList.add('active');

    // Adjust gallery layout based on the clicked button
    adjustGalleryLayout(target);
  });
});

///

// Function to animate items
function animateItems(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'transform 0.5s ease-in-out'; // Set transition for smooth movement
      entry.target.style.transform = 'translateY(0)'; // Move item to its original position
      observer.unobserve(entry.target); // Stop observing once the animation is done
    }
  });
}

// Set up observer
const itemObserver = new IntersectionObserver(animateItems, {
  root: null, // Use viewport as the root
  threshold: 0.5, // Adjust the threshold (30% visibility) to trigger the animation slightly earlier
});

// Get all items and observe each one
const items = document.querySelectorAll('.item');
let animationStarted = false;

function startAnimation() {
  if (!animationStarted) {
    items.forEach(item => {
      itemObserver.observe(item);
      item.style.transform = 'translateY(5%)'; // Initially move items off-screen
    });
    animationStarted = true;
  }
}

// Start animation slightly before items are fully within the viewport
window.addEventListener('load', startAnimation);

///

window.addEventListener('scroll', function () {
  var button = document.querySelector('.back_to_top');
  var scrollHeight = window.pageYOffset;

  if (scrollHeight >= 40) {
    button.style.display = 'inline-flex';
  } else {
    button.style.display = 'none';
  }
});

///

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const targetY = section.getBoundingClientRect().top + window.pageYOffset;
    const startingY = window.pageYOffset;
    const duration = 100; // Adjust the duration as needed (in milliseconds)
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    function scrollStep() {
      const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
      const timeElapsed = currentTime - startTime;
      const scrollY = easeInOutQuad(timeElapsed, startingY, targetY - startingY, duration);
      window.scrollTo(0, scrollY);
      if (timeElapsed < duration) {
        requestAnimationFrame(scrollStep);
      }
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(scrollStep);
  }
}


function toggleDisplayof_form(FormToShow) {
  var sectionToHide = document.getElementById("section_book_session");
  var formToShow = document.getElementById(FormToShow);

  if (sectionToHide.style.display === "none") {
    sectionToHide.style.display = "block";
    formToShow.style.display = "none";
    formToShow.reset();
    redirectTo_book_session();
  } else {
    sectionToHide.style.display = "none";
    formToShow.style.display = "block";
    scrollToTopWithDelay();
  }
}

function scrollToTopWithDelay() {
  var element = document.documentElement || document.body;
  setTimeout(function () {
    element.scrollTop = 0;
  }, 300); // Adjust delay time as needed
}

///

let lastScrollTop = 0;
const navbar = document.getElementById('desk_nav');
const navbar_inside = document.getElementById('a');
let navbarHeight = navbar.offsetHeight;
const transparentRange = 50; // Adjust this value to define the range in pixels

window.addEventListener('scroll', function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scrolling down
    navbar.style.position = 'relative';
    navbar.style.transition = 'background-color 0.4s ease-in-out';
    navbar.style.visibility = 'none';
    navbar.style.boxShadow = 'none'; 
  } else {
    // Scrolling up
    navbar.style.position = 'fixed';
    navbar.style.borderBottomLeftRadius = '2rem';
    navbar.style.borderBottomRightRadius = '2rem';
    navbar.style.transition = 'background-color 0.4s ease-in-out';
    navbar.style.visibility = 'visible';
    navbar.style.zIndex = '100';
    navbar.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';

    if (currentScroll < transparentRange) {
      navbar.style.backgroundColor = 'transparent';
      navbar.style.boxShadow = 'none'; 
    } else {
      navbar.style.backgroundColor = '#f0f0f0';
    }

    navbar_inside.style.display = 'flex';
    navbar_inside.style.justifyContent = 'space-between';
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

///

// document.addEventListener('DOMContentLoaded', function () {
//   var background = document.getElementById('background');
//   var section = document.getElementById('decor_2_section');
//   var defaultBackgroundURL = 'Images/extras/flood_light_left.jpg';
//   var customBackgroundURL = 'Images/extras/flood_light_right.jpg';

//   var observer = new IntersectionObserver(function (entries) {
//     var entry = entries[0];
//     var isIntersecting = entry.isIntersecting || entry.intersectionRatio > 0;

//     if (isIntersecting) {
//       background.style.backgroundImage = 'url("' + customBackgroundURL + '")';
//     } else if (!isIntersecting && entry.boundingClientRect.top < 0) {
//       // If section has passed and the user is scrolling back up
//       background.style.backgroundImage = 'url("' + customBackgroundURL + '")';
//     } else {
//       background.style.backgroundImage = 'url("' + defaultBackgroundURL + '")';
//     }
//   });

//   observer.observe(document.getElementById('portfolio_gallery_section'));
//   observer.observe(section);
//   // observer.observe(document.getElementById('client_album_section'));
// });

document.addEventListener('DOMContentLoaded', function () {
  var background = document.getElementById('background');
  var section = document.getElementById('decor_2_section');
  var defaultBackgroundURL = 'Images/extras/flood_light_left.jpg';
  var customBackgroundURL = 'Images/extras/flood_light_right.jpg';
  var isApproaching = false;

  var observer = new IntersectionObserver(function (entries) {
    var entry = entries[0];
    var isIntersecting = entry.isIntersecting || entry.intersectionRatio > 0;

    if (isIntersecting && !isApproaching) {
      background.style.backgroundImage = 'url("' + customBackgroundURL + '")';
      isApproaching = true;
    } else if (!isIntersecting && entry.boundingClientRect.top < 0) {
      // If section has passed and the user is scrolling back up
      background.style.backgroundImage = 'url("' + customBackgroundURL + '")';
      isApproaching = false;
    } else {
      background.style.backgroundImage = 'url("' + defaultBackgroundURL + '")';
      isApproaching = false;
    }
  });

  observer.observe(section);
});

///

var openmodal = document.querySelectorAll('.modal-open')
for (var i = 0; i < openmodal.length; i++) {
  openmodal[i].addEventListener('click', function(event){
  event.preventDefault()
  toggleModal()
  })
}

const overlay = document.querySelector('.modal-overlay')
overlay.addEventListener('click', toggleModal)

var closemodal = document.querySelectorAll('.modal-close')
for (var i = 0; i < closemodal.length; i++) {
  closemodal[i].addEventListener('click', toggleModal)
}

document.onkeydown = function(evt) {
  evt = evt || window.event
  var isEscape = false
  if ("key" in evt) {
  isEscape = (evt.key === "Escape" || evt.key === "Esc")
  } else {
  isEscape = (evt.keyCode === 27)
  }
  if (isEscape && document.body.classList.contains('modal-active')) {
  toggleModal()
  }
};


function toggleModal () {
  const body = document.querySelector('body')
  const modal = document.querySelector('.modal')
  modal.classList.toggle('opacity-0')
  modal.classList.toggle('pointer-events-none')
  body.classList.toggle('modal-active')
}

///

function confirmation_sendEmail() {
  var form = document.getElementById('contact_us_section');
  var contact_name = document.getElementById("name").value;
  var contact_email = document.getElementById("email").value;
  var contact_subject = document.getElementById("subject").value;
  var contact_message = document.getElementById("message").value;
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "abubakaranjum065@gmail.com",
    Password: "B35C93DC499BAB4DF9685E5FD65177F98930",
    To: contact_email,
    From: "abubakaranjum065@gmail.com",
    Subject: "Hello and happy moye moye :)",
    Body: "Name : " + contact_name + "<br>Email : " + contact_email + "<br>Subject : " + contact_subject + "<br>Message : " + contact_message
  }).then(
    () => {
      form.reset();
    }
  );
}

///

function contactus_sendEmail() {
  event.preventDefault();
  var form = document.getElementById('contact_us_section');

  if (!form.checkValidity()) {
    alert("Please fill out all required fields before sending the message!");
    return;
  }

  event.preventDefault();
  var contact_name = document.getElementById("name").value;
  var contact_email = document.getElementById("email").value;
  var contact_subject = document.getElementById("subject").value;
  var contact_message = document.getElementById("message").value;
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "abubakaranjum065@gmail.com",
    Password: "B35C93DC499BAB4DF9685E5FD65177F98930",
    To: 'abubakaranjum066@gmail.com',
    From: "abubakaranjum065@gmail.com",
    Subject: "Message from " + document.getElementById("name").value + ", UsmanNadeemStudio.com",
    Body: "Name : " + contact_name + "<br>Email : " + contact_email + "<br>Subject : " + contact_subject + "<br>Message : " + contact_message
  }).then(
    () => {
      form.reset();
    }
  );
  confirmation_sendEmail();
  toggleModal();
}


