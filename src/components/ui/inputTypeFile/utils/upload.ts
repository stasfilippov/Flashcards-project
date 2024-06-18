import { ChangeEvent } from 'react'

export const upload = (
  e: ChangeEvent<HTMLInputElement>,
  setPreviewImgHandler: (file64: string) => void,
  setUploadImgHandler: (file: File | null) => void
) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0]

    if (file.size < 4000000) {
      setUploadImgHandler(file)
      convertFileToBase64(file, setPreviewImgHandler)
    } else {
      console.error('Error: ', 'Файл слишком большого размера')
    }
  }
}

const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
  const reader = new FileReader()

  reader.onloadend = () => {
    const file64 = reader.result as string

    callBack(file64)
  }
  reader.readAsDataURL(file)
}
