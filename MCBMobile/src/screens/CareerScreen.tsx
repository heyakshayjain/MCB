import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Target, Rocket, Code, Briefcase, Heart, TrendingUp } from 'lucide-react-native';

export default function CareerScreen() {
  const careerPaths = [
    {
      id: 1,
      title: 'IIT Engineering Path',
      icon: Target,
      color: '#3B82F6',
      duration: '4 Years',
      difficulty: 'High',
      description: 'Complete roadmap to crack JEE and get into top IITs',
    },
    {
      id: 2,
      title: 'Software Engineer',
      icon: Code,
      color: '#6B7280',
      duration: '4-6 Years',
      difficulty: 'Medium',
      description: 'Build a career in software development and tech',
    },
    {
      id: 3,
      title: 'Pilot Career',
      icon: Rocket,
      color: '#3B82F6',
      duration: '2-3 Years',
      difficulty: 'High',
      description: 'Navigate the path to becoming a commercial pilot',
    },
    {
      id: 4,
      title: 'Business & MBA',
      icon: Briefcase,
      color: '#6B7280',
      duration: '5-6 Years',
      difficulty: 'Medium',
      description: 'Business management and MBA preparation',
    },
  ];

  const upcomingExams = [
    { name: 'JEE Main 2025', date: 'Jan 24-31, 2025', days: '21 days' },
    { name: 'JEE Advanced 2025', date: 'May 18, 2025', days: '166 days' },
    { name: 'BITSAT 2025', date: 'May-June 2025', days: '150+ days' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Career Guidance</Text>
        <Text style={styles.subtitle}>Explore your future career paths</Text>
      </View>

      {/* Upcoming Exams */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Exams</Text>
        {upcomingExams.map((exam, index) => (
          <View key={index} style={styles.examCard}>
            <View style={styles.examInfo}>
              <Text style={styles.examName}>{exam.name}</Text>
              <Text style={styles.examDate}>{exam.date}</Text>
            </View>
            <View style={styles.countdownBadge}>
              <Text style={styles.countdownText}>{exam.days}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Career Paths */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Career Roadmaps</Text>
        {careerPaths.map((path) => (
          <TouchableOpacity key={path.id} style={styles.careerCard}>
            <View style={[styles.iconCircle, { backgroundColor: path.color + '20' }]}>
              <path.icon size={24} color={path.color} />
            </View>
            <View style={styles.careerContent}>
              <Text style={styles.careerTitle}>{path.title}</Text>
              <Text style={styles.careerDescription}>{path.description}</Text>
              <View style={styles.careerMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Duration:</Text>
                  <Text style={styles.metaValue}>{path.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Difficulty:</Text>
                  <Text style={styles.metaValue}>{path.difficulty}</Text>
                </View>
              </View>
            </View>
            <View style={styles.arrow}>
              <Text style={styles.arrowText}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Resources */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resources</Text>
        <TouchableOpacity style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>📚 Study Materials</Text>
          <Text style={styles.resourceDesc}>Access curated study resources</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>🎯 Practice Tests</Text>
          <Text style={styles.resourceDesc}>Take mock tests and assessments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>👨‍🏫 Mentorship</Text>
          <Text style={styles.resourceDesc}>Connect with experienced mentors</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  examCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  examInfo: {
    flex: 1,
  },
  examName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  examDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  countdownBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countdownText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  careerCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  careerContent: {
    flex: 1,
  },
  careerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  careerDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  careerMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
  },
  metaLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginRight: 4,
  },
  metaValue: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '600',
  },
  arrow: {
    marginLeft: 8,
  },
  arrowText: {
    fontSize: 24,
    color: '#D1D5DB',
  },
  resourceCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  resourceDesc: {
    fontSize: 14,
    color: '#6B7280',
  },
});
