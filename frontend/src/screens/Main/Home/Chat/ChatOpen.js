// src/screens/ChatOpen.js
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, ICONS, IMAGES, FONTS, SIZES} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {socket} from '@/api/chat';
import {format} from 'date-fns';

const ChatOpen = ({route}) => {
  const navigation = useNavigation();
  let {name, position, status, firstName, lastName} = route.params.item;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on('upgrade', transport => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport('N/A');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('message', message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        message,
        sender: 'user',
        timestamp: new Date(),
      };
      socket.emit('message', userMessage);
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setMessage('');
    }
  };

  const renderItem = ({item}) => (
    <View
      style={item.sender === 'user' ? styles.userMessage : styles.otherMessage}>
      <Text
        style={[
          styles.messageText,
          item.sender === 'user'
            ? {color: COLORS.white}
            : {color: COLORS.black},
        ]}>
        {item.message}
      </Text>
      <Text style={styles.timestamp}>
        {format(item.timestamp ?? new Date(), 'hh:mm a')}
      </Text>
    </View>
  );

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={ICONS.arrowleft}
            style={{height: SIZES.h2 * 1.1, width: SIZES.h2 * 1.1}}
          />
        </TouchableOpacity>
        <View style={styles.header}>
          <Image source={IMAGES.avatar} style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={{...FONTS.h4, color: COLORS.black}}>
              {position ?? ''} {firstName} {lastName}{' '}
              {isConnected ? '🔴' : '🔴'}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.black}}>{status}</Text>
          </View>
        </View>
        <View />
      </View>
      <View style={styles.separator} />

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Image source={ICONS.microphone} style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Image source={ICONS.send} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatOpen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.width * 0.04,
    paddingTop: SIZES.h4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: SIZES.h1 * 2,
    height: SIZES.h1 * 2,
    borderRadius: SIZES.h1,
    marginRight: SIZES.h2,
  },
  headerText: {
    flexDirection: 'column',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.grey,
    marginVertical: SIZES.h2,
  },
  chatContainer: {
    flexGrow: 1,
    paddingHorizontal: SIZES.width * 0.04,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.h5 * 0.5,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: SIZES.h1 * 2.5,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.lightGrey,
    paddingHorizontal: SIZES.h2,
    marginHorizontal: SIZES.h2,
  },
  icon: {
    width: SIZES.h2 * 1,
    height: SIZES.h2 * 1,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    borderRadius: 20,
    padding: SIZES.h2,
    marginVertical: SIZES.h1,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lightGrey,
    borderRadius: 20,
    padding: SIZES.h2,
    marginVertical: SIZES.h1,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  messageText: {
    ...FONTS.body4,
    color: COLORS.white,
  },
  timestamp: {
    ...FONTS.body5,
    color: COLORS.chocolate,
    textAlign: 'right',
    marginTop: SIZES.base * 0.5,
  },
});
