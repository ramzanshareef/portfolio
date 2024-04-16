import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ThoughtList from "./ThoughtsList";

export type ThoughtsBlockProps = SliceComponentProps<Content.ThoughtsBlockSlice>;

const ThoughtsBlock = ({ slice }: ThoughtsBlockProps): JSX.Element => {
    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <ThoughtList
                thoughts={slice.items}
            />
        </Bounded>
    );
};

export default ThoughtsBlock;
