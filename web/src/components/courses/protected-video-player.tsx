'use client'

import { useEffect, useState, useRef } from 'react'
import { AlertCircle, Loader2 } from 'lucide-react'

interface ProtectedVideoPlayerProps {
  videoPath: string
  enrollmentId: string
  userEmail?: string
}

export function ProtectedVideoPlayer({ 
  videoPath, 
  enrollmentId, 
  userEmail 
}: ProtectedVideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const watermarkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchSignedUrl() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `/api/video/${encodeURIComponent(videoPath)}?enrollmentId=${enrollmentId}`
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Error cargando vídeo')
        }

        const data = await response.json()
        setVideoUrl(data.url)
      } catch (err) {
        console.error('Error fetching video:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchSignedUrl()

    // Refrescar URL cada 50 minutos (antes de que expire a la hora)
    const interval = setInterval(fetchSignedUrl, 50 * 60 * 1000)
    return () => clearInterval(interval)
  }, [videoPath, enrollmentId])

  // Protecciones adicionales
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Bloquear teclas de desarrollo y captura
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.metaKey && e.altKey && e.key === 'i')
      ) {
        e.preventDefault()
        return false
      }
    }

    const detectDevTools = () => {
      const threshold = 160
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        console.warn('DevTools detectado')
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', detectDevTools)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', detectDevTools)
    }
  }, [])

  // Watermark dinámico que se mueve
  useEffect(() => {
    if (!watermarkRef.current) return

    const moveWatermark = () => {
      if (!watermarkRef.current) return
      
      const randomX = Math.random() * 80 + 10 // 10% - 90%
      const randomY = Math.random() * 80 + 10
      
      watermarkRef.current.style.left = `${randomX}%`
      watermarkRef.current.style.top = `${randomY}%`
    }

    // Mover watermark cada 10 segundos
    const interval = setInterval(moveWatermark, 10000)
    moveWatermark() // Posición inicial

    return () => clearInterval(interval)
  }, [videoUrl])

  if (loading) {
    return (
      <div className="aspect-video bg-zinc-900 rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
          <p className="text-sm text-zinc-400">Cargando vídeo seguro...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="aspect-video bg-red-950/20 border border-red-900 rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 px-4 text-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-sm text-red-300">Error: {error}</p>
        </div>
      </div>
    )
  }

  if (!videoUrl) {
    return (
      <div className="aspect-video bg-zinc-900 rounded-lg flex items-center justify-center">
        <p className="text-sm text-zinc-400">No se pudo cargar el vídeo</p>
      </div>
    )
  }

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden group">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        src={videoUrl}
      >
        <track kind="captions" />
      </video>

      {/* Watermark dinámico semi-transparente */}
      <div
        ref={watermarkRef}
        className="absolute pointer-events-none select-none transition-all duration-1000 ease-in-out"
        style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.15)',
          fontWeight: 'bold',
          textShadow: '0 0 2px rgba(0,0,0,0.5)',
          transform: 'translate(-50%, -50%) rotate(-15deg)',
          userSelect: 'none',
          zIndex: 10
        }}
      >
        {userEmail || 'ART WORX ACADEMY'}
      </div>

      {/* Overlay invisible para detectar intentos de captura */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-0"
        style={{ mixBlendMode: 'difference' }}
      />
    </div>
  )
}
