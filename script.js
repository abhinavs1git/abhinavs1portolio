document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // 1. Mouse-Tracking Radial Background Glow
    // ----------------------------------------------------
    const glow = document.getElementById('glow-element');
    if (glow) {
        window.addEventListener('mousemove', (e) => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
    }

    // ----------------------------------------------------
    // 2. Scroll-Reveal Animation (Intersection Observer)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const observerOptions = {
        threshold: 0.05,
        rootMargin: "0px 0px -80px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ----------------------------------------------------
    // 3. Navigation Active Link Highlighting on Scroll
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // 4. Interactive Mockup Simulations
    // ----------------------------------------------------

    // A. Healthly - Kafka Pipeline Log Stream
    const logConsole = document.getElementById('kafka-stream-log');
    const kafkaNodes = {
        producer: document.getElementById('node-producer'),
        broker: document.getElementById('node-broker'),
        consumer: document.getElementById('node-consumer')
    };

    const patientNames = ["John Doe", "Jane Smith", "Alice Brown", "Bob Johnson", "Emily Davis"];
    const diseases = ["Hypertension", "Diabetes Typ-II", "Cardiomyopathy", "Asthma", "Hyperlipidemia"];
    const locations = ["Zone A", "Zone B", "Zone C", "Zone D"];

    function generateKafkaLogs() {
        if (!logConsole) return;
        
        let counter = 100;
        setInterval(() => {
            counter++;
            const name = patientNames[Math.floor(Math.random() * patientNames.length)];
            const disease = diseases[Math.floor(Math.random() * diseases.length)];
            const loc = locations[Math.floor(Math.random() * locations.length)];
            
            // Animate node sequence (Producer -> Broker -> Consumer)
            setTimeout(() => {
                highlightNode('producer');
            }, 0);
            
            setTimeout(() => {
                highlightNode('broker');
            }, 300);
            
            setTimeout(() => {
                highlightNode('consumer');
            }, 600);

            // Log entry
            const line = document.createElement('div');
            line.className = 'kafka-log-line';
            line.innerHTML = `<span style="color: #e59a18;">[TX-${counter}]</span> Ingested record for ${name} (${disease}) from ${loc}`;
            
            logConsole.appendChild(line);
            if (logConsole.children.length > 5) {
                logConsole.removeChild(logConsole.firstChild);
            }
            logConsole.scrollTop = logConsole.scrollHeight;

        }, 2200);
    }

    function highlightNode(nodeKey) {
        Object.keys(kafkaNodes).forEach(key => {
            if (kafkaNodes[key]) kafkaNodes[key].classList.remove('active');
        });
        if (kafkaNodes[nodeKey]) {
            kafkaNodes[nodeKey].classList.add('active');
            setTimeout(() => {
                kafkaNodes[nodeKey].classList.remove('active');
            }, 400);
        }
    }

    // B. Ganges Flood Mapping - Grid and Risk Cell Generator
    const mapGrid = document.getElementById('flood-map-grid');
    const rainfallWidget = document.getElementById('rainfall-widget');
    const riskWidget = document.getElementById('risk-widget');

    function initFloodMap() {
        if (!mapGrid) return;
        
        const cols = 6;
        const rows = 5;
        const total = cols * rows;
        mapGrid.innerHTML = ''; 

        for (let i = 0; i < total; i++) {
            const cell = document.createElement('div');
            cell.className = 'map-cell';
            
            const r = Math.floor(i / cols);
            const c = i % cols;
            
            if (r === c || r === c + 1) {
                cell.classList.add('water'); 
            } else if (Math.abs(r - c) === 2) {
                cell.classList.add('risk-high'); 
            } else if (Math.abs(r - c) === 3) {
                cell.classList.add('risk-med');
            } else {
                cell.classList.add('risk-low');
            }
            
            mapGrid.appendChild(cell);
        }

        // Animate risk cells periodically
        setInterval(() => {
            const cells = mapGrid.querySelectorAll('.map-cell:not(.water)');
            if (cells.length === 0) return;
            const randomCell = cells[Math.floor(Math.random() * cells.length)];
            
            randomCell.className = 'map-cell';
            const states = ['risk-high', 'risk-med', 'risk-low'];
            randomCell.classList.add(states[Math.floor(Math.random() * states.length)]);

            // Update stats widgets dynamically
            const rainfall = Math.floor(Math.random() * 150) + 150; 
            if(rainfallWidget) rainfallWidget.textContent = `${rainfall}mm`;
            
            if(riskWidget) {
                if (rainfall > 240) {
                    riskWidget.textContent = 'High';
                    riskWidget.style.color = '#ff5f56';
                } else if (rainfall > 180) {
                    riskWidget.textContent = 'Moderate';
                    riskWidget.style.color = '#ffbd2e';
                } else {
                    riskWidget.textContent = 'Low';
                    riskWidget.style.color = '#27c93f';
                }
            }
        }, 3000);
    }

    // C. E-commerce dashboard chart bars
    const chartContainer = document.getElementById('ecommerce-chart-container');
    const barData = [35, 60, 45, 80, 50, 75, 95, 65];

    function initEcommChart() {
        if (!chartContainer) return;
        chartContainer.innerHTML = '';
        
        barData.forEach((val, i) => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            if (i === 6) bar.classList.add('highlight'); 
            bar.style.height = '0%';
            chartContainer.appendChild(bar);

            setTimeout(() => {
                bar.style.height = `${val}%`;
            }, 100 * i);
        });

        // Loop periodic refresh simulation
        setInterval(() => {
            const bars = chartContainer.querySelectorAll('.chart-bar');
            bars.forEach((bar, i) => {
                const fluctuation = Math.floor(Math.random() * 20) - 10; 
                let newHeight = barData[i] + fluctuation;
                newHeight = Math.max(10, Math.min(100, newHeight));
                bar.style.height = `${newHeight}%`;
            });
        }, 4000);
    }

    // Initialize all mockups
    generateKafkaLogs();
    initFloodMap();
    initEcommChart();

    // ----------------------------------------------------
    // 5. Form Submission Mock Handling
    // ----------------------------------------------------
    const form = document.getElementById('estimation-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const submitBtnSvg = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = `
                <svg viewBox="0 0 24 24" style="animation: spin 1s linear infinite;">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="32" />
                </svg>
            `;
            
            if (!document.getElementById('spin-keyframes')) {
                const style = document.createElement('style');
                style.id = 'spin-keyframes';
                style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
                document.head.appendChild(style);
            }

            setTimeout(() => {
                alert(`Hi ${document.getElementById('form-name').value}, thanks for reaching out! This form submission is simulated. We will review your query and get in touch.`);
                form.reset();
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.innerHTML = submitBtnSvg;
            }, 1200);
        });
    }
});
