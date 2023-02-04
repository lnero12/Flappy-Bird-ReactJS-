import './App.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';


const Bird_size = 20;
const Game_Width = 500;
const Game_Height = 500;
const GRAVITY = 6;
const JUMP = 100;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_GAP = 200;

function App() {
  const [birdPosition, setBirdPosition] = useState(250);
  const [GameHasStarted, setGameHasStarted] = useState(false);
  const [obstacleHeight, setObstacleHeight] = useState(200);
  const [ObstacleLeft, setObstacleLeft] = useState(Game_Width - OBSTACLE_WIDTH);
  const bottomObstacleHeight = Game_Height - OBSTACLE_GAP - obstacleHeight;
  const [score, setScore] = useState(-2);


  useEffect(() => {
  let timeId;
    if ( GameHasStarted && birdPosition < Game_Height - Bird_size) {
      timeId=  setInterval(() => {
        setBirdPosition(birdPosition => birdPosition + GRAVITY);
      },24);
    }
    return () => {
      clearInterval(timeId);
    };
}, [GameHasStarted, birdPosition]);

  useEffect(() => {
    
    let ObstacleId;
    if (GameHasStarted && ObstacleLeft >= -OBSTACLE_WIDTH) {
     ObstacleId = setInterval(() => {
        setObstacleLeft((ObstacleLeft) => ObstacleLeft - 5);
      }, 24);

      return () => {
        clearInterval(ObstacleId);
    };
  }
  else {
    setObstacleLeft(Game_Width - OBSTACLE_WIDTH);
    setObstacleHeight(Math.floor(Math.random() * (Game_Height - OBSTACLE_GAP)));
    setScore(score => score + 1);
  }
  
}, [GameHasStarted, ObstacleLeft]);
    useEffect(() => {
      const hasCollidedwithTopObstacle = birdPosition >= 0 && birdPosition <= obstacleHeight;
      const hasCollidedwitBottomObstacle = birdPosition <= 500 && birdPosition >= 500 - bottomObstacleHeight;


      if (ObstacleLeft >= 0 && ObstacleLeft <= OBSTACLE_WIDTH && (hasCollidedwithTopObstacle || hasCollidedwitBottomObstacle)) {
        setGameHasStarted(false);
      }
    }, [birdPosition, ObstacleLeft, obstacleHeight, bottomObstacleHeight]);

  

  const handleClick = () => {
      let newBirdPosition = birdPosition - JUMP;
      if (!GameHasStarted) {
      } setGameHasStarted(true);
      if (newBirdPosition < 0) {
        newBirdPosition(0)
      }else {
        setBirdPosition(newBirdPosition);
      }
  }



  return (
  <Div onClick={handleClick}>
     <GameBox height={Game_Height} width={Game_Width}>
      <Obstacle
        top={0}
        width={OBSTACLE_WIDTH}
        height={obstacleHeight}
        left={ObstacleLeft}

      />
      <Obstacle
        top={Game_Height - (obstacleHeight + bottomObstacleHeight)}
        width={OBSTACLE_WIDTH}
        height={bottomObstacleHeight}
        left={ObstacleLeft}

      />
     <Bird size={Bird_size} top ={birdPosition}/>
     </GameBox>
     <span>Score: {score}</span>
    </Div>
  );

  }

export default App;
  
const Bird = styled.div`
  position: absolute;
  background-color: red;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  top: ${(props) => props.top}px;
  border-radius: 50%;
  `;

  const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  & > span {
    color: red;
    font-size: 30px;
    position: absolute;

    }

  `;

  const GameBox = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: green;
  overflow: hidden;
  `;

  const Obstacle = styled.div`  
  position: relative;
  top: ${(props) => props.top}px;
  background-color: black;
  width: ${OBSTACLE_WIDTH}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  `;