import Avatar from "@/components/Avatar";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type BiographyDataProps = SliceComponentProps<Content.BiographyDataSlice>;

const BiographyData = ({ slice }: BiographyDataProps): JSX.Element => {
    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
                <Heading as="h2" size="lg" className="col-start-1">
                    {slice.primary.heading}
                </Heading>
                <div className="prose prose-xl prose-slate prose-invert col-start-1">
                    <PrismicRichText field={slice.primary.description} />
                </div>
                <div 
                    className="flex flex-wrap gap-4 col-start-1 md:col-span-2"
                >
                    {slice.items.map((item, index) => (
                        <Button key={index} linkField={item.button_link} label={item.button_text} />
                    ))}
                </div>
                <Avatar
                    image={slice.primary.avatar}
                    className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
                />
            </div>
        </Bounded >
    );
};

export default BiographyData;
