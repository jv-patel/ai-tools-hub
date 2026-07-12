/* ==========================================================================
   data.js — Static dataset for AI Tools Hub
   Contains category metadata and the tool catalog. In a production app this
   would come from an API; here it's a module-level constant so every page
   (explore, categories, favorites, details) can share one source of truth.
   ========================================================================== */

const CATEGORIES = [
  { id: 'chatbots',    name: 'Chatbots',          icon: 'chat' },
  { id: 'image',       name: 'Image Generation',  icon: 'image' },
  { id: 'video',       name: 'Video Editing',     icon: 'video' },
  { id: 'coding',      name: 'Coding Assistant',  icon: 'code' },
  { id: 'writing',     name: 'Writing Assistant', icon: 'pen' },
  { id: 'voice',       name: 'Voice AI',          icon: 'mic' },
  { id: 'productivity',name: 'Productivity',      icon: 'bolt' },
  { id: 'marketing',   name: 'Marketing',         icon: 'megaphone' },
  { id: 'design',      name: 'Design',            icon: 'pen-tool' },
  { id: 'education',   name: 'Education',         icon: 'book' },
  { id: 'music',       name: 'Music',             icon: 'music' },
  { id: 'business',    name: 'Business',          icon: 'briefcase' },
  { id: 'finance',     name: 'Finance',           icon: 'coin' },
  { id: 'research',    name: 'Research',          icon: 'search' },
  { id: 'automation',  name: 'Automation',        icon: 'gear' }
];

/* pricing: "Free" | "Freemium" | "Paid"
   dateAdded: ISO date, newer = higher on "New AI Tools"
   popularity: 0-100, used for "Most Popular" sort and Trending section        */
