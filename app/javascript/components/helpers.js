export function isMobile() {
  return typeof window === 'undefined' ? false : window.innerWidth <= 458;
}
