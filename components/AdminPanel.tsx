import { FiUploadCloud, FiPlus } from "react-icons/fi";

const AdminPanel = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-6 md:px-8 md:py-10">
            <h1 className="text-2xl md:text-5xl font-bold text-center">
                Welcome to Admin Panel
            </h1>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 space-y-3">
                <p className="text-base md:text-lg text-gray-300">
                    📸 Image uploads remaining:{" "}
                    <span className="font-semibold text-white">3</span>
                </p>

                <p className="text-sm md:text-base text-neutral-400">
                    Maximum storage available for product images is{" "}
                    <span className="font-semibold text-white">100MB</span>. Each image can
                    be up to <span className="font-semibold text-white">5MB</span>.
                </p>

                <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3">
                    <p className="text-sm md:text-base text-yellow-300">
                        <span className="font-semibold">Note:</span> Once the 100MB storage
                        limit is reached, you'll need to delete some existing product images
                        before uploading new ones.
                    </p>
                </div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <FiPlus size={24} />
                    <h2 className="text-xl md:text-3xl font-semibold">
                        Add Product
                    </h2>
                </div>

                <form className="space-y-5">
                    <div>
                        <label
                            htmlFor="productName"
                            className="block mb-2 text-base md:text-lg font-medium"
                        >
                            Product Name
                        </label>

                        <input
                            type="text"
                            id="productName"
                            placeholder="Modern Wooden Sofa"
                            required
                            className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-white"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="productImage"
                            className="block mb-2 text-base md:text-lg font-medium"
                        >
                            Product Image
                        </label>

                        <label
                            htmlFor="productImage"
                            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/20 p-8 md:p-10 cursor-pointer transition hover:border-white hover:bg-white/5"
                        >
                            <FiUploadCloud className="text-white text-4xl md:text-5xl" />

                            <p className="text-base md:text-lg font-medium text-center">
                                Tap or click to upload
                            </p>

                            <p className="text-xs md:text-sm text-neutral-400 text-center">
                                JPG, PNG, WEBP • Maximum 5MB
                            </p>
                        </label>

                        <input
                            id="productImage"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="productPrice"
                            className="block mb-2 text-base md:text-lg font-medium"
                        >
                            Product Price
                        </label>

                        <input
                            type="number"
                            id="productPrice"
                            inputMode="numeric"
                            placeholder="25000"
                            required
                            className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-white text-black py-3.5 font-semibold transition hover:opacity-90"
                    >
                        Add Product
                    </button>
                </form>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 md:p-8">
                <h2 className="text-xl md:text-3xl font-semibold mb-3">
                    Remove Products
                </h2>

                <p className="text-sm md:text-base text-neutral-400">
                    Products stored in MongoDB will appear here.
                </p>
            </div>
        </div>
    );
};

export default AdminPanel;