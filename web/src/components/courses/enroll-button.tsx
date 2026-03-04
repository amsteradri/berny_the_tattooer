'use client'

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { enrollCourse } from "@/app/actions/courses"

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full h-14 text-lg font-bold bg-white text-black hover:bg-zinc-200"
    >
      {pending ? "Inscribiendo..." : "¡Inscribirme Gratis!"}
    </Button>
  )
}

export function EnrollButton({ slug }: { slug: string }) {
  return (
    <form action={async (formData) => {
        await enrollCourse(formData);
    }}>
        <input type="hidden" name="slug" value={slug} />
        <SubmitButton />
    </form>
  )
}
