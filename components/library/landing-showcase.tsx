"use client"

import * as React from "react"
import { 
  QrCode, 
  Send, 
  ChevronRight, 
  Smartphone, 
  Lock,
  Calendar,
  CreditCard
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/components/site/locale-provider"

export function LandingShowcase() {
  const { isArabic } = useLocale()

  const [chatInput, setChatInput] = React.useState("")
  const [messages, setMessages] = React.useState([
    { sender: "ai", text: isArabic ? "مرحباً! كيف يمكنني مساعدتك؟" : "Hi! How can I help you today?" }
  ])

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    setMessages((prev) => [...prev, { sender: "user", text: chatInput.trim() }])
    setChatInput("")
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "ai", text: isArabic ? "تم استلام رسالتك." : "Got it, working on that now." }])
    }, 800)
  }

  return (
    <section className="border-b border-border bg-background px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-sm text-muted-foreground mb-10">
          {isArabic ? "مكوّنات حقيقية — ليست رسومات ثابتة" : "Real components — not static mockups"}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 — Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{isArabic ? "المساهمات" : "Contributions"}</CardDescription>
              <div className="flex items-baseline gap-2">
                <CardTitle className="text-3xl font-bold tracking-tight">1,284</CardTitle>
                <span className="text-xs font-medium text-emerald-500">+12.4%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex h-24 items-end gap-1.5">
                {[40, 65, 50, 80, 60, 90, 70, 85].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-primary/20 hover:bg-primary/40 transition-colors" style={{ height: `${h}%` }} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 2 — Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{isArabic ? "هدف جديد" : "New milestone"}</CardTitle>
              <CardDescription>{isArabic ? "حدد الهدف المالي." : "Set a financial target."}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input label={isArabic ? "الاسم" : "Name"} placeholder="e.g. New car" />
              <div className="grid grid-cols-2 gap-2">
                <Input label={isArabic ? "المبلغ" : "Amount"} defaultValue="$15,000" />
                <Input label={isArabic ? "التاريخ" : "Date"} defaultValue="Dec 2026" />
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm" className="flex-1">{isArabic ? "إنشاء" : "Create"}</Button>
              <Button size="sm" variant="outline" className="flex-1">{isArabic ? "إلغاء" : "Cancel"}</Button>
            </CardFooter>
          </Card>

          {/* Card 3 — Chat */}
          <Card className="flex flex-col sm:col-span-2 lg:col-span-1">
            <CardHeader className="py-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm">{isArabic ? "المساعد" : "AI Assistant"}</CardTitle>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-muted-foreground">Online</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px]">GPT-4</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-3 space-y-2 min-h-[120px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`rounded-lg px-3 py-1.5 text-xs max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="p-3 border-t border-border">
              <form onSubmit={handleSendChat} className="relative w-full">
                <Input
                  placeholder={isArabic ? "اكتب رسالة..." : "Type a message..."}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="pe-9 h-8 text-xs"
                />
                <button type="submit" className="absolute end-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Send">
                  <Send className="size-3.5" />
                </button>
              </form>
            </CardFooter>
          </Card>

          {/* Card 4 — Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{isArabic ? "أهداف الادخار" : "Savings"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{isArabic ? "التقاعد" : "Retirement"}</span>
                  <span className="font-medium">65%</span>
                </div>
                <Progress value={65} />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{isArabic ? "عقارات" : "Real estate"}</span>
                  <span className="font-medium">32%</span>
                </div>
                <Progress value={32} />
              </div>
              <Separator />
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{isArabic ? "مجموع المدخرات" : "Total saved"}</span>
                <span className="font-semibold">$300,200</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 5 — QR */}
          <Card className="flex flex-col items-center text-center">
            <CardContent className="pt-6 pb-4">
              <div className="mx-auto rounded-xl border border-border p-5 mb-4">
                <QrCode className="size-24 text-foreground" />
              </div>
              <p className="text-sm font-medium">{isArabic ? "امسح للاتصال" : "Scan to connect"}</p>
              <p className="mt-1 text-xs text-muted-foreground max-w-[200px]">
                {isArabic ? "افتح تطبيق الهاتف لربط جهازك." : "Open the mobile app and scan this code."}
              </p>
            </CardContent>
            <CardFooter className="border-t border-border w-full justify-center py-3 text-xs text-muted-foreground">
              <Smartphone className="size-3.5 me-1.5" />
              {isArabic ? "iOS و Android" : "iOS & Android"}
            </CardFooter>
          </Card>

          {/* Card 6 — List */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{isArabic ? "العمليات" : "Operations"}</CardTitle>
              <CardDescription>{isArabic ? "إدارة التحويلات" : "Manage transfers"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {[
                { icon: CreditCard, label: isArabic ? "المدفوعات" : "Payments", sub: isArabic ? "إدارة البطاقات" : "Manage cards" },
                { icon: Calendar, label: isArabic ? "المجدولة" : "Scheduled", sub: isArabic ? "التحويلات الآلية" : "Auto transfers" },
                { icon: Lock, label: isArabic ? "الحماية" : "Security", sub: isArabic ? "تحديث البيانات" : "Update credentials" }
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent cursor-pointer"
                >
                  <item.icon className="size-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
