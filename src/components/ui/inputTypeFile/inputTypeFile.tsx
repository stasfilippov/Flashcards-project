import { ChangeEvent, useRef } from 'react'

import { ImageOutline } from '@/assets/icons/components'
import { Button } from '@/components/ui'

import s from '@/pages/decksPage/modals/addDeck/addDeckModal.module.scss'

type Props = {
  name: string
}
export const InputTypeFile = ({ name }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)
    }
  }

  return (
    <label>
      <img src={''} />
      <input
        accept={'image/png, image/gif, image/jpeg'}
        name={name}
        onChange={uploadHandler}
        ref={inputRef}
        style={{ display: 'none' }}
        type={'file'}
      />
      <Button
        className={s.uploadBtn}
        fullWidth
        icon={<ImageOutline width={16} />}
        onClick={selectFileHandler}
        type={'button'}
        variant={'secondary'}
      />
    </label>
  )
}
