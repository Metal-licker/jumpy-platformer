enum ActionKind {
    RunningLeft,
    RunningRight,
    Idle,
    IdleLeft,
    IdleRight,
    JumpingLeft,
    JumpingRight,
    CrouchLeft,
    CrouchRight,
    Flying,
    Walking,
    Jumping
}
namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.changeScoreBy(8765456789876)
        music.spooky.play()
    } else {
        info.changeLifeBy(-2)
        sprite.say("987656789", invincibilityPeriod)
        music.spooky.play()
    }
    pause(invincibilityPeriod)
})
function initializeAnimations () {
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
}
function giveIntroduction () {
    game.setDialogTextColor(13)
    game.setDialogFrame(img`
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        1 1 f f f f f f f f f f f 1 1 . 
        1 f f 1 1 1 1 1 1 1 1 1 f f 1 . 
        1 f 1 1 f f f f f f f 1 1 f 1 . 
        1 f 1 f f f f f f f f f 1 f 1 . 
        1 f 1 f f f f f f f f f 1 f 1 . 
        1 f 1 f f f f f f f f f 1 f 1 . 
        1 f 1 f f f f f f f f f 1 f 1 . 
        1 f 1 f f f f f f f f f 1 f 1 . 
        1 f 1 f f f f f f f f f 1 f 1 . 
        1 f 1 f f f f f f f f f 1 f 1 . 
        1 f 1 1 f f f f f f f 1 1 f 1 . 
        1 f f 1 1 1 1 1 1 1 1 1 f f 1 . 
        1 1 f f f f f f f f f f f 1 1 . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f . . . . . 
        . . f f f d d d 5 d d f f f . . 
        . f d d d 1 1 1 5 1 1 1 1 1 f . 
        . f d 1 1 1 1 1 5 5 1 1 1 1 f . 
        . f d 1 1 1 1 1 1 5 5 1 1 1 f . 
        . f d 1 1 f 1 1 1 1 5 1 1 1 f . 
        . . f d f f f 1 1 f 5 f 1 f . . 
        . f d 1 f f f 1 1 f 5 f 1 1 f . 
        . f b 1 1 1 1 1 1 1 5 1 1 b f . 
        . f b b b b b b b b b b b b f . 
        . f d b b b b b b b b b b 1 f . 
        . f f d d d d 1 1 1 1 5 1 f f . 
        . . f f f f f f f f f f f f . . 
        `)
    showInstruction("hehehehehehehehehehehehehehehehehehehehehehehehehehehe")
    showInstruction("hehehehehehehehehehehehehehehehehehehehehehehehehehehe...he")
    showInstruction("F")
    showInstruction("F O")
    showInstruction("F O O")
    showInstruction("F O O L")
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function initializeCoinAnimation () {
    coinAnimation = animation.createAnimation(ActionKind.Idle, 200)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f f f f f f . . . . 
        . . . . f f f 5 5 f f f . . . . 
        . . . f f f 1 d d 1 f f f . . . 
        . . . f f 5 d 1 1 d 5 f f . . . 
        . . . f f 5 d 1 1 d 5 f f . . . 
        . . . f f f 1 d d 1 f f f . . . 
        . . . . f f f 5 5 f f f . . . . 
        . . . . f f f f f f f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f f f f f f f f . . . . . 
        . . . f f f f f f f f f . . . . 
        . . f f f f f f 4 f f f . . . . 
        . . f f f f f f 4 4 f f f . . . 
        . . f f f f f f 4 4 f f f . . . 
        . . f f f f f f 4 f f f . . . . 
        . . . f f f f f f f f f . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . f f f f f f f f . . . . . 
        . . . f f f f f f f f f . . . . 
        . . . f f f f f 4 f f f . . . . 
        . . . f f f f f 4 f f f . . . . 
        . . . f f f f f f f f f . . . . 
        . . . f f f f f f f f . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . f f f f f f f f . . . 
        . . . . f f f f f f f f f . . . 
        . . . . f f f 4 f f f f f . . . 
        . . . . f f f 4 f f f f f . . . 
        . . . . f f f f f f f f f . . . 
        . . . . . f f f f f f f f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . f f f f f f f f . . . 
        . . . . f f f f f f f f f . . . 
        . . . . f f f 4 f f f f f f . . 
        . . . f f f 4 4 f f f f f f . . 
        . . . f f f 4 4 f f f f f f . . 
        . . . . f f f 4 f f f f f f . . 
        . . . . f f f f f f f f f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.changeScoreBy(3)
    music.baDing.play()
})
function attemptJump () {
    // else if: either fell off a ledge, or double jumping
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * pixelsToMeters
    } else if (canDoubleJump) {
        doubleJumpSpeed = -3 * pixelsToMeters
        // Good double jump
        if (hero.vy >= -40) {
            doubleJumpSpeed = -4.5 * pixelsToMeters
            hero.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        hero.vy = doubleJumpSpeed
        canDoubleJump = false
    }
}
function animateIdle () {
    mainIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(hero, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . 
        . . . . e e e . . . . . . . 
        . . . e f d f e . . . . . . 
        . . . e d d d e . . . . . . 
        . . . . 7 d 7 . . . . . . . 
        . . . 7 1 1 1 7 . . . . . . 
        . . . 7 7 7 7 7 . . . . . . 
        . . . 7 7 7 7 7 . . . . . . 
        . . . d 1 1 1 d . . . . . . 
        . . . . 7 7 7 . . . . . . . 
        . . . . e e e . . . . . . . 
        . . . . e . e . . . . . . . 
        . . . . e . e . . . . . . . 
        . . . e e . e . . . . . . . 
        `)
    mainIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(hero, mainIdleRight)
    mainIdleRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . 
        . . . . . . . e e e . . . . 
        . . . . . . e f d f e . . . 
        . . . . . . e d d d e . . . 
        . . . . . . . 7 d 7 . . . . 
        . . . . . . 7 1 1 1 7 . . . 
        . . . . . . 7 7 7 7 7 . . . 
        . . . . . . 7 7 7 7 7 . . . 
        . . . . . . d 1 1 1 d . . . 
        . . . . . . . 7 7 7 . . . . 
        . . . . . . . e e e . . . . 
        . . . . . . . e . e . . . . 
        . . . . . . . e . e . . . . 
        . . . . . . . e . e e . . . 
        `)
}
function setLevelTileMap (level: number) {
    clearGame()
    if (level == 0) {
        tiles.setTilemap(tilemap`level`)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level_1`)
    } else if (level == 3) {
        tiles.setTilemap(tilemap`level_2`)
    } else if (level == 4) {
        tiles.setTilemap(tilemap`level_3`)
    } else if (level == 5) {
        tiles.setTilemap(tilemap`level_4`)
    } else if (level == 6) {
        tiles.setTilemap(tilemap`level_5`)
    } else if (level == 7) {
        tiles.setTilemap(tilemap`level_6`)
    }
    initializeLevel(level)
}
function initializeFlierAnimations () {
    flierFlying = animation.createAnimation(ActionKind.Flying, 100)
    flierFlying.addAnimationFrame(img`
        . . 5 5 5 f f f f f f 5 5 5 . . 
        . 5 f f f d d d 5 d d f f f 5 . 
        5 f d d d 1 1 1 5 1 1 1 1 1 f 5 
        5 f d 1 1 1 1 1 5 5 1 1 1 1 f 5 
        5 f d 1 1 1 1 1 1 5 5 1 1 1 f 5 
        5 f d 1 1 f 1 1 1 1 5 1 1 1 f 5 
        . 5 f d f f f 1 1 f 4 f 1 f 5 . 
        5 f d 1 f f f 1 1 f 4 f 1 1 f 5 
        5 f b 1 1 1 1 1 1 1 5 1 1 b f 5 
        . 5 b b 5 b 5 b b 5 b 5 b b 5 . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . 5 b 5 b 5 b 5 5 b 5 b 5 b 5 . 
        5 f b b b b b b b b b b b b f 5 
        5 f d b b b b b b b b b b 1 f 5 
        5 f f d d d d 1 1 1 1 5 1 f f 5 
        . 5 f f f f f f f f f f f f 5 . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . 5 5 5 5 5 5 . . . . . 
        . . 5 5 5 f f f f f f 5 5 5 . . 
        . 5 f f f d d d 5 d d f f f 5 . 
        5 f d d d 1 1 1 5 1 1 1 1 1 f 5 
        5 f d 1 1 1 1 1 5 5 1 1 1 1 f 5 
        5 f d 1 1 1 1 1 1 5 5 1 1 1 f 5 
        5 f d 1 1 f 1 1 1 1 5 1 1 1 f 5 
        . 5 f d f f f 1 1 f 4 f 1 f 5 . 
        5 f d 1 f f f 1 1 f 4 f 1 1 f 5 
        5 f b 1 1 1 1 1 1 1 5 1 1 b f 5 
        . 5 b b 5 b 5 b b 5 b 5 b b 5 . 
        . 5 b 5 b 5 b 5 5 b 5 b 5 b 5 . 
        5 f b b b b b b b b b b b b f 5 
        5 f d b b b b b b b b b b 1 f 5 
        5 f f d d d d 1 1 1 1 5 1 f f 5 
        . 5 f f f f f f f f f f f f 5 . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 5 5 5 5 5 . . . . . 
        . . 5 5 5 f f f f f f 5 5 5 . . 
        . 5 f f f d d d 5 d d f f f 5 . 
        5 f d d d 1 1 1 5 1 1 1 1 1 f 5 
        5 f d 1 1 1 1 1 5 5 1 1 1 1 f 5 
        5 f d 1 1 1 1 1 1 5 5 1 1 1 f 5 
        5 f d 1 1 f 1 1 1 1 5 1 1 1 f 5 
        . 5 f d f f f 1 1 f 4 f 1 f 5 . 
        5 f d 1 f f f 1 1 f 4 f 1 1 f 5 
        5 f b 1 1 1 1 1 1 1 5 1 1 b f 5 
        5 f b b b b b b b b b b b b f 5 
        5 f d b b b b b b b b b b 1 f 5 
        5 f f d d d d 1 1 1 1 5 1 f f 5 
        . 5 f f f f f f f f f f f f 5 . 
        `)
    flierIdle = animation.createAnimation(ActionKind.Idle, 100)
    flierIdle.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 5 5 5 5 5 . . . . . 
        . . 5 5 5 f f f f f f 5 5 5 . . 
        . 5 f f f d d d 5 d d f f f 5 . 
        5 f d d d 1 1 1 5 1 1 1 1 1 f 5 
        5 f d 1 1 1 1 1 5 5 1 1 1 1 f 5 
        5 f d 1 1 1 1 1 1 5 5 1 1 1 f 5 
        5 f d 1 1 f 1 1 1 1 5 1 1 1 f 5 
        . 5 f d f f f 1 1 f 4 f 1 f 5 . 
        5 f d 1 f f f 1 1 f 4 f 1 1 f 5 
        5 f b 1 1 1 1 1 1 1 5 1 1 b f 5 
        5 f b b b b b b b b b b b b f 5 
        5 f d b b b b b b b b b b 1 f 5 
        5 f f d d d d 1 1 1 1 5 1 f f 5 
        . 5 f f f f f f f f f f f f 5 . 
        `)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function animateRun () {
    mainRunLeft = animation.createAnimation(ActionKind.RunningLeft, 100)
    animation.attachAnimation(hero, mainRunLeft)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . f e e . . . . . . 
        . . . . . . . d e e . . . . . . 
        . . . . . . . 7 7 e . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . . e . . . . . . . 
        . . . . . . . . e . . . . . . . 
        . . . . . . . e e . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . f e e . . . . . . 
        . . . . . . . d e e . . . . . . 
        . . . . . . . 7 7 e . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . e e e . . . . . . 
        . . . . . . . e . . e . . . . . 
        . . . . . . e e . e e . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . f e e . . . . . . 
        . . . . . . . d e e . . . . . . 
        . . . . . . . 7 7 e . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . . e . . . . . . . 
        . . . . . . . . e . . . . . . . 
        . . . . . . . e e . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . f e e . . . . . . 
        . . . . . . . d e e . . . . . . 
        . . . . . . . 7 7 e . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . e . . e e . . . . . 
        . . . . . e e . . . e . . . . . 
        `)
    mainRunRight = animation.createAnimation(ActionKind.RunningRight, 100)
    animation.attachAnimation(hero, mainRunRight)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . e e f . . . . . . . 
        . . . . . . e e d . . . . . . . 
        . . . . . . e 7 7 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . e . . . . . . . . 
        . . . . . . . e . . . . . . . . 
        . . . . . . . e e . . . . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . e e f . . . . . . . 
        . . . . . . e e d . . . . . . . 
        . . . . . . e 7 7 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . e e e . . . . . . . 
        . . . . . e . . e . . . . . . . 
        . . . . . e e . e e . . . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . e e f . . . . . . . 
        . . . . . . e e d . . . . . . . 
        . . . . . . e 7 7 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . e . . . . . . . . 
        . . . . . . . e . . . . . . . . 
        . . . . . . . e e . . . . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . e e f . . . . . . . 
        . . . . . . e e d . . . . . . . 
        . . . . . . e 7 7 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . e e . . e . . . . . . 
        . . . . . e . . . e e . . . . . 
        `)
}
function animateJumps () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    mainJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . 
        . . . . e e e . . . . . . . 
        . . . e f d f e . . . . . . 
        . . . e d d d e . . . . . . 
        . . . . 7 d 7 . . . . . . . 
        . . . 7 1 1 1 7 . . . . . . 
        . . . 7 7 7 7 7 . . . . . . 
        . . . 7 7 7 7 7 . . . . . . 
        . . . d 1 1 1 d . . . . . . 
        . . . . 7 7 7 . . . . . . . 
        . . . . e e e . . . . . . . 
        . . . . e . e . . . . . . . 
        . . . . e . e . . . . . . . 
        . . . e e . e . . . . . . . 
        `)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . 
        . . . . e e e . . . . . . . 
        . . . e f d f e . . . . . . 
        . . . e d d d e . . . . . . 
        . . . . 7 d 7 . . . . . . . 
        . . 7 7 1 1 1 7 7 . . . . . 
        . . 7 . 7 7 7 . 7 . . . . . 
        . . d . 7 7 7 . d . . . . . 
        . . . . 1 1 1 . . . . . . . 
        . . . . 7 7 7 . . . . . . . 
        . . . . e e e . . . . . . . 
        . . . e e e e . . . . . . . 
        . . . e . e . . . . . . . . 
        . . . . e . e . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpLeft.addAnimationFrame(img`
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . e e e . . . . . . . 
            . . . e f d f e . . . . . . 
            . . . e d d d e . . . . . . 
            . . . . 7 d 7 . . . . . . . 
            d 7 7 7 1 1 1 7 7 7 d . . . 
            . . . . 7 7 7 . . . . . . . 
            . . . . 7 7 7 . . . . . . . 
            . . . . 1 1 1 . . . . . . . 
            . . . . 7 7 7 . . . . . . . 
            . . . e e e e . . . . . . . 
            . . . e . e e e . . . . . . 
            . . e e . . . e . . . . . . 
            . . . . . . . . . . . . . . 
            `)
    }
    mainJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, mainJumpRight)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . 
        . . . . . . . e e e . . . . 
        . . . . . . e f d f e . . . 
        . . . . . . e d d d e . . . 
        . . . . . . . 7 d 7 . . . . 
        . . . . . . 7 1 1 1 7 . . . 
        . . . . . . 7 7 7 7 7 . . . 
        . . . . . . 7 7 7 7 7 . . . 
        . . . . . . d 1 1 1 d . . . 
        . . . . . . . 7 7 7 . . . . 
        . . . . . . . e e e . . . . 
        . . . . . . . e . e . . . . 
        . . . . . . . e . e . . . . 
        . . . . . . . e . e e . . . 
        `)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . 
        . . . . . . . e e e . . . . 
        . . . . . . e f d f e . . . 
        . . . . . . e d d d e . . . 
        . . . . . . . 7 d 7 . . . . 
        . . . . . 7 7 1 1 1 7 7 . . 
        . . . . . 7 . 7 7 7 . 7 . . 
        . . . . . d . 7 7 7 . d . . 
        . . . . . . . 1 1 1 . . . . 
        . . . . . . . 7 7 7 . . . . 
        . . . . . . . e e e . . . . 
        . . . . . . . e e e e . . . 
        . . . . . . . . e . e . . . 
        . . . . . . . e . e . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpRight.addAnimationFrame(img`
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . e e e . . . . 
            . . . . . . e f d f e . . . 
            . . . . . . e d d d e . . . 
            . . . . . . . 7 d 7 . . . . 
            . . . d 7 7 7 1 1 1 7 7 7 d 
            . . . . . . . 7 7 7 . . . . 
            . . . . . . . 7 7 7 . . . . 
            . . . . . . . 1 1 1 . . . . 
            . . . . . . . 7 7 7 . . . . 
            . . . . . . . e e e e . . . 
            . . . . . . e e e . e . . . 
            . . . . . . e . . . e e . . 
            . . . . . . . . . . . . . . 
            `)
    }
}
function animateCrouch () {
    mainCrouchLeft = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(hero, mainCrouchLeft)
    mainCrouchLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d d d d d d d d d e e d f . 
        . f d d f d d d d f d d e d f . 
        . f d d f d d d d f d d d e f . 
        . f d d f d d d d f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f a c c c c c c c c a b f . . 
        . f d c c c c c c c c c d d f . 
        f d d f f f b b f f f f d d f . 
        . f f a a a a a a a a a b f . . 
        . . . f f f f . f f f f f . . . 
        `)
    mainCrouchRight = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(hero, mainCrouchRight)
    mainCrouchRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e d d d d d d d d d f . 
        . f d e d d f d d d d f d d f . 
        . f e d d d f d d d d f d d f . 
        . . f d d d f d d d d f d d f . 
        . . f d d d d d d d d d d d f . 
        . . f b a c c c c c c c c a f . 
        . f d d c c c c c c c c c d f . 
        . f d d f f f f b b f f f d d f 
        . . f b a a a a a a a a a f f . 
        . . . f f f f f . f f f f . . . 
        `)
}
function clearGame () {
    for (let value of sprites.allOfKind(SpriteKind.Bumper)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Goal)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flier)) {
        value4.destroy()
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile1`, function (sprite, location) {
    info.changeLifeBy(1)
    currentLevel += 1
    if (hasNextLevel()) {
        game.splash("you are filled with 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")
        setLevelTileMap(currentLevel)
    } else {
        game.over(true, effects.melt)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flier, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    sprite.say("102394857548392", invincibilityPeriod * 1.5)
    music.spooky.play()
    pause(invincibilityPeriod * 1.5)
})
function createEnemies () {
    // enemy that moves back and forth
    for (let value5 of tiles.getTilesByType(assets.tile`tile4`)) {
        bumper = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . f f f . . f f f . . . . 
            . . . f 5 5 5 f f 5 5 d f . . . 
            . . . f 5 d d d d d d d f . . . 
            . . . . f f f 5 d f f f . . . . 
            f . . . . . f 5 d f . . . . . f 
            f f . . . . f 5 d f . . . . f f 
            f d f . . . f 5 d f . . . f 5 f 
            f d d f . . f 5 d f . . f 5 d f 
            f 5 d d f . f 5 d f . f 5 d d f 
            . f 5 d d f f 5 d f f 5 d d f . 
            . . f 5 d d f 5 d f 5 d d f . . 
            . . . f 5 d d f f 5 d d f . . . 
            . . . . f 5 d f 5 d d f . . . . 
            . . . . . f 5 d f 5 f . . . . . 
            `, SpriteKind.Bumper)
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, assets.tile`transparency16`)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
    }
    // enemy that flies at player
    for (let value6 of tiles.getTilesByType(assets.tile`tile7`)) {
        flier = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 4 4 4 4 4 4 4 f . . . 
            . . . f 4 5 5 4 4 4 5 5 4 f . . 
            . f . f 4 4 4 5 4 5 4 4 4 f . f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . . . f 4 4 5 5 5 5 5 4 4 f . . 
            . . . . f 4 5 4 4 4 5 4 f . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
        animation.attachAnimation(flier, flierFlying)
        animation.attachAnimation(flier, flierIdle)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(hero.isHittingTile(CollisionDirection.Bottom))) {
        hero.vy += 80
    }
})
function showInstruction (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
    music.baDing.play()
    info.changeScoreBy(1)
}
function initializeHeroAnimations () {
    animateRun()
    animateIdle()
    animateCrouch()
    animateJumps()
}
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
    info.setLife(1)
    info.setScore(9999999999999)
}
function initializeLevel (level: number) {
    effects.clouds.startScreenEffect()
    playerStartLocation = tiles.getTilesByType(assets.tile`tile6`)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, assets.tile`tile0`)
    createEnemies()
    spawnGoals()
}
function hasNextLevel () {
    return currentLevel != levelCount
}
function spawnGoals () {
    for (let value7 of tiles.getTilesByType(assets.tile`tile5`)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(coin, value7)
        animation.attachAnimation(coin, coinAnimation)
        animation.setAction(coin, ActionKind.Idle)
        tiles.setTileAt(value7, assets.tile`tile0`)
    }
}
let heroFacingLeft = false
let coin: Sprite = null
let playerStartLocation: tiles.Location = null
let flier: Sprite = null
let bumper: Sprite = null
let mainCrouchRight: animation.Animation = null
let mainCrouchLeft: animation.Animation = null
let mainJumpRight: animation.Animation = null
let mainJumpLeft: animation.Animation = null
let mainRunRight: animation.Animation = null
let mainRunLeft: animation.Animation = null
let flierIdle: animation.Animation = null
let flierFlying: animation.Animation = null
let mainIdleRight: animation.Animation = null
let mainIdleLeft: animation.Animation = null
let doubleJumpSpeed = 0
let canDoubleJump = false
let coinAnimation: animation.Animation = null
let currentLevel = 0
let levelCount = 0
let gravity = 0
let pixelsToMeters = 0
let invincibilityPeriod = 0
let hero: Sprite = null
hero = sprites.create(img`
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . e e e . . . . 
    . . . . . . e f d f e . . . 
    . . . . . . e d d d e . . . 
    . . . . . . . 7 d 7 . . . . 
    . . . . . . 7 1 1 1 7 . . . 
    . . . . . . 7 7 7 7 7 . . . 
    . . . . . . 7 7 7 7 7 . . . 
    . . . . . . d 1 1 1 d . . . 
    . . . . . . . 7 7 7 . . . . 
    . . . . . . . e e e . . . . 
    . . . . . . . e . e . . . . 
    . . . . . . . e . e . . . . 
    . . . . . . . e . e e . . . 
    `, SpriteKind.Player)
