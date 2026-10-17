/**
 * Zipf Dağılımı ve Yasası Eğitim Portalı - Veri Setleri
 */

const ZIPF_DATA = {
    // Hazır Metin Örnekleri
    sampleTexts: {
        nutuk: {
            title: "Atatürk'ün 10. Yıl Nutku & Gençliğe Hitabesi",
            language: "tr",
            content: `Türk Milleti! Kurtuluş Savaşı'na başladığımızın 15'inci yılındayız. Bugün cumhuriyetimizin onuncu yılını doldurduğu en büyük bayramdır. Kutlu olsun! Bu anda büyük Türk milletinin bir ferdi olmakla ne kadar mesut ve bahtiyar olduğumu ifade edemem. Yurttaşlarım! Az zamanda çok ve büyük işler yaptık. Bu işlerin en büyüğü, temeli Türk kahramanlığı ve yüksek Türk kültürü olan Türkiye Cumhuriyeti'dir. Bundaki muvaffakiyeti Türk milletinin ve onun değerli ordusunun bir ve beraber olarak azimkarane yürümesine borçluyuz. Fakat yaptıklarımızı asla kafi göremeyiz. Çünkü daha çok ve daha büyük işler yapmak mecburiyetinde ve azmindeyiz. Yurdumuzu dünyanın en mamur ve en medeni memleketleri seviyesine çıkaracağız. Milletimizi en geniş refah vasıta ve kaynaklarına sahip kılacağız. Milli kültürümüzü muasır medeniyet seviyesinin üstüne çıkaracağız. Ey Türk gençliği! Birinci vazifen; Türk istiklalini, Türk cumhuriyetini, ilelebet muhafaza ve müdafaa etmektir. Mevcudiyetinin ve istikbalinin yegane temeli budur. Bu temel, senin en kıymetli hazinendir. İstikbalde dahi seni bu hazineden mahrum etmek isteyecek dahili ve harici bedhahların olacaktır. Bir gün, istiklal ve cumhuriyeti müdafaa mecburiyetine düşersen, vazifeye atılmak için içinde bulunacağın vaziyetin imkan ve şeraitini düşünmeyeceksin. Bu imkan ve şerait, çok namüsait bir mahiyette tezahür edebilir. İstiklal ve cumhuriyetine kastedecek düşmanlar, bütün dünyada emsali görülmemiş bir galibiyetin mümessili olabilirler. Cebren ve hile ile aziz vatanın bütün kaleleri zaptedilmiş, bütün tersanelerine girilmiş, bütün orduları dağıtılmış ve memleketin her köşesi bilfiil işgal edilmiş olabilir. Bütün bu şeraitten daha elim ve daha vahim olmak üzere, memleketin dahilinde iktidara sahip olanlar, gaflet ve dalalet ve hatta hıyanet içinde bulunabilirler. Hatta bu iktidar sahipleri, şahsi menfaatlerini müstevlilerin siyasi emelleriyle tevhit edebilirler. Millet, fakr ü zaruret içinde harap ve bitap düşmüş olabilir. Ey Türk istikbalinin evladı! İşte, bu ahval ve şerait içinde dahi vazifen, Türk istiklal ve cumhuriyetini kurtarmaktır. Muhtaç olduğun kudret, damarlarındaki asil kanda mevcuttur.`
        },
        madonna: {
            title: "Sabahattin Ali - Kürk Mantolu Madonna (Alıntı)",
            language: "tr",
            content: `Şimdiye kadar tesadüf ettiğim insanlardan bir tanesi benim üzerimde belki en büyük tesiri yapmıştır. Aradan seneler geçtiği halde bu tesir hiç azalmadı. Bazan kendimi hala onun etkisinde bulur, onun gibi düşünmeye, onun gibi duymaya çalıştığımı hissederek şaşarım. İnsanlar birbirlerini ne kadar az tanıyorlar ve birbirleri hakkında ne kadar kolay hüküm veriyorlar. Bir insanı tanımak, onun en derin köşelerine kadar sokulabilmek, onu olduğu gibi görebilmek ne güç bir iştir. Hayatımın en mühim hadisesi, belki de bir rastlantı neticesinde vuku buldu. Her gün gördüğümüz, yanımızdan geçen, sıradan zannettiğimiz insanların içinde ne büyük fırtınalar, ne derin kederler ve ne tükenmez aşklar gizlidir. Raif Efendi de böyle bir insandı. Dışarıdan bakıldığında sessiz, silik, kendi halinde, hiçbir şeye karışmayan ve kimseyle çekişmeyen bir adamdı. Halbuki onun içinde bambaşka bir dünya vardı; öyle bir dünya ki, onu bir kere gören bir daha asla unutamazdı. Sanat galerisinde gördüğü o kürk mantolu portre, hayatının akışını bütünüyle değiştirdi. Bir kadının resmine bakarken kalbinde doğan o derin hisler, yalnızlığını ve varoluşunu aydınlattı. Her insanın hayatında böyle bir dönüm noktası, ruhunun uykudan uyandığı tek bir an vardır.`
        },
        alice: {
            title: "Lewis Carroll - Alice in Wonderland (İngilizce Klasik)",
            language: "en",
            content: `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, and what is the use of a book, thought Alice, without pictures or conversation? So she was considering in her own mind, as well as she could, for the hot day made her feel very sleepy and stupid, whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her. There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, 'Oh dear! Oh dear! I shall be late!' but when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge. In another moment down went Alice after it, never once considering in the world how on earth she was to get out again. The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.`
        },
        bilim: {
            title: "Evrende Entropi ve Karmaşıklık (Popüler Bilim)",
            language: "tr",
            content: `Evrenin en temel yasalarından biri olan termodinamiğin ikinci yasası, kapalı bir sistemde düzensizliğin yani entropinin zamanla sürekli artacağını söyler. Bu yasa, zamanın neden tek bir yönde aktığını ve geçmiş ile gelecek arasındaki asimetriyi anlamamızda en büyük anahtardır. Büyük Patlama anında son derece düzenli ve düşük entropili bir halde başlayan evrenimiz, milyarlarca yıldır genişlemekte ve maddeyi dağıtmaktadır. Ancak ilginç bir şekilde, genel entropi artarken yerel düzeyde olağanüstü karmaşık yapılar ortaya çıkabilmektedir. Yıldızlar, gezegenler, organik moleküller ve nihayetinde bilinçli yaşam, bu yerel düzenin en muazzam örnekleridir. Karmaşık sistemler teorisi, doğadaki pek çok yapının basit kurallardan türediğini ve güç yasası dağılımlarına uyduğunu gösterir. Tıpkı dildeki kelimelerin dağılımı gibi, galaksilerin kümelenmesi, depremlerin enerjisi ve hatta insan beynindeki sinir ağlarının bağlantı örüntüleri de benzer istatistiksel kurallarla şekillenir.`
        }
    },

    // Şehir Nüfusu Veri Setleri
    cities: {
        turkey: {
            name: "Türkiye Şehirleri (TÜİK 2023-2024)",
            unit: "Nüfus",
            notes: "İstanbul'un aşırı büyüklüğü (Primate City fenomeni) nedeniyle Türkiye'de 2. ve 3. şehirler Zipf tahmininin altında kalırken, orta ölçekli şehirler Zipf eğrisine yaklaşır.",
            data: [
                { rank: 1, name: "İstanbul", actual: 15655924 },
                { rank: 2, name: "Ankara", actual: 5803482 },
                { rank: 3, name: "İzmir", actual: 4479525 },
                { rank: 4, name: "Bursa", actual: 3214571 },
                { rank: 5, name: "Antalya", actual: 2698066 },
                { rank: 6, name: "Konya", actual: 2320225 },
                { rank: 7, name: "Adana", actual: 2270298 },
                { rank: 8, name: "Şanlıurfa", actual: 2213964 },
                { rank: 9, name: "Gaziantep", actual: 2164134 },
                { rank: 10, name: "Kocaeli", actual: 2102907 },
                { rank: 11, name: "Mersin", actual: 1938389 },
                { rank: 12, name: "Diyarbakır", actual: 1818133 },
                { rank: 13, name: "Hatay", actual: 1544644 },
                { rank: 14, name: "Manisa", actual: 1475716 },
                { rank: 15, name: "Kayseri", actual: 1445495 },
                { rank: 16, name: "Samsun", actual: 1377546 },
                { rank: 17, name: "Balıkesir", actual: 1273519 },
                { rank: 18, name: "Tekirdağ", actual: 1167059 },
                { rank: 19, name: "Aydın", actual: 1161702 },
                { rank: 20, name: "Van", actual: 1127612 }
            ]
        },
        usa: {
            name: "ABD Şehirleri (Belediye Nüfusları - Klasik Zipf Örneği)",
            unit: "Nüfus",
            notes: "ABD şehirleri, literatürde Zipf Yasası'na (s ≈ 1) en kusursuz biçimde uyan klasik örnek olarak gösterilir. New York'un ardından Los Angeles ve Chicago neredeyse tam 1/2 ve 1/3 oranlarını takip eder.",
            data: [
                { rank: 1, name: "New York", actual: 8335897 },
                { rank: 2, name: "Los Angeles", actual: 3822238 },
                { rank: 3, name: "Chicago", actual: 2665039 },
                { rank: 4, name: "Houston", actual: 2302878 },
                { rank: 5, name: "Phoenix", actual: 1644409 },
                { rank: 6, name: "Philadelphia", actual: 1550542 },
                { rank: 7, name: "San Antonio", actual: 1472909 },
                { rank: 8, name: "San Diego", actual: 1381162 },
                { rank: 9, name: "Dallas", actual: 1304379 },
                { rank: 10, name: "Austin", actual: 979882 },
                { rank: 11, name: "Jacksonville", actual: 971319 },
                { rank: 12, name: "San Jose", actual: 971233 },
                { rank: 13, name: "Fort Worth", actual: 956709 },
                { rank: 14, name: "Columbus", actual: 907971 },
                { rank: 15, name: "Charlotte", actual: 897720 }
            ]
        },
        world: {
            name: "Dünya Metropol Alanları",
            unit: "Metropol Nüfusu",
            notes: "Küresel metropollerde kentsel yoğunlaşma Zipf dağılımına benzer bir güç yasası oluşturur.",
            data: [
                { rank: 1, name: "Tokyo", actual: 37400000 },
                { rank: 2, name: "Delhi", actual: 30290000 },
                { rank: 3, name: "Şanghay", actual: 27050000 },
                { rank: 4, name: "Sao Paulo", actual: 22040000 },
                { rank: 5, name: "Mexico City", actual: 21780000 },
                { rank: 6, name: "Kahire", actual: 20900000 },
                { rank: 7, name: "Dhaka", actual: 21000000 },
                { rank: 8, name: "Mumbai", actual: 20410000 },
                { rank: 9, name: "Pekin", actual: 20460000 },
                { rank: 10, name: "Osaka", actual: 19280000 },
                { rank: 11, name: "New York Metro", actual: 18800000 },
                { rank: 12, name: "Karaçi", actual: 16090000 }
            ]
        }
    },

    // Web ve Dijital Dünya Veri Örnekleri
    webStats: [
        { rank: 1, site: "Google.com", visitsMonthly: "85.2 Milyar", sharePct: 100 },
        { rank: 2, site: "YouTube.com", visitsMonthly: "33.1 Milyar", sharePct: 38.8 },
        { rank: 3, site: "Facebook.com", visitsMonthly: "16.8 Milyar", sharePct: 19.7 },
        { rank: 4, site: "Instagram.com", visitsMonthly: "7.1 Milyar", sharePct: 8.3 },
        { rank: 5, site: "X (Twitter)", visitsMonthly: "5.8 Milyar", sharePct: 6.8 },
        { rank: 6, site: "Baidu.com", visitsMonthly: "4.7 Milyar", sharePct: 5.5 },
        { rank: 7, site: "Wikipedia.org", visitsMonthly: "4.3 Milyar", sharePct: 5.0 }
    ],

    // Sık Karşılaşılan Türkçe Stop Words (Dolgu Kelimeleri)
    turkishStopWords: new Set([
        "ve", "bir", "bu", "de", "da", "için", "ile", "ne", "en", "o", "ki",
        "gibi", "daha", "kadar", "her", "ama", "çok", "olarak", "ise", "ya",
        "veya", "ben", "sen", "biz", "siz", "onlar", "şey", "mi", "mı", "mu", "mü"
    ]),

    // İnteraktif Bilgi Yarışması Soruları
    quizQuestions: [
        {
            question: "Zipf Yasası'na (s = 1) göre, bir dildeki en sık kullanılan 1. kelime 10.000 kez geçiyorsa, sıralamadaki 5. kelimenin yaklaşık kaç kez geçmesi beklenir?",
            options: [
                "5.000 kez",
                "2.000 kez",
                "1.000 kez",
                "500 kez"
            ],
            correct: 1,
            explanation: "Zipf kuralına göre rütbesi r olan bir kelimenin sıklığı f(r) = f(1) / r şeklindedir. Dolayısıyla 5. sıradaki kelime için: 10.000 / 5 = 2.000 kez beklenir."
        },
        {
            question: "Zipf dağılımı gösteren bir veri seti 'Çift Logaritmik' (Log-Log) grafiğe aktarıldığında grafik nasıl görünür?",
            options: [
                "Eğrisel ve parabolik bir yay",
                "Çan eğrisi (Normal dağılım)",
                "Negatif eğimli düz bir doğru",
                "Dikey dalgalı bir sinüs dalgası"
            ],
            correct: 2,
            explanation: "f(r) = C / r^s formülünün her iki tarafının logaritması alındığında: log(f) = log(C) - s*log(r) elde edilir. Bu bir doğru denklemidir (y = a - s*x) ve eğimi -s olan düz bir çizgi oluşturur."
        },
        {
            question: "George Kingsley Zipf, kelimelerin ve insan davranışlarının bu dağılıma uymasını hangi ilkeyle açıklamıştır?",
            options: [
                "Maksimum Entropi İlkesi",
                "En Az Çaba (Minimum Efor) İlkesi",
                "Sosyal Darwinizm İlkesi",
                "Rastlantısal Yürüyüş İlkesi"
            ],
            correct: 1,
            explanation: "Zipf, 1949 yılındaki ünlü kitabında insanların hem konuşurken hem de toplumsal hayatta enerjilerini en aza indirme eğiliminde olduğunu ('Principle of Least Effort') savunmuştur."
        },
        {
            question: "Zipf Yasası ile İtalyan ekonomist Vilfredo Pareto'nun '80/20 Kuralı' (Pareto Dağılımı) arasındaki ilişki nedir?",
            options: [
                "Hiçbir ilişkileri yoktur, tamamen zıt dağılımlardır.",
                "Zipf yasası yalnızca dillerde, Pareto ise yalnızca fizikte geçerlidir.",
                "Aynı güç yasasının (power law) iki farklı matematiksel ifadesidir; biri sıra-büyüklük, diğeri kümülatif dağılımı tanımlar.",
                "Pareto yasası Zipf yasasını çürütmek için geliştirilmiştir."
            ],
            correct: 2,
            explanation: "Pareto dağılımı ve Zipf dağılımı matematiksel olarak birbirine dönüştürülebilir güç yasalarıdır (Power Law). Zipf dağılımı nesneleri büyüklük sırasına göre dizerken, Pareto belirli bir eşiği aşan nesnelerin yüzdesini verir."
        },
        {
            question: "Türkiye'de İstanbul'un nüfusu (~15.6 milyon) iken, 2. şehir Ankara'nın (~5.8 milyon) Zipf tahmininin (15.6 / 2 = 7.8 milyon) altında kalmasının şehir sosyolojisindeki adı nedir?",
            options: [
                "Primate City (Başat / Baskın Metropol) Olgusu",
                "Metropol Çöküşü",
                "Normal Dağılım Kayması",
                "Pareto Denge Noktası"
            ],
            correct: 0,
            explanation: "Bir ülkenin en büyük şehrinin, ekonomik ve demografik açıdan 2. şehirden belirgin şekilde 2 kattan çok daha büyük olmasına 'Primate City' (Başat Şehir) etkisi denir. Fransa'da Paris, Arjantin'de Buenos Aires ve Türkiye'de İstanbul bunun tipik örnekleridir."
        }
    ]
};
