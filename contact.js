document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile menu toggle
  // initializeMobileMenu()

  // Initialize contact form submission
  initializeContactForm()

  // Initialize FAQ accordion
  initializeFAQ()

  // Animate elements on scroll
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on page load
})

// // Initialize mobile menu toggle
// function initializeMobileMenu() {
//   const menuToggle = document.getElementById("mobile-menu-toggle")
//   const mainNav = document.getElementById("main-nav")
//   const body = document.body

//   if (menuToggle && mainNav) {
//     // Create overlay element for mobile menu if it doesn't exist
//     let overlay = document.querySelector(".menu-overlay")
//     if (!overlay) {
//       overlay = document.createElement("div")
//       overlay.className = "menu-overlay"
//       document.body.appendChild(overlay)
//     }

//     menuToggle.addEventListener("click", () => {
//       mainNav.classList.toggle("mobile-hidden")

      // Toggle body scroll lock
      // body.classList.toggle("menu-open")

//       // Toggle overlay
//       overlay.classList.toggle("active")

//       // Animate hamburger to X
//       const menuIcons = menuToggle.querySelectorAll(".menu-icon")
//       menuIcons.forEach((icon, index) => {
//         if (mainNav.classList.contains("mobile-hidden")) {
//           // Reset to hamburger
//           icon.style.transform = "none"
//           icon.style.opacity = "1"
//         } else {
//           // Transform to X
//           if (index === 0) {
//             icon.style.transform = "translateY(7px) rotate(45deg)"
//           } else if (index === 1) {
//             icon.style.opacity = "0"
//           } else if (index === 2) {
//             icon.style.transform = "translateY(-7px) rotate(-45deg)"
//           }
//         }
//       })
//     })

//     // Close menu when clicking on overlay
//     overlay.addEventListener("click", () => {
//       if (!mainNav.classList.contains("mobile-hidden")) {
//         mainNav.classList.add("mobile-hidden")
//         body.classList.remove("menu-open")
//         overlay.classList.remove("active")

//         // Reset hamburger icon
//         const menuIcons = menuToggle.querySelectorAll(".menu-icon")
//         menuIcons.forEach((icon) => {
//           icon.style.transform = "none"
//           icon.style.opacity = "1"
//         })
//       }
//     })

//     // Close menu when clicking on a menu item
//     const menuItems = mainNav.querySelectorAll(".nav-tab")
//     menuItems.forEach((item) => {
//       item.addEventListener("click", () => {
//         if (window.innerWidth <= 768) {
//           mainNav.classList.add("mobile-hidden")
//           body.classList.remove("menu-open")
//           overlay.classList.remove("active")

//           // Reset hamburger icon
//           const menuIcons = menuToggle.querySelectorAll(".menu-icon")
//           menuIcons.forEach((icon) => {
//             icon.style.transform = "none"
//             icon.style.opacity = "1"
//           })
//         }
//       })
//     })
//   }

//   // Initialize mobile menu as hidden on small screens
//   function checkScreenSize() {
//     if (window.innerWidth <= 768 && mainNav) {
//       mainNav.classList.add("mobile-hidden")
//       body.classList.remove("menu-open")

//       // Remove overlay when resizing to larger screen
//       const overlay = document.querySelector(".menu-overlay")
//       if (overlay) {
//         overlay.classList.remove("active")
//       }

//       // Reset hamburger icon when screen size changes
//       if (menuToggle) {
//         const menuIcons = menuToggle.querySelectorAll(".menu-icon")
//         menuIcons.forEach((icon) => {
//           icon.style.transform = "none"
//           icon.style.opacity = "1"
//         })
//       }
//     } else if (mainNav) {
//       mainNav.classList.remove("mobile-hidden")
//     }
//   }

  // Check on page load
  checkScreenSize()

  // Check on window resize
  window.addEventListener("resize", checkScreenSize)


// Initialize contact form submission
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const formValues = Object.fromEntries(formData.entries())

      // Validate form (simple validation)
      let isValid = true
      const requiredFields = ["name", "email", "subject", "message", "consent"]

      requiredFields.forEach((field) => {
        const input = document.getElementById(field)
        if (!formValues[field] || formValues[field].trim() === "") {
          isValid = false
          input.classList.add("error")
        } else {
          input.classList.remove("error")
        }
      })

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (formValues.email && !emailRegex.test(formValues.email)) {
        isValid = false
        document.getElementById("email").classList.add("error")
      }

      if (isValid) {
        // In a real application, you would send this data to a server
        console.log("Form submitted:", formValues)

        // Show success message
        showToast("Your message has been sent successfully! We'll get back to you soon.")

        // Reset form
        contactForm.reset()
      } else {
        showToast("Please fill in all required fields correctly.", "error")
      }
    })

    // Add styles for form validation
    const style = document.createElement("style")
    style.textContent = `
      .error {
        border-color: #ff4d6d !important;
        box-shadow: 0 0 0 2px rgba(255, 77, 109, 0.2) !important;
      }
      
      .toast-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
      }
      
      .toast {
        background-color: var(--secondary-bg);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        margin-top: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        min-width: 250px;
        transform: translateX(100%);
        animation: slideIn 0.3s forwards, fadeOut 0.3s forwards 5s;
        border-left: 4px solid var(--accent-color);
      }
      
      .toast.error {
        border-left-color: #ff4d6d;
      }
      
      @keyframes slideIn {
        to { transform: translateX(0); }
      }
      
      @keyframes fadeOut {
        to { opacity: 0; transform: translateX(100%); }
      }
    `
    document.head.appendChild(style)
  }
}

// Initialize FAQ accordion
function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Toggle active class on clicked item
      item.classList.toggle("active")

      // Close other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active")
        }
      })
    })
  })
}

// Show toast notification
function showToast(message, type = "success") {
  // Check if toast container exists, create if not
  let toastContainer = document.querySelector(".toast-container")

  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.className = "toast-container"
    document.body.appendChild(toastContainer)
  }

  // Create toast
  const toast = document.createElement("div")
  toast.className = `toast ${type}`
  toast.textContent = message

  // Add to container
  toastContainer.appendChild(toast)

  // Remove after animation
  setTimeout(() => {
    toast.remove()
  }, 5300)
}

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".info-card, .social-links, .form-header, .faq-item")

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
