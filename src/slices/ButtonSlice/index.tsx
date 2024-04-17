import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type ButtonSliceProps = SliceComponentProps<Content.ButtonSliceSlice>;

const ButtonSlice = ({ slice }: ButtonSliceProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="px-4 md:px-6"
        >
            <div className="mx-auto w-full max-w-7xl">
                <Heading as="h2" size="sm" key={slice.id}>
                    View My Lateset Blogs
                </Heading>
                <Button linkField={slice.primary.button_link} label={slice.primary.button_text} />
            </div>
        </section>
    );
};

export default ButtonSlice;
