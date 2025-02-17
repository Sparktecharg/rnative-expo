import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';

const EVENTS = [
  {
    id: '1',
    title: 'Summer Music Festival',
    date: '2024-07-15',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3540&auto=format&fit=crop',
    price: 149.99,
    location: 'Central Park',
  },
  {
    id: '2',
    title: 'Tech Conference 2024',
    date: '2024-08-20',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=3412&auto=format&fit=crop',
    price: 299.99,
    location: 'Convention Center',
  },
  {
    id: '3',
    title: 'Food & Wine Festival',
    date: '2024-09-10',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=3387&auto=format&fit=crop',
    price: 89.99,
    location: 'Downtown Square',
  },
];

export default function EventsScreen() {
  const renderEvent = ({ item }) => (
    <Link href={`/event/${item.id}`} asChild>
      <Pressable style={styles.eventCard}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDate}>{new Date(item.date).toLocaleDateString()}</Text>
          <View style={styles.eventDetails}>
            <Text style={styles.eventLocation}>📍 {item.location}</Text>
            <Text style={styles.eventPrice}>${item.price}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={EVENTS}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  listContainer: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#1a1b1e',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventLocation: {
    fontSize: 14,
    color: '#8E8E93',
  },
  eventPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});