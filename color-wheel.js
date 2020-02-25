export function generateColorWheel(colors, radius) {
  const borderWidth = radius / 8
  const colorWheel = document.createElement('div')
  colorWheel.style.display = 'none'
  colorWheel.style.position = 'fixed'
  for (const index in colors) {
    const sector = document.createElement('div')
    sector.style.position = 'absolute'
    sector.style.background = colors[index]
    sector.style.width = `${radius << 1}px`
    sector.style.height = `${radius << 1}px`
    sector.style.borderRadius = '100%'
    sector.style.transform = `rotate(${(index * 360) / colors.length + 45}deg)`
    const deg45 = Math.PI / 4
    const percentage = (Math.tan(deg45) - Math.tan(deg45 - (2 * Math.PI) / colors.length)) * 50
    sector.style.webkitClipPath = sector.style.clipPath = `polygon(50% 50%, 0% 0%, ${percentage}% 0%)`
    colorWheel.appendChild(sector)
  }
  const center = document.createElement('div')
  center.style.position = 'absolute'
  center.style.background = 'white'
  center.style.left = `${(radius >> 1) - borderWidth}px`
  center.style.top = `${(radius >> 1) - borderWidth}px`
  center.style.width = `${radius}px`
  center.style.height = `${radius}px`
  center.style.border = `solid ${borderWidth}px white`
  center.style.borderRadius = '100%'
  colorWheel.appendChild(center)
  return {
    colorWheel,
    handleRotate(angle, r) {
      const index = colors.length - Math.floor((angle / 2) * colors.length) - 1
      const strokeStyle = colors[index]
      const lineHalfWidth = Math.max(Math.min((r - radius) << 1, radius), 0.5)
      center.style.background = strokeStyle
      center.style.width = `${lineHalfWidth}px`
      center.style.height = `${lineHalfWidth}px`
      center.style.border = `solid ${(radius - lineHalfWidth) / 2 + borderWidth}px ${
        strokeStyle === '#FFFFFF' ? '#000000' : '#FFFFFF'
      }`
      return { strokeStyle, lineWidth: lineHalfWidth * 2 }
    },
    showColorWheel(x, y) {
      colorWheel.style.left = `${x - radius}px`
      colorWheel.style.top = `${y - radius}px`
      colorWheel.style.display = 'block'
    },
    hideColorWheel() {
      colorWheel.style.display = 'none'
    },
  }
}
