import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Spinner from "../images/spinner.svg";

// Animation for the fade-in effect
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Overlay wrapper
const LoadingOverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

// Spinner image
const SpinnerImage = styled.img`
  height: 80px;
  width: 80px;
  margin-bottom: 16px;
`;

// Animated text
const LoadingText = styled.div`
  font-size: 24px;
  line-height: 24px;
  margin-top: 8px;
`;

const LoadingEllipses = styled.span`
  &::after {
    content: "${(props) => props.text}";
  }
`;

const LoadingOverlay = ({ text }) => {
  const [dots, setDots] = useState("");

  // Animation for ellipses
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === "..." ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingOverlayWrapper>
      <SpinnerImage src={Spinner} alt="Loading Spinner" />
      <LoadingText>
        {text} <LoadingEllipses text={dots} />
      </LoadingText>
    </LoadingOverlayWrapper>
  );
};

export default LoadingOverlay;