import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ExpList from "./ExpList";
import Heading from "@/components/Heading";

export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

const Experience = ({ slice }: ExperienceProps): JSX.Element => {
    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Heading as="h2" size="md">
                {slice.primary.title}
            </Heading>
            <ExpList
                expList={slice.items}
            />
        </Bounded>
    );
};

export default Experience;
