import AddProductForm from "./AddProductForm";
import DeleteProductForm from "./DeleteProductForm";
import RemoveProductForm from "./RemoveProductForm";
import StorageStatsCard from "./StorageStatsCard";
import UpdateProductForm from "./UpdateProductForm";

const AdminPanel = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-6 md:px-8 md:py-10">
            <h1 className="text-2xl md:text-5xl font-bold text-center">
                Welcome to Admin Panel
            </h1>
            <StorageStatsCard />
            <AddProductForm />
            <UpdateProductForm />
            <RemoveProductForm />
            <DeleteProductForm />
        </div>
    );
};

export default AdminPanel;