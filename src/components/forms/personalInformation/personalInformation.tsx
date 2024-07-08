import { ChangeEvent, useRef, useState } from 'react'

import { Edit2Outline } from '@/assets/icons/components'
import { commonStyles } from '@/common/styles'
import { User } from '@/components/layout'
import { Avatar, Button, Card } from '@/components/ui'
import { UpdateProfileArgs } from '@/pages/profile/api'

import s from './personalInformation.module.scss'

import { ChangeNicknameForm, NicknameFormValues } from './changeNicknameForm'
import { PersonalInformationContent } from './personalInformationContent'

type Props = {
  onSubmit: (args: UpdateProfileArgs) => void
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
    if (e.target.files && e.target.files.length) {
      const avatar = e.target.files[0]

      onSubmit({ avatar })
    }
  }

  const changeNicknameHandler = ({ nickname }: NicknameFormValues) => {
    onSubmit({ name: nickname })
  }

  const content = editMode ? (
    <ChangeNicknameForm
      closeEditMode={closeEditModeHandler}
      name={user.name}
      onSubmit={changeNicknameHandler}
    />
  ) : (
    <PersonalInformationContent
      email={user.email}
      nickname={user.name}
      openEditMode={openEditModeHandler}
    />
  )

  return (
    <div className={commonStyles.cardContainer}>
      <Card className={s.card} title={'Personal information'}>
        <div className={s.avatar}>
          <Avatar size={'large'} src={user.avatar ?? undefined} />
          {!editMode && (
            <>
              <Button
                className={s.editPhoto}
                icon={<Edit2Outline width={16} />}
                onClick={editPhotoBtnHandler}
                variant={'secondary'}
              />
              <input
                accept={'image/png, image/gif, image/jpeg'}
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
