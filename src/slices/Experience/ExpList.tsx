"use client";

import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

type ExpListProps = {
    expList: Content.ExperienceSlice["items"];
}

const ExpList = ({
    expList,
}: ExpListProps) => {
    const listRef = useRef<HTMLUListElement>(null);
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (listRef.current) {
            Array.from(listRef.current.children).forEach((child, index) => {
                gsap.fromTo(
                    child,
                    {
                        opacity: 0,
                        y: 50,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: child,
                            start: "top 80%",
                            end: "bottom 20%",
                            scrub: true,
                        },
                    },
                );
            });

        }
    }, []);
    return (
        <>
            <ul
                className="border-s border-neutral-300 dark:border-neutral-500 mt-2 md:mt-4"
                ref={listRef}
            >
                {expList.map((item, index) => (
                    <li key={index}>
                        <div className="flex-start flex items-center pt-3">
                            <div className="-ms-[5px] me-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500"></div>
                            <h3 className="text-base font-semibold">
                                {item.date}
                            </h3>
                        </div>
                        <div className="mb-6 ms-4 mt-2">
                            <h4 className="mb-1.5 text-xl font-bold">
                                {item.title}
                            </h4>
                            <PrismicRichText
                                field={item.content}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ExpList