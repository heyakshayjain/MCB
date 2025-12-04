import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { User, Mail, Phone, MapPin, GraduationCap, Settings, Bell, Lock, HelpCircle, LogOut, Crown, Award, Calendar, Globe, FileText, ChevronRight } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

export default function AccountScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          }
        },
      ]
    );
  };

  const profileInfo = {
    name: 'Akshay Jain',
    email: user?.email || 'akshay@example.com',
    phone: '+91 98765 43210',
    class: 'Class 12 - Science',
    school: 'Delhi Public School',
    isPremium: true,
  };

  const menuSections = [
    {
      title: 'Application Tools',
      items: [
        { icon: FileText, label: 'Documents', screen: 'Documents', isPremium: false, hasToggle: false, color: '#007AFF' },
        { icon: Calendar, label: 'Deadlines', screen: 'Deadlines', isPremium: false, hasToggle: false, color: '#FF3B30' },
        { icon: Award, label: 'Career Guide', screen: 'Career', isPremium: false, hasToggle: false, color: '#007AFF' },
        { icon: Globe, label: 'Premium Browser', screen: 'Browser', isPremium: true, hasToggle: false, color: '#FF9500' },
      ],
    },
    {
      title: 'Profile',
      items: [
        { icon: User, label: 'Edit Profile', screen: 'EditProfile', isPremium: false, hasToggle: false, color: '#8E8E93' },
        { icon: GraduationCap, label: 'Academic Details', screen: 'Academic', isPremium: false, hasToggle: false, color: '#8E8E93' },
        { icon: Crown, label: 'Premium Subscription', screen: 'Premium', isPremium: true, hasToggle: false, color: '#FF9500' },
      ],
    },
    {
      title: 'Settings',
      items: [
        { icon: Bell, label: 'Notifications', hasToggle: true, screen: '', isPremium: false, color: '#8E8E93' },
        { icon: Settings, label: 'App Settings', screen: 'Settings', isPremium: false, hasToggle: false, color: '#8E8E93' },
        { icon: Lock, label: 'Privacy & Security', screen: 'Privacy', isPremium: false, hasToggle: false, color: '#8E8E93' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', screen: 'Help', isPremium: false, hasToggle: false, color: '#8E8E93' },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>More</Text>
        <Text style={styles.subtitle}>Quick access & settings</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AJ</Text>
          </View>
          {profileInfo.isPremium && (
            <View style={styles.premiumBadge}>
              <Crown size={14} color="#FFFFFF" />
            </View>
          )}
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profileInfo.name}</Text>
          {profileInfo.isPremium && (
            <View style={styles.premiumLabel}>
              <Crown size={12} color="#F59E0B" />
              <Text style={styles.premiumText}>Premium Member</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Mail size={18} color="#6B7280" />
          <Text style={styles.detailText}>{profileInfo.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Phone size={18} color="#6B7280" />
          <Text style={styles.detailText}>{profileInfo.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <GraduationCap size={18} color="#6B7280" />
          <Text style={styles.detailText}>{profileInfo.class}</Text>
        </View>
        <View style={styles.detailRow}>
          <MapPin size={18} color="#6B7280" />
          <Text style={styles.detailText}>{profileInfo.school}</Text>
        </View>
      </View>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
          <View style={styles.menuCard}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[
                  styles.menuItem,
                  itemIndex !== section.items.length - 1 && styles.menuItemBorder,
                ]}
                onPress={() => item.screen && navigation.navigate(item.screen)}
                activeOpacity={0.6}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                    <item.icon size={22} color={item.color} strokeWidth={2} />
                  </View>
                  <Text style={styles.menuItemText}>{item.label}</Text>
                  {item.isPremium && (
                    <View style={styles.premiumBadgeSmall}>
                      <Text style={styles.premiumBadgeText}>PRO</Text>
                    </View>
                  )}
                </View>
                {item.hasToggle ? (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                    thumbColor="#FFFFFF"
                    ios_backgroundColor="#E5E5EA"
                  />
                ) : (
                  <ChevronRight size={20} color="#C7C7CC" strokeWidth={2.5} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.6} onPress={handleLogout}>
        <LogOut size={20} color="#FF3B30" strokeWidth={2} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>MCB Version 1.0.0</Text>
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#F2F2F7',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 0.4,
  },
  subtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  premiumBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF9500',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  premiumLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  premiumText: {
    fontSize: 13,
    color: '#FF9500',
    fontWeight: '500',
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007AFF',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 10,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#111827',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#8E8E93',
    marginBottom: 8,
    paddingLeft: 16,
    letterSpacing: -0.08,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    paddingVertical: 14,
    minHeight: 44,
  },
  menuItemBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#C6C6C8',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  premiumBadgeSmall: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  menuItemText: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '400',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
    padding: 14,
    borderRadius: 10,
    gap: 8,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FF3B30',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 13,
    color: '#8E8E93',
  },
});
