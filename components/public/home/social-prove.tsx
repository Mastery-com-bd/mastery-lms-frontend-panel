import Image from "next/image";

const partners = [
  {
    name: "kuukid",
    logo: "/social Prove/social-prove1.png",
  },
  {
    name: "cocobee",
    logo: "/social Prove/social-prove2.png",
  },
  {
    name: "DESTINY KIDS",
    logo: "/social Prove/social-prove3.png",
  },
  {
    name: "melbourne KIDS THERAPY",
    logo: "/social Prove/social-prove4.png",
  },
  {
    name: "PARENT CHOICE GAMES",
    logo: "/social Prove/social-prove5.png",
  },
  {
    name: "Autism Parenting Magazine",
    logo: "/social Prove/social-prove6.png",
  },
];

const SocialProve = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1a1a1a] mb-12">
          You might know us from
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center max-w-6xl mx-auto">
          {partners.slice(0, 4).map((partner) => (
            <div key={partner.name} className="relative w-full h-20">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center justify-items-center max-w-3xl mx-auto mt-8 md:mt-12">
          {partners.slice(4).map((partner) => (
            <div key={partner.name} className="relative w-full h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProve;