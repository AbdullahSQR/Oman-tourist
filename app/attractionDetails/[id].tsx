import { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  Share,
  Animated,
  FlatList,
  Platform
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MapPin, Star, ArrowLeft, Heart, Share2, Clock, Calendar, DollarSign, Image as ImageIcon, Map as MapIcon } from 'lucide-react-native';
import { getAttractionById } from '@/services/dataService';

const { width, height } = Dimensions.get('window');

export default function AttractionDetailScreen() {
  const { id } = useLocalSearchParams();
  const [attraction, setAttraction] = useState(() => getAttractionById(id));
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Logic to add/remove from favorites
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${attraction.name} in Oman! It's amazing.`,
        url: 'https://oman-tourism.app/attractions/' + id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });
  
  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 200, 300],
    outputRange: [0, 0.8, 1],
    extrapolate: 'clamp'
  });
  
  const renderGalleryItem = ({ item }) => (
    <Image 
      source={{ uri: item }} 
      style={styles.galleryImage} 
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Animated Header */}
      <Animated.View 
        style={[
          styles.header, 
          { opacity: headerOpacity }
        ]}
      >
        <Animated.Text 
          style={[
            styles.headerTitle, 
            { opacity: headerTitleOpacity }
          ]}
          numberOfLines={1}
        >
          {attraction.name}
        </Animated.Text>
      </Animated.View>
      
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color="#FFFFFF" />
      </TouchableOpacity>
      
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Image 
          source={{ uri: attraction.image }} 
          style={styles.heroImage} 
        />
        
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.title}>{attraction.name}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#5C9EAD" />
                <Text style={styles.locationText}>{attraction.location}</Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{attraction.rating}</Text>
            </View>
          </View>
          
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={toggleFavorite}
            >
              <Heart 
                size={20} 
                color={isFavorite ? "#CB7D62" : "#666"} 
                fill={isFavorite ? "#CB7D62" : "transparent"} 
              />
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Share2 size={20} color="#666" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MapIcon size={20} color="#666" />
              <Text style={styles.actionText}>Map</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Clock size={20} color="#5C9EAD" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Opening Hours</Text>
                <Text style={styles.infoValue}>8:00 AM - 6:00 PM</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Calendar size={20} color="#CB7D62" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Best Time to Visit</Text>
                <Text style={styles.infoValue}>Oct - Apr</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <DollarSign size={20} color="#8A8D91" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Entrance Fee</Text>
                <Text style={styles.infoValue}>{attraction.entranceFee || 'Free'}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.descriptionText}>
              {attraction.description}
            </Text>
          </View>
          
          <View style={styles.galleryContainer}>
            <View style={styles.sectionTitleContainer}>
              <ImageIcon size={20} color="#5C9EAD" />
              <Text style={styles.sectionTitle}>Photo Gallery</Text>
            </View>
            <FlatList
              data={attraction.gallery || [attraction.image, attraction.image]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderGalleryItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryList}
            />
          </View>
          
          <View style={styles.tipsContainer}>
            <Text style={styles.sectionTitle}>Travel Tips</Text>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>
                • Dress modestly when visiting this attraction, especially if it's a religious site.
              </Text>
              <Text style={styles.tipText}>
                • Visit early in the morning to avoid crowds and heat.
              </Text>
              <Text style={styles.tipText}>
                • Bring plenty of water, especially during summer months.
              </Text>
              <Text style={styles.tipText}>
                • Photography may be restricted in certain areas.
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonText}>View on Map</Text>
          </TouchableOpacity>
          
          <View style={styles.spacer} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    paddingTop: 40,
    paddingHorizontal: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  heroImage: {
    width: width,
    height: 300,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    flexShrink: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#333',
  },
  actionContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    paddingVertical: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTextContainer: {
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },
  galleryContainer: {
    marginBottom: 24,
  },
  galleryList: {
    paddingBottom: 10,
  },
  galleryImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginRight: 10,
  },
  tipsContainer: {
    marginBottom: 24,
  },
  tipCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#CB7D62',
  },
  tipText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
    lineHeight: 20,
  },
  mapButton: {
    backgroundColor: '#5C9EAD',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 40,
  },
});