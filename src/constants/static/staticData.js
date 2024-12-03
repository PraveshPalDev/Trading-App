import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import strings from '../lang';

const appearanceData = [
  {
    id: 1,
    title: 'Dark Mode',
  },
  {
    id: 2,
    title: 'Light Mode',
  },
  {
    id: 3,
    title: 'System Theme',
  },
];

const symbols = [
  'AAPL',
  'GOOGL',
  'MSFT',
  'TSLA',
  'NFLX',
  'META',
  'AMD',
  'NVDA',
  'INTC',
  'BABA',
  'UBER',
  'DIS',
  'TWTR',
  'PYPL',
  'CRM',
  'ORCL',
  'IBM',
  'ADBE',
  'SONY',
  'SHOP',
];

const months = ['All', '1D', '1W', '1M', '3M', '1Y'];
const financial = ['Revenue', 'Profit', 'Net Worth'];
const AccordingTableHeading = ['Indicator', 'Signal', 'Info'];
const NewsCategories = [
  {type: 'All', name: 'All'},
  {type: 'Events&More', name: 'Events & More'},
  {type: 'Trending', name: 'Trending'},
  {type: 'WhatsNew', name: 'Whats New'},
  {type: 'MostPopular', name: 'Most Popular'},
  ,
];

const actions = [
  {
    text: 'Company Profile',
    icon: (
      <Icon name="business" size={moderateScale(25)} color={colors.white} />
    ),
    name: 'companyProfile',
    position: 1,
  },
  {
    text: 'Stock Lists',
    icon: <Icon name="list" size={moderateScale(25)} color={colors.white} />,
    name: 'stockLists',
    position: 2,
  },
  {
    text: 'Technical Analysis',
    icon: (
      <Icon name="analytics" size={moderateScale(25)} color={colors.white} />
    ),
    name: 'technicalAnalysis',
    position: 3,
  },
  {
    text: 'Research',
    icon: <Icon name="search" size={moderateScale(25)} color={colors.white} />,
    name: 'research',
    position: 4,
  },
];

const modalAllButton = [
  {
    id: 1,
    name: strings.Today,
    type: strings.Today,
  },
  {
    id: 2,
    name: strings.ThisWeek,
    type: strings.ThisWeek,
  },
  {
    id: 3,
    name: strings.NextWeek,
    type: strings.NextWeek,
  },
  {
    id: 4,
    name: strings.CurrentMonth,
    type: strings.CurrentMonth,
  },
];

export {
  appearanceData,
  symbols,
  months,
  financial,
  NewsCategories,
  actions,
  modalAllButton,
  AccordingTableHeading,
};
