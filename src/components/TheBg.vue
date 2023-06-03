<script setup='props' lang='ts'>
const router = useRouter()

// utils
let dpi = 1
let width = window.screen.width
let height = window.screen.height
let D = (width + height) / 8
const timeout = 120
function setCanvasSize(canvas: HTMLCanvasElement, width: number, height: number) {
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpi * width
  canvas.height = dpi * height
  const ctx = canvas.getContext('2d')!
  ctx.scale(dpi, dpi)
}
function initCanvas(canvas: HTMLCanvasElement, width = 400, height = 400, _dpi?: number) {
  const ctx = canvas.getContext('2d')!

  const dpr = window.devicePixelRatio || 1
  // @ts-expect-error webkit
  const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1

  dpi = _dpi || dpr / bsr

  setCanvasSize(canvas, width, height)

  return { ctx, dpi }
}
function toHex(c: number) {
  return c.toString(16).padStart(2, '0')
}
function random(max = 1, min = 0) {
  return Math.random() * (max - min) + min
}
type Vector = [number, number]
function square(a: number) {
  return a ** 2
}
function distance([x1, y1]: Vector, [x2, y2]: Vector) {
  return Math.sqrt(square(x1 - x2) + square(y1 - y2))
}

const el = ref<HTMLCanvasElement>()

const { round, max } = Math

let ts = 0
let scrollHandler: () => void
let resizeHandler: () => void
onMounted(async () => {
  const canvas = el.value!
  const { ctx } = initCanvas(canvas, width, height)

  let points: [number, number, number][] = []

  function getFade(t = 0, ts = 0) {
    return 1 - (ts - t) / timeout
  }

  function updateCanvas() {
    ts += 1

    points.push([
      random(width + 100, -100),
      random(height + 100, -100),
      ts,
    ])

    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 0.2
    points = points.filter(([x, y, t], idx) => {
      const fade = getFade(t, ts)
      if (fade < 0)
        return false

      if (idx !== 0) {
        for (let ni = 1; ni < idx; ni++) {
          const [x1, y1, t2] = points[ni - 1]
          if (distance([x1, y1], [x, y]) < D) {
            const fade2 = getFade(t2, ts)
            const color = max(0, round(fade * fade2 * 255))
            ctx.strokeStyle = `#000000${toHex(color)}`
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x, y)
            ctx.stroke()
          }
        }
      }

      return true
    })
  }

  let steps = 0
  let targetD = D
  function startUpdate(step?: number) {
    if (step && steps !== 0) {
      steps += step
      return
    }
    else if (step) {
      steps += step
    }
    if (steps > timeout)
      steps = timeout
    if (targetD !== D)
      D += (targetD - D) / steps
    steps -= 1
    if (steps === 0)
      return
    updateCanvas()
    window.requestAnimationFrame(() => {
      startUpdate()
    })
  }
  startUpdate(timeout)

  // let oldTop = 0
  scrollHandler = () => {
    updateCanvas()
  }
  window.addEventListener('scroll', scrollHandler)

  resizeHandler = () => {
    width = window.screen.width
    height = window.screen.height
    targetD = (width + height) / 8
    setCanvasSize(canvas, width, height)
    startUpdate(timeout)
  }
  window.addEventListener('resize', resizeHandler)

  router.beforeEach(() => {
    startUpdate(timeout)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
  window.removeEventListener('resize', resizeHandler)
})
</script>

<template>
  <div class="fixed left-0 top-0 z--1 op33">
    <canvas ref="el" :width="width" :height="height" />
  </div>
</template>
