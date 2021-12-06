import React from "react";

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {any} items
 * @property {() => void} fetchMore
 */

/** @type {React.VFC<Props>} */
const InfiniteScroll = ({ children, fetchMore, items }) => {
    const latestItem = items[items.length - 1];

    const prevReachedRef = React.useRef(false);

    React.useEffect(() => {
        const handler = debounce(
            () => {
                const hasReached = window.innerHeight + Math.ceil(window.scrollY) >= document.body.offsetHeight;
                // 画面最下部にスクロールしたタイミングで、登録したハンドラを呼び出す
                if (hasReached && !prevReachedRef.current) {
                    // アイテムがないときは追加で読み込まない
                    if (latestItem !== undefined) {
                        fetchMore();
                    }
                }

                prevReachedRef.current = hasReached;
            },
            300,
            true
        );

        // 最初は実行されないので手動で呼び出す
        prevReachedRef.current = false;
        handler();

        document.addEventListener("wheel", handler, { passive: false });
        document.addEventListener("touchmove", handler, { passive: false });
        document.addEventListener("resize", handler, { passive: false });
        document.addEventListener("scroll", handler, { passive: false });
        return () => {
            document.removeEventListener("wheel", handler);
            document.removeEventListener("touchmove", handler);
            document.removeEventListener("resize", handler);
            document.removeEventListener("scroll", handler);
        };
    }, [latestItem, fetchMore]);

    return <>{children}</>;
};

export { InfiniteScroll };
