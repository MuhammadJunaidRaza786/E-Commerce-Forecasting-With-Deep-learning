document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations for chart elements
  initializeChartAnimations()

  // Time filter buttons
  const timeButtons = document.querySelectorAll(".time-btn")
  timeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Show loading state
      showChartLoading()

      timeButtons.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Simulate data loading
      setTimeout(() => {
        updateChartsForTimePeriod(btn.textContent.trim().toLowerCase())
        hideChartLoading()
      }, 800)
    })
  })

  // Initialize all charts
  initializeLineChart()
  initializeBarChart()
  initializeDonutChart()
  initializeScatterPlot()
  initializeAreaChart()

  // Make charts responsive
  window.addEventListener("resize", handleResponsiveCharts)
  handleResponsiveCharts() // Run on page load

  // Animate charts on scroll
  window.addEventListener("scroll", handleChartAnimation)
  handleChartAnimation() // Check on page load
})

// Initialize animations for chart elements
function initializeChartAnimations() {
  // Set animation delays for data points
  const dataPoints = document.querySelectorAll(".data-point")
  dataPoints.forEach((point, index) => {
    point.style.setProperty("--index", index)
  })

  // Set animation delays for scatter points
  const scatterPoints = document.querySelectorAll(".scatter-point")
  scatterPoints.forEach((point, index) => {
    point.style.setProperty("--index", index)
  })

  // Set animation for donut segments
  const donutSegments = document.querySelectorAll(".donut-segment")
  donutSegments.forEach((segment) => {
    const dashArray = segment.getAttribute("stroke-dasharray").split(" ")[0]
    const dashOffset = segment.getAttribute("stroke-dashoffset")
    segment.style.setProperty("--dash-offset", dashOffset)
    segment.setAttribute("stroke-dashoffset", "251.2") // 2 * PI * 40
  })
}

// Line Chart Interactivity
function initializeLineChart() {
  const linePoints = document.querySelectorAll(".line-chart .data-point")
  const lineTooltip = document.getElementById("line-tooltip")
  const lineTooltipDate = document.getElementById("line-tooltip-date")
  const lineTooltipValue = document.getElementById("line-tooltip-value")

  if (linePoints && lineTooltip) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

    linePoints.forEach((point, index) => {
      point.addEventListener("mouseenter", (e) => {
        const rect = point.getBoundingClientRect()
        const chartArea = point.closest(".chart-area").getBoundingClientRect()

        const x = rect.left + rect.width / 2 - chartArea.left
        const y = rect.top - chartArea.top - 15

        const value = point.getAttribute("data-value")
        const monthIndex = Math.floor(index % 6)

        lineTooltipDate.textContent = months[monthIndex]
        lineTooltipValue.textContent = value

        lineTooltip.style.left = `${x}px`
        lineTooltip.style.top = `${y}px`
        lineTooltip.classList.add("visible")
      })

      point.addEventListener("mouseleave", () => {
        lineTooltip.classList.remove("visible")
      })

      // Touch support
      point.addEventListener("touchstart", (e) => {
        e.preventDefault()
        const rect = point.getBoundingClientRect()
        const chartArea = point.closest(".chart-area").getBoundingClientRect()

        const x = rect.left + rect.width / 2 - chartArea.left
        const y = rect.top - chartArea.top - 15

        const value = point.getAttribute("data-value")
        const monthIndex = Math.floor(index % 6)

        lineTooltipDate.textContent = months[monthIndex]
        lineTooltipValue.textContent = value

        lineTooltip.style.left = `${x}px`
        lineTooltip.style.top = `${y}px`
        lineTooltip.classList.add("visible")

        // Hide tooltip after a delay
        setTimeout(() => {
          lineTooltip.classList.remove("visible")
        }, 2000)
      })
    })
  }
}

// Bar Chart Interactivity
function initializeBarChart() {
  const barColumns = document.querySelectorAll(".bar-column")

  barColumns.forEach((bar, index) => {
    // Set animation delay
    bar.style.animationDelay = `${index * 0.1}s`

    // Add touch support
    bar.addEventListener("touchstart", (e) => {
      e.preventDefault()
      const tooltip = bar.querySelector(".bar-tooltip")

      // Hide all other tooltips
      document.querySelectorAll(".bar-tooltip").forEach((t) => {
        if (t !== tooltip) {
          t.style.opacity = "0"
        }
      })

      // Show this tooltip
      tooltip.style.opacity = "1"
      tooltip.style.transform = "translateX(-50%) translateY(-5px)"

      // Hide tooltip after a delay
      setTimeout(() => {
        tooltip.style.opacity = "0"
        tooltip.style.transform = "translateX(-50%) translateY(0)"
      }, 2000)
    })
  })
}

