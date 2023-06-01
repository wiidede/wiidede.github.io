import _dayjs from 'dayjs'

export const dayjs = _dayjs

export const isDark = useDark()
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()
