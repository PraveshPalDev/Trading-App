export const API_BASE_URL = 'https://app.trade-link.gr/api/';

export const getApiURL = endpoint => API_BASE_URL + endpoint;

// auth all api endpoints
export const SIGNUP_API = getApiURL('Users/register');
export const LOGIN_API = getApiURL('Users/login');
export const LOGOUT_API = getApiURL('Users/logout');
// news
export const GET_ALL_NEWS = getApiURL('v1/News');
export const GET_ALL_NEWS_TYPES = getApiURL('v1/News/GetNewsBySectionType');
export const GET_NEWS_By_Ticker = getApiURL('v1/News/GetNewsByTicker');
export const GET_ALL_EVENT_More = getApiURL(
  'EventsAnnouncement/GetPaginatedEventsAnnouncement',
);
export const GET_ALL_News_Sources = getApiURL('v1/News/GetNewsSources');
// stocks
export const GET_ALL_STOCKS = getApiURL('AthexStockData');
// RDS
export const GetTickerBasicInformation = getApiURL('RDS/GetTickerBasicInfo');
export const Get_RDS = getApiURL('RDS');
// events
export const GET_ALL_EVENT_CATEGORY = getApiURL('Event/GetAllEventCategory');
export const GET_EVENT = getApiURL('Event/GetBetweenDate');
export const Get_Events_Announcement = getApiURL(
  'EventsAnnouncement/GetEventsAnnouncementCategory',
);
// DailyQuotes
export const Get_Quotes = getApiURL('Quotes');
export const Get_DailyQuotes = getApiURL('DailyQuotes');
//UserTickerOpinions
export const GetTickerByUser = getApiURL('UserTickerOpinions/GetTickersByUser');
export const GetTickerByUserStatus = getApiURL(
  'UserTickerOpinions/GetTickerStatusCounts',
);
export const DeleteTicker = getApiURL('UserTickerOpinions/DeleteOpinion');
export const CreateAndUpdateTicker = getApiURL(
  'UserTickerOpinions/CreateOrUpdateOpinion',
);

//  signal
export const Signal = getApiURL('Signal');
export const Analysis = getApiURL('Analysis');
export const Portfolio = getApiURL('Portfolio');
export const AnalysisImageMappings = getApiURL('AnalysisImageMappings');
