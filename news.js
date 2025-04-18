document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile menu toggle
  // initializeMobileMenu()

  // Initialize bookmark functionality
  initializeBookmarks()

  // Initialize category filtering
  initializeCategoryFilter()

  // Initialize load more functionality
  initializeLoadMore()

  // Initialize share functionality
  initializeShare()

  // Initialize newsletter form
  initializeNewsletterForm()

  // Animate elements on scroll
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on page load

  // Handle responsive adjustments
  handleResponsiveAdjustments()
  window.addEventListener("resize", handleResponsiveAdjustments)
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

//       // Toggle body scroll lock
//       body.classList.toggle("menu-open")

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


// Initialize bookmark functionality
function initializeBookmarks() {
  const bookmarkButtons = document.querySelectorAll(".action-icon.bookmark")

  bookmarkButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active")

      // Show feedback message
      const isBookmarked = this.classList.contains("active")
      const message = isBookmarked ? "Article bookmarked" : "Bookmark removed"

      showToast(message)
    })
  })
}

// Initialize category filtering
function initializeCategoryFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const newsCards = document.querySelectorAll(".news-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      

      const category = this.getAttribute("data-filter")

      // Filter news cards
      newsCards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "flex"
          // Reset animation
          card.style.animation = "none"
          card.offsetHeight // Trigger reflow
          card.style.animation = "fadeInUp 0.5s ease forwards"
        } else {
          card.style.display = "none"
        }
      })
    })
  })
}

// Initialize load more functionality
function initializeLoadMore() {
  const loadMoreButton = document.querySelector(".load-more-button")

  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", function () {
      // Show loading state
      this.classList.add("loading")
      this.innerHTML = "Loading..."

      // Simulate loading more news (would fetch from API in real app)
      setTimeout(() => {
        // Generate new news cards
        const newsGrid = document.querySelector(".news-grid")

        // Add 3 more news items
        for (let i = 0; i < 3; i++) {
          const categories = ["technology", "business", "finance", "markets"]
          const randomCategory = categories[Math.floor(Math.random() * categories.length)]

          const newsCard = createNewsCard(randomCategory)
          newsGrid.appendChild(newsCard)

          // Initialize bookmark for new card
          const bookmarkBtn = newsCard.querySelector(".action-icon.bookmark")
          bookmarkBtn.addEventListener("click", function () {
            this.classList.toggle("active")
            const isBookmarked = this.classList.contains("active")
            const message = isBookmarked ? "Article bookmarked" : "Bookmark removed"
            showToast(message)
          })

          // Initialize share for new card
          const shareBtn = newsCard.querySelector(".action-icon.share")
          shareBtn.addEventListener("click", () => {
            showToast("Share options opened")
          })
        }

        // Reset button state
        this.classList.remove("loading")
        this.innerHTML = `Load More News
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>`
      }, 1500)
    })
  }
}

// Create a new news card
function createNewsCard(category) {
  const titles = [
    "Global Markets Respond to Economic Policy Changes",
    "New Technological Breakthrough in Renewable Energy",
    "Financial Experts Predict Market Trends for Next Quarter",
    "Business Leaders Gather for Annual Economic Summit",
  ]

  const excerpts = [
    "Analysts are closely monitoring market reactions to recent policy adjustments announced by central banks.",
    "Scientists have developed a more efficient method for harnessing solar energy that could revolutionize the industry.",
    "Leading financial institutions have released their forecasts for the upcoming quarter, suggesting cautious optimism.",
    "CEOs and industry leaders from around the world are meeting to discuss economic challenges and opportunities.",
  ]

  const randomIndex = Math.floor(Math.random() * titles.length)

  const card = document.createElement("article")
  card.className = "news-card"
  card.setAttribute("data-category", category)
  card.style.animation = "fadeInUp 0.5s ease forwards"
  card.style.opacity = "0"

  card.innerHTML = `
    <div class="news-image">
      <div class="category-badge ${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
      <img src="https://via.placeholder.com/400x250" alt="News image">
    </div>
    <div class="news-content">
      <div class="news-meta">
        <span class="news-date">April ${Math.floor(Math.random() * 30) + 1}, 2025</span>
        <span class="news-reading-time">${Math.floor(Math.random() * 7) + 2} min read</span>
      </div>
      <h3 class="news-title">${titles[randomIndex]}</h3>
      <p class="news-excerpt">${excerpts[randomIndex]}</p>
      <div class="news-actions">
        <button class="action-button read-more-sm">Read More</button>
        <div class="action-icons">
          <button class="action-icon bookmark" aria-label="Bookmark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          <button class="action-icon share" aria-label="Share">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `

  return card
}

