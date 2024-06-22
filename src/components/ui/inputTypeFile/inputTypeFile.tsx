import React, { ComponentPropsWithoutRef, useRef, useState } from 'react'

import { ImageOutline } from '@/assets/icons/components'
import defaultImg from '@/assets/img/no-image.jpg'
import { Button } from '@/components/ui'
import { upload } from '@/components/ui/inputTypeFile/utils/upload'
import clsx from 'clsx'

import s from './inputTypeFile.module.scss'

type Props = {
  className?: string
  cover: File | null
  label: string
  previewImg?: null | string
  setCover: (file: File | null) => void
  setImageDeleted: (isImageDeleted: boolean) => void
  setPreview: (file: null | string) => void
} & ComponentPropsWithoutRef<'input'>
export const InputTypeFile = ({
  className,
  cover,
  previewImg,
  setCover,
  setImageDeleted,
  setPreview,
}: Props) => {
  const [isBroken, setIsBroken] = useState(false)
  const internalRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    internalRef && internalRef.current?.click()
  }

  const deleteImageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setImageDeleted(true)
    setCover(null)
    setPreview(null)
  }

  const errorHandler = () => {
    setIsBroken(true)
    alert('Кривая картинка')
  }

  const classNames = {
    buttonsWrapper: clsx(s.buttonsWrapper),
    imgWrapper: clsx(s.imageWrapper),
    input: clsx(s.input),
  }

  return (
    <label className={className}>
      {previewImg && (
        <div className={classNames.imgWrapper}>
          <img
            alt={'preview'}
            onError={errorHandler}
            src={isBroken ? defaultImg : previewImg.toString()}
          />
        </div>
      )}
      <input
        accept={'image/png, image/gif, image/jpeg'}
        className={classNames.input}
        onChange={e => upload(e, setCover)}
        ref={internalRef}
        type={'file'}
      />
      <div className={classNames.buttonsWrapper}>
        {(cover || previewImg) && (
          <Button onClick={deleteImageHandler} type={'button'} variant={'secondary'}>
            Delete
          </Button>
        )}
        <Button
          fullWidth={!previewImg}
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
