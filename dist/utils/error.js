"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorFunction = void 0;
const errorFunction = (errorBit, msg, data) => {
    if (errorBit)
        return { is_error: errorBit, message: msg };
    else
        return { is_error: errorBit, message: msg, data };
};
exports.errorFunction = errorFunction;
