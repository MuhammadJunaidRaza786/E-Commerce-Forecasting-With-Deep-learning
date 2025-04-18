document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle functionality
  const menuToggle = document.getElementById("mobile-menu-toggle")
  const mainNav = document.getElementById("main-nav")
  const body = document.body

  if (menuToggle && mainNav) {
    // Create overlay element for mobile menu
    const overlay = document.createElement("div")
    overlay.className = "menu-overlay"
    document.body.appendChild(overlay)

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

  // Animate bars on load
  const bars = document.querySelectorAll(".bar")
  bars.forEach((bar) => {
    const width = bar.style.width
    bar.style.width = "0"
    setTimeout(() => {
      bar.style.width = width
    }, 300)
  })

  // Enhanced chart interactivity
  const dataPoints = document.querySelectorAll(".data-point")
  const tooltip = document.getElementById("chart-tooltip")
  const tooltipDate = document.getElementById("tooltip-date")
  const tooltipValue = document.getElementById("tooltip-value")
  const chartArea = document.querySelector(".chart-area")

  // Create a touch-friendly tooltip for mobile devices
  const touchTooltip = document.createElement("div")
  touchTooltip.className = "touch-tooltip"
  touchTooltip.innerHTML = `
  <div class="tooltip-date">Month: <span id="touch-tooltip-date"></span></div>
  <div class="tooltip-value">Value: <span id="touch-tooltip-value"></span></div>
  <div class="touch-tooltip-close">×</div>
`
  document.body.appendChild(touchTooltip)

  const touchTooltipDate = document.getElementById("touch-tooltip-date")
  const touchTooltipValue = document.getElementById("touch-tooltip-value")
  const touchTooltipClose = document.querySelector(".touch-tooltip-close")

  touchTooltipClose.addEventListener("click", () => {
    touchTooltip.classList.remove("visible")
  })

  // Month names for the tooltip
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

  // Detect if device is touch-enabled
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

  dataPoints.forEach((point, index) => {
    // For mouse devices
    if (!isTouchDevice) {
      point.addEventListener("mouseenter", (e) => {
        // Get point position
        const rect = point.getBoundingClientRect()
        const chartRect = chartArea.getBoundingClientRect()

        // Calculate position (centered above the point)
        const x = rect.left + rect.width / 2 - chartRect.left
        const y = rect.top - chartRect.top - 15

        // Set tooltip content
        const value = point.getAttribute("data-value")
        const monthIndex = Math.floor(index % 6)

        tooltipDate.textContent = months[monthIndex]
        tooltipValue.textContent = value

        // Position and show tooltip
        tooltip.style.left = `${x}px`
        tooltip.style.top = `${y}px`
        tooltip.classList.add("visible")
      })

      point.addEventListener("mouseleave", () => {
        tooltip.classList.remove("visible")
      })
    }
    // For touch devices
    else {
      point.addEventListener("click", (e) => {
        // Set tooltip content
        const value = point.getAttribute("data-value")
        const monthIndex = Math.floor(index % 6)

        touchTooltipDate.textContent = months[monthIndex]
        touchTooltipValue.textContent = value

        // Show tooltip
        touchTooltip.classList.add("visible")

        // Prevent event bubbling
        e.stopPropagation()
      })
    }
  })

  // Close touch tooltip when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".data-point") && !e.target.closest(".touch-tooltip")) {
      touchTooltip.classList.remove("visible")
    }
  })

  // Responsive chart adjustments
  function adjustChartForScreenSize() {
    const chartWidget = document.querySelector(".line-chart-widget")
    const chartSvg = document.querySelector(".chart-svg")

    // Adjust data point size based on screen width
    const dataPoints = document.querySelectorAll(".data-point")
    const screenWidth = window.innerWidth

    if (screenWidth <= 480) {
      dataPoints.forEach((point) => {
        point.setAttribute("r", "3")
      })
    } else if (screenWidth <= 576) {
      dataPoints.forEach((point) => {
        point.setAttribute("r", "3.5")
      })
    } else if (screenWidth <= 768) {
      dataPoints.forEach((point) => {
        point.setAttribute("r", "4")
      })
    } else if (screenWidth <= 992) {
      dataPoints.forEach((point) => {
        point.setAttribute("r", "5")
      })
    } else {
      dataPoints.forEach((point) => {
        point.setAttribute("r", "6")
      })
    }

    // Adjust line stroke width
    const lines = document.querySelectorAll(".line")
    if (screenWidth <= 480) {
      lines.forEach((line) => {
        line.setAttribute("stroke-width", "1.5")
      })
    } else if (screenWidth <= 576) {
      lines.forEach((line) => {
        line.setAttribute("stroke-width", "2")
      })
    } else {
      lines.forEach((line) => {
        line.setAttribute("stroke-width", "3")
      })
    }
  }

  // Run on page load and resize
  adjustChartForScreenSize()
  window.addEventListener("resize", adjustChartForScreenSize)

  // Animate the chart on scroll
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
  }

  function handleChartAnimation() {
    const chart = document.querySelector(".line-chart-widget")
    if (isElementInViewport(chart)) {
      chart.classList.add("animate")
      window.removeEventListener("scroll", handleChartAnimation)
    }
  }

  window.addEventListener("scroll", handleChartAnimation)
  handleChartAnimation() // Check on page load

  // Initialize donut chart
  initializeDonutChart()

  // Initialize gauge chart
  initializeGaugeChart()

  // Initialize enhanced bar chart
  initializeEnhancedBarChart()

  // Initialize enhanced line chart
  initializeEnhancedLineChart()

  // Initialize heatmap
  initializeHeatmap()
})

