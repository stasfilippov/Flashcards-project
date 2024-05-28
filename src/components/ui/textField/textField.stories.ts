import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './'

const meta = {
  // argTypes: {
  //   variant: {
  //     control: { type: 'radio' },
  //     options: [
  //       'body1',
  //       'body2',
  //       'caption',
  //       'h1',
  //       'h2',
  //       'h3',
  //       'h4',
  //       'link1',
  //       'link2',
  //       'overline',
  //       'subtitle1',
  //       'subtitle2',
  //     ],
  //   },
  // },
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

const style = {
  width: '240px',
}

export const Default: Story = {
  args: {
    label: 'Input',
    placeholder: 'Input',
    style: style,
  },
}

export const TextFieldPassword: Story = {
  args: {
    label: 'Password',
    placeholder: 'Password',
    style: style,
    type: 'password',
  },
}

export const TextFieldSearch: Story = {
  args: {
    placeholder: 'Input search',
    style: style,
    type: 'search',
  },
}

export const TextFieldSearchWithError: Story = {
  args: {
    errorMessage: 'Error!',
    style: style,
    type: 'search',
  },
}

export const TextFieldDisabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Input search',
    style: style,
  },
}

export const PasswordFieldDisabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Input search',
    style: style,
    type: 'password',
  },
}

export const SearchFieldDisabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Input search',
    style: style,
    type: 'search',
  },
}
