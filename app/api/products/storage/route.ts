import { MAX_STORAGE } from "@/constants/max.storage";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export async function GET() {
    try {
        await connectDB();

        const products = await Product.find({}, "imageSize");

        const usedStorage = products.reduce(
            (total: number, product: { imageSize: number }) =>
                total + (product.imageSize ?? 0),
            0
        );

        const remainingStorage = Math.max(0, MAX_STORAGE - usedStorage);

        return NextResponse.json({
            maxStorage: MAX_STORAGE,
            usedStorage,
            remainingStorage,
            maxStorageMB: +(MAX_STORAGE / 1024 / 1024).toFixed(2),
            usedStorageMB: +(usedStorage / 1024 / 1024).toFixed(2),
            remainingStorageMB: +(remainingStorage / 1024 / 1024).toFixed(2),
            imageCount: products.length,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to fetch storage information." },
            { status: 500 }
        );
    }
}