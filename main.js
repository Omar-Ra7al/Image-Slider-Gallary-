const slideRight = document.querySelector("span.right");
const slideLeft = document.querySelector("span.left");
const imageBox = document.querySelector(".imgs-wrapper");
const sliderContainer = document.querySelector(".sliderContainer");
const imagesLength = document.querySelectorAll(".imgs-wrapper img").length;

let sliderCount = 0; // We will use it as index
imageBox.style.marginLeft = `-${sliderCount}00%`;

// < Dynamic append ((add)) spans to show position dependes on the images number
const imagePostion = document.querySelector(".img-position"); // call after append
for (let i = 0; i < imagesLength; i++) {
  const span = document.createElement("span");
  imagePostion.appendChild(span);

  // Swipe to The img on click
  span.setAttribute("index", i);
  span.addEventListener("click", () => {
    sliderCount = +span.getAttribute("index");
    imageBox.style.marginLeft = `-${sliderCount}00%`;
    toggleActive();
  });
}
// ///////// >

// < Select spans after Append
const bullets = document.querySelectorAll(".img-position span");
bullets[0].classList.add("active");
// ///////// >

// << Start Add & Remove Active Class From Bullets
function toggleActive() {
  bullets.forEach((span) => {
    span.classList.remove("active");
  });
  bullets[sliderCount].classList.add("active");
}
// End Add & Remove Active Class From Bullets //>>

// << Start Slide By Click Fucntions
function showNextImage() {
  if (imagesLength - 2 >= sliderCount) {
    sliderCount++;
    toggleActive();
  }
  imageBox.style.marginLeft = `-${sliderCount}00%`;
}

let isSwiping = false;
function showPreviousImage() {
  if (sliderCount > 0) {
    sliderCount--;
    toggleActive();
  }
  imageBox.style.marginLeft = `-${sliderCount}00%`;
}

slideRight.addEventListener("click", () => {
  showNextImage();
});

slideLeft.addEventListener("click", () => {
  showPreviousImage();
});
//  End Slide By Click Fucntions  // >>

// << Start Swipe Functionality
let startX, moveX;
sliderContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

sliderContainer.addEventListener("touchmove", (e) => {
  moveX = e.touches[0].clientX;
});

sliderContainer.addEventListener("touchend", (e) => {
  // e.target to prevent twice transform >>
  //  and that happened cuz if the swipe happend in the same place of the icon
  //  it will excute the funciton tow times >> the functions is showNextImage() || showPreviousImage()

  if (e.target !== slideRight && startX > moveX) {
    showNextImage();
  } else if (e.target !== slideLeft && startX < moveX) {
    showPreviousImage();
  }
});
// End Swipe Functionality // >>

// << Start  Automatically Transition && Prevent Transtion on Hover
let isHovered = true;

function autoTransition() {
  setInterval(() => {
    if (isHovered) {
      // evrey 3000 wiil check if the isHoverd === true
      if (imagesLength - 2 >= sliderCount) {
        showNextImage();
      } else {
        sliderCount = 0;
        toggleActive();
        showPreviousImage();
      }
    }
  }, 3000);
}
autoTransition();

sliderContainer.addEventListener("mouseenter", () => {
  isHovered = false;
});

sliderContainer.addEventListener("mouseleave", () => {
  isHovered = true;
});

//  End Automatically Transition && Prevent Transtion on Hover // >>
