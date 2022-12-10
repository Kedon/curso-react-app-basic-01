import React, { useState } from 'react';
import { Button, Table, Card, Form, Modal } from 'react-bootstrap';
import moment from 'moment';


const Conceitos = () => {

    const [show, showModal] = useState(false)
    const [usuario, alteraUsuario] = useState({
        nome: '',
        sobrenome: '',
        idade: '',
        status: false,
        data: ''
    })

    const [usuarios, adUsuario] = useState([])

    /** O nome "function" é reservado, então NUNCA sofre alteração
     *  NUNCA pode ser escrito diferente
     */
    function funcaoSimples(){

    }

    /** A arrow function é o jeito mais novo de se trabalhar com funções
     *  seu formato NUNCA muda
     */
    const arrowFunction = () => {

    }

    function alternanciaModal(){
        showModal(!show)
    }

    function dadosDoUsuario(nome,sobrenome,idade){
        alteraUsuario({
            nome: nome,
            sobrenome: sobrenome,
            idade: idade
        })
    }

    function dadosDoUsuarioObjeto(dados){
        console.log(dados)
        let dadosComData = dados
        dadosComData.data = moment().format('DD/MM/YYYY HH:mm')
        alteraUsuario(dados)
    }

    function alteraInput(parametros){
        /** Conceito de Spread Operator PARA OBJETO {} 
         *  Se tratando de objeto, o spread operator serve para
         *  alterar propriedades específicas em um objeto, mantendo as demais 
         * inalteradas
        */
       const {name, value} = parametros.target
        console.log(name, value)
        alteraUsuario({
            ...usuario, //mantenho tudo o que já tenho
            [name]: value //altera apenas o campo que está recebendo edição
        })

    }

    const adicionaUsuario = () => {
        /** Conceito de Spread Operator para array [] 
         * Se tratando de array, o spread operator serve para manter tudo o que estiver salvo e adicionar mais um item
        */
        adUsuario([
            ...usuarios, //mantenho tudo o que já tenho
            usuario //adiciono mais um itel ao que já tenho
        ])
        // [1,2,3,4,5]
        // ['tets', 'yrte', 'jnie']
        // [[1,2,3], [4,5,6], [7,8,9]]
        // [{nome: 'Valdenir'}, {nome: 'Heydion'}, {nome: 'João'}]
        // [{nome: 'Valdenir'}, 3, 'string']
    }


    return <div>
        <Button variant="success" onClick={funcaoSimples}>
            Funcão simples
        </Button>
        <Button variant="success" onClick={arrowFunction}>
            Arrow function
        </Button>

        <Button variant="success" onClick={alternanciaModal}>
            Abrir Modal
        </Button>

        <Button variant="success" onClick={() => dadosDoUsuario('Valdenir', 'Flauzino', 39)}>
            Altera usuário
        </Button>

        <Button variant="success" onClick={() => dadosDoUsuarioObjeto({nome: 'Heydion', sobrenome: 'Rixon', idade: 33})}>
            Altera usuário Objeto
        </Button>
        <div>
        <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control name="nome" type="text" value={usuario.nome} placeholder="Nome" onChange={(event) => alteraInput(event)} />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control name="sobrenome" type="text" value={usuario.sobrenome} placeholder="Sobrenome" onChange={(event) => alteraInput(event)} />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Idade</Form.Label>
            <Form.Control name="idade" type="text" value={usuario.idade} placeholder="Idade" onChange={(event) => alteraInput(event)} />
        </Form.Group>

        <Button variant="success" onClick={adicionaUsuario}>
            Adiciona usuário
        </Button>


        </div>
        <h2>Usuário</h2>
        <div>Data: {usuario.data}</div>
        <div>Nome: {usuario.nome}</div>
        <div>Sobrenome: {usuario.sobrenome}</div>
        <div>Idade: {usuario.idade}</div>

        <Table>
            <thead>
                <tr>
                    <th>nome</th>
                    <th>email</th>
                    <th>Sobrenome</th>
                </tr>
            </thead>    
            <tbody>
                {usuarios.map((it, i) => {

                    return <tr key={i}>
                        <td>{it.nome}</td>
                        <td>{it.sobrenome}</td>
                        <td>{it.idade}</td>
                    </tr>
                }
                
                )}
                
            </tbody>
        </Table>

        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={alternanciaModal}>Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>
    </div>
}

export default Conceitos