# Stripe CLI - Cheatsheet

## Comandos

```bash
# Login
stripe login

# Escuchar webhooks y reenviarlos al servidor local
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Ver logs en tiempo real
stripe logs tail

# Trigger eventos manualmente
stripe trigger payment_intent.succeeded
stripe trigger checkout.session.completed

# Ver estado del CLI
stripe status
```

> Al ejecutar `stripe listen`, copia el `whsec_...` que aparece y ponlo en `.env.local` como `STRIPE_WEBHOOK_SECRET`.

---

## Tarjetas de prueba

| Número | Resultado |
|--------|-----------|
| `4242 4242 4242 4242` | Pago exitoso |
| `4000 0025 0000 3155` | Requiere autenticación 3D Secure |
| `4000 0000 0000 9995` | Rechazada — fondos insuficientes |
| `4000 0000 0000 0002` | Rechazada — genérico |
| `4000 0000 0000 0069` | Tarjeta expirada |
| `4000 0000 0000 0127` | CVC incorrecto |

**Datos del formulario** (iguales para todas):
- Fecha: cualquier fecha futura → `12/34`
- CVC: cualquier 3 dígitos → `123`
- ZIP: cualquier 5 dígitos → `12345`

---

## Variables de entorno necesarias

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```
