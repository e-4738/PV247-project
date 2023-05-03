import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | BeatBraniac`;
	}, [title]);
};

export default usePageTitle;
