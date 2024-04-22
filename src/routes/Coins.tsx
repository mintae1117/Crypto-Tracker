import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 15px;
  border: 1px solid white;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
        color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

const ToggleBtn = styled.button`
  position: absolute;
  right: 0;
`;


interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}


function Coins() {
  const setterFn = useSetRecoilState(isDarkAtom);
  const isDarkValue = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
        <ToggleBtn style={{marginTop:"10px"}} onClick={() => setterFn((e: boolean) => !e)}>{isDarkValue === true ? "Light Mode" : "Dark mode"}</ToggleBtn>
        <Header>
        <Title>Crypto Tracker</Title>
        </Header>
        {isLoading ? (
        <Loader>Now Loading...</Loader>
        ) : (
        <CoinsList>
        {data?.slice(0, 50).map((coin) => (
        <Coin key={coin.id}>
            <Link to={`/${coin.id}`} state={coin}>
                <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`} />
                {coin.name} &rarr;
                </Link>
        </Coin>
        ))}
        </CoinsList>
        )}
    </Container>
  );
}

export default Coins;