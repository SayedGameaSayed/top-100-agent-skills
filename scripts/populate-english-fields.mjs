import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const skillsPath = path.join(ROOT, 'data/skills.json');
const siteSkillsPath = path.join(ROOT, 'site/data/skills.json');

const data = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));

// 1. Site Metadata
data.site.name_en = 'Top 100 AI Agent Skills';
data.site.tagline_en = 'Understand the skill before you copy the prompt';
data.site.hero_title_en = 'Understand the skill before you use it.';
data.site.hero_sub_en = 'Curated catalog of the top 100 open-source AI agent skills, with verified prompts ready to copy for Claude, Cursor, ChatGPT, and Codex.';
data.site.search_placeholder_en = 'Search skills: word, excel, design, testing, pdf...';

// 2. Categories English Names
const CATEGORY_NAMES_EN = {
  'documents': 'Documents & Files',
  'design': 'Design & Creative',
  'development': 'Development & Web',
  'code-quality': 'Code Quality & Testing',
  'cloud-security': 'Cloud & Security',
  'data-ai': 'Data & AI',
  'science-education': 'Science & Education',
  'business-finance': 'Business & Finance',
  'communication': 'Writing & Communication',
  'meta': 'Skill Creation & Meta'
};

data.categories.forEach((cat) => {
  cat.name_en = CATEGORY_NAMES_EN[cat.id] || cat.id;
});

// Helper for title casing
function toTitleCase(str) {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bApi\b/g, 'API')
    .replace(/\bMcp\b/g, 'MCP')
    .replace(/\bTdd\b/g, 'TDD')
    .replace(/\bPdf\b/g, 'PDF')
    .replace(/\bDocx\b/g, 'DOCX')
    .replace(/\bXlsx\b/g, 'XLSX')
    .replace(/\bPptx\b/g, 'PPTX')
    .replace(/\bCli\b/g, 'CLI')
    .replace(/\bUi\b/g, 'UI')
    .replace(/\bSdk\b/g, 'SDK')
    .replace(/\bKql\b/g, 'KQL')
    .replace(/\bI18n\b/g, 'i18n');
}