// Donut Chart Interactivity
function initializeDonutChart() {
  const donutSegments = document.querySelectorAll(".donut-segment")
  const donutCenter = document.querySelector(".donut-center")
  const donutValue = document.querySelector(".donut-value")
  const donutLabel = document.querySelector(".donut-label")
  const donutTooltip = document.getElementById("donut-tooltip")
  const donutTooltipLabel = document.getElementById("donut-tooltip-label")
  const donutTooltipValue = document.getElementById("donut-tooltip-value")

  if (donutSegments && donutCenter) {
    donutSegments.forEach((segment) => {
      segment.addEventListener("mouseenter", (e) => {
        const value = segment.getAttribute("data-value")
        const label = segment.getAttribute("data-label")

        // Update center text
        donutValue.textContent = `${value}%`
        donutLabel.textContent = label

        // Highlight the segment
        donutSegments.forEach((seg) => {
          seg.style.opacity = "0.7"
        })
        segment.style.opacity = "1"

        // Show tooltip
        if (donutTooltip) {
          const rect = segment.getBoundingClientRect()
          const chartArea = segment.closest(".donut-chart").getBoundingClientRect()

          donutTooltipLabel.textContent = label
          donutTooltipValue.textContent = `${value}%`

          donutTooltip.style.left = `${rect.left + rect.width / 2 - chartArea.left}px`
          donutTooltip.style.top = `${rect.top - chartArea.top - 15}px`
          donutTooltip.classList.add("visible")
        }
      })

      segment.addEventListener("mouseleave", () => {
        // Reset to default (first segment)
        const defaultValue = donutSegments[0].getAttribute("data-value")
        const defaultLabel = donutSegments[0].getAttribute("data-label")

        donutValue.textContent = `${defaultValue}%`
        donutLabel.textContent = defaultLabel

        // Reset opacity
        donutSegments.forEach((seg) => {
          seg.style.opacity = "1"
        })

        if (donutTooltip) {
          donutTooltip.classList.remove("visible")
        }
      })

      // Touch support
      segment.addEventListener("touchstart", (e) => {
        e.preventDefault()
        const value = segment.getAttribute("data-value")
        const label = segment.getAttribute("data-label")

        // Update center text
        donutValue.textContent = `${value}%`
        donutLabel.textContent = label

        // Highlight the segment
        donutSegments.forEach((seg) => {
          seg.style.opacity = "0.7"
        })
        segment.style.opacity = "1"

        // Show tooltip
        if (donutTooltip) {
          const rect = segment.getBoundingClientRect()
          const chartArea = segment.closest(".donut-chart").getBoundingClientRect()

          donutTooltipLabel.textContent = label
          donutTooltipValue.textContent = `${value}%`

          donutTooltip.style.left = `${rect.left + rect.width / 2 - chartArea.left}px`
          donutTooltip.style.top = `${rect.top - chartArea.top - 15}px`
          donutTooltip.classList.add("visible")

          // Hide tooltip after a delay
          setTimeout(() => {
            donutTooltip.classList.remove("visible")

            // Reset opacity
            donutSegments.forEach((seg) => {
              seg.style.opacity = "1"
            })
          }, 2000)
        }
      })
    })
  }
}

