# 🎨 Atelier CRM

**Gestão completa para artistas plásticos** — Um sistema CRM single-page (SPA) que roda 100% no navegador, sem necessidade de servidor. Seus dados ficam salvos localmente no `localStorage`.

![Versão](https://img.shields.io/badge/versão-1.0-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)

---

## ✨ Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| **📊 Dashboard** | Visão geral do acervo, obras recentes, gráfico de produtividade mensal |
| **🖼️ Catálogo** | Cadastro completo de obras com fotos, dimensões, técnica, preço e histórico |
| **👤 Clientes** | Gestão de clientes com perfil, histórico de aquisições e tags |
| **💰 Vendas** | Registro de vendas com recibos em PDF, propostas e pipeline de status |
| **📜 Certificados** | Geração de certificados de autenticidade com QR Code |
| **📚 Referências** | Board de referências visuais (imagens, links, notas) |
| **📦 Encomendas** | Controle de trabalhos sob encomenda com prazos |
| **🏛️ Exposições** | Agenda de mostras, feiras e editais |
| **🖼️ Galeria Virtual 2D** | Tour guiado, zoom e lightbox pelas obras disponíveis |
| **💎 Precificador** | Calculadora inteligente de preços baseada em custos + hora + mercado |
| **🔧 Atelier** | Gestão de estoque de materiais, fornecedores, consumo e custo por obra |
| **📈 Financeiro** | Fluxo de caixa com entradas, saídas e saldo |
| **🤝 Rede Profissional** | Contatos, pipeline de relacionamento, interações e mapa de influência |
| **📖 Diário Criativo** | Entradas diárias, cronograma, documentação de processo e estatísticas |
| **⚙️ Configurações** | Perfil, tema, idioma, acessibilidade e segurança |

## 🌐 Multi-idioma

Suporte a 5 idiomas com troca instantânea sem reload:

- 🇧🇷 Português (BR)
- 🇺🇸 English (US)
- 🇪🇸 Español
- 🇫🇷 Français
- 🇮🇹 Italiano

A formatação de moeda e datas segue o locale selecionado. Documentos PDF (recibos, certificados) também respeitam o idioma.

## ♿ Acessibilidade (WCAG 2.1 AA)

- Navegação completa por teclado (Tab, Enter, Escape, setas)
- Atributos ARIA em componentes interativos
- Modo **Alto Contraste** (toggle extra além dos 5 temas visuais)
- **Fonte ajustável** em 3 tamanhos (pequeno, médio, grande)
- Respeita `prefers-reduced-motion`
- Foco visual claro (`focus-visible`)
- Skip to content link
- Leitor de tela friendly

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl/Cmd + K` | Busca global (spotlight) |
| `Ctrl/Cmd + N` | Nova obra |
| `Ctrl/Cmd + V` | Nova venda |
| `Ctrl/Cmd + D` | Dashboard |
| `Ctrl/Cmd + B` | Backup rápido |
| `?` | Mostrar todos os atalhos |

## 🎨 Temas Visuais

1. **Clássico Atelier** — Tons terrosos, serifado elegante
2. **Clean Minimalista** — Branco, azul, moderno
3. **Moderno Escuro** — Dark mode com ciano
4. **Galeria Branca** — Minimalismo com serifas
5. **Boho Artístico** — Aconchegante tons quentes

## 🔒 Segurança

- **PIN opcional** de 4 dígitos para acesso (armazenado em texto plano — apenas para controle básico de acesso local)
- **Auto-lock** após 10 minutos de inatividade
- Confirmação em ações destrutivas (exclusão de obra, reset)
- Sanitização de inputs contra XSS básico

## 🚀 Como usar

1. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge, Safari)
2. Navegue pelos módulos usando a sidebar
3. Os dados são salvos automaticamente no `localStorage`
4. Use o botão **Backup** no header para exportar seus dados

### Servindo localmente (recomendado para Service Worker)

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .

# PHP
php -S localhost:8080
```

Depois acesse `http://localhost:8080`

## 📁 Estrutura de Arquivos

```
ateliercrm/
├── src/              # Módulos TypeScript, views, serviços e estilos
├── __tests__/        # Testes Jest
├── supabase/         # Migration e Edge Function opcionais do portal remoto
├── index.html        # Casca da aplicação
├── translations.js   # Sistema de traduções multi-idioma
└── sw.js             # Service Worker para cache offline
```

## 🔧 Troubleshooting

| Problema | Solução |
|----------|---------|
| Dados não salvam | Verifique se o `localStorage` está habilitado no navegador |
| Service Worker não registra | Sirva os arquivos via HTTP (não `file://`) |
| jsPDF não carrega | Verifique conexão com internet (CDN) |
| Galeria 3D lenta | Reduza o número de obras na galeria |
| Tradução não aparece | Certifique-se que `translations.js` está no mesmo diretório |

## 💾 Backup e Restore

- **Exportar:** Clique no botão 💾 Backup no header → baixa um arquivo `.json`
- **Importar:** Arraste o arquivo `.json` para a página ou use o seletor de arquivo
- **Recomendação:** Faça backup semanal dos seus dados

## 🔐 Privacidade e portal remoto

- Dados, fotos e credenciais permanecem locais por padrão. Credenciais temporárias de Google Drive/WebDAV não entram no backup comum e são removidas ao encerrar a sessão do navegador.
- Um link de Portal do Cliente só deve ser compartilhado depois de configurar o modo remoto. A integração opcional está em `supabase/`: aplique a migration e publique a Edge Function `public-portal`.
- Use somente a **chave publicável** do Supabase no aplicativo. A chave secreta/service role pertence exclusivamente à Edge Function.
- O portal remoto usa tokens criptograficamente aleatórios, guarda somente seu hash no banco e expira. Aceites exigem confirmação explícita.

### Preparar o modo remoto

1. Crie um projeto Supabase e habilite autenticação por e-mail para o artista.
2. Aplique `supabase/migrations/20260829000000_atelier_crm_remote.sql`.
3. Publique `supabase/functions/public-portal` e configure a `SUPABASE_SERVICE_ROLE_KEY` apenas no ambiente da função.
4. Em Configurações → Portal remoto, informe a URL do projeto e a chave publicável.

As políticas de banco restringem snapshots e portais ao artista autenticado. A função pública retorna somente o conteúdo já preparado para aquele token; ela nunca devolve dados internos do CRM.

## 🧪 Compatibilidade

- Chrome 80+
- Firefox 80+
- Safari 14+
- Edge 80+
- Opera 67+

## 🛣️ Roadmap

- [x] Catálogo de obras com fotos
- [x] Clientes e vendas com recibos PDF
- [x] Certificados de autenticidade com QR Code
- [x] Galeria Virtual 2D
- [x] Precificador inteligente
- [x] Gestão de ateliê (estoque/materiais)
- [x] Rede profissional e networking
- [x] Diário criativo e cronograma
- [x] Multi-idioma (5 idiomas)
- [x] Acessibilidade WCAG 2.1 AA
- [x] Service Worker offline
- [x] Snapshots locais, Google Drive e WebDAV
- [x] Base opcional para portal remoto seguro (Supabase)
- [ ] Versão mobile nativa (PWA)
- [ ] Integração com impressoras fiscais
- [ ] Marketplace integrado

## 👩‍🎨 Sobre

**Feito por artistas, para artistas.**

Atelier CRM é uma ferramenta gratuita e open-source criada para ajudar artistas plásticos a gerenciar sua carreira com dignidade e profissionalismo.

---

<p align="center">🎨 <strong>Atelier CRM v1.0</strong> — Gerencie sua arte com a excelência que ela merece.</p>
