import React from "react";
import styled, { css } from 'styled-components';

const DesktopRoot1 = ({}) => {
  const SignInButtonFunction = (e, name) => {
    alert(`${name} was clicked`);
  };
  const SignUpButtonFunction = (e, name) => {
    alert(`${name} was clicked`);
  };
  const SignInButton2Function = (e, name) => {
    alert(`${name} was clicked`);
  };
  const SignInButton1Function = (e, name) => {
    alert(`${name} was clicked`);
  };
  const SignUpButton1Function = (e, name) => {
    alert(`${name} was clicked`);
  };
  return (
    <DesktopRootRoot>
      <Section>
        <Menu>
          <Text6>
            <Text2>
              <Text1>
                <Icon
                  src={`https://file.rendit.io/n/D9HdmTt6uTFtuCSpYxrS.svg`}
                />
                <Text13>Dashboard</Text13>
              </Text1>
              <Icon src={`https://file.rendit.io/n/hOt31rJV6NtcO2Qfwd2H.svg`} />
            </Text2>
            <Text3>
              <Icon2
                src={`https://file.rendit.io/n/9CWMO7sw6vXVvKusrfYr.svg`}
              />
              <Text14>my projects</Text14>
            </Text3>
            <Text3>
              <Icon2
                src={`https://file.rendit.io/n/aOwFed53C6vnq1vipxDo.svg`}
              />
              <Text13>Settings</Text13>
            </Text3>
            <Text5 />
          </Text6>
          <Image1 src={`https://file.rendit.io/n/72m2we5sCntAeF5cty96.svg`} />
        </Menu>
      </Section>
      <FlexColumn>
        <Navbar>
          <Section2>
            <LogoAndSeach>
              <Logo>
                <Image2
                  src={`https://file.rendit.io/n/AIr5pJ4gHTaNUpLVW1vU.png`}
                />
              </Logo>
              <SearchSection>
                <Icon2
                  src={`https://file.rendit.io/n/qRUAq8iHSfuph5NdLI5Z.svg`}
                />
                <Text16>Search...</Text16>
              </SearchSection>
            </LogoAndSeach>
          </Section2>
          <FlexRow>
            <SignInButton
              onClick={(e) => SignInButtonFunction(e, "SignInButton")}
            >
              <Text17>SIgn in</Text17>
            </SignInButton>
            <SignUpButton
              onClick={(e) => SignUpButtonFunction(e, "SignUpButton")}
            >
              <Text18>Sign up</Text18>
            </SignUpButton>
          </FlexRow>
        </Navbar>
        <Element1 />
      </FlexColumn>
      <FlexColumn1>
        <ScrollBarSection>
          <ScrollBarSection1
            src={`https://file.rendit.io/n/ypCdncfTnmMZZ653EeKS.svg`}
          />
        </ScrollBarSection>
        <ScroolBar>
          <ScroolBar1
            src={`https://file.rendit.io/n/z95ZRQfw1L4tX32EU1OZ.svg`}
          />
        </ScroolBar>
      </FlexColumn1>
      <Section>
        <Menu>
          <Text6>
            <Text2>
              <Text1>
                <Icon
                  src={`https://file.rendit.io/n/D9HdmTt6uTFtuCSpYxrS.svg`}
                />
                <Text13>Dashboard</Text13>
              </Text1>
              <Icon src={`https://file.rendit.io/n/hOt31rJV6NtcO2Qfwd2H.svg`} />
            </Text2>
            <Text3>
              <Icon2
                src={`https://file.rendit.io/n/9CWMO7sw6vXVvKusrfYr.svg`}
              />
              <Text14>my projects</Text14>
            </Text3>
            <Text3>
              <Icon2
                src={`https://file.rendit.io/n/aOwFed53C6vnq1vipxDo.svg`}
              />
              <Text13>Settings</Text13>
            </Text3>
            <Text5 />
          </Text6>
          <Image1 src={`https://file.rendit.io/n/72m2we5sCntAeF5cty96.svg`} />
        </Menu>
      </Section>
      <BlurredBackground1>
        <SignUpPage>
          <Element2 />
          <FlexColumn2>
            <FlexColumn3>
              <FlexRow1>
                <Text22>Sign In</Text22>
                <X>{"   "}X</X>
              </FlexRow1>
              <Line src={`https://file.rendit.io/n/EcPiU2CNgeBPL9r5rWYL.svg`} />
            </FlexColumn3>
            <FlexColumn4>
              <FlexColumn5>
                <Text23>email address</Text23>
                <SignInButton2
                  onClick={(e) => SignInButton2Function(e, "SignInButton2")}
                />
                <Text24>Password</Text24>
                <SignInButton1
                  onClick={(e) => SignInButton1Function(e, "SignInButton1")}
                />
              </FlexColumn5>
              <FlexColumn6>
                <SignUpButton1
                  onClick={(e) => SignUpButton1Function(e, "SignUpButton1")}
                >
                  <LoginToAccount>login to account </LoginToAccount>
                </SignUpButton1>
                <ForgotYourPassword1>
                  forgot your{" "}
                  <ForgotYourPassword>password ?</ForgotYourPassword>
                </ForgotYourPassword1>
                <Text25>
                  new to tileslate?{" "}
                  <NewToTileslateSignIN>sign IN</NewToTileslateSignIN>
                </Text25>
              </FlexColumn6>
            </FlexColumn4>
          </FlexColumn2>
        </SignUpPage>
        <PlayingComputerGame>
          <Tileslate>
            {"          "}
            tileslate
          </Tileslate>
        </PlayingComputerGame>
      </BlurredBackground1>
    </DesktopRootRoot>
  );
};

