import os

seo_data_file = "/Users/r/8/lib/seo-data.ts"
base_dir = "/Users/r/8/app"

# Slugs to create (that are defined in seo-data.ts but might not have folders)
slugs = [
    "keramogranit-pod-derevo-spb",
    "keramogranit-pod-mramor-spb",
    "plitka-seraya-spb",
    "plitka-belaya-spb",
    "keramogranit-matovyy-spb",
    "plitka-dlya-dushi-spb",
    "plitka-nastennaya-spb",
    "keramogranit-45x90-spb",
    "plitka-dlya-ofisa-spb",
    "kafelnaya-plitka-spb",
    "plitka-dlya-fartuka-spb",
    "rasprodazha-plitki-spb",
    "keramogranit-optom-spb",
    "napolnaya-plitka-spb",
    "plitka-pod-kirpich-spb",
    "plitka-monokolor-spb"
]

template = """import { SeoLandingPage } from "@/components/seo-landing-page"
import { seoPages } from "@/lib/seo-data"
import { Metadata } from "next"
import { notFound } from "next/navigation"

const slug = "{slug}"

export async function generateMetadata(): Promise<Metadata> {{
  const data = seoPages[slug as keyof typeof seoPages]
  if (!data) return {{}}

  return {{
    title: data.title,
    description: data.description,
    alternates: {{
      canonical: `https://plitki-spb.ru/${{slug}}`,
    }},
  }}
}}

export default function Page() {{
  const data = seoPages[slug as keyof typeof seoPages]
  if (!data) notFound()

  return <SeoLandingPage data={data} />
}}
"""

for slug in slugs:
    dir_path = os.path.join(base_dir, slug)
    os.makedirs(dir_path, exist_ok=True)
    file_path = os.path.join(dir_path, "page.tsx")
    
    # Only create if doesn't exist to avoid overwriting custom pages
    if not os.path.exists(file_path):
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(template.format(slug=slug))
        print(f"Created: {slug}/page.tsx")
    else:
        print(f"Exists: {slug}/page.tsx")
