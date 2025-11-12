export interface BlogPost {
  id: string
  slug: string
  title: {
    fr: string
    en: string
  }
  excerpt: {
    fr: string
    en: string
  }
  content: {
    fr: string
    en: string
  }
  publishedAt: string
  readTime: {
    fr: string
    en: string
  }
  category: {
    fr: string
    en: string
  }
  image: string
  tags: {
    fr: string[]
    en: string[]
  }
}
