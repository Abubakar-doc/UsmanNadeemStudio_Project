function preventDefaultScroll(event) {
  event.preventDefault();
}

function hidePreloader() {
  var loader = document.getElementById("preloader");
  loader.style.display = "none";
  loader.style.zIndex = "1000";
  preventDefaultScroll();

  // Disable scrolling
  document.body.style.overflow = 'hidden';
}

window.addEventListener("load", function () {
  hidePreloader();

  // Re-enable scrolling after the website has finished loading
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




