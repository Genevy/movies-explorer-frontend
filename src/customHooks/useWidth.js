import { useEffect, useState } from "react";


function useWidth () {
	const [ width, setWidth ] = useState(window.innerWidth);

	const handleUpdateWidth = () => setWidth(window.innerWidth);

	const widthEffectHandler = () => {
		window.addEventListener('resize', handleUpdateWidth);
    return () => window.removeEventListener('resize', handleUpdateWidth);
	};

	useEffect(widthEffectHandler);
	
	return width;
}

export default useWidth;