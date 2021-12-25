 import {
     incrementCustomProperty,
     setCustomProperty,
     getCustomProperty,
    }
    from "./updateCustomProperty.js"
 
 const dinoElem = document.querySelector("[data-dino]")
 const JUMP_SPEED = 0.45
 const GRAVITY= 0.0015
 const DINO_FRAME_COUNT = 2
 const FRAME_TIME = 100
 let yVelocity
 let isJumping
 let dinoFrame
let currentFrameTime
 export function setupDino(){
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity =0
    setCustomProperty(dinoElem,"--bottom",0)
    document.removeEventListener("keydown",onJump)
    document.addEventListener("keydown",onJump)

 }
 export function updateDino(delta,speedScale){
    handleRun(delta,speedScale)
    handleJump(delta)
 }
 export function setDinoLose(){
     dinoElem.src = `dino-lose.png`
 }
 export function getDinoRects(){
    return dinoElem.getBoundingClientRect()
 }
 function handleRun(delta,speedScale){
     if(isJumping){
        dinoElem.src =  `dino-stationary.png`
        return
     }
     if(currentFrameTime >= FRAME_TIME){
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        dinoElem.src = `dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
     currentFrameTime += delta * speedScale
 }
 function handleJump(delta){
    if(!isJumping){
        return
    }
    incrementCustomProperty(dinoElem,"--bottom",delta * yVelocity)
    if(getCustomProperty(dinoElem,"--bottom")<=0){
        setCustomProperty(dinoElem,"--bottom",0)
        isJumping = false
    }
    yVelocity -= delta * GRAVITY
}

function onJump(e){
    if(e.code !== "Space" || isJumping) return
    let audio = new Audio("./jump.mp3")
    audio.play()
    yVelocity = JUMP_SPEED
    isJumping = true
}