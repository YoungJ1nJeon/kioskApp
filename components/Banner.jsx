import React, { useState, useEffect } from 'react';

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const banners = ['first_banner', 'second_banner', 'third_banner'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000); // 3초마다 배너 변경

        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="banner_tabs">
            {banners.map((banner, index) => (
                <section
                    key={index}
                    className={`banner ${banner} ${index === currentIndex ? 'visible' : 'hidden'}`}
                >
                    <article className="img"></article>
                </section>
            ))}
        </nav>
    );
};

export default Banner;
