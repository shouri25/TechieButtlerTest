import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStack';
import PostsScreen from '../screens/Posts/Posts';

const Navigation = ({}) => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen name="Posts" component={PostsScreen} />
    </Stack.Navigator>
  );
};
export default Navigation;
