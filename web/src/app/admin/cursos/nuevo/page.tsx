import { CourseForm } from "../course-form"

export default function NuevoCursoPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">Crear curso nuevo</h1>
        <p className="text-zinc-400 mt-1">El curso se guardará como borrador hasta que lo publiques.</p>
      </div>
      <CourseForm />
    </div>
  )
}
