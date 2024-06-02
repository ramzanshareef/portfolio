import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import CreationsList from "./CreationsList";

/**
 * Props for `CreationsBlock`.
 */
export type CreationsBlockProps =
    SliceComponentProps<Content.CreationsBlockSlice>;

/**
 * Component for "CreationsBlock" Slices.
 */
const CreationsBlock = ({ slice }: CreationsBlockProps): JSX.Element => {
    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <CreationsList
                creations={slice.items}
                LYKET_API_KEY={process.env.LYKET_API_KEY as string}
            />
        </Bounded>
    );
};

export default CreationsBlock;