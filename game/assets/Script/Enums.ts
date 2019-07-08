export enum GameState {
    STOP,
    PLAY,
    PAUSE
}

export enum MatchState {
    FAIL,
    PERFECT
}

export enum ModelType {
    RECT,
    SPHERE
}

export const randomY = {
    0: {
        min: -320,
        max: 420
    },

    1: {
        min: -420,
        max: 320
    },

    2: {
        min: -640,
        max: 100
    },

    3: {
        min: -100,
        max: 640
    }
}