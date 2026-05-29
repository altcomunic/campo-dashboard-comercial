# Dashboard Comercial Campo Nutrição Animal

Projeto React + TypeScript + Vite para publicação no GitHub/Vercel.

## Como rodar localmente

1. Instale o Node.js LTS:
   https://nodejs.org

2. Abra o terminal dentro da pasta do projeto.

3. Instale as dependências:

```bash
npm install
```

4. Rode o projeto:

```bash
npm run dev
```

5. Abra no navegador o endereço exibido no terminal, normalmente:

```text
http://localhost:5173
```

## Como publicar no GitHub

1. Crie um repositório novo no GitHub.
2. Envie todos os arquivos deste projeto.
3. No terminal:

```bash
git init
git add .
git commit -m "Dashboard comercial Campo"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
git push -u origin main
```

## Como publicar na Vercel

1. Acesse https://vercel.com
2. Clique em Add New Project.
3. Importe o repositório do GitHub.
4. Framework: Vite.
5. Build command: npm run build.
6. Output directory: dist.
7. Clique em Deploy.

## Observação

Os dados estão em:

```text
src/data/dashboardData.ts
```

Para atualizar os números, altere esse arquivo.
