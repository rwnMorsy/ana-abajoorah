const ICONS = {
  abajorat: { id: 'lamp', viewBox: '0 0 120 200', color: '#c9a36b' },
  najaf: { id: 'chand', viewBox: '0 0 160 200' },
  shabohat: { id: 'shade', viewBox: '0 0 140 160', color: '#d8b98a' },
  spots: { id: 'spot', viewBox: '0 0 160 160' },
}

export default function Icon({ slug }) {
  const icon = ICONS[slug] || ICONS.abajorat
  return (
    <svg viewBox={icon.viewBox} style={{ color: icon.color }} aria-hidden="true">
      <use href={`#${icon.id}`} />
    </svg>
  )
}
