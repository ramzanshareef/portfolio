"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { formatDateForExperience } from "@/utils/formatDate";
import { PrismicNextImage } from "@prismicio/next";

gsap.registerPlugin(ScrollTrigger);

type CreationsListProps = {
    creations: Content.CreationsBlockSlice["items"];
}

export default function CreationsList({
    creations,
}: CreationsListProps) {
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
                className="grid grid-cols-1 gap-y-8 md:gap-y-12"
                onMouseLeave={onMouseLeave}
            >
                {creations
                    .sort((a, b) => {
                        const dateA = a.date_created ? new Date(a.date_created).getTime() : 0;
                        const dateB = b.date_created ? new Date(b.date_created).getTime() : 0;
                        return dateB - dateA;
                    })
                    .map((creationItem, index) => (
                        <li
                            key={index}
                            ref={(el: any) => (itemsRef.current[index] = el)}
                            onMouseEnter={() => onMouseEnter(index)}
                            className="list-item opacity-0 overflow-hidden"
                        >
                            {
                                creationItem.content_type === "text" ? (
                                    <div
                                        className="flex flex-col justify-between border-t border-t-slate-100 pt-10 gap-y-2"
                                        aria-label={creationItem.text.toString()}
                                    >
                                        <span key={index} className="prose prose-invert prose-base max-md:min-w-full max-w-[80%] whitespace-break-spaces">
                                            <PrismicRichText
                                                field={creationItem.text}
                                            />
                                        </span>
                                        <span className="text-sm sm:text-[0.9rem] italic text-right pr-3">
                                            {formatDateForExperience(creationItem.date_created)}
                                        </span>
                                    </div>
                                ) : <></>
                            }
                            {
                                creationItem.content_type === "image" ? (
                                    <div
                                        className="flex flex-col justify-between border-t border-t-slate-100 pt-10 gap-y-2"
                                    >
                                        <div
                                            className="flex flex-col items-center gap-y-4 md:w-4/5 mx-auto"
                                        >
                                            <PrismicNextImage
                                                field={creationItem.image}
                                                width={400}
                                                className="mx-auto md:mx-0 md:mr-4 md:w-1/3 md:max-w-[300px] md:min-w-[300px] md:h-auto md:max-h-[300px] md:min-h-[300px] rounded"
                                            />
                                            <span key={index} className="prose prose-invert prose-lg max-md:min-w-full max-w-[80%] leading-3 text-center">
                                                <PrismicRichText
                                                    field={creationItem.text}
                                                />
                                            </span>
                                        </div>
                                        <span className="text-sm sm:text-[0.9rem] italic text-right">
                                            {formatDateForExperience(creationItem.date_created)}
                                        </span>
                                    </div>
                                ) : <></>
                            }
                            {
                                creationItem.content_type === "video" ? (
                                    <div
                                        className="flex flex-col justify-between border-t border-t-slate-100 pt-10 gap-y-2"
                                    >
                                        <div
                                            className="flex flex-col items-center gap-y-4 md:w-4/5 mx-auto"
                                        >
                                            <video src={creationItem.video_link?.toString()}
                                                controls
                                                className="rounded w-full md:w-4/5"
                                            />
                                            <span key={index} className="prose prose-invert prose-lg max-md:min-w-full max-w-[80%] leading-3 text-center">
                                                <PrismicRichText
                                                    field={creationItem.text}
                                                />
                                            </span>
                                        </div>
                                        <span className="text-sm sm:text-[0.9rem] italic text-right">
                                            {formatDateForExperience(creationItem.date_created)}
                                        </span>
                                    </div>
                                ) : <></>
                            }
                        </li>
                    ))}
            </ul >
        </>
    );
}