// Initialize donut chart
function initializeDonutChart() {
  const donutSegments = document.querySelectorAll(".donut-segment")
  const donutCenter = document.querySelector(".donut-center")
  const donutValue = document.querySelector(".donut-value")
  const donutLabel = document.querySelector(".donut-label")

  if (donutSegments && donutCenter) {
    // Set animation delays for donut segments
    donutSegments.forEach((segment, index) => {
      segment.style.animationDelay = `${index * 0.2}s`

      // Add hover interaction
      segment.addEventListener("mouseenter", () => {
        const value = segment.getAttribute("data-value")
        const label = segment.getAttribute("data-label")

        // Update center text
        if (donutValue && donutLabel) {
          donutValue.textContent = `${value}%`
          donutLabel.textContent = label
        }

        // Highlight the segment
        donutSegments.forEach((seg) => {
          seg.style.opacity = "0.7"
        })
        segment.style.opacity = "1"
      })

      segment.addEventListener("mouseleave", () => {
        // Reset to default (first segment)
        if (donutValue && donutLabel && donutSegments.length > 0) {
          const defaultValue = donutSegments[0].getAttribute("data-value")
          const defaultLabel = donutSegments[0].getAttribute("data-label")

          donutValue.textContent = `${defaultValue}%`
          donutLabel.textContent = defaultLabel
        }

        // Reset opacity
        donutSegments.forEach((seg) => {
          seg.style.opacity = "1"
        })
      })
    })
  }
}

// Initialize gauge chart
function initializeGaugeChart() {
  const gaugeElement = document.getElementById("accuracy-gauge")
  if (gaugeElement) {
    // Set gauge value (92%)
    const gaugeValue = 92
    gaugeElement.style.transform = `rotate(${gaugeValue * 1.8 - 90}deg)`

    // Add animation
    setTimeout(() => {
      gaugeElement.style.transition = "transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
      gaugeElement.style.transform = `rotate(${gaugeValue * 1.8 - 90}deg)`
    }, 300)
  }
}

// Initialize enhanced bar chart
function initializeEnhancedBarChart() {
  const barColumns = document.querySelectorAll(".bar-column")

  barColumns.forEach((bar, index) => {
    // Set animation delay
    bar.style.animationDelay = `${index * 0.1}s`

    // Add hover interaction
    bar.addEventListener("mouseenter", () => {
      const tooltip = bar.querySelector(".bar-tooltip")
      if (tooltip) {
        tooltip.style.opacity = "1"
        tooltip.style.transform = "translateX(-50%) translateY(-5px)"
      }
    })

    bar.addEventListener("mouseleave", () => {
      const tooltip = bar.querySelector(".bar-tooltip")
      if (tooltip) {
        tooltip.style.opacity = "0"
        tooltip.style.transform = "translateX(-50%) translateY(0)"
      }
    })
  })
}

