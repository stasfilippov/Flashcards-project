import { ChangeEvent, useRef, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { ImageOutline } from '@/assets/icons/components'
import { Button } from '@/components/ui'
import { FormValues } from '@/pages/cardsPage/modals/addNewCard/addNewCardModal'
import clsx from 'clsx'

import s from './inputTypeFile.module.scss'

type Props = {
  label: 'answer' | 'answerImg' | 'question' | 'questionImg'
  register: UseFormRegister<FormValues>
}
export const InputTypeFile = ({ label, register }: Props) => {
  const [previewSource, setPreviewSource] = useState('')
  const internalRef = useRef<HTMLInputElement>(null)

  const { ref: registerRef, ...rest } = register(label)
  const selectFileHandler = () => {
    internalRef && internalRef.current?.click()
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file) {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setPreviewSource(reader.result)
          } else {
            console.error('Result is not a string:', reader.result)
          }
        }
      }
    }
  }

  const deleteImageHandler = () => {
    setPreviewSource('')
  }

  const classNames = {
    buttonsWrapper: clsx(s.buttonsWrapper),
    imgWrapper: clsx(s.imageWrapper),
    input: clsx(s.input),
  }

  return (
    <label>
      {previewSource && (
        <div className={classNames.imgWrapper}>
          <img alt={'chosen'} src={previewSource} />
        </div>
      )}
      <input
        accept={'image/png, image/gif, image/jpeg'}
        className={classNames.input}
        type={'file'}
        {...rest}
        onChange={uploadHandler}
        ref={e => {
          registerRef(e)
          internalRef.current = e
        }}
      />
      <div className={classNames.buttonsWrapper}>
        {previewSource && (
          <Button onClick={deleteImageHandler} type={'button'} variant={'secondary'}>
            Delete
          </Button>
        )}
        <Button
          fullWidth={!previewSource}
          icon={<ImageOutline width={16} />}
          onClick={selectFileHandler}
          type={'button'}
          variant={'secondary'}
        >
          Upload Image
        </Button>
      </div>
    </label>
  )
}
