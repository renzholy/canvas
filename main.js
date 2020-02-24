import { generateColorWheel } from './color-wheel.js'

const c = document.getElementById('c')
const ctx = c.getContext('2d')
const scale = window.devicePixelRatio
const colorWheelRadius = 120
const colors = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B',
  '#000000',
]

const { colorWheel, handleColorSelect } = generateColorWheel(colors, colorWheelRadius)
document.body.appendChild(colorWheel)

function onResize() {
  c.width = window.innerWidth * scale
  c.height = window.innerHeight * scale
}

document.body.onresize = () => {
  onResize()
}

document.body.ontouchstart = e => {
  switch (e.touches.length) {
    case 1: {
      ctx.beginPath()
      ctx.moveTo(e.touches[0].clientX * scale, e.touches[0].clientY * scale)
      break
    }
    case 2: {
      colorWheel.style.left = `${(e.touches[0].clientX + e.touches[1].clientX) / 2 -
        colorWheelRadius}px`
      colorWheel.style.top = `${(e.touches[0].clientY + e.touches[1].clientY) / 2 -
        colorWheelRadius}px`
      colorWheel.style.display = 'block'
      break
    }
  }
}

document.body.ontouchmove = e => {
  switch (e.touches.length) {
    case 1: {
      ctx.lineTo(e.touches[0].clientX * scale, e.touches[0].clientY * scale)
      ctx.stroke()
      break
    }
    case 2: {
      const x = e.touches[0].clientX - e.touches[1].clientX
      const y = e.touches[1].clientY - e.touches[0].clientY
      const r = Math.sqrt(x * x + y * y)
      const angle = (Math.atan2(y, x) / Math.PI + 1.5) % 2
      const index = colors.length - Math.floor((angle / 2) * colors.length) - 1
      const color = r > colorWheelRadius ? colors[index] : '#FFFFFF'
      ctx.strokeStyle = color
      handleColorSelect(color)
      break
    }
  }
}

document.body.ontouchend = document.body.ontouchcancel = e => {
  colorWheel.style.display = 'none'
  ctx.moveTo(e.clientX * scale, e.clientY * scale)
}

document.body.onmousedown = e => {
  switch (e.buttons) {
    case 1: {
      ctx.beginPath()
      ctx.moveTo(e.clientX * scale, e.clientY * scale)
      break
    }
    case 2: {
      colorWheel.style.left = `${e.clientX - colorWheelRadius}px`
      colorWheel.style.top = `${e.clientY - colorWheelRadius}px`
      colorWheel.style.display = 'block'
      break
    }
  }
}

document.body.onmousemove = e => {
  switch (e.buttons) {
    case 1: {
      ctx.lineTo(e.clientX * scale, e.clientY * scale)
      ctx.stroke()
      break
    }
    case 2: {
      const x = e.clientX - colorWheel.offsetLeft - colorWheelRadius
      const y = -(e.clientY - colorWheel.offsetTop - colorWheelRadius)
      const r = Math.sqrt(x * x + y * y)
      const angle = (Math.atan2(y, x) / Math.PI + 1.5) % 2
      const index = colors.length - Math.floor((angle / 2) * colors.length) - 1
      const color = r > colorWheelRadius >> 1 ? colors[index] : '#FFFFFF'
      ctx.strokeStyle = color
      handleColorSelect(color)
      break
    }
  }
}

document.body.onmouseup = document.body.onmouseleave = e => {
  colorWheel.style.display = 'none'
  ctx.moveTo(e.clientX * scale, e.clientY * scale)
}

document.body.oncontextmenu = e => {
  e.preventDefault()
}

window.onload = () => {
  document.addEventListener(
    'touchstart',
    event => {
      event.preventDefault()
    },
    { passive: false },
  )
}

onResize()
