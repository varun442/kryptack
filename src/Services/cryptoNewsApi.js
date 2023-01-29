import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'da30724965msh68b34aec3dbb68cp1d99f4jsn572384b352c1',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }

const baseUrl = "https://bing-news-search1.p.rapidapi.com/news/search";
const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

export const options = {
	method: 'GET',
	headers: {
		'X-BingApis-SDK': 'true',
		'X-RapidAPI-Key': '6dcfd31fd1mshb25f821e38e95a1p1490d0jsnd41605bcc1b3',
		'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
	}
};
export const newsAPIKey = '6dcfd31fd1mshb25f821e38e95a1p1490d0jsnd41605bcc1b3'
export const newsAPIUrl = 'https://bing-news-search1.p.rapidapi.com/news/search';

