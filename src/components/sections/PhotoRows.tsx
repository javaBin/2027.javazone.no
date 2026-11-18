export interface Photo {
  src: string
  /** Intrinsic size, used for the aspect ratio and to reserve space before the image loads. */
  width: number
  height: number
  alt: string
}

interface PhotoRowsProps {
  /** Each inner array is one row; keep rows to 2–3 photos so they still read at phone width. */
  rows: Photo[][]
}

// Justified photo rows: every photo in a row gets the same height and keeps its own aspect ratio,
// so landscape and portrait shots can sit side by side without cropping.
const PhotoRows = ({ rows }: PhotoRowsProps) => {
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {rows.map((row, idx) => (
        <div key={idx} className="flex gap-2 md:gap-4">
          {row.map((photo) => {
            const ratio = photo.width / photo.height
            return (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                className="block h-auto min-w-0 object-cover rounded-surface bg-surface"
                style={{ flex: `${ratio} 1 0%`, aspectRatio: ratio }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default PhotoRows
