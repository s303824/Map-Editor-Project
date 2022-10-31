import React from "react";
import styled, { css } from 'styled-components';
import { TextField, Link, Button, Modal } from '@mui/material';

const SignOut = ({}) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const SignOutButtonFunction = (e, name) => {
        alert(`${name} was clicked`);
      };
      return (
          <SignOutPage>
          <FlexRow4>
            <Text31>Log out</Text31>
            <X onClick={handleClose}>{"   "}X</X>
          </FlexRow4>
          <Line4 src={`https://file.rendit.io/n/fmeQveZ6G5mQln1Eq5CT.svg`} />
          <Text32>are you sure you want to log out ?</Text32>
          <FlexColumn1>
            <LogOut>
              {"                       "}
              log out
            </LogOut>
            <SignOutButton
              onClick={handleClose}
            />
          </FlexColumn1>
        </SignOutPage> );
};


const SignOutPage = styled.div`
  width: 729px;
  height: 263px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 14px 20px 14px 32px;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/C9hppR8f5Rk58WKy1hrq.svg");
`;
const FlexRow4 = styled.div`
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: flex-start;
  margin: 0px 0px 13px 0px;
`;
const Text31 = styled.div`
  width: 279px;
  height: 36px;
  color: #ffffff;
  font-size: 36px;
  font-family: Bebas Neue;
`;
const X = styled.Button`
  width: 50px;
  height: 41px;
  align-self: flex-end;
  color: #ffffff;
  font-size: 36px;
  font-family: Bebas Neue;
  white-space: pre-wrap;
`;
const Line4 = styled.img`
  width: 718px;
  height: 1px;
  margin: 0px 0px 43px 0px;
`;
const Text32 = styled.div`
  width: 683px;
  height: 34px;
  margin: 0px 0px 57px 0px;
  color: #ffffff;
  font-size: 32px;
  font-family: Bebas Neue;
`;
const FlexColumn1 = styled.div`
  width: 284px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  padding: 0px 14px 0px 431px;
`;
const LogOut = styled.div`
  width: 249px;
  height: 30px;
  left: 458px;
  top: 13px;
  position: absolute;
  color: #f93701;
  font-size: 24px;
  font-family: Bebas Neue;
  white-space: pre-wrap;
`;
const SignOutButton = styled.button`
  height: 56px;
  position: relative;
  padding: 0px;
  border-width: 0px;
  box-sizing: content-box;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-image: url("https://file.rendit.io/n/Zz0zYCKid3Hnl8eou2U9.svg");
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;

export default SignOut;
