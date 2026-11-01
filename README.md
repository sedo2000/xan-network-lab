# Blue — Personal Link Hub

موقع شخصي عربي/إنجليزي بتصميم Mobile-first وخلفية Navy متدرجة. مبني بـ HTML5 وCSS3 وVanilla JavaScript ES Modules دون إطار عمل.

## شجرة المشروع
```
blue-site/
├── index.html
├── README.md
├── assets/
│   ├── images/ (profile-placeholder.svg, channel.jpg)
│   └── icons/ (favicon.svg, spider-pattern.svg)
├── css/ (base.css, layout.css, components.css, telegram-widget.css, animations.css)
├── js/ (main.js, config.js, animations.js, components/social.js, components/telegramWidget.js)
└── data/projects.json
```

## التشغيل
افتح المجلد عبر خادم محلي مثل VS Code Live Server أو ارفع المستودع إلى GitHub Pages / Netlify / Vercel. يستخدم الموقع ES Modules وfetch لقراءة JSON، لذلك لا تفتحه عبر file:// مباشرة.

## التخصيص
1. افتح `js/config.js` لتعديل الاسم والوصف وروابط Instagram وGitHub وTelegram وبيانات القناة.
2. غيّر `channel.url` إلى رابط القناة العامة الحقيقي، و`channel.name` و`channel.subtitle` عند الحاجة.
3. استبدل `assets/images/profile-placeholder.svg` بصورتك، ثم حدّث `profileImage` في config.js.
4. ضع صورة القناة في `assets/images/channel.jpg` (الصورة المرفقة مقصوصة من تصميم القناة لتناسب الإطار الدائري).
5. عدّل `data/projects.json` لإضافة المشاريع أو حذفها أو تغيير روابطها.
6. الألوان والخطوط موجودة كمتغيرات CSS في `css/base.css`.

## ملاحظات
- رابط القناة مضبوط حالياً على placeholder: `https://t.me/YOUR_PUBLIC_CHANNEL`، استبدله باسم القناة الفعلي.
- روابط Instagram وملف الصورة الشخصية مؤقتة حتى تضيف بياناتك.
- لا توجد خدمات تتبع أو مكتبات خارجية للبطاقة؛ Google Fonts فقط لتحميل Cairo وPoppins.

## تحسينات مستقبلية مقترحة
1. ربط نموذج التواصل بخدمة بريد آمنة مثل Formspree أو API خاص.
2. إضافة معرض صور ومقاطع قصيرة لأعمالك.
3. إضافة صفحة تفاصيل لكل مشروع مع لقطات وشرح وتقنيات الاستخدام.
