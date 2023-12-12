import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    formatters: true,
  },
  {
    files: [
      '**/*.md/*.vue',
      '**/*.md/*.js',
    ],
    rules: {
      'vue/require-explicit-emits': 'off',
      'vue/no-deprecated-dollar-listeners-api': 'off',
      '@typescript-eslint/no-invalid-this': 'off',
      'vue/valid-attribute-name': 'off',
    },
  },
  unocss.configs.flat,
  ...compat.config({
    extends: [
      'plugin:case-police/recommended',
    ],
  }),
)
