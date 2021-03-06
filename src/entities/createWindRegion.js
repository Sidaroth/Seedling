import hasPosition from 'components/hasPosition';
import hasSize from 'components/hasSize';
import store from 'root/store';
import createState from 'utils/createState';
import Vector from 'utils/math/Vector';
import * as Phaser from 'phaser';
import isGameEntity from 'components/entities/isGameEntity';
import gameConfig from 'configs/gameConfig';
import canListen from 'components/events/canListen';
import eventConfig from 'configs/eventConfig';

/**
 * Wind Region that applies a wind force to any susceptible entities wihtin it.
 */
const createWindRegion = function createWindRegionFunc() {
    const state = {};

    let drawWind = true;
    let gfx = new Phaser.GameObjects.Graphics(store.ui.scene);

    const maxWindStrength = 0.025;
    const windForce = new Vector(0, maxWindStrength);

    function __constructor() {
        store.ui.scene.add.existing(gfx);

        state.listenGlobal(eventConfig.MOUSE.DOWN, (e) => {
            if (state.isWithinRegion({ x: e.downX, y: e.downY })) {
                windForce.y *= -1;
            }
        });
    }

    function isWithinRegion(pos) {
        const statePos = state.getPosition();

        return pos.x >= statePos.x && pos.x < statePos.x + state.getWidth() &&
        pos.y >= statePos.y && pos.y < statePos.y + state.getHeight();
    }

    function setWindforceY(y) {
        windForce.y = y;
    }

    function drawWindRegion() {
        const yPadding = 5;

        const topYPos = state.getY() + state.getHeight() / yPadding;
        const bottomYPos = state.getY() + state.getHeight() - (state.getHeight() / yPadding);
        const downForce = windForce.y > 0;

        const startXPos = state.getX() + state.getWidth() / 2;
        const startYPos = downForce ? topYPos : bottomYPos;
        const endYPos = downForce ? bottomYPos : topYPos;
        const arrowYOffset = downForce ? -(state.getHeight() / 5) : state.getHeight() / 5;

        gfx.clear();
        gfx.lineStyle(Math.max(2, windForce.getLength() / 5), downForce ? 0x0000ff : 0xff0000, 1);
        gfx.beginPath();
        gfx.moveTo(startXPos, startYPos);
        gfx.lineTo(startXPos, endYPos);
        gfx.lineTo(startXPos - state.getWidth() / 10, endYPos + arrowYOffset);
        gfx.moveTo(startXPos, endYPos);
        gfx.lineTo(startXPos + state.getWidth() / 10, endYPos + arrowYOffset);
        gfx.strokePath();
    }

    /**
     * Moves the region to the "back of the line" for parallaxing.
     */
    function moveToBack() {
        state.setPosition({ x: gameConfig.GAME.VIEWWIDTH, y: state.getY() });
    }

    function update(time) {
        state.setPosition({
            x: state.getX() - store.speed * time.delta,
            y: state.getY(),
        });

        // We're entirely off the screen, move to back.
        if (state.getX() < -state.getWidth()) state.moveToBack();

        if (drawWind) drawWindRegion();
        if (isWithinRegion(store.seed.getPosition())) {
            const center = new Vector(state.getWidth() / 2, state.getHeight() / 2);
            const cornerToCenter = new Vector().dist(center);
            const distanceToCenter = store.seed.getPosition().dist(new Vector(state.getX() + state.getWidth() / 2, state.getY() + state.getHeight() / 2));

            const inverseDistance = Math.abs(1 - (distanceToCenter / cornerToCenter));

            // const windForceStrength = windForce.y * inverseDistance;
            // console.log(windForceStrength);
            // windForce.y = windForceStrength;

            const force = windForce.clone();
            if (store.seed.velocity.y > 0.05 && windForce.y < 0) {
                force.y *= 4;
            } else if (store.seed.velocity.y < -0.05 && windForce.y > 0) {
                force.y *= 4;
            }
            store.seed.applyForce(force);
        }
        return time;
    }

    function setDrawWind(val) {
        drawWind = val;
    }

    function destroy() {
        if (gfx) {
            gfx.destroy();
            gfx = null;
        }
    }

    const localState = {
        __constructor,
        moveToBack,
        update,
        isWithinRegion,
        setDrawWind,
        setWindforceY,
        destroy,
    };

    return createState('WindRegion', state, {
        localState,
        canListen: canListen(state),
        isGameEntity: isGameEntity(state),
        hasPosition: hasPosition(state),
        hasSize: hasSize(state),
    });
};

export default createWindRegion;
