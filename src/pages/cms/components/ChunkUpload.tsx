import React, { useState, useRef } from 'react';
import {
    checkChunkStatus,
    commitChunk,
    uploadChunk
} from "../../../../libs/FormCmsAdminSdk/cms/services/chunkUpload";

interface UploadStatus {
    fileId?: string;
    progress: number;
    status: 'idle' | 'uploading' | 'success' | 'error';
    error?: string;
}

const CHUNK_SIZE = 1024 * 1024; // 1MB chunks

export function ChunkUpload() {
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ progress: 0, status: 'idle' });
    const [file, setFile] = useState<File>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setFile(file);

        setUploadStatus({ progress: 0, status: 'uploading'});

        try {
            const {data} = await checkChunkStatus(file.name,file.size);

            if (!data) return;

            // Split file into chunks
            const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
            let uploadedChunks = 0;

            // Upload chunks
            for (let i = data.count; i < totalChunks; i++) {
                const start = i * CHUNK_SIZE;
                const end = Math.min(start + CHUNK_SIZE, file.size);
                const chunk = file.slice(start, end);

                await uploadChunk(data.path, file.name, i, chunk);

                uploadedChunks++;
                setUploadStatus({
                    fileId: data.path,
                    progress: (uploadedChunks / totalChunks) * 100,
                    status: 'uploading',
                });
            }
            await commitChunk(data.path,file.name);
            setUploadStatus({ fileId:data.path, progress: 100, status: 'success' });
        } catch (error) {
            setUploadStatus({
                progress: 0,
                status: 'error',
                error: error instanceof Error ? error.message : 'Upload failed',
            });
        }
    };

    const checkStatus = async () => {
        if (!uploadStatus.fileId) return;
        if (!file) return;

        try {
            const {data} = await checkChunkStatus(file.name,file.size);
            console.log(data);
            // setUploadStatus((prev) => ({ ...prev, progress: status.progress || prev.progress }));
        } catch (error) {
            setUploadStatus((prev) => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Status check failed',
            }));
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">File Upload</h2>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={uploadStatus.status === 'uploading'}
            />
            {uploadStatus.status !== 'idle' && (
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${uploadStatus.progress}%` }}
                        ></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                        {uploadStatus.status === 'uploading' && `Uploading: ${uploadStatus.progress.toFixed(2)}%`}
                        {uploadStatus.status === 'success' && 'Upload Complete!'}
                        {uploadStatus.status === 'error' && `Error: ${uploadStatus.error}`}
                    </p>
                    {uploadStatus.status === 'uploading' && (
                        <button
                            onClick={checkStatus}
                            className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            Check Status
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}