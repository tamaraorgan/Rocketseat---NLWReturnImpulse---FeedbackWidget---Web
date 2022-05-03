import { useState } from 'react'

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'

import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep'

export const feedbackTypesData = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de uma nuvem de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypesData

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSend, setFeedbackSend] = useState(false)

  function handleRestartFeedback() {
    setFeedbackSend(false)
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSend ? (
        <FeedbackSuccessStep restartFeedbackForm={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              onFeedbackSend={() => setFeedbackSend(true)}
              feedbackType={feedbackType}
              restartFeedbackForm={handleRestartFeedback}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400 my-3">
        By Rocketseat and copied code &#10084;{' '}
        <a
          className="underline underline-offset-2"
          href="https://organ.dev.br/"
        >
          Tamara Organ
        </a>
      </footer>
    </div>
  )
}
