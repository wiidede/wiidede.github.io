export function hashNavigate() {
  if (location.hash) {
    const titleEl = document.getElementById(location.hash.slice(1))
    if (titleEl) {
      const top = Math.max(titleEl.getBoundingClientRect().top + document.documentElement.scrollTop - (isMdScreen.value ? 0 : 48), 0)
      document.documentElement.scrollTo({ top, behavior: 'smooth' })
    }
  }
}
