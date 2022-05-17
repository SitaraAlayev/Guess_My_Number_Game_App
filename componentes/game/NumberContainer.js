import {View,Text,StyleSheet,Dimensions} from 'react-native';
import Colors from '../../constans/Colors';

function NumberContainer({children})
{
    return(
      <View style={styles.container}>
          <Text style={styles.numberText}>{children}</Text>
      </View>  
    );
}

export default NumberContainer;

const deviceWidth=Dimensions.get('window').width;


const styles=StyleSheet.create({
    container:{
        borderColor:Colors.primary500,
        borderWidth:4,
        padding:deviceWidth<450 ?12:24,
        borderRadius:8,
        margin:deviceWidth<450 ?12:24,
        alignItems:'center',
        justifyContent:'center',

    },
    numberText:{
        color:Colors.primary500,
        fontSize:deviceWidth<450 ?25:36,
        fontFamily:'open-sans-bold',

    }
});