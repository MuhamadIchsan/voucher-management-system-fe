import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadVouchers } from "./services";
import type { VoucherUploadResponseType } from "./types/voucher-type";
import type { ResponseAPIType } from "../../types";

const UploadVoucherPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [response, setResponse] =
    useState<ResponseAPIType<VoucherUploadResponseType> | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => uploadVouchers(data),
    onSuccess: (res) => {
      setResponse(res);
      setFile(null);
    },
  });

  const handleFileSelect = (f: FileList | null) => {
    if (!f?.[0]) return;
    setFile(f[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    mutate(formData);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Upload Voucher CSV
      </h1>

      {/* Drag and drop area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-150 ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        {file ? (
          <p className="text-gray-700">
            Selected file: <strong>{file.name}</strong>
          </p>
        ) : (
          <>
            <p className="text-gray-600">Drag & drop your CSV file here</p>
            <p className="text-sm text-gray-400 my-2">or</p>
            <label
              htmlFor="fileUpload"
              className="cursor-pointer text-blue-600 font-semibold hover:underline"
            >
              Choose from browser
            </label>
            <input
              id="fileUpload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </>
        )}
      </div>

      {/* Upload button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleUpload}
          disabled={!file || isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium"
        >
          {isPending ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Response */}
      {response && (
        <div className="mt-6 bg-gray-50 p-4 rounded-xl border">
          <h2 className="font-semibold mb-2 text-gray-800">Upload Summary</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              <strong>Total Rows:</strong> {response?.data?.total_rows}
            </li>
            <li>
              <strong>Success Rows:</strong> {response?.data?.success_rows}
            </li>
            <li>
              <strong>Failed Rows:</strong> {response?.data?.failed_rows}
            </li>
          </ul>
          <p
            className={`mt-3 text-sm font-medium ${
              response.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {response.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadVoucherPage;
