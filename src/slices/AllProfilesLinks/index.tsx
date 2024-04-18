import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

export type AllProfilesLinksProps = SliceComponentProps<Content.AllProfilesLinksSlice>;

const AllProfilesLinks = ({ slice }: AllProfilesLinksProps): JSX.Element => {
    const allLinks = {
        "github": <FaGithub className="mr-2" />,
        "leetcode": <SiLeetcode className="mr-2" />,
    }
    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="flex flex-wrap gap-2">
                {slice.items.map((item, index) => (
                    <Button
                        key={index}
                        linkField={item.link}
                        label={allLinks[item.key as keyof typeof allLinks]}
                    />
                ))}
            </div>
        </Bounded>
    );
};

export default AllProfilesLinks;
