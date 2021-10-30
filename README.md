# nodejs-advanced-tdd-clean-architecture

> ## Andamento Curso

- Section 1: Introdução
- [ ] Introdução
- [ ] Repositório do Github
- Section 2: Configurando o Ambiente
- [ ] Atalhos do Git
- [ ] Plugins e EditorConfig
- [ ] Typescript - Target
- [ ] Typescript - Module
- [ ] Typescript - Strict Mode
- [ ] Eslint
- [ ] Jest
- [ ] Lint Staged & Husky
- Section 3: Login com Facebook - Domain Layer
- [ ] Definindo o caso de uso e criando a interface no Domain Layer
- [ ] Desacoplando a integração com API de terceiros
- [ ] Diferentes formas de mockar uma dependência
- [ ] Diferentes formas de isolar a criação do SUT
- [ ] Desacoplando Repositórios e aplicando Intersection Types
- [ ] Removendo detalhes de implementação do Service
- [ ] Movendo regras de negócio para uma entidade no domínio
- [ ] Mockando uma dependência criada pela própria classe
- [ ] Criando Token de Acesso com expiração
- [ ] Fazendo o Service implementar a feature do domínio
- [ ] Testando casos de exceção
- [ ] Diagrama de Dependências atualizado e otimização de código
- Section 4: Integrando com API do Facebook - Infra Layer
- [ ] Obtendo o App Token (token da empresa)
- [ ] Obtendo o debug token e os dados do usuário
- [ ] Refatorando o FacebookApi e adicionando Generics ao HttpGetClient
- [ ] Diagrama de Dependências e Code Coverage
- [ ] Implementando o HttpClient com Axios
- [ ] Gerando Token de Acesso com o JWT
- Section 5: Anti Corruption Layer - Repositório com TypeORM
- [ ] Testando o repositório com Postgres em memória e TypeORM
- [ ] Tornando a criação do banco em memória reutilizável
- [ ] Testando a implementação do save (create/update)
- Section 6: Login com Facebook - Application Layer
- [ ] Testando o FacebookLogin Controller
- [ ] Criando erros customizados, helpers e Generics
- [ ] Isolando a validação do Controller
- [ ] Simplificando os testes do Controller
- [ ] Aplicando o Composite Pattern
- [ ] Aplicando o Fluent Builder Pattern
- [ ] Applicando o Template Method Pattern
- Section 7: Login com Facebook - Main Layer (Composition)
- [ ] Configurando o Jest para testes de integração
- [ ] Testando a API do Facebook
- [ ] Configurando a API com express
- [ ] Aplicando o Factory Pattern
- [ ] Aplicando o Adapter Pattern
- [ ] Refatorando o projeto
- [ ] Criando teste de integração do Facebook Login
- [ ] Testando a API com dados reais
- [ ] Ajustes finais
- Section 8: Clean Architecture
- [ ] Outra forma de organizar a arquitetura
- [ ] Use Cases funcionais
- [ ] Alterando o UseCase para retornar um DTO
- Section 9: Middleware de Autenticação
- [ ] Chain of Responsibility, Proxy e Decorator
- [ ] Use Case / Middle Man
- [ ] Anti-Patterns (Code Smells)
- [ ] Validando token com JWT
- [ ] Application Layer - Criando o Middleware
- [ ] Adaptando o Middleware para o Express
- [ ] Criando teste de integração
- [ ] Eliminando o Middle Man
- [ ] Debugando com ts-node-dev
- Section 10: Atualizar Foto do Perfil - Domain Layer
- [ ] Refatorando a Arquitetura
- [ ] Use Case
- [ ] Integrando com o FileStorage
- [ ] Integrando com o repositório de UserProfile
- [ ] Testando regras de negócio
- [ ] Movendo testes de negócio para a Entity UserProfile
- [ ] Testando retorno do caso de uso e fluxo de exceção
- [ ] Test Coverage
- Section 11: Atualizar Foto do Perfil - Infra Layer
- [ ] UUID
- [ ] UUID sem lib de terceiros
- [ ] Refatorando a Arquitetura
- [ ] Upload com AWS S3 - Parte 1
- [ ] Upload com AWS S3 - Parte 2
- [ ] Remover arquivos na AWS S3
- [ ] Integrando com repositório de salvar imagem
- [ ] Integrando com repositório de carregar dados do perfil
- Section 12: Atualizar Foto do Perfil - Application Layer
- [ ] Implementando o Controller que apaga a foto de perfil
- [ ] Validando a imagem recebida do client
- [ ] Integrando com o UseCase
- [ ] Criando Validator para Buffer obrigatório
- [ ] Criando Validator para MimeType
- [ ] Criando Validator para tamanho máximo de arquivo
- [ ] Refatorando o Controller para utilizar o Builder
- Section 13: Atualizar Foto do Perfil - Main Layer
- [ ] Criando teste de integração para a AWS S3
- [ ] Corrigindo use case para adicionar extensão no arquivo
- [ ] Criando teste de integração para a rota de apagar foto
- [ ] Ajustes nos Controllers de upload
- [ ] Upload com Multer
- [ ] Criando teste de integração para a rota de salvar foto
- [ ] Teste em ambiente real
- Section 14: Bônus
- [ ] Ormconfig com dados dinâmicos
- [ ] Como fazer transaction de BD no Clean Architecture
- [ ] Gerenciando a criação da conexão com banco com Singleton Pattern
- [ ] Gerenciando o fechamento da conexão com banco com Singleton Pattern
- [ ] Gerenciando operações de transações no banco com Singleton Pattern
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
