/**
 * Zipf Dağılımı ve Yasası - Ana Uygulama Mantığı (app.js)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Modülleri Başlat
    initSimulator();
    initTextAnalyzer();
    initCityPopulations();
    initQuiz();
    initNavigation();
    renderMathFormulas();
});

/**
 * ========================================================
 * 1. MATEMATİKSEL ZİPF SİMÜLATÖRÜ
 * ========================================================
 */
function initSimulator() {
    const sSlider = document.getElementById('sim-s-slider');
    const sValueDisplay = document.getElementById('sim-s-val');
    const nSlider = document.getElementById('sim-n-slider');
    const nValueDisplay = document.getElementById('sim-n-val');
    const logToggle = document.getElementById('sim-log-toggle');
    const tableBody = document.getElementById('sim-table-body');

    let currentS = parseFloat(sSlider ? sSlider.value : 1.0);
    let currentN = parseInt(nSlider ? nSlider.value : 25, 10);
    let isLog = false;

    function update() {
        if (sValueDisplay) sValueDisplay.textContent = currentS.toFixed(2);
        if (nValueDisplay) nValueDisplay.textContent = currentN;

        const result = ZipfCharts.renderSimulator('simulatorChart', currentS, currentN, isLog);

        // Tabloyu Güncelle (İlk 8 eleman)
        if (tableBody && result) {
            tableBody.innerHTML = '';
            const previewLimit = Math.min(8, currentN);
            for (let r = 1; r <= previewLimit; r++) {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors text-sm';
                
                const theoreticalRatio = (1 / Math.pow(r, currentS)).toFixed(3);
                const freq = result.frequencies[r - 1];
                const pct = result.percentages[r - 1];

                tr.innerHTML = `
                    <td class="py-2.5 px-3 font-semibold text-indigo-400">#${r}</td>
                    <td class="py-2.5 px-3 text-slate-300">1 / ${r}<sup>${currentS.toFixed(1)}</sup> ≈ <span class="text-amber-400 font-mono">${theoreticalRatio}</span></td>
                    <td class="py-2.5 px-3 font-mono font-medium text-slate-200">${freq.toLocaleString()}</td>
                    <td class="py-2.5 px-3 text-right">
                        <span class="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            %${pct}
                        </span>
                    </td>
                `;
                tableBody.appendChild(tr);
            }
        }
    }

    if (sSlider) {
        sSlider.addEventListener('input', (e) => {
            currentS = parseFloat(e.target.value);
            update();
        });
    }

    if (nSlider) {
        nSlider.addEventListener('input', (e) => {
            currentN = parseInt(e.target.value, 10);
            update();
        });
    }

    if (logToggle) {
        logToggle.addEventListener('change', (e) => {
            isLog = e.target.checked;
            update();
        });
    }

    // İlk çizim
    update();
}

/**
 * ========================================================
 * 2. CANLI METİN KELİME ANALİZÖRÜ (NLP & ZIPF)
 * ========================================================
 */
