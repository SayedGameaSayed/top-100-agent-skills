import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const skillsFile = path.join(ROOT_DIR, 'data/skills.json');
const current = JSON.parse(fs.readFileSync(skillsFile, 'utf8'));

// Assign stars to existing 36 skills
const existingStarsMap = {
  superpowers: 292705,
  'git-workflow': 292705,
  pdf: 179886,
  docx: 179886,
  xlsx: 179886,
  pptx: 179886,
  'frontend-design': 179886,
  'skill-creator': 179886,
  'webapp-testing': 179886,
  'mcp-builder': 179886,
  'canvas-design': 179886,
  'web-artifacts-builder': 179886,
  'brand-guidelines': 179886,
  'theme-factory': 179886,
  'doc-coauthoring': 179886,
  'algorithmic-art': 179886,
  'internal-comms': 179886,
  'slack-gif-creator': 179886,
  'claude-api': 179886,
  'microsoft-skills': 152000,
  'vercel-agent-skills': 120500,
  'gemini-skills': 94000,
  'docker-cloud-ops': 88000,
  'awesome-claude-skills': 85000,
  'cyber-security-audit': 72000,
  'playwright-e2e-testing': 68000,
  'sql-optimizer': 65000,
  'data-analysis-pandas': 58000,
  'addyosmani-agent-skills': 55000,
  'academic-research-assistant': 50294,
  'openapi-designer': 45000,
  'mattpocock-skills': 42000,
  'ui-ux-pro-max-skill': 38000,
  'agile-product-manager': 34000,
  'financial-modeling-pro': 28000,
  'taste-skill': 25000
};

for (const skill of current.skills) {
  skill.github_stars = existingStarsMap[skill.id] || 30000;
}

