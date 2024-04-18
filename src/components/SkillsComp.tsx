"use client";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Image from "next/image";
import Link from "next/link";

type SkillCompProps = {
    skills?: Content.TechListSliceDefaultItem[];
}

const SkillsComp = ({
    skills,
}: SkillCompProps) => {
    return (
        <div className="group">
            <div className="flex m-auto text-slate-900 bg-slate-900 overflow-hidden group-hover:overflow-x-scroll space-x-[18rem] min-w-full hide-scroll-bar">
                <div
                    className="flex py-6 hide-scroll-bar min-w-full animate-loop-scroll group-hover:paused"
                >
                    <div
                        className="flex flex-nowrap gap-4"
                    >
                        {skills?.map((skill, index) => (
                            <Link key={index} className="flex flex-col gap-2  min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 transition-transform ease-linear hover:scale-95 hover:cursor-pointer p-1 md:p-2"
                                href={skill.skill_link ? skill.skill_link : "#"}
                                target="_blank"
                            >
                                <PrismicNextImage field={skill.skill_image}
                                    alt=""
                                    className="w-12 h-12 md:w-16 md:h-16"
                                />
                                <span className="text-center font-semibold">
                                    {skill.skill_name}
                                </span>

                            </Link>
                        ))}
                    </div>
                </div>
                <div
                    className="hidden lg:flex lg:py-6 lg:hide-scroll-bar lg:min-w-full lg:animate-loop-scroll lg:group-hover:paused"
                >
                    <div
                        className="flex flex-nowrap gap-4"
                    >
                        {skills?.map((skill, index) => (
                            <PrismicNextLink key={index} className="flex flex-col gap-2  min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 transition-transform ease-linear hover:scale-95 hover:cursor-pointer p-1 md:p-2"
                                href={skill.skill_link ? skill.skill_link : "#"}
                                target="_blank"
                            >
                                <PrismicNextImage field={skill.skill_image}
                                    className="w-12 h-12 md:w-16 md:h-16"
                                    alt=""
                                />
                                <span className="text-center font-semibold">
                                    {skill.skill_name}
                                </span>
                            </PrismicNextLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsComp;