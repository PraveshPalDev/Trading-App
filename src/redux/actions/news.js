import {
  GET_ALL_NEWS,
  GET_ALL_NEWS_TYPES,
  GET_ALL_STOCKS,
  GetTickerBasicInformation,
} from '../../config/urls';
import {apiGet} from '../../utils/apiClient';

export const GetAllNews = (page, isTagFilter = false) => {
  const limit = 10;
  const url = `${GET_ALL_NEWS}?PageSize=${limit}&PageNo=${page}&IsTagFilter=${isTagFilter}`;
  return apiGet(url);
};

export const GetAllNewsTypes = (page, newSectionType, IsAdminPanel = false) => {
  const limit = 10;
  const url = `${GET_ALL_NEWS_TYPES}?PageSize=${limit}&PageNo=${page}&NewsSectionType=${newSectionType}&IsAdminPanel=${IsAdminPanel}`;
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