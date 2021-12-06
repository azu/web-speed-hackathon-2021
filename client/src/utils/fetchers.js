import { gzip } from "pako";

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
    return fetch(url).then((res) => res.arrayBuffer());
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
    const result = await $.ajax({
        async: true,
        dataType: "json",
        method: "GET",
        url
    });
    return result;
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
    const result = await $.ajax({
        async: true,
        data: file,
        dataType: "json",
        headers: {
            "Content-Type": "application/octet-stream"
        },
        method: "POST",
        processData: false,
        url
    });
    return result;
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
    const jsonString = JSON.stringify(data);
    const uint8Array = new TextEncoder().encode(jsonString);
    const compressed = gzip(uint8Array);

    const result = await $.ajax({
        async: true,
        data: compressed,
        dataType: "json",
        headers: {
            "Content-Encoding": "gzip",
            "Content-Type": "application/json"
        },
        method: "POST",
        processData: false,
        url
    });
    return result;
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
