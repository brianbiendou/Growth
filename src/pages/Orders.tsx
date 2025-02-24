import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const services = [
  { id: '1', name: 'Instagram Followers', price: 0.99, minQuantity: 100 },
  { id: '2', name: 'Instagram Likes', price: 0.49, minQuantity: 50 },
  { id: '3', name: 'Twitter Followers', price: 1.99, minQuantity: 100 },
  { id: '4', name: 'YouTube Views', price: 0.99, minQuantity: 1000 },
];

export function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || service.name.toLowerCase().includes(selectedCategory))
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold">New Order</h1>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 appearance-none"
              >
                <option value="all">All Categories</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              <div className="text-gray-400 mb-4">
                <p>Starting from ${service.price} per {service.minQuantity}</p>
                <p>Minimum order: {service.minQuantity}</p>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Order Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}