// how long to pause between each contact with a
// single enemy
invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
initializeAnimations()
createPlayer(hero)
levelCount = 8
currentLevel = 0
setLevelTileMap(currentLevel)
giveIntroduction()
// set up hero animations
game.onUpdate(function () {
    if (hero.vx < 0) {
        heroFacingLeft = true
    } else if (hero.vx > 0) {
        heroFacingLeft = false
    }
    if (hero.isHittingTile(CollisionDirection.Top)) {
        hero.vy = 0
    }
    if (controller.down.isPressed()) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.CrouchLeft)
        } else {
            animation.setAction(hero, ActionKind.CrouchRight)
        }
    } else if (hero.vy < 20 && !(hero.isHittingTile(CollisionDirection.Bottom))) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.JumpingLeft)
        } else {
            animation.setAction(hero, ActionKind.JumpingRight)
        }
    } else if (hero.vx < 0) {
        animation.setAction(hero, ActionKind.RunningLeft)
    } else if (hero.vx > 0) {
        animation.setAction(hero, ActionKind.RunningRight)
    } else {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.IdleLeft)
        } else {
            animation.setAction(hero, ActionKind.IdleRight)
        }
    }
})
// Flier movement
game.onUpdate(function () {
    for (let value8 of sprites.allOfKind(SpriteKind.Flier)) {
        if (Math.abs(value8.x - hero.x) < 60) {
            if (value8.x - hero.x < -5) {
                value8.vx = 25
            } else if (value8.x - hero.x > 5) {
                value8.vx = -25
            }
            if (value8.y - hero.y < -5) {
                value8.vy = 25
            } else if (value8.y - hero.y > 5) {
                value8.vy = -25
            }
            animation.setAction(value8, ActionKind.Flying)
        } else {
            value8.vy = -20
            value8.vx = 0
            animation.setAction(value8, ActionKind.Idle)
        }
    }
})
// Reset double jump when standing on wall
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
// bumper movement
game.onUpdate(function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value9.isHittingTile(CollisionDirection.Left)) {
            value9.vx = Math.randomRange(30, 60)
        } else if (value9.isHittingTile(CollisionDirection.Right)) {
            value9.vx = Math.randomRange(-60, -30)
        }
    }
})
