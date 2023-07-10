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
    ['tag', 'rounded bg-zinc:15 px-1 py-0.5 text-xs text-zinc5 inline-block'],
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
})
