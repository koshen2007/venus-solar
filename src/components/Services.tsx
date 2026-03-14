interface ServicesProps {
  onContactClick?: () => void;
}

export default function Services({ onContactClick }: ServicesProps) {
  const plans = [
    { size: "1 kW", price: "₹65,000", optimal: "Small homes, Low usage" },
    { size: "2 kW", price: "₹1,20,000", optimal: "1-2 ACs, Normal usage" },
    { size: "3 kW", price: "₹1,65,000", optimal: "2-3 ACs, High usage" },
    { size: "4 kW", price: "₹2,10,000", optimal: "Large homes, 3-4 ACs" },
    { size: "5 kW", price: "₹2,50,000", optimal: "Villas, Very high usage" },
  ];

  return (
    <section className="py-12 w-full">
      <h2 className="text-3xl font-black text-eco-green mb-8 text-center">
        Estimated Pricing
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm hover:border-eco-yellow transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-eco-green">{plan.size}</h3>
                <span className="bg-green-50 text-eco-green px-3 py-1 rounded-full text-sm font-semibold">
                  System
                </span>
              </div>
              <p className="text-gray-600 mb-6 h-12">{plan.optimal}</p>
            </div>
            <div className="pt-4 border-t border-gray-100 border-dashed">
              <span className="text-sm text-gray-500 block mb-1">Estimated Cost*</span>
              <span className="text-3xl font-black text-eco-green">{plan.price}</span>
            </div>
          </div>
        ))}
        
        <div className="bg-eco-green p-6 rounded-2xl shadow-sm text-white flex flex-col justify-center items-center text-center">
          <h3 className="text-xl font-bold mb-3 text-eco-yellow">Custom Requirement?</h3>
          <p className="text-white/90 mb-4">
            Need more than 5kW or have a commercial space?
          </p>
          <button 
            type="button"
            onClick={onContactClick}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full font-medium"
          >
            Contact us below
          </button>
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-400 mt-8">
        * Prices are approximate estimates before exact site inspection and state subsidies.
      </p>
    </section>
  );
}
