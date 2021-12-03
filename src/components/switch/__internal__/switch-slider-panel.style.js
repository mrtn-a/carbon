import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import StyledLoader from "../../loader/loader.style";
import StyledLoaderSquare from "../../loader/loader-square.style";

const SwitchSliderPanel = styled.div`
  ${({ isLoading, size }) => css`
    border: 0;
    color: var(--colorsSemanticNeutralYang100);
    margin: auto;
    margin-top: ${size === "large" ? "12px" : "5px"};

    &[type="on"] {
      margin-left: 9px;
    }

    &[type="off"] {
      color: var(--colorsYin090);
      margin-right: 6px;
    }

    ${isLoading &&
    css`
      ${StyledLoader} {
         {
          padding: 0 3px 3px 0;

          ${StyledLoaderSquare} {
            height: 5px;
            margin-bottom: 2px;
            margin-right: 2px;
            width: 5px;
          }
        }
      }
    `}
  `}
`;

SwitchSliderPanel.propTypes = {
  isLoading: PropTypes.bool,
  size: PropTypes.string,
};

export default SwitchSliderPanel;
