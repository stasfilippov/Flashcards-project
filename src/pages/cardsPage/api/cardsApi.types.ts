import { SortValues } from '@/pages/decksPage/api/decksApi.types'

export type GetCardsArgs = {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: SortValues
  question?: string
}

export type GetCardsResponse = {
  items: Card[]
  pagination: Pagination
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type Card = {
  answer: string
  answerImg: null | string
  answerVideo: null | string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: null | string
  shots: number
  updated: string
  userId: string
}

export type GetDeckByIdResponse = {
  cardsCount: number
  cover: string
  created: string
  id: string
  isFavorite: boolean
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type GetDeckByIdArgs = {
  id: string
}

export type CreateCardArgs = {
  answer: string
  answerImg?: string
  answerVideo?: string
  id: string
  question: string
  questionImg?: string
  questionVideo?: string
}
