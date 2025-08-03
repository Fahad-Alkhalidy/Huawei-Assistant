# Free Models Setup Guide for Huawei Chatbot

This guide shows you how to set up different free AI models for your RAG system.

## Option 1: Ollama (Local - Completely Free) ⭐ RECOMMENDED

### Setup:
1. **Install Ollama**: Download from https://ollama.ai/
2. **Pull a model**: Run in terminal:
   ```bash
   ollama pull llama2
   # or for better performance:
   ollama pull llama2:13b
   ```
3. **Start Ollama**: The service runs automatically on `http://localhost:11434`

### Environment Variables:
```env
AI_PROVIDER=ollama
```

### Advantages:
- ✅ Completely free
- ✅ Runs locally (no internet required)
- ✅ No API limits
- ✅ Privacy (data stays on your machine)
- ✅ Can work offline

### Disadvantages:
- ❌ Requires local installation
- ❌ Uses your computer's resources
- ❌ Slower than cloud options

---

## Option 2: Groq (Cloud - Free Tier)

### Setup:
1. **Sign up**: Go to https://console.groq.com/
2. **Get API key**: Free tier includes 1000 requests/day
3. **Add to environment**:
   ```env
   AI_PROVIDER=groq
   GROQ_API_KEY=your_api_key_here
   ```

### Advantages:
- ✅ Very fast responses
- ✅ High-quality models (Llama 3)
- ✅ Free tier available
- ✅ No local installation needed

### Disadvantages:
- ❌ Requires internet
- ❌ API rate limits
- ❌ Data sent to cloud

---

## Option 3: Hugging Face (Cloud - Free Tier)

### Setup:
1. **Sign up**: Go to https://huggingface.co/
2. **Get API key**: Free tier available
3. **Add to environment**:
   ```env
   AI_PROVIDER=huggingface
   HUGGINGFACE_API_KEY=your_api_key_here
   ```

### Advantages:
- ✅ Many free models available
- ✅ No local installation needed
- ✅ Good free tier

### Disadvantages:
- ❌ Slower than Groq
- ❌ Requires internet
- ❌ API rate limits

---

## Configuration

### Environment Variables (.env.local):
```env
# Choose your AI provider
AI_PROVIDER=ollama

# For Groq
GROQ_API_KEY=your_groq_api_key

# For Hugging Face
HUGGINGFACE_API_KEY=your_hf_api_key

# For Ollama (optional - defaults to localhost:11434)
OLLAMA_BASE_URL=http://localhost:11434
```

### Available Models:

#### Ollama Models:
- `llama2` (default)
- `llama2:13b` (better quality)
- `mistral` (good performance)
- `codellama` (good for technical content)

#### Groq Models:
- `llama3-8b-8192` (default)
- `llama3-70b-8192` (better quality)
- `mixtral-8x7b-32768`

#### Hugging Face Models:
- `microsoft/DialoGPT-medium` (default)
- `gpt2` (smaller, faster)
- `microsoft/DialoGPT-large` (better quality)

---

## Quick Start

1. **For Ollama (Recommended)**:
   ```bash
   # Install Ollama
   # Pull a model
   ollama pull llama2
   
   # Set environment
   echo "AI_PROVIDER=ollama" >> .env.local
   
   # Start your app
   npm run dev
   ```

2. **For Groq**:
   ```bash
   # Get API key from https://console.groq.com/
   # Add to .env.local
   echo "AI_PROVIDER=groq" >> .env.local
   echo "GROQ_API_KEY=your_key" >> .env.local
   
   # Start your app
   npm run dev
   ```

3. **For Hugging Face**:
   ```bash
   # Get API key from https://huggingface.co/
   # Add to .env.local
   echo "AI_PROVIDER=huggingface" >> .env.local
   echo "HUGGINGFACE_API_KEY=your_key" >> .env.local
   
   # Start your app
   npm run dev
   ```

---

## Testing Your Setup

You can test different providers by changing the `AI_PROVIDER` environment variable:

```bash
# Test Ollama
AI_PROVIDER=ollama npm run dev

# Test Groq
AI_PROVIDER=groq npm run dev

# Test Hugging Face
AI_PROVIDER=huggingface npm run dev
```

---

## Troubleshooting

### Ollama Issues:
- **Service not running**: Start Ollama manually
- **Model not found**: Run `ollama pull model_name`
- **Port issues**: Check if port 11434 is available

### Groq Issues:
- **API key invalid**: Check your API key
- **Rate limited**: Wait or upgrade plan
- **Model not found**: Check model name

### Hugging Face Issues:
- **API key invalid**: Check your API key
- **Model loading**: Some models take time to load
- **Rate limited**: Wait or upgrade plan

---

## Performance Comparison

| Provider | Speed | Quality | Cost | Setup Difficulty |
|----------|-------|---------|------|------------------|
| Ollama | Medium | Good | Free | Easy |
| Groq | Fast | Excellent | Free tier | Easy |
| Hugging Face | Slow | Good | Free tier | Easy |

**Recommendation**: Start with Ollama for local development, use Groq for production. 