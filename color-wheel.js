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
    sector.style.transform = `rotate(${index * 18 + 45}deg)`
    sector.style.clipPath = 'polygon(50% 50%, 0% 0%, 25% 0%)'
    sector.style.webkitClipPath = 'polygon(50% 50%, 0% 0%, 25% 0%)'
    colorWheel.appendChild(sector)
  }
  const center = document.createElement('div')
  center.style.position = 'absolute'
  center.style.left = `${(radius >> 1) - borderWidth}px`
  center.style.top = `${(radius >> 1) - borderWidth}px`
  center.style.background = 'white'
  center.style.width = `${radius}px`
  center.style.height = `${radius}px`
  center.style.borderRadius = '100%'
  center.style.border = `solid ${borderWidth}px white`
  colorWheel.appendChild(center)
  function handleColorSelect(color) {
    center.style.background = color
  }
  return { colorWheel, handleColorSelect }
}
