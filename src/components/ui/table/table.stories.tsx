import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table/table'

import s from './table.module.scss'

const meta = {
  argTypes: {},
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

//!--packs
// [
//   {
//     "id": "clvfklx8r028mnx01d0zwn6vl",
//     "userId": "01d5498b-2849-49f1-b6c1-7c5dc204bdde",
//     "name": "А ты сделал DnD?!1",
//     "isPrivate": false,
//     "cover": "https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/e0a229b7-8601-4a7d-b7b7-68c5321cc6f5_sun-icon.png",
//     "created": "2024-04-25T18:21:46.252Z",
//     "updated": "2024-05-30T19:04:15.651Z",
//     "cardsCount": 3,
//     "isFavorite": false,
//     "author": {
//       "id": "01d5498b-2849-49f1-b6c1-7c5dc204bdde",
//       "name": "Пупсик"
//     }
//   },
//   {
//     "id": "clwti7ygx03tzqj01difp81ai",
//     "userId": "3752c89f-88b2-4e81-9344-8b3d61afecbe",
//     "name": "ждлорпавы",
//     "isPrivate": false,
//     "cover": "https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/574ab75f-d30a-4fe4-88bd-3c7e6181a1ca_593a772a913111eeac812ab2a9c6ab46_upscaled.jpeg",
//     "created": "2024-05-30T17:03:24.226Z",
//     "updated": "2024-05-30T17:14:26.573Z",
//     "cardsCount": 2,
//     "isFavorite": false,
//     "author": {
//       "id": "3752c89f-88b2-4e81-9344-8b3d61afecbe",
//       "name": "alinamurashko"
//     }
//   },
//   {
//     "id": "clwthve6203t5qj018y7fclln",
//     "userId": "e67f3260-559a-48d1-a18b-cfd8915db68a",
//     "name": "123",
//     "isPrivate": false,
//     "cover": null,
//     "created": "2024-05-30T16:53:38.042Z",
//     "updated": "2024-05-30T16:53:38.042Z",
//     "cardsCount": 0,
//     "isFavorite": false,
//     "author": {
//       "id": "e67f3260-559a-48d1-a18b-cfd8915db68a",
//       "name": "moisidiroman"
//     }
//   },
// ]
//!--deck
// [
//   {
//     "answer": "Котики",
//     "answerImg": "https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/567584f2-402c-4eef-88df-0462e6264608_images.jpeg",
//     "answerVideo": null,
//     "created": "2024-05-30T17:13:32.256Z",
//     "deckId": "clwti7ygx03tzqj01difp81ai",
//     "grade": 0,
//     "id": "clwtikzmo03usqj01o3qinmbu",
//     "question": "Котики",
//     "questionImg": null,
//     "questionVideo": null,
//     "shots": 0,
//     "updated": "2024-05-30T17:14:13.625Z",
//     "userId": "3752c89f-88b2-4e81-9344-8b3d61afecbe"
//   },
//   {
//     "answer": "Котики",
//     "answerImg": null,
//     "answerVideo": null,
//     "created": "2024-05-30T17:14:07.435Z",
//     "deckId": "clwti7ygx03tzqj01difp81ai",
//     "grade": 0,
//     "id": "clwtilqrv03uvqj01e4hnt1or",
//     "question": "Котики",
//     "questionImg": "https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/b15ec9ba-00c5-41fa-992c-1d9610f38948_images (1).jpeg",
//     "questionVideo": null,
//     "shots": 0,
//     "updated": "2024-05-30T17:14:07.435Z",
//     "userId": "3752c89f-88b2-4e81-9344-8b3d61afecbe"
//   }
// ]

const TableWithState = () => {
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
  ])

  return (
    <div className={s.outerContainer}>
      <Table>
        <TableHeader columns={columns} />
        <TableBody>
          <TableRow>
            <TableCell className={'font-medium'}>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className={'text-right'}>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={'font-medium'}>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className={'text-right'}>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={'font-medium'}>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className={'text-right'}>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={'font-medium'}>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className={'text-right'}>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={'font-medium'}>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className={'text-right'}>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={'font-medium'}>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className={'text-right'}>$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export const DecksList: Story = {
  render: () => <TableWithState />,
}
