type Author = {
  id: string
  name: string
}

export type Deck = {
  author: Author
  cardsCount: number
  cover?: null | string
  created: string
  id: string
  isFavorite: boolean
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type QuestionAnswer = {
  answer: string
  answerImg?: null | string
  answerVideo?: null | string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: null | string
  questionVideo?: null | string
  shots: number
  updated: string
  userId: string
}