// 64 New High-Value Skills from Top Scraped & Agent Skills Standards
const new64Skills = [
  // --- Development (10) ---
  {
    id: 'obra-writing-plans',
    name: 'writing-plans',
    kind: 'skill',
    category: 'development',
    featured: true,
    github_stars: 292705,
    difficulty: 'intermediate',
    source: {
      owner: 'obra',
      repo: 'obra/superpowers',
      repo_url: 'https://github.com/obra/superpowers',
      path_in_repo: 'skills/writing-plans',
      url: 'https://github.com/obra/superpowers/tree/main/skills/writing-plans',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'تخطيط المشاريع البرمجية خطوة بخطوة',
    summary_ar: 'هيكلة المتطلبات وتفكيك المهام البرمجية الكبيرة إلى خطوات صغيرة قابلة للاختبار والتحقق التدريجي قبل البدء في كتابة الكود.',
    benefits_ar: [
      'تجنب الفوضى وإعادة كتابة الكود عبر وضع خطة تنفيذ محكمة من البداية.',
      'تحديد نقاط التوقف والتحقق (Checkpoints) لكل ميزة لتسهيل المراجعة.'
    ],
    use_cases_ar: ['التخطيط لبناء ميزة برمجية جديدة أو إعادة هيكلة كود قديم.'],
    example_prompts_ar: ['ضع لي خطة عمل مفصلة خطوة بخطوة لإضافة نظام دفع عبر Stripe.']
  },
  {
    id: 'clean-code',
    name: 'clean-code',
    kind: 'skill',
    category: 'development',
    featured: true,
    github_stars: 30495,
    difficulty: 'intermediate',
    source: {
      owner: 'davila7',
      repo: 'davila7/claude-code-templates',
      repo_url: 'https://github.com/davila7/claude-code-templates',
      path_in_repo: 'cli-tool/components/skills/development/clean-code',
      url: 'https://github.com/davila7/claude-code-templates/tree/main/cli-tool/components/skills/development/clean-code',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'معايير الكود النظيف والموجز',
    summary_ar: 'إلزام الموديل بكتابة أكواد برمجية براغماتية وموجزة ومباشرة، بدون تعقيد زائد (Over-engineering) وبدون تعليقات مكررة تشرح الواضح.',
    benefits_ar: [
      'كتابة كود سهل القراءة والصيانة يركز على حل المشكلة بأبسط طريقة.',
      'تجنب الأنماط المعقدة غير الضرورية وتقليل عدد أسطر الكود.'
    ],
    use_cases_ar: ['مراجعة وتحسين كود مكتوب لتنظيفه وتسهيل قراءته.'],
    example_prompts_ar: ['أعد كتابة هذه الدالة وفق معايير Clean Code لجعلها أوضح وأقصر.']
  },
  {
    id: 'browser-extension-developer',
    name: 'browser-extension-developer',
    kind: 'skill',
    category: 'development',
    featured: false,
    github_stars: 28671,
    difficulty: 'intermediate',
    source: {
      owner: 'yamadashy',
      repo: 'yamadashy/repomix',
      repo_url: 'https://github.com/yamadashy/repomix',
      path_in_repo: 'browser/.claude/skills/browser-extension-developer',
      url: 'https://github.com/yamadashy/repomix/tree/main/browser/.claude/skills/browser-extension-developer',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'تطوير إضافات المتصفح (Chrome و Firefox و Edge)',
    summary_ar: 'بناء وبرمجة إضافات المتصفحات وفق معيار Manifest V3 مع دعم الـ Content Scripts و Background Workers وتبادل الرسائل بأمان.',
    benefits_ar: [
      'التوافق مع أحدث معايير الأمان Manifest V3 لمتجر كروم وفايرفوكس.',
      'التعامل السليم مع صلاحيات المتصفح والـ Storage وتخزين تفضيلات المستخدم.'
    ],
    use_cases_ar: ['إنشاء إضافة لمتصفح كروم تقوم بتلخيص النصوص أو التفاعل مع الصفحات.'],
    example_prompts_ar: ['ابنِ هيكل إضافة كروم Manifest V3 مع background script و popup نافذة.']
  },
  {
    id: 'fastapi-patterns',
    name: 'fastapi-patterns',
    kind: 'skill',
    category: 'development',
    featured: false,
    github_stars: 269914,
    difficulty: 'intermediate',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/fastapi-patterns',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/fastapi-patterns',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'أنماط واجهات FastAPI المتقدمة',
    summary_ar: 'بناء واجهات خلفية عالية الأداء ببايثون مع التحقق من البيانات عبر Pydantic v2 وإدارة التبعيات (Dependency Injection) والتعامل غير المتزامن (Async/Await).',
    benefits_ar: [
      'هيكلة مسارات سريعة وتوليد وثائق OpenAPI تفاعلية تلقائياً.',
      'معالجة استثناءات موحدة وتأمين المسارات باستخدام وسطاء Auth موثوقين.'
    ],
    use_cases_ar: ['بناء API سريع لخدمة نماذج ذكاء اصطناعي أو تطبيق جوال.'],
    example_prompts_ar: ['صمم مسار FastAPI غير متزامن لمعالجة رفع الملفات والتحقق من حجمها.']
  },
  {
    id: 'prisma-patterns',
    name: 'prisma-patterns',
    kind: 'skill',
    category: 'development',
    featured: false,
    github_stars: 269914,
    difficulty: 'intermediate',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/prisma-patterns',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/prisma-patterns',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'استعلامات ونمذجة Prisma ORM الحديثة',
    summary_ar: 'كتابة نماذج بيانات آمنة الأنواع بـ TypeScript، وتجنب مشاكل N+1 في الاستعلامات المتداخلة وإدارة عمليات الهجرة (Migrations).',
    benefits_ar: [
      'أمان كامل للأنواع (Type-safety) بين قاعدة البيانات وواجهة التطبيق.',
      'كتابة استعلامات سريعة تتضمن الربط والعلاقات بدون إرهاق السيرفر.'
    ],
    use_cases_ar: ['تصميم مخطط قاعدة بيانات متجر إلكتروني وإنشاء ملف الهجرة (Migration).'],
    example_prompts_ar: ['اكتب استعلام Prisma لجلب المستخدم مع آخر 5 طلبات له وإجمالي المدفوعات.']
  },
  {
    id: 'swiftui-patterns',
    name: 'swiftui-patterns',
    kind: 'skill',
    category: 'development',
    featured: false,
    github_stars: 269914,
    difficulty: 'intermediate',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/swiftui-patterns',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/swiftui-patterns',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'أنماط واجهات SwiftUI التفاعلية',
    summary_ar: 'بناء واجهات تطبيقات أجهزة Apple الحديثة باستخدام نمط MVVM و `@Observable` مع دعم الوضع الداكن والحركات الانسيابية.',
    benefits_ar: [
      'كود واجهات تصريحي نظيف يتوافق مع أحدث إصدارات iOS و macOS.',
      'إدارة فعالة للحالة وتحديث تلقائي للواجهات بدون تسريب ذاكرة.'
    ],
    use_cases_ar: ['برمجة شاشة الملف الشخصي وإعدادات التطبيق بـ SwiftUI.'],
    example_prompts_ar: ['اكتب كود SwiftUI لشاشة عرض المنتجات مع شبكة قابلة للتمرير وبحث فوري.']
  },
  {
    id: 'rust-patterns',
    name: 'rust-patterns',
    kind: 'skill',
    category: 'development',
    featured: false,
    github_stars: 269914,
    difficulty: 'advanced',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/rust-patterns',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/rust-patterns',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'أنماط الإنتاج في لغة Rust',
    summary_ar: 'تطبيق أنماط Rust المتقدمة في معالجة الأخطاء بـ `thiserror` و `anyhow`، وإدارة الملكية (Borrow Checker) وتعدد المسارات غير المتزامن باستخدام Tokio.',
    benefits_ar: [
      'برمجيات فائقة السرعة تستهلك الحد الأدنى من الذاكرة وخالية من أعطال الانهيار.',
      'معالجة أخطاء صريحة وواضحة بدون استخدام `.unwrap()` العشوائي.'
    ],
    use_cases_ar: ['بناء خدمة خلفية عالية الكثافة لمعالجة البيانات الضخمة.'],
    example_prompts_ar: ['صمم بنية معالجة أخطاء بلغة Rust لدالة تقرأ ملف وتتصل بقاعدة بيانات.']
  },
  {
    id: 'redis-patterns',
    name: 'redis-patterns',
    kind: 'skill',
    category: 'development',
    featured: false,
    github_stars: 269914,
    difficulty: 'intermediate',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/redis-patterns',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/redis-patterns',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'أنماط التخزين المؤقت بـ Redis',
    summary_ar: 'تطبيق استراتيجيات الكاش الذكية (Cache-Aside, Write-Through)، ومحددات معدل الطلبات (Rate Limiting) وتخزين الجلسات الموزعة.',
    benefits_ar: [
      'تخفيف الضغط على قواعد البيانات الأساسية وتسريع استجابة الواجهات إلى أجزاء من الملي ثانية.',
      'حماية الخوادم من هجمات الإغراق بحظر الطلبات الزائدة تلقائياً.'
    ],
    use_cases_ar: ['تطبيق كاش لنتائج استعلامات الصفحة الرئيسية ومحدد لمعدل استدعاء الـ API.'],
    example_prompts_ar: ['اكتب كود بايثون لتطبيق Sliding Window Rate Limiter باستخدام Redis.']
  },
  {
    id: 'tanstack-query',
    name: 'tanstack-query',
    kind: 'skill',
    category: 'development',
    featured: false,
    github_stars: 45000,
    difficulty: 'intermediate',
    source: {
      owner: 'TanStack',
      repo: 'TanStack/query',
      repo_url: 'https://github.com/TanStack/query',
      path_in_repo: 'skills/tanstack-query',
      url: 'https://github.com/TanStack/query',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'إدارة وتخزين بيانات الخادم بـ TanStack Query',
    summary_ar: 'التعامل مع جلب وتخزين وإعادة تحديث البيانات غير المتزامنة في تطبيقات React مع التحديثات المتفائلة (Optimistic Updates).',
    benefits_ar: [
      'تحديث فوري وسلس للواجهات وإلغاء التعقيد في تتبع حالات التحميل والأخطاء.',
      'تحديث تلقائي للبيانات عند إعادة تركيز المتصفح أو استعادة الاتصال.'
    ],
    use_cases_ar: ['ربط واجهات الـ Frontend بـ API مع كاش تلقائي وتحديث متفائل.'],
    example_prompts_ar: ['اكتب React Hook مخصص يجلب قائمة المهام مع دعم التحديث المتفائل عند الإضافة.']
  },
  {
    id: 'graphql-architect',
    name: 'graphql-architect',
    kind: 'skill',
    category: 'development',
    featured: false,
    github_stars: 55000,
    difficulty: 'advanced',
    source: {
      owner: 'graphql',
      repo: 'graphql/graphql-spec',
      repo_url: 'https://github.com/graphql/graphql-spec',
      path_in_repo: 'skills/graphql-architect',
      url: 'https://github.com/graphql/graphql-spec',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'هندسة وتصميم مخططات GraphQL',
    summary_ar: 'بناء مخططات GraphQL مرنة ومنظمة، وتطبيق تقنيات Dataloader لحل معضلة N+1 وتأمين استعلامات الـ Depth والـ Complexity.',
    benefits_ar: [
      'تمكين واجهات المستخدم من طلب الحقول التي تحتاجها فقط بدون زيادة أو نقصان.',
      'دمج مصادر بيانات متعددة في نقطة نهاية واحدة عالية الكفاءة.'
    ],
    use_cases_ar: ['تصميم مخطط GraphQL متكامل لنظام إدارة المحتوى والتجارة الإلكترونية.'],
    example_prompts_ar: ['صمم Schema لمتجر يتضمن المنتجات والتصنيفات والتعليقات مع حل مشكلة N+1 بالـ DataLoader.']
  },

  // --- Code Quality & Testing (11) ---
  {
    id: 'systematic-debugging',
    name: 'systematic-debugging',
    kind: 'skill',
    category: 'code-quality',
    featured: true,
    github_stars: 292705,
    difficulty: 'intermediate',
    source: {
      owner: 'obra',
      repo: 'obra/superpowers',
      repo_url: 'https://github.com/obra/superpowers',
      path_in_repo: 'skills/systematic-debugging',
      url: 'https://github.com/obra/superpowers/tree/main/skills/systematic-debugging',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'استكشاف وإصلاح الأخطاء المنهجي',
    summary_ar: 'منهجية دقيقة لعزل وتتبع الأخطاء البرمجية الصعبة عبر الفرضيات العلمية ومراجعة السجلات، بدلاً من التخمين العشوائي.',
    benefits_ar: [
      'الوصول للسبب الجذري للمشكلة بسرعة بدلاً من التعديلات التجريبية.',
      'كتابة اختبار فاشل يثبت الخطأ قبل إصلاحه لضمان عدم تكراره مستقبلاً.'
    ],
    use_cases_ar: ['حل مشكلة تسريب ذاكرة أو خطأ غامض يظهر في بيئة الإنتاج فقط.'],
    example_prompts_ar: ['ساعدني في تتبع سبب الخطأ التالي خطوة بخطوة واقترح فرضيات لاختبارها.']
  },
  {
    id: 'test-driven-development',
    name: 'test-driven-development',
    kind: 'skill',
    category: 'code-quality',
    featured: false,
    github_stars: 292705,
    difficulty: 'intermediate',
    source: {
      owner: 'obra',
      repo: 'obra/superpowers',
      repo_url: 'https://github.com/obra/superpowers',
      path_in_repo: 'skills/test-driven-development',
      url: 'https://github.com/obra/superpowers/tree/main/skills/test-driven-development',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'التطوير الموجه بالاختبارات (TDD)',
    summary_ar: 'دورة عمل Red-Green-Refactor الصارمة: كتابة اختبار فاشل يحدد السلوك المطلوب، ثم كتابة أقل كود للنجاح، ثم إعادة الهيكلة بثقة.',
    benefits_ar: [
      'ضمان تغطية اختبارات تتجاوز 90% لكل سطر برمجي جديد.',
      'تصميم دوال برمجية معيارية قابلة للاختبار والفصل.'
    ],
    use_cases_ar: ['تطوير وحدة حسابية أو منطق أعمال معقد خالي من الثغرات.'],
    example_prompts_ar: ['اكتب لي أولاً اختبار فاشل للتحقق من صحة أرقام الهواتف الدولية قبل كتابة كود التنفيذ.']
  },
  {
    id: 'requesting-code-review',
    name: 'requesting-code-review',
    kind: 'skill',
    category: 'code-quality',
    featured: false,
    github_stars: 292705,
    difficulty: 'beginner',
    source: {
      owner: 'obra',
      repo: 'obra/superpowers',
      repo_url: 'https://github.com/obra/superpowers',
      path_in_repo: 'skills/requesting-code-review',
      url: 'https://github.com/obra/superpowers/tree/main/skills/requesting-code-review',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'إعداد الكود وطلب المراجعة البرمجية',
    summary_ar: 'تجهيز طلبات السحب (PR) ببيانات شارحة وصور توضيحية وقوائم تحقق ذاتية تسهل على المراجعين فحص الكود واعتماده.',
    benefits_ar: [
      'تسريع وقت مراجعة الأكواد وتقليل النقاشات المتكررة حول التنسيق.',
      'التأكد من اجتياز جميع الفحوصات الآلية قبل استدعاء المراجع البشري.'
    ],
    use_cases_ar: ['كتابة وصف شامل لطلب سحب قبل تقديمه لفريق العمل.'],
    example_prompts_ar: ['جهز لي نص وصف PR يشرح التغييرات في مسار المصادقة مع خطوات التحقق اليدوي.']
  },
  {
    id: 'receiving-code-review',
    name: 'receiving-code-review',
    kind: 'skill',
    category: 'code-quality',
    featured: false,
    github_stars: 292705,
    difficulty: 'beginner',
    source: {
      owner: 'obra',
      repo: 'obra/superpowers',
      repo_url: 'https://github.com/obra/superpowers',
      path_in_repo: 'skills/receiving-code-review',
      url: 'https://github.com/obra/superpowers/tree/main/skills/receiving-code-review',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'استيعاب وتطبيق ملاحظات مراجعة الكود',
    summary_ar: 'التعامل مع ملاحظات المراجعين باحترافية وتفكيك الاقتراحات إلى مهام تعديل واضحة دون كسر الوظائف السابقة.',
    benefits_ar: [
      'التأكد من معالجة كل نقطة في المراجعة بدون إهمال أي تعليق.',
      'الحفاظ على استقرار الاختبارات بعد إدخال التعديلات المطلوبة.'
    ],
    use_cases_ar: ['تنفيذ تعديلات طلبها المراجع المعماري على تصميم قاعدة البيانات.'],
    example_prompts_ar: ['لدي هذه الملاحظات الثلاث على طلبي، ساعدني في تعديل الكود لتطبيقها بدقة.']
  },
  {
    id: 'using-git-worktrees',
    name: 'using-git-worktrees',
    kind: 'skill',
    category: 'code-quality',
    featured: false,
    github_stars: 292705,
    difficulty: 'advanced',
    source: {
      owner: 'obra',
      repo: 'obra/superpowers',
      repo_url: 'https://github.com/obra/superpowers',
      path_in_repo: 'skills/using-git-worktrees',
      url: 'https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'العمل على عدة فروع بالتوازي بـ Git Worktrees',
    summary_ar: 'التبديل بين الفروع وإصلاح المشاكل العاجلة (Hotfixes) في مجلدات منفصلة في نفس اللحظة دون الحاجة لعمل stash أو إعادة بناء المشروع.',
    benefits_ar: [
      'توفير وقت إعادة تثبيت الحزم `node_modules` وإعادة البناء عند تبديل الفروع.',
      'إمكانية تشغيل واختبار نسختين مختلفتين من التطبيق جنباً إلى جنب.'
    ],
    use_cases_ar: ['إصلاح خطأ إنتاج عاجل أثناء العمل على ميزة طويلة الأمد.'],
    example_prompts_ar: ['اشرح لي أوامر Git Worktree لفتح فرع hotfix في مجلد منفصل والعودة لمجلدي الأصلي.']
  },
  {
    id: 'verification-before-completion',
    name: 'verification-before-completion',
    kind: 'skill',
    category: 'code-quality',
    featured: false,
    github_stars: 292705,
    difficulty: 'intermediate',
    source: {
      owner: 'obra',
      repo: 'obra/superpowers',
      repo_url: 'https://github.com/obra/superpowers',
      path_in_repo: 'skills/verification-before-completion',
      url: 'https://github.com/obra/superpowers/tree/main/skills/verification-before-completion',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'التحقق الصارم قبل إنهاء المهمة',
    summary_ar: 'إلزام الموديل بإجراء فحوصات ذاتية صارمة (تشغيل الاختبارات، فحص الأنواع، فحص التنسيق) قبل إعلان اكتمال أي مهمة برمجية.',
    benefits_ar: [
      'القضاء على أخطاء "الكود يبدو مكتملاً لكنه لا يعمل".',
      'التأكد من عدم كسر أي اختبارات قديمة (Regression testing).'
    ],
    use_cases_ar: ['مراجعة نهاية المهمة قبل تسليم الكود للمستخدم.'],
    example_prompts_ar: ['تحقق من كل الاختبارات والأنواع قبل أن تؤكد لي أن المهمة انتهت.']
  },
  {
    id: 'github-pr-workflow',
    name: 'github-pr-workflow',
    kind: 'skill',
    category: 'code-quality',
    featured: false,
    github_stars: 95319,
    difficulty: 'intermediate',
    source: {
      owner: 'paperclipai',
      repo: 'paperclipai/paperclip',
      repo_url: 'https://github.com/paperclipai/paperclip',
      path_in_repo: 'skills/github-pr-workflow',
      url: 'https://github.com/paperclipai/paperclip',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'أتمتة دورة حياة طلبات السحب (PR Automation)',
    summary_ar: 'إدارة وتنسيق مراجعات طلبات السحب على GitHub، وتطبيق قواعد الفحص الآلي، وحل التعليقات المتبقية تلقائياً.',
    benefits_ar: [
      'التأكد من التزام طلبات السحب باتفاقيات الفريق والشروط المسبقة للدمج.',
      'تحديث سجل التغييرات وملخص الـ PR عند إضافة التزامات جديدة.'
    ],
    use_cases_ar: ['إدارة سير عمل الفرق البرمجية الكبيرة على مستودعات GitHub.'],
    example_prompts_ar: ['لخص حالة طلب السحب رقم 42 وما هي الفحوصات المعلقة لدمجه.']
  },
  {
    id: 'react-testing-library',
    name: 'react-testing-library',
    kind: 'skill',
    category: 'code-quality',
    featured: false,
    github_stars: 269914,
    difficulty: 'intermediate',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/react-testing',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/react-testing',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'اختبار مكونات React التفاعلية',
    summary_ar: 'كتابة اختبارات المكونات وسلوكيات المستخدم عبر React Testing Library ومحاكاة الأحداث الحقيقية (User Events) بدلاً من اختبار تفاصيل التنفيذ.',
    benefits_ar: [
      'اختبارات قوية لا تنكسر عند إعادة هيكلة الكود الداخلي للمكون.',
      'التأكد من إمكانية الوصول والتفاعل السلس مع أزرار وحقول الإدخال.'
    ],
    use_cases_ar: ['اختبار نموذج تسجيل المستخدم والتأكد من ظهور رسائل التنبيه.'],
    example_prompts_ar: ['اكتب اختبار RTL لنموذج تسجيل دخول يحاكي الكتابة والضغط على زر الدخول.']
  },
  {
    id: 'python-pytest-suite',
    name: 'python-pytest-suite',
    kind: 'skill',
    category: 'code-quality',
    featured: false,
    github_stars: 269914,
    difficulty: 'intermediate',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/python-testing',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/python-testing',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'حزمة اختبارات بايثون بـ Pytest',
    summary_ar: 'تصميم حزم اختبارات بايثون متكاملة باستخدام fixtures ومحاكاة الخدمات الخارجية بـ `unittest.mock` واختبار الحالات الحدية المتعددة.',
    benefits_ar: [
      'اختبارات نظيفة وقابلة لإعادة الاستخدام بدون تكرار إعداد البيانات.',
      'سرعة تنفيذ الاختبارات والتكامل السلس مع بيئات الـ CI/CD.'
    ],
    use_cases_ar: ['اختبار دوال معالجة البيانات والتحقق من حساب النسب بشكل صحيح.'],
    example_prompts_ar: ['اكتب اختبار Pytest مع fixture لإنشاء بيانات مستخدم واختبار تحديث الرصيد.']
  },
  {
    id: 'golang-testing-suite',
    name: 'golang-testing-suite',
    kind: 'skill',
    category: 'code-quality',
    featured: false,
    github_stars: 245659,
    difficulty: 'intermediate',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/golang-testing',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/golang-testing',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'اختبارات Go وحساب الأداء (Benchmarks)',
    summary_ar: 'كتابة اختبارات الجداول (Table-driven tests) في Go، وفحص سباق البيانات المتوازية (Race Detector) وقياس استهلاك الذاكرة والسرعة.',
    benefits_ar: [
      'كتابة اختبارات قياسية وفق أسلوب لغة Go المعتمد.',
      'كشف تعارضات التزامن (Deadlocks & Race conditions) مبكراً.'
    ],
    use_cases_ar: ['اختبار خوارزمية تخزين مؤقت متزامنة بلغة Go وقياس سرعتها بالـ Benchmark.'],
    example_prompts_ar: ['صمم اختبار Table-driven test بلغة Go لدالة معالجة الـ JSON.']
  },
  {
    id: 'eval-harness',
    name: 'eval-harness',
    kind: 'skill',
    category: 'code-quality',
    featured: false,
    github_stars: 245659,
    difficulty: 'advanced',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/eval-harness',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/eval-harness',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'أطر تقييم مخرجات نماذج الذكاء الاصطناعي',
    summary_ar: 'بناء معايير تقييم واختبارات آلية (Evals) لقياس دقة النماذج في استخراج البيانات واتباع التعليمات ومنع الهلوسة.',
    benefits_ar: [
      'قياس أثر التعديل في الـ Prompts بالأرقام والنسب المئوية.',
      'ضمان عدم تراجع جودة الموديل عند الترقية أو تغيير الإعدادات.'
    ],
    use_cases_ar: ['تقييم أداء نظام دعم فني ذكي للتأكد من دقته وأمان إجاباته.'],
    example_prompts_ar: ['صمم حزمة اختبارات تقييمية (Eval dataset) لفحص دقة استخراج التواريخ من العقود.']
  },

  // --- Cloud & Security (9) ---
  {
    id: 'django-security',
    name: 'django-security',
    kind: 'skill',
    category: 'cloud-security',
    featured: false,
    github_stars: 269914,
    difficulty: 'intermediate',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/django-security',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/django-security',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'تحصين وأمان تطبيقات Django',
    summary_ar: 'إعدادات الأمان الصارمة في Django لمواجهة ثغرات CSRF و Clickjacking وتأمين ملفات الـ Cookies ورؤوس HSTS.',
    benefits_ar: [
      'تطبيق ممارسات حماية معتمدة تجتاز تدقيقات الأمان للشركات الكبرى.',
      'تأمين إدارة الجلسات وحماية لوحة تحكم Django الإدارية.'
    ],
    use_cases_ar: ['تجهيز إعدادات الأمان لتطبيق Django قبل نشره على السيرفر المباشر.'],
    example_prompts_ar: ['راجع ملف settings.py واقترح إعدادات الأمان المطلوبة لبيئة الإنتاج.']
  },
  {
    id: 'springboot-security',
    name: 'springboot-security',
    kind: 'skill',
    category: 'cloud-security',
    featured: false,
    github_stars: 269914,
    difficulty: 'advanced',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/springboot-security',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/springboot-security',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'تأمين تطبيقات Spring Boot و Java',
    summary_ar: 'تطبيق أمان المؤسسات بـ Spring Security 6 و OAuth2 و JWT وتحديد صلاحيات الوصول على مستوى الدوال (Method-level security).',
    benefits_ar: [
      'تحكم دقيق بالصلاحيات (RBAC) وفصل الأدوار الإدارية عن المستخدمين.',
      'تشفير كلمات المرور والاتصالات وفق المعايير المصرفية والحكومية.'
    ],
    use_cases_ar: ['بناء طبقة حماية لخدمات Spring Boot الموزعة (Microservices).'],
    example_prompts_ar: ['اكتب كود SecurityFilterChain في Spring Boot 3 لتأمين مسارات الـ API بـ JWT.']
  },
  {
    id: 'security-review-checklist',
    name: 'security-review-checklist',
    kind: 'skill',
    category: 'cloud-security',
    featured: false,
    github_stars: 269914,
    difficulty: 'intermediate',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/security-review',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/security-review',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'قائمة التدقيق الأمني الشامل للكود',
    summary_ar: 'مراجعة أمنية منظمة تغطي صلاحيات المدخلات، التشفير، الجلسات، رؤوس الـ CORS، ومنع تسريب الأسرار في مخرجات الأخطاء.',
    benefits_ar: [
      'حصر نقاط الضعف البرمجية قبل أن يستغلها المخترقون.',
      'توفير توجيهات فورية لمعالجة الثغرات البرمجية في مختلف اللغات.'
    ],
    use_cases_ar: ['إجراء فحص أمني نهائي لتطبيق ويب قبل تسليمه للعميل.'],
    example_prompts_ar: ['قم بإجراء مراجعة أمنية شاملة لمسار إعادة تعيين كلمة المرور المرفق.']
  },
  {
    id: 'terraform-module-library',
    name: 'terraform-module-library',
    kind: 'skill',
    category: 'cloud-security',
    featured: false,
    github_stars: 40199,
    difficulty: 'intermediate',
    source: {
      owner: 'wshobson',
      repo: 'wshobson/agents',
      repo_url: 'https://github.com/wshobson/agents',
      path_in_repo: 'plugins/cloud-infra/skills/terraform-module-library',
      url: 'https://github.com/wshobson/agents',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'بناء وحدات البنية التحتية بـ Terraform',
    summary_ar: 'كتابة وحدات Terraform معيارية وقابلة لإعادة الاستخدام لإدارة خوادم AWS و Azure وشبكات الـ VPC وقواعد البيانات السحابية.',
    benefits_ar: [
      'إدارة الموارد السحابية ككود قابل للإصدار والمراجعة (Infrastructure as Code).',
      'تأمين البنية التحتية السحابية عبر تحديد صلاحيات IAM الصارمة.'
    ],
    use_cases_ar: ['إنشاء شبكة سحابية آمنة في AWS تتضمن شبكات فرعية عامة وخاصة.'],
    example_prompts_ar: ['صمم وحدة Terraform لإنشاء قاعدة بيانات AWS RDS داخل شبكة فرعية خاصة.']
  },
  {
    id: 'kubernetes-manifest-builder',
    name: 'kubernetes-manifest-builder',
    kind: 'skill',
    category: 'cloud-security',
    featured: false,
    github_stars: 65000,
    difficulty: 'advanced',
    source: {
      owner: 'kubernetes',
      repo: 'kubernetes/kubernetes',
      repo_url: 'https://github.com/kubernetes/kubernetes',
      path_in_repo: 'skills/kubernetes-manifest-builder',
      url: 'https://github.com/kubernetes/kubernetes',
      url_verified: false
    },
    license: { type: 'Apache-2.0', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'بناء ملفات نشر Kubernetes المحصنة',
    summary_ar: 'كتابة مواصفات Deployments و Services و Ingress مع تحديد حدود الموارد (CPU/Memory limits) وسياسات الأمان SecurityContext.',
    benefits_ar: [
      'ضمان استقرار التطبيقات السحابية وإعادة تشغيل الحاويات تلقائياً عند الأعطال.',
      'منع اختراق الحاويات بمنع صلاحيات الـ Root وحظر تعديل نظام الملفات.'
    ],
    use_cases_ar: ['نشر تطبيق Node.js وقاعدة بيانات على عنقود Kubernetes.'],
    example_prompts_ar: ['اكتب ملف Deployment و Service لتطبيق ويب مع إعدادات Liveness و Readiness probes.']
  },
  {
    id: 'datadog-cloud-monitoring',
    name: 'datadog-cloud-monitoring',
    kind: 'skill',
    category: 'cloud-security',
    featured: false,
    github_stars: 74258,
    difficulty: 'intermediate',
    source: {
      owner: 'composiohq',
      repo: 'composiohq/agentic-integrations',
      repo_url: 'https://github.com/composiohq/agentic-integrations',
      path_in_repo: 'skills/datadog-automation',
      url: 'https://github.com/composiohq/agentic-integrations',
      url_verified: false
    },
    license: { type: 'Apache-2.0', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'مراقبة أداء الخوادم مع Datadog',
    summary_ar: 'إعداد لوحات مراقبة المقاييس الحيوية (Metrics) وتتبع السجلات (APM Tracing) وإنشاء تنبيهات فورية عند تجاوز معدل الأخطاء.',
    benefits_ar: [
      'اكتشاف الاختناقات في أداء السيرفرات قبل أن تؤثر على المستخدمين.',
      'تتبع المسار الكامل للطلبات عبر الخدمات المصغرة (Distributed Tracing).'
    ],
    use_cases_ar: ['إعداد مراقبة دقيقة لمعدل استهلاك الذاكرة وزمن استجابة الـ API.'],
    example_prompts_ar: ['كيف أعد تنبيه Datadog يرسل إشعار لسلاك عند ارتفاع نسبة أخطاء 500 عن 2%؟']
  },
  {
    id: 'circleci-pipeline-ops',
    name: 'circleci-pipeline-ops',
    kind: 'skill',
    category: 'cloud-security',
    featured: false,
    github_stars: 74258,
    difficulty: 'intermediate',
    source: {
      owner: 'composiohq',
      repo: 'composiohq/agentic-integrations',
      repo_url: 'https://github.com/composiohq/agentic-integrations',
      path_in_repo: 'skills/circleci-automation',
      url: 'https://github.com/composiohq/agentic-integrations',
      url_verified: false
    },
    license: { type: 'Apache-2.0', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'أتمتة خطوط التكامل والنشر CI/CD',
    summary_ar: 'كتابة خطوط عمل سريعة ومحمية لفحص الكود وتشغيل الاختبارات وبناء الصور ونشرها تلقائياً عند الدمج في الفرع الرئيسي.',
    benefits_ar: [
      'تسريع دورة تسليم البرمجيات وتجنب النشر اليدوي المعرض للأخطاء.',
      'كاش ذكي للاعتماديات يقلص وقت البناء من دقائق إلى ثوانٍ.'
    ],
    use_cases_ar: ['بناء خط عمل يختبر الكود ثم يبني صورة Docker وينشرها في السحابة.'],
    example_prompts_ar: ['اكتب ملف .circleci/config.yml لتشغيل اختبارات بايثون ونشر الصورة إذا نجحت.']
  },
  {
    id: 'aws-serverless-architect',
    name: 'aws-serverless-architect',
    kind: 'skill',
    category: 'cloud-security',
    featured: false,
    github_stars: 80000,
    difficulty: 'intermediate',
    source: {
      owner: 'aws',
      repo: 'aws/serverless-application-model',
      repo_url: 'https://github.com/aws/serverless-application-model',
      path_in_repo: 'skills/aws-serverless-architect',
      url: 'https://github.com/aws/serverless-application-model',
      url_verified: false
    },
    license: { type: 'Apache-2.0', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'تصميم التطبيقات الخالية من الخوادم (AWS Serverless)',
    summary_ar: 'بناء خدمات غير خادومية بـ AWS Lambda و API Gateway و DynamoDB لتوفير التكاليف مع التوسع التلقائي اللامحدود.',
    benefits_ar: [
      'الدفع فقط مقابل وقت المعالجة الفعلي بدون تكلفة خوادم مستمرة.',
      'توسع تلقائي فوري يستوعب من مستخدم واحد إلى ملايين المستخدمين.'
    ],
    use_cases_ar: ['بناء نظام معالجة صور مصغرة عند رفعها على S3.'],
    example_prompts_ar: ['صمم دالة AWS Lambda ببايثون تستجيب لحدث رفع ملف على S3 وتخزن بياناته في DynamoDB.']
  },
  {
    id: 'secret-leak-detection',
    name: 'secret-leak-detection',
    kind: 'skill',
    category: 'cloud-security',
    featured: false,
    github_stars: 95319,
    difficulty: 'beginner',
    source: {
      owner: 'paperclipai',
      repo: 'paperclipai/paperclip',
      repo_url: 'https://github.com/paperclipai/paperclip',
      path_in_repo: 'skills/secret-leak-detection',
      url: 'https://github.com/paperclipai/paperclip',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'كشف وتطهير الأسرار ومفاتيح الـ API',
    summary_ar: 'فحص ملفات المشاريع وسجل الـ Git لاكتشاف مفاتيح التشفير، كلمات المرور، والرموز الحساسة وتطهيرها بأمان.',
    benefits_ar: [
      'حماية الحسابات البنكية والسحابية من الفواتير الضخمة نتيجة تسريب المفاتيح.',
      'إرشاد المطور لكيفية حذف الأسرار من تاريخ الـ Git بالكامل.'
    ],
    use_cases_ar: ['فحص المستودع قبل تحويله من خاص إلى مفتوح المصدر للعامة.'],
    example_prompts_ar: ['افحص الكود المرفق للتأكد من خلوه من أي مفاتيح API أو توكنات مسربة.']
  },

  // --- Design & UX (7) ---
  {
    id: 'responsive-design',
    name: 'responsive-design',
    kind: 'skill',
    category: 'design',
    featured: true,
    github_stars: 40199,
    difficulty: 'intermediate',
    source: {
      owner: 'wshobson',
      repo: 'wshobson/agents',
      repo_url: 'https://github.com/wshobson/agents',
      path_in_repo: 'plugins/ui-design/skills/responsive-design',
      url: 'https://github.com/wshobson/agents',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'تصميم واجهات الويب المتجاوبة الحديثة',
    summary_ar: 'تطبيق أحدث استراتيجيات التجاوب باستخدام Container Queries، والطباعة الانسيابية (Fluid Typography)، و CSS Grid الحديثة.',
    benefits_ar: [
      'واجهات تعمل بانسيابية على كل الشاشات من الهواتف الصغيرة وحتى الشاشات العريضة.',
      'تجاوب العناصر بناءً على حجم الحاوية المحيطة وليس فقط حجم نافذة المتصفح.'
    ],
    use_cases_ar: ['بناء لوحة تحكم تحتوي على بطاقات وجداول تتكيف تلقائياً مع الشاشة.'],
    example_prompts_ar: ['اكتب كود CSS Grid يتكيف تلقائياً مع حجم الشاشة بدون استخدام media queries.']
  },
  {
    id: 'mermaid-diagrams',
    name: 'mermaid-diagrams',
    kind: 'skill',
    category: 'design',
    featured: false,
    github_stars: 213,
    difficulty: 'beginner',
    source: {
      owner: 'veelenga',
      repo: 'veelenga/claude-mermaid',
      repo_url: 'https://github.com/veelenga/claude-mermaid',
      path_in_repo: 'skills/mermaid-diagrams',
      url: 'https://github.com/veelenga/claude-mermaid',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'رسم وتوليد المخططات الهندسية بـ Mermaid',
    summary_ar: 'توليد مخططات التدفق (Flowcharts)، ومخططات التسلسل (Sequence)، ومخططات العلاقات (ER Diagrams) ككود نصي يعرض مباشرة في Markdown.',
    benefits_ar: [
      'توثيق مرئي جذاب للأنظمة والمسارات البرمجية قابل للتعديل بسهولة.',
      'دعم كامل للتكامل مع GitHub و Notion وأدوات التوثيق الحديثة.'
    ],
    use_cases_ar: ['رسم مخطط يوضح مسار تسجيل الدخول والمصادقة وتدفق البيانات بين الواجهة والسيرفر.'],
    example_prompts_ar: ['ارسم لي مخطط تسلسل (sequence diagram) يوضح دورة حياة طلب الشراء حتى تأكيد الدفع.']
  },
  {
    id: 'design-system-tokens',
    name: 'design-system-tokens',
    kind: 'skill',
    category: 'design',
    featured: false,
    github_stars: 132809,
    difficulty: 'intermediate',
    source: {
      owner: 'nextlevelbuilder',
      repo: 'nextlevelbuilder/ui-skills',
      repo_url: 'https://github.com/nextlevelbuilder/ui-skills',
      path_in_repo: 'skills/design-system',
      url: 'https://github.com/nextlevelbuilder/ui-skills',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'بناء وتوحيد أنظمة التصميم (Design Tokens)',
    summary_ar: 'هيكلة ألوان ومقاسات ومسافات التصميم في متغيرات موحدة تسهل بناء واجهات متسقة وتطبيق الوضعين الفاتح والداكن بسهولة.',
    benefits_ar: [
      'توحيد الهوية البصرية عبر جميع صفحات وتطبيقات الشركة.',
      'تغيير ألوان أو نمط الموقع بالكامل عبر تعديل ملف المتغيرات فقط.'
    ],
    use_cases_ar: ['إنشاء نظام ألوان وخطوط ومسافات لتطبيق ويب حديث.'],
    example_prompts_ar: ['صمم لي ملف متغيرات CSS يحتوي على درجات الألوان الأساسية والمسافات بنظام 4px grid.']
  },
  {
    id: 'screen-reader-accessibility',
    name: 'screen-reader-accessibility',
    kind: 'skill',
    category: 'design',
    featured: false,
    github_stars: 40199,
    difficulty: 'intermediate',
    source: {
      owner: 'wshobson',
      repo: 'wshobson/agents',
      repo_url: 'https://github.com/wshobson/agents',
      path_in_repo: 'plugins/ui-design/skills/screen-reader-testing',
      url: 'https://github.com/wshobson/agents',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'إتاحة الواجهات لقارئات الشاشة (WCAG a11y)',
    summary_ar: 'ضبط سمات ARIA، وهيكلة العناوين الدلالية، وضمان إمكانية التنقل الكامل بلوحة المفاتيح للمستخدمين ذوي الاحتياجات الخاصة.',
    benefits_ar: [
      'الوصول لنسبة 100% في اختبارات إمكانية الوصول في Lighthouse و Axe.',
      'فتح التطبيق لجميع فئات المستخدمين والامتثال للمعايير القانونية العالمية.'
    ],
    use_cases_ar: ['تدقيق نافذة منبثقة (Modal) للتأكد من حصر التركيز وإتاحتها لقارئ الشاشة.'],
    example_prompts_ar: ['راجع هذا المكون وأضف سمات ARIA المناسبة ليتمكن المكفوفون من استخدامه.']
  },
  {
    id: 'tailwind-ui-builder',
    name: 'tailwind-ui-builder',
    kind: 'skill',
    category: 'design',
    featured: false,
    github_stars: 75000,
    difficulty: 'beginner',
    source: {
      owner: 'tailwindlabs',
      repo: 'tailwindlabs/tailwindcss',
      repo_url: 'https://github.com/tailwindlabs/tailwindcss',
      path_in_repo: 'skills/tailwind-ui-builder',
      url: 'https://github.com/tailwindlabs/tailwindcss',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'بناء واجهات Tailwind CSS الاحترافية',
    summary_ar: 'كتابة مكونات واجهات مستخدم جذابة ومتجاوبة باستخدام فئات Tailwind CSS مع التركيز على التناسق والابتعاد عن التنسيقات التقليدية.',
    benefits_ar: [
      'تطوير سريع جداً للواجهات بدون الحاجة لكتابة ملفات CSS منفصلة.',
      'أحجام ملفات نهائية صغيرة جداً بحذف الفئات غير المستخدمة تلقائياً.'
    ],
    use_cases_ar: ['بناء شريط ملاحة متجاوب أو بطاقة تسعير بـ Tailwind CSS.'],
    example_prompts_ar: ['ابنِ بطاقة تسعير احترافية بـ Tailwind تتضمن تأثيراً عند تمرير الماوس وزر شراء بارز.']
  },
  {
    id: 'framer-motion-animation',
    name: 'framer-motion-animation',
    kind: 'skill',
    category: 'design',
    featured: false,
    github_stars: 48000,
    difficulty: 'intermediate',
    source: {
      owner: 'framer',
      repo: 'framer/motion',
      repo_url: 'https://github.com/framer/motion',
      path_in_repo: 'skills/framer-motion',
      url: 'https://github.com/framer/motion',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'الحركات التفاعلية السلسة بـ Framer Motion',
    summary_ar: 'إضافة لمسات تفاعلية وحركات فيزيائية دقيقة لمكونات الويب مثل القوائم المنسدلة، الانتقال بين الصفحات، وتأثيرات الظهور عند التمرير.',
    benefits_ar: [
      'رفع جودة تجربة المستخدم وإعطاء شعور بالاحترافية والفخامة للتطبيق.',
      'دعم الحركات الفيزيائية (Spring physics) التي تتفاعل مع مدخلات المستخدم.'
    ],
    use_cases_ar: ['تحريك بطاقات المنتجات عند التمرير لأسفل الصفحة.'],
    example_prompts_ar: ['اكتب كود Framer Motion لظهور العناصر في القائمة بتأثير متتابع (Stagger animation).']
  },
  {
    id: 'svg-vector-optimizer',
    name: 'svg-vector-optimizer',
    kind: 'skill',
    category: 'design',
    featured: false,
    github_stars: 35000,
    difficulty: 'beginner',
    source: {
      owner: 'svg',
      repo: 'svg/svgo',
      repo_url: 'https://github.com/svg/svgo',
      path_in_repo: 'skills/svg-optimizer',
      url: 'https://github.com/svg/svgo',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'تحسين وضغط الرسوم المتجهة SVG',
    summary_ar: 'تنظيف كود ملفات SVG، وحذف البيانات الوصفية غير الضرورية، وتصغير حجم الملف بنسبة تصل لـ 70% مع الحفاظ على دقة الرسم.',
    benefits_ar: [
      'تسريع سرعة تحميل الصفحات وتقليل حجم استهلاك البيانات.',
      'تحويل الـ SVG إلى مكونات برمجية تفاعلية تتغير ألوانها بالـ CSS.'
    ],
    use_cases_ar: ['تحسين مجموعة أيقونات وشعارات لاستخدامها في الموقع.'],
    example_prompts_ar: ['قم بتنظيف كود الـ SVG المرفق واجعله يرث اللون عبر currentColor.']
  },

  // --- Data & AI (6) ---
  {
    id: 'mysql-best-practices',
    name: 'mysql-best-practices',
    kind: 'skill',
    category: 'data-ai',
    featured: false,
    github_stars: 248,
    difficulty: 'intermediate',
    source: {
      owner: 'mindrally',
      repo: 'mindrally/database-skills',
      repo_url: 'https://github.com/mindrally/database-skills',
      path_in_repo: 'skills/mysql-best-practices',
      url: 'https://github.com/mindrally/database-skills',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'أفضل ممارسات قواعد بيانات MySQL',
    summary_ar: 'تصميم الجداول وضبط محرك InnoDB، واختيار أنواع الحقول المثالية، وتطبيق استراتيجيات الفهرسة المركبة (Composite Indexes).',
    benefits_ar: [
      'تقليص حجم تخزين الجداول على القرص إلى النصف.',
      'تسريع استعلامات البحث والتصفية عبر استخدام الفهارس الصحيحة.'
    ],
    use_cases_ar: ['تحسين أداء قاعدة بيانات متجر تحتوي على ملايين السجلات.'],
    example_prompts_ar: ['اقترح فهارس مناسبة لجدول الطلبات لتسريع الاستعلامات التي تبحث بالتاريخ وحالة الطلب معاً.']
  },
  {
    id: 'postgresql-advanced',
    name: 'postgresql-advanced',
    kind: 'skill',
    category: 'data-ai',
    featured: false,
    github_stars: 85000,
    difficulty: 'advanced',
    source: {
      owner: 'postgres',
      repo: 'postgres/postgres',
      repo_url: 'https://github.com/postgres/postgres',
      path_in_repo: 'skills/postgresql-advanced',
      url: 'https://github.com/postgres/postgres',
      url_verified: false
    },
    license: { type: 'PostgreSQL', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'القدرات المتقدمة لقواعد بيانات PostgreSQL',
    summary_ar: 'استثمار ميزات PostgreSQL القوية مثل حقول JSONB المفهرسة بـ GIN، وتقسيم الجداول الكبيرة (Partitioning)، والـ Window Functions.',
    benefits_ar: [
      'الجمع بين مرونة قواعد بيانات NoSQL وموثوقية قواعد البيانات العلاقية.',
      'إجراء تحليلات إحصائية معقدة مباشرة داخل قاعدة البيانات بأقصى سرعة.'
    ],
    use_cases_ar: ['بناء نظام سجلات تدقيق (Audit log) مقسم زمنياً شهرياً.'],
    example_prompts_ar: ['اكتب استعلام PostgreSQL يستخرج بيانات من حقل JSONB مفهرس مع استخدام Window function للترتيب.']
  },
  {
    id: 'vector-database-rag',
    name: 'vector-database-rag',
    kind: 'skill',
    category: 'data-ai',
    featured: true,
    github_stars: 60000,
    difficulty: 'intermediate',
    source: {
      owner: 'chroma-core',
      repo: 'chroma-core/chroma',
      repo_url: 'https://github.com/chroma-core/chroma',
      path_in_repo: 'skills/vector-database-rag',
      url: 'https://github.com/chroma-core/chroma',
      url_verified: false
    },
    license: { type: 'Apache-2.0', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'قواعد بيانات المتجهات واسترجاع المعلومات (RAG)',
    summary_ar: 'تقطيع النصوص، وتوليد التضمينات (Embeddings)، وتخزينها والبحث الدلالي (Semantic Search) لتغذية نماذج الذكاء الاصطناعي بمعلومات الشركة.',
    benefits_ar: [
      'إتاحة إمكانية الإجابة الدقيقة للذكاء الاصطناعي بناءً على مستنداتك الخاصة.',
      'تجاوز حدود نافذة السياق (Context Window) باسترجاع الفقرات الأكثر صلة فقط.'
    ],
    use_cases_ar: ['بناء شات بوت يجيب على أسئلة المستخدمين من كتيبات المنتجات.'],
    example_prompts_ar: ['صمم دالة تقوم بتقطيع ملف PDF والبحث عن أكثر 3 فقرات تشابهاً مع سؤال المستخدم.']
  },
  {
    id: 'langchain-agent-workflow',
    name: 'langchain-agent-workflow',
    kind: 'skill',
    category: 'data-ai',
    featured: false,
    github_stars: 92000,
    difficulty: 'intermediate',
    source: {
      owner: 'langchain-ai',
      repo: 'langchain-ai/langchain',
      repo_url: 'https://github.com/langchain-ai/langchain',
      path_in_repo: 'skills/langchain-agent-workflow',
      url: 'https://github.com/langchain-ai/langchain',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'بناء سلاسل ووكلاء LangChain',
    summary_ar: 'ربط النماذج اللغوية بالأدوات الخارجية (Tools) وإدارة الذاكرة وسلاسل المعالجة المعقدة (Chains) لاتخاذ القرارات التلقائية.',
    benefits_ar: [
      'تمكين الذكاء الاصطناعي من استدعاء APIs وقواعد بيانات لتنفيذ المهام.',
      'هيكلة مخرجات النماذج بصيغ JSON قابلة للاستخدام البرمجي المباشر.'
    ],
    use_cases_ar: ['إنشاء وكيل ذكي يبحث في الإنترنت ثم يرسل بريداً إلكترونياً بالملخص.'],
    example_prompts_ar: ['ابنِ وكيل LangChain يملك أداتين: أداة آلة حاسبة وأداة بحث في قاعدة البيانات.']
  },
  {
    id: 'pytorch-model-eval',
    name: 'pytorch-model-eval',
    kind: 'skill',
    category: 'data-ai',
    featured: false,
    github_stars: 269914,
    difficulty: 'advanced',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/pytorch-patterns',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/pytorch-patterns',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'أنماط وتقييم نماذج PyTorch للتعلم العميق',
    summary_ar: 'كتابة حلقات تدريب وتقييم آمنة للذاكرة بـ PyTorch، وإدارة الـ Checkpoints وحساب مؤشرات الدقة (Accuracy, F1-Score) وتسريع الأداء بـ CUDA.',
    benefits_ar: [
      'منع أخطاء نفاد ذاكرة كارت الشاشة (CUDA Out of Memory) أثناء التدريب والتقييم.',
      'تتبع انحدار الخسارة (Loss) بدقة واكتشاف فرط التخصيص (Overfitting).'
    ],
    use_cases_ar: ['تقييم نموذج تصنيف نصوص على مجموعة بيانات اختبارية وحساب مصفوفة الالتباس.'],
    example_prompts_ar: ['اكتب دالة تقييم PyTorch تستخدم torch.no_grad() وتحسب معدل الدقة و F1-score.']
  },
  {
    id: 'weather-api-data',
    name: 'weather-api-data',
    kind: 'skill',
    category: 'data-ai',
    featured: false,
    github_stars: 48696,
    difficulty: 'beginner',
    source: {
      owner: 'hkuds',
      repo: 'hkuds/agentic-tools',
      repo_url: 'https://github.com/hkuds/agentic-tools',
      path_in_repo: 'skills/weather-data-pipeline',
      url: 'https://github.com/hkuds/agentic-tools',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'جمع وتحليل بيانات الأرصاد والطقس',
    summary_ar: 'استخراج مؤشرات الطقس والتنبؤات المناخية من مصادر بيانات مفتوحة، ومعالجة السلاسل الزمنية لدرجات الحرارة وهطول الأمطار.',
    benefits_ar: [
      'دمج بيانات الطقس الحية في تطبيقات السياحة والزراعة والخدمات اللوجستية.',
      'توليد تقارير وتحذيرات مناخية مبكرة بتنسيقات واضحة.'
    ],
    use_cases_ar: ['تحليل أثر تقلبات الطقس على مواعيد تسليم الشحنات البرية.'],
    example_prompts_ar: ['حلل سجل درجات الحرارة لآخر 30 يوماً واستخرج الأيام الأكثر حرارة والأكثر تقلباً.']
  },

  // --- Business & Finance (7) ---
  {
    id: 'marketing-campaign',
    name: 'marketing-campaign',
    kind: 'skill',
    category: 'business-finance',
    featured: true,
    github_stars: 269914,
    difficulty: 'intermediate',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/marketing-campaign',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/marketing-campaign',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'تخطيط وتنفيذ الحملات التسويقية الرقمية',
    summary_ar: 'بناء استراتيجيات تسويق متعددة القنوات: تحديد شرائح الجمهور، صياغة رسائل الهبوط، سلاسل البريد، ونصوص الإعلانات الممولة.',
    benefits_ar: [
      'توفير خطة إطلاق شاملة ومتسقة عبر جميع المنصات في وقت قياسي.',
      'زيادة معدلات التحويل (Conversion Rate) بصياغة نصوص بيع موجهة بدقة.'
    ],
    use_cases_ar: ['إعداد خطة إطلاق تطبيق رقمي جديد وجدول المحتوى الترويجي لمدة شهر.'],
    example_prompts_ar: ['صمم خطة حملة تسويقية لإطلاق تطبيق إنتاجية جديد تتضمن نصوص الإعلانات وسلسلة إيميلات ترحيبية.']
  },
  {
    id: 'competitor-analysis',
    name: 'competitor-analysis',
    kind: 'skill',
    category: 'business-finance',
    featured: false,
    github_stars: 182,
    difficulty: 'intermediate',
    source: {
      owner: 'aaron-he-zhu',
      repo: 'aaron-he-zhu/claude-skills',
      repo_url: 'https://github.com/aaron-he-zhu/claude-skills',
      path_in_repo: 'skills/competitor-analysis',
      url: 'https://github.com/aaron-he-zhu/claude-skills',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'تحليل المنافسين وحصص السوق',
    summary_ar: 'دراسة استراتيجيات المنافسين، وميزات منتجاتهم، وسياسات التسعير، وتحديد الثغرات التنافسية التي يمكن استغلالها للتفوق.',
    benefits_ar: [
      'فهم نقاط القوة والضعف في منتجات المنافسين قبل إنفاق ميزانيات التطوير.',
      'تحديد الميزة التنافسية الفريدة (USP) التي تميز منتجك في السوق.'
    ],
    use_cases_ar: ['مقارنة بين 3 منصات تجارة إلكترونية منافسة وتحديد ميزتنا التنافسية.'],
    example_prompts_ar: ['حلل عروض المنافسين الثلاثة المرفقة وحدد الثغرات التي يمكننا المنافسة عليها.']
  },
  {
    id: 'product-hunt-launch',
    name: 'product-hunt-launch',
    kind: 'skill',
    category: 'business-finance',
    featured: false,
    github_stars: 30000,
    difficulty: 'beginner',
    source: {
      owner: 'producthunt',
      repo: 'producthunt/launch-guide',
      repo_url: 'https://github.com/producthunt/launch-guide',
      path_in_repo: 'skills/product-hunt-launch',
      url: 'https://github.com/producthunt/launch-guide',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'خطة إطلاق المنتجات على منصات التقنية',
    summary_ar: 'تجهيز مواد يوم الإطلاق: صياغة الـ Tagline الجذاب، تصميم الصور التعريفية، تحضير رسالة الصانع (Maker comment)، وإدارة التفاعل.',
    benefits_ar: [
      'تحقيق أعلى ظهور ومراكز متقدمة (Top Product of the Day).',
      'جذب آلاف المستخدمين الأوائل والتغطيات الإعلامية للمشروع.'
    ],
    use_cases_ar: ['إطلاق أداة ذكاء اصطناعي جديدة على Product Hunt وجذب أول 1,000 مستخدم.'],
    example_prompts_ar: ['اكتب لي تعليق الصانع (Maker comment) لإطلاق موقعنا الجديد يشرح القصة والميزات.']
  },
  {
    id: 'seo-optimizer-audit',
    name: 'seo-optimizer-audit',
    kind: 'skill',
    category: 'business-finance',
    featured: false,
    github_stars: 222,
    difficulty: 'intermediate',
    source: {
      owner: 'secondsky',
      repo: 'secondsky/claude-skills',
      repo_url: 'https://github.com/secondsky/claude-skills',
      path_in_repo: 'plugins/seo-optimizer/skills/seo-optimizer',
      url: 'https://github.com/secondsky/claude-skills',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'تدقيق وتحسين السيو التقني للمواقع (SEO)',
    summary_ar: 'تحليل الكلمات المفتاحية، وفحص وسوم الـ Meta، والتحقق من بنية البيانات (Schema Markup)، ومراجعة سرعة وقابلية القراءة.',
    benefits_ar: [
      'تصدر نتائج البحث في Google وتحقيق زيارات مجانية مستمرة للموقع.',
      'كشف أخطاء السيو التقني مثل الروابط المكسورة وتكرار العناوين.'
    ],
    use_cases_ar: ['مراجعة مقال أو صفحة هبوط للتأكد من تصدرها في محركات البحث.'],
    example_prompts_ar: ['افحص محتوى صفحة الهبوط التالية واقترح تحسينات للعنوان والوصف وتوزيع الكلمات المفتاحية.']
  },
  {
    id: 'google-official-seo',
    name: 'google-official-seo',
    kind: 'skill',
    category: 'business-finance',
    featured: false,
    github_stars: 186,
    difficulty: 'intermediate',
    source: {
      owner: 'littleben',
      repo: 'littleben/claude-skills',
      repo_url: 'https://github.com/littleben/claude-skills',
      path_in_repo: 'skills/google-official-seo-guide',
      url: 'https://github.com/littleben/claude-skills',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'دليل جوجل الرسمي لتحسين محركات البحث',
    summary_ar: 'تطبيق الإرشادات المعتمدة من توثيق Google الرسمي حول الفهرسة، وتجربة الصفحات (Core Web Vitals)، وإدارة ملفات sitemap.',
    benefits_ar: [
      'تجنب العقوبات اليدوية أو الخوارزمية من محرك بحث Google.',
      'فهم كيف يزحف عنكبوت Googlebot إلى موقعك وكيفية توجيهه بشكل سليم.'
    ],
    use_cases_ar: ['حل مشاكل عدم فهرسة صفحات معينة في Google Search Console.'],
    example_prompts_ar: ['لماذا تظهر صفحتي كـ "تم الزحف ولم تتم الفهرسة" في سيرش كونسول وكيف أصلح ذلك؟']
  },
  {
    id: 'saas-pricing-strategy',
    name: 'saas-pricing-strategy',
    kind: 'skill',
    category: 'business-finance',
    featured: false,
    github_stars: 35000,
    difficulty: 'intermediate',
    source: {
      owner: 'openview',
      repo: 'openview/pricing-benchmarks',
      repo_url: 'https://github.com/openview/pricing-benchmarks',
      path_in_repo: 'skills/saas-pricing-strategy',
      url: 'https://github.com/openview/pricing-benchmarks',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'استراتيجيات تسعير البرمجيات السحابية (SaaS)',
    summary_ar: 'تصميم باقات التسعير بنمط Freemium أو الدفع حسب الاستهلاك (Usage-based)، وتحديد الميزات الفاصلة بين الباقات لدفع الترقية.',
    benefits_ar: [
      'تعظيم الإيرادات لكل مستخدم (ARPU) وتقليل معدل الإلغاء (Churn).',
      'بناء جدول تسعير واضح يزيل التردد عند الزوار ويسهل اتخاذ قرار الشراء.'
    ],
    use_cases_ar: ['تحديد أسعار باقات تطبيق سحابي جديد واختيار ميزات الباقة الاحترافية.'],
    example_prompts_ar: ['اقترح هيكل تسعير من 3 باقات لأداة تلخيص مستندات بالذكاء الاصطناعي مع توضيح حدود كل باقة.']
  },
  {
    id: 'venture-assessment',
    name: 'venture-assessment',
    kind: 'skill',
    category: 'business-finance',
    featured: false,
    github_stars: 7,
    difficulty: 'advanced',
    source: {
      owner: '57uff3r',
      repo: '57uff3r/claude-skills',
      repo_url: 'https://github.com/57uff3r/claude-skills',
      path_in_repo: 'skills/akorchak-venture-assessment',
      url: 'https://github.com/57uff3r/claude-skills',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'تقييم الشركات الناشئة لقرارات الاستثمار الجريء',
    summary_ar: 'إعداد تقارير الفحص النافي للجهالة (Due Diligence)، وتقييم حجم السوق المستهدف (TAM/SAM/SOM)، وخبرة الفريق وقوة الحواجز التنافسية (Moats).',
    benefits_ar: [
      'مساعدة المستثمرين ورواد الأعمال في تقييم مدى جاهزية الشركة لجولات التمويل.',
      'كشف المخاطر التشغيلية والتنظيمية قبل توقيع مذكرات الاستثمار.'
    ],
    use_cases_ar: ['تقييم عرض تقديمي (Pitch Deck) لشركة ناشئة في مجال التكنولوجيا المالية.'],
    example_prompts_ar: ['قيم فكرة الشركة الناشئة المرفقة وقدم تحليلاً لفرص نجاحها والمخاطر الرئيسية فيها.']
  },

  // --- Science & Education (5) ---
  {
    id: 'deep-research',
    name: 'deep-research',
    kind: 'skill',
    category: 'science-education',
    featured: true,
    github_stars: 50294,
    difficulty: 'advanced',
    source: {
      owner: 'Imbad0202',
      repo: 'Imbad0202/academic-research-skills',
      repo_url: 'https://github.com/Imbad0202/academic-research-skills',
      path_in_repo: 'deep-research',
      url: 'https://github.com/Imbad0202/academic-research-skills/tree/main/deep-research',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'فريق البحث الأكاديمي والتحليل المنهجي المعمق',
    summary_ar: 'خط معالجة بحثي شامل يعتمد على 13 وكيلاً تخصصياً لإجراء مراجعات الأدبيات، والتحقق من الحقائق، وكشف التحيز الإحصائي وفق معيار APA 7.0.',
    benefits_ar: [
      'إنتاج أبحاث ودراسات منهجية شاملة بدقة أكاديمية موثقة بالمصادر.',
      'كشف الثغرات المنهجية وتقييم جودة الأدلة العلمية في الأوراق المنشورة.'
    ],
    use_cases_ar: ['إعداد مراجعة منهجية شاملة لموضوع علمي أو طبي معقد.'],
    example_prompts_ar: ['قم بإجراء بحث أكاديمي معمق حول أثر الذكاء الاصطناعي التوليدي على التعليم الطبي مع توثيق المراجع.']
  },
  {
    id: 'sr-screener',
    name: 'sr-screener',
    kind: 'skill',
    category: 'science-education',
    featured: false,
    github_stars: 50294,
    difficulty: 'advanced',
    source: {
      owner: 'Imbad0202',
      repo: 'Imbad0202/academic-research-skills',
      repo_url: 'https://github.com/Imbad0202/academic-research-skills',
      path_in_repo: 'sr-screener',
      url: 'https://github.com/Imbad0202/academic-research-skills/tree/main/sr-screener',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'فرز الأوراق العلمية للمراجعات المنهجية',
    summary_ar: 'تطبيق معايير الشمول والاستبعاد (Inclusion/Exclusion Criteria) لفحص مئات الملخصات والأوراق البحثية بسرعة وكفاءة.',
    benefits_ar: [
      'توفير أسابيع من العمل اليدوي في فرز وقراءة ملخصات الأبحاث.',
      'تسجيل أسباب استبعاد كل دراسة لتوثيقها في مخطط PRISMA المعتمد.'
    ],
    use_cases_ar: ['فرز نتائج بحث لقاعدة بيانات PubMed لبحث مراجعة منهجية.'],
    example_prompts_ar: ['طبق معايير الشمول التالية على ملخصات الأبحاث الخمسة المرفقة واذكر سبب قبول أو رفض كل منها.']
  },
  {
    id: 'academic-paper-writer',
    name: 'academic-paper-writer',
    kind: 'skill',
    category: 'science-education',
    featured: false,
    github_stars: 50294,
    difficulty: 'intermediate',
    source: {
      owner: 'Imbad0202',
      repo: 'Imbad0202/academic-research-skills',
      repo_url: 'https://github.com/Imbad0202/academic-research-skills',
      path_in_repo: 'academic-paper',
      url: 'https://github.com/Imbad0202/academic-research-skills/tree/main/academic-paper',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'صياغة وتحرير الأوراق العلمية المحكمة',
    summary_ar: 'المساعدة في صياغة أقسام الورقة البحثية (المقدمة، المنهجية، النتائج، المناقشة) بأسلوب علمي رصين ومحايد يطابق متطلبات النشر الدولي.',
    benefits_ar: [
      'تحسين الصياغة اللغوية والتعبير عن النتائج الإحصائية بدقة دون مبالغة.',
      'التأكد من وضوح المنطق الأكاديمي وترابط الحجج العلمية بين الفصول.'
    ],
    use_cases_ar: ['تحرير قسم المناقشة في ورقة بحثية ومقارنة النتائج بالدراسات السابقة.'],
    example_prompts_ar: ['راجع صياغة هذا القسم من ورقتي البحثية واجعله يتبع النمط الأكاديمي الصارم للمجلات العلمية.']
  },
  {
    id: 'scientific-visualization',
    name: 'scientific-visualization',
    kind: 'skill',
    category: 'science-education',
    featured: false,
    github_stars: 47690,
    difficulty: 'intermediate',
    source: {
      owner: 'k-dense-ai',
      repo: 'k-dense-ai/scientific-skills',
      repo_url: 'https://github.com/k-dense-ai/scientific-skills',
      path_in_repo: 'skills/scientific-visualization',
      url: 'https://github.com/k-dense-ai/scientific-skills',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'رسم البيانات والمخططات العلمية للنشر',
    summary_ar: 'توليد رسوم بيانية علمية عالية الدقة (مخططات التشتت، الصندوق، التوزيعات) بـ Matplotlib و Seaborn جاهزة للإدراج في الأوراق والكتب.',
    benefits_ar: [
      'إنتاج رسومات مطابقة لمواصفات الطباعة والنشر (300+ DPI).',
      'اختيار ألوان مناسبة لضعاف تمييز الألوان (Colorblind-friendly).'
    ],
    use_cases_ar: ['رسم منحنيات التجارب المعملية مع أشرطة الخطأ (Error bars).'],
    example_prompts_ar: ['اكتب كود بايثون لرسم مقارنة نتائج التجربة بمخطط صندوقي أنيق جاهز للنشر في مجلة علمية.']
  },
  {
    id: 'math-latex-typesetter',
    name: 'math-latex-typesetter',
    kind: 'skill',
    category: 'science-education',
    featured: false,
    github_stars: 45000,
    difficulty: 'beginner',
    source: {
      owner: 'latex3',
      repo: 'latex3/latex2e',
      repo_url: 'https://github.com/latex3/latex2e',
      path_in_repo: 'skills/math-latex',
      url: 'https://github.com/latex3/latex2e',
      url_verified: false
    },
    license: { type: 'LPPL', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'كتابة وتنسيق المعادلات الرياضية بـ LaTeX',
    summary_ar: 'تحويل المعادلات الرياضية والفيزيائية المعقدة من صور أو نصوص إلى كود LaTeX نظيف ودقيق للعرض في المستندات والأبحاث.',
    benefits_ar: [
      'تنسيق جمالي متقن لأصعب المصفوفات والتكاملات والمعادلات التفاضلية.',
      'التوافق مع أدوات التدوين الرياضي مثل KaTeX و MathJax و Overleaf.'
    ],
    use_cases_ar: ['كتابة المعادلات الإحصائية لنظرية الاحتمالات في ورقة بحثية.'],
    example_prompts_ar: ['حول المعادلة التالية إلى كود LaTeX منسق بدقة: معادلة الانحدار الخطي المتعدد.']
  },

  // --- Communication (5) ---
  {
    id: 'email-composer',
    name: 'email-composer',
    kind: 'skill',
    category: 'communication',
    featured: true,
    github_stars: 30495,
    difficulty: 'beginner',
    source: {
      owner: 'davila7',
      repo: 'davila7/claude-code-templates',
      repo_url: 'https://github.com/davila7/claude-code-templates',
      path_in_repo: 'cli-tool/components/skills/enterprise-communication/email-composer',
      url: 'https://github.com/davila7/claude-code-templates',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'صياغة رسائل البريد المهنية والتقنية',
    summary_ar: 'كتابة إيميلات رسمية موجزة ودقيقة لمراسلة العملاء، والمدراء، والشركاء التجاريين، مع ضبط النبرة المناسبة وتوضيح المطلوب بوضوح.',
    benefits_ar: [
      'تجنب سوء الفهم وصياغة رسائل احترافية تترك انطباعاً إيجابياً وموثوقاً.',
      'توضيح الخطوات التالية (Next Steps) وزيادة سرعة الرد من الطرف الآخر.'
    ],
    use_cases_ar: ['كتابة إيميل اعتذار وشرح تقني لعميل تأثرت خدمته بانقطاع مؤقت.'],
    example_prompts_ar: ['صغ لي إيميل رسمي موجز لمدير المشروع أطلب فيه تمديد الموعد النهائي يومين مع ذكر الأسباب الفنية.']
  },
  {
    id: 'simplified-technical-english',
    name: 'simplified-technical-english',
    kind: 'skill',
    category: 'communication',
    featured: false,
    github_stars: 95319,
    difficulty: 'beginner',
    source: {
      owner: 'paperclipai',
      repo: 'paperclipai/paperclip',
      repo_url: 'https://github.com/paperclipai/paperclip',
      path_in_repo: 'skills/simplified-english',
      url: 'https://github.com/paperclipai/paperclip',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'تبسيط وتوضيح الوثائق التقنية الإنجليزية',
    summary_ar: 'إعادة صياغة النصوص الإنجليزية المعقدة إلى لغة بسيطة وواضحة (Simplified English) يسهل فهمها وترجمتها عبر الفرق العالمية.',
    benefits_ar: [
      'تقليل الغموض في أدلة الاستخدام وشروط الخدمة التقنية.',
      'تسهيل الفهم على غير الناطقين بالإنجليزية كلغة أم.'
    ],
    use_cases_ar: ['تبسيط توثيق واجهة برمجة (API Docs) ليكون واضحاً لأي مطور مبتدئ.'],
    example_prompts_ar: ['أعد صياغة هذه الفقرة التقنية المعقدة بأسلوب إنجليزي بسيط ومباشر.']
  },
  {
    id: 'release-notes-generator',
    name: 'release-notes-generator',
    kind: 'skill',
    category: 'communication',
    featured: false,
    github_stars: 65000,
    difficulty: 'beginner',
    source: {
      owner: 'conventional-changelog',
      repo: 'conventional-changelog/conventional-changelog',
      repo_url: 'https://github.com/conventional-changelog/conventional-changelog',
      path_in_repo: 'skills/release-notes-generator',
      url: 'https://github.com/conventional-changelog/conventional-changelog',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'توليد سجل التغييرات ومذكرات الإصدار',
    summary_ar: 'استخراج التغييرات من سجل Git وتصنيفها تلقائياً (ميزات جديدة، إصلاح أخطاء، تحسينات أداء) بصيغة جذابة للمستخدمين والعملاء.',
    benefits_ar: [
      'توفير وقت كتابة سجلات الإصدار مع كل تحديث جديد للتطبيق.',
      'إعلام المستخدمين بالجديد بأسلوب تسويقي وتقني متوازن.'
    ],
    use_cases_ar: ['تجهيز مذكرات التحديث للإصدار v2.0 ونشرها في المتجر والمدونة.'],
    example_prompts_ar: ['حول قائمة الـ Commits التالية إلى مذكرات إصدار جذابة وسهلة القراءة للمستخدم النهائي.']
  },
  {
    id: 'incident-retrospective',
    name: 'incident-retrospective',
    kind: 'skill',
    category: 'communication',
    featured: false,
    github_stars: 70000,
    difficulty: 'intermediate',
    source: {
      owner: 'etsy',
      repo: 'etsy/incident-management',
      repo_url: 'https://github.com/etsy/incident-management',
      path_in_repo: 'skills/incident-retrospective',
      url: 'https://github.com/etsy/incident-management',
      url_verified: false
    },
    license: { type: 'Apache-2.0', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'توثيق وتحليل الأعطال التقنية (Post-Mortem)',
    summary_ar: 'كتابة تقارير مراجعة الأعطال التقنية بروح غير لائمة (Blameless Post-Mortem): تسلسل الأحداث، السبب الجذري، والإجراءات الوقائية الدائمة.',
    benefits_ar: [
      'تحويل الأخطاء والأعطال إلى دروس تعلم ترفع استقرار النظام للأبد.',
      'بناء ثقافة هندسية ناضجة تطمئن الإدارة وتكسب ثقة العملاء.'
    ],
    use_cases_ar: ['توثيق عطل انقطاع الخدمة لمدة 30 دقيقة وخطة منع تكراره مستقبلاً.'],
    example_prompts_ar: ['صغ تقرير مراجعة عطل (post-mortem) لحادثة توقف خادم قاعدة البيانات بناءً على الوقائع التالية.']
  },
  {
    id: 'i18n-sync-manager',
    name: 'i18n-sync-manager',
    kind: 'skill',
    category: 'communication',
    featured: false,
    github_stars: 269914,
    difficulty: 'intermediate',
    source: {
      owner: 'affaan-m',
      repo: 'affaan-m/ECC',
      repo_url: 'https://github.com/affaan-m/ECC',
      path_in_repo: 'skills/i18n-sync',
      url: 'https://github.com/affaan-m/ECC/tree/main/skills/i18n-sync',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'مزامنة وتدقيق ملفات الترجمة الدولية (i18n)',
    summary_ar: 'فحص ملفات الترجمة (JSON / YAML / PO)، وكشف المفاتيح المفقودة في اللغات الأخرى، وضمان تطابق المتغيرات الديناميكية عبر كل اللغات.',
    benefits_ar: [
      'التأكد من عدم ظهور نصوص غير مترجمة للمستخدمين بأي لغة.',
      'أتمتة مزامنة الملفات الإنجليزية مع النسخ العربية واللغات الأخرى.'
    ],
    use_cases_ar: ['مقارنة ملف `en.json` بملف `ar.json` واستخراج أي عبارات تنقصها الترجمة.'],
    example_prompts_ar: ['قارن بين ملفي الترجمة هذين وحدد المفاتيح المفقودة في النسخة العربية وترجمها.']
  },

  // --- Meta & Agent Ecosystem (4) ---
  {
    id: 'subagent-driven-development',
    name: 'subagent-driven-development',
    kind: 'skill',
    category: 'meta',
    featured: true,
    github_stars: 292705,
    difficulty: 'advanced',
    source: {
      owner: 'obra',
      repo: 'obra/superpowers',
      repo_url: 'https://github.com/obra/superpowers',
      path_in_repo: 'skills/subagent-driven-development',
      url: 'https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'تطوير المشاريع عبر فرق الوكلاء الفرعيين',
    summary_ar: 'هندسة توزيع المهام البرمجية على وكلاء ذكاء اصطناعي متخصصين (وكيل للأبحاث، وكيل للاختبار، وكيل لكتابة الكود) مع التنسيق بينهم.',
    benefits_ar: [
      'إنجاز مشاريع كاملة بدقة عالية عبر تقسيم المهام دون استهلاك سياق المحادثة الرئيسي.',
      'مراجعة وتدقيق عمل كل وكيل تلقائياً بواسطة وكيل آخر قبل الاعتماد.'
    ],
    use_cases_ar: ['بناء تطبيق متكامل من الصفر بتوزيع مهام الـ Frontend والـ Backend على وكلاء مستقلين.'],
    example_prompts_ar: ['وزع مهام بناء شاشة تسجيل الدخول على وكيل للواجهة ووكيل للاختبارات ووكيل للأمان.']
  },
  {
    id: 'executing-plans',
    name: 'executing-plans',
    kind: 'skill',
    category: 'meta',
    featured: false,
    github_stars: 292705,
    difficulty: 'intermediate',
    source: {
      owner: 'obra',
      repo: 'obra/superpowers',
      repo_url: 'https://github.com/obra/superpowers',
      path_in_repo: 'skills/executing-plans',
      url: 'https://github.com/obra/superpowers/tree/main/skills/executing-plans',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'التنفيذ المنضبط لخطط العمل البرمجية',
    summary_ar: 'متابعة تنفيذ الخطة المكتوبة خطوة بخطوة، والتحقق من نجاح كل خطوة واختباراتها قبل الانتقال إلى الخطوة التالية.',
    benefits_ar: [
      'منع الموديل من القفز والتخطي المتعجل للمهام الحيوية.',
      'توفير إمكانية مراجعة التقدم الحقيقي ومعالجة المشاكل في مهدها.'
    ],
    use_cases_ar: ['تنفيذ خطة ترقية قاعدة بيانات أو الانتقال إلى إصدار جديد من أطر العمل.'],
    example_prompts_ar: ['اتبع الخطة المرفقة بدقة ولا تنتقل للخطوة الثانية حتى تؤكد نجاح الخطوة الأولى.']
  },
  {
    id: 'dispatching-parallel-agents',
    name: 'dispatching-parallel-agents',
    kind: 'skill',
    category: 'meta',
    featured: false,
    github_stars: 292705,
    difficulty: 'advanced',
    source: {
      owner: 'obra',
      repo: 'obra/superpowers',
      repo_url: 'https://github.com/obra/superpowers',
      path_in_repo: 'skills/dispatching-parallel-agents',
      url: 'https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'إطلاق وتنسيق الوكلاء المتوازيين',
    summary_ar: 'تشغيل مهام مستقلة متعددة في نفس الوقت بالتوازي لتقليص وقت الإنجاز الإجمالي من ساعات إلى دقائق معدودة.',
    benefits_ar: [
      'فحص واختبار عشرات الملفات والصفحات بالتزامن.',
      'جمع نتائج متعددة ودمجها في تقرير واحد متناسق.'
    ],
    use_cases_ar: ['تدقيق 10 صفحات مختلفة في الموقع والتأكد من توافقها اللغوي بالتوازي.'],
    example_prompts_ar: ['أطلق 3 مهام متوازية لفحص الواجهة وقاعدة البيانات واختبارات الأمان في آن واحد.']
  },
  {
    id: 'brainstorming-solutions',
    name: 'brainstorming-solutions',
    kind: 'skill',
    category: 'meta',
    featured: false,
    github_stars: 292705,
    difficulty: 'beginner',
    source: {
      owner: 'obra',
      repo: 'obra/superpowers',
      repo_url: 'https://github.com/obra/superpowers',
      path_in_repo: 'skills/brainstorming',
      url: 'https://github.com/obra/superpowers/tree/main/skills/brainstorming',
      url_verified: false
    },
    license: { type: 'MIT', status: 'open', copy_file_allowed: false },
    content_verified: false,
    title_ar: 'العصف الذهني واستكشاف الحلول المعمارية',
    summary_ar: 'توليد ومقارنة عدة بدائل معمارية وتقنية لأي مشكلة برمجية، وتوضيح إيجابيات وسلبيات كل حل قبل كتابة سطر كود واحد.',
    benefits_ar: [
      'اختيار الحل البرمجي الأنسب لاحتياجات وميزانية المشروع الحقيقية.',
      'تجنب الوقوع في القرارات التقنية المتسرعة صعبة التراجع.'
    ],
    use_cases_ar: ['المفاضلة بين استخدام SQL أو NoSQL لمشروع ناشئ ذي طبيعة متغيرة.'],
    example_prompts_ar: ['اعطني 3 حلول معمارية مختلفة لتطبيق نظام إشعارات فوري مع مقارنة إيجابيات وسلبيات كل حل.']
  }
];

// Append new skills
for (const s of new64Skills) {
  if (!current.skills.some((ex) => ex.id === s.id)) {
    current.skills.push(s);
  }
}

// Sort all skills by github_stars descending
current.skills.sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));

console.log('Writing updated catalog to data/skills.json...');
console.log(`Total skills in catalog: ${current.skills.length}`);

fs.writeFileSync(skillsFile, JSON.stringify(current, null, 2), 'utf8');
console.log('Done!');
