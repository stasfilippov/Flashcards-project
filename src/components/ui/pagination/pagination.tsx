import { ArrowIosBack, ArrowIosForward } from '@/assets/icons/components'
import { Typography } from '@/components/ui'
import { usePagination } from '@/components/ui/pagination/usePagination'
import { Select, SelectOption } from '@/components/ui/select'
import clsx from 'clsx'

import s from './pagination.module.scss'

type Props = {
  className?: string
  currentPage?: number
  disabled?: boolean
  itemsPerPage?: number
  onItemsPerPageChange: (itemsNumber: number) => void
  onPageChange: (pageNumber: number) => void
  paginationOptions?: number[]
  totalItems?: number
  totalPages?: number
}

const classNames = {
  backForwardButton(isDisabled: boolean) {
    return clsx(s.backForwardButton, { [s.disabled]: isDisabled })
  },
  page(isActive?: boolean) {
    return clsx(s.page, { [s.active]: isActive }, { [s.disabled]: isActive })
  },
  pagesContainer: s.pagesContainer,
  paginationContainer(className?: string) {
    return clsx(className, s.paginationContainer)
  },
}

export const Pagination = ({
  className,
  currentPage = 1,
  disabled = false,
  itemsPerPage = 5,
  onItemsPerPageChange,
  onPageChange,
  paginationOptions = [5, 10, 15, 20],
  totalPages = 1,
}: Props) => {
  const {
    isFirstPage,
    isLastPage,
    nextPageClickHandler,
    pageClickHandler,
    paginationRange,
    previousPageClickHandler,
  } = usePagination({ currentPage, onPageChange, totalPages })

  const selectOptions = usePaginationOptions(paginationOptions)

  return (
    <Typography
      className={classNames.paginationContainer(className)}
      component={'div'}
      variant={'body2'}
    >
      <div className={classNames.pagesContainer}>
        <button
          className={classNames.backForwardButton(isFirstPage)}
          disabled={isFirstPage}
          onClick={previousPageClickHandler}
        >
          <ArrowIosBack height={16} width={16} />
        </button>

        <PaginationRange
          currentPage={currentPage}
          pageClickHandler={pageClickHandler}
          paginationRange={paginationRange}
        />

        <button
          className={classNames.backForwardButton(isLastPage)}
          disabled={isLastPage}
          onClick={nextPageClickHandler}
        >
          <ArrowIosForward height={16} width={16} />
        </button>
      </div>
      <div className={s.selectContainer}>
        Show
        <Select
          className={s.select}
          disabled={disabled}
          onValueChange={value => onItemsPerPageChange(+value)}
          options={selectOptions}
          value={itemsPerPage.toString()}
        />
        on the page
      </div>
    </Typography>
  )
}

const usePaginationOptions = (paginationOptions: number[]): SelectOption[] => {
  return paginationOptions.map(option => {
    return { label: option, value: option.toString() }
  })
}

type PaginationRangeProps = {
  currentPage: number
  pageClickHandler: (page: number) => void
  paginationRange: (number | string)[]
}

const PaginationRange = ({
  currentPage,
  pageClickHandler,
  paginationRange,
}: PaginationRangeProps) => {
  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const isActive = page === currentPage

        if (typeof page !== 'number') {
          return <span key={index}>&#8230;</span>
        }

        return (
          <button
            className={classNames.page(isActive)}
            disabled={isActive}
            key={index}
            onClick={() => pageClickHandler(page)}
          >
            {page}
          </button>
        )
      })}
    </>
  )
}
