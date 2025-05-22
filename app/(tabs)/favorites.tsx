import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image,
  ScrollView
} from 'react-native';
import { Link } from 'expo-router';
import { MapPin, Star, Heart } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { getFavorites } from '@/services/dataService';

export default function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState('Attractions');
  const favorites = getFavorites();
  
  const filteredFavorites = favorites.filter(item => 
    item.type === activeTab.toLowerCase().slice(0, -1)
  );
  
  const renderItem = ({ item }) => (
    <Link
      href={{
        pathname: item.type === 'attraction' 
          ? '/attractionDetails/[id]' 
          : '/hotelDetails/[id]',
        params: { id: item.id }
      }}
      asChild
    >
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color="#5C9EAD" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <TouchableOpacity style={styles.heartButton}>
            <Heart size={20} color="#CB7D62" fill="#CB7D62" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'Attractions' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('Attractions')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'Attractions' && styles.activeTabText
            ]}
          >
            Attractions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'Hotels' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('Hotels')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'Hotels' && styles.activeTabText
            ]}
          >
            Hotels
          </Text>
        </TouchableOpacity>
      </View>
      
      {filteredFavorites.length > 0 ? (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Heart size={80} color="#E2E2E2" />
          <Text style={styles.emptyText}>
            No favorites yet
          </Text>
          <Text style={styles.emptySubtext}>
            Save your favorite {activeTab.toLowerCase()} for easy access
          </Text>
          <Link
            href={activeTab === 'Attractions' ? '/(tabs)/attractions' : '/(tabs)/hotels'}
            asChild
          >
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>
                Browse {activeTab}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 12,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
  },
  activeTabButton: {
    backgroundColor: '#CB7D62',
  },
  tabText: {
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 120,
  },
  cardImage: {
    width: 120,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    position: 'relative',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    paddingRight: 24, // Make space for heart button
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#333',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#CB7D62',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});