<script lang="ts" setup>
const glowCardRef = ref<HTMLDivElement>()

let pointerMove: (event: PointerEvent) => void

onMounted(() => {
  if (!glowCardRef.value)
    throw new Error('glowCardRef is not defined on Mounted')
  const CARD = glowCardRef.value

  const CONFIG = {
    proximity: 40, // 'proximity', 10, 180, 1
    opacity: 0, // 'opacity', 0, 1, 0.01
  }

  pointerMove = (event?: PointerEvent) => {
  // get the angle based on the center point of the card and pointer position
    // Check the card against the proximity and then start updating
    const CARD_BOUNDS = CARD.getBoundingClientRect()
    // Get distance between pointer and outerbounds of card
    if (
      event
      && event.x > CARD_BOUNDS.left - CONFIG.proximity
      && event.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity
      && event.y > CARD_BOUNDS.top - CONFIG.proximity
      && event.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity) {
      // If within proximity set the active opacity
      CARD.style.setProperty('--active', String(1))
    }
    else {
      CARD.style.setProperty('--active', String(CONFIG.opacity))
    }
    const CARD_CENTER = [
      CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
      CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
    ]
    if (event) {
      let ANGLE = Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) * 180 / Math.PI
      ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE
      CARD.style.setProperty('--start', String(ANGLE + 90))
    }
  }

  document.body.addEventListener('pointermove', pointerMove)
})

onUnmounted(() => {
  document.body.removeEventListener('pointermove', pointerMove)
})
</script>

<template>
  <div ref="glowCardRef" class="glow-card">
    <div class="glows" />
    <slot />
  </div>
</template>

<style scoped>
@property --start {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}

.glow-card {
  --blur: 20;
  --spread: 80;
}

.glow-card {
  --border: hsl(280 10% 50% / 1);
  /* --card: hsl(237 36% 10%); */
  --color: hsl(240 18% 80%);
  --border-width: 2px;
  --border-radius: 12px;
  --gradient: conic-gradient(
    from 180deg at 50% 70%,
    hsla(0, 0%, 98%, 1) 0deg,
    #ffcd1a 72.0000010728836deg,
    #ff6b6b 144.0000021457672deg,
    #9bd5ff 216.00000858306885deg,
    #4dffbf 288.0000042915344deg,
    hsla(0, 0%, 98%, 1) 1turn
  );
}

.dark .glow-card {
  --gradient: conic-gradient(
    from 180deg at 50% 70%,
    hsla(0, 0%, 98%, 1) 0deg,
    #eec32d 72.0000010728836deg,
    #ec4b4b 144.0000021457672deg,
    #709ab9 216.00000858306885deg,
    #4dffbf 288.0000042915344deg,
    hsla(0, 0%, 98%, 1) 1turn
  );
}

.glow-card {
  --active: 0.15;
  --start: 0;
  background: var(--c-card-bg);
  padding: 2rem;
  border-radius: var(--border-radius);
  /* aspect-ratio: 330 / 400; */
  position: relative;
}

.article:is(:hover, :focus-visible) {
  z-index: 2;
}

.glows {
  pointer-events: none;
  position: absolute;
  inset: 0;
  filter: blur(calc(var(--blur) * 1px));
}

.glows::after,
.glows::before {
  --alpha: 0;
  content: '';
  background: var(--gradient);
  background-attachment: fixed;
  position: absolute;
  inset: -5px;
  border: 10px solid transparent;
  border-radius: var(--border-radius);
  mask: linear-gradient(#0000, #0000),
    conic-gradient(
      from calc((var(--start) - (var(--spread) * 0.5)) * 1deg),
      #000 0deg,
      #fff,
      #0000 calc(var(--spread) * 1deg)
    );
  mask-composite: intersect;
  mask-clip: padding-box, border-box;
  opacity: var(--active);
  transition: opacity 1s;
}

.article::before {
  position: absolute;
  inset: 0;
  border: var(--border-width) solid transparent;
  content: '';
  border-radius: var(--border-radius);
  pointer-events: none;
  background: var(--border);
  background-attachment: fixed;
  border-radius: var(--border-radius);
  mask: linear-gradient(#0000, #0000),
    conic-gradient(
      from
        calc(
          ((var(--start) + (var(--spread) * 0.25)) - (var(--spread) * 1.5)) *
            1deg
        ),
      hsl(0 0% 100% / 0.15) 0deg,
      white,
      hsl(0 0% 100% / 0.15) calc(var(--spread) * 2.5deg)
    );
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
  opacity: var(--active);
  transition: opacity 1s;
}

.glow-card::after {
  --bg-size: 100%;
  content: '';
  pointer-events: none;
  position: absolute;
  background: var(--gradient);
  background-attachment: fixed;
  border-radius: var(--border-radius);
  opacity: var(--active, 0);
  transition: opacity 1s;
  --alpha: 0;
  inset: 0;
  border: var(--border-width) solid transparent;
  mask: linear-gradient(#0000, #0000),
    conic-gradient(
      from
        calc(
          ((var(--start) + (var(--spread) * 0.25)) - (var(--spread) * 0.5)) *
            1deg
        ),
      #0000 0deg,
      #fff,
      #0000 calc(var(--spread) * 0.5deg)
    );
  filter: brightness(1.5);
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
}
</style>
