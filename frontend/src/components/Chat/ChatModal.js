import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS, SIZES, FONTS} from '@/constants';
import {socket} from '@/api/chat';

const ChatModal = ({visible, onClose}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (visible) {
      socket.on('message', msg => {
        setMessages(prevMessages => [...prevMessages, msg]);
      });

      return () => {
        socket.off('message');
      };
    }
  }, [visible]);

  const sendMessage = () => {
    if (message.trim()) {
      const msg = {text: message, sender: 'user', timestamp: new Date()};
      socket.emit('message', msg);
      setMessages(prevMessages => [...prevMessages, msg]);
      setMessage('');
    }
  };

  const renderItem = ({item}) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.otherMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.title}>Chat</Text>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    padding: SIZES.padding,
    maxHeight: '80%',
  },
  title: {
    ...FONTS.h3,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.h1,
  },
  messageList: {
    flex: 1,
    marginBottom: SIZES.h1,
  },
  messageContainer: {
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
  },
  userMessage: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: COLORS.lightGray,
    alignSelf: 'flex-start',
  },
  messageText: {
    ...FONTS.body4,
    color: COLORS.white,
  },
  timestamp: {
    ...FONTS.body5,
    color: COLORS.white,
    textAlign: 'right',
    marginTop: SIZES.base * 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
    paddingTop: SIZES.base,
  },
  input: {
    flex: 1,
    height: SIZES.h1 * 2,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base,
    marginRight: SIZES.base,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.h1,
    borderRadius: SIZES.radius,
  },
  sendButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
  },
});

export default ChatModal;
