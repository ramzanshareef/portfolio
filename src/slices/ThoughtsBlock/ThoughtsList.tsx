"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { formatDateForExperience } from "@/utils/formatDate";

gsap.registerPlugin(ScrollTrigger);

type ThoughtListProps = {
    thoughts: Content.ThoughtsBlockSlice["items"];
}

export default function ThoughtList({
    thoughts,
}: ThoughtListProps) {
    const component = useRef(null);
    const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

    const [hovering, setHovering] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let ctx = gsap.context(() => {
            itemsRef.current.forEach((item, index) => {
                gsap.fromTo(
                    item,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.3,
                        ease: "elastic.out(1,0.3)",
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom-=100px",
                            end: "bottom center",
                            toggleActions: "play none none none",
                        },
                    },
                );
            });

            return () => ctx.revert();
        }, component);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
            const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

            let ctx = gsap.context(() => {
                lastMousePos.current = mousePos;
                return () => ctx.revert();
            }, component);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [hovering]);

    const onMouseEnter = (index: number) => {
        if (!hovering) setHovering(true);
    };

    const onMouseLeave = () => {
        setHovering(false);
    };

    return (
        <>
            <ul
                ref={component}
                className="grid border-b border-b-slate-100"
                onMouseLeave={onMouseLeave}
            >
                {thoughts
                    .sort((a, b) => {
                        const dateA = a.date_created ? new Date(a.date_created).getTime() : 0;
                        const dateB = b.date_created ? new Date(b.date_created).getTime() : 0;
                        return dateB - dateA;
                    })
                    .map((thoughtItem, index) => (
                    <li
                        key={index}
                        ref={(el: any) => (itemsRef.current[index] = el)}
                        onMouseEnter={() => onMouseEnter(index)}
                        className="list-item opacity-0 overflow-hidden"
                    >
                        <div
                            className="flex flex-col justify-between border-t border-t-slate-100 py-10  text-slate-200 md:flex-row md:items-center max-sm:gap-y-2"
                            aria-label={thoughtItem.thought.toString()}
                        >
                            <span key={index} className="prose prose-invert prose-base max-md:min-w-full max-w-[80%] leading-3">
                                <PrismicRichText
                                    field={thoughtItem.thought}
                                />
                            </span>
                            <span className="text-base font-semibold italic text-right">
                                {formatDateForExperience(thoughtItem.date_created)}
                            </span>
                        </div>
                    </li>
                ))}
            </ul >
        </>
    );
}