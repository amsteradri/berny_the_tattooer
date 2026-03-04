'use client'

import { useState, useTransition } from "react"
import { completeSectionAction } from "@/app/actions/courses"
import { CourseSection, SectionContentBlock } from "@/lib/courses-data"
import { CheckCircle, Lock, Clock, ChevronDown, Loader2, AlertCircle, Lightbulb, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProtectedVideoPlayer } from "./protected-video-player"

interface SectionAccordionProps {
  sections: CourseSection[]
  completedSections: string[]
  enrollmentId: string
  courseSlug: string
  userEmail?: string
}

// ── Rich content renderer ────────────────────────────────────────────────────
function ContentBlock({ block }: { block: SectionContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h3 className="text-white font-bold text-base mt-6 mb-2 first:mt-0">
          {block.text}
        </h3>
      )
    case "paragraph":
      return <p className="text-zinc-300 text-sm leading-relaxed">{block.text}</p>
    case "list":
      return (
        <ul className="space-y-2 my-1">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case "tip":
      return (
        <div className="flex gap-3 bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-3 my-1">
          <Lightbulb className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-zinc-300 text-sm leading-relaxed">{block.text}</p>
        </div>
      )
    case "warning":
      return (
        <div className="flex gap-3 bg-red-950/40 border border-red-900/50 rounded-xl px-4 py-3 my-1">
          <TriangleAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-zinc-300 text-sm leading-relaxed">{block.text}</p>
        </div>
      )
    default:
      return null
  }
}

// ── Main component ───────────────────────────────────────────────────────────
export default function SectionAccordion({
  sections,
  completedSections: initialCompleted,
  enrollmentId,
  courseSlug,
  userEmail,
}: SectionAccordionProps) {
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
        setCompleted(result.completed)
      } else {
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
      {/* Progress bar */}
      <div className="container mx-auto px-4 md:px-8 py-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-zinc-400">Progreso del curso</span>
          <span className="text-sm font-bold text-white">{progress}% completado</span>
        </div>
        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
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

      {/* Accordion */}
      <div className="container mx-auto px-4 md:px-8 pb-20">
        <div className="flex flex-col gap-3">
          {sections.map((section, index) => {
            const isCompleted = completed.includes(section.id)
            const isUnlocked = index === 0 || completed.includes(sections[index - 1].id)
            const isOpen = openSection === section.id

            return (
              <div
                key={section.id}
                className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
                  isCompleted
                    ? "bg-zinc-900/80 border-green-900/40"
                    : isUnlocked
                    ? "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
                    : "bg-zinc-900/30 border-zinc-800/50 opacity-50"
                }`}
              >
                {/* ── Header ── */}
                <button
                  onClick={() => toggleSection(section.id, isUnlocked)}
                  disabled={!isUnlocked}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left focus:outline-none disabled:cursor-not-allowed"
                >
                  <div
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border text-sm font-bold ${
                      isCompleted
                        ? "border-green-600 bg-green-900/30 text-green-400"
                        : isUnlocked
                        ? "border-zinc-600 bg-zinc-800 text-zinc-300"
                        : "border-zinc-700 bg-zinc-800/50 text-zinc-600"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : !isUnlocked ? (
                      <Lock className="w-4 h-4 text-zinc-600" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

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
                        <span className="text-xs text-zinc-600 font-bold">Bloqueado</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {section.duration}
                      </span>
                      <span className="text-xs text-zinc-500">Apartado {index + 1}</span>
                    </div>
                  </div>

                  {isUnlocked && (
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* ── Body ── */}
                {isOpen && (
                  <div className="border-t border-zinc-800">
                    {/* Video: Supabase (secure) takes priority */}
                    {section.videoPath && (
                      <div className="px-5 pt-5">
                        <ProtectedVideoPlayer
                          videoPath={section.videoPath}
                          enrollmentId={enrollmentId}
                          userEmail={userEmail}
                        />
                      </div>
                    )}

                    {/* Rich content blocks */}
                    {section.content && section.content.length > 0 && (
                      <div className="px-5 pt-5 pb-2 flex flex-col gap-3">
                        {section.content.map((block, i) => (
                          <ContentBlock key={i} block={block} />
                        ))}
                      </div>
                    )}

                    {/* Fallback plain description */}
                    {(!section.content || section.content.length === 0) && (
                      <div className="px-5 pt-5 pb-2">
                        <p className="text-zinc-300 text-sm leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                    )}

                    {/* Mark complete / badge */}
                    <div className="px-5 py-5 flex flex-col gap-2">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-2 text-green-400 text-sm font-bold bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-2 w-fit">
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
                            <span className="inline-flex items-center gap-2 text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 w-fit">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              No se pudo guardar. Completa el apartado anterior primero.
                            </span>
                          )}
                        </>
                      )}
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
