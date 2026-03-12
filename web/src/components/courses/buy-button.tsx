'use client'

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { createCheckoutSession } from "@/app/actions/checkout"
import { ShoppingCart, Loader2 } from "lucide-react"

export function BuyButton({ slug, price }: { slug: string; price: string }) {
  const [isPending, startTransition] = useTransition()

  const handleBuy = () => {
    startTransition(async () => {
      await createCheckoutSession(slug)
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
