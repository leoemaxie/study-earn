import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS, SIZES, ICONS, FONTS} from '@/constants';

const ChatbotModal = ({visible, onClose}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        text: message,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages(prevMessages => {
        return [...prevMessages, userMessage];
      });
      setMessage('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          text: `AI: ${message}`,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prevMessages => {
          return [...prevMessages, aiResponse];
        });
      }, 1000);
    }
  };

  const renderItem = ({item}) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.aiMessage,
      ]}>
      <Text
        style={[
          styles.messageText,
          item.sender === 'user' ? styles.userColor : styles.aiColor,
        ]}>
        {item.text}
      </Text>
      <Text
        style={[
          styles.timestamp,
          item.sender === 'user' ? styles.userColor : styles.aiColor,
        ]}>
        {new Date(item.timestamp).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose}>
          <Image source={ICONS.close} style={styles.closeIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>AI Study Assistant</Text>
        <Text style={styles.status}>Still in development</Text>

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
    maxHeight: '70%',
  },
  title: {
    ...FONTS.h3,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.h5 * 0.6,
  },
  status: {
    ...FONTS.body4,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.h1,
  },
  messageList: {
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
    color: COLORS.white,
  },
  aiMessage: {
    backgroundColor: COLORS.gray,
    color: COLORS.primary,
    alignSelf: 'flex-start',
  },
  messageText: {
    ...FONTS.body4,
  },
  userColor: {
    color: COLORS.white,
  },
  aiColor: {
    color: COLORS.black,
  },
  timestamp: {
    ...FONTS.body5,
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
    fontFamily: 'Satoshi-Regular',
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
  closeIcon: {
    height: SIZES.h4,
    width: SIZES.h1,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
});

export default ChatbotModal;
