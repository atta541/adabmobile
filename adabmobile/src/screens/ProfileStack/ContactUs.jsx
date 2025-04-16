import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(1);

  const branches = [
    {
      name: 'Main Branch',
      location: '123 Main Street, Lahore',
      timings: 'Mon-Sun, 10:00 AM - 11:00 PM',
      phone: '+92 300 1234567',
    },
    {
      name: 'Downtown Branch',
      location: '45 Downtown Avenue, Lahore',
      timings: 'Mon-Sun, 11:00 AM - 12:00 AM',
      phone: '+92 300 7654321',
    },
    {
      name: 'Gulberg Branch',
      location: '78 Gulberg Boulevard, Lahore',
      timings: 'Mon-Sun, 9:00 AM - 10:00 PM',
      phone: '+92 300 9876543',
    },
  ];

  const handleSubmit = () => {
    console.log({
      name,
      email,
      message,
      branch: branches[selectedBranch].name,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Branch Selector */}
      <View style={styles.branchSelector}>
        {branches.map((branch, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.branchTab,
              selectedBranch === index && styles.selectedBranchTab,
            ]}
            onPress={() => setSelectedBranch(index)}
          >
            <Text
              style={[
                styles.branchTabText,
                selectedBranch === index && styles.selectedBranchTabText,
              ]}
            >
              {branch.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contact Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Send us a message</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Your Name</Text>
            <TextInput
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Your Email</Text>
            <TextInput
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Your Message</Text>
            <TextInput
              placeholder="How can we help you?"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              style={[styles.input, styles.textArea]}
              placeholderTextColor="#888"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>SEND MESSAGE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Restaurant Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoHeader}>{branches[selectedBranch].name}</Text>

        {/* Location (Google Maps) */}
        <TouchableOpacity
          style={styles.infoItem}
          onPress={() =>
            Linking.openURL(
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                branches[selectedBranch].location
              )}`
            )
          }
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📍</Text>
          </View>
          <Text style={styles.infoText}>{branches[selectedBranch].location}</Text>
        </TouchableOpacity>

        {/* Timings */}
        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>⏰</Text>
          </View>
          <Text style={styles.infoText}>{branches[selectedBranch].timings}</Text>
        </View>

        {/* Phone (Call) */}
        <TouchableOpacity
          style={styles.infoItem}
          onPress={() =>
            Linking.openURL(`tel:${branches[selectedBranch].phone}`)
          }
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📞</Text>
          </View>
          <Text style={styles.infoText}>{branches[selectedBranch].phone}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2023 Your Restaurant. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1C',
    flex: 1,
  },
  branchSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
  },
  branchTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  selectedBranchTab: {
    backgroundColor: '#000',
  },
  branchTabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  selectedBranchTabText: {
    color: '#fff',
  },
  formContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
  },
  form: {
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: 'white',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#fafafa',
    color: '#000',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FF0000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  infoSection: {
    backgroundColor: '#1C1C1C',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
  },
  infoText: {
    fontSize: 15,
    color: 'white',
    flex: 1,
  },
  footer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12, 
    color: 'white',
  },
});