// 3. High quality English Title & Summary Mapping
const ENGLISH_SKILLS_MAP = {
  'obra-writing-plans': {
    title_en: 'Step-by-Step Software Planning',
    summary_en: 'Structured breakdown of complex software tasks into verifiable, bite-sized checkpoints before writing code.',
    benefits_en: [
      'Eliminate chaotic refactoring with crystal-clear execution steps from day one.',
      'Define automated verification checkpoints for every single sub-feature.'
    ],
    use_cases_en: ['Scaffolding a new backend feature or restructuring legacy repositories.']
  },
  'systematic-debugging': {
    title_en: 'Systematic Debugging',
    summary_en: 'Rigorous root-cause isolation using scientific hypothesis testing and log traces rather than guesswork.',
    benefits_en: [
      'Stop blindly modifying code by systematically isolating reproducible triggers.',
      'Pinpoint subtle race conditions and memory leaks through telemetry data.'
    ],
    use_cases_en: ['Fixing elusive production bugs and non-deterministic concurrency errors.']
  },
  'test-driven-development': {
    title_en: 'Test-Driven Development (TDD)',
    summary_en: 'Disciplined Red-Green-Refactor cycle: author failing behavioral tests first, then write minimal code to pass.',
    benefits_en: [
      'Guarantees 100% intentional test coverage from the very first commit.',
      'Enables fearless refactoring and automated regression prevention.'
    ],
    use_cases_en: ['Implementing critical domain business logic and API contracts.']
  },
  'requesting-code-review': {
    title_en: 'Requesting Code Review',
    summary_en: 'Checklist and guidelines to assemble self-explanatory pull requests with architectural rationales.',
    benefits_en: [
      'Dramatically reduces PR review turnaround time with clear context.',
      'Highlights risk zones, test proof, and breaking change considerations.'
    ],
    use_cases_en: ['Opening well-documented Pull Requests for peer and tech-lead approval.']
  },
  'receiving-code-review': {
    title_en: 'Receiving & Applying Code Review',
    summary_en: 'Systematic approach to evaluating reviewer feedback constructively and making surgical revisions.',
    benefits_en: [
      'Clarifies reviewer suggestions and prevents defensive or circular PR comments.',
      'Applies architectural improvements cleanly while preserving test suites.'
    ],
    use_cases_en: ['Addressing complex peer review feedback and requested changes.']
  },
  'using-git-worktrees': {
    title_en: 'Git Worktrees Multi-Tasking',
    summary_en: 'Manage concurrent branches in separate working directories without clobbering stashes or context switching.',
    benefits_en: [
      'Work on critical production hotfixes without stashing or switching branch checkouts.',
      'Run simultaneous builds and test suites across distinct git branches.'
    ],
    use_cases_en: ['Testing parallel pull requests and multi-branch feature workflows.']
  },
  'verification-before-completion': {
    title_en: 'Verification Before Completion',
    summary_en: 'Ironclad pre-flight verification checklist ensuring all tests, linters, and type-checks pass before merge.',
    benefits_en: [
      'Prevents embarrassing broken builds and missed edge cases in CI/CD.',
      'Enforces rigorous verification proof before declaring tasks complete.'
    ],
    use_cases_en: ['Final sign-off before committing code, merging PRs, or releasing versions.']
  },
  'subagent-driven-development': {
    title_en: 'Subagent-Driven Development',
    summary_en: 'Architectural pattern to delegate specialized tasks to autonomous subagents with coordination protocols.',
    benefits_en: [
      'Scale agent capabilities by dividing research, coding, and testing across dedicated roles.',
      'Maintains clean parent context by encapsulating noisy intermediate work in subagents.'
    ],
    use_cases_en: ['Executing multi-step coding initiatives with dedicated research and test agents.']
  },
  'executing-plans': {
    title_en: 'Autonomous Plan Execution',
    summary_en: 'Deterministic execution of architectural plans with automatic error recovery and state checkpointing.',
    benefits_en: [
      'Keeps autonomous coding tasks on track across deep dependency graphs.',
      'Automatically logs completed phases and resumes cleanly upon unexpected interrupts.'
    ],
    use_cases_en: ['Executing multi-phase engineering migrations and end-to-end task lists.']
  },
  'dispatching-parallel-agents': {
    title_en: 'Dispatching Parallel Agents',
    summary_en: 'Concurrent task dispatching across multiple background agents for rapid parallel benchmarking and research.',
    benefits_en: [
      'Cuts wall-clock analysis time by 5x-10x through asynchronous parallelism.',
      'Aggregates findings and diffs into consolidated decision reports.'
    ],
    use_cases_en: ['Auditing hundreds of repository files or sweeping test suites in parallel.']
  },
  'brainstorming-solutions': {
    title_en: 'Architectural Solution Brainstorming',
    summary_en: 'Structured ideation framework exploring contrasting trade-offs, constraints, and design alternatives.',
    benefits_en: [
      'Reveals hidden architectural trade-offs between speed, cost, and maintainability.',
      'Provides objective scoring matrices to select the winning technical design.'
    ],
    use_cases_en: ['Choosing database architectures, API paradigms, or cloud infrastructure.']
  },
  'fastapi-patterns': {
    title_en: 'FastAPI Production Patterns',
    summary_en: 'Best practices for scalable Python APIs using FastAPI, Pydantic v2, dependency injection, and async routers.',
    benefits_en: [
      'Enforces strict type safety and OpenAPI auto-documentation.',
      'Optimizes asynchronous throughput for database sessions and microservices.'
    ],
    use_cases_en: ['Building production-grade Python REST and WebSocket APIs.']
  },
  'prisma-patterns': {
    title_en: 'Prisma ORM Database Patterns',
    summary_en: 'Idiomatic schema design, migration strategies, and type-safe relational queries using Prisma ORM.',
    benefits_en: [
      'Eliminates N+1 query bottlenecks with optimized Prisma relations.',
      'Provides end-to-end TypeScript safety from database tables to client code.'
    ],
    use_cases_en: ['Designing PostgreSQL/MySQL database schemas and high-performance queries.']
  },
  'swiftui-patterns': {
    title_en: 'SwiftUI Native iOS Patterns',
    summary_en: 'Modern reactive iOS app architecture using SwiftUI, observation state, navigation stacks, and previews.',
    benefits_en: [
      'Builds clean declarative UI with fluid native animations and responsive layouts.',
      'Adheres to Apple Human Interface Guidelines and modern Swift concurrency.'
    ],
    use_cases_en: ['Developing native iOS, iPadOS, and macOS apps in SwiftUI.']
  },
  'rust-patterns': {
    title_en: 'Rust Idiomatic Systems Patterns',
    summary_en: 'Zero-cost abstractions, memory-safe lifetimes, trait architectures, and error propagation in Rust.',
    benefits_en: [
      'Write high-throughput concurrent systems with zero data races.',
      'Structure clean Result/Option error handling without runtime panics.'
    ],
    use_cases_en: ['Building high-performance CLI tools, web servers, and systems software.']
  },
  'redis-patterns': {
    title_en: 'Redis Caching & Pub/Sub Patterns',
    summary_en: 'Production caching strategies, rate limiting, distributed locking, and Pub/Sub pipelines with Redis.',
    benefits_en: [
      'Protects primary databases from traffic spikes with intelligent TTL caching.',
      'Implements distributed Redlock primitives and real-time event broadcasting.'
    ],
    use_cases_en: ['Implementing session stores, API rate limiters, and message queues.']
  },
  'react-testing-library': {
    title_en: 'React Testing Library Suite',
    summary_en: 'User-centric component testing with Jest/Vitest and React Testing Library avoiding implementation details.',
    benefits_en: [
      'Tests components the way actual end-users interact with accessibility roles.',
      'Creates resilient UI tests that do not break during internal refactorings.'
    ],
    use_cases_en: ['Writing robust unit and integration tests for modern React frontends.']
  },
  'python-pytest-suite': {
    title_en: 'Python Pytest Automation Suite',
    summary_en: 'Advanced test automation with pytest fixtures, parameterization, mocking, and coverage analysis.',
    benefits_en: [
      'Simplifies complex test setups using modular dependency-injected fixtures.',
      'Tests hundreds of boundary conditions with concise `@pytest.mark.parametrize`.'
    ],
    use_cases_en: ['Unit and integration testing for Python packages, algorithms, and APIs.']
  },
  'django-security': {
    title_en: 'Django Security Hardening',
    summary_en: 'Security audit protocols for Django: CSRF protection, SQL injection prevention, CORS, and auth hardening.',
    benefits_en: [
      'Prevents OWASP Top 10 vulnerabilities across Django endpoints and admin panels.',
      'Enforces secure session cookies, Content Security Policies, and rate limits.'
    ],
    use_cases_en: ['Hardening Django web apps and enterprise portals before public launch.']
  },
  'springboot-security': {
    title_en: 'Spring Boot Security Architecture',
    summary_en: 'Enterprise authentication and authorization with Spring Security, JWT, OAuth2, and RBAC filters.',
    benefits_en: [
      'Implements robust token-based auth pipelines with stateless security contexts.',
      'Enforces fine-grained method-level permissions with `@PreAuthorize` annotations.'
    ],
    use_cases_en: ['Securing enterprise Java microservices and RESTful Spring backends.']
  },
  'security-review-checklist': {
    title_en: 'Comprehensive Security Review',
    summary_en: 'Rigorous pre-deployment security review covering secret leaks, injection risks, and dependency CVEs.',
    benefits_en: [
      'Identifies exposed API tokens, hardcoded secrets, and outdated dependencies.',
      'Verifies compliance with OWASP guidelines and principle of least privilege.'
    ],
    use_cases_en: ['Auditing codebases and infrastructure prior to production releases.']
  },
  'pytorch-model-eval': {
    title_en: 'PyTorch Model Evaluation & Metrics',
    summary_en: 'Model benchmarking, validation loss curves, precision-recall metrics, and inference profiling in PyTorch.',
    benefits_en: [
      'Measures precision, recall, F1, and latency across validation datasets.',
      'Detects overfitting, vanishing gradients, and GPU memory saturation.'
    ],
    use_cases_en: ['Evaluating deep learning models and fine-tuned neural networks.']
  },
  'marketing-campaign': {
    title_en: 'Marketing Campaign Strategy',
    summary_en: 'Data-driven marketing campaign planning, audience segmentation, content calendars, and conversion funnels.',
    benefits_en: [
      'Structures high-converting launch funnels across email, social, and search.',
      'Provides measurable KPI tracking for customer acquisition and engagement.'
    ],
    use_cases_en: ['Launching product releases, growth experiments, and content marketing.']
  },
  'i18n-sync-manager': {
    title_en: 'i18n Localization Sync Manager',
    summary_en: 'Automated extraction, synchronization, and translation key validation across multi-language JSON files.',
    benefits_en: [
      'Prevents missing translation keys and broken interpolations in production.',
      'Synchronizes nested translation strings across all supported language locales.'
    ],
    use_cases_en: ['Managing internationalization for multi-lingual websites and mobile apps.']
  },
  'golang-testing-suite': {
    title_en: 'Go Testing & Benchmarking Suite',
    summary_en: 'Idiomatic Go testing conventions: table-driven tests, subtests, race detector, and memory benchmarks.',
    benefits_en: [
      'Tests comprehensive edge cases cleanly using Go table-driven patterns.',
      'Detects concurrency data races and microsecond latency regressions.'
    ],
    use_cases_en: ['Testing Go backend services, concurrency pipelines, and CLI tools.']
  },
  'eval-harness': {
    title_en: 'AI Evaluation & Benchmarking Harness',
    summary_en: 'Systematic testing framework to evaluate LLM prompt performance, accuracy, drift, and latency.',
    benefits_en: [
      'Measures prompt improvements objectively using gold-standard evaluation sets.',
      'Catches regression anomalies and hallucination risks before deploying prompts.'
    ],
    use_cases_en: ['Benchmarking AI agent prompts, system instructions, and RAG pipelines.']
  },
  'pdf': {
    title_en: 'PDF Document Master',
    summary_en: 'Read, extract, merge, parse tables, and programmatically generate complex PDF documents.',
    benefits_en: [
      'Extracts structured text, tables, and metadata from scanned and digital PDFs.',
      'Generates styled invoices, reports, and certificates programmatically.'
    ],
    use_cases_en: ['Parsing bank statements, invoices, research papers, and generating reports.']
  },
  'docx': {
    title_en: 'Word Document (DOCX) Handler',
    summary_en: 'Create, format, and modify Microsoft Word documents with structured headings, tables, and styles.',
    benefits_en: [
      'Generates polished enterprise Word reports with corporate typography.',
      'Extracts and rewrites docx paragraphs, tables, and document outlines.'
    ],
    use_cases_en: ['Automating contract generation, technical proposals, and research documents.']
  },
  'xlsx': {
    title_en: 'Excel Spreadsheet (XLSX) Pro',
    summary_en: 'Create, compute, analyze, and format Excel spreadsheets with complex formulas and financial models.',
    benefits_en: [
      'Builds multi-sheet financial models with dynamic formulas and charts.',
      'Processes millions of data rows with pivot tables and conditional formatting.'
    ],
    use_cases_en: ['Financial forecasting, data analysis, budgets, and automated reporting.']
  },
  'pptx': {
    title_en: 'PowerPoint Presentation (PPTX)',
    summary_en: 'Design, layout, and generate presentation slide decks with consistent visual hierarchy and theme palettes.',
    benefits_en: [
      'Creates executive-ready pitch decks and lecture slides in seconds.',
      'Enforces harmonious slide layouts, bullet structures, and icon callouts.'
    ],
    use_cases_en: ['Generating conference presentations, investor decks, and workshop slides.']
  },
  'frontend-design': {
    title_en: 'Frontend UI/UX Design System',
    summary_en: 'Design high-converting, modern web interfaces with micro-interactions, responsive typography, and design tokens.',
    benefits_en: [
      'Delivers world-class aesthetic polish with intentional contrast and rhythm.',
      'Prevents generic AI styling by following modern boutique design systems.'
    ],
    use_cases_en: ['Crafting landing pages, SaaS dashboards, and consumer web applications.']
  },
  'skill-creator': {
    title_en: 'AI Skill Creator & Architect',
    summary_en: 'Author, structure, and test new AI agent skills following official Anthropic and standard specifications.',
    benefits_en: [
      'Structures standardized SKILL.md packages with clear triggers and parameters.',
      'Validates skill definitions against best practice prompt engineering rules.'
    ],
    use_cases_en: ['Building custom agent skills for specialized company workflows.']
  },
  'webapp-testing': {
    title_en: 'End-to-End Web App Testing',
    summary_en: 'Automated browser testing with Playwright and Puppeteer across user journeys, forms, and viewports.',
    benefits_en: [
      'Simulates real user interactions: clicks, inputs, scrolls, and navigations.',
      'Captures visual diffs and network failure diagnostics automatically.'
    ],
    use_cases_en: ['Testing critical signup funnels, checkouts, and responsive layouts.']
  },
  'mcp-builder': {
    title_en: 'Model Context Protocol (MCP) Builder',
    summary_en: 'Build, test, and package Model Context Protocol (MCP) servers to expose APIs and tools to AI agents.',
    benefits_en: [
      'Connects AI assistants directly to databases, third-party APIs, and local files.',
      'Implements standard JSON-RPC tool schemas with strict input validation.'
    ],
    use_cases_en: ['Creating custom MCP servers for Claude Desktop, Cursor, and Antigravity.']
  },
  'canvas-design': {
    title_en: 'HTML5 Canvas Visuals & Generative Art',
    summary_en: 'Interactive 2D animations, generative graphics, and custom chart rendering using HTML5 Canvas.',
    benefits_en: [
      'Renders high-performance 60 FPS graphics with minimal memory footprint.',
      'Creates engaging data visualizations, particle systems, and interactive diagrams.'
    ],
    use_cases_en: ['Building hero animations, charts, and interactive educational graphics.']
  },
  'web-artifacts-builder': {
    title_en: 'Standalone Web Artifacts Builder',
    summary_en: 'Assemble self-contained interactive HTML/CSS/JS artifacts that run standalone in any browser iframe.',
    benefits_en: [
      'Packages interactive calculators, mini-apps, and prototypes into a single file.',
      'Zero external build dependencies for instant sharing and embedding.'
    ],
    use_cases_en: ['Creating shareable demos, calculators, and rich interactive widgets.']
  },
  'brand-guidelines': {
    title_en: 'Brand Guidelines & Identity System',
    summary_en: 'Develop unified visual identities, color tokens, typography scales, and voice guidelines for products.',
    benefits_en: [
      'Enforces consistent brand voice, logo usage, and visual style across all collateral.',
      'Establishes accessible WCAG AAA color pairings and typography rules.'
    ],
    use_cases_en: ['Defining brand guidelines for startups, products, and open-source projects.']
  },
  'theme-factory': {
    title_en: 'Design System Theme Factory',
    summary_en: 'Generate cohesive light, dark, and high-contrast color palettes with automatic WCAG contrast math.',
    benefits_en: [
      'Calculates mathematically harmonious color ramps and semantic variables.',
      'Guarantees accessible text contrast across dark, light, and OLED themes.'
    ],
    use_cases_en: ['Building multi-theme design systems for modern web apps.']
  },
  'doc-coauthoring': {
    title_en: 'Collaborative Document Co-Authoring',
    summary_en: 'Iterative document drafting framework with tone adaptation, structured outlining, and executive editing.',
    benefits_en: [
      'Transforms rough notes into structured, persuasive whitepapers and memos.',
      'Refines sentence rhythm, conciseness, and readability scores.'
    ],
    use_cases_en: ['Drafting strategy papers, engineering RFCs, and board memos.']
  },
  'algorithmic-art': {
    title_en: 'Algorithmic Art & Generative Patterns',
    summary_en: 'Mathematical pattern generation using shaders, SVG geometry, noise functions, and fractal algorithms.',
    benefits_en: [
      'Creates mesmerizing mathematical art, generative avatars, and background textures.',
      'Exports resolution-independent vector SVGs ready for print or web.'
    ],
    use_cases_en: ['Designing unique website backgrounds, book covers, and digital assets.']
  },
  'internal-comms': {
    title_en: 'Internal Communications & Updates',
    summary_en: 'Draft clear engineering updates, company announcements, incident post-mortems, and release notes.',
    benefits_en: [
      'Delivers concise, actionable team communications that eliminate misunderstandings.',
      'Maintains transparent leadership communication during launches and incidents.'
    ],
    use_cases_en: ['Writing weekly engineering digests, release notes, and post-incident reviews.']
  },
  'slack-gif-creator': {
    title_en: 'Custom Slack GIF & Meme Creator',
    summary_en: 'Create lightweight animated GIFs, branded emoji reactions, and video snippets optimized for Slack.',
    benefits_en: [
      'Produces lightweight, looping animated GIFs with clean color palettes.',
      'Boosts team engagement and company culture with custom micro-animations.'
    ],
    use_cases_en: ['Creating team announcement GIFs, celebration reactions, and product micro-demos.']
  },
  'claude-api': {
    title_en: 'Claude API Integration Patterns',
    summary_en: 'Best practices for Anthropic Claude API: prompt caching, streaming responses, tool calling, and token budgeting.',
    benefits_en: [
      'Reduces API latency and costs by up to 90% via prompt caching.',
      'Implements robust structured JSON outputs and multi-turn tool calling.'
    ],
    use_cases_en: ['Building production LLM features and enterprise chatbots with Claude.']
  },
  'deep-research': {
    title_en: 'Deep Literature & Fact Research',
    summary_en: 'Thorough multi-source research methodology with cross-referencing, academic citations, and bias detection.',
    benefits_en: [
      'Cross-verifies claims across peer-reviewed sources and empirical benchmarks.',
      'Synthesizes complex, multifaceted domains into actionable executive summaries.'
    ],
    use_cases_en: ['Conducting technical market intelligence and academic literature reviews.']
  },
  'sr-screener': {
    title_en: 'Systematic Review Paper Screener',
    summary_en: 'Accelerate medical and scientific systematic reviews by screening abstracts against inclusion/exclusion criteria.',
    benefits_en: [
      'Filters hundreds of scientific papers rapidly with PRISMA guideline compliance.',
      'Tracks rationale for every paper inclusion or exclusion with high repeatability.'
    ],
    use_cases_en: ['Systematic literature reviews, meta-analyses, and clinical research screening.']
  },
  'academic-paper-writer': {
    title_en: 'Academic Paper & LaTeX Author',
    summary_en: 'Author scholarly papers with IEEE/ACM LaTeX formatting, KaTeX equations, and BibTeX citations.',
    benefits_en: [
      'Formats papers to publication standards with rigorous mathematical notation.',
      'Manages bibliographies, figure callouts, and peer-review structural conventions.'
    ],
    use_cases_en: ['Writing computer science papers, arXiv preprints, and thesis chapters.']
  },
  'responsive-design': {
    title_en: 'Fluid Responsive Web Design',
    summary_en: 'Modern mobile-first CSS architecture using container queries, CSS Grid, clamp() scaling, and subgrid.',
    benefits_en: [
      'Guarantees pixel-perfect rendering from 320px mobile screens to 4K ultra-wide monitors.',
      'Eliminates brittle media queries with modern CSS container queries.'
    ],
    use_cases_en: ['Building cross-device responsive websites and adaptive SaaS dashboards.']
  },
  'finishing-development-branch': {
    title_en: 'Finishing Development Branches',
    summary_en: 'Clean branch wrap-up protocol: rebase cleanup, squashing commits, lint checks, and clean PR descriptions.',
    benefits_en: [
      'Maintains an immaculate, bisectable Git commit history across your team.',
      'Verifies that no lingering debug statements or temporary files reach main.'
    ],
    use_cases_en: ['Preparing feature branches for clean merge into staging or production.']
  },
  'using-superpowers': {
    title_en: 'Superpowers Agent Framework',
    summary_en: 'Harness the full superpowers skill library to augment coding agents with systematic workflows.',
    benefits_en: [
      'Equips agents with battle-tested engineering methodologies out of the box.',
      'Ensures autonomous agents write cleaner code, better tests, and safer commits.'
    ],
    use_cases_en: ['Onboarding AI agents into complex legacy codebases.']
  },
  'diagnosing-superpowers': {
    title_en: 'Superpowers Skill Diagnostics',
    summary_en: 'Diagnose, inspect, and benchmark installed superpowers agent skills for syntax, triggers, and execution.',
    benefits_en: [
      'Detects misconfigured skill paths, broken triggers, or conflicting instructions.',
      'Validates that all agent skills load cleanly into active AI sessions.'
    ],
    use_cases_en: ['Troubleshooting AI agent setups and skill execution environments.']
  },
  'writing-skills': {
    title_en: 'Agent Skill Authoring & Formatting',
    summary_en: 'Standardized authoring rules for writing declarative, self-documenting agent skills with crisp YAML frontmatter.',
    benefits_en: [
      'Ensures custom skills trigger only when intended, avoiding agent confusion.',
      'Documents prerequisites, parameters, and example invocations clearly.'
    ],
    use_cases_en: ['Authoring custom enterprise skills for AI agent platforms.']
  },
  'interview-me': {
    title_en: 'Requirements Discovery Interviewer',
    summary_en: 'Interactive interview mode where the AI asks probing questions to clarify ambiguous software requirements.',
    benefits_en: [
      'Uncovers overlooked edge cases and business constraints before writing code.',
      'Translates vague product ideas into actionable technical specifications.'
    ],
    use_cases_en: ['Scoping new software features, architecture overhauls, and client projects.']
  },
  'idea-refine': {
    title_en: 'Product Idea Refinement',
    summary_en: 'Turn raw concepts into crisp value propositions, user journeys, feature MVP scopes, and pitch summaries.',
    benefits_en: [
      'Sharpens product messaging and identifies the critical core MVP feature set.',
      'Stress-tests user adoption assumptions and competitive differentiation.'
    ],
    use_cases_en: ['Refining startup concepts, internal tools, and new product offerings.']
  },
  'spec-driven-development': {
    title_en: 'Spec-Driven Development',
    summary_en: 'Write comprehensive technical specifications and API schemas before beginning implementation.',
    benefits_en: [
      'Aligns cross-functional teams and stakeholders on functionality beforehand.',
      'Provides a deterministic blueprint for autonomous coding agents to build against.'
    ],
    use_cases_en: ['Designing complex microservices, payment gateways, and data pipelines.']
  },
  'planning-and-task-breakdown': {
    title_en: 'Engineering Task Breakdown',
    summary_en: 'Decompose ambitious engineering epics into small, estimable, independently deployable tasks.',
    benefits_en: [
      'Prevents project stalls by creating actionable 1-2 hour work increments.',
      'Clarifies task dependencies and critical path milestones for the sprint.'
    ],
    use_cases_en: ['Sprint planning, roadmap execution, and Jira/Linear ticket drafting.']
  },
  'incremental-implementation': {
    title_en: 'Incremental Code Implementation',
    summary_en: 'Commit small, atomic, functional code slices with continuous test verification after every single step.',
    benefits_en: [
      'Keeps the repository build passing and deployable after every atomic commit.',
      'Makes identifying and reverting regressions effortless via git bisect.'
    ],
    use_cases_en: ['Developing complex features without breaking main branch stability.']
  },
  'frontend-ui-engineering': {
    title_en: 'Frontend UI Engineering Pro',
    summary_en: 'Production frontend engineering: accessible HTML, semantic ARIA, smooth animations, and optimized render trees.',
    benefits_en: [
      'Achieves 100/100 Lighthouse accessibility and performance ratings.',
      'Prevents layout shifts and unnecessary component re-renders.'
    ],
    use_cases_en: ['Building enterprise component libraries and high-traffic web applications.']
  },
  'api-and-interface-design': {
    title_en: 'API & Interface Design',
    summary_en: 'Design ergonomic, consistent RESTful and GraphQL interfaces following industry API style guides.',
    benefits_en: [
      'Creates intuitive developer-friendly APIs with consistent naming conventions.',
      'Enforces predictable HTTP status codes, error payloads, and pagination schemas.'
    ],
    use_cases_en: ['Designing public developer APIs and internal microservice interfaces.']
  },
  'context-engineering': {
    title_en: 'Agent Context Window Engineering',
    summary_en: 'Maximize LLM context efficiency: compact transcripts, eliminate redundant tokens, and structure memory.',
    benefits_en: [
      'Allows long-running agents to execute tasks without context overflow.',
      'Saves up to 70% of API token consumption through strategic prompt design.'
    ],
    use_cases_en: ['Optimizing autonomous agent memory for deep coding projects.']
  },
  'browser-testing-devtools': {
    title_en: 'Browser Testing with Chrome DevTools',
    summary_en: 'Diagnose runtime console errors, network waterfails, DOM mutations, and memory leaks using DevTools.',
    benefits_en: [
      'Reproduces client-side bugs and captures full network request payloads.',
      'Audits JavaScript execution bottlenecks and CSS recalculation costs.'
    ],
    use_cases_en: ['Debugging tricky single-page application bugs and performance regressions.']
  },
  'debugging-error-recovery': {
    title_en: 'Debugging & Error Recovery Protocols',
    summary_en: 'Graceful degradation strategies, automated retry policies with jitter, and circuit breaker implementations.',
    benefits_en: [
      'Keeps applications resilient during downstream network drops and service outages.',
      'Provides actionable error boundaries and telemetry for production monitoring.'
    ],
    use_cases_en: ['Building fault-tolerant backend services and payment processing flows.']
  },
  'doubt-driven-development': {
    title_en: 'Doubt-Driven Code Verification',
    summary_en: 'Critical software engineering mindset: actively challenge assumptions, write adversarial tests, and probe limits.',
    benefits_en: [
      'Unearths malicious payloads, integer overflows, and tricky boundary condition failures.',
      'Validates that happy-path code stands up to hostile or malformed inputs.'
    ],
    use_cases_en: ['Security auditing, cryptographic implementations, and critical auth logic.']
  },
  'source-driven-development': {
    title_en: 'Source-Driven Architecture',
    summary_en: 'Anchor implementation strictly in authoritative source code, official docs, and primary specifications.',
    benefits_en: [
      'Eliminates hallucinated APIs and outdated deprecated method calls.',
      'Ensures code adheres strictly to upstream vendor standards and protocols.'
    ],
    use_cases_en: ['Integrating cutting-edge libraries, SDKs, and platform APIs.']
  },
  'constraint-driven-development': {
    title_en: 'Constraint-Driven Development',
    summary_en: 'Deliver lean, focused software by embracing strict resource, latency, and dependency constraints.',
    benefits_en: [
      'Prevents bloat and unnecessary dependencies in codebases.',
      'Forces simple, maintainable architectures that scale cleanly under pressure.'
    ],
    use_cases_en: ['Building lightweight embedded software, CLI tools, and high-speed services.']
  },
  'code-review-quality': {
    title_en: 'Code Review & Architectural Quality',
    summary_en: 'Review code for idiomatic patterns, architectural hygiene, security boundaries, and documentation completeness.',
    benefits_en: [
      'Elevates codebase quality standards and mentors developers through reviews.',
      'Catches maintainability debt before it gets cemented in production.'
    ],
    use_cases_en: ['Conducting thorough architectural reviews across engineering teams.']
  },
  'code-simplification': {
    title_en: 'Code Simplification & Pruning',
    summary_en: 'Refactor convoluted code into clean, readable, single-responsibility functions without changing behavior.',
    benefits_en: [
      'Reduces cognitive load and cyclomatic complexity for maintainers.',
      'Eliminates dead code branches, duplicate routines, and premature abstractions.'
    ],
    use_cases_en: ['Refactoring legacy spaghetti code and oversized monolithic files.']
  },
  'performance-optimization': {
    title_en: 'Full-Stack Performance Optimization',
    summary_en: 'Profile and optimize database queries, network waterfalls, bundle sizes, and CPU hot loops.',
    benefits_en: [
      'Slashes Core Web Vitals (LCP, INP, CLS) and server response times.',
      'Reduces compute hosting bills by eliminating inefficient loops and allocations.'
    ],
    use_cases_en: ['Optimizing slow database endpoints and improving frontend load speeds.']
  },
  'deprecation-migration': {
    title_en: 'Deprecation & Version Migration',
    summary_en: 'Systematic migration playbooks to safely upgrade major framework versions and phase out deprecated APIs.',
    benefits_en: [
      'Performs zero-downtime upgrades across major library versions.',
      'Provides automated codemods and backward-compatible transitional layers.'
    ],
    use_cases_en: ['Upgrading React, Next.js, Python, or database drivers across large repos.']
  },
  'git-workflow-versioning': {
    title_en: 'Git Workflow & Semantic Versioning',
    summary_en: 'Standardized branching models, Conventional Commits, automated changelogs, and SemVer versioning.',
    benefits_en: [
      'Automates release tagging, npm publishing, and GitHub release notes.',
      'Ensures teams follow consistent trunk-based or feature-branch git hygiene.'
    ],
    use_cases_en: ['Setting up automated release pipelines for open-source and SaaS projects.']
  },
  'shipping-and-launch': {
    title_en: 'Shipping & Production Launch Protocol',
    summary_en: 'End-to-end launch checklist: DNS verification, health check endpoints, rollout strategies, and rollback plans.',
    benefits_en: [
      'Eliminates launch day surprises with structured pre-flight checks.',
      'Ensures immediate rollback capabilities if anomalies appear post-release.'
    ],
    use_cases_en: ['Deploying major product releases to public production infrastructure.']
  },
  'composition-patterns': {
    title_en: 'Component Composition Patterns',
    summary_en: 'Master clean component architecture: compound components, slot inversion, and polymorphic primitives.',
    benefits_en: [
      'Builds flexible, highly reusable UI components that prevent prop drilling.',
      'Separates behavioral state logic cleanly from visual presentation layers.'
    ],
    use_cases_en: ['Designing design system components and flexible React interfaces.']
  },
  'deploy-to-vercel': {
    title_en: 'Deploy to Vercel Pro',
    summary_en: 'Zero-configuration production deployment, edge routing, preview branches, and analytics setup on Vercel.',
    benefits_en: [
      'Instantly deploys global high-speed edge sites with automated SSL and caching.',
      'Enables preview branch deployments for every single GitHub pull request.'
    ],
    use_cases_en: ['Deploying Next.js, static sites, and frontend applications on Vercel.']
  },
  'react-best-practices': {
    title_en: 'React Modern Best Practices',
    summary_en: 'State management, custom hooks, Server Components, and memory leak prevention in React 18/19.',
    benefits_en: [
      'Prevents common anti-patterns like stale closures and infinite re-renders.',
      'Enforces idiomatic hook composition and optimal dependency arrays.'
    ],
    use_cases_en: ['Writing clean, maintainable React frontend applications.']
  },
  'react-native-skills': {
    title_en: 'React Native Mobile Skills',
    summary_en: 'Cross-platform mobile engineering with React Native, Expo, native bridging, and responsive gestures.',
    benefits_en: [
      'Builds iOS and Android mobile apps from a unified TypeScript codebase.',
      'Achieves 60 FPS gesture responsiveness with Reanimated and Skia.'
    ],
    use_cases_en: ['Developing cross-platform mobile apps for iOS App Store and Google Play.']
  },
  'react-view-transitions': {
    title_en: 'React View Transitions & Motion',
    summary_en: 'Implement seamless multi-page animations and layout morphing using the modern View Transitions API.',
    benefits_en: [
      'Creates app-like, cinematic page transitions in single and multi-page apps.',
      'Zero layout jank by leveraging native browser compositor transitions.'
    ],
    use_cases_en: ['Adding smooth fluid page transitions to modern web apps.']
  },
  'vercel-cli-with-tokens': {
    title_en: 'Vercel CLI & CI/CD Automation',
    summary_en: 'Automate build, deployment, domain linking, and environment variable synchronization via Vercel CLI.',
    benefits_en: [
      'Deploys directly from GitHub Actions and automated terminal workflows.',
      'Manages production secrets and environment variables securely in CI.'
    ],
    use_cases_en: ['Automating continuous deployment pipelines and headless deployments.']
  },
  'vercel-optimize': {
    title_en: 'Vercel Performance & Edge Optimization',
    summary_en: 'Fine-tune Vercel Edge Middleware, Image Optimization CDN, asset cache headers, and cold start reduction.',
    benefits_en: [
      'Achieves sub-50ms TTFB across worldwide geographical locations.',
      'Reduces bandwidth and serverless function invocation costs.'
    ],
    use_cases_en: ['Optimizing high-traffic Vercel applications for peak speed and efficiency.']
  },
  'web-design-guidelines': {
    title_en: 'Web Design Guidelines & Aesthetics',
    summary_en: 'Principles of visual hierarchy, typographic scales, micro-interactions, and spatial rhythm for modern web apps.',
    benefits_en: [
      'Transforms raw functional UI into boutique, polished visual designs.',
      'Ensures consistent spatial harmony using 4px/8px modular design grids.'
    ],
    use_cases_en: ['Elevating landing page aesthetics and SaaS dashboard experiences.']
  },
  'writing-guidelines': {
    title_en: 'Technical Writing & Documentation',
    summary_en: 'Author clear technical guides, API documentation, READMEs, and tutorials that developers love reading.',
    benefits_en: [
      'Makes technical documentation approachable, accurate, and easy to skim.',
      'Includes practical copy-pasteable code examples and architecture diagrams.'
    ],
    use_cases_en: ['Writing open-source READMEs, developer portals, and technical tutorials.']
  },
  'mp-diagnosing-bugs': {
    title_en: 'Diagnosing Engineering Bugs',
    summary_en: 'Trace subtle stack traces, isolate regression commits, and construct minimal reproductions for bugs.',
    benefits_en: [
      'Builds clean isolated reproduction sandboxes to prove bugs before fixing.',
      'Saves hours of developer frustration with structured error isolation.'
    ],
    use_cases_en: ['Isolating complex frontend and backend library bugs.']
  },
  'grill-with-docs': {
    title_en: 'Documentation Stress-Testing',
    summary_en: 'Challenge proposed architectures and pull requests against official upstream library documentation.',
    benefits_en: [
      'Prevents implementing features using deprecated or sub-optimal patterns.',
      'Validates edge-case behavior directly from vendor technical specs.'
    ],
    use_cases_en: ['Auditing technical architecture proposals against official docs.']
  },
  'triage': {
    title_en: 'Issue Triage & Prioritization',
    summary_en: 'Rapidly triage bug reports and feature requests: verify reproducibility, assign severities, and tag.',
    benefits_en: [
      'Keeps open-source and product issue backlogs organized and prioritized.',
      'Automates severity labeling (P0, P1, P2) based on business impact.'
    ],
    use_cases_en: ['Managing high-volume GitHub issue repositories and bug trackers.']
  },
  'improve-codebase-architecture': {
    title_en: 'Codebase Architecture Refactoring',
    summary_en: 'Modernize repository structure, decouple circular dependencies, and enforce domain boundary hygiene.',
    benefits_en: [
      'Eliminates circular dependency graph cycles that cause bundle bloat.',
      'Restructures chaotic codebases into modular, domain-driven architectures.'
    ],
    use_cases_en: ['Refactoring large legacy codebases and monorepo packages.']
  },
  'mp-tdd': {
    title_en: 'Matt Pocock TDD Methodology',
    summary_en: 'TypeScript-first Test Driven Development: write type contracts and unit tests to guide API design.',
    benefits_en: [
      'Harnesses TypeScript compiler types alongside runtime tests for maximum safety.',
      'Creates elegant, developer-friendly library APIs from day one.'
    ],
    use_cases_en: ['Building open-source TypeScript libraries and core business modules.']
  },
  'to-tickets': {
    title_en: 'Spec-to-Tickets Breakdown',
    summary_en: 'Transform broad engineering specifications into concise, ready-to-execute Jira/Linear tickets.',
    benefits_en: [
      'Generates self-contained tickets with clear acceptance criteria and test steps.',
      'Enables parallel sprint execution across engineering teams.'
    ],
    use_cases_en: ['Breaking technical specs into actionable sprint backlogs.']
  },
  'to-spec': {
    title_en: 'PRD to Technical Specification',
    summary_en: 'Convert high-level Product Requirement Documents (PRD) into rigorous engineering architecture specs.',
    benefits_en: [
      'Bridges the gap between product managers and senior software architects.',
      'Specifies exact data models, API endpoints, and failure fallback modes.'
    ],
    use_cases_en: ['Translating product briefs into actionable engineering blueprints.']
  },
  'grill-me': {
    title_en: 'Interactive Architecture Griller',
    summary_en: 'Interrogate the developer with tough architectural questions to uncover blind spots before coding.',
    benefits_en: [
      'Acts as a rigorous principal engineer challenging your design choices.',
      'Identifies security flaws, scaling bottlenecks, and edge case gaps upfront.'
    ],
    use_cases_en: ['Preparing for technical design reviews and validating complex plans.']
  },
  'setup-pre-commit': {
    title_en: 'Pre-Commit Hooks & Lint Guardrails',
    summary_en: 'Configure Lefthook, Husky, ESLint, Prettier, and git hook scripts to enforce code hygiene on commit.',
    benefits_en: [
      'Guarantees zero malformed or unformatted code gets committed.',
      'Runs fast incremental linting and secret scanning in milliseconds.'
    ],
    use_cases_en: ['Setting up team-wide git guardrails and automated formatting.']
  },
  'git-guardrails-claude-code': {
    title_en: 'Git Guardrails for Claude Code',
    summary_en: 'Safety rules and branch protections to prevent autonomous AI agents from making destructive commits.',
    benefits_en: [
      'Protects main branches from accidental force-pushes or unchecked changes.',
      'Requires explicit user confirmation before committing sensitive configuration files.'
    ],
    use_cases_en: ['Configuring safe autonomous agent coding sessions in local terminals.']
  },
  'writing-for-agents': {
    title_en: 'Writing Instructions for AI Agents',
    summary_en: 'Author unambiguous, machine-parseable system prompts and markdown instructions for AI coding agents.',
    benefits_en: [
      'Prevents AI agent loops, hallucinations, and misunderstood instructions.',
      'Structures concise constraints and deterministic expected output formats.'
    ],
    use_cases_en: ['Crafting AGENTS.md, instructions, and prompt templates for developer tools.']
  },
  'codebase-design': {
    title_en: 'Modular Codebase Design Principles',
    summary_en: 'Design scalable, decoupled codebases with clear dependency flow, ports & adapters, and clean interfaces.',
    benefits_en: [
      'Makes codebases enjoyable and intuitive for new developers to navigate.',
      'Enables independent unit testing by decoupling external IO from core domain logic.'
    ],
    use_cases_en: ['Designing greenfield backend services and modernizing legacy code.']
  },
  'mp-code-review': {
    title_en: 'TypeScript Code Review Master',
    summary_en: 'Deep TypeScript review checking type-narrowing, inference safety, avoid `any`, and performance.',
    benefits_en: [
      'Enforces strict TypeScript patterns that prevent runtime `undefined` crashes.',
      'Optimizes generic type compilation performance in large codebases.'
    ],
    use_cases_en: ['Reviewing complex TypeScript pull requests and library APIs.']
  },
  'ms-mcp-builder': {
    title_en: 'Microsoft MCP Server Scaffold',
    summary_en: 'Scaffold and deploy enterprise Model Context Protocol (MCP) servers with C# or TypeScript SDKs.',
    benefits_en: [
      'Connects Copilot and autonomous agents to enterprise Microsoft services.',
      'Implements standard security, authentication, and tool execution boundaries.'
    ],
    use_cases_en: ['Building enterprise MCP servers for Microsoft Copilot and custom agents.']
  },
  'ms-skill-creator': {
    title_en: 'Microsoft Copilot Skill Creator',
    summary_en: 'Author and package declarative plugins and skills for Microsoft 365 Copilot and Copilot Studio.',
    benefits_en: [
      'Packages skills with full OpenAPI specifications and declarative manifests.',
      'Enables enterprise agents to trigger internal enterprise APIs securely.'
    ],
    use_cases_en: ['Authoring skills for Microsoft 365 Copilot and enterprise ecosystems.']
  },
  'frontend-design-review': {
    title_en: 'Microsoft Frontend Design Review',
    summary_en: 'Review frontend UI against Fluent Design, WCAG 2.1 AA accessibility, contrast, and high DPI scaling.',
    benefits_en: [
      'Verifies accessibility compliance for screen readers and keyboard navigation.',
      'Aligns web applications with polished enterprise design standards.'
    ],
    use_cases_en: ['Auditing enterprise web apps for accessibility and design consistency.']
  },
  'github-issue-creator': {
    title_en: 'Automated GitHub Issue Creator',
    summary_en: 'Generate structured GitHub issues from bugs, logs, or feature specs with reproduction steps.',
    benefits_en: [
      'Turns complex bug reports into actionable, standardized GitHub issues in seconds.',
      'Automatically attaches environment details, stack traces, and labeled tags.'
    ],
    use_cases_en: ['Automating issue generation from bug reports and customer feedback.']
  },
  'cloud-solution-architect': {
    title_en: 'Cloud Solution Architecture Pro',
    summary_en: 'Architect resilient multi-region cloud infrastructures on Azure, AWS, and GCP with Well-Architected rules.',
    benefits_en: [
      'Designs fault-tolerant cloud topologies with automated disaster recovery.',
      'Optimizes cloud cost footprints while guaranteeing 99.99% availability.'
    ],
    use_cases_en: ['Designing enterprise cloud architectures, Kubernetes clusters, and networks.']
  },
  'copilot-sdk': {
    title_en: 'Microsoft Copilot SDK Integration',
    summary_en: 'Integrate the Microsoft Copilot SDK into applications for embedded conversational AI experiences.',
    benefits_en: [
      'Embeds intelligent assistant experiences directly into enterprise software.',
      'Handles multi-turn conversations, context retrieval, and action dispatching.'
    ],
    use_cases_en: ['Developing intelligent Copilot extensions and custom assistant UI.']
  },
  'podcast-generation': {
    title_en: 'AI Podcast Script & Audio Generator',
    summary_en: 'Transform articles and research papers into lively conversational podcast scripts with audio generation cues.',
    benefits_en: [
      'Generates engaging multi-speaker dialogues that sound natural and conversational.',
      'Includes accurate voice tone, pause markers, and sound effect annotations.'
    ],
    use_cases_en: ['Converting blog posts, whitepapers, and news digests into audio podcasts.']
  },
  'kql': {
    title_en: 'Kusto Query Language (KQL) Master',
    summary_en: 'Author high-performance KQL queries for Azure Data Explorer, Log Analytics, and Microsoft Sentinel.',
    benefits_en: [
      'Searches through petabytes of log data in seconds with optimized aggregations.',
      'Builds security threat hunting queries and performance monitoring dashboards.'
    ],
    use_cases_en: ['Security threat hunting in Sentinel and log analysis in Azure Monitor.']
  }
};

// 4. Update every skill in the array
let updatedCount = 0;
data.skills.forEach((skill) => {
  const custom = ENGLISH_SKILLS_MAP[skill.id] || {};
  skill.title_en = custom.title_en || toTitleCase(skill.name);
  skill.summary_en = custom.summary_en || skill.summary_ar;
  skill.benefits_en = custom.benefits_en || [
    `Streamlines ${toTitleCase(skill.name)} workflows with verified best practices.`,
    'Integrates smoothly with modern AI developer tools.'
  ];
  skill.use_cases_en = custom.use_cases_en || [
    `Applying ${toTitleCase(skill.name)} in daily software engineering.`
  ];
  updatedCount++;
});

// Save to data/skills.json and site/data/skills.json
fs.writeFileSync(skillsPath, JSON.stringify(data, null, 2), 'utf8');
fs.writeFileSync(siteSkillsPath, JSON.stringify(data, null, 2), 'utf8');

console.log(`✓ Successfully updated ${updatedCount} skills with comprehensive English content!`);
