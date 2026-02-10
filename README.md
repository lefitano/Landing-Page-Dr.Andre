# 🦷 Dr. André Guedes - Odontologia Estética

Landing page profissional para consultório odontológico especializado em odontologia estética premium.


## 📋 Sobre o Projeto
Site institucional feito para o Dr. André Guedes, dentista.

### ✨ Principais Funcionalidades

- 🎨 Design moderno e responsivo
- 📱 Totalmente adaptado para mobile, tablet e desktop
- 🖼️ Carrosséis interativos de resultados e certificações
- 📍 Integração com Google Maps (localização do consultório)
- 💬 Links diretos para WhatsApp
- 📄 Download do PDF do curso
- ⚡ Performance otimizada
- 🔄 Animações suaves e transições

## 🚀 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estruturação
- **CSS3** - Estilização com variáveis CSS e flexbox/grid
- **JavaScript** - Interatividade e funcionalidades

### Bibliotecas e Recursos
- **Font Awesome 6.5.1** - Ícones
- **Google Fonts** - Tipografia 

### Hospedagem
- **Netlify** - Deploy e hospedagem gratuita

## 🎯 Funcionalidades JavaScript

### Menu Mobile
- Hamburguer menu animado
- Fecha ao clicar em links
- Toggle suave

### Scroll Suave
- Navegação fluida entre seções
- Animação ao clicar nos links âncora

### Carrosséis
- **Classe `Carrossel`** (Resultados)
- **Classe `CarrosselCurso`** (Certificações)
- Recursos:
  - Navegação por botões
  - Swipe touch (mobile)
  - Drag mouse (desktop)
  - Navegação por teclado (setas)
  - Indicadores clicáveis
  - Auto-play (desativado por padrão)

---

## 🎨 Personalização

### Cores (Variáveis CSS)

Todas as cores podem ser alteradas em `:root` no `style.css`:
```css
:root {
    --cor-primaria: #007bff;        
    --cor-whatsapp: #25D366;         
    --cor-instagram: #E1306C;        
    
}
```

### Fontes
```css
--font-principal: 'Poppins', sans-serif;
--font-secundaria: 'Inter', sans-serif;
--font-destaque: 'Playfair Display', serif;
```

### Espaçamentos
```css
--espacamento-secao: 80px;
--espacamento-grande: 60px;
--espacamento-medio: 40px;
--espacamento-pequeno: 20px;
```

---

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:

- **Desktop**: > 968px
- **Tablet**: 768px - 968px
- **Mobile**: < 480px