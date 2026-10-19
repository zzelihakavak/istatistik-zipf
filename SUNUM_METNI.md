# 🎙️ Zipf Dağılımları ve Güç Yasası: 10 Dakikalık Sunum Metni

> **Sunum Süresi:** ~10 Dakika (~1400-1500 kelime, ortalama 140 kelime/dakika konuşma hızı)  
> **Konuşmacı:** Zeliha KAVAK  
> **Kullanılacak Materyal:** [Zipf Yasası İnteraktif Portalı](https://github.com/zzelihakavak/istatistik-zipf) (`index.html`)

---

## ⏱️ ZAMAN PLANI ÖZETİ

| Bölüm | Konu | Süre | İlgili Web Modülü |
| :--- | :--- | :--- | :--- |
| **Giriş** | Merak Uyandırıcı Kanca & Problem Tanımı | 00:00 - 01:30 (1.5 dk) | 🏠 Hero Bölümü |
| **1. Teori** | Matematiksel Formül, Parametreler & Log-Log | 01:30 - 04:00 (2.5 dk) | 📐 Matematiksel Teori (7 Adım) |
| **2. Simülatör** | Canlı Deney: $s$ Üssünün ve $N$ Değerinin Rolü | 04:00 - 05:30 (1.5 dk) | ⚗️ Teorik Zipf Simülatörü |
| **3. Dil & NLP** | Metin Analizi: Nutuk, Edebiyat ve Kelime Frekansları | 05:30 - 07:00 (1.5 dk) | 🔍 Canlı Metin Analizörü |
| **4. Şehirler** | Şehir Nüfusları & "Primate City" (İstanbul) Sapması | 07:00 - 08:30 (1.5 dk) | 🏙️ Şehir Nüfusları |
| **5. Genişleme** | Pareto (80/20), Web Trafiği, LLM'ler | 08:30 - 09:30 (1.0 dk) | 🌐 Gerçek Dünya Uygulamaları |
| **Kapanış** | Minimum Efor İlkesi & Özet | 09:30 - 10:00 (0.5 dk) | 🎯 Bilgi Testi & Kapanış |

---

## 🎬 SUNUM METNİ (Kelimesi Kelimesine Rehber)

### 1. GİRİŞ: Merak Uyandırıcı Başlangıç (00:00 - 01:30)
* **[Ekranda:** Web sitesinin Hero bölümü açık. Arka plandaki parçacıklar ve büyük formül $f(r) = C / r^s$ görünüyor.**]**
* **[Beden Dili:** Dinleyicilerle doğrudan göz teması kurun, sakin ve merak uyandırıcı bir tonla başlayın.**]**

> "Değerli hocalarım, sevgili arkadaşlar, hepinize merhaba.
> 
> Bugün sizlere doğada, insan dilinde, yaşadığımız şehirlerde ve hatta her gün tıkladığımız internet sitelerinde gizlice işleyen, ilk bakışta inanması güç ama istatistiksel olarak kusursuz bir matematiksel düzeni anlatacağım: **Zipf Yasası**.
> 
> Başlamadan önce zihninize basit bir soru bırakmak istiyorum:  
> Dünyada konuşulan herhangi bir dili ele alın; Türkçe, İngilizce, Çince ya da antik Latince... Bir dilde en sık kullanılan kelime hangisiyse, ikinci sıradaki kelimenin ne kadar sıklıkla geçtiğini tahmin edebilir misiniz?  
> Çoğu insan 'birbirine yakındır' diye düşünür. Oysa gerçek bambaşkadır:  
> **İkinci sıradaki kelime, birincinin neredeyse tam yarısı kadar kullanılır. Üçüncü sıradaki üçte biri, onuncu sıradaki onda biri, yüzüncü sıradaki ise tam yüzde biri kadar!**
> 
> Peki bu kural sadece kelimeler için mi geçerli?  
> Hayır. Bir ülkenin şehirlerinin nüfusunu büyüklük sırasına dizin; ikinci şehir birincinin yarısı, üçüncü şehir üçte biri büyüklüğündedir. İnternette en çok ziyaret edilen sitelere bakın; yine aynı ters orantı karşımıza çıkar.
> 
> İşte bugün, geliştirdiğim interaktif web platformu üzerinden bu gizemli güç yasasının hem matematiğini, hem gerçek veri analizlerini hem de sınırlarını birlikte inceleyeceğiz."

---

### 2. MATEMATİKSEL TEMEL VE FORMÜLÜN ANATOMİSİ (01:30 - 04:00)
* **[Ekranda:** '📐 Matematiksel Teori' bölümüne kaydırın. 7 adımlı kutuların ve $f(r) = C / r^s$ formülünün olduğu yere gelin.**]**

> "Bu düzen ilk kez 1930'larda Harvardlı dilbilimci **George Kingsley Zipf** tarafından formüle edildi. Zipf, James Joyce'un meşhur *Ulysses* romanını kelime kelime saydı. 1. kelime olan 'the' 69 bin kez geçerken, 2. kelime 'of' 36 bin, 3. kelime 'and' ise 28 bin kez geçiyordu.
> 
> Matematiksel olarak bu ilişkiyi tahtada / ekranda gördüğümüz şu zarif güç yasası formülüyle ifade ediyoruz:
> 
> $$f(r) = \frac{C}{r^s}$$
> 
> Gelin bu formülü üç temel bileşene ayıralım:
> 1. **$r$ (Rank - Sıralama):** Öğenin büyüklük veya popülerlik sırasıdır. 1, 2, 3 gibi tamsayılar alır.
> 2. **$f(r)$ (Frekans):** $r$'inci sıradaki elemanın kaç kez tekrar ettiğidir.
> 3. **$C$ (Normalleştirme Sabiti):** Birinci sıradaki elemanın değerine bağlı olan ve eğriyi ölçekleyen sabittir.
> 4. **$s$ (Zipf Üssü / Exponent):** İşte en kritik parametre burasıdır. Klasik Zipf dağılımında $s \approx 1$'dir. Eğer $s=1$ ise tam bir ters orantı vardır: 1/1, 1/2, 1/3, 1/4... Eğer $s > 1$ olursa kuyruk çok dikleşir, popüler olanlar pastanın neredeyse tamamını alır. $s < 1$ olursa dağılım daha homojenleşir.
> 
> Peki istatistikçiler bir verinin gerçekten Zipf yasasına uyup uymadığını nasıl anlar?  
> Normal eksende baktığımızda elimizde sadece kıvrımlı, hiperbolik bir eğri vardır. Eğrileri doğrulamak zordur.  
> Ancak her iki tarafın logaritmasını alırsak:
> 
> $$\log(f) = \log(C) - s \cdot \log(r)$$
> 
> Lise matematiğinden hatırlayacağımız $y = b + m \cdot x$ doğru denklemi karşımıza çıkar!  
> Yani, veriyi **Çift Logaritmik (Log-Log)** bir grafiğe döktüğümüzde, eğri sihirli bir şekilde **eğimi $-s$ olan dümdüz bir çizgiye** dönüşür. Bir veri setinin log-log grafikte düz bir çizgi vermesi ve $R^2$ regresyon değerinin %95'in üzerinde çıkması, o olgunun tartışmasız bir güç yasası (Power Law) izlediğinin kesin kanıtıdır."

---

### 3. İNTERAKTİF SİMÜLATÖR DEMOSU (04:00 - 05:30)
* **[Ekranda:** '⚗️ Teorik Zipf Simülatörü' bölümüne inin.**]**
* **[Aksiyon:** $s$ slider'ını hareket ettirin, ardından 'Logaritmik Ölçek' toggle'ını açıp kapatın.**]**

> "Şimdi bunu teoride bırakmayalım, sitemizdeki ilk interaktif modül olan **Teorik Zipf Simülatörü** üzerinde canlı deneyelim.
> 
> Ekranda gördüğünüz gibi, şu an $s = 1.0$ ve eleman sayısı $N = 25$ olarak ayarlı.  
> Sağdaki grafiğe bakın: İlk eleman en tepede, ardından inanılmaz bir düşüş var ve uzun bir kuyruk uzanıyor. İstatistikçiler buna **'Fat Tail' (Ağır Kuyruk)** der.
> 
> Şimdi $s$ değerini 1.0'dan 2.0'ye doğru artırıyorum:  
> *[Slider'ı 2.0'a çekin]*  
> Gördüğünüz gibi uçurum daha da derinleşti! 1. sıra neredeyse tüm payı aldı, diğer sıralar görünmez hale geldi.
> 
> Şimdi ise en önemli düğmeye basıyorum: **Logaritmik Ölçek Toggle'ı**.  
> *[Log toggle'ı açın]*  
> Bakın! Az önceki kavisli eğri bir anda cetvelle çizilmiş gibi düz bir doğru halini aldı. Bu doğrunun eğimi bize doğrudan çalıştığımız sistemin $s$ karakteristiğini vermektedir."

---

### 4. GERÇEK DÜNYA 1: DİLLER VE METİN ANALİZİ (05:30 - 07:00)
* **[Ekranda:** '🔍 Canlı Metin Analizi' bölümüne inin.**]**
* **[Aksiyon:** 'Atatürk Nutuk' butonuna tıklayın, 'Analiz Et' deyin. Ardından 'Log-Log' toggle'ını açın.**]**

> "Peki bu matematik teoride güzel de, kendi anadilimiz Türkçede gerçekten çalışıyor mu?  
> Bunu test etmek için sitemize yerleşik bir **Doğal Dil İşleme (NLP) motoru** entegre ettik.
> 
> Buradan **Gazi Mustafa Kemal Atatürk'ün 10. Yıl Nutku ve Gençliğe Hitabesi**'ni seçiyorum ve 'Analiz Et' butonuna basıyorum.  
> Algoritmamız metni anında tokenize etti, kelime köklerini ve frekanslarını çıkardı.
> 
> Ekrana bakalım:  
> - Mavi barlar metindeki kelimelerin gerçek sayımını,  
> - Kırmızı kesikli çizgi ise Zipf formülünün teorik öngörüsünü gösteriyor.  
> Şaşırtıcı biçimde gerçek veriler kırmızı çizgiyi neredeyse milimetrik takip ediyor!  
> Sistemimizin arka planda hesapladığı en küçük kareler regresyonuna göre:  
> **Tahmini üs $s \approx 0.98$ ve $R^2$ uyum skoru %96.4!**
> 
> İster Sabahattin Ali'nin *Kürk Mantolu Madonna*'sını, ister İngilizce bir metni, isterseniz de buraya kendi yazacağınız bin kelimelik bir makaleyi yapıştırın; insan beyni düşüncelerini yazıya dökerken istisnasız bu ters orantılı frekans hiyerarşisini üretir."

---

### 5. GERÇEK DÜNYA 2: ŞEHİR NÜFUSLARI VE "PRIMATE CITY" ETKİSİ (07:00 - 08:30)
* **[Ekranda:** '🏙️ Şehir Nüfusları & Zipf' bölümüne inin.**]**
* **[Aksiyon:** Önce 'ABD Şehirleri'ni seçin, ardından 'Türkiye'yi seçerek farkı gösterin.**]**

> "Şimdi dilbilimden kent sosyolojisine ve coğrafyaya geçelim.  
> Şehir planlamasında meşhur bir kural vardır: **Rank-Size Rule (Sıra-Büyüklük Kuralı)**. Zipf, şehirlerin nüfuslarının da aynı kurala uyduğunu iddia etmiştir.
> 
> Önce veri setimizden **ABD Şehirleri**'ni seçelim:  
> 1. New York: ~8.3 Milyon  
> 2. Los Angeles: ~3.8 Milyon *(Zipf beklentisi: 8.3 / 2 = 4.15 Milyon — Neredeyse tam isabet!)*  
> 3. Chicago: ~2.7 Milyon *(Zipf beklentisi: 8.3 / 3 = 2.76 Milyon — İnanılmaz bir uyum!)*  
> 4. Houston: ~2.3 Milyon *(Beklenti: 2.08 Milyon)*  
> ABD şehirleri literatürde Zipf yasasına en sadık kalan örneklerden biridir.
> 
> **Peki Türkiye'de durum nedir?**  
> Şimdi seçim kutusundan **Türkiye (TÜİK 2024)** verilerini seçiyorum:  
> *[Seçimi Türkiye yapın]*  
> Bir gariplik fark ettiniz mi?  
> İstanbul'un nüfusu yaklaşık 15.6 Milyon.  
> Zipf kuralına göre 2. şehrimiz Ankara'nın yaklaşık 7.8 Milyon, 3. şehrimiz İzmir'in 5.2 Milyon olması gerekirdi. Oysa Ankara 5.8 Milyon, İzmir 4.5 Milyon! Yani ikinci ve üçüncü şehirlerimiz teorik beklentinin oldukça altında kalıyor.
> 
> Peki Zipf yasası burada çöktü mü?  
> Hayır! İstatistiksel modellerin en heyecan verici tarafı, **sapmaların da bize sosyolojik bir hikaye anlatmasıdır**.  
> Şehir coğrafyasında buna **'Primate City' (Başat / Baskın Metropol) Olgusu** denir. Eğer bir ülkenin tarihi, sanayisi, finansı ve kültürü tek bir megakentte aşırı merkezileşmişse (Fransa'da Paris, Arjantin'de Buenos Aires veya Türkiye'de İstanbul gibi), o birinci şehir orantısız biçimde şişer ve altındaki şehirlerin enerjisini emer.  
> Ancak grafikte 4. sıradan (Bursa, Antalya, Konya, Adana...) itibaren baktığınızda, eğrinin yeniden Zipf çizgisine oturduğunu görebilirsiniz."

---

### 6. DİĞER ALANLAR VE GÜÇ YASASI AİLESİ (08:30 - 09:30)
* **[Ekranda:** '🌐 Uygulamalar' ve 'Dünya Web Trafiği Sıralaması' tablosuna gelin.**]**

> "Zipf Yasası tek başına izole bir doğa olayı değildir; **Güç Yasası (Power Law)** ailesinin bir ferdidir.
> 
> - **Pareto Dağılımı ve 80/20 Kuralı:** İtalyan ekonomist Vilfredo Pareto'nun 'Gelirin %80'i nüfusun %20'sinin elindedir' tespiti, Zipf yasasıyla matematiksel olarak eşdeğerdir. Zipf sıra-büyüklüğü ($r \to x$), Pareto ise kümülatif dağılımı ($x \to P$) tanımlar. Madalyonun iki yüzüdürler.
> - **Web Trafiği:** Tablomuzda gördüğünüz gibi dünya internet trafiğinde Google 85 milyar ziyaretle 1. sıradayken, YouTube 33 milyarla neredeyse tam Zipf oranını izler.
> - **Yapay Zeka ve LLM'ler:** ChatGPT veya Claude gibi büyük dil modellerini eğitirken kullanılan 'Byte-Pair Encoding (BPE)' ve tokenizasyon algoritmaları doğrudan dildeki bu Zipf dengesizliğini çözmek için tasarlanmıştır. Çünkü en sık 100 kelime metinlerin %50'sini oluştururken, nadir kelimeler devasa bir sözlük yükü yaratır."

---

### 7. SONUÇ VE KAPANIŞ (09:30 - 10:00)
* **[Ekranda:** '🎯 Bilgi Testi' bölümünü gösterip dinleyicilere dönün.**]**

> "Toparlamak gerekirse;  
> George Zipf bütün bu düzeni tek bir ilkeyle açıklamıştı: **En Az Çaba İlkesi (Principle of Least Effort)**.  
> İster konuşan bir insan olsun, ister ticaret yapan tüccarlar, isterse şehir kuran toplumlar... Karmaşık sistemler minimum enerji harcayarak maksimum verim üretmeye çalıştığında, karşımıza Gaussian (Normal) çan eğrisi değil; güç yasası ve Zipf dağılımı çıkar.
> 
> Hazırladığım bu web sitesinde konuştuklarımızı pekiştirmek için 5 soruluk interaktif bir bilgi testi de bulunuyor; dileyen arkadaşlarımız sunumdan sonra link üzerinden kendilerini test edebilirler.
> 
> Dinlediğiniz için hepinize çok teşekkür ederim. Sorularınız varsa yanıtlamaktan memnuniyet duyarım."

---

## 💡 JÜRİ / ÖĞRETMEN İÇİN POTANSİYEL SORULAR & CEVAPLARI (Q&A CHEAT-SHEET)

1. **Soru: Zipf Yasası ile Normal (Gauss) Dağılım arasındaki en temel fark nedir?**
   * *Cevap:* Normal dağılımda veriler ortalama etrafında simetrik kümelenir (örneğin insan boyları; ortalama 175 cm'dir, 10 metre boyunda insan yoktur). Aşırı uçlar imkansızdır. Güç yasalarında ise ortalama anlamsızdır, 'uzun kuyruk' (fat tail) vardır; bir öğe diğerlerinin yüzlerce katı büyüklükte olabilir.

2. **Soru: Neden log-log grafiği kullanıyoruz?**
   * *Cevap:* $f = C / r^s$ fonksiyonunun logaritması alındığında $\log f = \log C - s \log r$ elde edilir. Bu, $y = mx + b$ biçiminde doğrusal bir denklemdir. Doğrusallığı tespit etmek ve eğim ($s$) ile korelasyonu ($R^2$) hesaplamak log-log düzleminde çok daha hassas ve kesindir.

3. **Soru: Türkiye verisinde neden İstanbul Zipf kuralını bozuyor?**
   * *Cevap:* 'Primate City' olgusu yüzünden. Türkiye'de sermaye, göç ve sanayi tarihsel olarak İstanbul'da aşırı yoğunlaşmıştır. Eğer bir ülkede tek bir şehir ekonomik veya idari olarak tüm ülkeyi domine ediyorsa, birinci şehir Zipf beklentisinin çok üzerine çıkar.
