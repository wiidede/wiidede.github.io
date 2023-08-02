import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  // presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  shortcuts: [
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100'],
    ['tag', 'rounded bg-zinc:15 px-1 py-0.5 text-xs text-zinc-5 inline-block'],
    ['under-base', 'no-underline relative inline-block before:(absolute bottom-0.1em left-0 right-0 b-b b-zinc-400/50 content-[\'\'])'],
    ['under-anime', 'no-underline relative inline-block after:(absolute bottom-0.1em left-0 w-0 b-b-0 b-zinc-400 transition-all duration-500 content-[\'\'])'],
    ['under-anime-r', 'relative inline-block after:(absolute bottom-0.1em right-0 w-0 b-b-0 b-zinc-400 transition-all duration-500 content-[\'\'])'],
    ['under-anime-hover', 'after:(w-full b-b-1)'],
    ['btn-border', 'border border-zinc/33 hover:border-zinc/67 focus:border-zinc/50 active:border-zinc/50'],
    ['flex-center', 'flex items-center justify-center'],
    ['flex-v-center', 'flex items-center'],
    ['flex-h-center', 'flex justify-center'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'flex': '0 0 auto',
      },
      collections: {
        the: FileSystemIconLoader(
          './assets/icons',
        ),
      },
    }),
    presetTypography(),
    // presetWebFonts({
    //   fonts: {
    //     sans: 'Mulish',
    //     serif: 'Bitter',
    //     mono: 'JetBrains Mono',
    //   },
    // }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose m-auto text-left'.split(' '),
  variants: [
    // child:
    (matcher) => {
      if (!matcher.startsWith('child:'))
        return matcher
      return {
        matcher: matcher.slice(6),
        selector: s => `${s}>*`,
      }
    },
  ],
  rules: [
    [/^animate-count-(\d+|infinite)$/, ([, d]) => ({ 'animation-iteration-count': d === 'infinite' ? d : +d })],
    [/^animate-delay-(\d+)$/, ([, d]) => ({ 'animation-delay': `${d}ms` })],
    [/^animate-duration-(\d+)$/, ([, d]) => ({ 'animation-duration': `${d}ms` })],
  ],
})
