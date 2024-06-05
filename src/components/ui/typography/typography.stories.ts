import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [
        'body1',
        'body2',
        'caption',
        'h1',
        'h2',
        'h3',
        'h4',
        'link1',
        'link2',
        'overline',
        'subtitle1',
        'subtitle2',
      ],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>
const children = 'Carosserie Test Zürich\n' + 'Stauffacherstrasse 31\n' + '8004 Zürich, ZH, CH'

export const H1: Story = {
  args: {
    children,
    component: 'h1',
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    children,
    component: 'h2',
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    children,
    component: 'h3',
    variant: 'h3',
  },
}

export const H4: Story = {
  args: {
    children,
    component: 'h4',
    variant: 'h4',
  },
}

export const Body1: Story = {
  args: {
    children,
    component: 'p',
    variant: 'body1',
  },
}

export const Subtitle1: Story = {
  args: {
    children,
    component: 'h5',
    variant: 'subtitle1',
  },
}

export const Body2: Story = {
  args: {
    children,
    component: 'p',
    variant: 'body2',
  },
}

export const Subtitle2: Story = {
  args: {
    children,
    component: 'h5',
    variant: 'subtitle2',
  },
}

export const Caption: Story = {
  args: {
    children,
    component: 'p',
    variant: 'caption',
  },
}

export const Overline: Story = {
  args: {
    children,
    variant: 'overline',
  },
}

export const Link1: Story = {
  args: {
    children,
    component: 'a',
    href: 'https://google.com',
    target: '_blank',
    variant: 'link1',
  },
}

export const Link2: Story = {
  args: {
    children,
    component: 'a',
    href: 'https://it-incubator.io/education/front-end',
    target: '_blank',
    variant: 'link2',
  },
}
