"use client"

import * as React from "react"
import { Github, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export interface SignInFormProps {
  title?: string
  description?: string
  providers?: Array<"google" | "github" | "email">
  showNameField?: boolean
  className?: string
}

export function SignInForm({
  title = "Welcome back",
  description = "Sign in to your account to continue",
  providers = ["google", "github", "email"],
  showNameField = false,
  className,
}: SignInFormProps) {
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [isLoading, setIsLoading] = React.useState<"google" | "github" | "email" | null>(null)

  async function handleSignIn(provider: "google" | "github" | "email") {
    setIsLoading(provider)
    // Simulate sign in
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(null)
  }

  return (
    <form className={cn("w-full max-w-sm", className)} onSubmit={(event) => { event.preventDefault(); void handleSignIn("email") }}>
      <div className="space-y-6">
        <div className="space-y-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="space-y-4">
          {showNameField && (
            <Input label="Name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <Input
            type="email"
            label="Email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input type="password" label="Password" placeholder="••••••••" />
        </div>
        <div className="flex flex-col gap-4">
          <Button
            size="lg"
            type="submit"
            isPending={isLoading === "email"}
            className="w-full"
          >
            Sign in with Email
            <Mail className="ml-2 size-4" />
          </Button>
          {providers.some((p) => p !== "email") && (
            <>
              <div className="flex w-full items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">Or continue with</span>
                <Separator className="flex-1" />
              </div>
              <div className="grid w-full grid-cols-2 gap-3">
                {providers.includes("google") && (
                  <Button
                    variant="outline"
                    onPress={() => handleSignIn("google")}
                    isPending={isLoading === "google"}
                    className="gap-2"
                  >
                    <svg aria-hidden="true"
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M8 12h8" />
                    </svg>
                    Google
                  </Button>
                )}
                {providers.includes("github") && (
                  <Button
                    variant="outline"
                    onPress={() => handleSignIn("github")}
                    isPending={isLoading === "github"}
                    className="gap-2"
                  >
                    <Github className="size-4" />
                    GitHub
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  )
}
