import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const skillsFile = path.join(ROOT_DIR, 'data/skills.json');
const data = JSON.parse(fs.readFileSync(skillsFile, 'utf8'));

// 1. Consolidated 10 Categories
const updatedCategories = [
  { id: 'documents', name_ar: 'المستندات والملفات' },
  { id: 'design', name_ar: 'التصميم والإبداع' },
  { id: 'development', name_ar: 'البرمجة والويب' },
  { id: 'code-quality', name_ar: 'جودة الكود والاختبار' },
  { id: 'cloud-security', name_ar: 'السحابة والأمان' },
  { id: 'data-ai', name_ar: 'البيانات والذكاء الاصطناعي' },
  { id: 'science-education', name_ar: 'العلوم والتعليم' },
  { id: 'business-finance', name_ar: 'الأعمال والمال' },
  { id: 'communication', name_ar: 'الكتابة والتواصل' },
  { id: 'meta', name_ar: 'بناء المهارات واكتشافها' }
];

data.categories = updatedCategories;

// 2. Map existing skills to the 10 consolidated categories
const categoryMapping = {
  'webapp-testing': 'code-quality',
  'superpowers': 'code-quality',
  'vercel-agent-skills': 'cloud-security'
};

for (const skill of data.skills) {
  if (categoryMapping[skill.id]) {
    skill.category = categoryMapping[skill.id];
  } else if (skill.category === 'workflow') {
    skill.category = 'code-quality';
  }
}

