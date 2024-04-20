const fs = require('fs');
const lerArquivo = () : unknown => {
    return JSON.parse(fs.readFileSync ('bd.json'));
}
const escreverArquivo = (dados: any) : void => {
    fs.writeFileSync('./bd.json',JSON.stringify(dados));
}
type Endereco = {
 cep: string,
 rua: string,
 complemento?: string,
 bairro: string,
 cidade: string 
}
type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | null
}
const cadastrarUsuario = (dados: Usuario) : Usuario => {
    const bd = lerArquivo() as Usuario[]
    bd.push(dados)
    escreverArquivo(bd)
    return dados
}
const listarUsuario = (filtro?:string) : Usuario[] => {
    const bd = lerArquivo() as Usuario[]
    console.log(filtro);
    
    const usuarios = bd.filter(usuario => {
        if (filtro) {
            return usuario.profissao === filtro
        } else {
            return bd
        }
    })
    return usuarios
}
const detalharUsuario = (cpf: string) : Usuario =>{
 const bd = lerArquivo() as Usuario[]
 const usuario = bd.find(usuario => {
    return usuario.cpf === cpf
 })
 if (!usuario) {
    throw new Error ('Usuario não encontrado!!')
 }
 return usuario
}
const atualizarUsuario = (cpf:string, dados: Usuario) => {
    const bd = lerArquivo() as Usuario[]
    const usuario = bd.find(usuario => {
       return usuario.cpf === cpf
    })
    if (!usuario) {
       throw new Error ('Usuario não encontrado!!')
    }  
   Object.assign(usuario,dados)
   escreverArquivo(bd) // se colocar aqui escreverArquivo(usuario)
                       // o programa so escreve o objetoatualizado!!! 
return dados
}
const excluirUsusario = (cpf:string): Usuario =>{
    const bd = lerArquivo() as Usuario[]
    const usuario = bd.find(usuario => {
       return usuario.cpf === cpf
    })
    if (!usuario) {
       throw new Error ('Usuario não encontrado!!')
    }
    const exclusao = bd.filter(usuario => {
         return usuario.cpf !== cpf
    })
    escreverArquivo(exclusao)
    return usuario
}
//  const sergio = cadastrarUsuario({
//      nome: 'Sergio Costa',
//      email:'sergio@email.com',
//      cpf: '12345678910',
//      endereco: {
//          cep: '52050-100',
//          rua: 'Neto de Pedro',
//   bairro: 'Tamarineira',
//   cidade: 'Recife', 
//      },
// })
// //let bd = lerArquivo()
//console.log(bd);
//  const guido = cadastrarUsuario({
//      nome: 'Guido Cerqueira',
//      email:'sergio@email.com',
//      cpf: '99999999999',
//      endereco: {
//          cep: '52050-100',
//        rua: 'Neto de Pedro',
//   bairro: 'Tamarineira',
//   cidade: 'Recife', 
//    },
//  })
// bd = lerArquivo()
//console.log(bd);
//const detUsuario = detalharUsuario('99999999999')
//console.log(detUsuario);
// atualizarUsuario('99999999999', {
//          nome: 'Guido Cerqueira',
//          email:'sergio@email.com',
//          cpf: '99999999999',
//          profissao : 'professor backend',
//          endereco: {
//              cep: '52050-100',
//              rua: 'Neto de Pedro',
//       bairro: 'Tamarineira',
//       cidade: 'Recife', 
    
//          },
//      })
//excluirUsusario('12345678910')
    let bd = listarUsuario()
    console.log(bd);