interface BannerImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const BannerImage = ({ src, alt = "Banner promocional", className = "" }: BannerImageProps) => {
  return (
    <section className={`w-full my-8 md:my-12 ${className}`}>
      <div className="w-full overflow-hidden">
        <img
          src="/images/logos/banner2.png"
          alt="Banner promocional especial"
          className="w-full h-auto object-cover"
          style={{
            aspectRatio: "1920 / 600",
            maxHeight: "600px",
          }}
        />
      </div>
    </section>
  );
};

export default BannerImage;

