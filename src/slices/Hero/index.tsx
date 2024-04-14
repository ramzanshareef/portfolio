"use client";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import Shapes from "./Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
    const component = useRef(null);
    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(".name-animation", {
                x: -100, 
                opacity: 0, 
                rotate: -10
            }, {
                x: 0, 
                opacity: 1, 
                rotate: 0, 
                stagger: {
                    amount: 0.5,
                    from: "random"  
                }, 
                duration: 1,
                ease: "elastic.out",
                delay: 0.5
            })
            .fromTo(".tagline-title", {
                opacity: 0, 
                scale: 0.5
            },{
                opacity: 1, 
                scale: 1, 
                duration: 1.5, 
                ease: "elastic.out"
            })

        }, component);
        return () => ctx.revert();
    }, []);


    const renderLetters = (name: KeyTextField, key: string) => {
        if (!name) return;
        return name.split("").map((letter, index) => (
            <span key={index} className={` name-animation name-animation-${key} inline-block opacity-0 `}>
                {letter}
            </span>
        ));
    }

    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            ref={component}
        >
            <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
                <Shapes />
                <div className="col-start-1 md:row-start-1">
                    <span className="text-4xl animate-pulse opacity-80 text-indigo-500">Hey 👋 I am</span>
                    <h1 className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter" aria-label={slice.primary.first_name + " " + slice.primary.last_name}>
                        <span className="block text-slate-300">
                            {renderLetters(slice.primary.first_name, "first")}
                        </span>
                        <span className="-mt-[.2em] blocl text-slate-500">
                            {renderLetters(slice.primary.last_name, "last")}
                        </span>
                        <span className="tagline-title block bg-gradient-to-tr from-indigo-500 via-indigo-200 to-indigo-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">{slice.primary.tag_line}</span>
                    </h1>
                </div>
            </div>
        </Bounded>
    );
};

export default Hero;
