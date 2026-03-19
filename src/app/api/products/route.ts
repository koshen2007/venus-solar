import { NextResponse } from "next/server";

export async function GET() {
  // Dummy data taaki front-end par error na aaye
  const products = [
    { id: 1, name: "3 kW Family Pack", price: "1,50,000", capacity: "3 kW", optimalFor: "2-3 BHK Homes" },
    { id: 2, name: "5 kW Business Pro", price: "2,40,000", capacity: "5 kW", optimalFor: "Big Homes / Shops" },
    { id: 3, name: "10 kW Industrial", price: "4,50,000", capacity: "10 kW", optimalFor: "Factories / Offices" }
  ];
  
  return NextResponse.json(products);
}