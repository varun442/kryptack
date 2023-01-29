import React, { useEffect, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptosQuery } from "../Services/cryptoapi";
import { newsAPIUrl, options } from "../Services/cryptoNewsApi";
import Loader from "./Loader";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [cryptoNews, setCryptoNews] = useState([]);
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const count = simplified ? 6 : 12;
  const [isLoading, setIsLoading] = useState(true);
  

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `${newsAPIUrl}/?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
        options
      );
      const items = await response.json();
      return setCryptoNews(items.value);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNews();
    setIsLoading(false);
  }, [newsCategory]);

  

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <>
      {!isLoading && (
        <Row gutter={[24, 24]}>
          {!simplified && (
            <Col span={24}>
              <Select
                showSearch
                className="select-news"
                placeholder="Select a Crypto"
                optionFilterProp="children"
                onChange={(value) => setNewsCategory(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Cryptocurency">Cryptocurrency</Option>
                {data?.data?.coins?.map((currency) => (
                  <Option value={currency.name}>{currency.name}</Option>
                ))}
              </Select>
            </Col>
          )}
          {cryptoNews.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className="news-card">
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>
                      {news.name}
                    </Title>
                    <img
                      src={news?.image?.thumbnail?.contentUrl || demoImage}
                      alt=""
                    />
                  </div>
                  <p>
                    {news.description.length > 100
                      ? `${news.description.substring(0, 100)}...`
                      : news.description}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar
                        src={
                          news.provider[0]?.image?.thumbnail?.contentUrl ||
                          demoImage
                        }
                        alt=""
                      />
                      <Text className="provider-name">
                        {news.provider[0]?.name}
                      </Text>
                    </div>
                    <Text>
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </Text>
                  </div>
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default News;

// const  {data:crytoNews, isFetching}  = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
// useEffect(() => {
//   const fetchNews = async () => {
//     const result = await fetch().then(
//       (data) => data.totalEstimatedMatches.value
//     );
//     console.log(result);
//   };
//   fetchNews();
// }, [isSuccess]);