function initTextAnalyzer() {
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const filterStopWordsCheck = document.getElementById('filter-stopwords-check');
    const logToggle = document.getElementById('word-log-toggle');
    const sampleButtons = document.querySelectorAll('.sample-text-btn');

    // Metrik elementleri
    const totalWordsEl = document.getElementById('stat-total-words');
    const uniqueWordsEl = document.getElementById('stat-unique-words');
    const topWordEl = document.getElementById('stat-top-word');
    const estimatedSEl = document.getElementById('stat-estimated-s');
    const rSquaredEl = document.getElementById('stat-r-squared');
    const wordTableBody = document.getElementById('word-table-body');

    let currentStats = [];
    let isLog = false;

    // Türkçe karakter uyumlu küçük harfe çevirme
    function turkishToLower(str) {
        return str
            .replace(/İ/g, 'i')
            .replace(/I/g, 'ı')
            .toLowerCase();
    }

    // Metin analizi gerçekleştir
    function analyze(text) {
        if (!text || text.trim() === '') {
            text = ZIPF_DATA.sampleTexts.nutuk.content;
            if (textInput) textInput.value = text;
        }

        const filterStopWords = filterStopWordsCheck ? filterStopWordsCheck.checked : false;

        // Kelimelere ayır (Türkçe ve Latin karakterler)
        const rawTokens = text.match(/[\p{L}\p{N}]+/gu) || [];
        const totalWordCount = rawTokens.length;

        // Frekans haritası oluştur
        const freqMap = new Map();

        for (let token of rawTokens) {
            const word = turkishToLower(token);
            if (word.length < 2) continue; // Tek harfleri atla

            if (filterStopWords && ZIPF_DATA.turkishStopWords.has(word)) {
                continue;
            }

            freqMap.set(word, (freqMap.get(word) || 0) + 1);
        }

        // Sırala
        const sortedWords = Array.from(freqMap.entries())
            .map(([word, count]) => ({ word, count }))
            .sort((a, b) => b.count - a.count);

        currentStats = sortedWords;

        // En Küçük Kareler Regresyonu ile log(rank) vs log(freq) eğimi (s) ve R^2 hesabı
        const regressionData = [];
        const topLimit = Math.min(sortedWords.length, 30);
        for (let i = 0; i < topLimit; i++) {
            const rank = i + 1;
            const freq = sortedWords[i].count;
            regressionData.push({ x: Math.log(rank), y: Math.log(freq) });
        }

        let slope = 1.0;
        let r2 = 0.95;

        if (regressionData.length > 2) {
            const n = regressionData.length;
            let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0, sumYY = 0;
            for (let pt of regressionData) {
                sumX += pt.x;
                sumY += pt.y;
                sumXY += pt.x * pt.y;
                sumXX += pt.x * pt.x;
                sumYY += pt.y * pt.y;
            }

            const denominator = (n * sumXX - sumX * sumX);
            if (denominator !== 0) {
                slope = (n * sumXY - sumX * sumY) / denominator; // Genelde negatif, örn -1.05
                const correlationNumerator = (n * sumXY - sumX * sumY);
                const correlationDenominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
                const r = correlationDenominator !== 0 ? (correlationNumerator / correlationDenominator) : 0;
                r2 = Math.min(1.0, Math.max(0, r * r));
            }
        }

        // İstatistikleri arayüze yaz
        if (totalWordsEl) totalWordsEl.textContent = totalWordCount.toLocaleString();
        if (uniqueWordsEl) uniqueWordsEl.textContent = freqMap.size.toLocaleString();
        if (topWordEl) {
            if (sortedWords.length > 0) {
                topWordEl.textContent = `"${sortedWords[0].word}" (${sortedWords[0].count})`;
            } else {
                topWordEl.textContent = "-";
            }
        }
        if (estimatedSEl) {
            estimatedSEl.textContent = `s ≈ ${Math.abs(slope).toFixed(2)}`;
        }
        if (rSquaredEl) {
            rSquaredEl.textContent = `%${(r2 * 100).toFixed(1)}`;
        }

        // Tabloyu doldur (İlk 10 kelime)
        if (wordTableBody) {
            wordTableBody.innerHTML = '';
            const f1 = sortedWords[0] ? sortedWords[0].count : 1;
            const tableLimit = Math.min(10, sortedWords.length);

            for (let i = 0; i < tableLimit; i++) {
                const rank = i + 1;
                const item = sortedWords[i];
                const expected = Math.round(f1 / rank);
                const diff = item.count - expected;
                const diffPct = (((item.count - expected) / expected) * 100).toFixed(0);

                const tr = document.createElement('tr');
                tr.className = 'border-b border-slate-800/60 hover:bg-slate-800/30 text-sm';

                let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                if (Math.abs(diffPct) > 35) {
                    badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                }

                tr.innerHTML = `
                    <td class="py-2.5 px-3 font-semibold text-sky-400">#${rank}</td>
                    <td class="py-2.5 px-3 font-medium text-white">${item.word}</td>
                    <td class="py-2.5 px-3 font-mono text-slate-200">${item.count}</td>
                    <td class="py-2.5 px-3 font-mono text-slate-400">${expected}</td>
                    <td class="py-2.5 px-3 text-right">
                        <span class="inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${badgeColor}">
                            ${diff >= 0 ? '+' : ''}${diffPct}%
                        </span>
                    </td>
                `;
                wordTableBody.appendChild(tr);
            }
        }

        // Grafiği çiz
        ZipfCharts.renderTextAnalysis('textAnalysisChart', currentStats, isLog);
    }

    // Buton dinleyicileri
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            analyze(textInput.value);
        });
    }

    if (filterStopWordsCheck) {
        filterStopWordsCheck.addEventListener('change', () => {
            analyze(textInput.value);
        });
    }

    if (logToggle) {
        logToggle.addEventListener('change', (e) => {
            isLog = e.target.checked;
            ZipfCharts.renderTextAnalysis('textAnalysisChart', currentStats, isLog);
        });
    }

    sampleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const sampleKey = btn.getAttribute('data-sample');
            if (ZIPF_DATA.sampleTexts[sampleKey]) {
                textInput.value = ZIPF_DATA.sampleTexts[sampleKey].content;
                analyze(textInput.value);

                sampleButtons.forEach(b => b.classList.remove('bg-indigo-600', 'text-white'));
                sampleButtons.forEach(b => b.classList.add('bg-slate-800', 'text-slate-300'));
                btn.classList.remove('bg-slate-800', 'text-slate-300');
                btn.classList.add('bg-indigo-600', 'text-white');
            }
        });
    });

    // İlk başlangıçta Nutuk ile analiz et
    if (textInput) {
        textInput.value = ZIPF_DATA.sampleTexts.nutuk.content;
        analyze(textInput.value);
    }
}

