// Augment Navigator type for iOS PWA detection
declare global {
  interface Navigator {
    standalone?: boolean
  }
}

/**
 * Detect if app is running in PWA mode
 */
export default (): boolean =>
  window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true
