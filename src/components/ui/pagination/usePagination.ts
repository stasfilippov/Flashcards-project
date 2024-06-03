import { useCallback, useMemo } from 'react'

// original code: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/

const calculateRange = (start: number, end: number) => {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}

const DOTS = '...'

type UsePagination = {
  currentPage: number
  onPageChange: (pageNumber: number) => void
  siblings?: number
  totalPages: number
}

type PaginationRange = (number | typeof DOTS)[]

export const usePagination = ({
  currentPage,
  onPageChange,
  siblings = 1,
  totalPages,
}: UsePagination) => {
  const paginationRange = useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + page + 2*DOTS
    const totalPageNumbers = siblings + 5

    if (totalPageNumbers >= totalPages) {
      return calculateRange(1, totalPages)
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, 1)
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPages

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblings
      const leftRange = calculateRange(1, leftItemCount)

      return [...leftRange, DOTS, totalPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblings
      const rightRange = calculateRange(totalPages - rightItemCount + 1, totalPages)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = calculateRange(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [siblings, currentPage, totalPages]) as PaginationRange

  const lastPage = paginationRange.at(-1)

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === lastPage

  const nextPageClickHandler = useCallback(() => {
    onPageChange(currentPage + 1)
  }, [currentPage, onPageChange])

  const previousPageClickHandler = useCallback(() => {
    onPageChange(currentPage - 1)
  }, [currentPage, onPageChange])

  const pageClickHandler = (pageNumber: number) => {
    onPageChange(pageNumber)
  }

  return {
    isFirstPage,
    isLastPage,
    nextPageClickHandler,
    pageClickHandler,
    paginationRange,
    previousPageClickHandler,
  }
}
