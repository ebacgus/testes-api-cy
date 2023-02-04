/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'

describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() => {
          cy.cadastarUsuario( "Fulano da Silva" , "beltrano@qa.com.br","teste" ,"true").then(tkn => { token = tkn })
         cy.token('ebac.gus@teste.com.br', 'teste').then(tkn => { token = tkn })
     });
     
     
    });

    it.only('Deve validar contrato de usuários', () => {
     cy.request('usuarios').then(response => {
          return contrato.validateAsync(response.body)
    
  });

    

    it('Deve listar usuários cadastrados', () => {
     cy.request({
          method: 'GET',
          url: 'usuarios'
      }).then((response) => {
          expect(response.body.usuarios[3].nome).to.equal('Gustavo Souza')
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('usuarios')
          expect(response.duration).to.be.lessThan(1300)
    });
    it('Deve cadastrar um usuário com sucesso', () => {
  
     cy.request({
      method: 'POST',
      url:'usuarios',
      body: {
        "nome": "Gustavo de Souza Pereira",
        "email": "Pereira@qa.com.br",
        "password": "qualidade",
        "administrador": "true"
      },
      headers: { authorization: token }
    }).then((response) => {
        expect(response.status).to.equal(201)
        expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })

     })
});

   


    it('Deve validar um usuário com email inválido', () => {
     cy.cadastrarUsuario( 
          "Gustavo Souza" , "ebac.gus@teste.com.br", "teste","true")
     .then((response) => {
         
     
    });

    it('Deve editar um usuário previamente cadastrado', () => {
     let usuario = `Gustavo Souza ${Math.floor(Math.random() * 100000000)}`
     cy.cadastrarUsuario( token, usuario , "ebac.gus@teste.com.br", "teste","true")
     .then(response => {
         let id = response.body._id

         cy.request({
             method: 'PUT', 
             url: `usuarios/${id}`,
             headers: {authorization: token}, 
             body: 
             {
               "nome": "Gustavo de Souza Pereira",
               "email": "Pereira@qa.com.br",
               "password": "qualidade",
               "administrador": "true"
             },
               },
          )
     
     
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
     let uuario = `Gustavo Souza ${Math.floor(Math.random() * 100000000)}`
     cy.cadastrarUsuario(token, usuario, "ebac.gus@teste.com.br", "teste","true")
     .then(response => {
         let id = response.body._id
         cy.request({
             method: 'DELETE',
             url: `usuarios/${id}`,
             headers: {authorization: token}
         }).then(response =>{
             expect(response.body.message).to.equal('Registro excluído com sucesso')
             expect(response.status).to.equal(200)
         })
    });
    })

})
    })

    })
