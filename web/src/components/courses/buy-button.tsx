'use client'

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createCheckoutSession } from "@/app/actions/checkout"
import { ShoppingCart, Loader2 } from "lucide-react"

export function BuyButton({ slug, price }: { slug: string; price: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleBuy = () => {
    startTransition(async () => {
      const result = await createCheckoutSession(slug)

      if (result?.error) {
        console.error("Checkout error:", result.error)
        window.alert(result.error)
        return
      }

      if (result?.redirectTo) {
        if (result.redirectTo.startsWith("http://") || result.redirectTo.startsWith("https://")) {
          window.location.assign(result.redirectTo)
          return
        }

        router.push(result.redirectTo)
      }
    })
  }

  return (
    <Button
      onClick={handleBuy}
      disabled={isPending}
      className="w-full h-14 text-lg font-bold bg-white text-black hover:bg-zinc-200 disabled:opacity-70"
    >
      {isPending ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Redirigiendo al pago...
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5 mr-2" />
          Comprar por {price}
        </>
      )}
    </Button>
  )
}
