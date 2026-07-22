"use client"

import { SignInForm, type SignInFormProps } from "./sign-in"
import { GsapMotion } from "@/components/ui/gsap-motion"

function SignInFormGSAP(props: SignInFormProps) {
  return <GsapMotion className="w-full max-w-sm"><div data-motion-item><SignInForm {...props} /></div></GsapMotion>
}

export { SignInFormGSAP }