const TOOLS = [
  { id:1, name:'ChatGPT', category:'chatbots', logo:'C', pricing:'Freemium', rating:4.8, popularity:99, dateAdded:'2025-11-02',
    desc:'A general-purpose conversational assistant for writing, brainstorming, coding help and everyday Q&A.',
    tags:['assistant','llm','conversation'], site:'https://chat.openai.com', featured:true, trending:true },
  { id:2, name:'Claude', category:'chatbots', logo:'C', pricing:'Freemium', rating:4.8, popularity:97, dateAdded:'2025-12-10',
    desc:'An AI assistant from Anthropic built for thoughtful writing, analysis, and long-context document work.',
    tags:['assistant','llm','writing'], site:'https://claude.ai', featured:true, trending:true },
  { id:3, name:'Gemini', category:'chatbots', logo:'G', pricing:'Freemium', rating:4.5, popularity:93, dateAdded:'2025-10-15',
    desc:'Google\'s multimodal assistant integrated across Search, Workspace, and Android for everyday tasks.',
    tags:['assistant','llm','multimodal'], site:'https://gemini.google.com', featured:true, trending:false },
  { id:4, name:'Perplexity', category:'chatbots', logo:'P', pricing:'Freemium', rating:4.6, popularity:90, dateAdded:'2026-01-05',
    desc:'An answer engine that pairs conversational search with cited sources for quick, sourced research.',
    tags:['search','answers','citations'], site:'https://perplexity.ai', featured:false, trending:true },
  { id:5, name:'Microsoft Copilot', category:'chatbots', logo:'M', pricing:'Freemium', rating:4.3, popularity:85, dateAdded:'2025-09-20',
    desc:'A conversational assistant woven into Windows and Microsoft 365 for drafting, summarizing and search.',
    tags:['assistant','office','windows'], site:'https://copilot.microsoft.com', featured:false, trending:false },

  { id:6, name:'Midjourney', category:'image', logo:'M', pricing:'Paid', rating:4.7, popularity:96, dateAdded:'2025-11-20',
    desc:'A prompt-driven image generator known for painterly, highly stylized visuals used by designers and artists.',
    tags:['image','art','generative'], site:'https://midjourney.com', featured:true, trending:true },
  { id:7, name:'DALL·E 3', category:'image', logo:'D', pricing:'Freemium', rating:4.5, popularity:91, dateAdded:'2025-08-14',
    desc:'OpenAI\'s image model that turns natural-language prompts into detailed, editable illustrations.',
    tags:['image','art','openai'], site:'https://openai.com/dall-e-3', featured:true, trending:false },
  { id:8, name:'Stable Diffusion', category:'image', logo:'S', pricing:'Free', rating:4.4, popularity:88, dateAdded:'2025-07-01',
    desc:'An open-weights image generation model that can run locally and be fine-tuned for custom styles.',
    tags:['image','open-source','local'], site:'https://stability.ai', featured:false, trending:false },
  { id:9, name:'Adobe Firefly', category:'image', logo:'A', pricing:'Freemium', rating:4.5, popularity:87, dateAdded:'2025-12-01',
    desc:'Adobe\'s generative image and effects engine built directly into Photoshop and Express workflows.',
    tags:['image','adobe','design'], site:'https://firefly.adobe.com', featured:false, trending:true },

  { id:10, name:'Runway', category:'video', logo:'R', pricing:'Freemium', rating:4.6, popularity:92, dateAdded:'2025-11-28',
    desc:'A creative suite for AI video generation, editing, and visual effects used by filmmakers and studios.',
    tags:['video','generative','editing'], site:'https://runwayml.com', featured:true, trending:true },
  { id:11, name:'Pika', category:'video', logo:'P', pricing:'Freemium', rating:4.3, popularity:83, dateAdded:'2026-01-10',
    desc:'A text-to-video and image-to-video tool for quickly producing short stylized clips.',
    tags:['video','generative','clips'], site:'https://pika.art', featured:false, trending:true },
  { id:12, name:'Descript', category:'video', logo:'D', pricing:'Freemium', rating:4.7, popularity:89, dateAdded:'2025-06-19',
    desc:'An editor that lets you cut video and audio by editing a text transcript, plus AI voice cleanup.',
    tags:['video','podcast','transcript'], site:'https://descript.com', featured:true, trending:false },
  { id:13, name:'Synthesia', category:'video', logo:'S', pricing:'Paid', rating:4.5, popularity:86, dateAdded:'2025-09-05',
    desc:'Generates talking-head videos from text using AI avatars, popular for training and marketing content.',
    tags:['video','avatar','training'], site:'https://synthesia.io', featured:false, trending:false },

  { id:14, name:'GitHub Copilot', category:'coding', logo:'G', pricing:'Freemium', rating:4.6, popularity:95, dateAdded:'2025-10-02',
    desc:'An in-editor pair programmer that suggests code, tests, and whole functions as you type.',
    tags:['coding','ide','autocomplete'], site:'https://github.com/features/copilot', featured:true, trending:true },
  { id:15, name:'Cursor', category:'coding', logo:'C', pricing:'Freemium', rating:4.7, popularity:94, dateAdded:'2025-12-18',
    desc:'An AI-native code editor built around chat-driven edits across an entire codebase.',
    tags:['coding','editor','refactor'], site:'https://cursor.sh', featured:true, trending:true },
  { id:16, name:'Tabnine', category:'coding', logo:'T', pricing:'Freemium', rating:4.1, popularity:76, dateAdded:'2025-05-11',
    desc:'A privacy-focused code completion tool that can run on private infrastructure for enterprise teams.',
    tags:['coding','privacy','enterprise'], site:'https://tabnine.com', featured:false, trending:false },
  { id:17, name:'Codeium', category:'coding', logo:'C', pricing:'Free', rating:4.4, popularity:80, dateAdded:'2025-08-22',
    desc:'A free code-completion and chat assistant supporting dozens of languages and major editors.',
    tags:['coding','free','autocomplete'], site:'https://codeium.com', featured:false, trending:false },

  { id:18, name:'Jasper', category:'writing', logo:'J', pricing:'Paid', rating:4.3, popularity:82, dateAdded:'2025-07-30',
    desc:'A brand-voice-aware writing platform built for marketing teams producing long-form campaign copy.',
    tags:['writing','marketing','brand'], site:'https://jasper.ai', featured:false, trending:false },
  { id:19, name:'Copy.ai', category:'writing', logo:'C', pricing:'Freemium', rating:4.2, popularity:78, dateAdded:'2025-06-14',
    desc:'A workflow-based copywriting tool for generating ad copy, emails, and product descriptions fast.',
    tags:['writing','copywriting','ads'], site:'https://copy.ai', featured:false, trending:false },
  { id:20, name:'Writesonic', category:'writing', logo:'W', pricing:'Freemium', rating:4.1, popularity:74, dateAdded:'2025-04-09',
    desc:'An article and landing-page writer with SEO-focused templates for content teams.',
    tags:['writing','seo','articles'], site:'https://writesonic.com', featured:false, trending:false },

  { id:21, name:'ElevenLabs', category:'voice', logo:'E', pricing:'Freemium', rating:4.8, popularity:93, dateAdded:'2025-12-05',
    desc:'A realistic text-to-speech and voice-cloning platform used for narration, dubbing, and games.',
    tags:['voice','tts','cloning'], site:'https://elevenlabs.io', featured:true, trending:true },
  { id:22, name:'Murf AI', category:'voice', logo:'M', pricing:'Freemium', rating:4.4, popularity:81, dateAdded:'2025-08-01',
    desc:'A studio for generating voiceovers with adjustable tone and pacing for videos and presentations.',
    tags:['voice','voiceover','studio'], site:'https://murf.ai', featured:false, trending:false },
  { id:23, name:'Play.ht', category:'voice', logo:'P', pricing:'Freemium', rating:4.3, popularity:77, dateAdded:'2025-05-27',
    desc:'Text-to-speech API and app offering ultra-realistic voices for apps, podcasts, and audiobooks.',
    tags:['voice','api','audiobook'], site:'https://play.ht', featured:false, trending:false },

  { id:24, name:'Notion AI', category:'productivity', logo:'N', pricing:'Freemium', rating:4.5, popularity:89, dateAdded:'2025-09-17',
    desc:'Built into Notion docs to summarize, draft, translate, and organize notes and project pages.',
    tags:['productivity','notes','docs'], site:'https://notion.so/product/ai', featured:true, trending:false },
  { id:25, name:'Motion', category:'productivity', logo:'M', pricing:'Paid', rating:4.4, popularity:79, dateAdded:'2025-10-29',
    desc:'An AI calendar planner that automatically schedules tasks and meetings around your priorities.',
    tags:['productivity','calendar','planning'], site:'https://usemotion.com', featured:false, trending:true },
  { id:26, name:'Otter.ai', category:'productivity', logo:'O', pricing:'Freemium', rating:4.4, popularity:84, dateAdded:'2025-07-08',
    desc:'Records and transcribes meetings in real time with automated summaries and action items.',
    tags:['productivity','meetings','transcription'], site:'https://otter.ai', featured:false, trending:false },

  { id:27, name:'AdCreative.ai', category:'marketing', logo:'A', pricing:'Paid', rating:4.2, popularity:75, dateAdded:'2025-06-25',
    desc:'Generates ad creatives and banner variations optimized for click-through and conversion testing.',
    tags:['marketing','ads','creative'], site:'https://adcreative.ai', featured:false, trending:false },
  { id:28, name:'Surfer SEO', category:'marketing', logo:'S', pricing:'Paid', rating:4.5, popularity:83, dateAdded:'2025-11-11',
    desc:'Analyzes top-ranking pages to guide content structure, keywords, and on-page SEO scoring.',
    tags:['marketing','seo','content'], site:'https://surferseo.com', featured:false, trending:true },
  { id:29, name:'Persado', category:'marketing', logo:'P', pricing:'Paid', rating:4.0, popularity:68, dateAdded:'2025-03-19',
    desc:'Uses language analytics to test and select emotionally resonant marketing messages at scale.',
    tags:['marketing','messaging','enterprise'], site:'https://persado.com', featured:false, trending:false },

  { id:30, name:'Canva Magic Studio', category:'design', logo:'C', pricing:'Freemium', rating:4.6, popularity:90, dateAdded:'2025-10-08',
    desc:'A suite of generative design tools inside Canva for backgrounds, layouts, and one-click edits.',
    tags:['design','templates','generative'], site:'https://canva.com/magic', featured:true, trending:false },
  { id:31, name:'Uizard', category:'design', logo:'U', pricing:'Freemium', rating:4.1, popularity:71, dateAdded:'2025-05-02',
    desc:'Turns sketches or text prompts into editable UI mockups and clickable prototypes.',
    tags:['design','ui','prototyping'], site:'https://uizard.io', featured:false, trending:false },
  { id:32, name:'Framer AI', category:'design', logo:'F', pricing:'Freemium', rating:4.3, popularity:80, dateAdded:'2025-12-22',
    desc:'Generates full website drafts from a short prompt, ready to customize inside Framer\'s editor.',
    tags:['design','website','no-code'], site:'https://framer.com/ai', featured:false, trending:true },

  { id:33, name:'Khanmigo', category:'education', logo:'K', pricing:'Paid', rating:4.5, popularity:79, dateAdded:'2025-08-30',
    desc:'A Socratic tutoring assistant from Khan Academy that guides students through problems step by step.',
    tags:['education','tutor','k12'], site:'https://khanacademy.org/khan-labs', featured:false, trending:false },
  { id:34, name:'Duolingo Max', category:'education', logo:'D', pricing:'Paid', rating:4.4, popularity:81, dateAdded:'2025-09-25',
    desc:'Adds AI-powered role-play conversations and mistake explanations to Duolingo language lessons.',
    tags:['education','language','practice'], site:'https://duolingo.com/max', featured:false, trending:false },
  { id:35, name:'Quizlet Q-Chat', category:'education', logo:'Q', pricing:'Freemium', rating:4.0, popularity:66, dateAdded:'2025-04-16',
    desc:'An adaptive study chatbot that quizzes students on their own Quizlet flashcard sets.',
    tags:['education','flashcards','study'], site:'https://quizlet.com', featured:false, trending:false },

  { id:36, name:'Suno', category:'music', logo:'S', pricing:'Freemium', rating:4.6, popularity:88, dateAdded:'2025-11-30',
    desc:'Generates full songs, vocals included, from a text description of genre, mood, and lyrics.',
    tags:['music','generative','songs'], site:'https://suno.com', featured:true, trending:true },
  { id:37, name:'Udio', category:'music', logo:'U', pricing:'Freemium', rating:4.5, popularity:85, dateAdded:'2025-12-14',
    desc:'A music generation tool for producing original tracks and instrumentals from text prompts.',
    tags:['music','generative','tracks'], site:'https://udio.com', featured:false, trending:true },
  { id:38, name:'AIVA', category:'music', logo:'A', pricing:'Freemium', rating:4.2, popularity:70, dateAdded:'2025-02-27',
    desc:'Composes original instrumental scores for films, games, and ads in a range of musical styles.',
    tags:['music','composition','scoring'], site:'https://aiva.ai', featured:false, trending:false },

  { id:39, name:'Gong', category:'business', logo:'G', pricing:'Paid', rating:4.5, popularity:82, dateAdded:'2025-07-19',
    desc:'Analyzes sales calls and emails to surface deal risk, coaching moments, and pipeline insight.',
    tags:['business','sales','analytics'], site:'https://gong.io', featured:false, trending:false },
  { id:40, name:'Clay', category:'business', logo:'C', pricing:'Paid', rating:4.4, popularity:77, dateAdded:'2025-10-24',
    desc:'Combines dozens of data sources with AI enrichment to build targeted outbound prospect lists.',
    tags:['business','sales','data'], site:'https://clay.com', featured:false, trending:true },
  { id:41, name:'Fathom', category:'business', logo:'F', pricing:'Free', rating:4.6, popularity:80, dateAdded:'2025-06-06',
    desc:'Records video calls and auto-generates summaries and CRM-ready notes after every meeting.',
    tags:['business','meetings','notes'], site:'https://fathom.video', featured:false, trending:false },

  { id:42, name:'Cleo', category:'finance', logo:'C', pricing:'Freemium', rating:4.3, popularity:73, dateAdded:'2025-05-15',
    desc:'A budgeting chatbot that tracks spending and nudges users toward savings goals with a playful tone.',
    tags:['finance','budgeting','personal'], site:'https://meetcleo.com', featured:false, trending:false },
  { id:43, name:'Vic.ai', category:'finance', logo:'V', pricing:'Paid', rating:4.1, popularity:65, dateAdded:'2025-03-04',
    desc:'Automates invoice processing and approval workflows for accounting teams.',
    tags:['finance','accounting','automation'], site:'https://vic.ai', featured:false, trending:false },
  { id:44, name:'Rho', category:'finance', logo:'R', pricing:'Freemium', rating:4.2, popularity:62, dateAdded:'2025-09-12',
    desc:'A business banking and spend-management platform with AI-assisted expense categorization.',
    tags:['finance','banking','expenses'], site:'https://rho.co', featured:false, trending:false },

  { id:45, name:'Elicit', category:'research', logo:'E', pricing:'Freemium', rating:4.5, popularity:78, dateAdded:'2025-08-11',
    desc:'Helps researchers search, summarize, and extract data from academic papers automatically.',
    tags:['research','papers','literature'], site:'https://elicit.com', featured:false, trending:false },
  { id:46, name:'Consensus', category:'research', logo:'C', pricing:'Freemium', rating:4.4, popularity:76, dateAdded:'2025-11-06',
    desc:'A search engine that answers questions using findings pulled directly from peer-reviewed studies.',
    tags:['research','papers','evidence'], site:'https://consensus.app', featured:false, trending:true },
  { id:47, name:'Scite', category:'research', logo:'S', pricing:'Paid', rating:4.2, popularity:64, dateAdded:'2025-02-14',
    desc:'Shows how a paper has been cited — supporting, contrasting, or mentioning — to gauge its reliability.',
    tags:['research','citations','academic'], site:'https://scite.ai', featured:false, trending:false },

  { id:48, name:'Zapier AI', category:'automation', logo:'Z', pricing:'Freemium', rating:4.4, popularity:84, dateAdded:'2025-10-19',
    desc:'Lets you describe a workflow in plain language and have Zapier build the automation for you.',
    tags:['automation','workflow','integrations'], site:'https://zapier.com/ai', featured:false, trending:false },
  { id:49, name:'Make', category:'automation', logo:'M', pricing:'Freemium', rating:4.5, popularity:81, dateAdded:'2025-12-27',
    desc:'A visual automation builder for connecting apps and data with AI steps dropped into the flow.',
    tags:['automation','visual','integrations'], site:'https://make.com', featured:false, trending:true },
  { id:50, name:'n8n', category:'automation', logo:'N', pricing:'Free', rating:4.6, popularity:79, dateAdded:'2025-07-23',
    desc:'An open-source, self-hostable workflow automation tool with native AI node support.',
    tags:['automation','open-source','self-hosted'], site:'https://n8n.io', featured:false, trending:false }
];

/* Simple helpers shared across pages */
function getCategoryName(id) {
  const c = CATEGORIES.find(c => c.id === id);
  return c ? c.name : id;
}

function getToolCount(categoryId) {
  return TOOLS.filter(t => t.category === categoryId).length;
}
