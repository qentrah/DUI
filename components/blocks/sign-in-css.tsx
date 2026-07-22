"use client"

import { SignInForm, type SignInFormProps } from "./sign-in"
import { CSSMotion } from "@/components/ui/css-motion"

function SignInFormCSS(props: SignInFormProps) {
  return <CSSMotion duration={650} className="w-full max-w-sm"><SignInForm {...props} /></CSSMotion>
}

export { SignInFormCSS }
