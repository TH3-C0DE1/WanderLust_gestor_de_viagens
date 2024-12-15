# IONIC UTILS
Atualizado em 11.11.2024

## Estrutura de um projeto Ionic

```
📦ionic-demo-app
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┃ ┣ 📜home-routing.module.ts
 ┃ ┃ ┃ ┣ 📜home.module.ts
 ┃ ┃ ┃ ┣ 📜home.page.html
 ┃ ┃ ┃ ┣ 📜home.page.scss
 ┃ ┃ ┃ ┣ 📜home.page.spec.ts
 ┃ ┃ ┃ ┗ 📜home.page.ts
 ┃ ┃ ┣ 📜app-routing.module.ts
 ┃ ┃ ┣ 📜app.component.html
 ┃ ┃ ┣ 📜app.component.scss
 ┃ ┃ ┣ 📜app.component.spec.ts
 ┃ ┃ ┣ 📜app.component.ts
 ┃ ┃ ┗ 📜app.module.ts
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂icon
 ┃ ┃ ┃ ┗ 📜favicon.png
 ┃ ┃ ┗ 📜shapes.svg
 ┃ ┣ 📂environments
 ┃ ┃ ┣ 📜environment.prod.ts
 ┃ ┃ ┗ 📜environment.ts
 ┃ ┣ 📂theme
 ┃ ┃ ┗ 📜variables.scss
 ┃ ┣ 📜global.scss
 ┃ ┣ 📜index.html
 ┃ ┣ 📜main.ts
 ┃ ┣ 📜polyfills.ts
 ┃ ┣ 📜test.ts
 ┃ ┗ 📜zone-flags.ts
 ┣ 📜.browserslistrc
 ┣ 📜.editorconfig
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜angular.json
 ┣ 📜capacitor.config.ts
 ┣ 📜ionic.config.json
 ┣ 📜karma.conf.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜tsconfig.app.json
 ┣ 📜tsconfig.json
 ┗ 📜tsconfig.spec.json
 ```

 | Ficheiro/Pasta                  | Descrição                                                                                                                                                          |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **src/**                        | Pasta principal do código-fonte da aplicação.                                                                                                                      |
| ├── **app/**                    | Pasta que contém os módulos e componentes principais da aplicação.                                                                                                 |
| │   ├── **home/**               | Módulo e componentes relacionados à página "Home". Inclui o ficheiro de roteamento, HTML, SCSS e o próprio componente.                                            |
| │   ├── **home-routing.module.ts** | Ficheiro de roteamento para o módulo "Home". Define as rotas específicas para esta página.                                                                  |
| │   ├── **home.page.html**      | Template HTML da página "Home".                                                                                                                                    |
| │   ├── **home.page.scss**      | Ficheiro de estilo (CSS/SCSS) específico para a página "Home".                                                                                                     |
| │   ├── **home.page.spec.ts**   | Ficheiro de teste unitário para a página "Home".                                                                                                                   |
| │   ├── **home.page.ts**        | Componente TypeScript da página "Home".                                                                                                                            |
| │   ├── **app-routing.module.ts** | Ficheiro de roteamento principal da aplicação, definindo rotas entre módulos e páginas.                                                                     |
| │   ├── **app.component.html**  | Template HTML do componente principal da aplicação.                                                                                                                |
| │   ├── **app.component.scss**  | Ficheiro de estilo (CSS/SCSS) para o componente principal da aplicação.                                                                                            |
| │   ├── **app.component.spec.ts** | Ficheiro de teste unitário para o componente principal da aplicação.                                                                                          |
| │   ├── **app.component.ts**    | Componente TypeScript principal da aplicação, onde são definidos comportamentos e ciclo de vida da aplicação.                                                     |
| │   └── **app.module.ts**       | Módulo principal da aplicação, onde são declarados módulos, componentes e serviços globais.                                                                       |
| **assets/**                     | Pasta que armazena ficheiros estáticos, como imagens e ícones, que serão utilizados pela aplicação.                                                               |
| ├── **icon/**                   | Subpasta para ícones e imagens da aplicação.                                                                                                                       |
| │   ├── **favicon.png**         | Ícone de favicon, geralmente exibido em navegadores e separadores.                                                                                                 |
| │   └── **shapes.svg**          | Ficheiro SVG para formas ou ícones personalizados.                                                                                                                |
| **environments/**               | Pasta para ficheiros de configuração de ambiente, como desenvolvimento e produção.                                                                                |
| ├── **environment.prod.ts**     | Ficheiro de configuração para o ambiente de produção.                                                                                                             |
| └── **environment.ts**          | Ficheiro de configuração para o ambiente de desenvolvimento.                                                                                                      |
| **theme/**                      | Pasta para ficheiros de temas e estilos globais da aplicação.                                                                                                     |
| ├── **variables.scss**          | Ficheiro SCSS para definir variáveis de estilo, como cores e fontes, usadas globalmente.                                                                           |
| └── **global.scss**             | Ficheiro SCSS global da aplicação, onde são definidos estilos aplicáveis a todas as páginas e componentes.                                                        |
| **index.html**                  | Ficheiro HTML principal que serve como ponto de entrada para a aplicação Ionic.                                                                                   |
| **main.ts**                     | Ficheiro TypeScript principal que inicia a aplicação Angular/Ionic.                                                                                               |
| **polyfills.ts**                | Ficheiro que contém os polyfills, usados para compatibilidade com navegadores mais antigos.                                                                       |
| **test.ts**                     | Ficheiro de configuração para testes unitários.                                                                                                                   |
| **zone-flags.ts**               | Ficheiro de configuração para zonas (zones) no Angular, utilizado para manipulação de ciclo de vida assíncrono.                                                   |
| **.browserslistrc**             | Ficheiro de configuração para definir os navegadores suportados pela aplicação.                                                                                   |
| **.editorconfig**               | Ficheiro que define configurações padrão para editores de texto, como indentação e codificação de caracteres.                                                     |
| **.eslintrc.json**              | Ficheiro de configuração para ESLint, utilizado para definir regras de linting para o código TypeScript.                                                          |
| **.gitignore**                  | Ficheiro que define quais ficheiros e pastas devem ser ignorados pelo Git.                                                                                        |
| **angular.json**                | Ficheiro de configuração do Angular CLI, define a estrutura do projeto, builders e outras opções de build e serve do Angular.                                     |
| **capacitor.config.ts**         | Ficheiro de configuração para o Capacitor, uma biblioteca para integrações nativas.                                                                               |
| **ionic.config.json**           | Ficheiro de configuração para o Ionic CLI, define configurações gerais do projeto Ionic.                                                                          |
| **karma.conf.js**               | Ficheiro de configuração para o Karma, uma ferramenta de teste para Angular.                                                                                      |
| **package-lock.json**           | Ficheiro gerado automaticamente que regista as versões exatas das dependências instaladas.                                                                       |
| **package.json**                | Ficheiro que lista as dependências do projeto e scripts npm.                                                                                                      |
| **tsconfig.app.json**           | Ficheiro de configuração TypeScript específico para a aplicação principal.                                                                                        |
| **tsconfig.json**               | Ficheiro de configuração TypeScript principal do projeto.                                                                                                         |
| **tsconfig.spec.json**          | Ficheiro de configuração TypeScript específico para testes unitários.                                                                                            |

## Cli para criar uma nova página

```cmd
ionic g page pages/nova-pagina
```

## Cli para criar um novo componente

```cmd
ionic g component components/novo-componente
```

## Cli para compilar o projeto para produção

```cmd
ionic build --prod
```

## Como navegar entre páginas - routerLink

### HTML

```html
    <ion-button routerLink="/password-recovery">
       NAVEGAR ATRAVÉS DO ROUTER LINK
    </ion-button>
```

## Como navegar entre páginas - router

```html
    <ion-button (click)="goTo()">
        NAVEGAR
    </ion-button>
```

```ts
  constructor(
    private router: Router) {
  }

  async goTo() {
    await this.router.navigate([`/outra-pagina`]);
  }
```


## Como voltar atrás

### HTML

```html
<ion-header>
  <ion-toolbar color="dark">
    <ion-title>TESTE</ion-title>
    <ion-buttons slot="start">
      <ion-button (click)="goBack()">
        <ion-icon size="small" slot="icon-only" name="arrow-back"></ion-icon>
        Voltar
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
```

### TS

```ts
  constructor(
    private router: Router,
    private navController: NavController) {
  }

  async goBack() {
    this.navController.setDirection('back');
    await this.router.navigate(['/intro'], { replaceUrl: true });
  }
  ```

## Como abrir uma modal

### HTML
```html
    <ion-button (click)="openModal()">
        ABRIR MODAL
    </ion-button>
```

### TS
```ts
    constructor(
        private modalCtrl: ModalController
    )

    async openModal() {
        const modal = await this.modalCtrl.create({
        component: ModalComponent,
        cssClass: 'modal-fullScreen',
        componentProps: {

        }
        });

        await modal.present();

        const { data, role } = await modal.onWillDismiss();
        if (data && data.message) {
        
        }
    }
```