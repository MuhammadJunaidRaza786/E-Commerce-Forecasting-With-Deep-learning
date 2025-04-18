document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile menu toggle
  // initializeMobileMenu()

  // Initialize testimonial slider
  initializeTestimonialSlider()

  // Animate elements on scroll
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on page load
})

// Initialize mobile menu toggle
function initializeMobileMenu() {
  const menuToggle = document.getElementById("mobile-menu-toggle")
  const mainNav = document.getElementById("main-nav")
  const body = document.body

  if (menuToggle && mainNav) {
    // Create overlay element for mobile menu if it doesn't exist
    let overlay = document.querySelector(".menu-overlay")
    if (!overlay) {
      overlay = document.createElement("div")
      overlay.className = "menu-overlay"
      document.body.appendChild(overlay)
    }

    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("mobile-hidden")

      // Toggle body scroll lock
      body.classList.toggle("menu-open")

      // Toggle overlay
      overlay.classList.toggle("active")

      // Animate hamburger to X
      const menuIcons = menuToggle.querySelectorAll(".menu-icon")
      menuIcons.forEach((icon, index) => {
        if (mainNav.classList.contains("mobile-hidden")) {
          // Reset to hamburger
          icon.style.transform = "none"
          icon.style.opacity = "1"
        } else {
          // Transform to X
          if (index === 0) {
            icon.style.transform = "translateY(7px) rotate(45deg)"
          } else if (index === 1) {
            icon.style.opacity = "0"
          } else if (index === 2) {
            icon.style.transform = "translateY(-7px) rotate(-45deg)"
          }
        }
      })
    })

    // Close menu when clicking on overlay
    overlay.addEventListener("click", () => {
      if (!mainNav.classList.contains("mobile-hidden")) {
        mainNav.classList.add("mobile-hidden")
        body.classList.remove("menu-open")
        overlay.classList.remove("active")

        // Reset hamburger icon
        const menuIcons = menuToggle.querySelectorAll(".menu-icon")
        menuIcons.forEach((icon) => {
          icon.style.transform = "none"
          icon.style.opacity = "1"
        })
      }
    })

    // Close menu when clicking on a menu item
    const menuItems = mainNav.querySelectorAll(".nav-tab")
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          mainNav.classList.add("mobile-hidden")
          body.classList.remove("menu-open")
          overlay.classList.remove("active")

          // Reset hamburger icon
          const menuIcons = menuToggle.querySelectorAll(".menu-icon")
          menuIcons.forEach((icon) => {
            icon.style.transform = "none"
            icon.style.opacity = "1"
          })
        }
      })
    })
  }

  // Initialize mobile menu as hidden on small screens
  function checkScreenSize() {
    if (window.innerWidth <= 768 && mainNav) {
      mainNav.classList.add("mobile-hidden")
      body.classList.remove("menu-open")

      // Remove overlay when resizing to larger screen
      const overlay = document.querySelector(".menu-overlay")
      if (overlay) {
        overlay.classList.remove("active")
      }

      // Reset hamburger icon when screen size changes
      if (menuToggle) {
        const menuIcons = menuToggle.querySelectorAll(".menu-icon")
        menuIcons.forEach((icon) => {
          icon.style.transform = "none"
          icon.style.opacity = "1"
        })
      }
    } else if (mainNav) {
      mainNav.classList.remove("mobile-hidden")
    }
  }

  // Check on page load
  checkScreenSize()

  // Check on window resize
  window.addEventListener("resize", checkScreenSize)
}

// Initialize testimonial slider
function initializeTestimonialSlider() {
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  const sliderDots = document.querySelectorAll(".slider-dot")
  let currentIndex = 0
  let interval

  // Function to show a specific testimonial
  function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach((card) => {
      card.classList.remove("active")
    })

    // Deactivate all dots
    sliderDots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show the selected testimonial
    testimonialCards[index].classList.add("active")
    sliderDots[index].classList.add("active")
    currentIndex = index
  }

  // Add click event to dots
  sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index)
      resetInterval()
    })
  })

  // Auto-rotate testimonials
  function startInterval() {
    interval = setInterval(() => {
      let nextIndex = currentIndex + 1
      if (nextIndex >= testimonialCards.length) {
        nextIndex = 0
      }
      showTestimonial(nextIndex)
    }, 5000)
  }

  // Reset interval when user interacts
  function resetInterval() {
    clearInterval(interval)
    startInterval()
  }

  // Initialize the slider
  showTestimonial(0)
  startInterval()

  // Add swipe functionality for mobile
  let touchStartX = 0
  let touchEndX = 0
  const slider = document.querySelector(".testimonials-slider")

  if (slider) {
    slider.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
    })

    slider.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    })
  }

  function handleSwipe() {
    const minSwipeDistance = 50
    const swipeDistance = touchEndX - touchStartX

    if (swipeDistance > minSwipeDistance) {
      // Swiped right, show previous
      let prevIndex = currentIndex - 1
      if (prevIndex < 0) {
        prevIndex = testimonialCards.length - 1
      }
      showTestimonial(prevIndex)
      resetInterval()
    } else if (swipeDistance < -minSwipeDistance) {
      // Swiped left, show next
      let nextIndex = currentIndex + 1
      if (nextIndex >= testimonialCards.length) {
        nextIndex = 0
      }
      showTestimonial(nextIndex)
      resetInterval()
    }
  }
}

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".tech-card, .team-member, .story-content, .cta-section")

  elements.forEach((element) => {
    if (isElementInViewport(element) && !element.classList.contains("animated")) {
      element.classList.add("animated")
      element.style.animation = "fadeInUp 0.5s ease forwards"
    }
  })
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 && rect.bottom >= 0
}
