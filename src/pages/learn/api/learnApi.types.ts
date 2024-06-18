export type GetRandomCardArgs = {
  deckId: string
}

export enum GRADE {
  ALotOfThought = 3,
  Confused = 4,
  DidNotKnow = 1,
  Forgot = 2,
  KnewTheAnswer = 5,
}

export type SaveTheGradeArgs = {
  cardId: string
  grade: GRADE
}
