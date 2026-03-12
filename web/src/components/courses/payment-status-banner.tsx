'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CheckCircle, XCircle } from "lucide-react"

export function PaymentStatusBanner() {
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<'success' | 'cancelled' | null>(null)

  useEffect(() => {
    if (searchParams.get('success') === '1') {
      setType('success')
      setVisible(true)
    } else if (searchParams.get('cancelled') === '1') {
      setType('cancelled')
      setVisible(true)
    }
    // Ocultar el banner a los 6 segundos
    const timer = setTimeout(() => setVisible(false), 6000)
    return () => clearTimeout(timer)
  }, [searchParams])

  if (!visible || !type) return null

  if (type === 'success') {
    return (
      <div className="mb-8 flex items-center gap-3 bg-green-950/60 border border-green-800 text-green-300 rounded-xl px-5 py-4">
        <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-400" />
        <div>
          <p className="font-bold text-green-200">¡Pago completado! Tu curso ya está disponible.</p>
          <p className="text-sm text-green-400">Puedes empezar ahora mismo.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8 flex items-center gap-3 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-xl px-5 py-4">
      <XCircle className="w-5 h-5 flex-shrink-0 text-zinc-500" />
      <p className="text-sm">Pago cancelado. Puedes intentarlo de nuevo cuando quieras.</p>
    </div>
  )
}
