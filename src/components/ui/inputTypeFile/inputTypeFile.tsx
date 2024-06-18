import { ComponentPropsWithoutRef, useRef, useState } from 'react'

import { ImageOutline } from '@/assets/icons/components'
import defaultImg from '@/assets/img/no-image.jpg'
import { Button } from '@/components/ui'
import { upload } from '@/components/ui/inputTypeFile/utils/upload'
import clsx from 'clsx'

import s from './inputTypeFile.module.scss'

type Props = {
  className: string
  label: string
  setUploadImgHandler: (file: File | null) => void
} & ComponentPropsWithoutRef<'input'>
export const InputTypeFile = ({ className, setUploadImgHandler }: Props) => {
  const [previewSource, setPreviewSource] = useState(defaultImg)
  const [isBroken, setIsBroken] = useState(false)
  const internalRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    internalRef && internalRef.current?.click()
  }

  const deleteImageHandler = () => {
    setUploadImgHandler(null)
    setPreviewSource(defaultImg)
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
      {previewSource && (
        <div className={classNames.imgWrapper}>
          <img alt={'preview'} onError={errorHandler} src={isBroken ? defaultImg : previewSource} />
        </div>
      )}
      <input
        accept={'image/png, image/gif, image/jpeg'}
        className={classNames.input}
        onChange={e => upload(e, setPreviewSource, setUploadImgHandler)}
        ref={internalRef}
        type={'file'}
      />
      <div className={classNames.buttonsWrapper}>
        {previewSource && (
          <Button
            disabled={previewSource === defaultImg}
            onClick={deleteImageHandler}
            type={'button'}
            variant={'secondary'}
          >
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
