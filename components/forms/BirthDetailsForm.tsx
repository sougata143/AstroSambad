import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View, Platform, Pressable, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocationSearch } from './LocationSearch';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import type { BirthDetails } from '@/types/birthDetails';
import { Theme } from '@/constants/Theme';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

interface Props {
  onSubmit: (details: BirthDetails) => void;
}

export function BirthDetailsForm({ onSubmit }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<BirthDetails>>({
    preferredLanguage: 'en',
    dateOfBirth: new Date(),
    timeOfBirth: new Date().toLocaleTimeString(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [timeInputValue, setTimeInputValue] = useState(formData.timeOfBirth || '');

  const handleSubmit = async () => {
    if (isValidForm()) {
      onSubmit(formData as BirthDetails);
      
      // Store birth details in AsyncStorage for persistence
      await AsyncStorage.setItem('birthDetails', JSON.stringify(formData));
      
      // First navigate to horoscope page
      router.push({
        pathname: '/(tabs)/horoscope',
        params: { birthDetails: JSON.stringify(formData) },
      });

      // Wait a bit before updating other tabs to ensure data is stored
      setTimeout(() => {
        // Update lagna and predictions pages in the background
        router.setParams({ birthDetails: JSON.stringify(formData) });
      }, 500);
    }
  };

  const isValidForm = (): boolean => {
    console.log('Form Data:', formData);
    return !!(
      formData.name?.trim() &&
      formData.dateOfBirth &&
      formData.timeOfBirth &&
      formData.birthPlace &&
      formData.gender
    );
  };

  const formatTimeString = (timeStr: string): string => {
    // Remove all non-numeric characters except colon
    const cleaned = timeStr.replace(/[^\d:]/g, '');
    
    // Format as HH:mm:ss
    const match = cleaned.match(/^(\d{0,2}):?(\d{0,2}):?(\d{0,2})$/);
    if (!match) return cleaned;

    let [, hours, minutes, seconds] = match;
    
    // Validate hours
    if (hours) {
      const numHours = parseInt(hours, 10);
      if (numHours > 23) hours = '23';
    }
    
    // Validate minutes
    if (minutes) {
      const numMinutes = parseInt(minutes, 10);
      if (numMinutes > 59) minutes = '59';
    }

    // Validate seconds
    if (seconds) {
      const numSeconds = parseInt(seconds, 10);
      if (numSeconds > 59) seconds = '59';
    }

    if (!minutes) return hours;
    if (!seconds) return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  };

  const validateAndSetTime = (timeStr: string): boolean => {
    const [hours, minutes, seconds = '00'] = timeStr.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || 
        hours < 0 || hours > 23 || 
        minutes < 0 || minutes > 59 ||
        seconds < 0 || seconds > 59) {
      return false;
    }

    // Format time in 24-hour format with seconds
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    setFormData({
      ...formData,
      timeOfBirth: formattedTime
    });
    return true;
  };

  const handleTimeInputBlur = () => {
    const isValid = validateAndSetTime(timeInputValue);
    if (!isValid) {
      // Reset to previous valid time if invalid
      setTimeInputValue(formData.timeOfBirth || '00:00:00');
    }
    setIsEditingTime(false);
  };

  const handleTimeInputFocus = () => {
    setIsEditingTime(true);
    setTimeInputValue(formData.timeOfBirth || '');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Card style={styles.formCard}>
          <Input
            label="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter your name"
          />

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Date of Birth</ThemedText>
            <Pressable 
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}>
              <ThemedText style={styles.dateButtonText}>
                {formData.dateOfBirth?.toLocaleDateString()}
              </ThemedText>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={formData.dateOfBirth || new Date()}
                mode="date"
                onChange={(event, date) => {
                  setShowDatePicker(Platform.OS === 'ios');
                  if (date) {
                    setFormData({ ...formData, dateOfBirth: date });
                  }
                }}
              />
            )}
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Time of Birth</ThemedText>
            {isEditingTime ? (
              <TextInput
                style={[styles.input, styles.timeInput]}
                value={timeInputValue}
                onChangeText={(text) => setTimeInputValue(formatTimeString(text))}
                onBlur={handleTimeInputBlur}
                placeholder="HH:mm:ss (24-hour)"
                keyboardType="numbers-and-punctuation"
                maxLength={8}
                autoFocus
              />
            ) : (
              <Pressable 
                style={styles.dateButton}
                onPress={handleTimeInputFocus}>
                <ThemedText style={styles.dateButtonText}>
                  {formData.timeOfBirth || 'Select Time'}
                </ThemedText>
              </Pressable>
            )}
            {Platform.OS !== 'web' && showTimePicker && (
              <DateTimePicker
                value={new Date(`2000-01-01T${formData.timeOfBirth || '00:00:00'}`)}
                mode="time"
                onChange={(event, date) => {
                  setShowTimePicker(Platform.OS === 'ios');
                  if (date) {
                    setFormData({ 
                      ...formData, 
                      timeOfBirth: date.toLocaleTimeString([], { 
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                      })
                    });
                  }
                }}
              />
            )}
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Gender</ThemedText>
            <View style={styles.genderButtons}>
              {[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' }
              ].map(({ value, label }) => (
                <Pressable
                  key={value}
                  style={[
                    styles.genderButton,
                    formData.gender === value && styles.genderButtonSelected,
                  ]}
                  onPress={() => setFormData({ ...formData, gender: value as BirthDetails['gender'] })}>
                  <ThemedText
                    style={[
                      styles.genderButtonText,
                      formData.gender === value && styles.genderButtonTextSelected,
                    ]}>
                    {label}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          <LocationSearch
            onLocationSelect={(location) =>
              setFormData({ ...formData, birthPlace: location })
            }
          />

          <Button
            label="Generate Horoscope"
            disabled={!isValidForm()}
            onPress={handleSubmit}
          />

          <ThemedText style={styles.debug}>
            Form valid: {isValidForm() ? 'Yes' : 'No'}
          </ThemedText>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Theme.spacing.md,
  },
  card: {
    backgroundColor: Theme.colors.background.light,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    gap: Theme.spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
    zIndex: 0,
  },
  inputGroup: {
    gap: Theme.spacing.sm,
  },
  label: {
    ...Theme.typography.body,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border.light,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    ...Theme.typography.body,
    backgroundColor: Theme.colors.surface.light,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: Theme.colors.border.light,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.surface.light,
  },
  dateButtonText: {
    fontSize: Theme.typography.body.fontSize,
    lineHeight: Theme.typography.body.lineHeight,
    fontWeight: '400',
    color: Theme.colors.text.light,
  },
  genderButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  genderButton: {
    flex: 1,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border.light,
    alignItems: 'center',
    backgroundColor: Theme.colors.surface.light,
  },
  genderButtonSelected: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  genderButtonText: {
    fontSize: Theme.typography.body.fontSize,
    lineHeight: Theme.typography.body.lineHeight,
    fontWeight: '400',
    color: Theme.colors.text.light,
  },
  genderButtonTextSelected: {
    color: Theme.colors.background.light,
  },
  submitButton: {
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    ...Theme.typography.body,
    color: Theme.colors.background.light,
    fontWeight: '600',
  },
  debug: {
    marginTop: 10,
    fontSize: 12,
    color: Theme.colors.text.light,
  },
  timeInput: {
    textAlign: 'center',
    letterSpacing: 1,
    fontSize: 18,
  },
}); 