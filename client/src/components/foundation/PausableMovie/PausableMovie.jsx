import classNames from "classnames";
import { Animator, Decoder } from "gifler";
import { GifReader } from "omggif";
import React, { useMemo, useRef } from "react";

import { useFetch } from "../../../hooks/use_fetch";
import { fetchBinary } from "../../../utils/fetchers";
import { AspectRatioBox } from "../AspectRatioBox";
import { FontAwesomeIcon } from "../FontAwesomeIcon";

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。
 * @type {React.VFC<Props>}
 */
const PausableMovie = ({ src }) => {
    /**
     * @type {React.MutableRefObject<HTMLVideoElement>}
     */
    const animatorRef = useRef();
    const autoplay = useMemo(() => {
        // `prefers-reduced-motion: reduce` が有効のとき、動画を自動再生しないようにしました
        return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);
    const [isPlaying, setIsPlaying] = React.useState(autoplay);
    const handleClick = React.useCallback(() => {
        setIsPlaying((isPlaying) => {
            if (isPlaying) {
                animatorRef.current?.pause();
            } else {
                animatorRef.current?.play();
            }
            return !isPlaying;
        });
    }, []);

    return (
        <AspectRatioBox aspectHeight={1} aspectWidth={1}>
            <button className="group relative block w-full h-full" onClick={handleClick} type="button">
                <video
                    ref={animatorRef}
                    muted={true}
                    controls={false}
                    autoPlay={autoplay}
                    playsInline={true}
                    preload={"auto"}
                    src={src}
                    loop={true}
                    className="w-full"
                    height={1080}
                />
                <div
                    className={classNames(
                        "absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2",
                        {
                            "opacity-0 group-hover:opacity-100": isPlaying
                        }
                    )}
                >
                    <FontAwesomeIcon iconType={isPlaying ? "pause" : "play"} styleType="solid" />
                </div>
            </button>
        </AspectRatioBox>
    );
};

export { PausableMovie };
