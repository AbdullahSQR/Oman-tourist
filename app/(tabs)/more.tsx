import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Linking,
  Image
} from 'react-native';
import { useColorScheme } from 'react-native';
import { Settings, Languages, Sun, Moon, Info, Phone, Shield, Map, CircleHelp as HelpCircle, Star, BookOpen } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function MoreScreen() {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [language, setLanguage] = useState('English');
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Logic to actually switch theme would go here
  };
  
  const handleLanguageChange = () => {
    setLanguage(language === 'English' ? 'Arabic' : 'English');
    // Logic to actually switch language would go here
  };
  
  const openLink = (url) => {
    Linking.openURL(url);
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1130623/pexels-photo-1130623.jpeg' }} 
              style={styles.profileImage} 
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Guest User</Text>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel Guides</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Map size={20} color="#5C9EAD" style={styles.menuIcon} />
            <Text style={styles.menuText}>Practical Information</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <BookOpen size={20} color="#8A8D91" style={styles.menuIcon} />
            <Text style={styles.menuText}>Cultural Etiquette</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Sun size={20} color="#CB7D62" style={styles.menuIcon} />
              <Text style={styles.menuText}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#E2E2E2', true: '#CB7D62' }}
              thumbColor={'#FFFFFF'}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleLanguageChange}
          >
            <Languages size={20} color="#E2C9A1" style={styles.menuIcon} />
            <Text style={styles.menuText}>Language</Text>
            <Text style={styles.menuValue}>{language}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => openLink('https://www.omantourism.gov.om')}
          >
            <HelpCircle size={20} color="#7D9F85" style={styles.menuIcon} />
            <Text style={styles.menuText}>FAQs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => openLink('https://www.omantourism.gov.om/contact')}
          >
            <Phone size={20} color="#5C9EAD" style={styles.menuIcon} />
            <Text style={styles.menuText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => openLink('https://www.omantourism.gov.om/about')}
          >
            <Info size={20} color="#CB7D62" style={styles.menuIcon} />
            <Text style={styles.menuText}>About Oman Tourism Guide</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Star size={20} color="#E2C9A1" style={styles.menuIcon} />
            <Text style={styles.menuText}>Rate the App</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Shield size={20} color="#8A8D91" style={styles.menuIcon} />
            <Text style={styles.menuText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  profileImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    marginRight: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  signInButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#CB7D62',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  signInText: {
    color: 'white',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  menuValue: {
    fontSize: 16,
    color: '#999',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});