import SideUserRouter from "@/components/sideuserrouter";

const UserFavorite = () => {
    return (
        <div className="min-h-screen flex flex-row px-12 py-6 ">
            <SideUserRouter currentPage="My favorite"/>
            <div className="flex flex-col w-2/3 bg-white p-12 shadow-2xl shadow-gray-500 border-2 border-slate-400 rounded-3xl ml-10">

            </div>
        </div>
    )
}

export default UserFavorite;