// Scatter Plot Interactivity
function initializeScatterPlot() {
  const scatterPoints = document.querySelectorAll(".scatter-point")
  const scatterTooltip = document.getElementById("scatter-tooltip")
  const scatterTooltipX = document.getElementById("scatter-tooltip-x")
  const scatterTooltipY = document.getElementById("scatter-tooltip-y")

  if (scatterPoints && scatterTooltip) {
    scatterPoints.forEach((point) => {
      point.addEventListener("mouseenter", (e) => {
        const rect = point.getBoundingClientRect()
        const chartArea = point.closest(".chart-area").getBoundingClientRect()

        const x = rect.left + rect.width / 2 - chartArea.left
        const y = rect.top - chartArea.top - 15

        const xValue = point.getAttribute("data-x")
        const yValue = point.getAttribute("data-y")

        scatterTooltipX.textContent = `${xValue} min`
        scatterTooltipY.textContent = `${yValue}%`

        scatterTooltip.style.left = `${x}px`
        scatterTooltip.style.top = `${y}px`
        scatterTooltip.classList.add("visible")
      })

      point.addEventListener("mouseleave", () => {
        scatterTooltip.classList.remove("visible")
      })

      // Touch support
      point.addEventListener("touchstart", (e) => {
        e.preventDefault()
        const rect = point.getBoundingClientRect()
        const chartArea = point.closest(".chart-area").getBoundingClientRect()

        const x = rect.left + rect.width / 2 - chartArea.left
        const y = rect.top - chartArea.top - 15

        const xValue = point.getAttribute("data-x")
        const yValue = point.getAttribute("data-y")

        scatterTooltipX.textContent = `${xValue} min`
        scatterTooltipY.textContent = `${yValue}%`

        scatterTooltip.style.left = `${x}px`
        scatterTooltip.style.top = `${y}px`
        scatterTooltip.classList.add("visible")

        // Hide tooltip after a delay
        setTimeout(() => {
          scatterTooltip.classList.remove("visible")
        }, 2000)
      })
    })
  }
}

// Area Chart Interactivity
function initializeAreaChart() {
  // Add hover effects to the area chart
  const areaFills = document.querySelectorAll(".area-chart .area-fill")

  areaFills.forEach((area) => {
    area.addEventListener("mouseenter", () => {
      areaFills.forEach((a) => {
        if (a !== area) a.style.opacity = "0.2"
      })
      area.style.opacity = "0.8"
    })

    area.addEventListener("mouseleave", () => {
      areaFills.forEach((a) => {
        a.style.opacity = "0.5"
      })
    })
  })
}

// Animate charts on scroll
function handleChartAnimation() {
  const charts = document.querySelectorAll(".chart-widget")

  charts.forEach((chart) => {
    if (isElementInViewport(chart) && !chart.classList.contains("animated")) {
      chart.classList.add("animated")
    }
  })
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
}

// Responsive adjustments for charts
function handleResponsiveCharts() {
  const screenWidth = window.innerWidth

  // Adjust data point sizes
  adjustDataPointSizes(screenWidth)

  // Adjust chart heights
  adjustChartHeights(screenWidth)

  // Adjust donut and radar chart sizes
  adjustDonutRadarSizes(screenWidth)

  // Adjust text sizes for better readability on small screens
  adjustTextSizes(screenWidth)

  // Optimize touch interactions for mobile
  optimizeTouchInteractions(screenWidth)
}

// Adjust data point sizes based on screen width
function adjustDataPointSizes(screenWidth) {
  const dataPoints = document.querySelectorAll(".data-point")
  const scatterPoints = document.querySelectorAll(".scatter-point")
  const barColumns = document.querySelectorAll(".bar-column")

  let pointSize, scatterSizeMultiplier, barWidth

  if (screenWidth <= 480) {
    pointSize = 3
    scatterSizeMultiplier = 0.5
    barWidth = "80%"
  } else if (screenWidth <= 576) {
    pointSize = 3.5
    scatterSizeMultiplier = 0.6
    barWidth = "75%"
  } else if (screenWidth <= 768) {
    pointSize = 4
    scatterSizeMultiplier = 0.7
    barWidth = "70%"
  } else if (screenWidth <= 992) {
    pointSize = 4.5
    scatterSizeMultiplier = 0.8
    barWidth = "65%"
  } else {
    pointSize = 5
    scatterSizeMultiplier = 1
    barWidth = "60%"
  }

  dataPoints.forEach((point) => {
    point.setAttribute("r", pointSize)
  })

  scatterPoints.forEach((point) => {
    const originalR = Number.parseFloat(point.getAttribute("data-original-r") || point.getAttribute("r"))
    if (!point.hasAttribute("data-original-r")) {
      point.setAttribute("data-original-r", originalR)
    }
    point.setAttribute("r", originalR * scatterSizeMultiplier)
  })

  // Adjust bar widths for better visibility on small screens
  barColumns.forEach((bar) => {
    bar.style.width = barWidth
  })
}

