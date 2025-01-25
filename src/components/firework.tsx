/* eslint-disable @typescript-eslint/no-explicit-any */
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const canvasStyles: React.CSSProperties = {
  position: "fixed",
  width: "100%",
  height: "100vh",
  top: 0,
  left: 0,
  marginRight: 0,
  marginTop: 0,
  zIndex: 999,
};

const decorateOptions = (originalOptions: any) => {
  return {
    ...originalOptions,
    particleCount: 100,
    spread: 80,
    startVelocity: 50,
    ticks: 200,
    origin: { x: 0.5, y: 0.5 },
    shapes: ["circle", "circle", "square"],
    gravity: 2,
  };
};

export default function Firework() {
  return (
    <Fireworks
      autorun={{ speed: 0.5, duration: 3 }}
      style={canvasStyles}
      decorateOptions={decorateOptions}
    />
  );
}
