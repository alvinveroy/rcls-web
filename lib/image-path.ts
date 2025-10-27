/**
 * Get the correct image path with basePath prefix for GitHub Pages deployment
 * 
 * @param path - The image path starting with / (e.g., "/image.jpg")
 * @returns The full path with basePath prefix (e.g., "/rcls-web/image.jpg")
 */
export function getImagePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  
  // If path already includes basePath, return as is
  if (basePath && path.startsWith(basePath)) {
    return path
  }
  
  // Add basePath prefix if it exists
  return basePath ? `${basePath}${path}` : path
}
