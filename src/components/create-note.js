import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'
const Editor = styled.div`
display:grid;
grid-template-columns: 1fr 1fr;
block-size: 100vh;
gap: 2rem;
> * {
    padding: 1rem;
}
`
class CreateNote extends React.Component {
    
    constructor() {
        super();
        // this.handleClick = this.handleClick.bind(this)
        this.state = {
            textoParseado: "",
        };

        this.listaReemplazo = [
            //'/(#+)(.*)/e'

            {
                stringReemplazo: this.header,
                regexBuscado: /(#+)(.*)/g,
            },
            {
                stringReemplazo: "<b>",
                regexBuscado: /\[b\]/g,
            },
            {
                stringReemplazo: "</b>",
                regexBuscado: /\[\/b\]/g,
            },
            {
                stringReemplazo: "<strong>$2</strong>",
                regexBuscado: /(\*\*|__)(.*?)\1/g,
            },
        ];
    }
    handleClick = () => {
        const textoOriginal = document.querySelector("textarea").value;
        const textoParseado = this.renderizarTexto(textoOriginal);
        this.setState({ textoParseado });
    };
    header = (text, chars, content) => {
        var level = chars.length;
        return "<h" + level + ">" + content.trim() + "</h" + level + ">";
    };

    renderizarTexto(textoOriginal) {
        let textoSalida = textoOriginal;
        this.listaReemplazo.forEach((par) => {
            textoSalida = textoSalida.replace(
                par.regexBuscado,
                par.stringReemplazo
            );
        });

        return textoSalida;
    }
    render() {
        return (
            <React.Fragment>

                <Editor>
                    
                    <textarea onChange={this.handleClick}></textarea>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: this.state.textoParseado,
                        }}
                        className="salida"
                    ></div>
                </Editor>
            </React.Fragment>
        );
    }
}

export default CreateNote;
