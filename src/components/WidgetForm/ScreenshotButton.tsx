import { useState } from 'react'

import html2canvas from 'html2canvas'
import { Camera, Trash } from 'phosphor-react'

import { Loading } from '../Loading'

interface onScreenshotButtonProps {
  comment: string
  screenshot: string | null
  onScreenshotTook: (screenshot: string | null) => void
}

export function ScreenshotButton({
  onScreenshotTook,
  screenshot,
  comment
}: onScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true)
    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png')

    onScreenshotTook(base64image)
    setIsTakingScreenshot(false)
  }

  if (screenshot) {
    return (
      <button
        type="button"
        onClick={() => onScreenshotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundSize: 180,
          backgroundPosition: 'right bottom'
        }}
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors "
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      disabled={comment.length === 0}
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-4 disabled:opacity-50 disabled:hover:bg-zinc-800 disabled:hover:text-zinc-400"
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="h-6 w-6" />}
    </button>
  )
}
