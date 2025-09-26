import Link from "next/link";
import { Button } from "@/components/ui/button";
const gradientStyle = 'bg-gradient-to-br from-blue-600 to-purple-600 gradient font-extrabold tracking-tighter pr-2 pb-2 text-transparent bg-clip-text'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center">
            <h1 className={`text-6xl font-bold mb-4 ${gradientStyle}`}>404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
                Oops! The page you&apos;re looking for doesn&apos;t exist or has been
                moved.
            </p>
            <Link href="/">
                <Button>Return Home</Button>
            </Link>
        </div>
    );
}