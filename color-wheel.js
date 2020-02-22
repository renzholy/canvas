export function generateColorWheel(radius, handleColorSelect) {
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
  colorWheel.onmousemove = function(e) {
    const x = e.pageX - this.offsetLeft - radius
    const y = -(e.pageY - this.offsetTop - radius)
    const r = Math.sqrt(x * x + y * y)
    const angle = (Math.atan2(y, x) / Math.PI + 1.5) % 2
    const index = colors.length - Math.floor((angle / 2) * colors.length) - 1
    if (r > radius >> 1) {
      center.style.background = colors[index]
      handleColorSelect(colors[index])
    } else {
      center.style.background = '#FFFFFF'
      handleColorSelect('#FFFFFF')
    }
  }
  return { colorWheel }
}
