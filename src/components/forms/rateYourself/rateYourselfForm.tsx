import { useForm } from 'react-hook-form'

import { ControlledRadioGroup } from '@/components/controlled'
import { Button, RadioGroupOptions, Typography } from '@/components/ui'
import { GRADE } from '@/pages/learn/api'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './rateYourselfForm.module.scss'

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

  const classNames = {
    radioGroup: clsx(s.radioGroup),
    subtitle: clsx(s.subtitle),
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Typography className={classNames.subtitle} variant={'subtitle1'}>
        Rate yourself:
      </Typography>
      <ControlledRadioGroup
        className={classNames.radioGroup}
        control={control}
        name={'rating'}
        options={options}
      />
      <Button fullWidth type={'submit'}>
        Next Question
      </Button>
    </form>
  )
}
