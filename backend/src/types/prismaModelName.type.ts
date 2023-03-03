import { PrismaClient } from '@prisma/client'

type IgnorePrismaBuiltins<S extends string> = string extends S
  ? string
  : S extends ''
  ? S
  : S extends `$${infer T}`
  ? never
  : S

export type PrismaModelName = IgnorePrismaBuiltins<keyof PrismaClient>

type shit = keyof PrismaClient

// "booking" | "complaint" | "customer" | "staff_history"
// "card_type" | "room" | "room_type" | "shift" | "staff"
// "staff_type" | "user"
