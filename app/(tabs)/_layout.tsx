import { Tabs } from 'expo-router';
import { View, useColorScheme } from 'react-native';
import { Map, Compass, Hotel, BookMarked, Menu } from 'lucide-react-native';

const TabBarIcon = ({ color, size, icon: Icon }) => {
  return <Icon size={size} color={color} />;
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#CB7D62',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#8A8D91' : '#8A8D91',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontWeight: '500',
          marginTop: -5,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={Compass} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="attractions"
        options={{
          title: 'Attractions',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={Map} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="hotels"
        options={{
          title: 'Hotels',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={Hotel} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={BookMarked} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={Menu} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}