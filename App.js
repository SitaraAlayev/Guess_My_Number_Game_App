import { useState } from 'react';
import { StyleSheet,View,ImageBackground,SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font'; 
import AppLoading from 'expo-app-loading';

export default function App()
{
  const [userNumber,setUserNamber]=useState();

  const[gameIsOver,setGameIsOver] = useState(true);

  const[guessRounds,setGuessRounds]=useState(0);

  const [fontLoaded]=useFonts({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontLoaded){
    return <AppLoading/>;
  }

  function pickedNumberHandler(pickedNumber){
    setUserNamber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds){
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler(){
    setUserNamber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

  if(userNumber){
    screen=(<GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>);
  }

  if(gameIsOver && userNumber) 
  {
    screen=<GameOverScreen
    userNumber={userNumber}
    roundsNumber={guessRounds}
    onStartNewGame={startNewGameHandler}/>;
  }

  
  return(
  <View style={styles.rootScreen}>
    <ImageBackground
    source={require('./assets/images/Background.jpg')}
    resizeMode='cover'
    style={styles.rootScreen}>
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView> 
      </ImageBackground>
    </View>
  );
 
}

const styles = StyleSheet.create({
  rootScreen:{
    flex:1,
  }

});
