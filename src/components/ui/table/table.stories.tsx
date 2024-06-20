import type { Meta, StoryObj } from '@storybook/react'

import { TableHeader, TableRow } from '@/components/ui'
import { Table } from '@/components/ui/table/table'
import { TableCellWithControls } from '@/components/ui/table/tableCell/tableCellWithControls'
import { Card } from '@/pages/cardsPage/api/cardsApi.types'
import { Deck, SortBy, SortValues } from '@/pages/decksPage/api/decksApi.types'
import { withRouter } from 'storybook-addon-remix-react-router'

const meta = {
  argTypes: {},
  component: Table,
  decorators: [withRouter],
  parameters: {
    query: {
      sort: null,
    },
  },
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const TableHeaderWithSearchParamsExample: Story = {
  render: () => {
    const ids: SortBy[] = ['name', 'cardsCount', 'updated', 'created', 'controls']
    const titles = ['Name', 'Cards', 'Last Updated', 'Created by', '']
    const columns = ids.map(id => ({
      id: id as SortBy,
      title: titles[ids.indexOf(id)],
    }))

    const urlParams = new URLSearchParams(document.location.search)
    const sort = urlParams.get('sort') as SortValues

    return (
      <Table>
        <TableHeader columns={columns} sortValue={sort} />
      </Table>
    )
  },
}

export const TableCellWithControlsOfDeckExample: Story = {
  render: () => {
    const currentUserId = 'f2be95b9-4d07-4751-a775-bd612fc955a'

    const deck: Deck = {
      author: {
        id: 'f2be95b9-4d07-4751-a775-bd612fc9553a',
        name: 'Sweety',
      },
      cardsCount: 12,
      cover: null,
      created: '2024-06-13T19:48:05.318Z',
      id: 'clxdo9o3q015ipb01yh1ulz36',
      isFavorite: false,
      isPrivate: false,
      name: 'Pick',
      updated: '2024-06-13T19:48:05.318Z',
      userId: 'f2be95b9-4d07-4751-a775-bd612fc9553a',
    }

    return (
      <Table>
        <TableRow>
          <TableCellWithControls
            id={'controls'}
            item={{ deck }}
            userId={currentUserId}
            variant={'Deck'}
          />
        </TableRow>
      </Table>
    )
  },
}

export const TableCellWithControlsOfOwnDeckOwnExample: Story = {
  render: () => {
    const currentUserId = '5b2174ce-9499-4693-9a73-026e01cd9ed4'

    const deck: Deck = {
      author: {
        id: '5b2174ce-9499-4693-9a73-026e01cd9ed4',
        name: 'Sweety',
      },
      cardsCount: 12,
      cover: null,
      created: '2024-06-13T19:48:05.318Z',
      id: 'clxdo9o3q015ipb01yh1ulz36',
      isFavorite: false,
      isPrivate: false,
      name: 'Pick',
      updated: '2024-06-13T19:48:05.318Z',
      userId: '5b2174ce-9499-4693-9a73-026e01cd9ed4',
    }

    return (
      <Table>
        <TableRow>
          <TableCellWithControls
            id={'controls'}
            item={{ deck }}
            userId={currentUserId}
            variant={'Deck'}
          />
        </TableRow>
      </Table>
    )
  },
}

export const TableCellWithControlsOfOwnCardExample: Story = {
  render: () => {
    const currentUserId = '5b2174ce-9499-4693-9a73-026e01cd9ed4'

    const card: Card = {
      answer: 'Ответ:  false true',
      answerImg: null,
      answerVideo: null,
      created: '2024-01-23T09:32:50.926Z',
      deckId: 'clomyr8bp1e1ivo2qtkghcql5',
      grade: 0,
      id: 'clrq5ri3x01g1y42wcsekdk91',
      question: '🔥Что будет на выходе?',
      questionImg:
        'https://andrii-flashcards.s3.eu-central-1.amazonaws.com/4d10ff05-1067-4ba3-9cd8-7994e0bf6fb9-17.jpg',
      questionVideo: null,
      shots: 0,
      updated: '2024-06-02T12:40:06.362Z',
      userId: '5b2174ce-9499-4693-9a73-026e01cd9ed4',
    }

    return (
      <Table>
        <TableRow>
          <TableCellWithControls
            id={'controls'}
            item={{ card }}
            userId={currentUserId}
            variant={'Card'}
          />
        </TableRow>
      </Table>
    )
  },
}
