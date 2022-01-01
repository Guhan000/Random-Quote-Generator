import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar,Linking } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tts from 'react-native-tts';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';

Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
Tts.setDefaultRate(0.4);
Tts.setDefaultPitch(1.0);

export default function App() {

  const [Quote, setQuote] = useState('loading...');
  const [Author, setAuthor] = useState('loading...');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const randomQuote = () => {
    setIsLoading(true)
    fetch("https://api.quotable.io/random")
       .then(res => res.json())
       .then(result => {
         // console.log(result);
          setQuote(result.content);
          setAuthor(result.author);
          setIsLoading(false);
       })  
  }

  const speakNow = () => {
    Tts.stop();
    Tts.speak(Quote + ' by '+ Author);
    Tts.addEventListener('tts-start', (event) => setIsSpeaking(true));
    Tts.addEventListener('tts-finish', (event) => setIsSpeaking(false));
  }

  const copyToClipboard = () => {
    Clipboard.setString(Quote);
    Snackbar.show({
      text: 'Quote copied!',
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  const tweetNow = () => {
    const url = "https://twitter.com/intent/tweet?text=" +Quote;
    Linking.openURL(url);
  }


  useEffect(() => {
    randomQuote();
  }, [])
  
  return (
    <View style={styles.container}>
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteTitle}>Quote of the day</Text>
        <FontAwesome5 name="quote-left" style={styles.leftQuote} />
        <Text style={styles.quote}>{Quote}</Text>
        <FontAwesome5 name="quote-right" style={styles.rightQuote}/>
        <Text style={styles.authorName}>----- {Author}</Text>
        <TouchableOpacity onPress={randomQuote} style={styles.quotebutton}>
          <Text style={styles.buttonText}>{ isLoading ? 'loading...' : 'New Quote'}</Text>
        </TouchableOpacity>
        <View style={styles.bottomButtons}>
          <TouchableOpacity onPress={speakNow} style={{
            backgroundColor: isSpeaking ? '#5372F0' :'#fff',
            borderWidth: 2,
            borderColor: '#5372F0',
            borderRadius: 50,
            padding: 15, 
          }}>
              <FontAwesome name="volume-up" size={25} color={isSpeaking ? '#fff' : '#5372F0'} />
             
          </TouchableOpacity>
          <TouchableOpacity onPress={copyToClipboard} style={styles.buttons2}>
              <FontAwesome5 name="copy" size={25} color='#5372F0' />
              
          </TouchableOpacity>
          <TouchableOpacity onPress={tweetNow} style={styles.buttons3}>
              <FontAwesome name="twitter" size={25} color='#5372F0'/>
              
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar barstyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5372F0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quoteContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  quoteTitle: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  quote: {
    color: '#000',
    fontSize: 16,
    letterSpacing: 1.1,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
    paddingHorizontal: 20
  },
  quotebutton: {
    backgroundColor: "#5372F0",
    padding: 17,
    marginVertical: 20,
    borderRadius: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16
  },
  authorName: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#000',
    textAlign: 'right',
    fontWeight: '300'
  },
  leftQuote: {
    fontSize: 20,
    color: '#000',
    marginBottom: -12
  }, 
  rightQuote: {
    textAlign: 'right',
    fontSize: 20,
    color: '#000',
    marginTop: -12,
    marginBottom: 20
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  buttons2: {
    borderWidth: 2,
    borderColor: '#5372F0',
    borderRadius: 50,
    padding: 15,
  },
  buttons3: {
    borderWidth: 2,
    borderColor: '#5372F0',
    borderRadius: 50,
    padding: 15,
  }
});
