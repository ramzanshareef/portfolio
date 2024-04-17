import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type ButtonSliceProps = SliceComponentProps<Content.ButtonSliceSlice>;

const ButtonSlice = ({ slice }: ButtonSliceProps): JSX.Element => {
    return (
        <Button linkField={slice.primary.button_link} label={slice.primary.button_text} />
    );
};

export default ButtonSlice;
