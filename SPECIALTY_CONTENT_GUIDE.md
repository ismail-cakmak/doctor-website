# Specialty Content Management

## 🎉 Enhanced Markdown Editor

Your specialty pages now support **rich markdown formatting** with advanced features!

## 📚 Documentation Files

1. **`MARKDOWN_SYNTAX_GUIDE.md`** - Complete guide with all features and examples
2. **`MARKDOWN_QUICK_REFERENCE.md`** - Quick reference card for daily use  
3. **`MARKDOWN_EXAMPLE.md`** - Full example of a richly formatted specialty page

## Overview

Each specialty page now uses **Markdown files** for content management. This makes it easy to edit page content without touching any HTML or JSX code.

## 🎨 Rich Features Supported

- ✅ **Tables** with custom styling
- ✅ **Task lists** with checkboxes
- ✅ **Blockquotes** with info boxes
- ✅ **Emojis** for visual appeal
- ✅ **Strikethrough** text
- ✅ **Code blocks** with syntax highlighting
- ✅ **Images** with captions
- ✅ **External links** (auto-open in new tab)
- ✅ **Nested lists** (multi-level)
- ✅ **Definition lists**
- ✅ **Horizontal rules**
- ✅ **Bold, italic, and combined formatting**
- ✅ **Auto-generated heading anchors**

## How to Edit Content

### 1. Find the Markdown File

All specialty content files are located in:
```
src/content/specialties/
```

Available files:
- `androloji.md`
- `erkek-infertilitesi.md`
- `erektil-disfonksiyon.md`
- `prematur-ejekulasyon.md`
- `peyronie-penis-egriligi.md`
- `penil-protez-genital-estetik.md`
- `eswt-sok-dalga.md`
- `prp-eksozom-kok-hucre.md`
- `kronik-prostatit.md`
- `bph-iyi-huylu-prostat.md`
- `tas-cerrahisi.md`
- `pelvik-organ-sarkmasi.md`

### 2. Edit Using Markdown

Simply open any `.md` file and edit using standard Markdown syntax:

#### Headings
```markdown
## Main Section Title
### Subsection Title
```

#### Paragraphs
```markdown
Just write regular text. Leave a blank line between paragraphs.

This is a new paragraph.
```

#### Lists
```markdown
- Bullet point 1
- Bullet point 2
- Bullet point 3

Or numbered:
1. First item
2. Second item
3. Third item
```

#### Bold and Italic
```markdown
**Bold text**
*Italic text*
```

#### Links
```markdown
[Link text](https://example.com)
```

### 3. Recommended Structure

Each specialty markdown file should have these three sections:

```markdown
## [Specialty Name] Nedir?

Brief description of what the specialty/condition is...

## Tedavi Yöntemleri

Information about treatment methods...

## Kimler İçin Uygundur?

Who is suitable for this treatment...
```

### 4. Save and Preview

After editing a markdown file:
1. Save the file
2. The changes will automatically appear on the corresponding specialty page
3. No need to restart the development server

## Example

Here's an example from `androloji.md`:

```markdown
## Androloji Nedir?

Androloji, erkek üreme sistemi ve cinsel sağlık sorunlarının tanı ve tedavisi ile ilgilenen tıp dalıdır. 

Erkek infertilitesi, hormonal dengesizlikler, cinsel işlev bozuklukları ve diğer erkek sağlığı sorunlarını kapsar.

## Tedavi Yöntemleri

Androlojik sorunların tedavisinde:
- İlaç tedavisi
- Hormonal tedaviler
- Cerrahi müdahaleler
- Modern rejeneratif tıp yöntemleri

Her hasta için kişiselleştirilmiş tedavi planları oluşturulmaktadır.

## Kimler İçin Uygundur?

İnfertilite sorunu yaşayan, cinsel işlev bozukluğu olan, hormonal dengesizlik yaşayan veya erkek sağlığı konusunda endişeleri olan tüm erkekler için uygundur.
```

## Technical Details

- **Markdown Parser**: react-markdown with remark-gfm
- **Component**: `SpecialtyMarkdownPage.jsx` handles rendering
- **Styling**: Content is styled via `.markdown-content` CSS class
- **Icons**: Icons and headers are managed by the page component (not in markdown)

## Adding New Sections

You can add as many sections as you want to any markdown file. Just use `##` for section headings and write your content below.
