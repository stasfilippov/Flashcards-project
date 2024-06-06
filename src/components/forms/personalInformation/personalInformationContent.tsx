import { Link } from 'react-router-dom'

import { Edit2Outline, LogOutOutline } from '@/assets/icons/components'
import { ROUTES } from '@/common/constants'
import { Typography } from '@/components/ui'
import { Button } from '@/components/ui/button'

import s from './personalInformation.module.scss'
type Props = {
  email: string
  nickname: string
  openEditMode: () => void
}
export const PersonalInformationContent = ({ email, nickname, openEditMode }: Props) => {
  return (
    <>
      <div className={s.nicknameBox}>
        <Typography variant={'h2'}>{nickname}</Typography>
        <Edit2Outline className={s.editNickname} onClick={openEditMode} width={16} />
      </div>
      <Typography className={s.email} variant={'body2'}>
        {email}
      </Typography>
      <Button as={Link} icon={<LogOutOutline width={16} />} to={ROUTES.base} variant={'secondary'}>
        Logout
      </Button>
    </>
  )
}
