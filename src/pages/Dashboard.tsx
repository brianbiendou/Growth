import { useAuthStore } from '../store/auth';
import { LayoutDashboard, ShoppingCart, BookOpen, Settings, FileText, CreditCard, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const user = useAuthStore((state) => state.user);

  const stats = [
    { label: 'Balance', value: '$6,379.21', icon: CreditCard },
    { label: 'Your Orders', value: '188', icon: ShoppingCart },
    { label: 'Total Orders', value: '3,562,443', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar}
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>
          
          <nav className="mt-4 flex-1">
            <div className="space-y-1 px-2">
              {[
                { name: 'New Order', icon: PlusCircle, href: '/new-order' },
                { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
                { name: 'Orders', icon: ShoppingCart, href: '/orders' },
                { name: 'Tutorials', icon: BookOpen, href: '#' },
                { name: 'Settings', icon: Settings, href: '#' },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-800 overflow-hidden rounded-lg shadow"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">
                          {stat.label}
                        </dt>
                        <dd className="text-lg font-medium text-white">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-white mb-4">Recent Orders</h2>
            <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {[
                    {
                      service: 'Instagram Followers',
                      status: 'completed',
                      date: '2024-02-28',
                      amount: '$29.99',
                    },
                    {
                      service: 'Twitter Likes',
                      status: 'processing',
                      date: '2024-02-27',
                      amount: '$19.99',
                    },
                  ].map((order, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {order.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'completed' 
                            ? 'bg-green-900 text-green-200' 
                            : 'bg-yellow-900 text-yellow-200'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {order.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}