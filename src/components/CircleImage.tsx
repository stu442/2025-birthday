interface CircleImageProps {
  src: string;
  alt: string;
  size?: string;
}

export default function CircleImage({
  src,
  alt,
  size = "w-64 h-64",
}: CircleImageProps) {
  return (
    <div className="bg-white rounded-full mt-8">
      <img
        src={src}
        alt={alt}
        className={`${size} rounded-full object-cover`}
      />
    </div>
  );
}
