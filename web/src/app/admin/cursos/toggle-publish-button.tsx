'use client'

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { togglePublishAction } from "@/app/actions/admin"

interface Props {
  id: string
  isPublished: boolean
}

export function TogglePublishButton({ id, isPublished }: Props) {
  const [published, setPublished] = useState(isPublished)
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      const result = await togglePublishAction(id, !published)
      if (!result?.error) {
        setPublished(prev => !prev)
      }
    })
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleToggle}
      disabled={isPending}
      className={published
        ? "text-green-400 hover:text-red-400 hover:bg-red-950/20"
        : "text-zinc-400 hover:text-green-400 hover:bg-green-950/20"
      }
      title={published ? "Despublicar" : "Publicar"}
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : published ? (
        <Eye className="w-3.5 h-3.5" />
      ) : (
        <EyeOff className="w-3.5 h-3.5" />
      )}
    </Button>
  )
}
