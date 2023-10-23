import "./style.css";
import styled from "styled-components";

const FooterContainer = styled.div`
  padding: 1rem 2rem;
  text-align: center;
  background: #2d2e2e;
  color: #ffffff;
`;

export default function Footer() {
  return (
    <footer>
      {/* <div className="container__footer"> */}
      <FooterContainer>
        <p className="copyright">© Copyright Developed by Antony Huaman</p>
        <span className="copyright__span">2023</span>
      </FooterContainer>
      {/*    </div> */}
    </footer>
  );
}
