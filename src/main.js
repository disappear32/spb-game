import Game from './Game.js'
import Phaser from '../lib/phaser.min.js'

const config = {
    type: Phaser.AUTO,
    backgroundColor: "0x000000",
    scene: Game,
    scale: {
        width: 960,
        height: 460,
        parent: document.getElementById("game-container"),
        mode: Phaser.Scale.FIT,
        fps: {
            target: 60,
            forceSetTimeOut: true
        }
    }
}

const game = new Phaser.Game(config)

game.scene.start('game')