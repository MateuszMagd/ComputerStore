import { ArrowBigRight } from "lucide-react";
import UserInfoCard from "@/components/userinfocard";

const MyInfo = () => {
    return (
        <div className="min-h-screen flex flex-row px-12 py-6 ">
            <div className="flex flex-row text-2xl font-medium w-1/3 bg-white p-12 shadow-2xl shadow-gray-500 border-2 border-slate-400 rounded-3xl">
                ComputerShop.net <ArrowBigRight className="mt-1"/> My info
            </div>
            <div
                className="w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25"></div>
            <div className="w-2/3">
                <UserInfoCard />
            </div>
        </div>
    )
}


export default MyInfo;