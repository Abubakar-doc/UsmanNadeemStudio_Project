function hidePreloader() {
  var loader = document.getElementById("preloader");
  loader.style.display = "none";
  loader.style.zIndex = "1000";
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

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });
    // Add active class to the clicked button
    this.classList.add("active");
    const target = this.getAttribute("data-target");
    adjustGalleryLayout(target);
  });
});

///

function adjustGalleryLayout(target) {
  const gallery = document.querySelector(".portfolio-gallery");
  const landscapeItems = gallery.querySelectorAll("[data-id='landscape']");
  const portraitItems = gallery.querySelectorAll("[data-id='portrait']");
  
  // Hide all items initially
  gallery.querySelectorAll(".item").forEach(item => {
    item.style.display = "none";
  });

  if (target === "all") {
    // Show all items when 'All' is clicked
    gallery.querySelectorAll(".item").forEach(item => {
      item.style.display = "block";
    });
  } else if (target === "landscape") {
    // Show only landscape items
    landscapeItems.forEach(item => {
      item.style.display = "block";
    });
  } else if (target === "portrait") {
    // Show only portrait items
    portraitItems.forEach(item => {
      item.style.display = "block";
    });
  }
  if (target === "landscape" || target === "portrait") {
    gallery.classList.remove("grid-cols-1", "sm:grid-cols-3");
    gallery.classList.add("sm:grid-cols-3");
  } else {
    gallery.classList.remove("grid-cols-1", "sm:grid-cols-2");
    gallery.classList.add("sm:grid-cols-3");
  }
}



