import {TextInput,Dimensions,View,StyleSheet,Alert,useWindowDimensions,KeyboardAvoidingView,ScrollView} from 'react-native';
import PrimaryButton from '../componentes/ui/PrimaryButton';
import {useState} from 'react';
import Colors from '../constans/Colors';
import Title from '../componentes/ui/Title';
import Card from '../componentes/ui/Card';
import InsructionText from '../componentes/ui/InstructionText';




function StartGameScreen({onPickNumber})
{
    const {width,height}=useWindowDimensions();

    const[enteredNumber,setEnteredNumber]=useState('');

    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText)
    }

    function resetInputHandler(){
        setEnteredNumber('');
    }

    function confirmInputHandler(){
        const chosenNumber=parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99){
            Alert.alert(
                'Invalid number !',
                'Number has to be a number between 1 and 99.',
                [{text:'Okay',style:'destructive',onPress:resetInputHandler}])
            return;
        }
        onPickNumber(chosenNumber);
    } 

    const marginTopDistance =height<380 ? 30 :100;


    return ( 
    <ScrollView style={styles.screen} >
        <KeyboardAvoidingView style={styles.screen} behavior='position'>   
            <View style={[styles.rootContainer,{marginTop: marginTopDistance}]}>  
                <Title>Guess My Number</Title>
                <Card>
                    <InsructionText>Enter a number</InsructionText>
                    <TextInput 
                    style={styles.numberInput} 
                    maxLength={2} keyboardType="number-pad" 
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={numberInputHandler}
                    value={enteredNumber} />
                    <View style={styles.buttonsConteiner}>
                        <View style={styles.buttonConteiner}>
                            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                        </View>
                        <View style={styles.buttonConteiner}>
                            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                        </View>
                    </View>
                </Card>
            </View> 
        </KeyboardAvoidingView> 
    </ScrollView> 
    );
}

export default StartGameScreen;

const deviceHeight=Dimensions.get('window').height;

const styles=StyleSheet.create({
    rootContainer:{
        flex:1,
        // marginTop:deviceHeight<380 ?30 : 100,
        alignItems:'center',

    },
    screen:{
        flex:1,
    },

    numberInput:{
        height:50,
        width:50,
        textAlign:'center',
        fontSize:32,
        borderBottomWidth:2,
        borderBottomColor:Colors.accent500,
        color:Colors.accent500,
        marginVertical:8,
        fontWeight:'bold',

    },
    buttonsConteiner:{
        flexDirection:'row',
    },
    buttonConteiner:{
        flex:1,

    }
});