import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Calendar, MapPin, ExternalLink, Clock, AlertCircle, CheckCircle, FileText, Award } from 'lucide-react-native';

interface Application {
  id: number;
  name: string;
  type: string;
  deadline: string;
  daysLeft: number;
  fee: string;
  status: 'open' | 'closing-soon' | 'closed';
  url: string;
  description: string;
  eligibility: string;
  icon: string;
}

export default function ApplicationAssistantScreen({ navigation }: any) {
  const applications: Application[] = [
    {
      id: 1,
      name: 'JEE Main 2024',
      type: 'Engineering Entrance',
      deadline: 'Jan 31, 2024',
      daysLeft: 15,
      fee: '₹1,000',
      status: 'closing-soon',
      url: 'https://jeemain.nta.nic.in',
      description: 'Joint Entrance Examination for admission to NITs, IIITs, and other engineering colleges',
      eligibility: 'Class 12 Pass with 75% in PCM',
      icon: '🎓',
    },
    {
      id: 2,
      name: 'JEE Advanced 2024',
      type: 'Engineering Entrance',
      deadline: 'May 12, 2024',
      daysLeft: 135,
      fee: '₹2,800',
      status: 'open',
      url: 'https://jeeadv.ac.in',
      description: 'IIT entrance examination for admission to 23 IITs across India',
      eligibility: 'JEE Main qualified with top 2.5 lakh rank',
      icon: '🏆',
    },
    {
      id: 3,
      name: 'BITSAT 2024',
      type: 'University Entrance',
      deadline: 'Mar 20, 2024',
      daysLeft: 48,
      fee: '₹3,400',
      status: 'open',
      url: 'https://www.bitsadmission.com',
      description: 'BITS Pilani entrance test for admission to all BITS campuses',
      eligibility: 'Class 12 with 75% aggregate in PCM',
      icon: '🎯',
    },
    {
      id: 4,
      name: 'VITEEE 2024',
      type: 'University Entrance',
      deadline: 'Feb 28, 2024',
      daysLeft: 28,
      fee: '₹1,150',
      status: 'open',
      url: 'https://viteee.vit.ac.in',
      description: 'VIT Engineering Entrance Examination for VIT campuses',
      eligibility: 'Class 12 with 60% in PCM',
      icon: '📚',
    },
    {
      id: 5,
      name: 'SRMJEEE 2024',
      type: 'University Entrance',
      deadline: 'Mar 15, 2024',
      daysLeft: 43,
      fee: '₹1,100',
      status: 'open',
      url: 'https://applications.srmist.edu.in',
      description: 'SRM Joint Engineering Entrance Exam for SRM University',
      eligibility: 'Class 12 Pass in PCM',
      icon: '🔬',
    },
    {
      id: 6,
      name: 'COMEDK UGET 2024',
      type: 'Engineering Entrance',
      deadline: 'Apr 10, 2024',
      daysLeft: 69,
      fee: '₹1,800',
      status: 'open',
      url: 'https://www.comedk.org',
      description: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka',
      eligibility: 'Karnataka domicile with 45% in PCM',
      icon: '🏛️',
    },
  ];

  const handleApply = (app: Application) => {
    // Navigate to browser screen with the URL
    navigation.navigate('Account', {
      screen: 'Browser',
      params: { url: app.url }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return '#34C759';
      case 'closing-soon':
        return '#FF9500';
      case 'closed':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'closing-soon':
        return 'Closing Soon';
      case 'closed':
        return 'Closed';
      default:
        return 'Unknown';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Apply Now</Text>
          <Text style={styles.subtitle}>Start your college applications</Text>
        </View>
      </View>

      {/* Applications List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Applications</Text>
          <Text style={styles.sectionSubtitle}>{applications.length} exams open for registration</Text>
        </View>

        {applications.map((app) => (
          <View key={app.id} style={styles.applicationCard}>
            {/* Status Badge */}
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(app.status) + '15' }]}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(app.status) }]} />
              <Text style={[styles.statusText, { color: getStatusColor(app.status) }]}>
                {getStatusText(app.status)}
              </Text>
            </View>

            {/* Header */}
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <Text style={styles.examIcon}>{app.icon}</Text>
                <View style={styles.cardHeaderInfo}>
                  <Text style={styles.examName}>{app.name}</Text>
                  <Text style={styles.examType}>{app.type}</Text>
                </View>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.description}>{app.description}</Text>

            {/* Details Row */}
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Calendar size={16} color="#8E8E93" />
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>Deadline</Text>
                  <Text style={styles.detailValue}>{app.deadline}</Text>
                </View>
              </View>
              <View style={styles.detailItem}>
                <Clock size={16} color="#8E8E93" />
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>Days Left</Text>
                  <Text style={[styles.detailValue, { color: app.daysLeft <= 20 ? '#FF3B30' : '#000000' }]}>
                    {app.daysLeft}
                  </Text>
                </View>
              </View>
            </View>

            {/* Info Boxes */}
            <View style={styles.infoBoxes}>
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxLabel}>Application Fee</Text>
                <Text style={styles.infoBoxValue}>{app.fee}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxLabel}>Eligibility</Text>
                <Text style={styles.infoBoxValue} numberOfLines={2}>{app.eligibility}</Text>
              </View>
            </View>

            {/* Apply Button */}
            <TouchableOpacity 
              style={[styles.applyButton, app.status === 'closed' && styles.applyButtonDisabled]}
              onPress={() => handleApply(app)}
              disabled={app.status === 'closed'}
              activeOpacity={0.7}
            >
              <Text style={styles.applyButtonText}>
                {app.status === 'closed' ? 'Application Closed' : 'Apply Now'}
              </Text>
              {app.status !== 'closed' && <ExternalLink size={18} color="#FFFFFF" />}
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>More applications coming soon!</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#8E8E93',
  },
  applicationCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  examIcon: {
    fontSize: 36,
    marginRight: 12,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  examName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  examType: {
    fontSize: 14,
    color: '#8E8E93',
  },
  description: {
    fontSize: 14,
    color: '#3C3C43',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    marginLeft: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  infoBoxes: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 12,
  },
  infoBoxLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  infoBoxValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  applyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  applyButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footer: {
    padding: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});
