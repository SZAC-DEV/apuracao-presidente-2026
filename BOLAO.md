# Como ligar o Bolão da Apuração (Firebase)

Leva uns 10 minutos e é gratuito. Faça pelo computador.

## 1. Criar o projeto
1. Entre em https://console.firebase.google.com com a sua conta Google.
2. Clique em **Criar um projeto**, dê o nome `bolao-apuracao` e continue. O Google Analytics pode ficar **desativado**.

## 2. Ligar o login anônimo
1. No menu da esquerda: **Criação → Authentication → Vamos começar**.
2. Na aba **Método de login**, escolha **Anônimo**, ative e salve.
3. Na aba **Configurações → Domínios autorizados**, clique em **Adicionar domínio** e coloque `szac-dev.github.io`.

## 3. Criar o banco de dados
1. No menu: **Criação → Firestore Database → Criar banco de dados**.
2. Local: `southamerica-east1 (São Paulo)`. Modo: **produção**.
3. Abra a aba **Regras**, apague tudo, cole o conteúdo do arquivo `firestore.rules` deste projeto e clique em **Publicar**.

## 4. Pegar a configuração
1. Clique na engrenagem ⚙️ ao lado de "Visão geral do projeto" → **Configurações do projeto**.
2. Em **Seus apps**, clique no ícone **</>** (Web), dê o nome `site` e registre. **Não** marque Firebase Hosting.
3. Vai aparecer um bloco assim:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

Copie esse bloco e mande para o Claude, ou cole no `index.html`, no lugar de `const FIREBASE = null;`.

> Esses dados não são senha: eles ficam visíveis no site de qualquer forma. Quem protege o banco são as regras do passo 3.

## Mudar o horário de encerramento
Mude nos **dois** lugares, com o mesmo horário:
- `index.html`: `const BOLAO_FECHA = new Date('2026-10-25T19:00:00-03:00');`
- `firestore.rules`: `timestamp.value(...)`, que é o horário em milissegundos (UTC). Depois publique as regras de novo no Console.

## Apagar um palpite (nome ofensivo, por exemplo)
Console → Firestore Database → coleção `palpites` → clique no documento → **Excluir documento**.
