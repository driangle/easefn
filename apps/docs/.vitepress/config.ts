import { defineConfig } from 'vitepress'
import path from 'node:path'

export default defineConfig({
  title: 'easefn',
  description: 'A simple easing function library',
  base: '/easefn/',

  vite: {
    resolve: {
      alias: {
        easefn: path.resolve(__dirname, '../../../ts/src/index.ts'),
      },
    },
  },

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Easings', link: '/easings/' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Getting Started', link: '/guide/getting-started' }],
      },
      {
        text: 'Easings',
        items: [
          { text: 'All Easings', link: '/easings/' },
          { text: 'Linear', link: '/easings/linear' },
          { text: 'Quadratic', link: '/easings/quad' },
          { text: 'Cubic', link: '/easings/cubic' },
          { text: 'Sine', link: '/easings/sine' },
          { text: 'Exponential', link: '/easings/expo' },
          { text: 'Circular', link: '/easings/circ' },
          { text: 'Bounce', link: '/easings/bounce' },
        ],
      },
      {
        text: 'Configurable Easings',
        items: [
          { text: 'Polynomial', link: '/easings/poly' },
          { text: 'Exponential (factory)', link: '/easings/expo-factory' },
          { text: 'Back', link: '/easings/back' },
          { text: 'Elastic', link: '/easings/elastic' },
        ],
      },
    ],
  },
})
