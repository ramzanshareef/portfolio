import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/slices/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend:{
            animation: {
                "loop-scroll": "loop-scroll 40s linear infinite"
            },
            keyframes:{
                "loop-scroll": {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-100%)" }
                }
            }
        }
    },
    plugins: [
        require("@tailwindcss/typography")
    ],
};
export default config;
