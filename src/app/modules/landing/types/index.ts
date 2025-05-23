// // User related types
// export interface User {
//     first_name?: string
//     last_name?: string
//     email?: string
//   }
  
//   // Navigation related types
//   export interface NavigationItem {
//     label: string
//     href: string
//   }
  
//   export interface NavLink {
//     text: string
//     href: string
//   }
  
//   export interface FooterNavSectionProps {
//     title: string
//     links: NavLink[]
//   }
  
//   export interface ProfileSectionProps {
//     firstName?: string
//     lastName?: string
//     email?: string
//   }
  
  

// User related types
// export interface User {
//   first_name?: string
//   last_name?: string
//   email?: string
//   role?: string
// }

// // Navigation related types
// export interface NavigationItem {
//   label: string
//   href: string
// }

// export interface NavLink {
//   text: string
//   href: string
// }

// export interface FooterNavSectionProps {
//   title: string
//   links: NavLink[]
// }

// export interface ProfileSectionProps {
//   firstName?: string
//   lastName?: string
//   email?: string
//   role?: string
// }



export interface User {
  first_name?: string
  last_name?: string
  email?: string
  phone_number?: string
  role?: string
}

// Navigation related types
export interface NavigationItem {
  label: string
  href: string
}

export interface NavLink {
  text: string
  href: string
}

export interface FooterNavSectionProps {
  title: string
  links: NavLink[]
}

export interface ProfileSectionProps {
  firstName?: string
  lastName?: string
  email?: string
  role?: string
  phone_number?: string
}


export type GuideItem = {
  id: string
  title: string
  description: string
  type: "video" | "article"
  duration: number
  thumbnail: string
  content?: string
  videoUrl?: string
  youtubeId?: string // Added YouTube ID field
  completed?: boolean
}

export type FilterType = "all" | "articles" | "videos"

export type LanguageOption = {
  code: string
  name: string
}
