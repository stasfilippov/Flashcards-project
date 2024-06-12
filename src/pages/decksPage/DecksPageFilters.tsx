import { TrashOutline } from '@/assets/icons/components'
import { Button, Slider, Tabs, TabsList, TabsTrigger, TextField, Typography } from '@/components/ui'

import s from './DecksPage.module.scss'

type Props = {
  clearFilters: () => void
  currentTabValue: string
  decksRangeValue: number[]
  searchValue: string
  setCurrentTabValue: (currentTabValue: string) => void
  setDecksRangeValue: (decksRangeValue: number[]) => void
  setSearchValue: (searchValue: string) => void
}
export const DecksPageFilters = (props: Props) => {
  const {
    clearFilters,
    currentTabValue,
    decksRangeValue,
    searchValue,
    setCurrentTabValue,
    setDecksRangeValue,
    setSearchValue,
  } = props
  const changeSearchValueHandler = (searchValue: string) => {
    setSearchValue(searchValue)
  }
  const changeDecksRangeHandler = (decksRange: number[]) => {
    setDecksRangeValue(decksRange)
  }

  return (
    <div className={s.filtersContainer}>
      <TextField
        className={s.searchInput}
        inputChangeHandler={changeSearchValueHandler}
        placeholder={'Input search'}
        type={'search'}
        value={searchValue}
      />
      <div className={s.tabsBox}>
        <Typography variant={'body2'}>Show decks cards</Typography>
        <Tabs onValueChange={setCurrentTabValue} value={currentTabValue}>
          <TabsList>
            <TabsTrigger value={'7e299074-faab-44be-b840-05e7a8a77b14'}>My Cards</TabsTrigger>
            <TabsTrigger value={''}>All Cards</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className={s.sliderBox}>
        <Typography variant={'body2'}>Number of cards</Typography>
        <Slider
          minStepsBetweenThumbs={1}
          onValueChange={changeDecksRangeHandler}
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
