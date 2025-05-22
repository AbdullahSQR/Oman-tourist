import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MapPin, Star } from 'lucide-react-native';

interface FeaturedCardProps {
  item: any;
  type: 'attraction' | 'hotel';
}

export default function FeaturedCard({ item, type }: FeaturedCardProps) {
  return (
    <Link
      href={{
        pathname: type === 'attraction' 
          ? '/attractionDetails/[id]' 
          : '/hotelDetails/[id]',
        params: { id: item.id }
      }}
      asChild
    >
      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
        <View style={styles.content}>
          <View style={styles.ratingContainer}>
            <Star size={12} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={12} color="#5C9EAD" />
            <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
          </View>
          {type === 'hotel' && (
            <Text style={styles.price}>${item.pricePerNight} <Text style={styles.priceNight}>/ night</Text></Text>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -20,
    right: 12,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#333',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#CB7D62',
  },
  priceNight: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#999',
  },
});