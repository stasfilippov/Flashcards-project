import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Table, TableBody, TableRow } from '@/components/ui/table/table'
import { TableCellWithControls } from '@/components/ui/table/tableCell/tableCellWithControls'
import { TableCellWithGrade } from '@/components/ui/table/tableCell/tableCellWithGrade'
import { TableCellWithPhotoDecks } from '@/components/ui/table/tableCell/tableCellWithPhotoDecks'
import { TableCellWithPhotoQuestions } from '@/components/ui/table/tableCell/tableCellWithPhotoQuestions'
import { TableCellWithText } from '@/components/ui/table/tableCell/tableCellWithText'
import { TableHeader } from '@/components/ui/table/tableHeader'
import { formatDateToDdMmYY } from '@/components/ui/table/utils/convertDate'

import s from './table.module.scss'

const meta = {
  argTypes: {},
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const TableWithStateOfDecks = () => {
  const [decks] = useState([
    {
      author: {
        id: '01d5498b-2849-49f1-b6c1-7c5dc204bdde',
        name: 'Пупсик',
      },
      cardsCount: 3,
      cover:
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/e0a229b7-8601-4a7d-b7b7-68c5321cc6f5_sun-icon.png',
      created: '2024-04-25T18:21:46.252Z',
      id: 'clvfklx8r028mnx01d0zwn6vl',
      isFavorite: false,
      isPrivate: false,
      name: 'А ты сделал DnD?!1',
      updated: '2024-05-30T19:04:15.651Z',
      userId: '01d5498b-2849-49f1-b6c1-7c5dc204bdde',
    },
    {
      author: {
        id: '3752c89f-88b2-4e81-9344-8b3d61afecbe',
        name: 'alinamurashko',
      },
      cardsCount: 2,
      cover:
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/574ab75f-d30a-4fe4-88bd-3c7e6181a1ca_593a772a913111eeac812ab2a9c6ab46_upscaled.jpeg',
      created: '2024-05-30T17:03:24.226Z',
      id: 'clwti7ygx03tzqj01difp81ai',
      isFavorite: false,
      isPrivate: false,
      name: 'ждлорпавы',
      updated: '2024-05-30T17:14:26.573Z',
      userId: '3752c89f-88b2-4e81-9344-8b3d61afecbe',
    },
    {
      author: {
        id: 'e67f3260-559a-48d1-a18b-cfd8915db68a',
        name: 'moisidiroman',
      },
      cardsCount: 0,
      cover: null,
      created: '2024-05-30T16:53:38.042Z',
      id: 'clwthve6203t5qj018y7fclln',
      isFavorite: false,
      isPrivate: false,
      name: '123',
      updated: '2024-05-30T16:53:38.042Z',
      userId: 'e67f3260-559a-48d1-a18b-cfd8915db68a',
    },
  ])

  const [columns] = useState([
    {
      id: 'name',
      title: 'Name',
    },
    {
      id: 'cardsCount',
      title: 'Cards',
    },
    {
      id: 'updated',
      title: 'Last Updated',
    },
    {
      id: 'created',
      title: 'Created by',
    },
    {
      id: 'controls',
      sortable: false,
      title: null,
    },
  ])

  return (
    <BrowserRouter>
      <div className={s.outerContainer}>
        <Table>
          <TableHeader columns={columns} />
          <TableBody>
            {decks.map(deck => (
              <TableRow key={deck.id}>
                <TableCellWithPhotoDecks id={'name'} item={deck}>
                  {deck.name}
                </TableCellWithPhotoDecks>
                <TableCellWithText id={'cardsCount'}>{deck.cardsCount}</TableCellWithText>
                <TableCellWithText id={'updatedDeck'}>
                  {formatDateToDdMmYY(deck.updated)}
                </TableCellWithText>
                <TableCellWithText id={'created'}>{deck.author.name}</TableCellWithText>
                <TableCellWithControls id={'controls'} item={deck} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </BrowserRouter>
  )
}

const TableWithStateOfQuestions = () => {
  const [questions] = useState([
    {
      answer: 'Tin',
      answerImg: null,
      answerVideo: null,
      created: '2024-04-22T14:48:51.955Z',
      deckId: 'clvb1n01f00ognx01veotzkpc',
      grade: 0,
      id: 'clvb2okj700oqnx01su1xmc9n',
      question: 'What element is denoted by the chemical symbol Sn in the periodic table?',
      questionImg: null,
      questionVideo: null,
      shots: 0,
      updated: '2024-06-01T13:44:09.235Z',
      userId: '70383690-0d88-4474-bd58-bbcb21cb27d8',
    },
    {
      answer: 'Krone',
      answerImg: null,
      answerVideo: null,
      created: '2024-04-22T14:55:25.314Z',
      deckId: 'clvb1n01f00ognx01veotzkpc',
      grade: 0,
      id: 'clvb2x01t00oznx01ycofizeo',
      question: 'What is the currency of Denmark?',
      questionImg: null,
      questionVideo: null,
      shots: 0,
      updated: '2024-06-01T13:43:10.071Z',
      userId: '70383690-0d88-4474-bd58-bbcb21cb27d8',
    },
    {
      answer: 'Four (The Godfather Part 2, Heat, Righteous Kill, The Irishman)',
      answerImg:
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/d03771ea-9a23-4535-8cf0-ab86203571e4_robert-deniro-al-pacino-053123-aff8d3b4ba864cfe982676733b4a879a.jpg',
      answerVideo: null,
      created: '2024-04-22T14:57:00.540Z',
      deckId: 'clvb1n01f00ognx01veotzkpc',
      grade: 1,
      id: 'clvb2z1j000p0nx01386l0u8s',
      question: 'How many films have Al Pacino and Robert De Niro appeared in together?',
      questionImg:
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/1776e69e-6a89-41a4-9790-89a6cb32986e_al-pacino-robert-de-niro-mc-1x1-230515-copy-2-dd0c8c.webp',
      questionVideo: null,
      shots: 0,
      updated: '2024-05-12T15:39:43.375Z',
      userId: '70383690-0d88-4474-bd58-bbcb21cb27d8',
    },
  ])

  const [columns] = useState([
    {
      id: 'question',
      title: 'Question',
    },
    {
      id: 'answer',
      title: 'Answer',
    },
    {
      id: 'updated',
      title: 'Last Updated',
    },
    {
      id: 'grade',
      title: 'Grade',
    },
  ])

  return (
    <BrowserRouter>
      <div className={s.outerContainer}>
        <Table>
          <TableHeader columns={columns} />
          <TableBody>
            {questions.map(question => (
              <TableRow key={question.id}>
                <TableCellWithPhotoQuestions id={'question'} item={question}>
                  {question.question}
                </TableCellWithPhotoQuestions>
                <TableCellWithPhotoQuestions id={'answer'} item={question}>
                  {question.answer}
                </TableCellWithPhotoQuestions>
                <TableCellWithText id={'updatedQuestion'}>
                  {formatDateToDdMmYY(question.updated)}
                </TableCellWithText>
                <TableCellWithGrade id={'grade'} item={question} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </BrowserRouter>
  )
}

export const DecksList: Story = {
  render: () => <TableWithStateOfDecks />,
}

export const QuestionList: Story = {
  render: () => <TableWithStateOfQuestions />,
}
