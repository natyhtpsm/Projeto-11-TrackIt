import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import userContext from '../context/UserContext';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export default function Today() {
  const url = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';
  const [habits, setHabits] = useState([]);
  const { userData } = useContext(userContext);
  const { token } = userData;

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(url, config)
      .then((response) => {
        setHabits(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleHabitClick = (habitId, done) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const endpoint = done
      ? `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/uncheck`
      : `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/check`;

    axios
      .post(endpoint, {}, config)
      .then((response) => {
        const updatedHabits = habits.map((habit) => {
          if (habit.id === habitId) {
            return {
              ...habit,
              done: !done,
            };
          }
          return habit;
        });
        setHabits(updatedHabits);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Header />
      <Day>{dayjs().locale('pt-br').format('dddd, D MMMM')}</Day>
      <Content>
        {habits.length === 0 ? (
          <Text>Nenhum hábito concluído ainda</Text>
        ) : (
          <>
            {habits.map((habit) => (
              <HabitWrapper key={habit.id}>
                <HabitName>{habit.name}</HabitName>
                <HabitDetails>
                  <HabitDetail>{habit.currentSequence} dias</HabitDetail>
                  <HabitDetail>{habit.highestSequence} recorde</HabitDetail>
                </HabitDetails>
                <HabitButton done={habit.done} onClick={() => handleHabitClick(habit.id, habit.done)}>
                  {habit.done ? 'Feito' : 'Não feito'}
                </HabitButton>
              </HabitWrapper>
            ))}
          </>
        )}
      </Content>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 1;
  background: #e5e5e5;
  overflow: hidden;
`;

const Day = styled.h1`
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 22.976px;
  line-height: 29px;
  color: #126ba5;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.h1`
  width: 338px;
  height: 74px;
  margin-top: 28px;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 17.976px;
  line-height: 22px;
  color: #666666;
`;

const HabitWrapper = styled.div`
  width: 340px;
  height: 94px;
  background: #ffffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
`;

const HabitName = styled.div`
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  color: #666666;
`;

const HabitDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HabitDetail = styled.span`
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #666666;
`;

const HabitButton = styled.button`
  width: 84px;
  height: 35px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.done ? '#8FC549' : '#D5D5D5')};
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  cursor: pointer;
`;
