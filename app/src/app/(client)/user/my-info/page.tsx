
import SideUserRouter from "@/components/sideuserrouter";
import UserInfoCard from "@/components/userinfocard";

const MyInfo = () => {
    return (
        <div className="min-h-screen flex flex-row px-12 py-6 ">
            <SideUserRouter currentPage="My info"/>
            <div
                className="w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25"></div>
            <div className="w-2/3">
                <UserInfoCard />
            </div>
        </div>
    )
}


export default MyInfo;