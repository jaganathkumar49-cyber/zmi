import { handleApiCallError } from "../utils/common";
import { apiClient } from "./axios";

export const uploadCsv = async (file) => {
	try {
		const formData = new FormData();
		formData.append("file", file);
		const { data } = await apiClient.post("/csv/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		const filename = formData.get("file").name?.split(".")[0] || "data";
		// Create a Blob from the data
		const blob = new Blob([data], { type: "text/plain" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${filename}.txt`; // Set the desired file name
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};
