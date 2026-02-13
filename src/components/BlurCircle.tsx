type BlurCircleProps = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

const BlurCircle = ({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
}: BlurCircleProps) => {
  return (
    <div
      className="absolute z-0 h-56 w-56  rounded-full bg-red-500/50 blur-[80px] pointer-events-none"
      style={{ top:top, left:left, right:right, bottom:bottom }}
    />
  );
};

export default BlurCircle;
