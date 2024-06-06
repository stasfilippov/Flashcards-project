import { ChangeEvent, useRef, useState } from 'react'

import { Edit2Outline } from '@/assets/icons/components'
import { commonStyles } from '@/common/styles'
import {
  ChangeNicknameForm,
  NicknameFormValues,
} from '@/components/forms/personalInformation/changeNicknameForm'
import { PersonalInformationContent } from '@/components/forms/personalInformation/personalInformationContent'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import s from './personalInformation.module.scss'

type User = {
  email: string
  nickname: string
  photo: { alt: string; src: string }
}
type Props = {
  onSubmit: (args: NicknameFormValues) => void
  user: User
}
export const PersonalInformation = ({ onSubmit, user }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openEditModeHandler = () => {
    setEditMode(true)
  }
  const closeEditModeHandler = () => {
    setEditMode(false)
  }
  const editPhotoBtnHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const changePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
  }
  const content = editMode ? (
    <ChangeNicknameForm closeEditMode={closeEditModeHandler} onSubmit={onSubmit} />
  ) : (
    <PersonalInformationContent
      email={user.email}
      nickname={user.nickname}
      openEditMode={openEditModeHandler}
    />
  )

  return (
    <div className={commonStyles.cardContainer}>
      <Card className={s.card} title={'Personal information'}>
        <div className={s.avatar}>
          <Avatar size={'large'} src={user.photo.src} />
          {!editMode && (
            <>
              <Button
                className={s.editPhoto}
                icon={<Edit2Outline width={16} />}
                onClick={editPhotoBtnHandler}
                variant={'secondary'}
              />
              <input
                onChange={changePhotoHandler}
                ref={fileInputRef}
                style={{ display: 'none' }}
                type={'file'}
              />
            </>
          )}
        </div>
        {content}
      </Card>
    </div>
  )
}
