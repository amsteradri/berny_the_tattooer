'use client'

import { useState, useTransition } from "react"
import { completeSectionAction } from "@/app/actions/courses"
import { CourseSection } from "@/lib/courses-data"
import { CheckCircle, Lock, Clock, ChevronDown, BookOpen, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SectionAccordionProps {
  sections: CourseSection[]
  completedSections: string[]
  enrollmentId: string
  courseSlug: string
}

export default function SectionAccordion({
  sections,
  completedSections: initialCompleted,
  enrollmentId,
  courseSlug,
}: SectionAccordionProps) {
  // Source of truth comes from the server (DB) on mount, then we sync after each confirmed save
  const [completed, setCompleted] = useState<string[]>(initialCompleted)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [errorId, setErrorId] = useState<string | null>(null)

  const totalSections = sections.length
  const progress = Math.round((completed.length / totalSections) * 100)

  const handleComplete = (sectionId: string) => {
    if (completed.includes(sectionId) || isPending) return
    setErrorId(null)
    setPendingId(sectionId)

    startTransition(async () => {
      const result = await completeSectionAction(enrollmentId, sectionId, courseSlug)

      if (result?.success && result.completed) {
        // Update local state ONLY with what the server actually saved
        setCompleted(result.completed)
      } else {
        // Server rejected — show error, DO NOT update local state
        setErrorId(sectionId)
      }

      setPendingId(null)
    })
  }

  const toggleSection = (sectionId: string, isUnlocked: boolean) => {
    if (!isUnlocked) return
    setOpenSection((prev) => (prev === sectionId ? null : sectionId))
  }

  return (
    <div>
      {/* Progress */}
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-zinc-400">Progreso del curso</span>
          <span className="text-sm font-bold text-white">{progress}% completado</span>
        </div>
        <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <div className="mt-3 flex items-center gap-2 text-green-400 text-sm font-bold">
            <CheckCircle className="w-4 h-4" />
            ¡Curso completado! Enhorabuena.
          </div>
        )}
      </div>

      {/* Accordion Sections */}
      <div className="container mx-auto px-4 md:px-8 pb-20">
        <div className="flex flex-col gap-3">
          {sections.map((section, index) => {
            const isCompleted = completed.includes(section.id)
            const prevCompleted = index === 0 || completed.includes(sections[index - 1].id)
            const isUnlocked = index === 0 || prevCompleted
            const isOpen = openSection === section.id

            return (
              <div
                key={section.id}
                className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                  isCompleted
                    ? "bg-zinc-900/80 border-green-900/40"
                    : isUnlocked
                    ? "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
                    : "bg-zinc-900/30 border-zinc-800/50 opacity-50"
                }`}
              >
                {/* Header — always visible */}
                <button
                  onClick={() => toggleSection(section.id, isUnlocked)}
                  disabled={!isUnlocked}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left focus:outline-none group disabled:cursor-not-allowed"
                >
                  {/* Index / status icon */}
                  <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border text-sm font-bold ${
                    isCompleted
                      ? 'border-green-600 bg-green-900/30 text-green-400'
                      : isUnlocked
                      ? 'border-zinc-600 bg-zinc-800 text-zinc-300'
                      : 'border-zinc-700 bg-zinc-800/50 text-zinc-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : !isUnlocked ? (
                      <Lock className="w-4 h-4 text-zinc-600" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  {/* Title & meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white text-sm md:text-base leading-snug">
                        {section.title}
                      </span>
                      {isCompleted && (
                        <span className="text-xs text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">
                          Completado
                        </span>
                      )}
                      {!isUnlocked && (
                        <span className="text-xs text-zinc-600 font-bold">
                          Bloqueado
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {section.duration}
                      </span>
                      <span className="text-xs text-zinc-500">Apartado {index + 1}</span>
                    </div>
                  </div>

                  {/* Chevron */}
                  {isUnlocked && (
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Expandable content */}
                {isOpen && (
                  <div className="border-t border-zinc-800 px-5 py-5 flex flex-col md:flex-row gap-5">
                    {/* Thumbnail / video placeholder */}
                    {section.imageUrl && (
                      <div className="md:w-72 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-800 aspect-video relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={section.imageUrl}
                          alt={section.title}
                          className="w-full h-full object-cover opacity-80"
                        />
                        {section.videoUrl ? (
                          <a
                            href={section.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
                          >
                            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
                              <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[18px] border-l-white ml-1" />
                            </div>
                          </a>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <BookOpen className="w-8 h-8 text-white/50" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Text + action */}
                    <div className="flex-1 flex flex-col justify-between gap-4">
                      <p className="text-zinc-300 text-sm leading-relaxed">
                        {section.description}
                      </p>

                      <div className="flex flex-col gap-2">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-2 text-green-400 text-sm font-bold bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-2">
                            <CheckCircle className="w-4 h-4" /> Apartado completado
                          </span>
                        ) : (
                          <>
                            <Button
                              onClick={() => handleComplete(section.id)}
                              disabled={isPending && pendingId === section.id}
                              className="bg-white text-black hover:bg-zinc-200 font-bold px-6 w-fit"
                            >
                              {isPending && pendingId === section.id ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Guardando...
                                </>
                              ) : (
                                "Marcar como Completado"
                              )}
                            </Button>
                            {errorId === section.id && (
                              <span className="inline-flex items-center gap-2 text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                No se pudo guardar. Completa el apartado anterior primero.
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
