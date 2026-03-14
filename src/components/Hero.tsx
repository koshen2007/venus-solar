interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section className="py-16 md:py-24 flex flex-col items-center text-center bg-eco-white rounded-3xl mb-12 border border-gray-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-eco-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
      
      <h1 className="text-4xl md:text-6xl font-black text-eco-green mb-6 tracking-tight z-10">
        Switch to Solar. <br/> Zero Friction.
      </h1>
      
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-10 z-10 px-4">
        Save on electricity bills effortlessly. 
        We handle everything from inspection to installation with just one click. 
        Perfect for your home.
      </p>

      <button
        onClick={onBookClick}
        className="z-10 bg-eco-yellow hover:bg-yellow-400 text-eco-green text-xl md:text-2xl font-bold py-5 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95"
      >
        Book Solar Installation
      </button>
    </section>
  );
}
