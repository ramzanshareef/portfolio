import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ContentList from "./ContentList";
import { createClient } from "@/prismicio";

export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

const ContentIndex = async ({ slice }: ContentIndexProps): Promise<JSX.Element> => {
    const client = createClient();
    const blogPosts = await client.getAllByType("blog_post");
    const projects = await client.getAllByType("project_post");

    const contentType = slice.primary.content_type || "Blog";
    const items = contentType === "Blog" ? blogPosts : projects;

    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Heading size="md" className="mb-4" as="h3">
                {slice.primary.heading}
            </Heading>
            {isFilled.richText(slice.primary.description) && (
                <PrismicRichText field={slice.primary.description} />
            )}
            <ContentList
                items={items}
                contentType={contentType}
                viewMoreText={slice.primary.view_more_text}
                fallbackItemImage={slice.primary.fallback_item_image}
            />
        </Bounded>
    );
};

export default ContentIndex;
