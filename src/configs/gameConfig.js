export default {
    GAME: {
        VIEWHEIGHT: 1080,
        VIEWWIDTH: 1920,
        TITLE: 'OpenJam 2020',
    },
    SCENES: {
        BOOT: 'game_boot',
        LOAD: 'game_load',
        GAME: 'game_game',
        MENU: 'game_menu',
        CREDITS: 'game_credits',
        UI: 'UI',
    },
    TEXT_STYLES: {
        DEFAULT: {
            font: 'Roboto',
            fontSize: 20,
            fill: '#ffffff',
            smoothed: false,
        },
        TITLE_TEXT: {
            font: '72px Arial',
            fill: '#eeeeee',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4,
        },
        BUTTON_TEXT: {
            font: '64px Arial',
            fill: '#eeeeee',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4,
        },
    },
    BUTTON: {
        DEFAULT_SIZE: {
            w: 350,
            h: 100,
        }
    },
    UI_DEFAULT: {
        tint: 0xaaaaaa,
    },
    AUDIO: {
        musicKeys: ['bgScore'],
        sfxKeys: ['coinSfx'],
    },
    KEYS: {
        LEFT_ARROW: {
            CODE: 37,
            KEY: '',
        },
        UP_ARROW: {
            CODE: 38,
            KEY: '',
        },
        RIGHT_ARROW: {
            CODE: 39,
            KEY: '',
        },
        DOWN_ARROW: {
            CODE: 40,
            KEY: '',
        },
        Z: {
            CODE: 90,
            KEY: 'Z',
        },
        X: {
            CODE: 88,
            KEY: 'X',
        },
        COMMA: {
            CODE: 188,
            KEY: ',',
        },
        DOT: {
            CODE: 190,
            KEY: '.',
        },
        A: {
            CODE: 65,
            KEY: 'A',
        },
        S: {
            CODE: 83,
            KEY: 'S',
        },
        K: {
            CODE: 75,
            KEY: 'K',
        },
        L: {
            CODE: 76,
            KEY: 'L',
        },
        ENTER: {
            CODE: 13,
            KEY: '',
        },
        ESCAPE: {
            CODE: 27,
            KEY: '',
        },
    },
};
