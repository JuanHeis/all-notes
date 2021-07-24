


        let listaReemplazo = [
            {
                stringReemplazo: "<b>",
                regexBuscado: /\[b\]/g
            },
            {
                stringReemplazo: "</b>",
                regexBuscado: /\[\/b\]/g
            }
        ]
    //[b] [/b] ***a  a***  
    
     function renderizarTexto(textoOriginal) {
        
        let textoSalida = textoOriginal
        this.listaReemplazo.forEach(par => {
            textoSalida = textoSalida.replace(par.regexBuscado, par.stringReemplazo)
        })
    
        return textoSalida
    }


export default renderizarTexto