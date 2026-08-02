export const openWhatsApp = ({
    phone,
    name,
    description,
    price,
}: {
    phone: string;
    name: string;
    description?: string;
    price: number;
}) => {
    const message = `Hello Maa Furniture House,

I would like to order the following product.

Product: ${name}
Description: ${description || "N/A"}
Price: ₹${price}

Please let me know:
- Availability
- Delivery charges
- Estimated delivery time

Thank you.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
};