import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EVENTS = {
  '1': {
    id: '1',
    title: 'Summer Music Festival',
    date: '2024-07-15',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3540&auto=format&fit=crop',
    price: 149.99,
    location: 'Central Park',
    description: 'Experience the ultimate summer music festival featuring top artists from around the world. Enjoy live performances, food vendors, and amazing atmosphere.',
    lineup: ['Artist 1', 'Artist 2', 'Artist 3', 'Artist 4'],
  },
  '2': {
    id: '2',
    title: 'Tech Conference 2024',
    date: '2024-08-20',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=3412&auto=format&fit=crop',
    price: 299.99,
    location: 'Convention Center',
    description: 'Join industry leaders and innovators at the biggest tech conference of the year. Network, learn, and discover the latest trends in technology.',
    speakers: ['Speaker 1', 'Speaker 2', 'Speaker 3'],
  },
  '3': {
    id: '3',
    title: 'Food & Wine Festival',
    date: '2024-09-10',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=3387&auto=format&fit=crop',
    price: 89.99,
    location: 'Downtown Square',
    description: 'Indulge in a culinary journey featuring local and international cuisines, wine tastings, and cooking demonstrations from renowned chefs.',
    features: ['Wine Tasting', 'Cooking Demos', 'Food Vendors', 'Live Music'],
  },
};

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const event = EVENTS[id];
  const [purchasing, setPurchasing] = useState(false);

  const purchaseTicket = async () => {
    setPurchasing(true);
    try {
      const ticket = {
        ticketId: Math.random().toString(36).substr(2, 9),
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        location: event.location,
        price: event.price,
        attendeeName: 'John Doe',
        status: 'valid',
        purchaseDate: new Date().toISOString(),
      };

      const existingTickets = await AsyncStorage.getItem('tickets');
      const tickets = existingTickets ? JSON.parse(existingTickets) : [];
      tickets.push(ticket);
      await AsyncStorage.setItem('tickets', JSON.stringify(tickets));

      router.push('/tickets');
    } catch (error) {
      console.error('Error purchasing ticket:', error);
    } finally {
      setPurchasing(false);
    }
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>📅 {new Date(event.date).toLocaleDateString()}</Text>
          <Text style={styles.infoText}>📍 {event.location}</Text>
        </View>
        
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{event.description}</Text>

        {event.lineup && (
          <>
            <Text style={styles.sectionTitle}>Lineup</Text>
            <View style={styles.list}>
              {event.lineup.map((artist, index) => (
                <Text key={index} style={styles.listItem}>• {artist}</Text>
              ))}
            </View>
          </>
        )}

        {event.speakers && (
          <>
            <Text style={styles.sectionTitle}>Speakers</Text>
            <View style={styles.list}>
              {event.speakers.map((speaker, index) => (
                <Text key={index} style={styles.listItem}>• {speaker}</Text>
              ))}
            </View>
          </>
        )}

        {event.features && (
          <>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.list}>
              {event.features.map((feature, index) => (
                <Text key={index} style={styles.listItem}>• {feature}</Text>
              ))}
            </View>
          </>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>${event.price}</Text>
        </View>
        <Pressable
          style={[styles.purchaseButton, purchasing && styles.purchaseButtonDisabled]}
          onPress={purchaseTicket}
          disabled={purchasing}>
          <Text style={styles.purchaseButtonText}>
            {purchasing ? 'Processing...' : 'Purchase Ticket'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  eventImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 24,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#8E8E93',
    lineHeight: 24,
  },
  list: {
    marginTop: 8,
  },
  listItem: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: '#1a1b1e',
    borderTopWidth: 1,
    borderTopColor: '#2c2d30',
  },
  priceContainer: {
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  purchaseButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  purchaseButtonDisabled: {
    opacity: 0.7,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 24,
  },
});