"use client";

import React, { useRef, useState, useEffect } from "react";
import { asImageSrc, isFilled } from "@prismicio/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import { Content } from "@prismicio/client";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

type ContentListProps = {
    items: Content.ProjectPostDocument[];
    contentType: Content.ContentIndexSlice["primary"]["content_type"];
    viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
    fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
}

export default function ContentList({
    items,
    contentType,
    fallbackItemImage,
    viewMoreText = "Read More",
}: ContentListProps) {
    const component = useRef(null);
    const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

    const revealRef = useRef(null);
    const [currentItem, setCurrentItem] = useState<null | number>(null);
    const [hovering, setHovering] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const urlPrefix = "/projects";

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
                if (currentItem !== null) {
                    const maxY = window.scrollY + window.innerHeight - 350;
                    const maxX = window.innerWidth - 250;

                    gsap.to(revealRef.current, {
                        x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
                        y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
                        rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
                        ease: "back.out(2)",
                        duration: 1.3,
                    });
                    gsap.to(revealRef.current, {
                        opacity: hovering ? 1 : 0,
                        visibility: "visible",
                        ease: "power3.out",
                        duration: 0.4,
                    });
                }
                lastMousePos.current = mousePos;
                return () => ctx.revert();
            }, component);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [hovering, currentItem]);

    const onMouseEnter = (index: number) => {
        setCurrentItem(index);
        if (!hovering) setHovering(true);
    };

    const onMouseLeave = () => {
        setHovering(false);
        setCurrentItem(null);
    };

    const contentImages = items.map((item) => {
        const image = isFilled.image(item.data.hover_image)
            ? item.data.hover_image
            : fallbackItemImage;
        return asImageSrc(image);
    });

    // Preload images
    useEffect(() => {
        contentImages.forEach((url) => {
            if (!url) return;
            const img = new Image();
            img.src = url;
        });
    }, [contentImages]);

    const router = useRouter();

    return (
        <>
            <ul
                ref={component}
                className="grid border-b border-b-slate-100 mt-6"
                onMouseLeave={onMouseLeave}
            >
                {items.map((post, index) => (
                    <li
                        key={index}
                        ref={(el: any) => (itemsRef.current[index] = el)}
                        onMouseEnter={() => onMouseEnter(index)}
                        className="list-item opacity-0"
                    >
                        <div
                            onClick={() => router.push(`${urlPrefix}/${post.uid}`)}
                            className="flex flex-col gap-y-1 sm:gap-y-0 md:flex-row md:justify-between md:items-center border-t border-t-slate-100 py-10 text-slate-200 cursor-pointer"
                            aria-label={post.data.title || ""}
                        >
                            <div className="flex flex-col gap-y-1">
                                <span className="text-3xl font-bold">{post.data.title}</span>
                                <div className="flex gap-3">
                                    {post.tags.map((tag, index) => (
                                        <span key={index} className="font-semibold bg-indigo-600 px-1.5 py-1 text-base rounded-lg cursor-context-menu">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <Link
                                href={`${urlPrefix}/${post.uid}`}
                                className={clsx(
                                    "group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4 py-2 font-bold transition-transform ease-out  hover:scale-105 text-slate-900 hover:text-white"
                                )}
                            >
                                <span
                                    className={clsx(
                                        "absolute inset-0 z-0 h-full w-full translate-y-9 bg-indigo-600 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
                                    )}
                                />
                                <span className="relative flex items-center justify-center gap-2">
                                    {viewMoreText}
                                    <MdArrowOutward className="inline-block" />
                                </span>
                            </Link>
                        </div>
                    </li>
                ))}
                <div
                    className={clsx(
                        "hover-reveal pointer-events-none absolute left-0 top-0 -z-40 h-[20rem] w-[32.5rem] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300",
                        "hidden sm:block"
                    )}
                    style={{
                        backgroundImage:
                            currentItem !== null ? `url(${contentImages[currentItem]})` : "",
                    }}
                    ref={revealRef}
                ></div>

            </ul>
        </>
    );
}