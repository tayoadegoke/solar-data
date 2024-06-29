import React, { useEffect, useState } from 'react'


function useSdMediaQuery() {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };


        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        {
            xs: !!(screenWidth < 768),
            md: !!(screenWidth >= 768 && screenWidth < 1024),
            lg: !!(screenWidth >= 1024)

        }
    )
}

export default useSdMediaQuery
