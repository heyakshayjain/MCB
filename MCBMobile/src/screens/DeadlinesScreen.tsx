import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar, Clock, AlertCircle } from 'lucide-react-native';

export default function DeadlinesScreen() {
  const deadlines = [
    {
      id: 1,
      college: 'IIT Bombay',
      task: 'Application Submission',
      date: '2025-01-15',
      daysLeft: 13,
      priority: 'high',
    },
    {
      id: 2,
      college: 'BITS Pilani',
      task: 'Document Upload',
      date: '2025-01-20',
      daysLeft: 18,
      priority: 'medium',
    },
    {
      id: 3,
      college: 'NIT Trichy',
      task: 'Fee Payment',
      date: '2025-01-25',
      daysLeft: 23,
      priority: 'medium',
    },
    {
      id: 4,
      college: 'IIIT Hyderabad',
      task: 'Application Form',
      date: '2025-02-01',
      daysLeft: 30,
      priority: 'low',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getPriorityLabel = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Deadlines</Text>
        <Text style={styles.subtitle}>Track important dates</Text>
      </View>

      {/* Summary Cards */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.summarySection}>
        <View style={[styles.summaryCard, { borderLeftColor: '#EF4444' }]}>
          <Text style={styles.summaryValue}>2</Text>
          <Text style={styles.summaryLabel}>Urgent</Text>
        </View>
        <View style={[styles.summaryCard, { borderLeftColor: '#F59E0B' }]}>
          <Text style={styles.summaryValue}>3</Text>
          <Text style={styles.summaryLabel}>This Week</Text>
        </View>
        <View style={[styles.summaryCard, { borderLeftColor: '#10B981' }]}>
          <Text style={styles.summaryValue}>5</Text>
          <Text style={styles.summaryLabel}>This Month</Text>
        </View>
      </ScrollView>

      {/* Deadlines List */}
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
        {deadlines.map((deadline) => (
          <View key={deadline.id} style={styles.deadlineCard}>
            <View style={[styles.priorityBar, { backgroundColor: getPriorityColor(deadline.priority) }]} />
            <View style={styles.deadlineContent}>
              <View style={styles.deadlineHeader}>
                <Text style={styles.collegeName}>{deadline.college}</Text>
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(deadline.priority) + '20' }]}>
                  <Text style={[styles.priorityText, { color: getPriorityColor(deadline.priority) }]}>
                    {getPriorityLabel(deadline.priority)}
                  </Text>
                </View>
              </View>
              <Text style={styles.taskName}>{deadline.task}</Text>
              <View style={styles.deadlineFooter}>
                <View style={styles.dateRow}>
                  <Calendar size={14} color="#6B7280" />
                  <Text style={styles.dateText}>{deadline.date}</Text>
                </View>
                <View style={[styles.daysLeftBadge, { backgroundColor: deadline.daysLeft <= 7 ? '#FEE2E2' : '#EFF6FF' }]}>
                  <Clock size={12} color={deadline.daysLeft <= 7 ? '#EF4444' : '#3B82F6'} />
                  <Text style={[styles.daysLeftText, { color: deadline.daysLeft <= 7 ? '#EF4444' : '#3B82F6' }]}>
                    {deadline.daysLeft} days left
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
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
  summarySection: {
    padding: 16,
    flexDirection: 'row',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 120,
    borderLeftWidth: 4,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  deadlineCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  priorityBar: {
    width: 4,
  },
  deadlineContent: {
    flex: 1,
    padding: 16,
  },
  deadlineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  collegeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  taskName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  deadlineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  daysLeftBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  daysLeftText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
