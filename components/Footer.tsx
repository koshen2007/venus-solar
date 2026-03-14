export default function Footer() {
  return (
    <footer className="w-full py-8 mt-12 bg-eco-green text-eco-white text-center rounded-t-3xl">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-xl font-bold text-eco-yellow mb-2">Venus Solar Energy</h2>
        <p className="text-sm opacity-90 mb-6">Making solar installation completely frictionless.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm opacity-75">
          <span>&copy; {new Date().getFullYear()} Venus Solar Energy. All rights reserved.</span>
          <span className="hidden sm:inline">•</span>
          <span>Contact: +91 9024424633</span>
        </div>
      </div>
    </footer>
  );
}