// Initialize enhanced line chart
function initializeEnhancedLineChart() {
  const dataPoints = document.querySelectorAll(".data-point")
  const tooltip = document.getElementById("chart-tooltip")
  const tooltipDate = document.getElementById("tooltip-date")
  const tooltipValue = document.getElementById("tooltip-value")

  if (dataPoints && tooltip && tooltipDate && tooltipValue) {
    dataPoints.forEach((point) => {
      point.addEventListener("mouseenter", () => {
        const rect = point.getBoundingClientRect()
        const chartArea = document.querySelector(".chart-area").getBoundingClientRect()

        const x = rect.left + rect.width / 2 - chartArea.left
        const y = rect.top - chartArea.top - 15

        const value = point.getAttribute("data-value")
        const date = point.getAttribute("data-date")

        tooltipDate.textContent = date
        tooltipValue.textContent = value

        tooltip.style.left = `${x}px`
        tooltip.style.top = `${y}px`
        tooltip.classList.add("visible")
      })

      point.addEventListener("mouseleave", () => {
        tooltip.classList.remove("visible")
      })
    })

    // Time filter functionality
    const timeButtons = document.querySelectorAll(".time-btn")

    if (timeButtons) {
      timeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Update active state
          timeButtons.forEach((btn) => btn.classList.remove("active"))
          button.classList.add("active")

          // Get selected time period
          const period = button.getAttribute("data-period")

          // Update chart data based on selected period
          updateChartData(period)
        })
      })
    }
  }

  // Function to update chart data based on time period
  function updateChartData(period) {
    // This would typically fetch new data from an API
    // For demo purposes, we'll just simulate data changes

    const solidLine = document.querySelector(".line.solid")
    const dashedLine = document.querySelector(".line.dashed")
    const dottedLine = document.querySelector(".line.dotted")
    const solidArea = document.querySelector(".area-fill.solid-area")
    const dashedArea = document.querySelector(".area-fill.dashed-area")
    const forecastArea = document.querySelector(".area-fill.forecast-area")

    if (solidLine && dashedLine && dottedLine && solidArea && dashedArea && forecastArea) {
      let newSolidPath, newDashedPath, newDottedPath, newSolidArea, newDashedArea, newForecastArea

      switch (period) {
        case "week":
          newSolidPath = "M0,150 C100,170 200,120 300,80 C400,100 500,60 600,90"
          newDashedPath = "M0,200 C100,180 200,220 300,120 C400,80 500,130 600,110"
          newDottedPath = "M300,80 C400,60 500,40 600,30"
          newSolidArea = `${newSolidPath} L600,300 L0,300 Z`
          newDashedArea = `${newDashedPath} L600,300 L0,300 Z`
          newForecastArea = `M300,80 C400,60 500,40 600,30 L600,300 L300,300 Z`
          break
        case "month":
          // Keep current paths
          return
        case "quarter":
          newSolidPath = "M0,180 C100,150 200,170 300,100 C400,50 500,70 600,40"
          newDashedPath = "M0,220 C100,200 200,240 300,150 C400,100 500,120 600,80"
          newDottedPath = "M300,100 C400,80 500,60 600,20"
          newSolidArea = `${newSolidPath} L600,300 L0,300 Z`
          newDashedArea = `${newDashedPath} L600,300 L0,300 Z`
          newForecastArea = `M300,100 C400,80 500,60 600,20 L600,300 L300,300 Z`
          break
        case "year":
          newSolidPath = "M0,200 C100,180 200,150 300,120 C400,80 500,40 600,20"
          newDashedPath = "M0,250 C100,230 200,210 300,180 C400,150 500,100 600,70"
          newDottedPath = "M300,120 C400,100 500,70 600,50"
          newSolidArea = `${newSolidPath} L600,300 L0,300 Z`
          newDashedArea = `${newDashedPath} L600,300 L0,300 Z`
          newForecastArea = `M300,120 C400,100 500,70 600,50 L600,300 L300,300 Z`
          break
      }

      // Animate the path changes
      solidLine.style.transition = "d 1s ease"
      dashedLine.style.transition = "d 1s ease"
      dottedLine.style.transition = "d 1s ease"
      solidArea.style.transition = "d 1s ease"
      dashedArea.style.transition = "d 1s ease"
      forecastArea.style.transition = "d 1s ease"

      // Set the new paths
      solidLine.setAttribute("d", newSolidPath)
      dashedLine.setAttribute("d", newDashedPath)
      dottedLine.setAttribute("d", newDottedPath)
      solidArea.setAttribute("d", newSolidArea)
      dashedArea.setAttribute("d", newDashedArea)
      forecastArea.setAttribute("d", newForecastArea)

      // Update data points
      updateDataPoints(".solid-point", newSolidPath)
      updateDataPoints(".dashed-point", newDashedPath)
      updateDataPoints(".forecast-point", newDottedPath)
    }
  }

  // Helper function to update data points based on a path
  function updateDataPoints(selector, pathString) {
    const dataPoints = document.querySelectorAll(selector)
    if (!dataPoints.length) return

    // Parse the path to extract points
    const pathCommands = pathString.split(/(?=[MCL])/)
    const points = []

    pathCommands.forEach((cmd) => {
      if (cmd.startsWith("M") || cmd.startsWith("L")) {
        const coords = cmd.substring(1).trim().split(" ")
        points.push({
          x: Number.parseFloat(coords[0]),
          y: Number.parseFloat(coords[1]),
        })
      } else if (cmd.startsWith("C")) {
        const coords = cmd.substring(1).trim().split(" ")
        // For cubic bezier, we only care about the end point
        points.push({
          x: Number.parseFloat(coords[4]),
          y: Number.parseFloat(coords[5]),
        })
      }
    })

    // Update data points to match path points
    dataPoints.forEach((point, index) => {
      if (index < points.length) {
        point.setAttribute("cx", points[index].x)
        point.setAttribute("cy", points[index].y)
      }
    })
  }
}

