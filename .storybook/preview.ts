import type { Preview } from '@storybook/react'
import '../src/styles/index.scss'
import { themes } from '@storybook/theming'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000000',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ['autodocs']
}

export default preview
