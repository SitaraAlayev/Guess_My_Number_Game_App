import { Text ,StyleSheet,Platform} from 'react-native';
import Colors from '../../constans/Colors';

function Title ({children}){
    return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles=StyleSheet.create({
    title:{
        fontSize:24,
        color:Colors.primary500,
        textAlign:'center',
        borderWidth:2,
        borderColor:Colors.primary500,
        padding:12,
        fontFamily:'open-sans-bold',
        maxWidth:'80%',
        width:300,
        
    },

});
