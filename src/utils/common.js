export const handleApiCallError = (error) => {
	if (error?.name == "AxiosError") {
		throw error?.response?.data;
	} else throw error;
};
