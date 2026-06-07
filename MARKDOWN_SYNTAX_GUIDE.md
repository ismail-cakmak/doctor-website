# 📝 Markdown Syntax Guide for Specialty Pages

This guide shows you all the rich formatting options available when editing specialty content files.

---

## 📌 Table of Contents
- [Basic Text Formatting](#basic-text-formatting)
- [Headings](#headings)
- [Lists](#lists)
- [Links](#links)
- [Tables](#tables)
- [Blockquotes](#blockquotes)
- [Code](#code)
- [Images](#images)
- [Advanced Features](#advanced-features)

---

## Basic Text Formatting

### Bold Text
```markdown
**Bu metin kalın görünecek**
```
**Bu metin kalın görünecek**

### Italic Text
```markdown
*Bu metin italik görünecek*
```
*Bu metin italik görünecek*

### Bold + Italic
```markdown
***Bu metin hem kalın hem italik***
```
***Bu metin hem kalın hem italik***

### Strikethrough
```markdown
~~Bu metin üstü çizili~~
```
~~Bu metin üstü çizili~~

### Paragraphs
Leave a blank line between paragraphs:
```markdown
Bu birinci paragraf.

Bu ikinci paragraf.
```

---

## Headings

```markdown
## Ana Başlık (Heading 2)
### Alt Başlık (Heading 3)
#### Daha Küçük Başlık (Heading 4)
```

> ⚠️ **Not:** Don't use `# Heading 1` - it's reserved for the page title.  
> Always start with `##` for main sections.

---

## Lists

### Bulleted List (Madde İşaretli)
```markdown
- İlk madde
- İkinci madde
- Üçüncü madde
  - Alt madde
  - Başka bir alt madde
```

Result:
- İlk madde
- İkinci madde
- Üçüncü madde
  - Alt madde
  - Başka bir alt madde

### Numbered List (Numaralı)
```markdown
1. Birinci adım
2. İkinci adım
3. Üçüncü adım
   1. Alt adım
   2. Başka bir alt adım
```

Result:
1. Birinci adım
2. İkinci adım
3. Üçüncü adım
   1. Alt adım
   2. Başka bir alt adım

### Task List (Kontrol Listesi)
```markdown
- [x] Tamamlanmış görev
- [ ] Bekleyen görev
- [ ] Başka bir görev
```

Result:
- [x] Tamamlanmış görev
- [ ] Bekleyen görev
- [ ] Başka bir görev

---

## Links

### Internal Links
```markdown
[Hakkımda sayfasına git](/hakkimda)
```

### External Links
```markdown
[Google'a git](https://www.google.com)
```
> External links automatically open in a new tab!

### Link with Title
```markdown
[Örnek Link](https://example.com "Bu bir tooltip")
```

---

## Tables

Create beautiful tables easily:

```markdown
| Tedavi Yöntemi | Süre | Etkinlik |
|----------------|------|----------|
| PRP Tedavisi   | 30 dk | %85 |
| ESWT           | 15 dk | %75 |
| İlaç Tedavisi  | -     | %60 |
```

Result:

| Tedavi Yöntemi | Süre | Etkinlik |
|----------------|------|----------|
| PRP Tedavisi   | 30 dk | %85 |
| ESWT           | 15 dk | %75 |
| İlaç Tedavisi  | -     | %60 |

### Table Alignment
```markdown
| Sol Hizalı | Orta Hizalı | Sağ Hizalı |
|:-----------|:-----------:|-----------:|
| Sol        | Orta        | Sağ        |
```

---

## Blockquotes

### Simple Quote
```markdown
> Bu önemli bir not veya vurgulanması gereken bilgi.
```

Result:
> Bu önemli bir not veya vurgulanması gereken bilgi.

### Multi-line Quote
```markdown
> Bu birinci satır.
> Bu ikinci satır.
> 
> Bu yeni bir paragraf.
```

### Nested Quotes
```markdown
> Ana alıntı
>> İç içe alıntı
```

---

## Code

### Inline Code
```markdown
`PRP tedavisi` en etkili yöntemlerden biridir.
```
Result: `PRP tedavisi` en etkili yöntemlerden biridir.

### Code Block
````markdown
```
Birden fazla satır kod
veya özel format
```
````

### Code Block with Language
````markdown
```javascript
const tedavi = "PRP";
console.log(tedavi);
```
````

---

## Images

### Basic Image
```markdown
![Açıklama metni](image-path.jpg)
```

### Image with Link
```markdown
[![Alt text](image.jpg)](https://example.com)
```

### Image with Title
```markdown
![Tedavi Süreci](treatment.jpg "Tedavi sürecinin görseli")
```

---

## Advanced Features

### Horizontal Line
Use three or more dashes, asterisks, or underscores:
```markdown
---
***
___
```

Result:
---

### Escaping Characters
Use backslash to escape special characters:
```markdown
\*Bu yıldızlar italik yapmaz\*
```

### Line Breaks
Add two spaces at the end of a line for a line break:
```markdown
Bu satır  
Bu yeni satırda
```

### Definition Lists
```markdown
Androloji
: Erkek sağlığı ile ilgilenen tıp dalı

Üroloji  
: İdrar yolu hastalıkları ile ilgilenen tıp dalı
```

### Footnotes
```markdown
Bu bir referans içeren cümle[^1].

[^1]: Bu referansın açıklaması.
```

### Abbreviations
```markdown
PRP tedavisi çok etkilidir.

*[PRP]: Platelet Rich Plasma
```

---

## 🎨 Styling Tips

### 1. Use Emojis
```markdown
✅ Tedavi başarılı
⚠️ Dikkat edilmesi gereken
ℹ️ Bilgi notu
📌 Önemli nokta
```

### 2. Combine Formatting
```markdown
**_Kalın ve italik_** metin
~~**Üstü çizili ve kalın**~~ metin
```

### 3. Multi-level Lists
```markdown
1. Ana tedavi yöntemleri
   - İlaç tedavisi
     - Oral ilaçlar
     - Enjeksiyon tedavileri
   - Cerrahi tedaviler
     - Minimal invaziv
     - Açık cerrahi
```

---

## 💡 Best Practices

### Do's ✅
- Use `##` for main sections (not `#`)
- Leave blank lines between different elements
- Use descriptive link text
- Keep tables simple and readable
- Use lists for better readability
- Add emojis sparingly for emphasis

### Don'ts ❌
- Don't use inline HTML (not supported)
- Don't use `# Heading 1` (reserved for page title)
- Don't forget blank lines between paragraphs
- Don't make tables too wide
- Don't overuse bold/italic formatting

---

## 📋 Quick Reference Template

Here's a starter template for a specialty page:

```markdown
## [Tedavi Adı] Nedir?

Kısa ve net açıklama buraya.

## Tedavi Yöntemleri

Tedavi seçenekleri:
- **Yöntem 1**: Açıklama
- **Yöntem 2**: Açıklama
- **Yöntem 3**: Açıklama

### Tedavi Süreci

1. İlk konsültasyon
2. Tanı ve değerlendirme
3. Tedavi planı
4. Takip

## Kimler İçin Uygundur?

Bu tedavi şu durumlarda önerilir:
- Durum 1
- Durum 2
- Durum 3

> ℹ️ **Not:** Önemli bir bilgi veya uyarı buraya.

## Beklenen Sonuçlar

| Zaman Dilimi | Beklenen İyileşme |
|--------------|-------------------|
| 1. Hafta     | %25               |
| 1. Ay        | %60               |
| 3. Ay        | %85               |

## Sıkça Sorulan Sorular

### Tedavi ağrılı mı?
Hayır, tedavi genellikle ağrısızdır.

### Kaç seans gerekir?
Genellikle 6-12 seans önerilir.
```

---

## 🔗 Useful Links

- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)
- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)

---

## 📝 Example: Full Specialty Page

```markdown
## Erektil Disfonksiyon Nedir?

Erektil disfonksiyon (sertleşme sorunu), cinsel ilişki için yeterli sertlikte ereksiyonun sağlanamaması veya sürdürülememesi durumudur.

Bu durum:
- Fiziksel faktörlerden
- Psikolojik faktörlerden  
- Her ikisinin kombinasyonundan kaynaklanabilir

---

## Tedavi Yöntemleri

### 💊 İlaç Tedavisi

| İlaç Türü | Etki Süresi | Yan Etki |
|-----------|-------------|----------|
| PDE5 İnhibitörleri | 4-36 saat | Minimal |
| Testosteron | Sürekli | Düşük |

### 🔬 Rejeneratif Tedaviler

Modern tedavi seçenekleri:
- **PRP Tedavisi**: Kendi kanınızdan elde edilen trombositlerle tedavi
- **ESWT**: Şok dalgası ile doku yenilenmesi
- **Kök Hücre**: En yeni nesil tedavi

> ⚠️ **Önemli:** Her hastaya en uygun tedavi yöntemi muayene sonrası belirlenir.

---

## Kimler İçin Uygundur?

✅ Düzenli sertleşme sorunu yaşayanlar  
✅ İlaç tedavisine yanıt vermeyenler  
✅ Doğal tedavi arayanlar  
✅ Diyabet veya kalp hastası olanlar

❌ Aktif enfeksiyonu olanlar  
❌ Kan hastalığı olanlar

---

## Tedavi Süreci

1. **Ön Değerlendirme** (30 dk)
   - Detaylı anamnez
   - Fizik muayene
   - Gerekli testler

2. **Tedavi Planı** (15 dk)
   - Kişiselleştirilmiş plan
   - Beklentilerin belirlenmesi

3. **Uygulama** (20-30 dk)
   - Tedavi seansı
   - Takip randevusu

---

## Başarı Oranları

> 📊 **İstatistikler:**
> - PRP Tedavisi: %75-85 başarı
> - ESWT: %60-70 başarı
> - Kombine tedavi: %85-90 başarı

---

## Sıkça Sorulan Sorular

### Tedavi kaç seans sürüyor?
Genellikle 6-12 seans arasında değişir.

### Yan etkileri var mı?
Minimal yan etki görülür. En sık görülen hafif morluktur.

### Sonuçlar kalıcı mı?
Evet, tedavi sonrası ortalama 12-18 ay etkili kalır.

---

**📞 Randevu için hemen arayın!**
```

This example shows how to create a professional, informative, and visually appealing specialty page using all available markdown features!
