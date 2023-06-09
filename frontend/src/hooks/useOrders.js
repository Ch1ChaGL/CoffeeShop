import { useMemo } from 'react';

export const useSortedOrders = (orders, sort) => {
  const sortedOrders = useMemo(() => {
    if (sort === 'all') {
      return orders;
    } else if (sort === 'open') {
      console.log('Открытые заказы');
      console.log(orders);
      console.log(orders.filter(order => order.Status === 0));
      return orders.filter(order => order.Status === 0);
    } else if (sort === 'close') {
      console.log('Закрытые заказы');
      console.log(orders.filter(order => order.Status === 1));
      return orders.filter(order => order.Status === 1);
    }
  }, [sort, orders]);

  return sortedOrders;
};

export const useOrders = (orders, query, sort) => {
  const sortedOrders = useSortedOrders(orders, sort);
  console.log('sortedOrders');
  console.log(sortedOrders);
  const sortedAndFiltered = useMemo(() => {
    return sortedOrders.filter(order => {
      const orderId = order.OrderId + '';
      const FirstName = order.User.FirstName;
      const LastName = order.User.LastName;
      const Email = order.User.Email;

      return (
        orderId.toLowerCase().includes(query.toLowerCase()) ||
        FirstName.toLowerCase().includes(query.toLowerCase()) ||
        LastName.toLowerCase().includes(query.toLowerCase()) ||
        Email.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [query, orders, sort]);
  console.log('sortedAndFiltered');
  console.log(sortedAndFiltered);
  return sortedAndFiltered;
};
