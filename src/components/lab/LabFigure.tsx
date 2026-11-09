import { getImageProps } from 'next/image';
import { LAB_PHOTOS, type LabPhotoCode } from '@/data/labPhotos';
import PhotoNote from './PhotoNote';

// One lab photo: a fixed aspect-ratio box (nothing jumps while it loads), next/image's optimizer for
// WebP/AVIF at responsive sizes from the 2000 px master, lazy unless `eager`, the (i) note, and the
// caption. getImageProps + a plain <img> instead of <Image>: same output, but nothing to hydrate
// (the landing pages carry up to 9 of these).
export default function LabFigure({
  code,
  sizes,
  aspect = '3 / 2',
  caption = true,
  eager = false,
  position,
  className = '',
}: {
  code: LabPhotoCode;
  /** next/image sizes, e.g. "(min-width: 1024px) 33vw, 100vw". */
  sizes: string;
  /** CSS aspect-ratio of the box; the photo is cropped to fill it. */
  aspect?: string;
  caption?: boolean;
  eager?: boolean;
  /** CSS object-position for the crop. */
  position?: string;
  className?: string;
}) {
  const photo = LAB_PHOTOS[code];
  const { props: img } = getImageProps({
    src: photo.src,
    alt: photo.alt,
    fill: true,
    sizes,
    loading: eager ? 'eager' : 'lazy',
  });
  return (
    <figure className={`lab-fig ${className}`}>
      <div className="lab-fig-media" style={{ aspectRatio: aspect }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- getImageProps output, see above */}
        <img {...img} alt={photo.alt} style={position ? { ...img.style, objectPosition: position } : img.style} />
        <PhotoNote />
      </div>
      {caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}
