import { ArrowLeft } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { FeedbackType, feedbackTypesData } from '..'
import { ScreenshotButton } from '../ScreenshotButton'

interface FeedbackContentStepProps {
  onFeedbackSend: () => void
  feedbackType: FeedbackType
  restartFeedbackForm: () => void
}

export function FeedbackContentStep({
  onFeedbackSend,
  feedbackType,
  restartFeedbackForm
}: FeedbackContentStepProps) {
  const feedbackTypeInfo = feedbackTypesData[feedbackType]
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()
    console.log({
      screenshot,
      comment
    })

    onFeedbackSend()
  }
  return (
    <>
      <header className="flex justify-between items-center">
        <button
          type="button"
          onClick={restartFeedbackForm}
          className="top-5.5 left-4 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-3 w-full">
        <textarea
          onChange={(event) => setComment(event.target.value)}
          placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-brand-3 border-zinc-600 bg-transparent rounded-md focus:border-brand-2 focus:ring-brand-2 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin md:min-w-auto"
        />

        <footer className="flex gap-2 mt-1 mb-2 w-full">
          <ScreenshotButton
            comment={comment}
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type="submit"
            disabled={comment.length === 0}
            className="p-2 bg-brand-2 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-4 transition-colors disabled:opacity-50 disabled:hover:bg-brand-2"
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  )
}
