import { TrashOutline } from '@/assets/icons/components'
import { Button, Slider, Tabs, TabsList, TabsTrigger, TextField, Typography } from '@/components/ui'

import s from '../decksPage.module.scss'

type Props = {
  changeSearchValue: (searchValue: string) => void
  clearFilters: () => void
  currentTabValue: string
  decksRangeValue: number[]
  searchValue: string
  setCurrentTabValue: (currentTabValue: string) => void
  setDecksRangeValue: (decksRangeValue: number[]) => void
}
export const DecksPageFilters = (props: Props) => {
  const {
    changeSearchValue,
    clearFilters,
    currentTabValue,
    decksRangeValue,
    searchValue,
    setCurrentTabValue,
    setDecksRangeValue,
  } = props

  return (
    <div className={s.filtersContainer}>
      <TextField
        className={s.searchInput}
        inputChangeHandler={changeSearchValue}
        placeholder={'Input search'}
        type={'search'}
        value={searchValue}
      />
      <div className={s.tabsBox}>
        <Typography variant={'body2'}>Show decks cards</Typography>
        <Tabs onValueChange={setCurrentTabValue} value={currentTabValue}>
          <TabsList>
            <TabsTrigger value={'~caller'}>My Cards</TabsTrigger>
            <TabsTrigger value={''}>All Cards</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className={s.sliderBox}>
        <Typography variant={'body2'}>Number of cards</Typography>
        <Slider
          minStepsBetweenThumbs={1}
          onValueChange={setDecksRangeValue}
          value={decksRangeValue}
        />
      </div>
      <Button
        className={s.clearFilterBtn}
        icon={<TrashOutline width={16} />}
        onClick={clearFilters}
        variant={'secondary'}
      >
        Clear Filter
      </Button>
    </div>
  )
}
