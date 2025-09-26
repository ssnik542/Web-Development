import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";
const gradientStyle = 'bg-gradient-to-br from-blue-600 to-purple-600 gradient font-extrabold tracking-tighter pr-2 pb-2 text-transparent bg-clip-text'

export default function Layout() {
    return (
        <div className="px-5">
            <div className="flex items-center justify-between mb-5">
                <h1 className={`text-6xl font-bold tracking-tight ${gradientStyle}`}>
                    Dashboard
                </h1>
            </div>
            <Suspense
                fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
            >
                <DashboardPage />
            </Suspense>
        </div>
    );
}