import {
  Analysis,
  AnalysisImageMappings,
  ContactUsUser,
  CreateAndUpdateTicker,
  DeleteTicker,
  GET_ALL_EVENT_CATEGORY,
  GET_ALL_EVENT_More,
  GET_ALL_NEWS,
  GET_ALL_News_Sources,
  GET_ALL_NEWS_TYPES,
  GET_ALL_STOCKS,
  Get_CouponCode,
  Get_DailyQuotes,
  GET_EVENT,
  Get_Events_Announcement,
  GET_NEWS_By_Ticker,
  Get_Quotes,
  Get_RDS,
  GetTickerBasicInformation,
  GetTickerByUser,
  GetTickerByUserStatus,
  LOGOUT_API,
  Portfolio,
  Signal,
} from '../../config/urls';
import {apiDelete, apiGet, apiPost} from '../../utils/apiClient';

export const GetAllNews = (page, NewsSourceIds, isTagFilter = false) => {
  const limit = 10;
  const url = `${GET_ALL_NEWS}?PageSize=${limit}&PageNo=${page}&NewsSourceIds=${NewsSourceIds}&IsTagFilter=${isTagFilter}`;
  return apiGet(url);
};
export const GetAllNewsTypes = (newSectionType, IsAdminPanel = false) => {
  const url = `${GET_ALL_NEWS_TYPES}?NewsSectionType=${newSectionType}&IsAdminPanel=${IsAdminPanel}`;
  return apiGet(url);
};
export const GetAllEventsAnnouncement = page => {
  const limit = 10;
  const url = `${GET_ALL_NEWS_TYPES}?PageSize=${limit}&PageNo=${page}$NewsSourceIds${20}`;

  return apiGet(url);
};
export const GetTickerBasicInfo = () => {
  return apiGet(`${GetTickerBasicInformation}`);
};
export const GetAllStocks = page => {
  const limit = 10;
  const url = `${GET_ALL_STOCKS}?PageSize=${limit}&PageNo=${page}`;
  return apiGet(`${GET_ALL_STOCKS}`);
};
export const GetAllEventCategory = () => {
  return apiGet(`${GET_ALL_EVENT_CATEGORY}`);
};
export const GetEventsBetweenDates = async params => {
  const url = `${GET_EVENT}?fromDate=${params?.fromDate}&toDate=${
    params?.toDate
  }&eventCategories=${params?.eventCategories.join(',')}`;
  return apiGet(url);
};
export const GetEventsAnnouncement = async (page, newsSourceId) => {
  const limit = 10;
  const url = `${GET_ALL_EVENT_More}?PageSize=${limit}&PageNo=${page}&NewsSourceIds=${newsSourceId}`;

  return apiGet(url);
};
export const GetAllNewsSources = async () => {
  return apiGet(`${GET_ALL_News_Sources}`);
};
export const GetAllEventsAnnouncements = async () => {
  return apiGet(`${Get_Events_Announcement}`);
};
export const GetAllQuotes = async () => {
  return apiGet(`${Get_Quotes}`);
};
export const GetAllDailyQuotes = async () => {
  return apiGet(`${Get_DailyQuotes}`);
};
export const GetRDS = async () => {
  return apiGet(`${Get_RDS}`);
};
export const logout = async () => {
  return apiPost(`${LOGOUT_API}`);
};
export const GetTickerByUsers = async loginId => {
  return apiGet(`${GetTickerByUser}/${loginId}`);
};
export const GetTickerByStatus = async tickerName => {
  return apiGet(`${GetTickerByUserStatus}/${tickerName}`);
};
export const DeleteTickerById = async tickerId => {
  return apiDelete(`${DeleteTicker}/${tickerId}`);
};
export const CrateORUpdateTicker = async data => {
  return apiPost(`${CreateAndUpdateTicker}`, data);
};
export const GetAllSignal = async () => {
  return apiGet(`${Signal}`);
};
export const GetNewsByTicker = async (tickerName, newsSourceId) => {
  const url = `${GET_NEWS_By_Ticker}?ticker=${tickerName}.AT&NewsSourceIds=${newsSourceId}`;
  return apiGet(url);
};
export const GetAnalysis = async () => {
  return apiGet(`${Analysis}`);
};
export const GetPortfolioDetails = async id => {
  return apiGet(`${Portfolio}/${'424'}`);
};
export const GetAnalysisImageMappings = async () => {
  return apiGet(`${AnalysisImageMappings}`);
};
export const ContactUsHandler = async payload => {
  return apiPost(`${ContactUsUser}`, payload);
};
export const CheckCouponCode = async couponCode => {
  return apiGet(`${Get_CouponCode}/${couponCode}`);
};
