import React, { useEffect, useState } from "react";
import styled, {css} from "styled-components";
import { useParams  } from "react-router-dom";
import { getCocktailDetails } from "../services/api";

import LoadingOverlay from "./LoadingOverlay";
import { DetailCategory } from "./shared/StyledComponents";
import CopyIcon from "../images/Copy-Icon.svg";
import CheckIcon from "../images/Check-Icon.svg";

const DetailWrapper = styled.div`
  color: #fff;
  padding: 32px;
  max-width: 650px;
  width: 100%;
  margin: 0 auto;
`;

const CocktailTitle = styled.h2`
  font-size: 36px; 
  line-height: 44px; 
  margin: 0 0 32px; 
`;

const DetailInner = styled.div`
  border: solid 1px rgba(255,255,255,0.6);
  border-radius: 8px;
  padding: 24px;
`;

const DetailMain = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailImage = styled.img`
  width: 220px;
  height: auto;
  borderRadius: 4px; 
  marginBottom: 24px;
`;

const subHeaderStyles = css`
  color: rgba(255,255,255,0.7);
  margin: 0 0 8px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
`;

const DetailSubHeader = styled.h3`
  ${subHeaderStyles}
`;
const DetailLabelHeader = styled.label`
  display: block;
  ${subHeaderStyles}
`;
const DetailShareWrap = styled.div`
  display: flex; 
  justify-content: center; 
  alignItems: center;
`;

const DetailShareBtn = styled.button`
  display: flex;
  height: 44px;
  align-items: center;
  background-color: #104FC9;
  color: #fff;
  padding: 8px 24px;
  border: 1px solid #104FC9;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  font-size: 20px;

  img {
    height: 24px;
    width: auto;
    margin-right: 5px;
  }
`;

const DetailShareInput = styled.input`
  flex-grow: 1;
  height: 42px;
  padding: 0 16px;
  border-radius: 10px 0 0 10px;
  border: 1px solid #fff;
  font-size: 15px;
`;

const DetailSection = styled.div`
  margin-top: 32px;
`;

const DetailText = styled.p`
  margin: 0 0 16px;
`;

const DetailIngredientsList = styled.ul`
  list-style: none; 
  padding: 0; 
  margin: 0; 
  columns: 2
`;

const CocktailDetail = () => {
  const { slug } = useParams(); // Access the slug from the URL
  const [cocktail, setCocktail] = useState(null);
  const [copied, setCopied] = useState(false); 
  const [loading, setLoading] = useState(true);

  const shareLink = `${window.location.origin}/share/${slug}`;

  useEffect(() => {
    setLoading(true);
    getCocktailDetails(slug).then((response) => {
      setCocktail(response.data.drinks[0]);
    })
    .catch((error) => {
      console.error("Error fetching cocktail details:", error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [slug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 3000); 
  };

  if (loading) {
    return <LoadingOverlay text="Loading" />;
  }
  
  if (!cocktail) {
    return <p>No cocktail found.</p>;
  }

  return (
    <DetailWrapper>
      <CocktailTitle>{cocktail.name}</CocktailTitle>
      <DetailInner>
        <DetailMain>
          <div>
            <DetailImage src={cocktail.image} alt={cocktail.name} />
            <DetailCategory>{cocktail.category}</DetailCategory>
          </div>
          
          <div>
            <DetailSubHeader>{cocktail.ingredients.length || 0 } Ingredients</DetailSubHeader>
            {cocktail.ingredients.length > 0 && 
              <DetailIngredientsList>
                {cocktail.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.measurement} {ingredient.name}
                  </li>
                ))}
              </DetailIngredientsList>
            }
          </div>
        </DetailMain>

        <DetailSection>
          <DetailSubHeader>Instructions</DetailSubHeader>
          <DetailText>{cocktail.instructions}</DetailText>

          <DetailSubHeader>Glass Needed</DetailSubHeader>
          <DetailText>Serve: {cocktail.container}</DetailText>
        </DetailSection>
      

      <DetailSection>
        <DetailLabelHeader htmlFor="share-link">
          Share Link
        </DetailLabelHeader>
        <DetailShareWrap>
          <DetailShareInput
            id="share-link"
            type="text"
            value={shareLink}
            readOnly
          />
          <DetailShareBtn
            onClick={handleCopy}
          >
            <img
              src={copied ? CheckIcon : CopyIcon}
              alt="Copy Icon"
            />
            {copied ? "Copied" : "Copy"}
          </DetailShareBtn>
        </DetailShareWrap>
      </DetailSection>

      </DetailInner>
    </DetailWrapper>
  );
};

export default CocktailDetail;