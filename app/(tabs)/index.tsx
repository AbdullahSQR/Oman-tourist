import { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  ImageBackground,
  Animated
} from 'react-native';
import { Link } from 'expo-router';
import { Search as SearchNormal1, ArrowRight, MapPin } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { fetchFeaturedData } from '@/services/dataService';
import SearchBar from '@/components/SearchBar';
import FeaturedCard from '@/components/FeaturedCard';
import CategoryButton from '@/components/CategoryButton';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [featuredAttractions, setFeaturedAttractions] = useState([]);
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchFeaturedData();
      setFeaturedAttractions(data.attractions);
      setFeaturedHotels(data.hotels);
    };
    
    loadData();
  }, []);

  const headerBackground = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Animated Header */}
      <Animated.View 
        style={[
          styles.header, 
          { backgroundColor: headerBackground }
        ]}
      >
        <Animated.Text style={[styles.headerTitle, { opacity: headerOpacity }]}>
          Discover Oman
        </Animated.Text>
      </Animated.View>
      
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.heroSection}>
          <ImageBackground
            source={{ uri: 'https://images.pexels.com/photos/3940440/pexels-photo-3940440.jpeg' }}
            style={styles.heroImage}
            imageStyle={{ borderRadius: 0 }}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.welcomeText}>Welcome to</Text>
              <Text style={styles.heroTitle}>OMAN</Text>
              <Text style={styles.heroSubtitle}>Land of Natural Beauty & Culture</Text>
            </View>
          </ImageBackground>
        </View>
        
        <View style={styles.searchContainer}>
          <SearchBar placeholder="Search attractions, hotels..." />
        </View>
        
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollView}
          >
            <CategoryButton 
              title="Beaches" 
              icon="umbrella-beach" 
              color="#5C9EAD"
            />
            <CategoryButton 
              title="Mountains" 
              icon="mountain" 
              color="#8A8D91"
            />
            <CategoryButton 
              title="Culture" 
              icon="landmark" 
              color="#CB7D62"
            />
            <CategoryButton 
              title="Adventure" 
              icon="hiking" 
              color="#E2C9A1"
            />
            <CategoryButton 
              title="Food" 
              icon="utensils" 
              color="#7D9F85"
            />
          </ScrollView>
        </View>
        
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Attractions</Text>
            <Link href="/(tabs)/attractions" asChild>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <ArrowRight size={16} color="#CB7D62" />
              </TouchableOpacity>
            </Link>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScrollView}
          >
            {featuredAttractions.map((item, index) => (
              <FeaturedCard 
                key={index}
                item={item}
                type="attraction"
              />
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Hotels</Text>
            <Link href="/(tabs)/hotels" asChild>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <ArrowRight size={16} color="#CB7D62" />
              </TouchableOpacity>
            </Link>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScrollView}
          >
            {featuredHotels.map((item, index) => (
              <FeaturedCard 
                key={index}
                item={item}
                type="hotel"
              />
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Traveling Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Best Time to Visit</Text>
            <Text style={styles.tipText}>
              October to April offers pleasant weather for exploring Oman's diverse landscapes and attractions.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Respecting Local Customs</Text>
            <Text style={styles.tipText}>
              Dress modestly in public places and always ask permission before photographing locals.
            </Text>
          </View>
        </View>
        
        <View style={styles.spacer} />
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
    paddingTop: 40,
    paddingHorizontal: 20,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  heroSection: {
    width: '100%',
    height: 500,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    paddingBottom: 40,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heroSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: -25,
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoriesScrollView: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  featuredSection: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#CB7D62',
    marginRight: 5,
    fontWeight: '500',
  },
  featuredScrollView: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  tipsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  tipCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#CB7D62',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  spacer: {
    height: 80,
  },
});