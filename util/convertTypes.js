import getRandomInt from "./getRandomInt"

function rollDice(dice) {
    const { num, size } = dice
    let sum = 0
    for (let x = 0; x < num; x++) {
        sum += getRandomInt(1, size + 1)
    }
    return sum
}

export default function convertTypes(c) {
    const pattern = /^(\d+)(d(\d+))?(\s*\+\s*(\d+))?/
    let result = c.match(pattern)
    let sum = 0

    if (result) { // Only convert if there is a match. Give 0 if there isnt
        if (result[1] && !result[2]) sum += parseInt(result[1], 10)
        if (result[1] && result[3]) sum += rollDice({num: parseInt(result[1], 10), size:parseInt(result[3], 10)})
        if (result[5]) sum += parseInt(result[5], 10)
        return sum.toString()
    }

    return ''
}