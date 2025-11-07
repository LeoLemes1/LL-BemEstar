# 💬 Guia de Mensagens Humanizadas - ProEx

## 🎯 Filosofia

Todas as mensagens do ProEx são **amigáveis, motivacionais e SEM julgamento**. Nada de constrangimento ou culpa!

---

## 📊 Mensagens de Calorias

### 🟢 Abaixo de 50% da meta:
```
"Ótimo começo! Ainda tem bastante margem hoje 😊"
```

### 🟢 50-80% da meta:
```
"Vai bem! Continue assim 👍"
```

### 🟡 80-95% da meta:
```
"Tá chegando perto da meta! Tá indo muito bem 🎯"
```

### 🟢 95-105% da meta (IDEAL!):
```
"Dentro da meta! Perfeito! 🎉"
```

### 🟠 105-115% da meta:
```
"Passou um pouquinho, mas tá tudo bem! Amanhã compensa 😉"
```

### 🟠 115-130% da meta:
```
"Hoje foi um dia especial! Aproveita e volta ao ritmo amanhã 💪"
```

### 🟠 Acima de 130%:
```
"Tudo bem ter dias assim! O importante é o equilíbrio na semana 🌟"
```

---

## ⚠️ Alertas no Dashboard (Baseado em %)

### 85-100% (Chegando perto):
```
⚠️ "Opa! Tá chegando pertinho do limite, hein! Mas se bater tá tudo bem! 😉"
Cor: Amarelo (bg-yellow-50, border-yellow-500)
```

### 100-115% (Passou um pouco):
```
🎉 "Passou um pouquinho da meta, mas relaxa! Um dia fora não estraga nada. 
    Amanhã a gente compensa! 💪"
Cor: Laranja (bg-orange-50, border-orange-500)
```

### Acima de 115% (Passou bastante):
```
😊 "Hoje foi um dia especial, né? Tudo bem! O importante é voltar ao foco 
    amanhã. Você consegue! 🌟"
Cor: Vermelho suave (bg-red-50, border-red-500)
```

---

## 🚫 Mensagens de Erro - IA

### Quando não entende a descrição:
```
❌ "Ops! Não consegui entender direito. Pode descrever de novo? 😊"
```

### Quando falta API key:
```
❌ "Eita! Parece que a IA não tá configurada ainda 🤖"
```

### Quando precisa ser mais específico:
```
❌ "Hmm, tive dificuldade aqui. Pode ser mais específico? 
    Tipo: '2 pães com queijo' 😅"
```

### Quando internet falha:
```
❌ "Opa! Parece que a internet deu uma travada. Tenta de novo? 📶"
```

### Quando IA tem erro genérico:
```
❌ "Nossa IA deu uma bugada aqui. Tenta descrever de novo? 😅"
```

### Quando não identifica alimentos:
```
❌ "Hmm, não consegui identificar alimentos nessa descrição. Tenta de novo? 🤔"
```

---

## ✅ Mensagens de Sucesso

### Refeição registrada:
```
✅ "Refeição registrada! 450 calorias 🎉"
```

### Perfil atualizado:
```
✅ "Perfil atualizado com sucesso!"
```

### Login bem-sucedido:
```
✅ "Login realizado com sucesso!"
```

### Conta criada:
```
✅ "Conta criada com sucesso!"
```

### Perfil configurado (onboarding):
```
✅ "Perfil configurado com sucesso! 🎉"
```

---

## 💡 Princípios das Mensagens

### ✅ FAZER:
- Usar emojis relevantes
- Ser informal e amigável
- Motivar sem julgar
- Oferecer soluções ("Tenta de novo", "Amanhã compensa")
- Normalizar erros e dias difíceis
- Usar "você" ou "a gente" (inclusivo)

### ❌ NÃO FAZER:
- Julgar o usuário
- Ser muito técnico
- Causar culpa
- Ser frio ou robótico
- Fazer o usuário se sentir mal

---

## 🎨 Paleta de Cores

```css
/* Sucesso / Dentro da Meta */
bg-green-50, text-green-600, border-green-500

/* Atenção / Perto do Limite */
bg-yellow-50, text-yellow-800, border-yellow-500

/* Alerta Suave / Passou um Pouco */
bg-orange-50, text-orange-800, border-orange-500

/* Alerta / Passou Bastante (mas sem drama!) */
bg-red-50, text-red-800, border-red-500

/* Informação Neutra */
bg-blue-50, text-blue-600, border-blue-500

/* Erro Amigável */
bg-gray-50, text-gray-600
```

---

## 📝 Exemplos de Uso no Código

### Toast de Erro:
```javascript
toast.error('Ops! Não consegui entender direito. Pode descrever de novo? 😊');
```

### Toast de Sucesso:
```javascript
toast.success(`Refeição registrada! ${calories} calorias 🎉`);
```

### Alerta no Dashboard:
```jsx
<div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
  <p className="text-yellow-800 text-sm">
    ⚠️ Opa! Tá chegando pertinho do limite, hein! Mas se bater tá tudo bem! 😉
  </p>
</div>
```

---

## 🌟 Tom de Voz

- **Amigável:** Como um personal trainer que é seu amigo
- **Motivador:** Sempre incentiva, nunca desanima
- **Realista:** Reconhece que dias difíceis acontecem
- **Positivo:** Foca em soluções, não em problemas
- **Inclusivo:** "A gente", "vamos", "você consegue"

---

**Use este guia ao criar novas mensagens no projeto!** 💚

