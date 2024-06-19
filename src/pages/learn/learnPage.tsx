import { ROUTES } from '@/common/constants'
import { Page } from '@/components/layout'
import { BackNavigation } from '@/pages/cardsPage/components'
import clsx from 'clsx'

import s from './learnPage.module.scss'

import { useLearnPage } from './hooks/useLearnPage'
import { LearnCard } from './learnCard'

export const LearnPage = () => {
  const { cardError, cardIsLoading, currentCard, deck, deckError, deckIsLoading } = useLearnPage()

  const classNames = {
    backNavigation: clsx(s.backNavigationLink),
  }

  return (
    <Page>
      {cardError || deckError ? (
        <h1>Error: {JSON.stringify(cardError || deckError)}</h1>
      ) : cardIsLoading || deckIsLoading ? (
        <h1>Loading...</h1>
      ) : currentCard && deck ? (
        <>
          <BackNavigation
            className={classNames.backNavigation}
            pageName={deck.name}
            route={`${ROUTES.decks}/${deck.id}`}
          />
          <LearnCard />
        </>
      ) : null}
    </Page>
  )
}