// Adjust chart heights based on screen width
function adjustChartHeights(screenWidth) {
  const chartContainers = document.querySelectorAll(".line-chart, .area-chart, .scatter-chart, .bar-chart-container")

  let height

  if (screenWidth <= 480) {
    height = "160px"
  } else if (screenWidth <= 576) {
    height = "180px"
  } else if (screenWidth <= 768) {
    height = "200px"
  } else if (screenWidth <= 992) {
    height = "220px"
  } else {
    height = "250px"
  }

  chartContainers.forEach((container) => {
    container.style.height = height
  })
}

// Adjust donut and radar chart sizes
function adjustDonutRadarSizes(screenWidth) {
  const donutRadarCharts = document.querySelectorAll(".donut-chart, .radar-chart")

  let size

  if (screenWidth <= 480) {
    size = "120px"
  } else if (screenWidth <= 576) {
    size = "140px"
  } else if (screenWidth <= 768) {
    size = "160px"
  } else if (screenWidth <= 992) {
    size = "180px"
  } else {
    size = "200px"
  }

  donutRadarCharts.forEach((chart) => {
    chart.style.width = size
    chart.style.height = size
  })
}

// Adjust text sizes for better readability on small screens
function adjustTextSizes(screenWidth) {
  const chartTitles = document.querySelectorAll(".widget-title")
  const axisLabels = document.querySelectorAll(".y-label, .x-label")
  const legendItems = document.querySelectorAll(".legend-item")
  const donutValues = document.querySelectorAll(".donut-value")
  const donutLabels = document.querySelectorAll(".donut-label")

  if (screenWidth <= 480) {
    chartTitles.forEach((el) => (el.style.fontSize = "14px"))
    axisLabels.forEach((el) => (el.style.fontSize = "9px"))
    legendItems.forEach((el) => (el.style.fontSize = "10px"))
    donutValues.forEach((el) => (el.style.fontSize = "16px"))
    donutLabels.forEach((el) => (el.style.fontSize = "10px"))
  } else if (screenWidth <= 576) {
    chartTitles.forEach((el) => (el.style.fontSize = "15px"))
    axisLabels.forEach((el) => (el.style.fontSize = "10px"))
    legendItems.forEach((el) => (el.style.fontSize = "11px"))
    donutValues.forEach((el) => (el.style.fontSize = "18px"))
    donutLabels.forEach((el) => (el.style.fontSize = "11px"))
  } else if (screenWidth <= 768) {
    chartTitles.forEach((el) => (el.style.fontSize = "16px"))
    axisLabels.forEach((el) => (el.style.fontSize = "11px"))
    legendItems.forEach((el) => (el.style.fontSize = "12px"))
    donutValues.forEach((el) => (el.style.fontSize = "20px"))
    donutLabels.forEach((el) => (el.style.fontSize = "12px"))
  } else {
    // Reset to default sizes
    chartTitles.forEach((el) => (el.style.fontSize = ""))
    axisLabels.forEach((el) => (el.style.fontSize = ""))
    legendItems.forEach((el) => (el.style.fontSize = ""))
    donutValues.forEach((el) => (el.style.fontSize = ""))
    donutLabels.forEach((el) => (el.style.fontSize = ""))
  }
}

// Optimize touch interactions for mobile devices
function optimizeTouchInteractions(screenWidth) {
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

  if (isTouchDevice && screenWidth <= 768) {
    // Make tooltips more touch-friendly
    const tooltips = document.querySelectorAll(".chart-tooltip, .bar-tooltip, .donut-tooltip")
    tooltips.forEach((tooltip) => {
      tooltip.style.padding = "10px 15px"
      tooltip.style.fontSize = "12px"
    })

    // Increase touch target sizes
    const actionButtons = document.querySelectorAll(".action-btn")
    actionButtons.forEach((btn) => {
      btn.style.width = "30px"
      btn.style.height = "30px"
    })
  }
}

// Update charts for different time periods
function updateChartsForTimePeriod(period) {
  console.log(`Updating charts for time period: ${period}`)

  // This would typically fetch new data from an API
  // For demo purposes, we'll just update some visual aspects

  // Update line chart
  updateLineChartForPeriod(period)

  // Update bar chart
  updateBarChartForPeriod(period)

  // Update donut chart
  updateDonutChartForPeriod(period)

  // Update area chart
  updateAreaChartForPeriod(period)

  // Update scatter plot
  updateScatterPlotForPeriod(period)
}

