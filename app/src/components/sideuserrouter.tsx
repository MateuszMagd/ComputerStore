import { ArrowBigRight, ArrowRight} from "lucide-react";
import Link from "next/link";

const SideUserRouter = ({currentPage}: {currentPage: String}) => {
    return (
        <div className="flex flex-col w-1/3 bg-white p-12 shadow-2xl shadow-gray-500 border-2 border-slate-400 rounded-3xl">
            <div className="flex flex-row text-2xl font-medium mb-5"> 
                ComputerShop.net <ArrowBigRight className="mt-1"/> {currentPage}
            </div>
            
            <div className="flex flex-col">
                <Link href="/user/my-info" className="flex flex-row"><ArrowRight/> Go to my info</Link>
            </div>
        </div>
    )
}

export default SideUserRouter