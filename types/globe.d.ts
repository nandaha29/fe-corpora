declare module 'globe.gl' {
  export interface GlobeInstance {
    (element: HTMLElement): GlobeInstance
    globeImageUrl(url: string): GlobeInstance
    bumpImageUrl(url: string): GlobeInstance
    backgroundColor(color: string): GlobeInstance
    width(width: number): GlobeInstance
    height(height: number): GlobeInstance
    pointsData(data: any[]): GlobeInstance
    pointAltitude(altitude: number | ((d: any) => number)): GlobeInstance
    pointRadius(radius: number | ((d: any) => number)): GlobeInstance
    pointColor(color: string | ((d: any) => string)): GlobeInstance
    pointLabel(label: string | ((d: any) => string)): GlobeInstance
    pointsTransitionDuration(duration: number): GlobeInstance
    onPointClick(callback: (point: any, event: MouseEvent, coords: { lat: number; lng: number }) => void): GlobeInstance
    onGlobeClick(callback: (coords: { lat: number; lng: number }, event: MouseEvent) => void): GlobeInstance
    pointOfView(pov: { lat: number; lng: number; altitude: number }, transitionMs?: number): GlobeInstance
    controls(): any
    _destructor?(): void
  }

  export interface ConfigOptions {
    waitForGlobeReady?: boolean
    animateIn?: boolean
  }

  const Globe: {
    new (configOptions?: ConfigOptions): GlobeInstance
    default: {
      new (configOptions?: ConfigOptions): GlobeInstance
    }
  }

  export default Globe
}
