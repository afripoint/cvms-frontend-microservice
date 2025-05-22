// import type React from "react"

// export const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
//   event.preventDefault()
//   const targetElement = document.getElementById(targetId)
//   if (targetElement) {
//     targetElement.scrollIntoView({ behavior: "smooth" })
//   }
// }






import type React from "react"
import { NavigateFunction } from "react-router-dom"

/**
 * Simple scroll function for elements on the same page
 */
export const handleScroll = (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, 
  targetId: string
): void => {
  // Only handle element IDs, not full hrefs
  if (!targetId.startsWith('#')) {
    return
  }
  
  event.preventDefault()
  const elementId = targetId.substring(1) // Remove the # character
  const targetElement = document.getElementById(elementId)
  
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" })
  }
}

/**
 * Enhanced scroll handler that works across pages
 * 
 * @param e - The click event
 * @param href - The target href from the navigation item
 * @param navigate - The navigate function from useNavigate (optional)
 * @param closeMobileMenu - Optional callback to close mobile menu if open
 */
export const handleScrollToSection = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  navigate?: NavigateFunction,
  closeMobileMenu?: () => void
): void => {
  // Close mobile menu if provided
  if (closeMobileMenu) {
    closeMobileMenu();
  }

  // If this is a hash link (section on the page)
  if (href.startsWith('#')) {
    e.preventDefault();
    const targetId = href.substring(1);
    
    // Check if we're on the home page
    if (window.location.pathname === '/' || window.location.pathname === '') {
      // We're on the home page, scroll to the section
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Smooth scroll to the element
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // We're on another page, navigate to home with the hash
      if (navigate) {
        navigate(`/${href}`);
      } else {
        // Fallback to direct location change if navigate is not available
        window.location.href = `/${href}`;
      }
    }
  }
  // If it's a regular link, let the default behavior handle it
}

/**
 * Scrolls to the section specified in the URL hash after page load or navigation
 */
export const scrollToHashSection = (): void => {
  // Check if there's a hash in the URL
  if (window.location.hash) {
    // Remove the # character
    const targetId = window.location.hash.substring(1)
    // Find the element
    const targetElement = document.getElementById(targetId)
    // Scroll to it if found
    if (targetElement) {
      // Use a small timeout to ensure DOM is ready
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }
}