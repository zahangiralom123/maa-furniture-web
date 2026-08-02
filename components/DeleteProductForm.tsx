const DeleteProductForm = () => {
    return (
        <div className="bg-red-700/70 mt-8 border border-red-400 p-5 md:p-8 rounded-3xl flex flex-col justify-center">
            <p className="text-xl md:text-3xl font-bold">Delete Every Products</p>
            <span>Note &rarr; This will delete everything like images, all posts use it cautiously when needed</span>
            <button className="bg-white text-black font-bold cursor-pointer border border-white rounded-full w-fit px-3 mt-3">Delete</button>
        </div>
    )
}
export default DeleteProductForm