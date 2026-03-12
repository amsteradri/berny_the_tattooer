'use client'

import { useState, useTransition, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createCourseAction, updateCourseAction, uploadCourseImageAction } from "@/app/actions/admin"
import { Loader2, Save, Upload, X } from "lucide-react"

const LEVELS = ['Principiante', 'Intermedio', 'Avanzado', 'Todos los niveles']

interface CourseData {
  id: string
  title: string
  description: string
  long_description?: string
  price_cents: number
  level?: string
  duration_text?: string
  image?: string
}

interface Props {
  course?: CourseData
}

export function CourseForm({ course }: Props) {
  const isEditing = !!course
  const [isPending, startTransition] = useTransition()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [imageUrl, setImageUrl] = useState(course?.image || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setIsUploading(true)

    const fd = new FormData()
    fd.append('image', file)

    const result = await uploadCourseImageAction(fd)

    setIsUploading(false)

    if ('error' in result) {
      setError(result.error)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } else {
      setImageUrl(result.url)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const formData = new FormData(e.currentTarget)
    // Inyectamos la URL de la imagen (ya subida) como campo oculto
    formData.set('image_url', imageUrl)

    startTransition(async () => {
      if (isEditing) {
        const result = await updateCourseAction(course.id, formData)
        if (result?.error) {
          setError(result.error)
        } else {
          setSuccess(true)
        }
      } else {
        const result = await createCourseAction(formData)
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
          Nombre del curso <span className="text-red-400">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          defaultValue={course?.title}
          placeholder="Ej: Iniciación al Tatuaje"
          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
          required
        />
      </div>

      {/* Descripción corta */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-zinc-200">
          Descripción corta <span className="text-red-400">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={course?.description}
          placeholder="Resumen breve del curso (aparece en las tarjetas)"
          rows={3}
          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
          required
        />
      </div>

      {/* Descripción larga */}
      <div className="space-y-2">
        <Label htmlFor="long_description" className="text-zinc-200">
          Descripción completa
        </Label>
        <Textarea
          id="long_description"
          name="long_description"
          defaultValue={course?.long_description}
          placeholder="Descripción detallada del curso (aparece en la página del curso)"
          rows={6}
          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
        />
      </div>

      {/* Precio + Nivel + Duración */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price_euros" className="text-zinc-200">
            Precio (€) <span className="text-red-400">*</span>
          </Label>
          <Input
            id="price_euros"
            name="price_euros"
            type="number"
            min="1"
            step="0.01"
            defaultValue={course ? (course.price_cents / 100).toFixed(2) : ''}
            placeholder="197.00"
            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="level" className="text-zinc-200">
            Nivel <span className="text-red-400">*</span>
          </Label>
          <select
            id="level"
            name="level"
            defaultValue={course?.level || ''}
            required
            className="w-full h-10 px-3 rounded-md bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-zinc-500"
          >
            <option value="" disabled>Seleccionar...</option>
            {LEVELS.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration_text" className="text-zinc-200">Duración</Label>
          <Input
            id="duration_text"
            name="duration_text"
            defaultValue={course?.duration_text}
            placeholder="Ej: 4 Semanas"
            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
          />
        </div>
      </div>

      {/* Imagen — subida de archivo */}
      <div className="space-y-2">
        <Label className="text-zinc-200">Imagen de portada</Label>

        {/* Preview */}
        {imageUrl ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => {
                setImageUrl('')
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white rounded-full p-1.5 transition-colors"
              title="Eliminar imagen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-zinc-700 hover:border-zinc-500 cursor-pointer transition-colors bg-zinc-900/50 ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-8 h-8 text-zinc-400 animate-spin mb-2" />
                <span className="text-zinc-400 text-sm">Subiendo imagen...</span>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-zinc-500 mb-2" />
                <span className="text-zinc-400 text-sm font-medium">Haz clic para subir</span>
                <span className="text-zinc-600 text-xs mt-1">JPG, PNG, WebP · Máx. 5MB</span>
              </>
            )}
          </label>
        )}

        <input
          id="image-upload"
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={handleImageChange}
          disabled={isUploading}
        />
      </div>

      {/* Feedback */}
      {error && (
        <div className="bg-red-950/40 border border-red-800 rounded-xl px-5 py-4 text-red-300 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-950/40 border border-green-800 rounded-xl px-5 py-4 text-green-300 text-sm">
          ✅ Cambios guardados correctamente.
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending || isUploading}
        className="bg-white text-black hover:bg-zinc-200 font-bold"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Save className="w-4 h-4 mr-2" />
        )}
        {isEditing ? 'Guardar cambios' : 'Crear curso'}
      </Button>
    </form>
  )
}
