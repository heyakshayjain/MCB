import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  MessageCircle,
  BookOpen,
  Award,
  Calendar,
  TrendingUp,
  FileText,
  Send,
  Bot,
  User,
  ChevronRight,
} from 'lucide-react-native';

export default function GuidanceScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('career');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi! I\'m your college application assistant. How can I help you today?',
      sender: 'bot',
    },
  ]);

  const quickQuestions = [
    'How to apply for JEE?',
    'Best engineering colleges',
    'Document requirements',
    'Application deadlines',
  ];

  const careerPaths = [
    { id: 1, title: 'Computer Science', icon: BookOpen, color: '#007AFF', colleges: 120 },
    { id: 2, title: 'Mechanical Engineering', icon: Award, color: '#FF9500', colleges: 95 },
    { id: 3, title: 'Electronics', icon: TrendingUp, color: '#5856D6', colleges: 80 },
    { id: 4, title: 'Civil Engineering', icon: FileText, color: '#34C759', colleges: 75 },
  ];

  const upcomingExams = [
    { id: 1, name: 'JEE Main 2024', date: 'Jan 24-31, 2024', daysLeft: 15, color: '#007AFF' },
    { id: 2, name: 'JEE Advanced', date: 'May 26, 2024', daysLeft: 135, color: '#5856D6' },
    { id: 3, name: 'BITSAT 2024', date: 'May 19-24, 2024', daysLeft: 128, color: '#FF9500' },
  ];

  const resources = [
    { id: 1, title: 'Application Checklist', type: 'PDF', size: '2.4 MB', icon: FileText },
    { id: 2, title: 'College Comparison Guide', type: 'PDF', size: '1.8 MB', icon: BookOpen },
    { id: 3, title: 'Financial Aid Guide', type: 'PDF', size: '3.2 MB', icon: Award },
    { id: 4, title: 'Interview Tips', type: 'PDF', size: '1.5 MB', icon: MessageCircle },
  ];

  const tabs = [
    { id: 'career', label: 'Career', icon: Award },
    { id: 'exams', label: 'Exams', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, sender: 'user' },
        {
          id: messages.length + 2,
          text: 'I understand your question. Let me help you with that...',
          sender: 'bot',
        },
      ]);
      setMessage('');
    }
  };

  const renderChatTab = () => (
    <View style={styles.tabContent}>
      <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <View style={styles.messageIconContainer}>
              {msg.sender === 'bot' ? (
                <View style={styles.botIcon}>
                  <Bot size={16} color="#FFFFFF" strokeWidth={2} />
                </View>
              ) : (
                <View style={styles.userIcon}>
                  <User size={16} color="#FFFFFF" strokeWidth={2} />
                </View>
              )}
            </View>
            <View
              style={[
                styles.messageBubble,
                msg.sender === 'user' ? styles.userBubble : styles.botBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.sender === 'user' ? styles.userText : styles.botText,
                ]}
              >
                {msg.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.quickQuestionsContainer}>
        <Text style={styles.quickQuestionsTitle}>Quick Questions</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.quickQuestions}>
          {quickQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickQuestionChip}
              onPress={() => setMessage(question)}
            >
              <Text style={styles.quickQuestionText}>{question}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything..."
          placeholderTextColor="#8E8E93"
          value={message}
          onChangeText={setMessage}
          multiline={true}
        />
        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!message.trim()}
        >
          <Send size={20} color={message.trim() ? '#FFFFFF' : '#8E8E93'} strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCareerTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Career Paths</Text>
        <View style={styles.careerGrid}>
          {careerPaths.map((path) => (
            <TouchableOpacity key={path.id} style={styles.careerCard} activeOpacity={0.7}>
              <View style={[styles.careerIconContainer, { backgroundColor: path.color + '15' }]}>
                <path.icon size={28} color={path.color} strokeWidth={2} />
              </View>
              <Text style={styles.careerTitle}>{path.title}</Text>
              <Text style={styles.careerColleges}>{path.colleges} colleges</Text>
              <View style={styles.careerArrow}>
                <ChevronRight size={20} color="#C7C7CC" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Career Planning Tools</Text>
        <TouchableOpacity style={styles.toolCard} activeOpacity={0.7}>
          <View style={[styles.toolIconContainer, { backgroundColor: '#007AFF15' }]}>
            <TrendingUp size={24} color="#007AFF" strokeWidth={2} />
          </View>
          <View style={styles.toolInfo}>
            <Text style={styles.toolTitle}>Career Roadmap Generator</Text>
            <Text style={styles.toolDescription}>Get personalized career guidance</Text>
          </View>
          <ChevronRight size={20} color="#C7C7CC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolCard} activeOpacity={0.7}>
          <View style={[styles.toolIconContainer, { backgroundColor: '#34C75915' }]}>
            <Award size={24} color="#34C759" strokeWidth={2} />
          </View>
          <View style={styles.toolInfo}>
            <Text style={styles.toolTitle}>Skills Assessment</Text>
            <Text style={styles.toolDescription}>Discover your strengths</Text>
          </View>
          <ChevronRight size={20} color="#C7C7CC" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderExamsTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Exams</Text>
        {upcomingExams.map((exam) => (
          <TouchableOpacity key={exam.id} style={styles.examCard} activeOpacity={0.7}>
            <View style={[styles.examIndicator, { backgroundColor: exam.color }]} />
            <View style={styles.examContent}>
              <Text style={styles.examName}>{exam.name}</Text>
              <Text style={styles.examDate}>{exam.date}</Text>
            </View>
            <View style={styles.examCountdown}>
              <Text style={[styles.examDays, { color: exam.color }]}>{exam.daysLeft}</Text>
              <Text style={styles.examLabel}>days left</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Exam Preparation</Text>
        <TouchableOpacity style={styles.prepCard} activeOpacity={0.7}>
          <View style={[styles.prepIconContainer, { backgroundColor: '#5856D615' }]}>
            <BookOpen size={24} color="#5856D6" strokeWidth={2} />
          </View>
          <View style={styles.prepInfo}>
            <Text style={styles.prepTitle}>Study Materials</Text>
            <Text style={styles.prepDescription}>Access practice tests & guides</Text>
          </View>
          <ChevronRight size={20} color="#C7C7CC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.prepCard} activeOpacity={0.7}>
          <View style={[styles.prepIconContainer, { backgroundColor: '#FF950015' }]}>
            <Calendar size={24} color="#FF9500" strokeWidth={2} />
          </View>
          <View style={styles.prepInfo}>
            <Text style={styles.prepTitle}>Study Schedule</Text>
            <Text style={styles.prepDescription}>Create your preparation plan</Text>
          </View>
          <ChevronRight size={20} color="#C7C7CC" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderResourcesTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Download Resources</Text>
        {resources.map((resource) => (
          <TouchableOpacity key={resource.id} style={styles.resourceCard} activeOpacity={0.7}>
            <View style={[styles.resourceIconContainer, { backgroundColor: '#007AFF15' }]}>
              <resource.icon size={24} color="#007AFF" strokeWidth={2} />
            </View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceMeta}>
                {resource.type} • {resource.size}
              </Text>
            </View>
            <ChevronRight size={20} color="#C7C7CC" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Video Tutorials</Text>
        <TouchableOpacity style={styles.videoCard} activeOpacity={0.7}>
          <View style={styles.videoThumbnail}>
            <MessageCircle size={32} color="#FFFFFF" strokeWidth={2} />
          </View>
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>How to Apply to IITs</Text>
            <Text style={styles.videoDuration}>12:45</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.videoCard} activeOpacity={0.7}>
          <View style={styles.videoThumbnail}>
            <BookOpen size={32} color="#FFFFFF" strokeWidth={2} />
          </View>
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>Document Preparation Guide</Text>
            <Text style={styles.videoDuration}>8:30</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <tab.icon
              size={20}
              color={activeTab === tab.id ? '#007AFF' : '#8E8E93'}
              strokeWidth={2}
            />
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {activeTab === 'career' && renderCareerTab()}
      {activeTab === 'exams' && renderExamsTab()}
      {activeTab === 'resources' && renderResourcesTab()}
      {activeTab === 'chat' && renderChatTab()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#C6C6C8',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8E8E93',
  },
  activeTabLabel: {
    color: '#007AFF',
  },
  tabContent: {
    flex: 1,
  },
  // Chat Tab Styles
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  chatContent: {
    paddingBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  userMessage: {
    flexDirection: 'row-reverse',
  },
  botMessage: {
    flexDirection: 'row',
  },
  messageIconContainer: {
    width: 32,
    height: 32,
  },
  botIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  botBubble: {
    backgroundColor: '#FFFFFF',
  },
  userBubble: {
    backgroundColor: '#007AFF',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  botText: {
    color: '#000000',
  },
  userText: {
    color: '#FFFFFF',
  },
  quickQuestionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#C6C6C8',
  },
  quickQuestionsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quickQuestions: {
    flexDirection: 'row',
  },
  quickQuestionChip: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  quickQuestionText: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#C6C6C8',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#000000',
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#F2F2F7',
  },
  // Career Tab Styles
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  careerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  careerCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    position: 'relative',
  },
  careerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  careerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  careerColleges: {
    fontSize: 13,
    color: '#8E8E93',
  },
  careerArrow: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  toolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  toolIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolInfo: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  toolDescription: {
    fontSize: 13,
    color: '#8E8E93',
  },
  // Exams Tab Styles
  examCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    gap: 16,
  },
  examIndicator: {
    width: 4,
    height: 48,
    borderRadius: 2,
  },
  examContent: {
    flex: 1,
  },
  examName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  examDate: {
    fontSize: 13,
    color: '#8E8E93',
  },
  examCountdown: {
    alignItems: 'center',
  },
  examDays: {
    fontSize: 24,
    fontWeight: '700',
  },
  examLabel: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 2,
  },
  prepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  prepIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prepInfo: {
    flex: 1,
  },
  prepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  prepDescription: {
    fontSize: 13,
    color: '#8E8E93',
  },
  // Resources Tab Styles
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  resourceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  resourceMeta: {
    fontSize: 13,
    color: '#8E8E93',
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  videoThumbnail: {
    width: 100,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  videoDuration: {
    fontSize: 13,
    color: '#8E8E93',
  },
});
