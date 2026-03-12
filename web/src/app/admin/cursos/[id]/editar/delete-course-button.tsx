'use client'

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import { deleteCourseAction } from "@/app/actions/admin"

export function DeleteCourseButton({ id }: { id: string }) {
  const [confirm, setConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm) {
      setConfirm(true)
      return
    }
    startTransition(async () => {
      const result = await deleteCourseAction(id)
      if (result?.error) {
        setError(result.error)
        setConfirm(false)
      }
    })
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        disabled={isPending}
        className="bg-red-900/30 text-red-400 hover:bg-red-900/60 border border-red-900/50"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Trash2 className="w-4 h-4 mr-2" />
        )}
        {confirm ? '¿Confirmar eliminación?' : 'Eliminar curso'}
      </Button>
      {confirm && !isPending && (
        <button
          onClick={() => setConfirm(false)}
          className="text-sm text-zinc-500 hover:text-zinc-300"
        >
          Cancelar
        </button>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}
