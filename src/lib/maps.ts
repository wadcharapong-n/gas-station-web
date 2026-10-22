export function directionsUrl(lat: number, lng: number): string {
  const q = encodeURIComponent(`${lat},${lng}`)
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`
}

export function embedMapUrl(lat: number, lng: number, apiKey: string | undefined): string | null {
  if (!apiKey) return null
  return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(apiKey)}&q=${lat},${lng}&zoom=16`
}