// Helper functions for updating charts
function updateLineChartForPeriod(period) {
  // Simulate data changes
  const lineChart = document.querySelector(".line-chart .chart-svg path.line")
  const areaFill = document.querySelector(".line-chart .chart-svg path.area-fill")

  if (lineChart && areaFill) {
    let newPath, newAreaPath

    switch (period) {
      case "day":
        newPath = "M0,200 C100,180 200,100 300,120 C400,140 500,80 600,60"
        newAreaPath = "M0,200 C100,180 200,100 300,120 C400,140 500,80 600,60 L600,300 L0,300 Z"
        break
      case "week":
        newPath = "M0,150 C100,170 200,120 300,80 C400,100 500,60 600,90"
        newAreaPath = "M0,150 C100,170 200,120 300,80 C400,100 500,60 600,90 L600,300 L0,300 Z"
        break
      case "month":
        newPath = "M0,100 C100,120 200,80 300,60 C400,90 500,120 600,70"
        newAreaPath = "M0,100 C100,120 200,80 300,60 C400,90 500,120 600,70 L600,300 L0,300 Z"
        break
      case "year":
        newPath = "M0,180 C100,150 200,170 300,100 C400,50 500,70 600,40"
        newAreaPath = "M0,180 C100,150 200,170 300,100 C400,50 500,70 600,40 L600,300 L0,300 Z"
        break
    }

    // Animate the path changes
    lineChart.style.transition = "d 1s ease"
    areaFill.style.transition = "d 1s ease"

    // Set the new paths
    lineChart.setAttribute("d", newPath)
    areaFill.setAttribute("d", newAreaPath)

    // Update data points
    updateDataPoints(".line-chart .data-point", newPath)
  }
}

function updateBarChartForPeriod(period) {
  const bars = document.querySelectorAll(".bar-column")

  if (bars.length) {
    // Generate random heights based on period
    const heights = []
    const seed = period.charCodeAt(0) // Use first letter of period as random seed

    for (let i = 0; i < bars.length; i++) {
      // Generate a pseudo-random height between 30% and 95%
      const height = 30 + ((seed * (i + 1)) % 65)
      heights.push(height)
    }

    // Apply new heights with animation
    bars.forEach((bar, index) => {
      bar.style.transition = "height 1s cubic-bezier(0.22, 1, 0.36, 1)"
      bar.style.height = `${heights[index]}%`

      // Update tooltip value
      const tooltip = bar.querySelector(".bar-tooltip")
      if (tooltip) {
        tooltip.textContent = heights[index]
      }

      // Update data-value attribute
      bar.setAttribute("data-value", heights[index])
    })
  }
}

function updateDonutChartForPeriod(period) {
  const donutSegments = document.querySelectorAll(".donut-segment")
  const legendValues = document.querySelectorAll(".donut-legend .legend-value")

  if (donutSegments.length) {
    // Generate new values based on period
    const values = []
    const seed = period.charCodeAt(0)
    let total = 0

    for (let i = 0; i < donutSegments.length - 1; i++) {
      // Generate a pseudo-random value between 10 and 40
      const value = 10 + ((seed * (i + 1)) % 30)
      values.push(value)
      total += value
    }

    // Last segment is the remainder to make 100%
    values.push(100 - total)

    // Calculate stroke-dasharray and stroke-dashoffset
    let offset = 0
    donutSegments.forEach((segment, index) => {
      const value = values[index]
      const dashArray = `${value * 2.512} ${(100 - value) * 2.512}` // 2.512 = 2 * PI * 40 / 100

      // Update segment
      segment.setAttribute("stroke-dasharray", dashArray)
      segment.setAttribute("stroke-dashoffset", offset)
      segment.setAttribute("data-value", value)

      // Update offset for next segment
      offset += value * 2.512

      // Update legend value
      if (legendValues[index]) {
        legendValues[index].textContent = `${value}%`
      }
    })

    // Update center value (default to first segment)
    const donutValue = document.querySelector(".donut-value")
    if (donutValue) {
      donutValue.textContent = `${values[0]}%`
    }
  }
}

