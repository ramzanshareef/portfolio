"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import SubscribeModal from "@/components/modals/SubscribeModal";
import { FaLongArrowAltRight } from "react-icons/fa";

const SubscribeButton = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <button
                className="mt-4 group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4 py-2 font-bold transition-transform ease-out  hover:scale-105 text-slate-900 hover:text-white"
                onClick={() => {
                    setIsModalOpen(true);
                }}

            >
                <span
                    className={clsx(
                        "absolute inset-0 z-0 h-full w-full translate-y-9 bg-indigo-600 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
                    )}
                />
                <span className="relative flex items-center justify-center gap-2">
                    Subscribe  <FaLongArrowAltRight className="text-lg" />
                </span>
            </button>

            <SubscribeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                hideOnClose={false}
            />
        </>
    )
}

export default SubscribeButton