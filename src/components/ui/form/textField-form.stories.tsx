import type { Meta, StoryObj } from '@storybook/react'

import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { TextFieldForm } from '@/components/ui/form/textField-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const meta = {
  component: TextFieldForm,
  tags: ['autodocs'],
  title: 'Components/TextFieldForm',
} satisfies Meta<typeof TextFieldForm>

export default meta
type Story = StoryObj<typeof TextFieldForm>

const TextFieldFormStory = () => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  })

  type FormValues = z.infer<typeof loginSchema>

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <form onSubmit={onSubmit}>
      <TextFieldForm control={control} label={'Email'} name={'email'} />
      <TextFieldForm control={control} label={'Password'} name={'password'} type={'password'} />
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}

export const Default: Story = {
  render: () => <TextFieldFormStory />,
}
