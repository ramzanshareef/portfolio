import { SliceZone } from "@prismicio/react";
import { Content } from "@prismicio/client";

import { components } from "@/slices";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import Button from "./Button";
import { FaGithub } from "react-icons/fa6";
import { GrDeploy } from "react-icons/gr";

export default function ContentBody({
    page,
}: {
    page: Content.ProjectPostDocument;
}) {
    return (
        <Bounded as="article">
            <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
                <Heading
                    as="h1"
                    size="lg"
                    className="text-center text-white mb-4 md:mb-8"
                >
                    {page.data.title}
                </Heading>
                <div className="flex gap-4">
                    {page.tags.map((tag, index) => (
                        <span key={index} className="font-semibold bg-indigo-600 px-1.5 py-1 text-base rounded-lg cursor-context-menu">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-3 mt-8 pb-2 border-b border-slate-600 text-xl font-medium text-slate-300">
                    {page.data.github_link && <Button
                        label={
                            <div
                                className="flex items-center gap-2 text-xs md:text-base"
                            >
                                {page.data.github_label}
                                <FaGithub
                                    className="inline-block mr-2"
                                />
                            </div>
                        }
                        showIcon={false}
                        linkField={page.data.github_link}
                    />}
                    {(page.data.deploy_link) && <Button
                        label={
                            <div
                                className="flex items-center gap-2 text-xs md:text-base"
                            >
                                {page.data.deploy_label?.toString() || "Not yet deployed!"}
                                {page.data.deploy_label?.toString() && <GrDeploy
                                    className="inline-block mr-2"
                                />}
                            </div>
                        }
                        showIcon={false}
                        linkField={page.data.deploy_link}
                    />}
                </div>
                <div className="prose prose-base md:prose-lg prose-invert w-full max-w-none overflow-scroll hide-scroll-bar">
                    <SliceZone slices={page.data.slices} components={components} />
                </div>
            </div>
        </Bounded>
    );
}