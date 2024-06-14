import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useRef, useState } from 'react'

import { ImageOutline } from '@/assets/icons/components'
import { Button } from '@/components/ui'
import { mergeRefs } from '@/components/ui/textField/utils'
import clsx from 'clsx'

import s from './inputTypeFile.module.scss'

type Props = {
  name: string
} & ComponentPropsWithoutRef<'input'>
export const InputTypeFile = forwardRef<HTMLInputElement, Props>(
  ({ name, ...props }, forwardRef) => {
    const [previewSource, setPreviewSource] = useState('')
    const internalRef = useRef<HTMLInputElement>(null)
    const finalRef = mergeRefs([forwardRef, internalRef])

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
          name={name}
          onChange={uploadHandler}
          ref={finalRef}
          type={'file'}
          {...props}
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
)
