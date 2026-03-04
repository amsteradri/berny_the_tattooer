'use server'

import { getSession } from "@/lib/session"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

const BUCKET = "course-videos"
const SIGNED_URL_EXPIRY = 3600 // 1 hora en segundos

/**
 * Generates a signed (temporary) URL for a private video in Supabase Storage.
 * Only works for authenticated + enrolled users.
 * The URL expires after 1 hour — sharing it is useless.
 */
export async function getSignedVideoUrl(
  videoPath: string,
  enrollmentId: string
): Promise<{ url: string } | { error: string }> {
  const session = await getSession()
  if (!session?.userId) redirect("/login")

  // Verify the user is actually enrolled (security check)
  const { data: enrollment, error: enrollError } = await db
    .from("user_courses")
    .select("id")
    .eq("id", enrollmentId)
    .eq("user_id", session.userId)
    .single()

  if (enrollError || !enrollment) {
    return { error: "No tienes acceso a este curso." }
  }

  // Generate signed URL from Supabase Storage
  const { data, error } = await db.storage
    .from(BUCKET)
    .createSignedUrl(videoPath, SIGNED_URL_EXPIRY)

  if (error || !data?.signedUrl) {
    console.error("[getSignedVideoUrl] Error:", error)
    return { error: "No se pudo cargar el vídeo." }
  }

  return { url: data.signedUrl }
}
