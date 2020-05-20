import { useState } from "react";


export const UNCHANGED = 'UNCHANGED'
export const ABOUT_TO_CHANGE = 'ABOUT_TO_CHANGE'
export const JUST_CHANGED = 'JUST_CHANGED'

// export default function useChangeHandler(prop, delay) {
//     const[[state, val], setState] = useState([UNCHANGED, null])
//     if (val !== prop) {
//         setTimeout(() => setState([JUST_CHANGED, prop]), delay)
//         return [ABOUT_TO_CHANGE, val]
//     }
//     if (state !== UNCHANGED) {
//         setTimeout(() => setState([UNCHANGED, prop]), delay)
//         return [state, prop]
//     }
//     return [UNCHANGED, prop]
// }
export default function useChangeHandler(prop, delay) {
const [[inFlight, status, val], setState] = useState([
    false,
    UNCHANGED,
    null
]);
// A change is already in flight, return the current status
if (inFlight) {
    return [status, val];
}
// We just faded out, update our prop, even if we skipped a value that is okay
if (status === JUST_CHANGED) {
    setState([true, status, prop]);
    setTimeout(() => setState([false, UNCHANGED, prop]), delay);
    return [status, prop];
}
// A change has occured, give warning
if (val !== prop) {
    setState([true, ABOUT_TO_CHANGE, val]);
    setTimeout(() => setState([false, JUST_CHANGED, prop]), delay);
    return [status, val];
}
// Otherwise just return the status quo
return [status, val];
};