const Section = styled.div`
  width: 179px;
  height: 1190px;
  left: 0px;
  top: 43px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px 40px 48px 40px;
  background-color: rgba(210, 28, 24, 0.77);
`;
const Menu = styled.div`
  width: 198px;
  gap: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Text6 = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Text2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
`;
const Text1 = styled.div`
  width: 116px;
  gap: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
const Text13 = styled.div`
  color: #ffffff;
  font-size: 22px;
  font-family: Bebas Neue;
  white-space: nowrap;
  letter-spacing: 0.44px;
`;
const Text3 = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Icon2 = styled.img`
  width: 22px;
  height: 22px;
`;
const Text14 = styled.div`
  color: #fffcfc;
  font-size: 22px;
  font-family: Bebas Neue;
  white-space: nowrap;
  letter-spacing: 0.44px;
`;
const Text5 = styled.div`
   ;
`;
const Image1 = styled.img`
  width: 182px;
  height: 1px;
`;
const DesktopRootRoot = styled.div`
  width: 1440px;
  height: 1266px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 0px 15px 0px;
  background-color: #0e0e10;
  overflow: hidden;
`;
const FlexColumn = styled.div`
  position: relative;
  gap: 19px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;
const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
  padding: 16px 37px 25px 70px;
  background-color: #18181b;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.25);
`;
const Section2 = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const LogoAndSeach = styled.div`
  gap: 176px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Logo = styled.div`
  height: 24px;
  gap: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const Image2 = styled.img`
  height: 69px;
`;
const SearchSection = styled.div`
  height: 26px;
  gap: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 300px 10px 12px;
  border-radius: 88px;
  background-color: #25252a;
`;
const Text16 = styled.div`
  color: #818181;
  font-size: 14px;
  font-family: Plus Jakarta Sans;
  line-height: 21px;
  white-space: nowrap;
`;
const FlexRow = styled.div`
  gap: 26px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: stretch;
  align-items: center;
`;
const SignInButton = styled.button`
  height: 46px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px;
  padding-right: 55px;
  padding-left: 55px;
  border-width: 0px;
  box-sizing: content-box;
  background-color: transparent;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/9hNksChUP2SbA3DW6mkl.svg");
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const Text17 = styled.div`
  width: 55px;
  height: 30px;
  color: #ffffff;
  font-size: 24px;
  font-family: Bebas Neue;
`;
const SignUpButton = styled.button`
  height: 42px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0px;
  padding-top: 1px;
  padding-right: 45px;
  padding-bottom: 1px;
  padding-left: 45px;
  border-width: 0px;
  border-radius: 50px;
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
const Text18 = styled.div`
  width: 73px;
  height: 36px;
  color: #ffffff;
  font-size: 24px;
  font-family: Bebas Neue;
`;
const Element1 = styled.div`
  width: 1168px;
  height: 385px;
`;
const FlexColumn1 = styled.div`
  width: -1440px;
  height: 583px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 42.5px 1440px;
`;
const ScrollBarSection = styled.div`
  left: 1399px;
  top: 5.5px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/ypCdncfTnmMZZ653EeKS.svg");
