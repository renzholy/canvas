export function generateColorWheel(size) {
  const colors = [
    '#B71C1C',
    '#880E4F',
    '#4A148C',
    '#311B92',
    '#1A237E',
    '#0D47A1',
    '#01579B',
    '#006064',
    '#004D40',
    '#1B5E20',
    '#33691E',
    '#827717',
    '#F57F17',
    '#FF6F00',
    '#E65100',
    '#BF360C',
    '#3E2723',
    '#212121',
    '#263238',
    '#000000',
  ]
  const colorWheel = document.createElement('div')
  colorWheel.style.display = 'none'
  colorWheel.style.position = 'fixed'
  for (const index in colors) {
    const sector = document.createElement('div')
    sector.style.position = 'absolute'
    sector.style.background = colors[index]
    sector.style.width = `${size}px`
    sector.style.height = `${size}px`
    sector.style.borderRadius = '100%'
    sector.style.transform = `rotate(${index * 18 + 45}deg)`
    sector.style.clipPath = 'polygon(50% 50%, 0% 0%, 25% 0%)'
    colorWheel.appendChild(sector)
  }
  return colorWheel
}
