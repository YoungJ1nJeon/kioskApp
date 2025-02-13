import React from 'react';
import { useSelector } from 'react-redux';
import MenuTabs from './MenuTabs';
import OrderTabs from './OrderTabs';
import Cart from './Cart';

const Orderbug = () => {
    const selectedMenuItem = useSelector(state => state.selectedMenuItem);

    return (
        <nav className="order_tabs">
            <MenuTabs />
            <OrderTabs selectedMenuItem={selectedMenuItem} />
            <Cart />
        </nav>
    );
};

export default Orderbug;
