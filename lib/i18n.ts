export type Locale = "en" | "ar"

export const messages = {
  en: {
    direction: "ltr",
    languageName: "العربية",
    brandSubtitle: "Design system",
    nav: { overview: "Overview", components: "Components", registry: "Registry" },
    heroEyebrow: "Open-source UI library",
    heroTitle: "Build product interfaces with one shared visual language.",
    heroDescription:
      "DUI is qentrah’s bilingual component system for React. Preview components here, then install the source you need with the shadcn CLI.",
    browse: "Browse components",
    github: "View on GitHub",
    commandLabel: "Install from the registry",
    copy: "Copy",
    copied: "Copied",
    catalogTitle: "Component catalog",
    catalogDescription: "Production-ready primitives that stay in your codebase.",
    search: "Search components…",
    all: "All",
    actions: "Actions",
    forms: "Forms",
    feedback: "Feedback",
    layout: "Layout",
    preview: "Preview",
    install: "Install",
    empty: "No components match your search.",
    footer: "Built by qentrah. Open source and designed for products in English and Arabic.",
    items: {
      button: { name: "Button", description: "Actions with clear hierarchy, sizes and loading states." },
      input: { name: "Input", description: "Accessible fields with labels, hints and validation." },
      badge: { name: "Badge", description: "Compact labels for status and category metadata." },
      card: { name: "Card", description: "Composable surfaces for grouped information and actions." },
      alert: { name: "Alert", description: "Contextual feedback for information, success and risk." }
    }
  },
  ar: {
    direction: "rtl",
    languageName: "English",
    brandSubtitle: "نظام تصميم",
    nav: { overview: "نظرة عامة", components: "المكوّنات", registry: "السجل" },
    heroEyebrow: "مكتبة واجهات مفتوحة المصدر",
    heroTitle: "ابنِ واجهات المنتجات بلغة بصرية موحّدة.",
    heroDescription:
      "DUI هو نظام مكوّنات ثنائي اللغة من قنطرة لتطبيقات React. عاين المكوّنات هنا، ثم ثبّت ما تحتاجه باستخدام shadcn CLI.",
    browse: "استعرض المكوّنات",
    github: "عرض على GitHub",
    commandLabel: "التثبيت من السجل",
    copy: "نسخ",
    copied: "تم النسخ",
    catalogTitle: "دليل المكوّنات",
    catalogDescription: "مكوّنات جاهزة للإنتاج وتبقى ملكاً لمشروعك.",
    search: "ابحث في المكوّنات…",
    all: "الكل",
    actions: "الإجراءات",
    forms: "النماذج",
    feedback: "التنبيهات",
    layout: "التخطيط",
    preview: "معاينة",
    install: "تثبيت",
    empty: "لا توجد مكوّنات تطابق البحث.",
    footer: "صُنع بواسطة قنطرة. مفتوح المصدر ومصمم للمنتجات العربية والإنجليزية.",
    items: {
      button: { name: "زر", description: "إجراءات بهرمية واضحة وأحجام وحالات تحميل." },
      input: { name: "حقل إدخال", description: "حقول سهلة الوصول مع عناوين وتلميحات وتحقق." },
      badge: { name: "شارة", description: "تسميات مختصرة للحالات والتصنيفات." },
      card: { name: "بطاقة", description: "مساحات مرنة لتجميع المعلومات والإجراءات." },
      alert: { name: "تنبيه", description: "رسائل سياقية للمعلومات والنجاح والمخاطر." }
    }
  }
} as const

export type Messages = (typeof messages)[Locale]
