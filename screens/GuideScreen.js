import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const ChatbotScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Welcome to AI Chatbot! How can I assist you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const scrollViewRef = useRef(null);

  const witToken = 'EIYUKU3VPDKOC4BDS6VA6I4EUIEVEJBL';

  const callWitAI = async (message) => {
    try {
      const response = await fetch(`https://api.wit.ai/message?v=20241011&q=${encodeURIComponent(message)}`, {
        headers: {
          Authorization: `Bearer ${witToken}`,
        },
      });
      const data = await response.json();
      return data?.intents?.[0]?.name || 'unknown';
    } catch (error) {
      console.error('Error calling Wit.ai:', error);
      return 'unknown';
    }
  };

  const handleResponse = (intent) => {
    switch (intent) {
      case 'get_midazolam_info':
        return 'Midazolam is a short-acting benzodiazepine used for sedation, anesthesia induction, and seizure control.';
      case 'get_fentanyl_info':
        return 'Fentanyl is a potent synthetic opioid used for pain management and anesthesia.';
      case 'get_epinephrine_info':
        return 'Epinephrine is a life-saving medication used for cardiac arrest and severe allergic reactions.';
      case 'get_contact_info':
        return 'You can contact UW Health University Hospital at (608) 264-8082 or call 911 for emergencies.';
      case 'describe_app_function':
        return 'AccuWeigh2Dose helps healthcare providers determine proper medication dosages in emergencies using AR measurement or weight inputs.';
      case 'get_help':
        return (
          "You can ask me about:\n" +
          "- Information about Midazolam, Fentanyl, or Epinephrine.\n" +
          "- Contact details for UW Health University Hospital.\n" +
          "- How this app works and its features."
        );
      default:
        return "I'm sorry, I couldn't understand your question.";
    }
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userInput, time: currentTime },
    ]);

    // Call Wit.ai
    const intent = await callWitAI(userInput);
    const aiResponse = handleResponse(intent);

    // Add AI response
    setMessages((prev) => [
      ...prev,
      { sender: 'ai', text: aiResponse, time: currentTime },
    ]);

    setUserInput('');

    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Chatbot 🤖</Text>
      </View>

      {/* Chat Messages */}
      <ScrollView
        contentContainerStyle={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageBlock}>
            <Text style={styles.timestamp}>{msg.time}</Text>
            <View
              style={[
                styles.messageBubble,
                msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={userInput}
          onChangeText={setUserInput}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    height: 100,
    paddingHorizontal: 15,
  },
  backButton: {
    marginTop: 35,
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 22,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginTop: 35,
  },
  chatContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  messageBlock: {
    marginBottom: 15,
  },
  timestamp: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  messageBubble: {
    padding: 15,
    borderRadius: 15,
    maxWidth: '75%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatbotScreen;
