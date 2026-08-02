"use client"
import { storageInfo } from "@/types/StorageTypes";
import { useQuery } from "@tanstack/react-query";
export const getStorageInfo = async (): Promise<storageInfo> => {
    const response = await fetch("/api/products/storage");

    if (!response.ok) {
        throw new Error("Failed to fetch storage info");
    }

    return response.json();
};
const StorageStatsCard = () => {
    const { data : storage, isLoading } = useQuery({
        queryKey: ["storage-info"],
        queryFn: getStorageInfo,
    });
    if (isLoading) return <div>Loading...</div>;
    if(!storage) return;
    return (
       <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
    <div className="space-y-5">
        {/* Header */}
        <div>
            <h3 className="text-lg md:text-xl font-semibold text-white">
                Storage Overview
            </h3>
            <p className="mt-1 text-sm text-neutral-400">
                Monitor your image storage usage for product uploads.
            </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Storage Used</span>
                <span className="font-semibold text-white">
                    {storage?.usedStorageMB} MB / {storage?.maxStorageMB} MB
                </span>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div
                    className="h-full rounded-full bg-white transition-all duration-500"
                    style={{
                        width: `${(storage?.usedStorage / storage?.maxStorage) * 100}%`,
                    }}
                />
            </div>

            <p className="text-xs text-neutral-500">
                {(
                    (storage?.usedStorage / storage?.maxStorage) *
                    100
                ).toFixed(1)}
                % of available storage used
            </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                    Used
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                    {storage?.usedStorageMB} MB
                </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                    Remaining
                </p>
                <p className="mt-1 text-lg font-semibold text-green-400">
                    {storage?.remainingStorageMB} MB
                </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                    Total Limit
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                    {storage?.maxStorageMB} MB
                </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                    Images
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                    {storage?.imageCount}
                </p>
            </div>
        </div>

        {/* Upload Limit */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
            <p className="text-sm text-blue-300">
                <span className="font-semibold">Upload Limit:</span> Each
                product image can be up to{" "}
                <span className="font-semibold text-white">5 MB</span>.
            </p>
        </div>

        {/* Warning */}
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">
            <p className="text-sm leading-6 text-yellow-300">
                <span className="font-semibold">Important:</span> When the{" "}
                <span className="font-semibold text-white">
                    {storage?.maxStorageMB} MB
                </span>{" "}
                storage limit is reached, new image uploads will be blocked.
                Delete unused products or replace older images to free up
                storage.
            </p>
        </div>
    </div>
</div>
    )
}

export default StorageStatsCard