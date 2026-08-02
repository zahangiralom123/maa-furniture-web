import { MAX_STORAGE } from "@/constants/max.storage";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
export async function GET() {
    const products = await Product.find()
        .select("-_id +image.data");
    const formattedProducts = products.map((product) => {
        const obj = product.toObject();

        return {
            ...obj,
            image: `data:${obj.image.contentType};base64,${obj.image.data.toString("base64")}`,
        };
    });
    return NextResponse.json(formattedProducts);
}



export async function POST(request: Request) {
    try {
        await connectDB();

        const formData = await request.formData();

        const name = formData.get("name") as string;
        const description = (formData.get("description") as string) ?? "";
        const price = Number(formData.get("price"));
        const stockLeft = Number(formData.get("stockLeft"));
        const image = formData.get("image") as File | null;

        console.log("Image size:", image?.size);
        console.log("Form imageSize:", formData.get("imageSize"));
        if (
            !name ||
            Number.isNaN(price) ||
            Number.isNaN(stockLeft) ||
            !image
        ) {
            return NextResponse.json(
                { message: "Invalid request body." },
                { status: 400 }
            );
        }

        // Per-image validation
        if (image.size > MAX_IMAGE_SIZE) {
            return NextResponse.json(
                { message: "Image must be under 5 MB." },
                { status: 400 }
            );
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(image.type)) {
            return NextResponse.json(
                { message: "Only JPG, PNG and WEBP images are allowed." },
                { status: 400 }
            );
        }

        // Total storage validation
        const products = await Product.find({}, "imageSize");

        const usedStorage = products.reduce(
            (total: number, product: { imageSize: number }) =>
                total + (product.imageSize ?? 0),
            0
        );

        if (usedStorage + image.size > MAX_STORAGE) {
            return NextResponse.json(
                {
                    message: "Storage limit exceeded.",
                    usedStorage,
                    remainingStorage: MAX_STORAGE - usedStorage,
                },
                { status: 400 }
            );
        }

        // TODO:
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const product = await Product.create({
            name: name.trim(),
            description: description.trim() || null,
            price,
            stockLeft,

            image: {
                data: buffer,
                contentType: image.type,
            },

            imageSize: image.size ?? 0,
        });
        console.log("Actual data saved to mongodb", product);

        return NextResponse.json(product, { status: 200 });
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { message: "Failed to create product." },
            { status: 500 }
        );
    }
}