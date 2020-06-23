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
    type: '',
    playerName:  '',
    health: '',
    initiative: '',
    status: []
}

export const showdownOptions = {
    strikethrough: true,
    tables: true,
    simpleLineBreaks: true,
    requireSpaceBeforeHeadingText: true,
    openLinksInNewWindow: true
}

export const statusEffect = {
    name: '',
    icon: '',
    duration: -1
}