import {View,Text,StyleSheet,Alert,FlatList,useWindowDimensions } from 'react-native';
import Title from '../componentes/ui/Title';
import {useState,useEffect} from 'react';
import NumberContainer from '../componentes/game/NumberContainer';
import PrimaryButton from '../componentes/ui/PrimaryButton';
import Card from '../componentes/ui/Card';
import InstructionText from '../componentes/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons'; 
import GuessLogItem from '../componentes/game/GuessLogItem';


function generateRandomBetween(min,max,exclude){
    const rndNum=Math.floor(Math.random()*(max-min))+min;
    

    if(rndNum===exclude){
        return generateRandomBetween(min,max,exclude);
    }else{
        return rndNum;
    }
    
}

let minBoundry=1;
let maxBoundry=100;

function GameScreen({userNumber,onGameOver}){

    const initialGuess=generateRandomBetween(1,100,userNumber);

    const [currentGuess , setCurrentGuess]=useState(initialGuess);

    const[guessRounds,setGuessRounds]=useState([initialGuess]);

    
    useEffect(()=>{
        if(currentGuess===userNumber){
            onGameOver(guessRounds.length);
        }
        },[currentGuess,userNumber,onGameOver]);

        useEffect(()=>{
            minBoundry=1;
            maxBoundry=100;
        },[]);

    function nextGuessHandler(direction)
    {// direction=> 'lower','greater'
        if(
          (direction==='lower' && currentGuess<userNumber) ||
          (direction==='greater' && currentGuess>userNumber)
        ) {
          Alert.alert("Don't lie! ", 'You know that this is wrong...', 
          [{text:'Sorry!',style:'cancel'},
          ]);
          return;
        }

        if(direction ==='lower'){
            maxBoundry=currentGuess;
        }else{
            minBoundry=currentGuess+1;
        }

        const newRndNumber=generateRandomBetween(minBoundry,maxBoundry,currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRound =>[newRndNumber,...prevGuessRound]);
    
    }
    const guessRoundsListLength=guessRounds.length;
    const {width,hight}=useWindowDimensions();

    let content=(
        <>
         <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.card_text}>Higher or lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>
                <Ionicons name="md-remove" size={24} color="white" />
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>
                <Ionicons name="md-add" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
        </>
    );
    
    if(width >500){
        content=
        <>
        <View style={styles.buttonsContainerWide}>
            <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
            </View>
        </>
    }

    return(
    <View style={styles.screen}>
        <Title >Opponent's Guess</Title>
        {content}
        <View style={styles.listContainer}>
            {/* {guessRounds.map(guessRounds=> <Text key={guessRounds}>{guessRounds}</Text>)} */}
            <FlatList
            data={guessRounds} 
            renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength-itemData.index} guess={itemData.item}/>}
            keyExtractor={(item)=>item}
        />
        </View>
    </View>
    );
}

export default GameScreen;

const styles=StyleSheet.create({
    screen:{
        flex:1,
        padding:12,
        margin:10,
        alignItems:'center',
    },
    card_text:{
        marginBottom:30,
    },
    buttonsContainer:{
        flexDirection:'row',
    },
    buttonContainer:{
        flex:1,
    },
    listContainer:{
        flex:1,
        padding:16,
    },
    buttonsContainerWide:
    {
        flexDirection:'row',
        alignItems:'center',
    },
   
});