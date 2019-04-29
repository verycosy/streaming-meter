import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css?family=Noto+Sans+KR");
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family: "Noto Sans KR", sans-serif;
        font-size:14px;
        background-color: #f6f6f6;
        color: #353535;
        flex:column;
    }
`;

export default globalStyles;
