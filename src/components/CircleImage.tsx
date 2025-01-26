import { useState } from "react";
import Firework from "./firework";

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
  
  const [showFirework, setShowFirework] = useState(false);
  
  const handleTitleClick = () => {
    setShowFirework(true);
    // 3초 후에 폭죽 효과 숨기기 (firework 컴포넌트의 duration과 동일)
    setTimeout(() => {
      setShowFirework(false);
    }, 3000);
  };
  
  return (
    <div className="bg-white rounded-full mt-8 cursor-pointer">
      <img
        src={src}
        alt={alt}
        className={`${size} rounded-full object-cover`}
        onClick={handleTitleClick}
      />
      {showFirework && <Firework />}
    </div>
  );
}
