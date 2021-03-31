import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
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
  const [gameSpeed, setGameSpeed] = useState(8)

  // Set level properties
  const [gap, setGap] = useState(300)
  const [level, setLevel] = useState(1)

  // Set obstacle properties
  const obstacleWidth = 60
  const obstacleHeight = 600 - gap

  // Declare these variables
  let gameTimerId
  let obstacleATimerId
  let obstacleBTimerId
  
// Put gravity in effect
  useEffect(() => {
    if (birdBottom > 0) {
      // Every 30 milliseconds, the bird falls down by gravity pixels
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)
  
      return () => {
        clearInterval(gameTimerId)
      }
    }
    // With birdBottom as a dependency, useEffect will only happen when birdBottom has changed
  }, [birdBottom])

  const jump = () => {
    if (!isGameOver) {
      if (birdBottom < screenHeight) {
        setBirdBottom(birdBottom => birdBottom + 60)
        console.log('Jump triggered')
      }
    }
  }

  // Set up first obstacle A
  useEffect(() => {
    // If the obstacle is off the screen
    if (obstacleALeft > -obstacleWidth) {
      // set Interval to refresh every 30 milliseconds to move obstacles left
      obstacleATimerId = setInterval(() => {
        setObstacleALeft(obstacleALeft => obstacleALeft - gameSpeed)
      }, 30)
      return () => {
        clearInterval(obstacleATimerId)
      }
    } else {
      setScore(score => score + 1)
      setObstacleALeft(screenWidth)
      setObstacleAGapStart(-Math.random() * gap/2)
    }
  }, [obstacleALeft])

  // Set up second obstacle B
  useEffect(() => {
    if (obstacleBLeft > -obstacleWidth) {
      obstacleBTimerId = setInterval(() => {
        setObstacleBLeft(obstacleBLeft => obstacleBLeft - gameSpeed)
        }, 30)
        return () => clearInterval(obstacleBTimerId)
      } else {
          setScore(score => score + 1)
          setObstacleBLeft(screenWidth)
          setObstacleBGapStart(-Math.random() * 150)
        }
  }, [obstacleBLeft])

  // Check for collisions
  useEffect(() => {
    const birdRunIntoTopA = birdBottom < (obstacleAGapStart + obstacleHeight + obstacleWidth/2)
    const birdRunIntoBottomA = birdBottom > (obstacleAGapStart + obstacleHeight + gap - obstacleWidth/2)
    const obstacleAAtCenter = obstacleALeft > screenWidth/2 - obstacleWidth/2 && obstacleALeft < screenWidth/2 + obstacleWidth/2

    const birdRunIntoTopB = birdBottom < (obstacleBGapStart + obstacleHeight + obstacleWidth/2)
    const birdRunIntoBottomB = birdBottom > (obstacleBGapStart + obstacleHeight + gap - obstacleWidth/2)
    const obstacleBAtCenter = obstacleBLeft > screenWidth/2 - obstacleWidth/2 && obstacleBLeft < screenWidth/2 + obstacleWidth/2

    const collisionA = (birdRunIntoTopA || birdRunIntoBottomA) && obstacleAAtCenter
    const collisionB = (birdRunIntoTopB || birdRunIntoBottomB) && obstacleBAtCenter

    if (collisionA || collisionB) {
      console.log("Game Over - Score of " + score)
      gameOver();
    }
  })

  // Introduce levels
  useEffect(() => {
    if (score % 4 == 0) {
      setGap(gap => gap * .9)
      setGameSpeed(gameSpeed => gameSpeed++)
      setLevel(level => level++)
      console.log("You are on level " + level + " and gaps are only " + gap + " pixels big!")
    }
    console.log("Score: " + score)
  }, [score])

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstacleATimerId)
    clearInterval(obstacleBTimerId)
    setIsGameOver(true)
  }
  
  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
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
        <Obstacle 
          color='yellow'
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          gapLocation = {obstacleBGapStart}
          gap = {gap}
          obstacleLeft = {obstacleBLeft}
        />
      </View>
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
