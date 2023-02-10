/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'

describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() => {
          cy.cadastarUsuario( "Fulano da Silva" , "beltrano@qa.com.br","teste" ,"true").then(tkn => { token = tkn })
         cy.token('ebac.gus@teste.com.br', 'teste').then(tkn => { token = tkn })
     });
     
     
    });

    it('Deve validar contrato de usuários', () => {
        cy.request('usuario').then(response => {
            return contrato.validateAsync(response.body)
        }) 
    
  });

    

    it('Deve listar usuarios cadastrados ', () => {
    cy.request({
        method: 'GET',
        url: 'usuarios'
    }).then((response) => {
        expect(response.body.usuarios[2].nome).to.equal("Gustavo Pereira")
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('usuarios')
    })
        
    });




    
    it('Deve cadastrar um usuário com sucesso', () => {
        let produto = `Usuario EBAC ${Math.floor(Math.random() * 100000000)}`
    cy.request({
        method: 'POST',
        url:'usuarios',
        body: {
            "nome": "Nalu   Pereira",
            "email": "nalu@qacom.br",
            "password": "bebe",
            "administrador": "true"
          }
    }).then((response) => {
        expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        
    })

    })

    


   


    it('Deve validar um usuário com email inválido', () => {
        cy.cadastrarUsuario('Marina trudes Pereira','nalu@filha.com','bebe',true)
        .then((response) => {
            expect(response.status).to.equal(400)
           
        
            })
     
    });



    it('Deve editar um usuário previamente cadastrado', () => {
     
        cy.request('usuarios').then(response => {
            
            let id = response.body.usuarios[3]._id
            cy.request({
                method:'PUT',
                url:`usuarios/$(id)`,
                body:
                {
                    "nome": "Usuario editado 2023",
                    "email": "editor@qa.com.br",
                    "password": "teste",
                    "administrador": "true"
                }
            })


        }).then((response) => {
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
            
            })
    
    
     
    




    it('Deve deletar um usuário previamente cadastrado', () => {
      
        cy.request('usuarios').then(response => {
            
            let id = response.body.usuarios[9]._id
            cy.request({
                method:'DELETE',
                url:`usuarios/$(id)`,
                body:
                    {
                        "nome": "Fulano da Silva",
                        "email": "fulano@software.com.br",
                        "password": "ebacqualidade",
                        "administrador": "true"
                    }
                    
                
                
     
    });
    

    }).then((response) => {
        expect(response.body.message).to.equal('nenhum registro excluido')


})
    })
