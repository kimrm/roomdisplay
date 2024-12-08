import { motion } from "motion/react";

export default function Progressbar({
    pages,
    currentPage,
}: {
    pages: number[];
    currentPage: number;
}) {
    return (
        <div
            id="progress"
            className="flex w-2/3 items-center justify-center gap-10 place-self-center"
        >
            {pages.map((_, index) => (
                <div
                    key={index}
                    className="relative mt-4 h-[4px] w-full overflow-hidden rounded-md bg-green-950"
                >
                    <motion.div
                        className="absolute left-0 top-0 h-full w-full bg-green-400"
                        initial={{ width: 0 }}
                        animate={{
                            width: index === currentPage ? "100%" : 0,
                        }}
                        transition={
                            index === currentPage
                                ? {
                                      duration: 20,
                                      ease: "linear",
                                  }
                                : { duration: 0 }
                        }
                    />
                </div>
            ))}
        </div>
    );
}
