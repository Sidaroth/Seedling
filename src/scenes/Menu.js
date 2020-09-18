import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import spriteConfig from 'configs/spriteConfig';
import createButton from 'entities/createButton';

const MenuScene = function MenuSceneFunc() {
    const state = {};
    let titleText;
    let startGame;
    let credits;
    let menuBackground;

    // hook into phasers scene lifecycle.
    function create() {
        console.log('Hei på deg');
        if (!menuBackground) {
            menuBackground = state.addImage(
                gameConfig.GAME.VIEWWIDTH / 2,
                gameConfig.GAME.VIEWHEIGHT / 2,
                spriteConfig.MENU_BACKGROUND.KEY,
            );
        }
        if (!titleText) {
            titleText = state.addText(gameConfig.GAME.VIEWWIDTH / 2, 20, 'OpenJam 2020', gameConfig.TEXT_STYLES.TITLE_TEXT);
            titleText.x -= titleText.width / 2;
        }
        if (!startGame) {
            startGame = createButton(state.scene, {
                size: gameConfig.BUTTON.DEFAULT_SIZE,
                position: { x: gameConfig.GAME.VIEWWIDTH / 2, y: gameConfig.GAME.VIEWHEIGHT / 2 },
                text: 'Start game',
            });
        }
        if (!credits) {
            credits = createButton(state.scene, {
                size: gameConfig.BUTTON.DEFAULT_SIZE,
                position: { x: gameConfig.GAME.VIEWWIDTH / 2, y: gameConfig.GAME.VIEWHEIGHT / 2 + 150 },
                text: 'Credits',
            });
        }
    }

    const localState = {
        // methods
        create,
    };

    return createState('Menu', state, {
        localState,
        isScene: isScene(state, gameConfig.SCENES.MENU),
    });
};

export default MenuScene;
