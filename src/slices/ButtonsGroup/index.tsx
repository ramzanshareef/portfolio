import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type ButtonsGroupProps = SliceComponentProps<Content.ButtonsGroupSlice>;

const ButtonsGroup = ({ slice }: ButtonsGroupProps): JSX.Element => {
    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="flex flex-wrap gap-2">
                {slice.items.map((item, index) => (
                    <Button key={index} linkField={item.button_link} label={item.button_text} />
                ))}
            </div>
        </Bounded>
    );
};

export default ButtonsGroup;
