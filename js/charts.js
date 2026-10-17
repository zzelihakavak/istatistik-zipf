/**
 * Zipf Dağılımı ve Yasası - Chart.js Grafik Yöneticisi
 */

const ZipfCharts = {
    // Grafik referansları
    instances: {
        simulator: null,
        textAnalysis: null,
        cityPopulations: null
    },

    // Chart.js genel koyu tema ve font ayarları
    initGlobalDefaults() {
        Chart.defaults.color = '#94a3b8';
        Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.08)';
    },

    /**
     * 1. TEORİK ZİPF SİMÜLATÖRÜ GRAFİĞİ
     */
    renderSimulator(canvasId, s = 1.0, N = 30, isLogScale = false) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Hesaplamalar
        // Generalized harmonic number: H_{N,s} = sum_{n=1}^N (1 / n^s)
        let harmonicSum = 0;
        for (let i = 1; i <= N; i++) {
            harmonicSum += 1 / Math.pow(i, s);
        }

        const labels = [];
        const frequencies = [];
        const percentages = [];

        // Varsayımsal toplam popülasyon: 10,000 birim
        const TOTAL_ITEMS = 10000;

        for (let r = 1; r <= N; r++) {
            labels.push(r);
            const prob = (1 / Math.pow(r, s)) / harmonicSum;
            const freq = Math.round(TOTAL_ITEMS * prob);
            frequencies.push(freq);
            percentages.push((prob * 100).toFixed(2));
        }

        if (this.instances.simulator) {
            this.instances.simulator.destroy();
        }

        this.instances.simulator = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Teorik Zipf (s = ${s.toFixed(2)})`,
                        data: frequencies,
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.15)',
                        borderWidth: 3,
                        pointBackgroundColor: '#818cf8',
                        pointBorderColor: '#1e1b4b',
                        pointHoverRadius: 6,
                        tension: 0.25,
                        fill: !isLogScale
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: { color: '#e2e8f0', font: { weight: 600 } }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        borderColor: '#4338ca',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            title: (items) => `Sıra (Rank): ${items[0].label}`,
                            label: (context) => {
                                const idx = context.dataIndex;
                                return [
                                    `Frekans: ${context.parsed.y.toLocaleString()} adet`,
                                    `Toplam Pay: %${percentages[idx]}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: isLogScale ? 'logarithmic' : 'category',
                        title: {
                            display: true,
                            text: isLogScale ? 'Sıra (Logaritmik Ölçek: log r)' : 'Sıralama (Rank r: 1, 2, 3...)',
                            color: '#94a3b8'
                        },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    y: {
                        type: isLogScale ? 'logarithmic' : 'linear',
                        title: {
                            display: true,
                            text: isLogScale ? 'Frekans (Logaritmik Ölçek: log f)' : 'Gözlemlenen Frekans / Sayı',
                            color: '#94a3b8'
                        },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    }
                }
            }
        });

        return { frequencies, percentages, harmonicSum };
    },

    /**
     * 2. METİN KELİME ANALİZİ GRAFİĞİ
     */
    renderTextAnalysis(canvasId, wordStats, isLogScale = false) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // İlk 25-30 kelimeyi göster
        const limit = Math.min(wordStats.length, 25);
        const topWords = wordStats.slice(0, limit);

        const labels = topWords.map((w, i) => `${i + 1}. "${w.word}"`);
        const actualCounts = topWords.map(w => w.count);

        // İdeal Zipf tahmini: f(1) / r
        const f1 = topWords[0] ? topWords[0].count : 1;
        const zipfPredictions = topWords.map((_, i) => Math.round(f1 / (i + 1)));

        if (this.instances.textAnalysis) {
            this.instances.textAnalysis.destroy();
        }

        this.instances.textAnalysis = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        type: 'bar',
                        label: 'Gerçek Kelime Frekansı',
                        data: actualCounts,
                        backgroundColor: 'rgba(56, 189, 248, 0.75)',
                        borderColor: '#0284c7',
                        borderRadius: 6,
                        borderWidth: 1,
                        order: 2
                    },
                    {
                        type: 'line',
                        label: 'İdeal Zipf Eğrisi (f₁ / r)',
                        data: zipfPredictions,
                        borderColor: '#f43f5e',
                        borderWidth: 2.5,
                        borderDash: [5, 4],
                        pointRadius: 4,
                        pointBackgroundColor: '#fda4af',
                        tension: 0.3,
                        order: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: { color: '#f1f5f9' }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        borderColor: '#0284c7',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            afterBody: (items) => {
                                const idx = items[0].dataIndex;
                                const actual = actualCounts[idx];
                                const expected = zipfPredictions[idx];
                                const diffPct = (((actual - expected) / expected) * 100).toFixed(1);
                                const sign = diffPct > 0 ? '+' : '';
                                return `İdealden Fark: ${sign}${diffPct}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: '#94a3b8',
                            font: { size: 11 },
                            maxRotation: 45,
                            minRotation: 30
                        }
                    },
                    y: {
                        type: isLogScale ? 'logarithmic' : 'linear',
                        title: {
                            display: true,
                            text: isLogScale ? 'Frekans (Log Ölçeği)' : 'Kelime Tekrar Sayısı',
                            color: '#94a3b8'
                        },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    }
                }
            }
        });
    },

    /**
     * 3. ŞEHİR NÜFUSLARI GRAFİĞİ
     */
    renderCityPopulations(canvasId, cityDataset, isLogScale = false) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const data = cityDataset.data;
        const labels = data.map(c => `${c.rank}. ${c.name}`);
        const actualPops = data.map(c => c.actual);

        // Zipf kuralı: P_r = P_1 / r
        const P1 = data[0].actual;
        const zipfPops = data.map((_, i) => Math.round(P1 / (i + 1)));

        if (this.instances.cityPopulations) {
            this.instances.cityPopulations.destroy();
        }

        this.instances.cityPopulations = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        type: 'bar',
                        label: 'Gerçek Nüfus',
                        data: actualPops,
                        backgroundColor: 'rgba(16, 185, 129, 0.75)',
                        borderColor: '#059669',
                        borderRadius: 6,
                        borderWidth: 1,
                        order: 2
                    },
                    {
                        type: 'line',
                        label: 'İdeal Zipf Kuralı (P₁ / r)',
                        data: zipfPops,
                        borderColor: '#fbbf24',
                        borderWidth: 3,
                        pointBackgroundColor: '#fef08a',
                        pointBorderColor: '#78350f',
                        pointRadius: 4,
                        borderDash: [6, 4],
                        tension: 0.25,
                        order: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: { color: '#f1f5f9' }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        borderColor: '#10b981',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            label: (context) => {
                                return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} kişi`;
                            },
                            afterBody: (items) => {
                                const idx = items[0].dataIndex;
                                const actual = actualPops[idx];
                                const zipf = zipfPops[idx];
                                const ratio = (actual / zipf).toFixed(2);
                                return `Gerçek / Zipf Oranı: ${ratio}x`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: '#94a3b8',
                            font: { size: 11 },
                            maxRotation: 45,
                            minRotation: 30
                        }
                    },
                    y: {
                        type: isLogScale ? 'logarithmic' : 'linear',
                        title: {
                            display: true,
                            text: isLogScale ? 'Nüfus (Logaritmik Ölçek)' : 'Nüfus Miktarı',
                            color: '#94a3b8'
                        },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: {
                            callback: (value) => {
                                if (value >= 1000000) {
                                    return (value / 1000000).toFixed(1) + 'M';
                                } else if (value >= 1000) {
                                    return (value / 1000).toFixed(0) + 'K';
                                }
                                return value;
                            }
                        }
                    }
                }
            }
        });
    }
};

// Sayfa yüklendiğinde varsayılan ayarları etkinleştir
document.addEventListener('DOMContentLoaded', () => {
    ZipfCharts.initGlobalDefaults();
});
