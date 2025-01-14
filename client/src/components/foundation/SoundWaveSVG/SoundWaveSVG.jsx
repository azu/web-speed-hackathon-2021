import _ from "lodash";
import React from "react";

/**
 * @param {ArrayBuffer} data
 * @returns {Promise<{ max: number, peaks: number[] }}
 */
async function calculate(data) {
    const audioCtx = new AudioContext();
    // console.time('calculate');
    // 音声をデコードする
    /** @type {AudioBuffer} */
    const buffer = await new Promise((resolve, reject) => {
        audioCtx.decodeAudioData(data.slice(0), resolve, reject);
    });
    // console.timeLog("calculate", "buffer")
    // 左の音声データの絶対値を取る
    const leftData = _.map(buffer.getChannelData(0), Math.abs);
    // console.timeLog("calculate", "leftData")
    // 右の音声データの絶対値を取る
    const rightData = _.map(buffer.getChannelData(1), Math.abs);

    // console.timeLog("calculate", "rightData")
    // 左右の音声データの平均を取る
    const normalized = leftData.map((l, i) => {
        return (l + rightData[i]) / 2;
    });
    // console.timeLog("calculate", "normalize")
    // 100 個の chunk に分ける
    const chunks = _.chunk(normalized, Math.ceil(normalized.length / 100));
    // console.timeLog("calculate", "chunks")
    // chunk ごとに平均を取る
    const peaks = _.map(chunks, _.mean);
    // console.timeLog("calculate", "peak")
    // chunk の平均の中から最大値を取る
    const max = _.max(peaks);
    // console.timeLog("calculate", "max")
    // console.timeEnd("calculate")

    return { max, peaks };
}

/**
 * @typedef {object} Props
 * @property {ArrayBuffer} soundData
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = ({ soundData }) => {
    const uniqueIdRef = React.useRef(Math.random().toString(16));
    const [data, setPeaks] = React.useState({ max: 0, peaks: [] });

    React.useEffect(() => {
        if (data.peaks.length > 0) {
            return;
        }
        calculate(soundData).then(({ max, peaks }) => {
            setPeaks({ max, peaks });
        });
    }, [soundData]);

    return (
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1">
            {data.peaks.map((peak, idx) => {
                const ratio = peak / data.max;
                return (
                    <rect
                        key={`${uniqueIdRef.current}#${idx}`}
                        fill="#2563EB"
                        height={ratio}
                        width="1"
                        x={idx}
                        y={1 - ratio}
                    />
                );
            })}
        </svg>
    );
};

export { SoundWaveSVG };