// 3. Define the 10 high-value curated skills from skillsdirectory & Agent Skills standard
const newSkills = [
  {
    id: 'git-workflow',
    name: 'git-workflow',
    kind: 'skill',
    category: 'code-quality',
    featured: true,
    difficulty: 'intermediate',
    source: {
      owner: 'obra',
      repo: 'obra/superpowers',
      repo_url: 'https://github.com/obra/superpowers',
      path_in_repo: 'skills/git-workflow',
      url: 'https://github.com/obra/superpowers/tree/main/skills/git-workflow',
      url_verified: false
    },
    license: {
      type: 'MIT',
      status: 'open',
      copy_file_allowed: false
    },
    content_verified: false,
    title_ar: 'إدارة فروع Git ورسائل Commit الاحترافية',
    summary_ar: 'تحليل التغييرات البرمجية بدقة وصياغة رسائل الالتزام وفق معيار Conventional Commits وحل تعارضات الفروع (Merge Conflicts).',
    benefits_ar: [
      'صياغة رسائل Commit منظمة ومفهومة تشرح ماذا ولماذا تغير الكود.',
      'إدارة الفروع وإنشاء طلبات السحب (Pull Requests) مع ملخص التغييرات تلقائيًا.',
      'حل تعارضات الدمج المعقدة بين الفروع بأمان دون فقدان الأكواد.'
    ],
    use_cases_ar: [
      'تجهيز Commit نظيف قبل دمج الكود في الفرع الرئيسي.',
      'إنشاء ملخص احترافي لطلب سحب (Pull Request) يوضح أثر التعديلات.'
    ],
    example_prompts_ar: [
      'راجع التغييرات في الكود واقترح رسالة commit تتبع معيار conventional commits.',
      'ساعدني في حل التعارض الناتج عن دمج الفرع feature-auth مع main.'
    ]
  },
  {
    id: 'sql-optimizer',
    name: 'sql-optimizer',
    kind: 'skill',
    category: 'data-ai',
    featured: true,
    difficulty: 'intermediate',
    source: {
      owner: 'agenticskills',
      repo: 'agenticskills/database-skills',
      repo_url: 'https://github.com/agenticskills/database-skills',
      path_in_repo: 'skills/sql-optimizer',
      url: 'https://github.com/agenticskills/database-skills/tree/main/skills/sql-optimizer',
      url_verified: false
    },
    license: {
      type: 'MIT',
      status: 'open',
      copy_file_allowed: false
    },
    content_verified: false,
    title_ar: 'تحسين استعلامات SQL وتسريع قواعد البيانات',
    summary_ar: 'تحليل خطط تنفيذ الاستعلامات (EXPLAIN ANALYZE)، وتحديد الفهارس المفقودة، وإعادة هيكلة استعلامات SQL البطيئة للعمل بأقصى سرعة.',
    benefits_ar: [
      'تسريع استعلامات قواعد البيانات المعقدة وتخفيف الحمل على الخادم.',
      'اقتراح الفهارس (Indexes) المناسبة لتقليل الفحص الكامل للجداول.',
      'كتابة استعلامات آمنة تتجنب ثغرات حقن SQL (SQL Injection).'
    ],
    use_cases_ar: [
      'تسريع استعلام بطيء يستغرق عدة ثوانٍ في قاعدة بيانات PostgreSQL أو MySQL.',
      'مراجعة تصميم الجداول والعلاقات قبل إطلاق النظام في الإنتاج.'
    ],
    example_prompts_ar: [
      'افحص استعلام الـ SQL ده واشرح ليه بطيء واقترح فهارس تسرعه.',
      'أعد كتابة الاستعلام التالي باستخدام CTE بدلاً من الـ subqueries المتداخلة.'
    ]
  },
  {
    id: 'openapi-designer',
    name: 'openapi-designer',
    kind: 'skill',
    category: 'development',
    featured: false,
    difficulty: 'intermediate',
    source: {
      owner: 'agenticskills',
      repo: 'agenticskills/api-skills',
      repo_url: 'https://github.com/agenticskills/api-skills',
      path_in_repo: 'skills/openapi-designer',
      url: 'https://github.com/agenticskills/api-skills/tree/main/skills/openapi-designer',
      url_verified: false
    },
    license: {
      type: 'Apache-2.0',
      status: 'open',
      copy_file_allowed: false
    },
    content_verified: false,
    title_ar: 'تصميم وتوثيق واجهات البرمجة (OpenAPI 3.1)',
    summary_ar: 'بناء مواصفات RESTful APIs وفق معيار OpenAPI v3.1 مع توليد نماذج البيانات وأنواع TypeScript والبيانات الوهمية للاختبار.',
    benefits_ar: [
      'توثيق رسمي موحد للواجهات البرمجية يفهمه المطورون والأدوات الآلية.',
      'توليد مخططات التحقق (Schemas) وأنواع البيانات تلقائيًا للـ Frontend والـ Backend.',
      'بناء استجابات نموذجية (Mock Responses) لتسريع التطوير قبل اكتمال السيرفر.'
    ],
    use_cases_ar: [
      'تصميم مسارات ومخططات API جديدة لمنصة تجارة إلكترونية.',
      'تحديث ملف Swagger قديم ليتوافق مع معايير OpenAPI 3.1 الحديثة.'
    ],
    example_prompts_ar: [
      'صمم مواصفة OpenAPI لمسارات إدارة المستخدمين وتوثيق الـ JWT.',
      'حول مخطط JSON التالي إلى نموذج OpenAPI مع أمثلة للاستجابة.'
    ]
  },
  {
    id: 'docker-cloud-ops',
    name: 'docker-cloud-ops',
    kind: 'skill',
    category: 'cloud-security',
    featured: false,
    difficulty: 'intermediate',
    source: {
      owner: 'agenticskills',
      repo: 'agenticskills/devops-skills',
      repo_url: 'https://github.com/agenticskills/devops-skills',
      path_in_repo: 'skills/docker-cloud-ops',
      url: 'https://github.com/agenticskills/devops-skills/tree/main/skills/docker-cloud-ops',
      url_verified: false
    },
    license: {
      type: 'MIT',
      status: 'open',
      copy_file_allowed: false
    },
    content_verified: false,
    title_ar: 'بناء حاويات Docker المحمية وحزم السحابة',
    summary_ar: 'كتابة ملفات Dockerfile متعددة المراحل (Multi-stage) لتقليل حجم الصور، وتأمين الحاويات عبر تقليل الصلاحيات ومنع تشغيلها كـ root.',
    benefits_ar: [
      'تقليص حجم صور Docker لأقل من 100 ميجابايت لتسريع النشر والتوزيع.',
      'حماية الحاويات عبر إعداد مستخدمين غير جذريين (Non-root users).',
      'تجهيز ملفات docker-compose لبيئات التطوير والاختبار بأمر واحد.'
    ],
    use_cases_ar: [
      'تحزيم تطبيق Node.js أو Python في صورة Docker جاهزة للإنتاج.',
      'إعداد بيئة عمل محلية متكاملة تتضمن التطبيق وقاعدة البيانات والـ Cache.'
    ],
    example_prompts_ar: [
      'اكتب Dockerfile متعدد المراحل لتطبيق Next.js مع التركيز على الأمان والحجم الصغير.',
      'راجع ملف docker-compose التالي واقترح تحسينات لربط الخدمات والتخزين الدائم.'
    ]
  },
  {
    id: 'cyber-security-audit',
    name: 'cyber-security-audit',
    kind: 'skill',
    category: 'cloud-security',
    featured: true,
    difficulty: 'advanced',
    source: {
      owner: 'agenticskills',
      repo: 'agenticskills/security-skills',
      repo_url: 'https://github.com/agenticskills/security-skills',
      path_in_repo: 'skills/cyber-security-audit',
      url: 'https://github.com/agenticskills/security-skills/tree/main/skills/cyber-security-audit',
      url_verified: false
    },
    license: {
      type: 'Apache-2.0',
      status: 'open',
      copy_file_allowed: false
    },
    content_verified: false,
    title_ar: 'فحص الثغرات الأمنية ومراجعة كود OWASP',
    summary_ar: 'مراجعة أمنية متعمقة للكود لاكتشاف ثغرات OWASP Top 10 مثل حقن البيانات، ضعف التوثيق، تسريب الأسرار، وتأمين رؤوس الـ HTTP.',
    benefits_ar: [
      'اكتشاف الثغرات الأمنية الشائعة قبل وصول الكود إلى بيئة الإنتاج.',
      'فحص المستودعات للتأكد من عدم وجود مفاتيح API أو كلمات مرور مسربة.',
      'تقديم حلول كود واضحة وعملية لسد كل ثغرة يتم اكتشافها.'
    ],
    use_cases_ar: [
      'مراجعة أمنية لنظام تسجيل الدخول واستعادة كلمات المرور.',
      'فحص حزم ومكتبات المشروع بحثاً عن ثغرات CVE المعروفة.'
    ],
    example_prompts_ar: [
      'افحص ملف المصادقة ده بحثاً عن أي ثغرات متعلقة بـ JWT أو CSRF.',
      'راجع دالة معالجة المدخلات دي وتأكد إنها محمية من ثغرات XSS.'
    ]
  },
  {
    id: 'data-analysis-pandas',
    name: 'data-analysis-pandas',
    kind: 'skill',
    category: 'data-ai',
    featured: false,
    difficulty: 'beginner',
    source: {
      owner: 'agenticskills',
      repo: 'agenticskills/data-skills',
      repo_url: 'https://github.com/agenticskills/data-skills',
      path_in_repo: 'skills/data-analysis-pandas',
      url: 'https://github.com/agenticskills/data-skills/tree/main/skills/data-analysis-pandas',
      url_verified: false
    },
    license: {
      type: 'MIT',
      status: 'open',
      copy_file_allowed: false
    },
    content_verified: false,
    title_ar: 'تحليل البيانات الاستكشافي باستخدام بايثون',
    summary_ar: 'تنظيف البيانات ومعالجة القيم المفقودة، وحساب المؤشرات الإحصائية ورسم المخططات البيانية التفاعلية باستخدام Pandas و Seaborn.',
    benefits_ar: [
      'تحويل البيانات الخام من ملفات CSV و Excel إلى رؤى وأرقام واضحة.',
      'معالجة وتصحيح التناقضات والقيم المفقودة في مجموعات البيانات الضخمة.',
      'إنشاء رسومات بيانية توضح التوزيعات والاتجاهات الزمنية.'
    ],
    use_cases_ar: [
      'تحليل بيانات مبيعات شهرية واستخراج المنتجات الأكثر ربحية.',
      'مقارنة أداء الحملات التسويقية وحساب معدلات التحويل.'
    ],
    example_prompts_ar: [
      'حلل جدول المبيعات التالي واحسب المتوسط والوسيط لكل فئة منتجات.',
      'اكتب كود بايثون لتنظيف التواريخ وإزالة السجلات المكررة من الملف.'
    ]
  },
  {
    id: 'playwright-e2e-testing',
    name: 'playwright-e2e-testing',
    kind: 'skill',
    category: 'code-quality',
    featured: false,
    difficulty: 'intermediate',
    source: {
      owner: 'agenticskills',
      repo: 'agenticskills/testing-skills',
      repo_url: 'https://github.com/agenticskills/testing-skills',
      path_in_repo: 'skills/playwright-e2e-testing',
      url: 'https://github.com/agenticskills/testing-skills/tree/main/skills/playwright-e2e-testing',
      url_verified: false
    },
    license: {
      type: 'Apache-2.0',
      status: 'open',
      copy_file_allowed: false
    },
    content_verified: false,
    title_ar: 'أتمتة اختبارات المتصفح الشاملة (Playwright)',
    summary_ar: 'كتابة اختبارات End-to-End موثوقة للمتصفحات تحاكي تجربة المستخدم الحقيقية، واختبار الواجهات على الشاشات المختلفة ومحاكاة الشبكة.',
    benefits_ar: [
      'اختبار مسارات المستخدم الحيوية (التسجيل، الشراء، التصفح) بشكل آلي.',
      'التقاط صور وتسجيل فيديو للشاشات عند حدوث أي خطأ لتسهيل الإصلاح.',
      'دعم متصفحات متعددة (Chromium, Firefox, WebKit) في بيئة اختبار واحدة.'
    ],
    use_cases_ar: [
      'أتمتة فحص عملية الشراء والدفع ببطاقة اختبار قبل النشر.',
      'فحص التوافقية والتجاوب مع شاشات الهواتف المحمولة والحواسب.'
    ],
    example_prompts_ar: [
      'اكتب اختبار Playwright لفحص نموذج تسجيل الدخول والتأكد من ظهور رسالة الخطأ عند إدخال كلمة سر خاطئة.',
      'صمم كلاس Page Object Model لصفحة إتمام الطلب.'
    ]
  },
  {
    id: 'agile-product-manager',
    name: 'agile-product-manager',
    kind: 'skill',
    category: 'business-finance',
    featured: false,
    difficulty: 'beginner',
    source: {
      owner: 'agenticskills',
      repo: 'agenticskills/product-skills',
      repo_url: 'https://github.com/agenticskills/product-skills',
      path_in_repo: 'skills/agile-product-manager',
      url: 'https://github.com/agenticskills/product-skills/tree/main/skills/agile-product-manager',
      url_verified: false
    },
    license: {
      type: 'MIT',
      status: 'open',
      copy_file_allowed: false
    },
    content_verified: false,
    title_ar: 'تخطيط ميزات المنتجات وصياغة قصص المستخدم (Agile)',
    summary_ar: 'تحويل الأفكار ومتطلبات العملاء إلى قصص مستخدم واضحة (User Stories) مع معايير قبول دقيقة (Acceptance Criteria) وتحديد أولويات التطوير.',
    benefits_ar: [
      'صياغة متطلبات برمجية دقيقة تقلل سوء الفهم بين الإدارة وفريق التطوير.',
      'تحديد معايير قبول واضحة وقابلة للاختبار لكل ميزة جديدة.',
      'ترتيب أولويات المهام بالاعتماد على أطر عمل مثل MoSCoW و RICE.'
    ],
    use_cases_ar: [
      'كتابة وثيقة متطلبات منتج (PRD) لميزة إشعارات فورية.',
      'تفكيك ميزة كبيرة ومعقدة إلى مهام صغيرة قابلة للتنفيذ في سبرنت أسبوعين.'
    ],
    example_prompts_ar: [
      'حول فكرة إضافة نظام خصومات كوبونات إلى قصص مستخدم مع معايير القبول بصيغة Given/When/Then.',
      'ساعدني في ترتيب أولويات هذه الميزات الخمس باستخدام معيار RICE.'
    ]
  },
  {
    id: 'financial-modeling-pro',
    name: 'financial-modeling-pro',
    kind: 'skill',
    category: 'business-finance',
    featured: false,
    difficulty: 'intermediate',
    source: {
      owner: 'agenticskills',
      repo: 'agenticskills/finance-skills',
      repo_url: 'https://github.com/agenticskills/finance-skills',
      path_in_repo: 'skills/financial-modeling-pro',
      url: 'https://github.com/agenticskills/finance-skills/tree/main/skills/financial-modeling-pro',
      url_verified: false
    },
    license: {
      type: 'MIT',
      status: 'open',
      copy_file_allowed: false
    },
    content_verified: false,
    title_ar: 'النمذجة المالية واقتصاديات المشاريع الرقمية',
    summary_ar: 'بناء نماذج مالية لمشاريع الـ SaaS والشركات الناشئة، وحساب تكلفة الاستحواذ (CAC) والقيمة الدائمة للعميل (LTV) وتوقعات التدفقات النقدية.',
    benefits_ar: [
      'توقع مسار السيولة النقدية وفترة الأمان المالي (Runway) للمشروع بدقة.',
      'حساب المؤشرات التشغيلية الحيوية للشركات الرقمية مثل معدل الإلغاء والـ MRR.',
      'تجهيز تقارير مالية واضحة لعرضها على المستثمرين وأصحاب المصلحة.'
    ],
    use_cases_ar: [
      'حساب نقطة التعادل (Break-even point) لتطبيق باشتراكات شهرية.',
      'بناء سيناريوهات نمو مختلفة (متفائل، واقعي، متشائم) لمدة 12 شهراً.'
    ],
    example_prompts_ar: [
      'ابنِ نموذج تدفق نقدي لتطبيق SaaS برسم اشتراك 29 دولار شهرياً ومعدل إلغاء 5%.',
      'احسب لي نسبة LTV/CAC بناءً على بيانات الإنفاق التسويقي التالية.'
    ]
  },
  {
    id: 'academic-research-assistant',
    name: 'academic-research-assistant',
    kind: 'skill',
    category: 'science-education',
    featured: false,
    difficulty: 'intermediate',
    source: {
      owner: 'agenticskills',
      repo: 'agenticskills/academic-skills',
      repo_url: 'https://github.com/agenticskills/academic-skills',
      path_in_repo: 'skills/academic-research-assistant',
      url: 'https://github.com/agenticskills/academic-skills/tree/main/skills/academic-research-assistant',
      url_verified: false
    },
    license: {
      type: 'MIT',
      status: 'open',
      copy_file_allowed: false
    },
    content_verified: false,
    title_ar: 'مساعد البحث العلمي ومراجعة الأدبيات',
    summary_ar: 'هيكلة مراجعة الدراسات السابقة، وتلخيص الأوراق العلمية ونقد المنهجيات الإحصائية، وإدارة المراجع وفق أنساق APA و IEEE و BibTeX.',
    benefits_ar: [
      'تلخيص النقاط الجوهرية والمنهجية للأوراق البحثية المطولة بسرعة.',
      'تنسيق المراجع والاقتباسات بدقة وفق الأنماط الأكاديمية العالمية.',
      'المساعدة في صياغة الفرضيات وتحديد الثغرات البحثية (Research Gaps).'
    ],
    use_cases_ar: [
      'كتابة فصل الدراسات السابقة لبحث ماجستير أو دكتوراه.',
      'تنظيم ملف مراجع BibTeX لمقال علمي معد للنشر في مؤتمر عالمي.'
    ],
    example_prompts_ar: [
      'لخص لي المنهجية والنتائج الرئيسية للورقة البحثية المرفقة بأسلوب أكاديمي محايد.',
      'حول المراجع التالية إلى صيغة BibTeX موحدة مرتبة أبجدياً.'
    ]
  }
];

// Append new skills avoiding duplicates
const existingIds = new Set(data.skills.map((s) => s.id));
for (const ns of newSkills) {
  if (!existingIds.has(ns.id)) {
    data.skills.push(ns);
  }
}

fs.writeFileSync(skillsFile, JSON.stringify(data, null, 2), 'utf8');
console.log(`Updated catalog written successfully. Total categories: ${data.categories.length}, Total skills: ${data.skills.length}`);
