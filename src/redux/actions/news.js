import {
  GET_ALL_EVENT_CATEGORY,
  GET_ALL_EVENT_More,
  GET_ALL_NEWS,
  GET_ALL_NEWS_TYPES,
  GET_ALL_STOCKS,
  GET_EVENT,
  GetTickerBasicInformation,
} from '../../config/urls';
import {apiGet} from '../../utils/apiClient';

export const GetAllNews = (page, isTagFilter = false) => {
  const limit = 10;
  const url = `${GET_ALL_NEWS}?PageSize=${limit}&PageNo=${page}&IsTagFilter=${isTagFilter}`;
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

export const GetEventsAnnouncement = async page => {
  const limit = 10;

  const url = `${GET_ALL_EVENT_More}?PageSize=${limit}&PageNo=${page}`;
  // NewsSourceIds=${newsSourceId}

  return apiGet(url);
};
