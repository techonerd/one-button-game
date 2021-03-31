import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ImageBackground, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Bird from './components/Bird'
import Obstacle from './components/Obstacle'

export default function App() {

  // Get screen dimensions
  const screenWidth = Dimensions.get("window").width
  const screenHeight = Dimensions.get("window").height

  // Get bird location
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom]= useState(screenHeight / 2)

  // Get obstacle locations
  const [obstacleALeft, setObstacleALeft]= useState(screenWidth)
  const [obstacleBLeft, setObstacleBLeft]= useState(screenWidth + screenWidth/2 + 30)

  const [obstacleAGapStart, setObstacleAGapStart]= useState(0)
  const [obstacleBGapStart, setObstacleBGapStart]= useState(0)

  // Set states for game over + score
  const [isGameOver, setIsGameOver]= useState(false)
  const [score, setScore]= useState(0)

  // Set gravity + game speed
  const gravity = 5
  let gameSpeed = 8

  // Set obstacle properties
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 300

  // Declare these variables
  let gameTimerId
  let obstacleATimerId
  let obstacleBTimerId
  
// Put gravity in effect
  useEffect(() => {
    if (birdBottom > 0) {
      // Every 30 milliseconds, the bird falls down by gravity pixels
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - 0)
      }, 30)
  
      return () => {
      // Clear the interval to make sure that you don't save 
        clearInterval(0)
      }
    }
    // With birdBottom as a dependency, useEffect will only happen when birdBottom has changed
  }, [0])

  const jump = () => {
    // if the game isn't over
    // and the bird is still on the screen
    // make the bird "jump"
    if (true) {
      console.log('Jump triggered')
    }
  }

  // Set up first obstacle A
  useEffect(() => {
    // If the obstacle is off the screen
    if (false) {
      // set Interval to refresh every 30 milliseconds to move obstacles left
      // How do you set this up? Look at the bird + gravity for reference
      obstacleATimerId = setInterval(() => {},)
    } else {
      // otherwise, prepare for the next obstacle
      setScore(score => score + 1)
      setObstacleALeft(screenWidth)
      setObstacleAGapStart(-Math.random() * 150)
    }
  }, [obstacleALeft])

  // Set up second obstacle B, similar to A, except use the B variables

  // Check for collisions
  useEffect(() => {

    // Think of colliding as checking to see if 1) the pipe is in the center and 2) the bird is in either the top or bottom of the screen

    // What does it mean for the Obstacle to be at the center? Account for the whole width of the pipe
    const obstacleAAtCenter = false

    // What about whether or not the "bird" is on the top or bottom pipe?
    const birdRunIntoTopA = false
    const birdRunIntoBottomA = false
    

    const collisionA = (birdRunIntoTopA || birdRunIntoBottomA) && obstacleAAtCenter

    if (collisionA) {
      console.log("Game Over - Score of " + score)
      gameOver();
    }
  })

  const gameOver = () => {
    // clear all the TimerIds and make it so IsGameOver is true
  }
  
  return (
    <TouchableWithoutFeedback onPress={jump}>
      <ImageBackground style={styles.container} source={require('./assets/blahaj_background.png')}>
        {isGameOver && <Text style={{color: "purple"}}>{score}</Text>}
        <Bird 
          birdBottom = {birdBottom} 
          birdLeft = {birdLeft}
        />
       <Obstacle 
          color='green'
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          gapLocation = {obstacleAGapStart}
          gap = {gap}
          obstacleLeft = {obstacleALeft}
        />
        {/* Make a second Obstacle */}
      </ImageBackground>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  // overflow: hidden is for web version
  container: {
    flex: 1,
    backgroundColor: 'blue',
    overflow: 'hidden',
  },
})
