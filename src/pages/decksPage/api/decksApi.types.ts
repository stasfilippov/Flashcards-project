export type DecksListResponse = {
  items: Deck[]
  pagination: Pagination
}

export type CreateUpdateDeckResponse = Omit<Deck, 'author' | 'isFavorite'>

export type Deck = {
  author: Author
  cardsCount: number
  cover: null | string
  created: string
  id: string
  isFavorite: boolean
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type Author = {
  id: string
  name: string
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type SortValues =
  | 'author.name-asc'
  | 'author.name-desc'
  | 'cardsCount-asc'
  | 'cardsCount-desc'
  | 'created-asc'
  | 'created-desc'
  | 'name-asc'
  | 'name-desc'
  | 'updated-asc'
  | 'updated-desc'
  | null

export type GetDecksArgs = {
  authorId?: string

  currentPage?: number
  favoritedBy?: string
  itemsPerPage?: number

  maxCardsCount?: number

  minCardsCount?: number

  name?: string
  orderBy?: SortValues
}

export type CreateDeckArgs = {
  cover?: string
  isPrivate?: boolean
  name: string
}

export type UpdateDeckArgs = {
  id: string
} & Partial<CreateDeckArgs>

export type RemoveDeckArgs = {
  id: string
}

export type SortBy =
  | 'answer'
  | 'author.name'
  | 'cardsCount'
  | 'controls'
  | 'created'
  | 'grade'
  | 'name'
  | 'question'
  | 'updated'
