import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700,800");
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        padding:40px 0px;
        font-family: 'Nanum Gothic', sans-serif;
        font-size:14px;
        background-color: #f6f6f6;
        color: #353535;
        text-align:center;
    }
`;

export default globalStyles;
