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
  const [obstacleLeft, setObstacleLeft]= useState(screenWidth)
  const [obstacleLeftTwo, setObstacleLeftTwo]= useState(screenWidth + screenWidth/2 + 30)
  const [obstacleNegHeight, setObstacleNegHeight]= useState(0)
  const [obstacleNegHeightTwo, setObstacleNegHeightTwo]= useState(0)

  const [isGameOver, setIsGameOver]= useState(false)
  const [score, setScore]= useState(0)
  const gravity = 3
  let obstacleWidth = 60
  let obstacleHeight = 300
  let gap = 200
  let gameTimerId
  let obstacleTimerId
  let obstacleTimerIdTwo
  
//start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      },30)
  
      return () => {
        clearInterval(gameTimerId)
      }
    }
    //if i dont have birdBottom as a dependecy, it wont stop
  }, [birdBottom])
  console.log(birdBottom)

  const jump = () => {
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
      console.log('jumped')
    }
  }

  //start first obstacle
  useEffect(() => {
    if (obstacleLeft > -60) {
      obstacleTimerId = setInterval(() => {
        setObstacleLeft(obstacleLeft => obstacleLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstacleTimerId)
      }
    } else {
      setScore(score => score +1)
      setObstacleLeft(screenWidth)
      setObstacleNegHeight( - Math.random() * 100)
    }
  }, [obstacleLeft])

  //start second obstacle
  useEffect(() => {
    if (obstacleLeftTwo > -60) {
      obstacleTimerIdTwo = setInterval(() => {
        setObstacleLeftTwo(obstacleLeftTwo => obstacleLeftTwo - 5)
      }, 30)
        return () => {
          clearInterval(obstacleTimerIdTwo)
        }
      } else {
          setScore(score => score +1)
          setObstacleLeftTwo(screenWidth)
          setObstacleNegHeightTwo( - Math.random() * 100)
        }
  }, [obstacleLeftTwo])

    //check for collisions
    useEffect(() => {
      console.log(obstacleLeft)
      console.log(screenWidth/2)
      console.log(obstacleLeft > screenWidth/2)
      if (
        ((birdBottom < (obstacleNegHeight + obstacleHeight + 30) ||
        birdBottom > (obstacleNegHeight + obstacleHeight + gap -30)) &&
        (obstacleLeft > screenWidth/2 -30 && obstacleLeft < screenWidth/2 + 30 )
        )
        || 
        ((birdBottom < (obstacleNegHeightTwo + obstacleHeight + 30) ||
        birdBottom > (obstacleNegHeightTwo + obstacleHeight + gap -30)) &&
        (obstacleLeftTwo > screenWidth/2 -30 && obstacleLeftTwo < screenWidth/2 + 30 )
        )
        ) 
        {
        console.log('game over')
        gameOver()
      }
    })

    const gameOver = () => {
      clearInterval(gameTimerId)
      clearInterval(obstacleTimerId)
      clearInterval(obstacleTimerIdTwo)
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
          color={'green'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstacleNegHeight}
          gap = {gap}
          obstacleLeft = {obstacleLeft}
        />
        <Obstacle 
          color={'yellow'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstacleNegHeightTwo}
          gap = {gap}
          obstacleLeft = {obstacleLeftTwo}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
})
