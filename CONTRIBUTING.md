# دليل المساهمة / Contributing Guide

[بالعربية](#بالعربية) | [English](#english)

---

<div dir="rtl">

## بالعربية

أهلاً بك في **دليل مهارات الذكاء الاصطناعي**. نرحب بمساهمات المجتمع لإثراء الدليل بمهارات موثوقة ومفيدة للمستخدمين العرب.

### القواعد الصارمة قبل إضافة أي مهارة

1. **فحص الرخصة أولاً (إلزامي):**
   - **`proprietary_link_only`**: للمهارات ذات الرخص الخاصة أو غير المفتوحة (مثل مهارات مستندات Anthropic: pdf, docx, xlsx). **ممنوع نهائياً** نسخ ملفاتها أو تخزينها بالريبو أو تفعيل زر نسخ محتوى الملف؛ نكتفي بوضع الرابط الرسمي للمصدر.
   - **`verify_before_publish`**: إذا كانت الرخصة تبدو مفتوحة ولكن يجب التحقق من ملف `LICENSE` الأصلي في مجلد المهارة قبل النشر.
   - **`open`**: للمهارات ذات الرخص المفتوحة المؤكدة (مثل MIT أو Apache-2.0). يسمح بنسخ محتوى الملف مع نسبة العمل لأصحابه.
2. **عدم ترجمة ملف `SKILL.md` نفسه:** يظل الملف الإنجليزي الأصلي هو مصدر الحقيقة في الريبو الأصلي. قيمتنا المضافة هي الشرح العربي وتغليف البرومبت الإنجليزي.
3. **البرومبت يظل بالإنجليزية:** كل ما ينسخه المستخدم للموديل يكون بالإنجليزية مع التوجيه بالرد بالعربية، بينما الشرح والأمثلة تكون بالعربية البسيطة.
4. **المهارات المشتقة (Derived Works):**
   - يُسمح بالاشتقاق فقط من مهارات برخص تسمح بالتعديل (Apache-2.0 أو MIT).
   - يجب وضع نسخة من ملف الرخصة الأصلية في `skills-files/<id>/LICENSE`.
   - يجب توضيح التعديلات في `modification_notes_ar`، وإضافة الريبو الأصلي في `NOTICE.md`.
5. **حيادية الأدوات:** المشروع محايد لكل نماذج الذكاء الاصطناعي (Gemini, ChatGPT, Claude, Copilot, Cursor, etc.). لا تضع أي ادعاء دعم خاص لأداة في الكود إلا إذا كان موثقاً رسمياً في `data/tools.json`.

### خطوات إضافة مهارة جديدة

1. افتح مستودع المهارة واقرأ ملف `SKILL.md` وملف الرخصة `LICENSE`.
2. أضف بيانات المهارة إلى `data/skills.json` بالصيغة المحددة.
3. شغّل سكريبت التحقق المحلي:
   ```bash
   node scripts/validate.mjs
   ```
4. تأكد من نجاح كل الفحوصات وافتح Pull Request.

</div>

---

<div dir="ltr">

## English

Welcome to the **Arabic Skills Guide**. We welcome contributions to enrich this curated directory of AI Skills for Arabic-speaking users.

### Strict Rules

1. **License Verification (Mandatory):**
   - `proprietary_link_only`: For proprietary/source-available skills. NEVER copy or host files in this repo. Link only.
   - `verify_before_publish`: Permissive-looking licenses requiring human verification of the source LICENSE file before publishing.
   - `open`: Verified permissive license (MIT, Apache-2.0).
2. **Never translate SKILL.md in place:** The English file remains the single source of truth in the upstream repository.
3. **Prompts stay in English:** Copied instructions are in English; Arabic is used for explanations and examples.
4. **Derived works:** Permitted only for permissive licenses (Apache-2.0, MIT). Requires original `LICENSE` in `skills-files/<id>/LICENSE`, `modification_notes_ar`, and entry in `NOTICE.md`.
5. **Tool neutrality:** The project is model-agnostic.

### How to add a skill

1. Review the upstream repository, `SKILL.md`, and `LICENSE`.
2. Add the skill entry into `data/skills.json`.
3. Run the validation script:
   ```bash
   node scripts/validate.mjs
   ```
4. Ensure all checks pass and submit a Pull Request.

</div>
