interface DescriptionProps {
  children: React.ReactNode;
}

export default function Description({ children }: DescriptionProps) {
  return (
    <div className="flex flex-col items-center text-center text-lg text-white space-y-1 whitespace-pre-line break-keep">
      {children}
    </div>
  );
}
