import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <PrismicNextImage
                field={slice.primary.image}
                imgixParams={{ w: 600 }}
            />
        </section>
    );
};

export default ImageBlock;
