import React from 'react';
import { View } from 'react-native';

const Obstacle = ({
    color,
    obstacleWidth, 
    obstacleHeight, 
    randomBottom, 
    gap, 
    obstacleLeft}) => {

    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: 500,
                left: obstacleLeft,
                bottom: randomBottom + obstacleHeight + gap,
            }}></View>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstacleLeft,
                bottom: randomBottom,
            }}></View>
        </>
    )
}

export default Obstacle