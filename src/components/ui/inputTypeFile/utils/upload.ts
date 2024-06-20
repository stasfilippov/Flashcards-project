import { ChangeEvent } from 'react'

export const upload = (e: ChangeEvent<HTMLInputElement>, setCover: (file: File | null) => void) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0]

    if (file.size < 4000000) {
      setCover(file)
    } else {
      console.error('Error: ', 'Файл слишком большого размера')
    }
  }
}
