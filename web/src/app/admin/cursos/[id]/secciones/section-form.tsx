'use client'

import { useState, useTransition, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  createSectionAction,
  updateSectionAction,
  uploadSectionVideoAction,
} from "@/app/actions/admin"
import { Loader2, Save, Upload, Video, X, CheckCircle2 } from "lucide-react"

interface SectionData {
  id: string
  title: string
  description?: string | null
  duration_text?: string | null
  video_path?: string | null
}

interface Props {
  courseId: string
  section?: SectionData
}

export function SectionForm({ courseId, section }: Props) {
  const isEditing = !!section
  const [isPending, startTransition] = useTransition()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [videoPath, setVideoPath] = useState(section?.video_path ?? '')
  const [uploadProgress, setUploadProgress] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setIsUploading(true)
    setUploadProgress(`Subiendo ${file.name}…`)

    const fd = new FormData()
    fd.append('video', file)
    fd.append('courseId', courseId)

    const result = await uploadSectionVideoAction(fd)

    setIsUploading(false)
    setUploadProgress(null)

    if ('error' in result) {
      setError(result.error)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } else {
      setVideoPath(result.path)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const formData = new FormData(e.currentTarget)
    formData.set('video_path', videoPath)

    startTransition(async () => {
      if (isEditing) {
        const result = await updateSectionAction(section.id, courseId, formData)
        if (result?.error) {
          setError(result.error)
        } else {
          setSuccess(true)
          setTimeout(() => setSuccess(false), 3000)
        }
      } else {
        // createSectionAction redirects on success, so we just handle errors
        const result = await createSectionAction(courseId, formData)
        if (result?.error) {
          setError(result.error)
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-zinc-200">
          Título de la sección <span className="text-red-400">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          defaultValue={section?.title}
          placeholder="Ej: Introducción y materiales"
          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
          required
        />
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-zinc-200">
          Descripción
        </Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={section?.description ?? ''}
          placeholder="Breve descripción de lo que se verá en esta sección"
          rows={3}
          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
        />
      </div>

      {/* Duración */}
      <div className="space-y-2">
        <Label htmlFor="duration_text" className="text-zinc-200">
          Duración
        </Label>
        <Input
          id="duration_text"
          name="duration_text"
          defaultValue={section?.duration_text ?? ''}
          placeholder="Ej: 25 min"
          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
        />
      </div>

      {/* Vídeo */}
      <div className="space-y-3">
        <Label className="text-zinc-200">Vídeo de la sección</Label>

        {videoPath ? (
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3">
            <Video className="w-5 h-5 text-emerald-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-zinc-200 font-medium truncate">{videoPath}</p>
              <p className="text-xs text-zinc-500 mt-0.5">Vídeo guardado en Supabase Storage</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setVideoPath('')
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}
              className="text-zinc-500 hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center cursor-pointer hover:border-zinc-500 transition-colors"
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 text-zinc-400">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-sm">{uploadProgress}</p>
                <p className="text-xs text-zinc-600">Los vídeos grandes pueden tardar varios minutos</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-zinc-500">
                <Upload className="w-8 h-8" />
                <p className="text-sm font-medium">Haz clic para subir un vídeo</p>
                <p className="text-xs text-zinc-600">MP4, WebM o MOV · Máximo 500 MB</p>
              </div>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/webm,video/mov,video/quicktime"
          className="hidden"
          onChange={handleVideoChange}
          disabled={isUploading}
        />

        <p className="text-xs text-zinc-600">
          O introduce la ruta manualmente si el vídeo ya está en Supabase Storage:
        </p>
        <Input
          placeholder="Ej: ab12cd34-ef56/1234567890.mp4"
          value={videoPath}
          onChange={e => setVideoPath(e.target.value)}
          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 font-mono text-sm"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-950/40 border border-red-800 rounded-xl px-4 py-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Éxito */}
      {success && (
        <div className="flex items-center gap-2 bg-green-950/40 border border-green-800 rounded-xl px-4 py-3 text-green-300 text-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          Sección guardada correctamente.
        </div>
      )}

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending || isUploading} className="min-w-[140px]">
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardando…
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? 'Guardar cambios' : 'Crear sección'}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
