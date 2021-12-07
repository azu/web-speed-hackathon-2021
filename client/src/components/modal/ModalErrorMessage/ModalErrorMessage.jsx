import classNames from "classnames";
import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

/**
 * @typedef {object} Props
 * @property {string | null} children
 */

/** @type {React.VFC<Props>} */
const ModalErrorMessage = ({ children }) => {
    return (
        <span className={classNames("block h-6 text-red-600", { invisible: !children })}>
            <span className="mr-1">
                <FontAwesomeIcon className="font-awesome inline-block leading-none fill-current"
                                 icon={faExclamationCircle}/>
            </span>
            {children}
        </span>
    );
};

export { ModalErrorMessage };
