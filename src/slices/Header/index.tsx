import Heading from "@/components/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type HeaderProps = SliceComponentProps<Content.HeaderSlice>;

const Header = ({ slice }: HeaderProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="px-4 pt-10 md:px-6 md:pt-14 lg:pt-16 -mb-5 md:-mb-10 "
        >
            <div className="mx-auto w-full max-w-7xl">
                <Heading size="md" className="mb-4" as="h3">
                    {slice.primary.heading}
                </Heading>
                {isFilled.richText(slice.primary.description) && (
                    <PrismicRichText field={slice.primary.description} />
                )}
            </div>
        </section>
    );
};

export default Header;
