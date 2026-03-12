'use client'

import { useState, useTransition } from "react"
import { deleteSectionAction } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"

interface Props {
  sectionId: string
  courseId: string
}

export function DeleteSectionButton({ sectionId, courseId }: Props) {
  const [isPending, startTransition] = useTransition()
  const [confirmed, setConfirmed] = useState(false)

  const handleClick = () => {
    if (!confirmed) {
      setConfirmed(true)
      setTimeout(() => setConfirmed(false), 3000)
      return
    }
    startTransition(async () => {
      await deleteSectionAction(sectionId, courseId)
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      className={confirmed ? "border-red-700 text-red-400 hover:bg-red-950" : "border-zinc-700 text-zinc-400"}
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Trash2 className="w-3.5 h-3.5" />
      )}
      {confirmed && !isPending && <span className="ml-1.5 text-xs">¿Seguro?</span>}
    </Button>
  )
}
