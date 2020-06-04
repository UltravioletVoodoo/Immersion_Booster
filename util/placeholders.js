export const blankState = {
    imageLabel: '',
    imageUrl: '',
    isCombat: false,
    combat: {
        turn: 0,
        combatants: []
    }
}

export const blankCampaign = {
    name: '',
    players: [],
    encounters: [],
    notes: ''
}


export const blankEncounter = {
    imageLabel: '',
    imageUrl: '',
    combatants: []
}

export const blankCombatant = {
    name: '',
    playerName:  '',
    isAlive: true
}

export const showdownOptions = {
    strikethrough: true,
    tables: true,
    simpleLineBreaks: true,
    requireSpaceBeforeHeadingText: true,
    openLinksInNewWindow: true
}

export const blankHistory = {
    consoleHistory: [],
    commandHistory: []
}