function updateAreaChartForPeriod(period) {
  const areaLines = document.querySelectorAll(".area-chart .line")
  const areaFills = document.querySelectorAll(".area-chart .area-fill")

  if (areaLines.length === 2 && areaFills.length === 2) {
    let newPaths = []
    let newAreaPaths = []

    switch (period) {
      case "day":
        newPaths = [
          "M0,150 C100,120 200,100 300,80 C400,60 500,90 600,70",
          "M0,200 C100,220 200,180 300,190 C400,200 500,170 600,180",
        ]
        newAreaPaths = [
          "M0,150 C100,120 200,100 300,80 C400,60 500,90 600,70 L600,300 L0,300 Z",
          "M0,200 C100,220 200,180 300,190 C400,200 500,170 600,180 L600,300 L0,300 Z",
        ]
        break
      case "week":
        newPaths = [
          "M0,120 C100,100 200,80 300,60 C400,90 500,70 600,50",
          "M0,180 C100,200 200,160 300,170 C400,180 500,150 600,160",
        ]
        newAreaPaths = [
          "M0,120 C100,100 200,80 300,60 C400,90 500,70 600,50 L600,300 L0,300 Z",
          "M0,180 C100,200 200,160 300,170 C400,180 500,150 600,160 L600,300 L0,300 Z",
        ]
        break
      case "month":
        newPaths = [
          "M0,100 C100,80 200,60 300,40 C400,70 500,50 600,30",
          "M0,160 C100,180 200,140 300,150 C400,160 500,130 600,140",
        ]
        newAreaPaths = [
          "M0,100 C100,80 200,60 300,40 C400,70 500,50 600,30 L600,300 L0,300 Z",
          "M0,160 C100,180 200,140 300,150 C400,160 500,130 600,140 L600,300 L0,300 Z",
        ]
        break
      case "year":
        newPaths = [
          "M0,170 C100,140 200,120 300,100 C400,80 500,110 600,90",
          "M0,220 C100,240 200,200 300,210 C400,220 500,190 600,200",
        ]
        newAreaPaths = [
          "M0,170 C100,140 200,120 300,100 C400,80 500,110 600,90 L600,300 L0,300 Z",
          "M0,220 C100,240 200,200 300,210 C400,220 500,190 600,200 L600,300 L0,300 Z",
        ]
        break
    }

    // Animate the path changes
    areaLines.forEach((line, index) => {
      line.style.transition = "d 1s ease"
      line.setAttribute("d", newPaths[index])
    })

    areaFills.forEach((fill, index) => {
      fill.style.transition = "d 1s ease"
      fill.setAttribute("d", newAreaPaths[index])
    })
  }
}

function updateScatterPlotForPeriod(period) {
  const scatterPoints = document.querySelectorAll(".scatter-point")
  const trendLine = document.querySelector(".trend-line")

  if (scatterPoints.length) {
    // Generate new positions based on period
    const seed = period.charCodeAt(0)

    // Update scatter points
    scatterPoints.forEach((point, index) => {
      // Generate pseudo-random positions
      const xBase = 50 + index * 70
      const yOffset = ((seed * (index + 1)) % 100) - 50
      const yBase = 250 - index * 25
      const y = Math.max(50, Math.min(250, yBase + yOffset))

      // Calculate point size based on position (higher = larger)
      const size = 6 + (250 - y) / 25

      // Update point attributes
      point.setAttribute("cx", xBase)
      point.setAttribute("cy", y)
      point.setAttribute("r", size)
      point.setAttribute("data-original-r", size)

      // Update data values
      const xValue = Math.floor(index + 1)
      const yValue = Math.floor((250 - y) / 25 + 1)
      point.setAttribute("data-x", xValue)
      point.setAttribute("data-y", yValue)
    })

    // Update trend line
    if (trendLine) {
      trendLine.setAttribute(
        "d",
        `M50,${scatterPoints[0].getAttribute("cy")} L550,${scatterPoints[scatterPoints.length - 1].getAttribute("cy")}`,
      )
    }
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

      // Update data value based on y position (higher = higher value)
      const value = Math.round(100 - points[index].y / 3)
      point.setAttribute("data-value", value)
    }
  })
}

// Show loading state for charts
function showChartLoading() {
  const charts = document.querySelectorAll(".chart-widget")

  charts.forEach((chart) => {
    // Create loading overlay if it doesn't exist
    let loading = chart.querySelector(".chart-loading")
    if (!loading) {
      loading = document.createElement("div")
      loading.className = "chart-loading"
      loading.innerHTML = '<div class="loading-spinner"></div>'
      chart.appendChild(loading)
    }

    // Show loading overlay
    loading.classList.add("visible")
  })
}

// Hide loading state for charts
function hideChartLoading() {
  const loadingOverlays = document.querySelectorAll(".chart-loading")

  loadingOverlays.forEach((overlay) => {
    overlay.classList.remove("visible")
  })
}