// Initialize heatmap
function initializeHeatmap() {
  const heatmapGrid = document.querySelector(".heatmap-grid")
  if (!heatmapGrid) return

  // Clear existing content
  heatmapGrid.innerHTML = ""

  // Generate heatmap data (24 hours x 7 days)
  const hours = 24
  const days = 7

  // Create cells
  for (let hour = 0; hour < hours; hour++) {
    for (let day = 0; day < days; day++) {
      // Generate a value between 0 and 1 (higher in business hours)
      let value = Math.random()

      // Make business hours (9am-5pm) generally hotter
      if (hour >= 9 && hour <= 17) {
        value = Math.min(value + 0.3, 1)
      }

      // Make weekends generally cooler
      if (day >= 5) {
        // Saturday and Sunday
        value = Math.max(value - 0.3, 0)
      }

      // Create cell
      const cell = document.createElement("div")
      cell.className = "heatmap-cell"

      // Set color based on value (from blue to red)
      const hue = (1 - value) * 240 // 240 (blue) to 0 (red)
      cell.style.backgroundColor = `hsl(${hue}, 80%, 50%)`
      cell.style.opacity = 0.1 + value * 0.9 // Minimum opacity of 0.1

      // Add tooltip with value
      const valuePercent = Math.round(value * 100)
      cell.setAttribute("data-tooltip", `${valuePercent}% activity`)

      // Add hover effect
      cell.addEventListener("mouseenter", () => {
        const tooltip = document.createElement("div")
        tooltip.className = "heatmap-tooltip"
        tooltip.textContent = cell.getAttribute("data-tooltip")

        // Position tooltip
        const rect = cell.getBoundingClientRect()
        tooltip.style.left = `${rect.left + rect.width / 2}px`
        tooltip.style.top = `${rect.top - 30}px`

        document.body.appendChild(tooltip)

        // Store reference to tooltip
        cell.tooltip = tooltip
      })

      cell.addEventListener("mouseleave", () => {
        if (cell.tooltip) {
          cell.tooltip.remove()
          cell.tooltip = null
        }
      })

      // Add to grid
      heatmapGrid.appendChild(cell)

      // Add animation delay
      cell.style.animationDelay = `${hour * 0.02 + day * 0.05}s`
    }
  }
}

