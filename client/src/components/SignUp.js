import * as React from 'react';
import { TextField, Link, Button, Modal } from '@mui/material';
import styled from "styled-components";

const SignUp =() =>{

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // FirstName, LastName, UserName, Email, Password;

  function SignUpButtonFunction(event) {
    if(FirstName!=null && LastName!=null && UserName!=null && Email!=null && Password!=null)
      handleClose();
  }

  function handleNewAccountInput(event) {
    switch(event.id){
      case 'first-name-input': FirstName = event.target.value;
        break;
      case 'last-name-input': LastName = event.target.value;
        break;
      case 'username-input': UserName = event.target.value;
        break;
      case 'email-input': Email = event.target.value;
        break;
      case 'password-input': Password = event.target.value;
        break;
      case 'verify-input':
        if(event.target.value != Password){
          
        }
        break;
    }
    console.log(event.target.value);
  }

    return (
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
            open={open}
            onClose={handleClose}
        >
        <SignUpPage>
          <LeftColumn/>
          <RightColumn>
            <TopSection>
              <FlexRow>
                <Text1>Sign up</Text1>
                <Button >{"   "}X</Button >
              </FlexRow>
              <Line src={`https://file.rendit.io/n/Tla4J7mNr348GLYcDsDm.svg`} />
            </TopSection>
            <InputSection>
              <FirstName>
                <InputText>First name</InputText>
                <InputField id = "first-name-input" onChange ={handleNewAccountInput} />
              </FirstName>
              <LastName>
                <InputText>Last name</InputText>
                <InputField id = "last-name-input" onChange ={handleNewAccountInput}/>
              </LastName>
              <UserName>
                <InputText>user name</InputText>
                <InputField id = "username-input" onChange ={handleNewAccountInput}/>
              </UserName>
              <Email>
                <InputText>email address</InputText>
                <InputField id = "email-input" onChange ={handleNewAccountInput}/>
              </Email>
              <Password>
                <InputText>Password</InputText>
                <InputField id = "password-input" onChange ={handleNewAccountInput}/>
              </Password>
              <Password>
                <InputText>verify password</InputText>
                <InputField id = "verify-input" onChange ={handleNewAccountInput}/>
              </Password>
            </InputSection>
            <BottomSection>
              <SignUpButton
                onClick={SignUpButtonFunction}
              >
                <CreateAnAccount>Create an account </CreateAnAccount>
              </SignUpButton>
              <Text8>
                Already have an account? <Text9>LOG IN</Text9>
              </Text8>
            </BottomSection>
        </RightColumn>
      </SignUpPage>
      <PlayingComputerGame>
        <Logo>
          {"          "}
          tileslate
        </Logo>
      </PlayingComputerGame>
        </Modal>
        </div>
    );
  }

const InputText = styled.div`
  width: 258px;
  height: 38px;
  color: #ffffff;
  font-size: 20px;
  font-family: Bebas Neue;
`;
const InputField = styled.text`
  height: 46px;
  align-self: stretch;
  padding: 0px;
  border-width: 0px;
  box-sizing: content-box;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-image: url("https://file.rendit.io/n/xrRx7doxyy1pjROHr5wC.svg");
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const UserName = styled.div`
  gap: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 0px 0px 1px;
`;
const Password = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 0px 0px 1px;
`;

const Email = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 0px 0px 1px;
`;
const SignUpPage = styled.div`
  width: 1040px;
  left: 225px;
  top: 232px;
  position: absolute;
  gap: 45px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/gWtofIHMZBGgoWXIBmn7.svg");
`;
const LeftColumn = styled.div`
  width: 220px;
  height: 891px;
  border-width: 1px;
  border-radius: 25px 0px 0px 25px;
  border-style: solid;
  border-color: #000000;
  background-image: linear-gradient(180deg, #fc4a1a 0%, #ffc806 100%);
  box-shadow: inset 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const RightColumn = styled.div`
  width: 743px;
  height: 829px;
  gap: 45px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: stretch;
  padding: 32px 0px;
`;
const TopSection = styled.div`
  gap: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
  padding: 0px 0px 0px 1px;
`;
const Text1 = styled.div`
  width: 279px;
  height: 36px;
  align-self: flex-end;
  color: #ffffff;
  font-size: 36px;
  font-family: Bebas Neue;
`;
const X = styled.div`
  width: 50px;
  height: 41px;
  color: #ffffff;
  font-size: 36px;
  font-family: Bebas Neue;
  white-space: pre-wrap;
`;
const Line = styled.img`
  width: 718px;
  height: 1px;
`;
const InputSection = styled.div`
  height: 562px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 378px 0px 1px;
`;
const FirstName = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const LastName = styled.div`
  gap: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const BottomSection = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 379px 0px 1px;
`;
const SignUpButton = styled.button`
  height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  padding: 0px;
  padding-right: 37px;
  padding-left: 82px;
  border-width: 0px;
  border-radius: 22px;
  border-top-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-style: solid;
  border-color: #f98026;
  box-sizing: content-box;
  background-color: transparent;
  background-image: linear-gradient(90deg, #f83600 0%, #ffc806 30%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const CreateAnAccount = styled.div`
  height: 36px;
  color: #ffffff;
  font-size: 32px;
  font-family: Bebas Neue;
  white-space: pre-wrap;
`;
const Text8 = styled.div`
  width: 306px;
  height: 23px;
  color: #ffffff;
  font-size: 20px;
  font-family: Bebas Neue;
  white-space: pre-wrap;
`;
const Text9 = styled.div`
  display: contents;
  color: #1b2ee0;
  font-size: 20px;
  font-family: Bebas Neue;
`;
const PlayingComputerGame = styled.div`
  height: 964px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 14px 6px 14px 0px;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/Lupd2xk4h7wnFv7dJmDC.png");
`;
const Logo = styled.div`
  height: 36px;
  color: #ffffff;
  font-size: 36px;
  font-family: Bebas Neue;
  white-space: pre-wrap;
`;


  export default SignUp;