import React from 'react';

import { styled } from '@linaria/react';


// TODO: component with all features
export const Table = styled.table`
  width: 100%;

  border-spacing: 0;

  & > thead > tr {
    height: 40px;

    th:first-child {
      border-radius: 5px 0 0 5px;
      border-left: 1px solid #eaeaea;
    }

    th {
      position: relative;

      padding: 0 12px;

      color: #666;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0;
      text-transform: uppercase;
      text-align: left;

      background: #fafafa;
      border-top: 1px solid #eaeaea;
      border-bottom: 1px solid #eaeaea;

      vertical-align: middle;
    }

    th:last-child {
      border-radius: 0 5px 5px 0;
      border-right: 1px solid #eaeaea;
    }
  }

  & > tbody > tr {
      height: 48px;
    
      font-size: 14px;

      td {
        padding: 8px 12px;
        vertical-align: middle;
        color: #444;
      }

      &:not(:last-of-type) td {
        border-bottom: 1px solid #eaeaea;
      }
    }
  }

  & > tfoot > tr {
    height: 48px;
  }
`;
