export const logOutUser = () => {
	localStorage.clear();
	window.location.reload();
};
