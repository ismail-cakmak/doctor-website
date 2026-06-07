#!/bin/bash

# ErektilDisfonksiyonPage
cat > ErektilDisfonksiyonPage.jsx << 'EOF'
import { Activity } from "lucide-react"
import SpecialtyMarkdownPage from "../SpecialtyMarkdownPage"

export default function ErektilDisfonksiyonPage() {
  return (
    <SpecialtyMarkdownPage
      slug="erektil-disfonksiyon"
      icon={Activity}
      title="Erektil Disfonksiyon"
      description="Sertleşme sorunu için çözümler"
    />
  )
}
EOF

# PrematurEjekulasyonPage
cat > PrematurEjekulasyonPage.jsx << 'EOF'
import { Activity } from "lucide-react"
import SpecialtyMarkdownPage from "../SpecialtyMarkdownPage"

export default function PrematurEjekulasyonPage() {
  return (
    <SpecialtyMarkdownPage
      slug="prematur-ejekulasyon"
      icon={Activity}
      title="Prematür Ejekülasyon"
      description="Erken boşalma yönetimi"
    />
  )
}
EOF

# PeyroniePage
cat > PeyroniePage.jsx << 'EOF'
import { Droplets } from "lucide-react"
import SpecialtyMarkdownPage from "../SpecialtyMarkdownPage"

export default function PeyroniePage() {
  return (
    <SpecialtyMarkdownPage
      slug="peyronie-penis-egriligi"
      icon={Droplets}
      title="Peyronie (Penis Eğriliği)"
      description="Değerlendirme ve tedavi"
    />
  )
}
EOF

# PenilProtezPage
cat > PenilProtezPage.jsx << 'EOF'
import { Slice } from "lucide-react"
import SpecialtyMarkdownPage from "../SpecialtyMarkdownPage"

export default function PenilProtezPage() {
  return (
    <SpecialtyMarkdownPage
      slug="penil-protez-genital-estetik"
      icon={Slice}
      title="Penil Protez & Genital Estetik"
      description="Mutluluk çubuğu ve estetik cerrahiler"
    />
  )
}
EOF

# ESWTPage
cat > ESWTPage.jsx << 'EOF'
import { Waves } from "lucide-react"
import SpecialtyMarkdownPage from "../SpecialtyMarkdownPage"

export default function ESWTPage() {
  return (
    <SpecialtyMarkdownPage
      slug="eswt-sok-dalga"
      icon={Waves}
      title="ESWT Şok Dalga"
      description="İlaçsız fonksiyon destek tedavisi"
    />
  )
}
EOF

# PRPPage
cat > PRPPage.jsx << 'EOF'
import { Syringe } from "lucide-react"
import SpecialtyMarkdownPage from "../SpecialtyMarkdownPage"

export default function PRPPage() {
  return (
    <SpecialtyMarkdownPage
      slug="prp-eksozom-kok-hucre"
      icon={Syringe}
      title="PRP / Eksozom / Kök Hücre"
      description="Rejeneratif uygulamalar"
    />
  )
}
EOF

# KronikProstatitPage
cat > KronikProstatitPage.jsx << 'EOF'
import { Microscope } from "lucide-react"
import SpecialtyMarkdownPage from "../SpecialtyMarkdownPage"

export default function KronikProstatitPage() {
  return (
    <SpecialtyMarkdownPage
      slug="kronik-prostatit"
      icon={Microscope}
      title="Kronik Prostatit"
      description="Neden odaklı tanı ve tedavi"
    />
  )
}
EOF

# BPHPage
cat > BPHPage.jsx << 'EOF'
import { Shield } from "lucide-react"
import SpecialtyMarkdownPage from "../SpecialtyMarkdownPage"

export default function BPHPage() {
  return (
    <SpecialtyMarkdownPage
      slug="bph-iyi-huylu-prostat"
      icon={Shield}
      title="BPH (İyi Huylu Prostat Büyümesi)"
      description="İlaç ve girişimsel seçenekler"
    />
  )
}
EOF

# TasCerrahisiPage
cat > TasCerrahisiPage.jsx << 'EOF'
import { TestTube } from "lucide-react"
import SpecialtyMarkdownPage from "../SpecialtyMarkdownPage"

export default function TasCerrahisiPage() {
  return (
    <SpecialtyMarkdownPage
      slug="tas-cerrahisi"
      icon={TestTube}
      title="Taş Cerrahisi"
      description="Böbrek ve üreter taşı endoürolojisi"
    />
  )
}
EOF

# PelviOrganSarkmasiPage
cat > PelviOrganSarkmasiPage.jsx << 'EOF'
import { Pill } from "lucide-react"
import SpecialtyMarkdownPage from "../SpecialtyMarkdownPage"

export default function PelviOrganSarkmasiPage() {
  return (
    <SpecialtyMarkdownPage
      slug="pelvik-organ-sarkmasi"
      icon={Pill}
      title="Pelvik Organ Sarkması"
      description="Cerrahi ve cerrahi dışı çözümler"
    />
  )
}
EOF

echo "All pages updated!"
