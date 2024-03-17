import { t } from "elysia"

export const SignInDTO = t.Object({
  username: t.String(),
  password: t.String()
})

export const ProductDTO = t.Object({
  id: t.Numeric()
})