import { useForm } from 'react-hook-form'

import { ControlledRadioGroup } from '@/components/controlled'
import { Button, RadioGroupOptions } from '@/components/ui'
import { GRADE } from '@/pages/learn/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type Props = {
  onSubmit: (value: string) => void
}

const ratingSchema = z.object({
  rating: z.string(),
})

type FormValues = z.infer<typeof ratingSchema>

export const RateYourselfForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(ratingSchema),
  })

  const options: RadioGroupOptions[] = [
    { label: 'Did not know', value: `${GRADE.DidNotKnow}` },
    { label: 'Forgot', value: `${GRADE.Forgot}` },
    { label: 'Thought a lot', value: `${GRADE.ALotOfThought}` },
    { label: 'A little confused', value: `${GRADE.Confused}` },
    { label: 'Knew the answer', value: `${GRADE.KnewTheAnswer}` },
  ]

  const submitHandler = (data: FormValues) => {
    onSubmit(data.rating)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      Rate yourself:
      <ControlledRadioGroup control={control} name={'rating'} options={options} />
      <Button fullWidth type={'submit'}>
        Next Question
      </Button>
    </form>
  )
}
