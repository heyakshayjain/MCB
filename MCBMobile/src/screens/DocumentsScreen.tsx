import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FileText, Download, Upload, Eye, Calendar } from 'lucide-react-native';

export default function DocumentsScreen() {
  const documents = [
    {
      id: 1,
      name: 'JEE Admit Card',
      type: 'PDF',
      size: '2.4 MB',
      date: '2024-12-01',
      status: 'Verified',
    },
    {
      id: 2,
      name: 'Class 12 Marksheet',
      type: 'PDF',
      size: '1.8 MB',
      date: '2024-11-28',
      status: 'Verified',
    },
    {
      id: 3,
      name: 'Aadhar Card',
      type: 'PDF',
      size: '0.9 MB',
      date: '2024-11-25',
      status: 'Pending',
    },
    {
      id: 4,
      name: 'Income Certificate',
      type: 'PDF',
      size: '1.2 MB',
      date: '2024-11-20',
      status: 'Verified',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return '#10B981';
      case 'Pending': return '#F59E0B';
      case 'Rejected': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Documents</Text>
        <Text style={styles.subtitle}>Manage your application documents</Text>
      </View>

      {/* Upload Button */}
      <View style={styles.uploadSection}>
        <TouchableOpacity style={styles.uploadButton}>
          <Upload size={20} color="#FFFFFF" />
          <Text style={styles.uploadButtonText}>Upload New Document</Text>
        </TouchableOpacity>
      </View>

      {/* Documents List */}
      <ScrollView style={styles.scrollView}>
        {documents.map((doc) => (
          <View key={doc.id} style={styles.docCard}>
            <View style={styles.docIcon}>
              <FileText size={24} color="#3B82F6" />
            </View>
            <View style={styles.docInfo}>
              <Text style={styles.docName}>{doc.name}</Text>
              <View style={styles.docMeta}>
                <Text style={styles.docSize}>{doc.size}</Text>
                <Text style={styles.docDivider}>•</Text>
                <Text style={styles.docDate}>{doc.date}</Text>
              </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(doc.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(doc.status) }]}>
                {doc.status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton}>
          <Eye size={20} color="#6B7280" />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Download size={20} color="#6B7280" />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Upload size={20} color="#6B7280" />
          <Text style={styles.actionText}>Upload</Text>
        </TouchableOpacity>
      </View>
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
  uploadSection: {
    padding: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  docIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  docMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docSize: {
    fontSize: 12,
    color: '#6B7280',
  },
  docDivider: {
    fontSize: 12,
    color: '#D1D5DB',
    marginHorizontal: 6,
  },
  docDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 12,
    paddingBottom: 32,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});