/**
 * ========================================================
 * 3. ŞEHİR NÜFUSLARI & KENTSEL ZIPF DAĞILIMI
 * ========================================================
 */
function initCityPopulations() {
    const datasetSelect = document.getElementById('city-dataset-select');
    const logToggle = document.getElementById('city-log-toggle');
    const notesEl = document.getElementById('city-notes');
    const tableBody = document.getElementById('city-table-body');

    let currentDatasetKey = 'turkey';
    let isLog = false;

    function update() {
        const dataset = ZIPF_DATA.cities[currentDatasetKey];
        if (!dataset) return;

        if (notesEl) {
            notesEl.textContent = dataset.notes;
        }

        ZipfCharts.renderCityPopulations('cityChart', dataset, isLog);

        if (tableBody) {
            tableBody.innerHTML = '';
            const P1 = dataset.data[0].actual;

            dataset.data.forEach((city) => {
                const zipfExp = Math.round(P1 / city.rank);
                const ratio = (city.actual / zipfExp).toFixed(2);
                const diffPct = (((city.actual - zipfExp) / zipfExp) * 100).toFixed(0);

                const tr = document.createElement('tr');
                tr.className = 'border-b border-slate-800/60 hover:bg-slate-800/30 text-sm';

                let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                if (city.actual > zipfExp * 1.35) {
                    badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
                } else if (city.actual < zipfExp * 0.65) {
                    badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                }

                tr.innerHTML = `
                    <td class="py-2.5 px-3 font-semibold text-emerald-400">#${city.rank}</td>
                    <td class="py-2.5 px-3 font-medium text-white">${city.name}</td>
                    <td class="py-2.5 px-3 font-mono text-slate-200">${city.actual.toLocaleString()}</td>
                    <td class="py-2.5 px-3 font-mono text-slate-400">${zipfExp.toLocaleString()}</td>
                    <td class="py-2.5 px-3 text-right">
                        <span class="inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${badgeColor}">
                            ${ratio}x (${diffPct >= 0 ? '+' : ''}${diffPct}%)
                        </span>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        }
    }

    if (datasetSelect) {
        datasetSelect.addEventListener('change', (e) => {
            currentDatasetKey = e.target.value;
            update();
        });
    }

    if (logToggle) {
        logToggle.addEventListener('change', (e) => {
            isLog = e.target.checked;
            update();
        });
    }

    // İlk çizim
    update();
}

/**
 * ========================================================
 * 4. İNTERAKTİF BİLGİ YARIŞMASI (QUIZ)
 * ========================================================
 */
function initQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    let currentQuestionIdx = 0;
    let score = 0;
    let hasAnsweredCurrent = false;
    const questions = ZIPF_DATA.quizQuestions;

    function renderQuestion() {
        if (currentQuestionIdx >= questions.length) {
            renderResults();
            return;
        }

        hasAnsweredCurrent = false;
        const q = questions[currentQuestionIdx];
        const progressPct = ((currentQuestionIdx + 1) / questions.length) * 100;

        container.innerHTML = `
            <div class="mb-6">
                <div class="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
                    <span class="text-slate-300 font-medium">Soru ${currentQuestionIdx + 1} / ${questions.length}</span>
                    <span class="text-indigo-400 font-mono font-bold">Skor: ${score} Doğru</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div class="bg-indigo-500 h-2.5 rounded-full transition-all duration-300" style="width: ${progressPct}%"></div>
                </div>
            </div>

            <h3 class="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
                ${q.question}
            </h3>

            <div class="space-y-3 mb-6" id="quiz-options-container">
                ${q.options.map((opt, idx) => `
                    <button data-idx="${idx}" type="button" class="quiz-option-btn w-full text-left p-4 rounded-xl border border-slate-700/80 bg-slate-800/50 hover:bg-slate-800 hover:border-indigo-500/50 text-slate-200 transition-all flex items-center justify-between group cursor-pointer">
                        <span class="flex items-center space-x-3 pointer-events-none">
                            <span class="w-7 h-7 rounded-lg bg-slate-700/60 text-slate-300 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-sm font-semibold transition-colors shrink-0">
                                ${String.fromCharCode(65 + idx)}
                            </span>
                            <span class="text-sm md:text-base">${opt}</span>
                        </span>
                        <span class="quiz-feedback-icon opacity-0 font-bold text-sm pointer-events-none shrink-0 ml-2"></span>
                    </button>
                `).join('')}
            </div>

            <div id="quiz-explanation-area"></div>
            <div id="quiz-action-area" class="mt-6 flex justify-end"></div>
        `;
    }

    function renderResults() {
        const total = questions.length;
        const pct = Math.round((score / total) * 100);

        let badgeTitle = "İstatistik Çırağı";
        let badgeDesc = "Zipf Yasası'nın temellerini öğrenmeye başladınız. Formülleri ve grafikleri tekrar gözden geçirebilirsiniz.";
        if (pct >= 80) {
            badgeTitle = "Zipf ve Güç Yasası Ustası 🏆";
            badgeDesc = "Mükemmel! Doğal dillerden kentsel hiyerarşiye kadar Zipf yasasını ve log-log mantığını derinlemesine kavradınız.";
        } else if (pct >= 60) {
            badgeTitle = "Veri Bilimi Meraklısı 🔍";
            badgeDesc = "Gayet iyi! Temel ilkeleri anladınız. Gerçek dünya sapmalarına (örneğin Primate City) biraz daha dikkat edebilirsiniz.";
        }

        container.innerHTML = `
            <div class="text-center py-8">
                <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-indigo-500/20 border-2 border-indigo-500 flex items-center justify-center text-3xl font-black text-indigo-400">
                    %${pct}
                </div>
                <h3 class="text-2xl font-black text-white mb-2">${badgeTitle}</h3>
                <p class="text-slate-400 max-w-md mx-auto mb-6 text-sm">${badgeDesc}</p>
                <div class="text-sm font-semibold text-slate-300 mb-8">
                    Toplam Skor: <span class="text-indigo-400 font-mono text-base font-bold">${score} / ${total}</span> doğru cevap
                </div>
                <button id="quiz-restart-btn" type="button" class="px-6 py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30 cursor-pointer">
                    Yarışmayı Tekrar Başlat ↺
                </button>
            </div>
        `;
    }

    // TEK BİR EVENT LISTENER (Container seviyesinde Event Delegation)
    container.addEventListener('click', (e) => {
        // 1. "Sonraki Soru" Butonuna tıklandıysa:
        const nextBtn = e.target.closest('#quiz-next-btn');
        if (nextBtn) {
            currentQuestionIdx++;
            renderQuestion();
            return;
        }

        // 2. "Tekrar Başlat" Butonuna tıklandıysa:
        const restartBtn = e.target.closest('#quiz-restart-btn');
        if (restartBtn) {
            currentQuestionIdx = 0;
            score = 0;
            renderQuestion();
            return;
        }

        // 3. Şıklardan birine tıklandıysa:
        const optBtn = e.target.closest('.quiz-option-btn');
        if (optBtn && !hasAnsweredCurrent) {
            hasAnsweredCurrent = true;
            const q = questions[currentQuestionIdx];
            const selectedIdx = parseInt(optBtn.getAttribute('data-idx'), 10);
            const isCorrect = (selectedIdx === q.correct);

            // Tüm şıkları devre dışı bırak
            const allOptionBtns = container.querySelectorAll('.quiz-option-btn');
            allOptionBtns.forEach(btn => {
                btn.disabled = true;
                btn.classList.remove('hover:bg-slate-800', 'hover:border-indigo-500/50', 'cursor-pointer');
                btn.classList.add('cursor-default');
            });

            // Geri bildirim stili
            const icon = optBtn.querySelector('.quiz-feedback-icon');
            if (isCorrect) {
                score++;
                optBtn.classList.remove('border-slate-700/80', 'bg-slate-800/50');
                optBtn.classList.add('border-emerald-500', 'bg-emerald-500/20', 'text-emerald-300');
                if (icon) {
                    icon.textContent = '✓ Doğru';
                    icon.classList.remove('opacity-0');
                    icon.classList.add('opacity-100', 'text-emerald-400');
                }
            } else {
                optBtn.classList.remove('border-slate-700/80', 'bg-slate-800/50');
                optBtn.classList.add('border-rose-500', 'bg-rose-500/20', 'text-rose-300');
                if (icon) {
                    icon.textContent = '✗ Yanlış';
                    icon.classList.remove('opacity-0');
                    icon.classList.add('opacity-100', 'text-rose-400');
                }

                // Doğru şıkkı da yeşil yapıp göster
                const correctBtn = allOptionBtns[q.correct];
                if (correctBtn) {
                    correctBtn.classList.remove('border-slate-700/80', 'bg-slate-800/50');
                    correctBtn.classList.add('border-emerald-500', 'bg-emerald-500/20', 'text-emerald-300');
                    const correctIcon = correctBtn.querySelector('.quiz-feedback-icon');
                    if (correctIcon) {
                        correctIcon.textContent = '✓ Doğru Cevap';
                        correctIcon.classList.remove('opacity-0');
                        correctIcon.classList.add('opacity-100', 'text-emerald-400');
                    }
                }
            }

            // Açıklamayı göster
            const expArea = container.querySelector('#quiz-explanation-area');
            if (expArea) {
                expArea.innerHTML = `
                    <div class="p-4 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-slate-300 mt-4">
                        <p class="font-semibold text-indigo-300 mb-1 flex items-center gap-2">
                            <span>💡 İzah & Açıklama:</span>
                        </p>
                        <p class="leading-relaxed">${q.explanation}</p>
                    </div>
                `;
            }

            // Sonraki soru butonunu dinamik olarak yerleştir (Asla kaybolmaz veya css'e takılmaz)
            const actionArea = container.querySelector('#quiz-action-area');
            if (actionArea) {
                const isLastQuestion = (currentQuestionIdx + 1 >= questions.length);
                const buttonLabel = isLastQuestion ? 'Sonuçları Gör 🏆' : 'Sonraki Soru →';
                actionArea.innerHTML = `
                    <button id="quiz-next-btn" type="button" class="px-6 py-3 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 text-sm sm:text-base">
                        <span>${buttonLabel}</span>
                    </button>
                `;
            }
        }
    });

    // İlk soruyu başlat
    renderQuestion();
}

/**
 * ========================================================
 * 5. MENÜ VE SAYFA GEZİNİMİ (SMOOTH SCROLL)
 * ========================================================
 */
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Menü linklerine tıklanınca mobilde kapat
        const navLinks = mobileMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

/**
 * ========================================================
 * 6. MATEMATİKSEL FORMÜLLERİ RENDER ET (KATEX)
 * ========================================================
 */
function renderMathFormulas() {
    if (window.renderMathInElement) {
        window.renderMathInElement(document.body, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false
        });
    }
}
