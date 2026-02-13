import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { uploadCsv } from "../../api/csv";
import Icons from "../../utils/icons";

function UploadCSV() {
	const [file, setFile] = useState(null);

	const handleFileChange = (e) => {
		const selected = e.target.files[0];
		if (selected && selected.type === "text/csv") {
			setFile(selected);
		} else {
			setFile(null);
		}
	};

	const uploadFile = useMutation({
		mutationKey: ["uploadCsv"],
		mutationFn: (file) => uploadCsv(file),
		onSuccess: (data) => {
			toast.success("file uploaded and processed successfully");
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	return (
		<div className="flex items-center justify-center min-h-[90vh]">
			<div className="bg-white p-8 flex flex-col items-center justify-center gap-2 rounded-2xl shadow-xl w-[95%] sm:w-full ring-2 ring-amber-300 max-w-md text-center">
				<h2 className="text-2xl flex items-center justify-center gap-2 font-bold mb-4 text-gray-800">
					<Icons.FaFileCsv />
					<p>Upload CSV File</p>
				</h2>

				<input
					type="file"
					accept=".csv"
					onChange={handleFileChange}
					className="mb-4 block w-full text-sm text-gray-700
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
				/>

				<button
					onClick={() => uploadFile.mutate(file)}
					disabled={!file || uploadFile.isPending}
					className={`w-full py-2 px-4 rounded-lg transition duration-200 ${
						uploadFile.isPending || !file
							? "bg-gray-300 cursor-not-allowed"
							: "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
					}`}
				>
					{uploadFile.isPending ? (
						"Processing..."
					) : (
						<div className="flex items-center justify-center gap-2">
							Upload CSV
							<Icons.MdUpload size={25}/>
						</div>
					)}
				</button>
			</div>
		</div>
	);
}

export default UploadCSV;
