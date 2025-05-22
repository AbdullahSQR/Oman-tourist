import { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  Image
} from 'react-native';
import { Link } from 'expo-router';
import { MapPin, Star } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import SearchBar from '@/components/SearchBar';
import FilterButton from '@/components/FilterButton';

import { getAttractions } from '@/services/dataService';

const { width } = Dimensions.get('window');

export default function AttractionsScreen() {
  const [attractions, setAttractions] = useState(getAttractions());
  const [activeFilter, setActiveFilter] = useState('All');
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const filters = ['All', 'Natural', 'Historical', 'Cultural', 'Adventure'];
  
  const filterAttractions = (filter) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      setAttractions(getAttractions());
    } else {
      setAttractions(getAttractions().filter(item => item.category === filter));
    }
  };
  
  const renderItem = ({ item }) => (
    <Link 
      href={{
        pathname: '/attractionDetails/[id]',
        params: { id: item.id }
      }}
      asChild
    >
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color="#5C9EAD" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
  
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 100],
    extrapolate: 'clamp'
  });
  
  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [0, 0.3, 1],
    extrapolate: 'clamp'
  });
  
  const headerContentOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [1, 0.3, 0],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.Text 
          style={[styles.headerTitle, { opacity: headerTitleOpacity }]}
        >
          Attractions
        </Animated.Text>
        
        <Animated.View 
          style={[styles.headerContent, { opacity: headerContentOpacity }]}
        >
          <Text style={styles.headerMain}>Attractions</Text>
          <Text style={styles.headerSub}>Discover Oman's treasures</Text>
        </Animated.View>
      </Animated.View>
      
      <Animated.View 
        style={[
          styles.searchFilterContainer,
          {
            transform: [{
              translateY: scrollY.interpolate({
                inputRange: [0, 100],
                outputRange: [0, -50],
                extrapolate: 'clamp'
              })
            }]
          }
        ]}
      >
        <SearchBar 
          placeholder="Search attractions..." 
          containerStyle={styles.searchBar}
        />
        
        <FlatList
          horizontal
          data={filters}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <FilterButton 
              title={item} 
              active={activeFilter === item}
              onPress={() => filterAttractions(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        />
      </Animated.View>
      
      <FlatList
        data={attractions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  headerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  headerMain: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  headerSub: {
    fontSize: 16,
    color: '#666',
  },
  searchFilterContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  searchBar: {
    marginBottom: 15,
  },
  filterList: {
    paddingBottom: 15,
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
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardContent: {
    padding: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -22,
    right: 16,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#333',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});