"use client";

import { AddProductFormType } from "@/types/ProductTypes";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { FiPlus, FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const AddProductForm = () => {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AddProductFormType>();

    const onSubmit = async (data: AddProductFormType) => {
        const file = data.image[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description ?? "");
        formData.append("price", data.price.toString());
        formData.append("stockLeft", data.stockLeft.toString());
        formData.append("imageSize", file.size.toString());
        formData.append("image", file);
        const response = await fetch("/api/products", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        console.log("Response code ", response.ok);

        if (response.ok) {
            toast.success("Product added successfully.");
            queryClient.invalidateQueries({
                queryKey: ["storage-info"],
            })
            // only for products
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            reset();
            return;
        }
        toast.error(result.message ?? "Failed to add product.");
    };

    return (
        <>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                    <FiPlus size={24} />
                    <h2 className="text-xl font-semibold md:text-3xl">
                        Add Product
                    </h2>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div>
                        <label
                            htmlFor="productName"
                            className="mb-2 block text-base font-medium md:text-lg"
                        >
                            Product Name
                        </label>

                        <input
                            id="productName"
                            type="text"
                            placeholder="Modern Wooden Sofa"
                            className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 outline-none focus:border-white"
                            {...register("name", {
                                required: "Product name is required.",
                            })}
                        />

                        {errors.name && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="productDescription"
                            className="mb-2 block text-base font-medium md:text-lg"
                        >
                            Description
                        </label>

                        <textarea
                            id="productDescription"
                            placeholder="Describe the Product"
                            rows={4}
                            maxLength={100}
                            className="w-full resize-none rounded-xl border border-white/20 bg-transparent px-4 py-3 outline-none focus:border-white"
                            {...register("description", {
                                maxLength: {
                                    value: 100,
                                    message: "Description cannot exceed 100 characters.",
                                },
                            })}
                        />

                        {errors.description && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="productImage"
                            className="mb-2 block text-base font-medium md:text-lg"
                        >
                            Product Image
                        </label>

                        <label
                            htmlFor="productImage"
                            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/20 p-8 transition hover:border-white hover:bg-white/5"
                        >
                            <FiUploadCloud className="text-5xl" />

                            <p className="text-center font-medium">
                                Click to upload
                            </p>

                            <p className="text-sm text-neutral-400">
                                JPG, PNG, WEBP • Maximum 5MB
                            </p>
                        </label>

                        <input
                            id="productImage"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            {...register("image", {
                                required: "Product image is required.",
                                validate: {
                                    maxSize: (files) =>
                                        !files?.[0] ||
                                        files[0].size <= MAX_IMAGE_SIZE ||
                                        "Image must be under 5 MB.",

                                    fileType: (files) =>
                                        !files?.[0] ||
                                        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
                                            files[0].type
                                        ) ||
                                        "Only JPG, JPEG, PNG and WEBP are allowed.",
                                },
                            })}
                        />

                        {errors.image && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.image.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="productPrice"
                            className="mb-2 block text-base font-medium md:text-lg"
                        >
                            Product Price
                        </label>

                        <input
                            id="productPrice"
                            type="number"
                            placeholder="25000"
                            className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 outline-none focus:border-white"
                            {...register("price", {
                                required: "Price is required.",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Price must be greater than zero.",
                                },
                            })}
                        />

                        {errors.price && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="stockLeft"
                            className="mb-2 block text-base font-medium md:text-lg"
                        >
                            Stock Left
                        </label>

                        <input
                            id="stockLeft"
                            type="number"
                            placeholder="10"
                            className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 outline-none focus:border-white"
                            {...register("stockLeft", {
                                required: "Stock is required.",
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: "Stock cannot be negative.",
                                },
                            })}
                        />

                        {errors.stockLeft && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.stockLeft.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-full bg-white py-3.5 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                    >
                        {isSubmitting ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddProductForm;