import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Home, School, BookOpen, FileText, Calendar, Award, MessageCircle, Globe, TrendingUp, Bell, ChevronRight } from 'lucide-react-native';

export default function DashboardScreen({ navigation }: any) {
  const quickActions = [
    { id: 1, title: 'Browse Schools', icon: School, color: '#007AFF', screen: 'Schools' },
    { id: 2, title: 'Documents', icon: FileText, color: '#FF9500', screen: 'Documents', badge: '3' },
    { id: 3, title: 'Deadlines', icon: Calendar, color: '#FF3B30', screen: 'Deadlines', badge: '2' },
    { id: 4, title: 'AI Guidance', icon: MessageCircle, color: '#34C759', screen: 'Assistant' },
    { id: 5, title: 'Career Guide', icon: Award, color: '#5856D6', screen: 'Career' },
    { id: 6, title: 'Browser', icon: Globe, color: '#007AFF', screen: 'Browser' },
  ];

  const stats = [
    { label: 'Applications', value: '12', color: '#007AFF', trend: '+2', icon: School },
    { label: 'Accepted', value: '3', color: '#34C759', trend: '+1', icon: Award },
    { label: 'Pending', value: '6', color: '#FF9500', trend: '0', icon: Calendar },
    { label: 'Interviews', value: '2', color: '#5856D6', trend: '+1', icon: TrendingUp },
  ];

  const recentActivity = [
    { id: 1, title: 'Application submitted to IIT Bombay', time: '2 hours ago', icon: School, color: '#007AFF' },
    { id: 2, title: 'Document verified: 10th Marksheet', time: '5 hours ago', icon: FileText, color: '#34C759' },
    { id: 3, title: 'Deadline approaching: BITS Pilani', time: '1 day left', icon: Calendar, color: '#FF3B30' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome Back! 👋</Text>
          <Text style={styles.subtitle}>Let's continue your journey</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#007AFF" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        style={styles.statsScrollView}
        contentContainerStyle={styles.statsContainer}
      >
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: stat.color + '15' }]}>
              <stat.icon size={20} color={stat.color} strokeWidth={2} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
            {stat.trend !== '0' && (
              <View style={[styles.trendBadge, { backgroundColor: stat.color + '15' }]}>
                <Text style={[styles.trendText, { color: stat.color }]}>{stat.trend}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionCard}
              onPress={() => navigation.navigate(action.screen)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: action.color + '15' }]}>
                <action.icon size={24} color={action.color} strokeWidth={2} />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
              {action.badge && (
                <View style={[styles.badge, { backgroundColor: action.color }]}>
                  <Text style={styles.badgeText}>{action.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activityList}>
          {recentActivity.map((activity) => (
            <TouchableOpacity key={activity.id} style={styles.activityCard} activeOpacity={0.7}>
              <View style={[styles.activityIconContainer, { backgroundColor: activity.color + '15' }]}>
                <activity.icon size={20} color={activity.color} strokeWidth={2} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
              <ChevronRight size={20} color="#C7C7CC" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#F2F2F7',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  greeting: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: 0.4,
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
  },
  statsScrollView: {
    marginVertical: 12,
  },
  statsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    minWidth: 160,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  trendBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '700',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#007AFF',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    gap: 12,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 13,
    color: '#8E8E93',
  },
  // Old styles kept for compatibility
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginTop: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
});
