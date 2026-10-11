import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative flex items-center justify-center">
      <Image
        src="/bazar-hero.png"
        alt="বাজার দর"
        width={320}
        height={320}
        priority
        className="h-auto w-full max-w-64 object-contain"
      />
    </div>
  );
}