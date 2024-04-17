import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
    return (
        <div className="">
            <PrismicRichText field={slice.primary.content} />
        </div>
    );
};

export default TextBlock;
