# Nodejs Advanced TDD Clean Architecture

Repo: https://github.com/rmanguinho/advanced-node

## Requirements
- NodeJS v14.17.4
- Docker 20.10.14
- Docker Compose 1.25.420

## Installing
```
npm install
npm run build
```

## Running
```
docker-compose up --build
npm start
```

## Tests
```
npm test
npm test:fb-api
```

> ## Andamento Curso

- Section 1: Introdução
- [x] Introdução
- [x] Repositório do Github
- Section 2: Configurando o Ambiente
- [x] Atalhos do Git
- [x] Plugins e EditorConfig
- [x] Typescript - Target
- [x] Typescript - Module
- [x] Typescript - Strict Mode
- [x] Eslint
- [x] Jest
- [x] Lint Staged & Husky
- Section 3: Login com Facebook - Domain Layer
- [x] Definindo o caso de uso e criando a interface no Domain Layer
- [x] Desacoplando a integração com API de terceiros
- [x] Diferentes formas de mockar uma dependência
- [x] Diferentes formas de isolar a criação do SUT
- [x] Desacoplando Repositórios e aplicando Intersection Types
- [x] Removendo detalhes de implementação do Service
- [x] Movendo regras de negócio para uma entidade no domínio
- [x] Mockando uma dependência criada pela própria classe
- [x] Criando Token de Acesso com expiração
- [x] Fazendo o Service implementar a feature do domínio
- [x] Testando casos de exceção
- [x] Diagrama de Dependências atualizado e otimização de código
- Section 4: Integrando com API do Facebook - Infra Layer
- [x] Obtendo o App Token (token da empresa)
- [x] Obtendo o debug token e os dados do usuário
- [x] Refatorando o FacebookApi e adicionando Generics ao HttpGetClient
- [x] Diagrama de Dependências e Code Coverage
- [x] Implementando o HttpClient com Axios
- [x] Gerando Token de Acesso com o JWT
- Section 5: Anti Corruption Layer - Repositório com TypeORM
- [x] Testando o repositório com Postgres em memória e TypeORM
- [x] Tornando a criação do banco em memória reutilizável
- [x] Testando a implementação do save (create/update)
- Section 6: Login com Facebook - Application Layer
- [x] Testando o FacebookLogin Controller
- [x] Criando erros customizados, helpers e Generics
- [x] Isolando a validação do Controller
- [x] Simplificando os testes do Controller
- [x] Aplicando o Composite Pattern
- [x] Aplicando o Fluent Builder Pattern
- [x] Applicando o Template Method Pattern
- Section 7: Login com Facebook - Main Layer (Composition)
- [x] Configurando o Jest para testes de integração
- [x] Testando a API do Facebook
- [x] Configurando a API com express
- [x] Aplicando o Factory Pattern
- [x] Aplicando o Adapter Pattern
- [x] Refatorando o projeto
- [x] Criando teste de integração do Facebook Login
- [x] Testando a API com dados reais
- [x] Ajustes finais
- Section 8: Clean Architecture
- [x] Outra forma de organizar a arquitetura
- [x] Use Cases funcionais
- [x] Alterando o UseCase para retornar um DTO
- Section 9: Middleware de Autenticação
- [x] Chain of Responsibility, Proxy e Decorator
- [x] Use Case / Middle Man
- [x] Anti-Patterns (Code Smells)
- [x] Validando token com JWT
- [x] Application Layer - Criando o Middleware
- [x] Adaptando o Middleware para o Express
- [x] Criando teste de integração
- [x] Eliminando o Middle Man
- [x] Debugando com ts-node-dev
- Section 10: Atualizar Foto do Perfil - Domain Layer
- [x] Refatorando a Arquitetura
- [x] Use Case
- [x] Integrando com o FileStorage
- [x] Integrando com o repositório de UserProfile
- [x] Testando regras de negócio
- [x] Movendo testes de negócio para a Entity UserProfile
- [x] Testando retorno do caso de uso e fluxo de exceção
- [x] Test Coverage
- Section 11: Atualizar Foto do Perfil - Infra Layer
- [x] UUID
- [x] UUID sem lib de terceiros
- [x] Refatorando a Arquitetura
- [x] Upload com AWS S3 - Parte 1
- [x] Upload com AWS S3 - Parte 2
- [x] Remover arquivos na AWS S3
- [x] Integrando com repositório de salvar imagem
- [x] Integrando com repositório de carregar dados do perfil
- Section 12: Atualizar Foto do Perfil - Application Layer
- [x] Implementando o Controller que apaga a foto de perfil
- [x] Validando a imagem recebida do client
- [x] Integrando com o UseCase
- [x] Criando Validator para Buffer obrigatório
- [x] Criando Validator para MimeType
- [x] Criando Validator para tamanho máximo de arquivo
- [x] Refatorando o Controller para utilizar o Builder
- Section 13: Atualizar Foto do Perfil - Main Layer
- [x] Criando teste de integração para a AWS S3
- [x] Corrigindo use case para adicionar extensão no arquivo
- [x] Criando teste de integração para a rota de apagar foto
- [x] Ajustes nos Controllers de upload
- [x] Upload com Multer
- [x] Criando teste de integração para a rota de salvar foto
- [x] Teste em ambiente real
- Section 14: Bônus
- [x] Ormconfig com dados dinâmicos
- [x] Como fazer transaction de BD no Clean Architecture
- [x] Gerenciando a criação da conexão com banco com Singleton Pattern
- [x] Gerenciando o fechamento da conexão com banco com Singleton Pattern
- [x] Gerenciando operações de transações no banco com Singleton Pattern
- [ ] Utilizando repository do typeorm por dentro do Singleton
- [ ] Correção no UniqueId
- [ ] Correção na Transaction do TypeORM
- [ ] Atualização no Error do Typescript
- [ ] DB Transaction com Decorator Pattern
- [ ] Testando a Transaction em um caso real


