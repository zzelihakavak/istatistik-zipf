# 📊 Zipf Dağılımları ve Yasası — İnteraktif Eğitim Portalı

Zipf Yasası'nı (Zipf's Law) ve güç yasalarını (Power Law) dillerden kentsel hiyerarşiye, web trafiğinden gelir dağılımına kadar gerçek dünya verileriyle anlatan interaktif web platformu.

---

## 🌟 Özellikler ve Modüller

1. **📐 Matematiksel Teori (7 Adımlı Anlatım):**
   - James Joyce'un *Ulysses* romanındaki kelime sıklığıyla keşfin hikayesi.
   - $f(r) = \frac{C}{r^s}$ temel formülünün parametre anatomisi ($f(r)$, $C$, $s$).
   - Olasılık formu ve Harmonik Sayı ($H_{N,s}$) ile normalleştirme ($N=5$ için somut tablo).
   - Log-Log dönüşümünün adım adım matematiksel türetimi ($\log f = \log C - s \cdot \log r$).
   - Farklı $s$ üslerinin ($s=0.5, 1.0, 2.0$) karşılaştırmalı etki analizi.
   - Güç Yasası Ailesi ve Pareto-Zipf bağlantısı.
   - Dilbilimsel, istatistiksel ve karmaşıklık teorisi açıklamaları.

2. **⚗️ Teorik Zipf Simülatörü:**
   - $s$ (Zipf üssü) ve $N$ (öğe sayısı) slider'ları ile canlı grafik oluşturma.
   - Doğrusal (Linear) ve Çift Logaritmik (Log-Log) ölçek geçişi.
   - İlk 8 sıranın teorik oranlarını gösteren anlık tablo.

3. **🔍 Canlı Metin & NLP Analizörü:**
   - Kullanıcının yapıştırdığı Türkçe veya İngilizce metinleri tokenize etme.
   - Hazır metinler: Atatürk 10. Yıl Nutku, Sabahattin Ali - Kürk Mantolu Madonna, Alice in Wonderland, Popüler Bilim.
   - Türkçe dolgu kelimeleri (stop-words) filtreleme opsiyonu.
   - En Küçük Kareler regresyonu ile tahmini $s$ eğimi ve $R^2$ uyum skoru.
   - Gerçek frekans vs ideal Zipf eğrisi ($f_1 / r$) karşılaştırma grafiği ve tablosu.

4. **🏙️ Şehir Nüfusları & Kentsel Zipf Hiyerarşisi:**
   - **Türkiye Şehirleri (TÜİK 2024):** İstanbul, Ankara, İzmir... Primate City (Başat Şehir) etkisi analizi.
   - **ABD Şehirleri:** New York, Los Angeles, Chicago... Klasik Zipf uyumunun mükemmel örneği.
   - **Dünya Metropolleri:** Tokyo, Delhi, Şanghay...
   - Gerçek vs Zipf beklentisi ($P_1 / r$) karşılaştırmalı bar/çizgi grafiği.

5. **🌐 Gerçek Dünya Uygulamaları:**
   - Web trafiği & SEO (Long-tail mantığı).
   - Biyoinformatik & Genomika (Kodon ve gen ekspresyonu).
   - Tedarik zinciri & ABC Analizi.
   - Büyük Dil Modelleri (LLM & BPE tokenizasyon).
   - Scale-free ağlar ve finansal fat-tail riskleri.
   - Dünya Web Trafiği Sıralaması (Google, YouTube, Facebook...).

6. **🎯 İnteraktif Bilgi Testi (Quiz):**
   - 5 soruluk test.
   - Anında doğru/yanlış geri bildirimi ve detaylı açıklamalar.
   - Sonuç ekranında skor yüzdesi ve rozet sistemi.

---

## 🛠️ Kullanılan Teknolojiler

- **HTML5 & Vanilla JavaScript (ES6+)**
- **Tailwind CSS** (CDN)
- **Chart.js v4** (İnteraktif grafikler, logaritmik eksen desteği)
- **KaTeX** (Hızlı LaTeX matematik formülü render motoru)

---

## 🚀 Yerel Olarak Çalıştırma

Projeyi çalıştırmak için herhangi bir paket yöneticisi kurmanıza gerek yoktur:

```bash
# Proje dizininde basit bir HTTP sunucusu başlatın:
python3 -m http.server 8000
```

Ardından tarayıcınızdan `http://localhost:8000` adresine gidin. Doğrudan `index.html` dosyasını tarayıcınızda çift tıklayarak da açabilirsiniz.
