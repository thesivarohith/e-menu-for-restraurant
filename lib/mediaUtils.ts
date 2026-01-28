/**
 * Media optimization utilities for Cloudinary video/image URLs
 * Injects optimization flags to reduce file sizes and improve loading times
 */

/**
 * Transforms a Cloudinary video URL to include optimization parameters.
 * 
 * Optimizations applied:
 * - q_auto:good - Balances visual quality with smaller file size
 * - f_auto - Serves .webm to Chrome/Android for faster loading
 * - w_720 - Resizes 4K/1080p uploads down to mobile-friendly HD
 * 
 * @param url - The original Cloudinary video URL
 * @returns The optimized URL with transformation parameters
 * 
 * @example
 * // Original: https://res.cloudinary.com/xxx/video/upload/v123/sample.mp4
 * // Optimized: https://res.cloudinary.com/xxx/video/upload/q_auto:good,f_auto,w_720/v123/sample.mp4
 */
export function getOptimizedVideoUrl(url: string): string {
    // Safety check: only transform Cloudinary URLs
    if (!url || !url.includes('cloudinary.com')) {
        return url;
    }

    // Inject optimization parameters after "/upload/"
    return url.replace('/upload/', '/upload/q_auto:good,f_auto,w_720/');
}

/**
 * Transforms a Cloudinary image URL to include optimization parameters.
 * 
 * @param url - The original Cloudinary image URL
 * @param width - Optional width to resize to (default: 720)
 * @returns The optimized URL with transformation parameters
 */
export function getOptimizedImageUrl(url: string, width: number = 720): string {
    // Safety check: only transform Cloudinary URLs
    if (!url || !url.includes('cloudinary.com')) {
        return url;
    }

    // Inject optimization parameters after "/upload/"
    return url.replace('/upload/', `/upload/q_auto:good,f_auto,w_${width}/`);
}
