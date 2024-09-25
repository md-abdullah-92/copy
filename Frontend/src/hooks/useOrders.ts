// hooks/useOrders.ts
import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Order {
  id: number;
  name: string;
  image: string;
  buyername: string;
  soldquantity: string;
  soldprice: string;
  soldtime: string;
  deviverybyaddress: string;
  deliverystatus: string;
  buyeremail: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const router = useRouter();
  const { email } = router.query;

  useEffect(() => {
    const fetchOrders = async () => {
      const selleremail = localStorage.getItem('email') || email;

      try {
        setLoading(true);
        const response = await axios.get('/api/orders', {
          params: { selleremail },
        });

        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = searchTerm === '' || order.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || order.deliverystatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const deliveredOrders = orders.filter(order => order.deliverystatus === 'Delivered');

  return {
    order:orders,
    orders: filteredOrders,
    loading,
    error,
    handleSearchChange,
    handleFilterChange,
    filterStatus,
    searchTerm,
    deliveredOrders,
  };
};
