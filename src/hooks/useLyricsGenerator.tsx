import { useEffect, useState } from 'react';
import axios from 'axios';

const useLyricsGenerator = () => {
	const [quote, setQuote] = useState(null);

	useEffect(() => {
		axios
			.get('https://taylorswiftapi.onrender.com/get')
			.then(response => setQuote(response.data.quote))
			.catch(error => console.error(error));
	}, []);

	return quote;
};

export default useLyricsGenerator;
