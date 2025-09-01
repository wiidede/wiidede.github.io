import antfu from '@antfu/eslint-config'
import pluginCasePolice from 'eslint-plugin-case-police'

export default antfu(
  {
    formatters: true,
    unocss: true,
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
  {
    name: 'case-police',
    files: ['**/*.?([cm])[jt]s?(x)'],
    plugins: {
      'case-police': pluginCasePolice,
    },
    rules: {
      'case-police/string-check': 'warn',
    },
  },
)