`;
const ScrollBarSection1 = styled.img`
  width: 4px;
  height: 662px;
`;
const ScroolBar = styled.div`
  left: 1394px;
  top: 0px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/z95ZRQfw1L4tX32EU1OZ.svg");
`;
const ScroolBar1 = styled.img`
  width: 16px;
  height: 267px;
`;
const BlurredBackground1 = styled.div`
  width: 1040px;
  height: 971px;
  left: 0px;
  top: 0px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 154px 178px 154px 222px;
  background-color: rgba(217, 217, 217, 0.2);
`;
const SignUpPage = styled.div`
  width: 1040px;
  position: relative;
  gap: 45px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/who7obOs0S6LVkwtYB0u.svg");
`;
const Element2 = styled.div`
  width: 220px;
  height: 891px;
  border-width: 1px;
  border-radius: 25px 0px 0px 25px;
  border-style: solid;
  border-color: #000000;
  background-image: linear-gradient(180deg, #fc4a1a 0%, #ffc806 100%);
  box-shadow: inset 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const FlexColumn2 = styled.div`
  width: 736px;
  height: 714px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
  padding: 33px 0px 146px 0px;
`;
const FlexColumn3 = styled.div`
  gap: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 0px 0px 5px;
`;
const FlexRow1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
  padding: 0px 0px 0px 4px;
`;
const Text22 = styled.div`
  width: 279px;
  height: 36px;
  align-self: flex-start;
  margin: 1px 0px 0px 0px;
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
const FlexColumn4 = styled.div`
  gap: 88px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 372px 0px 0px;
`;
const FlexColumn5 = styled.div`
  height: 243px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Text23 = styled.div`
  width: 258px;
  height: 38px;
  margin: 0px 0px 17px 0px;
  color: #ffffff;
  font-size: 24px;
  font-family: Bebas Neue;
`;
const SignInButton2 = styled.button`
  height: 46px;
  align-self: stretch;
  margin: 0px 0px 35px 0px;
  padding: 0px;
  border-width: 0px;
  box-sizing: content-box;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-image: url("https://file.rendit.io/n/dcN0CrKynMqdAXJ1zzi9.svg");
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const Text24 = styled.div`
  width: 258px;
  height: 38px;
  margin: 0px 0px 23px 0px;
  color: #ffffff;
  font-size: 24px;
  font-family: Bebas Neue;
`;
const SignInButton1 = styled.button`
  width: 363px;
  height: 46px;
  padding: 0px;
  border-width: 0px;
  box-sizing: content-box;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-image: url("https://file.rendit.io/n/lw9qgqLSXbaIKsWLHttP.svg");
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const FlexColumn6 = styled.div`
  height: 141px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 1px 0px 0px;
`;
const SignUpButton1 = styled.button`
  height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  margin: 0px 0px 19px 0px;
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
const LoginToAccount = styled.div`
  width: 242px;
  height: 36px;
  color: #ffffff;
  font-size: 32px;
  font-family: Bebas Neue;
  white-space: pre-wrap;
`;
const ForgotYourPassword1 = styled.div`
  width: 306px;
  height: 23px;
  margin: 0px 0px 16px 0px;
  color: #ffffff;
  font-size: 16px;
  font-family: Bebas Neue;
  text-decoration: underline;
  white-space: pre-wrap;
`;
const ForgotYourPassword = styled.div`
  display: contents;
  color: #1b2ee0;
  font-size: 16px;
  font-family: Bebas Neue;
  text-decoration: underline;
`;
const Text25 = styled.div`
  width: 306px;
  height: 23px;
  color: #ffffff;
  font-size: 20px;
  font-family: Bebas Neue;
  white-space: pre-wrap;
`;
const NewToTileslateSignIN = styled.div`
  display: contents;
  color: #1b2ee0;
  font-size: 20px;
  font-family: Bebas Neue;
`;
const PlayingComputerGame = styled.div`
  height: 964px;
  left: 223px;
  top: 251px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 14px 4px 14px 2px;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/cRuOu7ohO9oHRbM4QvgF.png");
`;
const Tileslate = styled.div`
  width: 215px;
  height: 36px;
  color: #ffffff;
  font-size: 36px;
  font-family: Bebas Neue;
  white-space: pre-wrap;
`;
export default SignIn;
