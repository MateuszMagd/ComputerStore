import Link from "next/link";


const AdminNav = () => {
    return (
        <div className="flex flex-row bg-white px-10 py-5 border-1 border-black rounded-b-full w-11/12 justify-center space-x-8 ">
            <Link href="/admin/users" className="border-1 border-black bg-black text-white rounded-md px-12 py-2 text-xl text-center mt-5"> Users </Link>
            <Link href="/admin/products" className="border-1 border-black bg-black text-white rounded-md px-12 text-xl py-2 text-center mt-5"> Products </Link>
            <Link href="/admin/sale-statistic" className="border-1 border-black bg-black text-white rounded-md px-12 text-xl py-2 text-center mt-5"> Sale Statistic </Link>
        </div>
    )
}

export default AdminNav;