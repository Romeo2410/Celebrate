        // Wish storage array
        let wishes = [];

        // Character counter for textarea
        const wishText = document.getElementById('wishText');
        const charCount = document.getElementById('charCount');

        wishText.addEventListener('input', function () {
            const count = this.value.length;
            charCount.textContent = count;

            if (count > 450) {
                charCount.style.color = 'var(--primary)';
            } else {
                charCount.style.color = '#999';
            }
        });

        // Smooth scroll to timeline
        function scrollToTimeline() {
            const timeline = document.querySelector('.timeline');
            if (timeline) {
                timeline.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        // Flip card function
        function flipCard(card) {
            card.classList.toggle('flipped');
        }

        // Modal functions
        function openWishModal() {
            document.getElementById('wishModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeWishModal() {
            document.getElementById('wishModal').classList.remove('active');
            document.body.style.overflow = 'auto';
            document.getElementById('wishText').value = '';
        }

        function submitWish() {
            const wishTextArea = document.getElementById('wishText');
            const wishContent = wishTextArea.value.trim();

            if (wishContent) {
                // Add wish to array
                wishes.push({
                    text: wishContent,
                    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                });

                // Display the wish
                displayWishes();

                // Close modal and show success
                closeWishModal();
                showToast('💝 Your heartfelt wishes have been shared!');
                triggerCelebration();

                // Scroll to wishes section
                setTimeout(() => {
                    document.getElementById('wishesSection').scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 500);
            } else {
                showToast('Please write your wishes first! ✍️');
            }
        }

        // Display all wishes
        function displayWishes() {
            const wishesSection = document.getElementById('wishesSection');
            const wishesContainer = document.getElementById('wishesContainer');

            if (wishes.length > 0) {
                wishesSection.style.display = 'block';
                wishesContainer.innerHTML = '';

                wishes.forEach((wish, index) => {
                    const wishCard = document.createElement('div');
                    wishCard.className = 'wish-card';
                    wishCard.style.animationDelay = `${index * 0.1}s`;

                    wishCard.innerHTML = `
                        <div class="wish-text">"${wish.text}"</div>
                        <div class="wish-meta">
                            <span class="wish-author">From Rupak</span>
                            <span>${wish.date} <span class="wish-icon-small">💝</span></span>
                        </div>
                    `;

                    wishesContainer.appendChild(wishCard);
                });
            }
        }

        // Toast notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Celebration confetti
        function triggerCelebration() {
            const confettiContainer = document.getElementById('confetti');
            const colors = ['#d4af37', '#c9a961', '#ff6b6b', '#4ecdc4', '#ffe66d'];

            // Create 50 confetti pieces
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti-piece');
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

                confettiContainer.appendChild(confetti);

                // Remove confetti after animation
                setTimeout(() => {
                    confetti.remove();
                }, 3500);
            }

            showToast('🎉 Happy 25th Anniversary! 🎉');
        }

        // Close modal on outside click
        document.getElementById('wishModal').addEventListener('click', function (e) {
            if (e.target === this) {
                closeWishModal();
            }
        });

        // Smooth scroll behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Intersection Observer for timeline animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.timeline-item, .stat-item').forEach(el => {
            observer.observe(el);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function (e) {
            // Press 'W' to open wish modal
            if (e.key === 'w' || e.key === 'W') {
                if (!document.getElementById('wishModal').classList.contains('active')) {
                    openWishModal();
                }
            }
            // Press 'Escape' to close modal
            if (e.key === 'Escape') {
                closeWishModal();
            }
            // Press 'C' to celebrate
            if (e.key === 'c' || e.key === 'C') {
                triggerCelebration();
            }
        });

        // Add click animation to stats
        document.querySelectorAll('.stat-item').forEach(stat => {
            stat.addEventListener('click', function () {
                this.style.transform = 'scale(1.1) translateY(-10px)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-10px)';
                }, 200);
            });
        });

        // Auto-trigger celebration on page load after delay
        setTimeout(() => {
            triggerCelebration();
        }, 1500);
