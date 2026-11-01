import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const new23Skills = [
  {
    id: "finishing-development-branch",
    name: "finishing-a-development-branch",
    title_ar: "إنهاء فرع التطوير والدمج الآمن",
    summary_ar: "منهجية منضبطة لإنهاء مهام التطوير: التحقق من نجاح كافة الاختبارات، فحص بيئة العمل، واختيار أفضل طريقة للدمج (Merge/PR) بأمان.",
    category: "code-quality",
    difficulty: "intermediate",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: true,
    github_stars: 310339,
    benefits_ar: [
      "ضمان عدم دمج أي فرع قبل التحقق الفعلي من نجاح الاختبارات.",
      "تنظيف فروع العمل المؤقتة والحفاظ على سجل Git مرتب وواضح."
    ],
    use_cases_ar: [
      "عند اكتمال تنفيذ ميزة برمجية واجتياز الفحوصات والتحضير لإنشاء PR أو الدمج مع main."
    ],
    example_prompts_ar: [
      "خلصت تنفيذ الميزة وكل الاختبارات نجحت، شغل مهارة finishing-a-development-branch عشان ندمج بأمان."
    ],
    source: {
      owner: "obra",
      repo: "obra/superpowers",
      repo_url: "https://github.com/obra/superpowers",
      path_in_repo: "skills/finishing-a-development-branch",
      url_verified: true,
      url: "https://github.com/obra/superpowers/tree/main/skills/finishing-a-development-branch"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "using-superpowers",
    name: "using-superpowers",
    title_ar: "الاستدعاء التلقائي لمهارات الوكلاء",
    summary_ar: "إطار العمل التأسيسي للبدء في أي جلسة برمجية: يلزم الوكيل بالبحث في دليل المهارات واستدعاء المهارة المناسبة قبل كتابة الكود.",
    category: "meta",
    difficulty: "beginner",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: true,
    github_stars: 310339,
    benefits_ar: [
      "منع الوكيل من الارتجال العشوائي وإلزامه ببروتوكولات التطوير المحددة.",
      "اكتشاف وتفعيل المهارات المتخصصة بناءً على سياق المحادثة والطلب."
    ],
    use_cases_ar: [
      "في بداية كل جلسة برمجية لتوجيه الوكيل نحو اتباع المهارات المتاحة في المشروع."
    ],
    example_prompts_ar: [
      "قبل ما تبدأ الشغل، شغل مهارة using-superpowers واستكشف المهارات المتاحة لاحتياجي."
    ],
    source: {
      owner: "obra",
      repo: "obra/superpowers",
      repo_url: "https://github.com/obra/superpowers",
      path_in_repo: "skills/using-superpowers",
      url_verified: true,
      url: "https://github.com/obra/superpowers/tree/main/skills/using-superpowers"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "diagnosing-superpowers",
    name: "diagnosing-superpowers",
    title_ar: "تشخيص ومعالجة انحراف الجلسات",
    summary_ar: "تحليل أسباب فشل الجلسات البرمجية أو تكرار العمل أو تجاهل المهارات، مع تقديم تشخيص منهجي وحلول لإعادة ضبط المسار.",
    category: "code-quality",
    difficulty: "intermediate",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: false,
    github_stars: 310339,
    benefits_ar: [
      "اكتشاف الأخطاء الناتجة عن تجاهل المهارات أو تلوث سياق الوكيل (Context).",
      "إعادة ضبط الجلسة وإصلاح الخطوات المكسورة دون الحاجة للبدء من الصفر."
    ],
    use_cases_ar: [
      "عندما يكرر الوكيل نفس الخطوات أو يتجاهل التعليمات أو يدخل في حلقة مفرغة من الأخطاء."
    ],
    example_prompts_ar: [
      "الوكيل مكرر نفس الخطأ بقاله مرتين ومش متبع الخطة، شغل مهارة diagnosing-superpowers وشوف السبب."
    ],
    source: {
      owner: "obra",
      repo: "obra/superpowers",
      repo_url: "https://github.com/obra/superpowers",
      path_in_repo: "skills/diagnosing-superpowers",
      url_verified: true,
      url: "https://github.com/obra/superpowers/tree/main/skills/diagnosing-superpowers"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "writing-skills",
    name: "writing-skills",
    title_ar: "تأليف واختبار مهارات الوكلاء الجديدة",
    summary_ar: "دليل معياري لكتابة ملفات SKILL.md وتطوير مهارات جديدة واختبارها عبر وكلاء فرعيين قبل اعتمادها في بيئة الإنتاج.",
    category: "meta",
    difficulty: "advanced",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: false,
    github_stars: 310339,
    benefits_ar: [
      "بناء مهارات جديدة تلتزم بمواصفات Agent Skills العالمية والـ YAML frontmatter الصحيح.",
      "اختبار المهارات بأسلوب TDD والتأكد من وضوح الشروط وقابلية تنفيذها آلياً."
    ],
    use_cases_ar: [
      "عند رغبة الفريق في تحويل بروتوكول داخلي أو أداة خاصة إلى مهارة قابلة للاستدعاء بواسطة الذكاء الاصطناعي."
    ],
    example_prompts_ar: [
      "عايز أعمل مهارة جديدة لتوثيق الـ APIs في شركتنا، شغل مهارة writing-skills وامشي معايا خطوة بخطوة."
    ],
    source: {
      owner: "obra",
      repo: "obra/superpowers",
      repo_url: "https://github.com/obra/superpowers",
      path_in_repo: "skills/writing-skills",
      url_verified: true,
      url: "https://github.com/obra/superpowers/tree/main/skills/writing-skills"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "interview-me",
    name: "interview-me",
    title_ar: "استخلاص المتطلبات بالحوار المتدرج",
    summary_ar: "طرح أسئلة ذكية متتالية (سؤال تلو الآخر) لاستخلاص احتياجات المستخدم الحقيقية بدقة 95% قبل البدء في كتابة سطر كود واحد.",
    category: "communication",
    difficulty: "beginner",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: true,
    github_stars: 112500,
    benefits_ar: [
      "تجنب بناء ميزات غير مطلوبة عبر سد فجوات المتطلبات والافتراضات المسبقة.",
      "طرح سؤال واحد محدد في كل مرة لمنع تشتت المستخدم والحصول على إجابات حاسمة."
    ],
    use_cases_ar: [
      "عندما يقدم المستخدم طلباً عاماً أو غير مكتمل التفاصيل (مثل: 'ابنِ لي لوحة تحكم')."
    ],
    example_prompts_ar: [
      "عايز أعمل تطبيق لإدارة المهام، شغل مهارة interview-me واسألني أسئلة بالترتيب عشان نوضح الفكرة."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/interview-me",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/interview-me"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "idea-refine",
    name: "idea-refine",
    title_ar: "بلورة وتطوير الأفكار التقنية",
    summary_ar: "تحويل الأفكار الأولية المجردة إلى مقترحات ومفاهيم هندسية قابلة للتطبيق عبر استراتيجيات التفكير التباعدي والتقاربي المنظم.",
    category: "communication",
    difficulty: "beginner",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: false,
    github_stars: 112500,
    benefits_ar: [
      "استكشاف زوايا تصميمية وبدائل متعددة قبل الاستقرار على الحل النهائي.",
      "صياغة ملخص هندسي محكم يحدد القيمة والجمهور المستهدف والتحديات التقنية."
    ],
    use_cases_ar: [
      "في جلسات العصف الذهني الأولى وتطوير أفكار المنتجات البرمجية الناشئة."
    ],
    example_prompts_ar: [
      "عندي فكرة لإضافة ذكاء اصطناعي للمتجر بتاعي، شغل مهارة idea-refine ونقح معايا الفكرة."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/idea-refine",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/idea-refine"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "spec-driven-development",
    name: "spec-driven-development",
    title_ar: "التطوير المدفوع بالمواصفات التقنية",
    summary_ar: "كتابة مواصفات فنية دقيقة (Technical Specs) قابلة للفحص قبل البدء في الكود، لضمان وضوح بنية البيانات والواجهات والقيود.",
    category: "code-quality",
    difficulty: "intermediate",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: true,
    github_stars: 112500,
    benefits_ar: [
      "التوافق المسبق على هيكل المعمارية قبل استهلاك الوقت في كتابة كود قد يُعاد بناؤه.",
      "تحديد معايير القبول وحالات الحافة بوضوح لتسهيل كتابة الاختبارات لاحقاً."
    ],
    use_cases_ar: [
      "قبل الشروع في كتابة أي ميزة برمجية معقدة أو مشروع جديد ليس له مواصفة معتمدة."
    ],
    example_prompts_ar: [
      "عايزين نبني نظام دفع إلكتروني جديد، شغل مهارة spec-driven-development واكتب المواصفة الفنية كاملة."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/spec-driven-development",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/spec-driven-development"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "planning-and-task-breakdown",
    name: "planning-and-task-breakdown",
    title_ar: "تفكيك المهام وتخطيط التسليم",
    summary_ar: "تحويل المواصفات المعقدة والمتطلبات الكبيرة إلى مهام صغيرة مرتبة تسلسلياً، كل مهمة مستقلة وقابلة للتحقق الفوري.",
    category: "code-quality",
    difficulty: "beginner",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: false,
    github_stars: 112500,
    benefits_ar: [
      "تسهيل تتبع الإنجاز ووضوح الرؤية للمطورين والوكلاء الذكيين.",
      "تقليل مخاطر الأخطاء المتراكمة عبر التحقق من كل خطوة بشكل منفصل."
    ],
    use_cases_ar: [
      "عند وجود مواصفة فنية جاهزة والحاجة لتقسيمها إلى خطوات تنفيذ عملية ومحددة."
    ],
    example_prompts_ar: [
      "دي المواصفة التقنية للنظام، شغل مهارة planning-and-task-breakdown وقسمها لمهام مرتبة وقابلة للاختبار."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/planning-and-task-breakdown",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/planning-and-task-breakdown"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "incremental-implementation",
    name: "incremental-implementation",
    title_ar: "التنفيذ التدريجي بالشرائح القابلة للتحقق",
    summary_ar: "بناء الميزات البرمجية بشرائح رأسية دقيقة ومختبرة خطوة بخطوة، لضمان بقاء التطبيق صالحاً للعمل طوال فترة التطوير.",
    category: "development",
    difficulty: "intermediate",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: false,
    github_stars: 112500,
    benefits_ar: [
      "الحفاظ على التطبيق في حالة صالحة للبناء (Green Build) في كل مرحلة.",
      "اكتشاف وتدارك الأخطاء مبكراً قبل أن تتشابك مع أجزاء أخرى من الكود."
    ],
    use_cases_ar: [
      "أثناء تنفيذ الميزات وتعديل الأنظمة الحية لتجنب فترات التوقف والتغييرات الضخمة دفعة واحدة."
    ],
    example_prompts_ar: [
      "بدل ما تكتب الكود كله مرة واحدة، استخدم incremental-implementation ونفذ الميزة شريحة بشريحة مع التحقق."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/incremental-implementation",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/incremental-implementation"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "frontend-ui-engineering",
    name: "frontend-ui-engineering",
    title_ar: "هندسة واجهات المستخدم الإنتاجية",
    summary_ar: "بناء واجهات مستخدم احترافية وسريعة متوافقة مع معايير إمكانية الوصول (a11y) والتجاوب مع جميع أحجام الشاشات.",
    category: "design",
    difficulty: "intermediate",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: true,
    github_stars: 112500,
    benefits_ar: [
      "تطبيق أفضل ممارسات الأداء في الواجهات الأمامية والتحكم في Core Web Vitals.",
      "دعم لوحة المفاتيح وقارئات الشاشة وفق معايير WCAG 2.1 AA."
    ],
    use_cases_ar: [
      "بناء مكونات واجهة المستخدم (UI Components)، صفحات الويب التفاعلية، وتحسين تصميمات الموبايل."
    ],
    example_prompts_ar: [
      "ابنِ لي مكون قائمة منسدلة متعددة الخيارات باستخدام frontend-ui-engineering مع دعم كامل للـ a11y."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/frontend-ui-engineering",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/frontend-ui-engineering"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "api-and-interface-design",
    name: "api-and-interface-design",
    title_ar: "تصميم واجهات البرمجة (APIs) والحدود المعمارية",
    summary_ar: "إرشادات وقواعد لتصميم واجهات برمجية مستقرة ومتوافقة مع التطور المستقبلي، سواء REST أو GraphQL أو دوال الموديلات.",
    category: "development",
    difficulty: "intermediate",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: false,
    github_stars: 112500,
    benefits_ar: [
      "فصل الاهتمامات (Separation of Concerns) ووضوح عقود البيانات.",
      "تجنب التغييرات المكسورة (Breaking Changes) وضمان أمان الأنواع (Type-Safety)."
    ],
    use_cases_ar: [
      "عند إنشاء نقاط نهاية API جديدة أو تحديد واجهات الاتصال بين الخدمات الميكروية (Microservices)."
    ],
    example_prompts_ar: [
      "عايزين نصمم REST API لإدارة الاشتراكات الشهرية، طبق قواعد api-and-interface-design في تسمية الـ endpoints وتنسيق الاستجابة."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/api-and-interface-design",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/api-and-interface-design"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "context-engineering",
    name: "context-engineering",
    title_ar: "هندسة سياق الوكلاء وإدارة الذاكرة",
    summary_ar: "استراتيجيات متقدمة لتحسين وإدارة سياق النماذج اللغوية، لمنع تدهور جودة الإجابات واختصار التوكنات بكفاءة عالية.",
    category: "meta",
    difficulty: "advanced",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: true,
    github_stars: 112500,
    benefits_ar: [
      "الحفاظ على تركيز الوكيل وتقليل الهلوسة في المحادثات الطويلة.",
      "تنظيم تحميل الملفات والأدلة بالتدريج (Progressive Disclosure) بدلاً من تكديس السياق."
    ],
    use_cases_ar: [
      "عند تراجع أداء الوكيل، أو بدء جلسة برمجية في مستودع ضخم بملايين الأسطر."
    ],
    example_prompts_ar: [
      "السياق بقى تقيل والوكيل بدأ ينسى التعليمات السابقة، شغل context-engineering ورتب السياق المطلوب بس."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/context-engineering",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/context-engineering"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "browser-testing-devtools",
    name: "browser-testing-with-devtools",
    title_ar: "الاختبار الآلي للمتصفح عبر DevTools",
    summary_ar: "التحكم في المتصفحات الحقيقية واختبار الواجهات والتفاعلات وأداء الشبكة وفحص سجل الأخطاء (Console) باستخدام بروتوكول DevTools.",
    category: "code-quality",
    difficulty: "intermediate",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: false,
    github_stars: 112500,
    benefits_ar: [
      "رؤية وتجربة ما يراه المستخدم الفعلي على الشاشة والتقاط صور لقطات التحقق.",
      "فحص أخطاء الجافاسكريبت واستجابات الشبكة البطيئة داخل بيئة المتصفح."
    ],
    use_cases_ar: [
      "اختبار سيناريوهات تسجيل الدخول، تعبئة النماذج، والتحقق من التوافقية البصرية."
    ],
    example_prompts_ar: [
      "افتح الصفحة دي في المتصفح وجرب تضغط على زرار الإرسال وافحص الـ console logs باستخدام browser-testing-with-devtools."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/browser-testing-with-devtools",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/browser-testing-with-devtools"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "debugging-error-recovery",
    name: "debugging-and-error-recovery",
    title_ar: "التشخيص الجذري للأخطاء والتعافي الذاتي",
    summary_ar: "منهجية 4-Phase لعزل أسباب الأخطاء البرمجية (Root Cause Analysis)، وتطبيق المعالجة الدفاعية لمنع تكرار الانهيار.",
    category: "code-quality",
    difficulty: "intermediate",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: false,
    github_stars: 112500,
    benefits_ar: [
      "عزل المتغيرات وتحديد السبب الحقيقي للعطل بدلاً من التخمين والتعديل العشوائي.",
      "إضافة آليات تعافٍ تدريجي (Graceful Degradation) عند فشل الخدمات الخارجية."
    ],
    use_cases_ar: [
      "عند حدوث انهيار غير متوقع أثناء التشغيل أو فشل اختبارات التكامل."
    ],
    example_prompts_ar: [
      "التطبيق بيطلع Unhandled Rejection في خدمة الدفع، شغل debugging-and-error-recovery واعزل المشكلة الجذرية."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/debugging-and-error-recovery",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/debugging-and-error-recovery"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "doubt-driven-development",
    name: "doubt-driven-development",
    title_ar: "المراجعة المعارضة واختبار الافتراضات",
    summary_ar: "إخضاع القرارات البرمجية غير البديهية لمراجعة نقدية معارضة (Adversarial Review) في سياق مستقل لاكتشاف العيوب الخفية وحالات الحافة.",
    category: "code-quality",
    difficulty: "advanced",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: false,
    github_stars: 112500,
    benefits_ar: [
      "تحدي الافتراضات الساذجة قبل أن تصبح ديوناً تقنية مكلفة.",
      "كشف الثغرات الأمنية ومشكلات التزامن (Race Conditions) قبل الإنتاج."
    ],
    use_cases_ar: [
      "قبل اعتماد أي معمارية جديدة أو تغيير جوهري في إدارة الصلاحيات وقواعد البيانات."
    ],
    example_prompts_ar: [
      "شغل doubt-driven-development وتصرف كمراجع نقدي يهاجم هذا التصميم المعماري ويطلع نقاط ضعفه."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/doubt-driven-development",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/doubt-driven-development"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "source-driven-development",
    name: "source-driven-development",
    title_ar: "التطوير المرتكز على التوثيق والمصادر الرسمية",
    summary_ar: "ربط كل قرار تنفيذي وكود برمجي بالمراجع والمستندات والـ SDKs الرسمية للأدوات والمكتبات، لمنع الاعتماد على دوال وهمية أو ملغاة.",
    category: "development",
    difficulty: "intermediate",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: false,
    github_stars: 112500,
    benefits_ar: [
      "القضاء التام على استدعاء الدوال الملغاة (Deprecated) أو غير الموجودة في الإصدار الحالي.",
      "الاستفادة من أحدث الإمكانات والأنماط الموصى بها رسمياً من مبتكري المكتبات."
    ],
    use_cases_ar: [
      "عند التكامل مع مكتبات خارجية أو ترقية إصدارات أطر العمل مثل React 19 أو Next.js 15."
    ],
    example_prompts_ar: [
      "استخدم مهارة source-driven-development واعتمد على التوثيق الرسمي لـ Prisma v6 في كتابة استعلامات الـ Schema."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/source-driven-development",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/source-driven-development"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "constraint-driven-development",
    name: "constraint-driven-development",
    title_ar: "التطوير المنضبط بالقيود الهندسية الصارمة",
    summary_ar: "تحديد معايير الجودة والحدود الزمنية والمساحية في عقد مكتوب غير قابل للتنازل، ومنع الوكلاء من خفض المعايير عند مواجهة صعوبات.",
    category: "code-quality",
    difficulty: "advanced",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: false,
    github_stars: 112500,
    benefits_ar: [
      "منع حل المشكلات عبر تجاوز الاختبارات أو إخماد تحذيرات الأمان و Linter.",
      "الالتزام الصارم بحدود استهلاك الذاكرة وحجم حزم الويب (Bundle Size)."
    ],
    use_cases_ar: [
      "في الأنظمة الحساسة، المشروعات المصرفية، والأنظمة المدمجة ذات الموارد المحدودة."
    ],
    example_prompts_ar: [
      "شغل مهارة constraint-driven-development وامنع أي حل يتجاوز معيار زمن الاستجابة المحدد بـ 200ms."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/constraint-driven-development",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/constraint-driven-development"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "code-review-quality",
    name: "code-review-and-quality",
    title_ar: "المراجعة الشاملة لجودة الكود والأمان",
    summary_ar: "مراجعة كود متعددة المحاور قبل الدمج: فحص المنطق، المعمارية، الأداء، الأمان، وسهولة القراءة، وفق قوائم تحقق موثوقة.",
    category: "code-quality",
    difficulty: "intermediate",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: true,
    github_stars: 112500,
    benefits_ar: [
      "اكتشاف الثغرات والعيوب الإنشائية قبل وصول الكود إلى الفرع الرئيسي.",
      "تقديم تعليقات بناءة قابلة للتنفيذ المباشر مع أمثلة كود بديلة."
    ],
    use_cases_ar: [
      "مراجعة طلبات السحب (Pull Requests) وفحص الكود المكتوب بواسطة المطورين أو الوكلاء."
    ],
    example_prompts_ar: [
      "راجع التعديلات دي في الـ PR باستخدام code-review-and-quality وركز على تسريبات الذاكرة والأمان."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/code-review-and-quality",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/code-review-and-quality"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "code-simplification",
    name: "code-simplification",
    title_ar: "تبسيط الكود وتطهيره من التعقيد الزائد",
    summary_ar: "إعادة هيكلة الكود المعقد (Refactoring) ليكون بسيطاً ومباشراً وقابلاً للقراءة دون المساس بأي من سلوكياته الوظيفية الأصلية.",
    category: "development",
    difficulty: "intermediate",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: false,
    github_stars: 112500,
    benefits_ar: [
      "تقليل التعقيد الدوري (Cyclomatic Complexity) وإزالة التجريدات غير الضرورية (YAGNI).",
      "تسهيل صيانة الكود وتدريبه للفرق الجديدة وتسريع قراءته."
    ],
    use_cases_ar: [
      "تنظيف وتحديث الكود القديم المعقد بعد إضافة الميزات الأساسية واجتياز الاختبارات."
    ],
    example_prompts_ar: [
      "الملف ده مليان شروط متداخلة وتعقيد زيادة، شغل code-simplification وبسطه مع الحفاظ على نفس السلوك."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/code-simplification",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/code-simplification"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "performance-optimization",
    name: "performance-optimization",
    title_ar: "تسريع وتحسين أداء التطبيقات وقواعد البيانات",
    summary_ar: "تحليل الاختناقات البرمجية، تحسين استعلامات SQL/NoSQL، تفعيل التخزين المؤقت، وتسريع وقت استجابة الخوادم والشاشات.",
    category: "development",
    difficulty: "advanced",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: true,
    github_stars: 112500,
    benefits_ar: [
      "تخفيض زمن استجابة الـ API وزيادة معدل الطلبات في الثانية (Throughput).",
      "القضاء على استعلامات N+1 في قواعد البيانات وإدارة الفهارس (Indexes) بذكاء."
    ],
    use_cases_ar: [
      "عند بطء أداء التطبيق، ارتفاع تكلفة الخوادم، أو وجود تأخير ملحوظ في تحميل الواجهات."
    ],
    example_prompts_ar: [
      "الصفحة دي بتاخد 3 ثواني عشان تفتح، طبق تقنيات performance-optimization لتحسين استعلامات قاعدة البيانات والتخزين المؤقت."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/performance-optimization",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/performance-optimization"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "deprecation-migration",
    name: "deprecation-and-migration",
    title_ar: "إدارة الهجرات البرمجية والأنظمة الملغاة",
    summary_ar: "خطة آمنة لاستبدال الأنظمة والواجهات القديمة وهجرة البيانات دون توقف الخدمة (Zero-Downtime Migration) مع خطط تراجع فورية.",
    category: "development",
    difficulty: "advanced",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: false,
    github_stars: 112500,
    benefits_ar: [
      "ضمان استمرارية تشغيل النظام للعملاء أثناء هجرة قواعد البيانات والـ APIs.",
      "وجود استراتيجية تراجع مؤكدة (Rollback Strategy) عند حدوث أي طارئ."
    ],
    use_cases_ar: [
      "ترقية إصدارات قواعد البيانات، استبدال مكتبة محورية، أو نقل الخدمات من نظام قديم لجديد."
    ],
    example_prompts_ar: [
      "عايزين ننقل جدول المستخدمين لهيكل جديد، استخدم deprecation-and-migration واكتب خطة هجرة بنمط Expand and Contract بدون downtime."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/deprecation-and-migration",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/deprecation-and-migration"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "git-workflow-versioning",
    name: "git-workflow-and-versioning",
    title_ar: "إدارة إصدارات Git والترقيم الدلالي",
    summary_ar: "توحيد ممارسات Git الاحترافية: إنشاء الفروع، صياغة Conventional Commits، وإدارة الترقيم الدلالي (SemVer) وسجلات التغيير آلياً.",
    category: "development",
    difficulty: "beginner",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: true,
    github_stars: 112500,
    benefits_ar: [
      "توليد سجل التغييرات (CHANGELOG.md) وترقية أرقام الإصدارات بشكل آلي ومنتظم.",
      "تجنب النزاعات في الفروع وتسهيل فهم تاريخ المستودع لأي مطور ينضم للفريق."
    ],
    use_cases_ar: [
      "في إدارة عمليات الالتزام اليومية (Daily Commits) والتحضير لإطلاق إصدارات جديدة."
    ],
    example_prompts_ar: [
      "جهز Commit وفق معيار Conventional Commits للتغييرات الحالية مع تحديث الإصدار بحسب git-workflow-and-versioning."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/git-workflow-and-versioning",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/git-workflow-and-versioning"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  },
  {
    id: "shipping-and-launch",
    name: "shipping-and-launch",
    title_ar: "جاهزية الإطلاق والتدقيق النهائي للنشر",
    summary_ar: "قائمة تحقق صارمة قبل النشر للإنتاج (Production Checklist): فحص متغيرات البيئة، الشهادات الأمنية، نسخ البيانات، واختبارات الدخان.",
    category: "cloud-security",
    difficulty: "advanced",
    license: {
      type: "MIT",
      status: "open",
      copy_file_allowed: false
    },
    kind: "skill",
    featured: true,
    github_stars: 112500,
    benefits_ar: [
      "منع الأخطاء الكارثية الناتجة عن نسيان مفاتيح سرية أو تهيئة خاطئة في بيئة الإنتاج.",
      "إجراء اختبارات دخان (Smoke Tests) فورية بعد النشر للتأكد من سلامة النظام."
    ],
    use_cases_ar: [
      "قبل الضغط على زر نشر التحديثات الحية لبيئة الإنتاج للمستخدمين."
    ],
    example_prompts_ar: [
      "احنا جاهزين نرفع التحديث للإنتاج، شغل مهارة shipping-and-launch واعمل فحص شامل لقائمة جاهزية الإطلاق."
    ],
    source: {
      owner: "addyosmani",
      repo: "addyosmani/agent-skills",
      repo_url: "https://github.com/addyosmani/agent-skills",
      path_in_repo: "skills/shipping-and-launch",
      url_verified: true,
      url: "https://github.com/addyosmani/agent-skills/tree/main/skills/shipping-and-launch"
    },
    tool_compatibility: {
      claude_code: true,
      antigravity: true,
      cursor: true,
      gemini_cli: true,
      copilot: true,
      codex_cli: true,
      windsurf: true,
      roo_code: true
    },
    content_verified: false,
    reviewed_by: null,
    reviewed_on: null
  }
];

function formatNumber(num) {
  if (!num && num !== 0) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return num.toLocaleString();
}

function getRankBadge(rank) {
  if (rank === 1) return '🥇 1';
  if (rank === 2) return '🥈 2';
  if (rank === 3) return '🥉 3';
  return '#' + rank;
}

const CATEGORY_MAP = {
  'documents': { name_ar: 'المستندات والملفات' },
  'design': { name_ar: 'التصميم والإبداع' },
  'development': { name_ar: 'البرمجة والويب' },
  'code-quality': { name_ar: 'جودة الكود والاختبار' },
  'cloud-security': { name_ar: 'السحابة والأمان' },
  'data-ai': { name_ar: 'البيانات والذكاء الاصطناعي' },
  'science-education': { name_ar: 'العلوم والتعليم' },
  'business-finance': { name_ar: 'الأعمال والمال' },
  'communication': { name_ar: 'الكتابة والتواصل' },
  'meta': { name_ar: 'بناء المهارات واكتشافها' }
};

function main() {
  const skillsPath = path.join(ROOT, 'data/skills.json');
  const siteSkillsPath = path.join(ROOT, 'site/data/skills.json');
  const lbPath = path.join(ROOT, 'data/leaderboard.json');
  const siteLbPath = path.join(ROOT, 'site/data/leaderboard.json');
  const readmePath = path.join(ROOT, 'README.md');

  const skillsData = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
  console.log(`Initial skills count: ${skillsData.skills.length}`);

  // Filter out any existing to avoid duplicates
  const existingIds = new Set(skillsData.skills.map(s => s.id));
  const toAdd = new23Skills.filter(s => !existingIds.has(s.id));

  skillsData.skills.push(...toAdd);
  skillsData.site.total_skills = skillsData.skills.length;
  console.log(`Total skills after adding 23 verified: ${skillsData.skills.length}`);

  fs.writeFileSync(skillsPath, JSON.stringify(skillsData, null, 2) + '\n', 'utf8');
  fs.writeFileSync(siteSkillsPath, JSON.stringify(skillsData, null, 2) + '\n', 'utf8');
  console.log('✓ Updated data/skills.json and site/data/skills.json');

  // Generate Leaderboard
  const ranked = [...skillsData.skills].sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));
  const nowIso = new Date().toISOString();

  const leaderboardPayload = {
    updated_at: nowIso,
    total: ranked.length,
    ranking_metric: 'الأكثر شهرة (حسب نجوم المستودع)',
    disclaimer_ar: 'تنبيه: عدد النجوم يعود لمستودع GitHub الأصلي بالكامل وليس للمهارة المنفصلة بمفردها.',
    leaderboard: ranked.map((skill, index) => {
      const rank = index + 1;
      const catMeta = CATEGORY_MAP[skill.category] || { name_ar: skill.category };
      return {
        rank,
        id: skill.id,
        name: skill.name,
        title_ar: skill.title_ar,
        summary_ar: skill.summary_ar,
        category: skill.category,
        category_ar: catMeta.name_ar,
        github_stars: skill.github_stars || 0,
        stars_formatted: formatNumber(skill.github_stars),
        repo: skill.source?.owner + '/' + (skill.source?.repo?.split('/')[1] || skill.source?.repo),
        repo_url: skill.source?.url || skill.source?.repo_url || '',
        license: skill.license?.type || (typeof skill.license === 'string' ? skill.license : 'MIT'),
        content_verified: skill.content_verified === true
      };
    })
  };

  fs.writeFileSync(lbPath, JSON.stringify(leaderboardPayload, null, 2), 'utf8');
  fs.writeFileSync(siteLbPath, JSON.stringify(leaderboardPayload, null, 2), 'utf8');
  console.log(`✓ Updated data/leaderboard.json and site/data/leaderboard.json (${ranked.length} entries)`);

  // Update README.md
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, 'utf8');
    const leaderboardLines = [
      '<!-- LEADERBOARD_START -->',
      `> 🔄 **آخر تحديث:** ${nowIso.slice(0, 10)} | **التصنيف:** الأكثر شهرة (حسب نجوم المستودع) | [تحميل JSON المباشر](data/leaderboard.json)`,
      '> ⚠️ **تنبيه:** عدد النجوم يعود لمستودع GitHub الأصلي بالكامل وليس للمهارة المنفصلة بمفردها.',
      '',
      '| # | نجوم المستودع ★ | المهارة (Skill) | التصنيف | المستودع الأصلي (GitHub) | الشرح والبرومبت الجاهز | حالة المراجعة |',
      '|:---:|:---:|---|---|---|:---:|:---:|'
    ];

    ranked.forEach((skill, index) => {
      const rank = index + 1;
      const rankBadge = getRankBadge(rank);
      const stars = formatNumber(skill.github_stars);
      const catMeta = CATEGORY_MAP[skill.category] || { name_ar: skill.category };
      const effectiveSource = skill.source?.url || skill.source?.repo_url || '#';
      const webUrl = `https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=${encodeURIComponent(skill.id)}`;
      const verifiedBadge = skill.content_verified === true ? '✅ مراجعة يدوية' : 'ℹ️ مسودة عامة';

      leaderboardLines.push(
        `| **${rankBadge}** | \`${stars}\` | [**${skill.name}**](${effectiveSource}) | ${catMeta.name_ar} | [\`${skill.source.owner}/${skill.source.repo.split('/')[1] || skill.source.repo}\`](${skill.source.repo_url}) | [**${skill.title_ar}** ↗](${webUrl}) | ${verifiedBadge} |`
      );
    });

    leaderboardLines.push('<!-- LEADERBOARD_END -->');
    const newLeaderboardContent = leaderboardLines.join('\n');

    if (readme.includes('<!-- LEADERBOARD_START -->') && readme.includes('<!-- LEADERBOARD_END -->')) {
      readme = readme.replace(/<!-- LEADERBOARD_START -->[\s\S]*?<!-- LEADERBOARD_END -->/, newLeaderboardContent);
    }
    fs.writeFileSync(readmePath, readme, 'utf8');
    console.log('✓ Updated README.md leaderboard table');
  }
}

main();