// Initialize share functionality
function initializeShare() {
  const shareButtons = document.querySelectorAll(".action-icon.share")

  shareButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // In a real app, this would open a share dialog
      // For demo purposes, just show a toast
      showToast("Share options opened")
    })
  })
}

// Initialize newsletter form
function initializeNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector(".newsletter-input")
      const email = emailInput.value.trim()

      if (email && isValidEmail(email)) {
        showToast("Thank you for subscribing!")
        emailInput.value = ""
      } else {
        showToast("Please enter a valid email address", "error")
      }
    })
  }
}

// Validate email format
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Show toast notification
function showToast(message, type = "success") {
  // Check if toast container exists, create if not
  let toastContainer = document.querySelector(".toast-container")

  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.className = "toast-container"
    document.body.appendChild(toastContainer)

    // Add styles
    const style = document.createElement("style")
    style.textContent = `
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
        animation: slideIn 0.3s forwards, fadeOut 0.3s forwards 3s;
        border-left: 4px solid var(--accent-color);
      }
      
      .toast.error {
        border-left-color: #ff5e62;
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

  // Create toast
  const toast = document.createElement("div")
  toast.className = `toast ${type}`
  toast.textContent = message

  // Add to container
  toastContainer.appendChild(toast)

  // Remove after animation
  setTimeout(() => {
    toast.remove()
  }, 3300)
}

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".news-card, .featured-news-card, .newsletter-section")

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

// Handle responsive adjustments for news page
function handleResponsiveAdjustments() {
  const screenWidth = window.innerWidth

  // Adjust news card heights for consistent appearance
  adjustNewsCardHeights(screenWidth)

  // Optimize touch interactions for mobile
  optimizeTouchInteractions(screenWidth)

  // Adjust text sizes for better readability
  adjustTextSizes(screenWidth)

  // Handle horizontal scrolling for filter buttons on mobile
  handleFilterScrolling(screenWidth)
}

// Adjust news card heights for consistent appearance
function adjustNewsCardHeights(screenWidth) {
  // Reset heights first
  const newsCards = document.querySelectorAll(".news-card")
  newsCards.forEach((card) => {
    card.style.height = ""
    const content = card.querySelector(".news-content")
    if (content) content.style.height = ""
    const excerpt = card.querySelector(".news-excerpt")
    if (excerpt) excerpt.style.height = ""
  })

  // Only apply equal heights on larger screens
  if (screenWidth >= 768) {
    // Group cards by rows in the grid
    const cardsPerRow = screenWidth >= 1200 ? 3 : screenWidth >= 992 ? 2 : 1

    if (cardsPerRow > 1) {
      // Process cards in row groups
      for (let i = 0; i < newsCards.length; i += cardsPerRow) {
        const rowCards = Array.from(newsCards).slice(i, i + cardsPerRow)

        // Find max content height in this row
        let maxContentHeight = 0
        let maxExcerptHeight = 0

        rowCards.forEach((card) => {
          const content = card.querySelector(".news-content")
          const excerpt = card.querySelector(".news-excerpt")

          if (content) {
            content.style.height = ""
            maxContentHeight = Math.max(maxContentHeight, content.scrollHeight)
          }

          if (excerpt) {
            excerpt.style.height = ""
            maxExcerptHeight = Math.max(maxExcerptHeight, excerpt.scrollHeight)
          }
        })

        // Apply equal heights
        rowCards.forEach((card) => {
          const content = card.querySelector(".news-content")
          const excerpt = card.querySelector(".news-excerpt")

          if (content) content.style.height = `${maxContentHeight}px`
          if (excerpt) excerpt.style.height = `${maxExcerptHeight}px`
        })
      }
    }
  }
}

// Optimize touch interactions for mobile devices
function optimizeTouchInteractions(screenWidth) {
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

  if (isTouchDevice && screenWidth <= 768) {
    // Make buttons more touch-friendly
    const buttons = document.querySelectorAll(".action-button, .filter-btn, .load-more-button")
    buttons.forEach((btn) => {
      btn.style.minHeight = "44px"
    })

    // Increase touch target size for icons
    const icons = document.querySelectorAll(".action-icon")
    icons.forEach((icon) => {
      icon.style.width = "40px"
      icon.style.height = "40px"
    })

    // Add active state visual feedback
    document.querySelectorAll(".news-card, .featured-news-card").forEach((card) => {
      card.addEventListener("touchstart", function () {
        this.style.transform = "translateY(-2px)"
        this.style.transition = "transform 0.2s"
      })

      card.addEventListener("touchend", function () {
        this.style.transform = "translateY(0)"
      })
    })
  }
}

// Adjust text sizes for better readability
function adjustTextSizes(screenWidth) {
  const newsTitles = document.querySelectorAll(".news-title")
  const newsExcerpts = document.querySelectorAll(".news-excerpt")
  const featuredTitle = document.querySelector(".featured-title")
  const featuredExcerpt = document.querySelector(".featured-excerpt")

  if (screenWidth <= 480) {
    newsTitles.forEach((el) => (el.style.fontSize = "15px"))
    newsExcerpts.forEach((el) => (el.style.fontSize = "13px"))
    if (featuredTitle) featuredTitle.style.fontSize = "18px"
    if (featuredExcerpt) featuredExcerpt.style.fontSize = "13px"
  } else if (screenWidth <= 576) {
    newsTitles.forEach((el) => (el.style.fontSize = "16px"))
    newsExcerpts.forEach((el) => (el.style.fontSize = "14px"))
    if (featuredTitle) featuredTitle.style.fontSize = "20px"
    if (featuredExcerpt) featuredExcerpt.style.fontSize = "14px"
  } else if (screenWidth <= 768) {
    newsTitles.forEach((el) => (el.style.fontSize = "17px"))
    newsExcerpts.forEach((el) => (el.style.fontSize = "14px"))
    if (featuredTitle) featuredTitle.style.fontSize = "22px"
    if (featuredExcerpt) featuredExcerpt.style.fontSize = "14px"
  } else {
    // Reset to default sizes
    newsTitles.forEach((el) => (el.style.fontSize = ""))
    newsExcerpts.forEach((el) => (el.style.fontSize = ""))
    if (featuredTitle) featuredTitle.style.fontSize = ""
    if (featuredExcerpt) featuredExcerpt.style.fontSize = ""
  }
}

// Handle horizontal scrolling for filter buttons on mobile
function handleFilterScrolling(screenWidth) {
  if (screenWidth <= 768) {
    const filterContainer = document.querySelector(".news-filter")

    if (filterContainer) {
      // Add visual indicator for horizontal scrolling
      if (!document.querySelector(".scroll-indicator")) {
        const scrollIndicator = document.createElement("div")
        scrollIndicator.className = "scroll-indicator"
        scrollIndicator.innerHTML = `
          <style>
            .scroll-indicator {
              position: absolute;
              right: 0;
              top: 0;
              height: 100%;
              width: 30px;
              background: linear-gradient(to right, transparent, rgba(42, 30, 92, 0.8));
              pointer-events: none;
              opacity: 0;
              transition: opacity 0.3s;
              z-index: 1;
            }
            
            .scroll-indicator.visible {
              opacity: 1;
            }
          </style>
        `
        filterContainer.style.position = "relative"
        filterContainer.appendChild(scrollIndicator)

        // Show/hide scroll indicator based on scroll position
        filterContainer.addEventListener("scroll", function () {
          const isScrollable = this.scrollWidth > this.clientWidth
          const isScrolledToEnd = this.scrollLeft + this.clientWidth >= this.scrollWidth - 10

          if (isScrollable && !isScrolledToEnd) {
            scrollIndicator.classList.add("visible")
          } else {
            scrollIndicator.classList.remove("visible")
          }
        })

        // Trigger initial check
        setTimeout(() => {
          filterContainer.dispatchEvent(new Event("scroll"))
        }, 100)
      }
    }
  }
}