> ## Princípios

* Single Responsibility
* Open Closed
* Liskov Substitution
* Interface Segregation
* Dependency Inversion
* Separation of Concerns
* Don't Repeat Yourself
* You Aren't Gonna Need It
* Keep It Simple
* Composition Over Inheritance
* Small Commits

> ## Design Patterns

* Factory
* Adapter
* Composite
* Decorator
* Command
* Dependency Injection
* Abstract Server
* Composition Root
* Builder
* Template Method
* Singleton
* Chain of Responsibility
* Proxy

> ## Code Smells (Anti-Patterns)

* Blank Lines
* Comments
* Data Clumps
* Divergent Change
* Duplicate Code
* Inappropriate Intimacy
* Feature Envy
* Large Class
* Long Method
* Long Parameter List
* Middle Man
* Primitive Obsession
* Refused Bequest
* Shotgun Surgery
* Speculative Generality

> ## Metodologias e Designs

* TDD
* Clean Architecture
* DDD
* Refactoring
* GitFlow
* Modular Design
* Dependency Diagrams
* Use Cases
* Spike (Agile)

> ## Bibliotecas e Ferramentas

* NPM
* Typescript
* Git
* Jest
* Ts-Jest
* Jest-Mock-Extended
* TypeORM
* AWS-SDK
* Multer
* UUID
* Axios
* Postgres
* JsonWebToken
* Express
* Cors
* Supertest
* Husky
* Lint Staged
* Eslint
* Standard Javascript Style
* Rimraf
* In-Memory Postgres Server
* Module-Alias
* Npm Check
* Travis CI
* Coverals
* DotEnv
* Ts-Node-Dev

> ## Features do Typescript

* POO Avançado
* Strict Mode
* Interface
* TypeAlias
* Namespace
* Utility Types
* Modularização de Paths
* Configurações
* Build

> ## Features de Testes

* Testes Unitários
* Testes de Integração
* Cobertura de Testes
* Test Doubles
* Mocks
* Stubs
* Spies
* Fakes
