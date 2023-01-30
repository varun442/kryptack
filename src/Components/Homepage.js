import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Button } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery, useGetNewCoinsQuery } from "../Services/cryptoapi";
import { Cryptocurrencies, News } from "../Components";

const Homepage = () => {
  const { Title } = Typography;

  const { data, isFetching } = useGetCryptosQuery(10);
  const { data: coins } = useGetNewCoinsQuery();
  const globalStats = data?.data?.stats;
  
  if (isFetching) return "Loading...";
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={8}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(globalStats.total)}
          ></Statistic>
        </Col>

        <Col span={8}>
          <Statistic
            title="Total Exchanges"
            value={globalStats.totalExchanges}
          ></Statistic>
        </Col>

        <Col span={8}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          ></Statistic>
        </Col>

        <Col span={8}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          ></Statistic>
        </Col>

        <Col span={8}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          ></Statistic>
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified={true} />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified={true} />
    </>
  );
};

export default Homepage;