// Add styles for new chart components
const chartStyles = document.createElement("style")
chartStyles.textContent = `
  /* Donut Chart Styles */
  .donut-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
  
  .donut-chart {
    position: relative;
    width: 180px;
    height: 180px;
    margin: 0 auto;
  }
  
  .donut {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  
  .donut-segment {
    transition: all 0.5s ease;
    cursor: pointer;
    stroke-dashoffset: 251.2; /* 2 * PI * 40 */
    animation: donutFill 1.5s ease forwards;
  }
  
  @keyframes donutFill {
    to {
      stroke-dashoffset: var(--dash-offset, 0);
    }
  }
  
  .donut-segment:hover {
    stroke-width: 12;
    filter: drop-shadow(0 0 8px rgba(0, 229, 255, 0.5));
  }
  
  .donut-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: var(--secondary-bg);
    border-radius: 50%;
    width: 60%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
  }
  
  .donut-value {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-color);
    line-height: 1;
    margin-bottom: 5px;
  }
  
  .donut-label {
    font-size: 14px;
    color: var(--text-secondary);
  }
  
  .donut-legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
  }
  
  .donut-legend .legend-item {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
  }
  
  .donut-legend .legend-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
  }
  
  .legend-value {
    margin-left: 5px;
    font-weight: 600;
    color: var(--accent-color);
  }
  
  /* Gauge Chart Styles */
  .gauge-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
  
  .gauge {
    position: relative;
    width: 200px;
    height: 120px;
    margin: 0 auto 20px;
  }
  
  .gauge-body {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 100px 100px 0 0;
    background-color: rgba(255, 255, 255, 0.05);
    overflow: hidden;
  }
  
  .gauge-fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--accent-gradient);
    transform-origin: bottom center;
    transform: rotate(-90deg);
  }
  
  .gauge-cover {
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 0;
    background-color: var(--secondary-bg);
    border-radius: 85px 85px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .gauge-value {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-color);
  }
  
  .gauge-label {
    font-size: 14px;
    color: var(--text-secondary);
  }
  
  .gauge-ticks {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
  
  .gauge-tick-group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .gauge-tick {
    width: 2px;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.3);
    margin-bottom: 5px;
  }
  
  .gauge-tick-label {
    font-size: 10px;
    color: var(--text-secondary);
  }
  
  .gauge-stats {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 10px;
  }
  
  .gauge-stat {
    text-align: center;
  }
  
  .gauge-stat-value {
    font-size: 18px;
    font-weight: 600;
    color: var(--accent-color);
  }
  
  .gauge-stat-label {
    font-size: 12px;
    color: var(--text-secondary);
  }
  
  /* Enhanced Bar Chart Styles */
  .bar-chart-container {
    display: flex;
    height: 250px;
    margin-top: 20px;
  }
  
  .y-axis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 10px;
    width: 40px;
  }
  
  .y-label {
    font-size: 11px;
    color: var(--text-secondary);
    text-align: right;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  
  .chart-area {
    flex: 1;
    position: relative;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 30px;
  }
  
  .grid-lines.horizontal {
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .grid-lines.horizontal .grid-line {
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .vertical-bars {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 100%;
    width: 100%;
    padding-bottom: 30px;
    position: relative;
  }
  
  .bar-group {
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    gap: 5px;
  }
  
  .bar-column {
    width: 40%;
    max-width: 30px;
    border-radius: 6px 6px 0 0;
    position: relative;
    transition: height 1.2s cubic-bezier(0.22, 1, 0.36, 1);
    transform-origin: bottom;
    transform: scaleY(0);
    animation: barGrow 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  
  .bar-column.current {
    background: linear-gradient(to top, #00e5ff, #0066ff);
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
  }
  
  .bar-column.previous {
    background: rgba(255, 255, 255, 0.2);
  }
  
  @keyframes barGrow {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }
  
  .bar-column::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.2), transparent);
    border-radius: 6px 6px 0 0;
  }
  
  .bar-tooltip {
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(42, 30, 92, 0.95);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 229, 255, 0.3);
    z-index: 10;
    white-space: nowrap;
  }
  
  .bar-tooltip::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgba(42, 30, 92, 0.95);
  }
  
  .x-axis {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  
  .x-label {
    font-size: 11px;
    color: var(--text-secondary);
    text-align: center;
    width: 20%;
  }
  
  /* Enhanced Line Chart Styles */
  .widget-header {
    margin-bottom: 20px;
  }
  
  .chart-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .time-filter {
    display: flex;
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 3px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .time-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    padding: 8px 16px;
    border-radius: 16px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .time-btn::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
    z-index: -1;
  }
  
  .time-btn:hover::before {
    width: 120%;
    height: 120%;
  }
  
  .time-btn.active {
    background: var(--accent-gradient);
    color: white;
    box-shadow: 0 2px 8px rgba(0, 229, 255, 0.3);
    transform: translateY(-1px);
  }
  
  .chart-insights {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .insight-card {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    flex: 1;
    min-width: 180px;
    transition: all 0.3s ease;
  }
  
  .insight-card:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
  
  .insight-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .insight-icon.positive {
    background: linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(0, 102, 255, 0.2));
    color: #00E5FF;
  }
  
  .insight-icon.negative {
    background: linear-gradient(135deg, rgba(255, 77, 109, 0.2), rgba(255, 155, 80, 0.2));
    color: #FF4D6D;
  }
  
  .insight-value {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
  }
  
  .insight-label {
    font-size: 13px;
    color: var(--text-secondary);
  }
  
  /* Heatmap Styles */
  .heatmap-widget {
    margin-top: 30px;
  }
  
  .heatmap-container {
    display: flex;
    margin-top: 20px;
  }
  
  .heatmap-y-axis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 10px;
    width: 40px;
  }
  
  .heatmap-y-label {
    font-size: 11px;
    color: var(--text-secondary);
    text-align: right;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  
  .heatmap-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(24, 1fr);
    gap: 2px;
    height: 300px;
  }
  
  .heatmap-cell {
    border-radius: 2px;
    transition: all 0.3s ease;
    cursor: pointer;
    opacity: 0;
    animation: fadeIn 0.5s forwards;
  }
  
  .heatmap-cell:hover {
    transform: scale(1.2);
    z-index: 10;
  }
  
  .heatmap-x-axis {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    width: 100%;
  }
  
  .heatmap-x-label {
    font-size: 11px;
    color: var(--text-secondary);
    text-align: center;
    width: 14.28%;
  }
  
  .heatmap-legend {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    gap: 5px;
  }
  
  .heatmap-legend-gradient {
    width: 200px;
    height: 10px;
    border-radius: 5px;
    background: linear-gradient(to right, hsl(240, 80%, 50%), hsl(120, 80%, 50%), hsl(0, 80%, 50%));
  }
  
  .heatmap-legend-labels {
    display: flex;
    justify-content: space-between;
    width: 200px;
  }
  
  .heatmap-legend-labels span {
    font-size: 11px;
    color: var(--text-secondary);
  }
  
  .heatmap-tooltip {
    position: fixed;
    background-color: rgba(42, 30, 92, 0.95);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    pointer-events: none;
    z-index: 1000;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 229, 255, 0.3);
    transform: translate(-50%, -100%);
    white-space: nowrap;
  }
  
  .heatmap-tooltip::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgba(42, 30, 92, 0.95);
  }
  
  /* Responsive adjustments for new charts */
  @media (max-width: 992px) {
    .donut-chart {
      width: 150px;
      height: 150px;
    }
    
    .gauge {
      width: 180px;
      height: 100px;
    }
    
    .gauge-value {
      font-size: 24px;
    }
    
    .chart-controls {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .time-filter {
      width: 100%;
      justify-content: space-between;
    }
    
    .chart-insights {
      flex-direction: column;
    }
    
    .insight-card {
      width: 100%;
    }
    
    .heatmap-grid {
      height: 250px;
    }
  }
  
  @media (max-width: 768px) {
    .donut-chart {
      width: 130px;
      height: 130px;
    }
    
    .donut-legend {
      flex-direction: column;
      align-items: center;
    }
    
    .gauge {
      width: 150px;
      height: 90px;
    }
    
    .gauge-stats {
      flex-direction: column;
      gap: 10px;
    }
    
    .heatmap-grid {
      height: 200px;
      gap: 1px;
    }
  }
  
  @media (max-width: 576px) {
    .donut-chart {
      width: 120px;
      height: 120px;
    }
    
    .donut-value {
      font-size: 20px;
    }
    
    .gauge {
      width: 130px;
      height: 80px;
    }
    
    .gauge-value {
      font-size: 20px;
    }
    
    .heatmap-grid {
      height: 180px;
      gap: 1px;
    }
    
    .heatmap-y-axis, .heatmap-x-axis {
      display: none;
    }
  }
`

document.head.appendChild(chartStyles)
