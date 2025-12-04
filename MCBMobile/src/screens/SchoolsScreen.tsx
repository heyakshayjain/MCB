import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Search, MapPin, TrendingUp, IndianRupee } from 'lucide-react-native';

interface School {
  id: number;
  name: string;
  location: string;
  type: string;
  ranking: number;
  acceptance: string;
  fees: string;
  avgPackage: string;
}

export default function SchoolsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const schools: School[] = [
    {
      id: 1,
      name: 'IIT Bombay',
      location: 'Mumbai, Maharashtra',
      type: 'IIT',
      ranking: 1,
      acceptance: '2.5%',
      fees: '₹2.5L/year',
      avgPackage: '₹16LPA',
    },
    {
      id: 2,
      name: 'IIT Delhi',
      location: 'New Delhi',
      type: 'IIT',
      ranking: 2,
      acceptance: '2.8%',
      fees: '₹2.5L/year',
      avgPackage: '₹15LPA',
    },
    {
      id: 3,
      name: 'BITS Pilani',
      location: 'Pilani, Rajasthan',
      type: 'Private',
      ranking: 8,
      acceptance: '2.5%',
      fees: '₹4.5L/year',
      avgPackage: '₹15LPA',
    },
    {
      id: 4,
      name: 'NIT Trichy',
      location: 'Tiruchirappalli, Tamil Nadu',
      type: 'NIT',
      ranking: 9,
      acceptance: '1.5%',
      fees: '₹1.5L/year',
      avgPackage: '₹12LPA',
    },
  ];

  const filters = ['all', 'IIT', 'NIT', 'IIIT', 'Private'];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'IIT': return '#111827';
      case 'NIT': return '#3B82F6';
      case 'Private': return '#6B7280';
      default: return '#9CA3AF';
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search universities..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Filters */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.filters}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Schools List */}
      <ScrollView style={styles.scrollView}>
        {schools.map((school) => (
          <TouchableOpacity key={school.id} style={styles.schoolCard}>
            <View style={styles.schoolHeader}>
              <View style={styles.schoolIcon}>
                <Text style={styles.schoolIconText}>{school.name.substring(0, 2)}</Text>
              </View>
              <View style={styles.schoolInfo}>
                <Text style={styles.schoolName}>{school.name}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={14} color="#6B7280" />
                  <Text style={styles.locationText}>{school.location}</Text>
                </View>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: getTypeColor(school.type) + '20' }]}>
                <Text style={[styles.typeText, { color: getTypeColor(school.type) }]}>
                  {school.type}
                </Text>
              </View>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Ranking</Text>
                <Text style={styles.statValue}>#{school.ranking}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Acceptance</Text>
                <Text style={styles.statValue}>{school.acceptance}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Fees</Text>
                <Text style={styles.statValue}>{school.fees}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Avg Package</Text>
                <Text style={styles.statValue}>{school.avgPackage}</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Apply Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
  searchContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filters: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#111827',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  schoolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  schoolHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  schoolIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  schoolIconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  schoolInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    height: 24,
  },
  typeText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
});
