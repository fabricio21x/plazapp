import BodyOptionRegister from '../components/auth/bodyOptionRegister';
import BodyRegisterForm from '../components/auth/bodyRegisterForm';
import Preference from '../components/auth/Preference';
import PreferenceEdit from '../components/auth/PreferenceEdit';
import PasswordRecovery from '../components/auth/PasswordRecovery';
import PasswordChange from '../components/auth/PasswordChange';
import SecurityView from '../components/auth/SecurityView';
import CameraView from '../components/auth/CameraView';
import LoginMain from '../components/auth/LoginMain';
import Home from '../components/landing/Home';
import CategoriesView from '../components/landing/CategoriesView';
import StoreList from '../components/waze/StoreList';
import CategoryList from '../components/waze/CategoryList';
import IncidentReport from '../components/waze/IncidentReport';
import IncidentLocation from '../components/waze/IncidentLocation';
import HomeScreen from '../components/waze/HomeScreen';
import Auxiliar3Points from '../components/landing/Auxiliar3Points';
import RouteConfiguration from '../components/waze/RouteConfiguration';
import SearchProduct from '../components/auth/SearchProduct';
import AdvancedSearch from '../components/auth/AdvancedSearch';
import Perfil from '../components/auth/Perfil';
import HomeList from '../components/landing/HomeList';
import StoreDetail from '../components/landing/StoreDetail';
import ProductDetail from '../components/landing/ProductDetail';
import FavoriteView from '../components/auth/FavoriteView';
import AlertView from '../components/auth/AlertView';
import RecentSearch from '../components/auth/RecentSearch';
import AuxSearch from '../components/auth/AuxRecentSearch';
import Swipper from '../components/onboarding/Swipper';
import ParkingMain from '../components/parking/ParkingMain';
import ParkingLevels from '../components/parking/ParkingLevels';
import ParkingZones from '../components/parking/ParkingZones';
import ParkingLevelMap from '../components/parking/ParkingLevelMap';
import ParkingZoneMap from '../components/parking/ParkingZoneMap';
import ParkingEntries from '../components/parking/ParkingEntries';
import ParkingPath from '../components/parking/ParkingPath';
import ScanQR from '../components/parking/ScanQR';
import AuxResultSearch from '../components/auth/AuxResultSearch';
import AuxFavoriteProduct from '../components/auth/AuxFavoriteProduct';
import AuxFavoriteStore from '../components/auth/AuxFavoriteStore';
import Results from '../components/auth/Results';
import EventDetail from '../components/auth/EventDetail';
import AchievementsView from '../components/auth/AchievementsView';
import Bathrooms from '../components/waze/Bathrooms';
import HelpCenter from '../components/waze/HelpCenter';

const Routes = { 
  Swipper: { screen: Swipper },
  BodyOptionRegister: { screen: BodyOptionRegister },
  BodyRegisterForm: { screen: BodyRegisterForm },
  Preference: { screen: Preference },
  PreferenceEdit: { screen: PreferenceEdit },
  PasswordRecovery: { screen: PasswordRecovery },
  PasswordChange: { screen: PasswordChange },
  SecurityView: { screen: SecurityView },
  CameraView: { screen: CameraView },
  LoginMain: { screen: LoginMain },
  StoreList: { screen: StoreList },
  CategoryList: { screen: CategoryList },
  Home: { screen: Home },
  CategoriesView: { screen: CategoriesView },
  HomeScreen: { screen: HomeScreen },
  IncidentReport: { screen: IncidentReport },
  IncidentLocation: { screen: IncidentLocation },
  SearchProduct: { screen: SearchProduct },
  AdvancedSearch: { screen: AdvancedSearch },
  Perfil: { screen: Perfil },
  StoreDetail: { screen: StoreDetail },
  ProductDetail: { screen: ProductDetail },
  Auxiliar3Points: { screen: Auxiliar3Points }, // Auxiliar
  HomeList: { screen: HomeList },
  FavoriteView: { screen: FavoriteView },
  AlertView: { screen: AlertView },
  EventDetail: { screen: EventDetail },
  RecentSearch: { screen: RecentSearch },
  AuxSearch: { screen: AuxSearch },
  ParkingMain: { screen: ParkingMain },
  ParkingLevels: { screen: ParkingLevels },
  ParkingZones: { screen: ParkingZones },
  RouteConfiguration: { screen: RouteConfiguration },
  ParkingLevelMap: { screen: ParkingLevelMap },
  ParkingZoneMap: { screen: ParkingZoneMap },
  ParkingEntries: { screen: ParkingEntries },
  ParkingPath: { screen: ParkingPath },
  ScanQR: { screen: ScanQR },
  AuxResultSearch: { screen: AuxResultSearch },
  AuxFavoriteProduct: { screen: AuxFavoriteProduct },
  AuxFavoriteStore: { screen: AuxFavoriteStore },
  Results: { screen: Results },
  Bathrooms: { screen: Bathrooms },
  HelpCenter: { screen: HelpCenter },
  AchievementsView: { screen: AchievementsView }
};

export default Routes;
