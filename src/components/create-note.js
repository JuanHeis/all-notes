import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Button from "./button";
import plus from "../resources/plus.png"
const Wrapper = styled.div`
max-width: 1104px;
margin: 0 auto;`
const TextArea = styled.textarea`
resize: none;
border: none;
background-color: #E2DAEB;
`;
const Editor = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    block-size: 100vh;
    gap: 2rem;
    > * {
        padding: 1rem;
    }
`;
const Header = styled.header`
align-items: center;
height: 70px;
display: flex;
justify-content: space-between;
`;
class CreateNote extends React.Component {
    constructor() {
        super();
        // this.handleClick = this.handleClick.bind(this)
        this.state = {
            textoParseado: "",
        };

        this.listaReemplazo = [
            { regex: /(#+)(.*)/g, replacement: this.header }, // headers
            {
                regex: /!\[([^\[]+)\]\(([^\)]+)\)/g,
                replacement: "<img src='$2' alt='$1'>",
            }, // image
            {
                regex: /\[([^\[]+)\]\(([^\)]+)\)/g,
                replacement: "<a href='$2'>$1</a>",
            }, // hyperlink
            { regex: /(\*\*|__)(.*?)\1/g, replacement: "<strong>$2</strong>" }, // bold
            { regex: /(\*|_)(.*?)\1/g, replacement: "<em>$2</em>" }, // emphasis
            { regex: /\~\~(.*?)\~\~/g, replacement: "<del>$1</del>" }, // del
            { regex: /\:\"(.*?)\"\:/g, replacement: "<q>$1</q>" }, // quote
            { regex: /`(.*?)`/g, replacement: "<code>$1</code>" }, // inline code
            { regex: /\n\*(.*)/g, replacement: this.ulList }, // ul lists
            { regex: /\n[0-9]+\.(.*)/g, replacement: this.olList }, // ol lists
            { regex: /\n(&gt;|\>)(.*)/g, replacement: this.blockquote }, // blockquotes
            { regex: /\n-{5,}/g, replacement: "\n<hr />" }, // horizontal rule
            { regex: /\n([^\n]+)\n/g, replacement: this.para }, // add paragraphs
            { regex: /<\/ul>\s?<ul>/g, replacement: "" }, // fix extra ul
            { regex: /<\/ol>\s?<ol>/g, replacement: "" }, // fix extra ol
            { regex: /<\/blockquote><blockquote>/g, replacement: "\n" }, // fix extra blockquote
        ];
    }
    header = (text, chars, content) => {
        var level = chars.length;
        return "<h" + level + ">" + content.trim() + "</h" + level + ">";
    };
    para = (text, line) => {
        debugger;
        var trimmed = line.trim();
        if (/^<\/?(ul|ol|li|h|p|bl)/i.test(trimmed)) {
            return "\n" + line + "\n";
        }
        return "\n<p>" + trimmed + "</p>\n";
    };

    ulList = (text, item) => {
        return "\n<ul>\n\t<li>" + item.trim() + "</li>\n</ul>";
    };

    olList = (text, item) => {
        return "\n<ol>\n\t<li>" + item.trim() + "</li>\n</ol>";
    };

    blockquote = (text, tmp, item) => {
        return "\n<blockquote>" + item.trim() + "</blockquote>";
    };
    handleClick = () => {
        const textoOriginal = document.querySelector("textarea").value;
        const textoParseado = this.renderizarTexto(textoOriginal);
        this.setState({ textoParseado });
    };

    renderizarTexto(textoOriginal) {
        let textoSalida = textoOriginal;
        this.listaReemplazo.forEach((par) => {
            textoSalida = textoSalida.replace(par.regex, par.replacement);
        });

        return textoSalida;
    }
    handleSalida = () => {
        const textoOriginal = document.querySelector("textarea").value;
        console.log(textoOriginal)
    }
    render() {
        return (
            <React.Fragment>
                <Wrapper>
                    <Header>
                        <div>Logo</div>
                        <Button img={plus} handleClick={this.handleSalida}></Button>
                    </Header>
                    <Editor>
                        <TextArea onChange={this.handleClick}></TextArea>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: this.state.textoParseado,
                            }}
                            className="salida"
                        ></div>
                    </Editor>
                </Wrapper>
            </React.Fragment>
        );
    }
}

export default CreateNote;
