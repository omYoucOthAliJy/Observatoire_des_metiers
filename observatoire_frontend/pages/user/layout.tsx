import { Header } from "@/components/profile";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex flex-col w-full min-h-screen bg-[#FFFFFF]">
            <Header user={{name: "omar mourid", role: "user"}}/>
            <div>{children}</div>
        </div>
    )
}