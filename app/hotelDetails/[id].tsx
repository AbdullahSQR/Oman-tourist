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
import { MapPin, Star, ArrowLeft, Heart, Share2, Wifi, Coffee, CookingPot as SwimmingPool, Moon, DollarSign, Utensils, Bed, Space as Spa, CircleCheck as CheckCircle, Image as ImageIcon, Map as MapIcon } from 'lucide-react-native';
import { getHotelById } from '@/services/dataService';

const { width, height } = Dimensions.get('window');

export default function HotelDetailScreen() {
  const { id } = useLocalSearchParams();
  const [hotel, setHotel] = useState(() => getHotelById(id));
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Logic to add/remove from favorites
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${hotel.name} in Oman! It's a great place to stay.`,
        url: 'https://oman-tourism.app/hotels/' + id,
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
  
  const renderAmenityIcon = (amenity) => {
    switch(amenity) {
      case 'wifi':
        return <Wifi size={20} color="#5C9EAD" />;
      case 'breakfast':
        return <Coffee size={20} color="#CB7D62" />;
      case 'pool':
        return <SwimmingPool size={20} color="#8A8D91" />;
      case 'restaurant':
        return <Utensils size={20} color="#7D9F85" />;
      case 'spa':
        return <Spa size={20} color="#E2C9A1" />;
      default:
        return <CheckCircle size={20} color="#5C9EAD" />;
    }
  };
  
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
          {hotel.name}
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
          source={{ uri: hotel.image }} 
          style={styles.heroImage} 
        />
        
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.title}>{hotel.name}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#5C9EAD" />
                <Text style={styles.locationText}>{hotel.location}</Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{hotel.rating}</Text>
            </View>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>${hotel.pricePerNight}</Text>
            <Text style={styles.priceLabel}>/ night</Text>
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
          
          <View style={styles.amenitiesContainer}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {hotel.amenities?.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  {renderAmenityIcon(amenity)}
                  <Text style={styles.amenityText}>
                    {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.descriptionText}>
              {hotel.description}
            </Text>
          </View>
          
          <View style={styles.roomsContainer}>
            <Text style={styles.sectionTitle}>Room Types</Text>
            
            <View style={styles.roomCard}>
              <View style={styles.roomImageContainer}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg' }} 
                  style={styles.roomImage} 
                />
              </View>
              <View style={styles.roomInfo}>
                <Text style={styles.roomTitle}>Deluxe Room</Text>
                <View style={styles.roomDetails}>
                  <View style={styles.roomFeature}>
                    <Bed size={16} color="#666" />
                    <Text style={styles.roomFeatureText}>1 King Bed</Text>
                  </View>
                  <View style={styles.roomFeature}>
                    <Moon size={16} color="#666" />
                    <Text style={styles.roomFeatureText}>Sea View</Text>
                  </View>
                </View>
                <View style={styles.roomPriceContainer}>
                  <Text style={styles.roomPrice}>${hotel.pricePerNight}</Text>
                  <Text style={styles.roomPriceUnit}>/night</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.roomCard}>
              <View style={styles.roomImageContainer}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg' }} 
                  style={styles.roomImage} 
                />
              </View>
              <View style={styles.roomInfo}>
                <Text style={styles.roomTitle}>Suite</Text>
                <View style={styles.roomDetails}>
                  <View style={styles.roomFeature}>
                    <Bed size={16} color="#666" />
                    <Text style={styles.roomFeatureText}>1 King + 1 Single</Text>
                  </View>
                  <View style={styles.roomFeature}>
                    <Moon size={16} color="#666" />
                    <Text style={styles.roomFeatureText}>Mountain View</Text>
                  </View>
                </View>
                <View style={styles.roomPriceContainer}>
                  <Text style={styles.roomPrice}>${hotel.pricePerNight + 50}</Text>
                  <Text style={styles.roomPriceUnit}>/night</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.galleryContainer}>
            <View style={styles.sectionTitleContainer}>
              <ImageIcon size={20} color="#5C9EAD" />
              <Text style={styles.sectionTitle}>Photo Gallery</Text>
            </View>
            <FlatList
              data={hotel.gallery || [hotel.image, hotel.image]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderGalleryItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryList}
            />
          </View>
          
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
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
    marginBottom: 12,
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#CB7D62',
  },
  priceLabel: {
    fontSize: 16,
    color: '#999',
    marginLeft: 4,
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
  amenitiesContainer: {
    marginBottom: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  amenityText: {
    marginLeft: 8,
    fontSize: 14,
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
  roomsContainer: {
    marginBottom: 24,
  },
  roomCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  roomImageContainer: {
    width: 100,
    height: 100,
  },
  roomImage: {
    width: '100%',
    height: '100%',
  },
  roomInfo: {
    flex: 1,
    padding: 12,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  roomDetails: {
    marginBottom: 8,
  },
  roomFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  roomFeatureText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
  },
  roomPriceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  roomPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#CB7D62',
  },
  roomPriceUnit: {
    fontSize: 12,
    color: '#999',
    marginLeft: 2,
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
  bookButton: {
    backgroundColor: '#CB7D62',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 40,
  },
});