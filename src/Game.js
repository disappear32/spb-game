import questions from './questions.json' assert { type: "json" };

export default class Game extends Phaser.Scene {
    constructor() {
        super()
    }

    preload() {
        const { width, height } = this.scale

        const progress = this.add.graphics()
        const startAngle = Math.PI * 3 / 2

        const text = progress.scene.add.text(
            width / 2,
            height / 2 + 250,
            'Loading: 0%'
        )

        text.setOrigin(0.5, 0.5)
        progress.text = text

        this.load.on('progress', function (value) {
            progress.clear()

            const endAngle = startAngle + value * 2 * Math.PI
            progress.beginPath()
            progress.lineStyle(30, 0xffffff, 1.0)
            progress.arc(width / 2, height / 2, 150, startAngle, endAngle, false);
            progress.strokePath()
            progress.closePath()

            const progressText = Math.floor(value * 100) + '%'
            progress.text.setText('Loading: ' + progressText);

        })

        this.load.on('complete', function () {
            progress.destroy();
        })

        this.load.setBaseURL('./resources')

        this.load.image('background', 'game-background.jpg')
        this.load.image('mariya', 'mariya.jpg')
        this.load.image('napoleon', 'napoleon.jpg')
        this.load.image('clock', 'clock.png')
        this.load.image('hair', 'hair.png')
        this.load.image('byust', 'byust.png')
        this.load.image('dvorez', 'dvorez.png')
    }

    create() {
        const showWinAlert = () => {
            document.getElementById('alert-win').style.display = 'block'

            setTimeout(() => {
                document.getElementById('alert-win').style.display = 'none'
            }, 1500)
        }
        const showLoseAlert = () => {
            document.getElementById('alert-lose').style.display = 'block'

            setTimeout(() => {
                document.getElementById('alert-lose').style.display = 'none'
            }, 1500)
        }
        const hideModal = () => {
            document.getElementById('modal').style.display = 'none'
            document.getElementById('blur').style.display = 'none'
        }
        const handleAnswer = (event) => {
            const currentModalName = event.target.name
            const index = event.target.id - 1

            if (questions[currentModalName].variants[index].isRightAnswer) showWinAlert()
            else showLoseAlert()

            hideModal()
        }
        for (let i = 0; i < 3; i++) {
            const element = document.getElementById(`${i + 1}`)
            element.addEventListener('click', handleAnswer)
        }
        const showModal = (tag, imageName) => {
            document.getElementById('modal').style.display = ''
            document.getElementById('blur').style.display = ''
            document.getElementById('image').style.backgroundImage = `url('./resources/${imageName}')`
            document.getElementById('question').textContent = questions[tag].question

            for (let i = 0; i < 3; i++) {
                const element = document.getElementById(`${i + 1}`)
                element.name = `${tag}`
                element.textContent = `${i + 1}. ${questions[tag].variants[i].text}`
            }
        }

        const { width, height } = this.scale

        const backImage = this.add.image(width / 2, height / 2, 'background')
        backImage.setDisplaySize(width, height)

        const mariyaImage = this.add.image(490, 95, 'mariya')
            .setDisplaySize(25, 40)
            .setAlpha(0.8)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                showModal('mariya', 'mariya.jpg')
                mariyaImage.clearTint()
            })
            .on('pointerover', pointer => {
                mariyaImage.setTint(0x00ff00)
            })
            .on('pointerout', () => {
                mariyaImage.clearTint()
            })

        const napoleonImage = this.add.plane(738, 105, 'napoleon')
            .setDisplaySize(35, 30)
            .setAlpha(0.6)
            .setRotation(Phaser.Math.DegToRad(-5))
            .setInteractive()
            .on('pointerdown', () => {
                showModal('napoleon', 'napoleon.jpg')
                document.body.style.cursor = 'default';
                napoleonImage.clearTint();
            })
            .on('pointerover', () => {
                document.body.style.cursor = 'pointer';
                napoleonImage.setTint(0x00ff00);
            })
            .on('pointerout', () => {
                document.body.style.cursor = 'default';
                napoleonImage.clearTint();
            })
        napoleonImage.modelRotation.x = Phaser.Math.DegToRad(-8)
        napoleonImage.modelRotation.y = Phaser.Math.DegToRad(-15)

        const clock = this.add.image(330, 220, 'clock')
            .setDisplaySize(33, 50)
            .setAlpha(0.7)

        const hair = this.add.image(335, 215, 'hair')
            .setDisplaySize(65, 65)
            .setAlpha(0.7)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                showModal('hair', 'hair.png')
                hair.clearTint();
            })
            .on('pointerover', () => {
                hair.setTint(0x00ff00);
            })
            .on('pointerout', () => {
                hair.clearTint();
            })

        const byust = this.add.image(725, 200, 'byust')
            .setDisplaySize(130, 100)
            .setAlpha(0.7)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                showModal('byust', 'byust.png')
                byust.clearTint();
            })
            .on('pointerover', () => {
                byust.setTint(0x00ff00);
            })
            .on('pointerout', () => {
                byust.clearTint();
            })

        const dvorez = this.add.image(250, 69, 'dvorez')
            .setDisplaySize(58, 42)
            .setAlpha(0.7)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                showModal('dvorez', 'dvorez.png')
                dvorez.clearTint();
            })
            .on('pointerover', () => {
                dvorez.setTint(0x00ff00);
            })
            .on('pointerout', () => {
                dvorez.clearTint();
            })

        document.getElementById('blur').addEventListener('click', () => {
            hideModal()
        })
    }
}
