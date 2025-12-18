// Smooth Scroll Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const progressHeight = document.querySelector('.progress-container').offsetHeight;
        const offset = headerHeight + progressHeight;
        const targetPosition = section.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll to Gameplay Function
function scrollToGameplay() {
    const gameplaySection = document.getElementById('gameplay');
    if (gameplaySection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const progressHeight = document.querySelector('.progress-container').offsetHeight;
        const offset = headerHeight + progressHeight + 20;
        const targetPosition = gameplaySection.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll to Step 3: Discard a Tile Function
function scrollToStep3Discard(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }
    
    // First, scroll to gameplay section to ensure it's in view
    const gameplaySection = document.getElementById('gameplay');
    if (gameplaySection) {
        const header = document.querySelector('.header');
        const progressContainer = document.querySelector('.progress-container');
        const headerHeight = header ? header.offsetHeight : 0;
        const progressHeight = progressContainer ? progressContainer.offsetHeight : 0;
        const offset = headerHeight + progressHeight + 20;
        
        const gameplayRect = gameplaySection.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const gameplayPosition = gameplayRect.top + scrollTop - offset;
        
        window.scrollTo({
            top: Math.max(0, gameplayPosition),
            behavior: 'smooth'
        });
        
        // Then, after a short delay, scroll to Step 3
        setTimeout(() => {
            const step3Element = document.getElementById('step3-discard');
            if (step3Element) {
                const step3Rect = step3Element.getBoundingClientRect();
                const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const step3Position = step3Rect.top + currentScrollTop - offset;
                
                window.scrollTo({
                    top: Math.max(0, step3Position),
                    behavior: 'smooth'
                });
            }
        }, 300); // Wait for gameplay section scroll to start
    } else {
        // Fallback: direct scroll to Step 3 if gameplay section not found
        const step3Element = document.getElementById('step3-discard');
        if (step3Element) {
            const header = document.querySelector('.header');
            const progressContainer = document.querySelector('.progress-container');
            const headerHeight = header ? header.offsetHeight : 0;
            const progressHeight = progressContainer ? progressContainer.offsetHeight : 0;
            const offset = headerHeight + progressHeight + 20;
            
            const step3Rect = step3Element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const step3Position = step3Rect.top + scrollTop - offset;
            
            window.scrollTo({
                top: Math.max(0, step3Position),
                behavior: 'smooth'
            });
        }
    }
    
    return false; // Prevent default link behavior
}

// Scroll to Top Function
function scrollToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    // 清除所有之前的隐藏定时器
    if (backToTopTimeout) {
        clearTimeout(backToTopTimeout);
        backToTopTimeout = null;
    }
    
    // 标记用户点击了回到顶部按钮
    // 这个标记会让按钮在顶部保持可见，直到用户向下滚动超过300px
    userClickedBackToTop = true;
    isScrollingToTop = true;
    maxScrollAfterClick = 0; // 重置最大滚动位置
    
    // 立即强制显示按钮，并确保按钮位置在右下角
    backToTop.classList.add('visible');
    // 确保按钮位置始终在右下角（防止任何代码改变位置）
    backToTop.style.position = 'fixed';
    backToTop.style.bottom = '30px';
    backToTop.style.right = '30px';
    backToTop.style.left = 'auto';
    backToTop.style.top = 'auto';
    
    // 执行平滑滚动到顶部
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // 滚动完成后清除滚动标记（但保持 userClickedBackToTop 标记）
    // 按钮会在顶部保持可见，直到用户向下滚动超过300px
    setTimeout(() => {
        isScrollingToTop = false;
        maxScrollAfterClick = 0; // 滚动完成后重置最大滚动位置，从顶部开始计算
        // 确保按钮仍然可见且位置正确
        if (backToTop) {
            backToTop.classList.add('visible');
            // 再次确保按钮位置在右下角
            backToTop.style.position = 'fixed';
            backToTop.style.bottom = '30px';
            backToTop.style.right = '30px';
            backToTop.style.left = 'auto';
            backToTop.style.top = 'auto';
        }
    }, 800); // 等待滚动动画完成
}

// Setup Claim Modal Handlers
function setupClaimModalHandlers() {
    const claimLinks = document.querySelectorAll('.claim-link');
    const modals = document.querySelectorAll('.claim-modal');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // 打开弹窗
    claimLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                // 关闭其他弹窗
                modals.forEach(m => {
                    if (m !== modal) {
                        m.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
                
                // 打开目标弹窗
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // 关闭弹窗 - 点击关闭按钮
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const modal = btn.closest('.claim-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // 关闭弹窗 - 点击遮罩层
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            e.stopPropagation();
            const modal = overlay.closest('.claim-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // 关闭弹窗 - ESC键
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
}

// Setup Claim Card Click Handlers
function setupClaimCardHandlers() {
    const claimCards = document.querySelectorAll('.claim-card');
    claimCards.forEach(card => {
        const header = card.querySelector('.claim-header');
        if (header) {
            // 只在点击header时触发展开/收起
            header.style.cursor = 'pointer';
            header.addEventListener('click', function(e) {
                e.stopPropagation();
                card.classList.toggle('expanded');
            });
            
            // 阻止内容区域的点击事件冒泡
            const content = card.querySelector('.claim-content');
            if (content) {
                content.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            }
        }
    });
}

// Setup Step Card Click Handlers
function setupStepCardHandlers() {
    const stepCards = document.querySelectorAll('.step-card.collapsible');
    stepCards.forEach(card => {
        const header = card.querySelector('.step-header');
        if (header) {
            // 只在点击header时触发展开/收起
            header.style.cursor = 'pointer';
            header.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // 如果点击的是步骤1、2、3（step-group），则联动展开/折叠
                if (card.classList.contains('step-group')) {
                    const allGroupCards = document.querySelectorAll('.step-card.collapsible.step-group');
                    const isExpanded = card.classList.contains('expanded');
                    
                    allGroupCards.forEach(groupCard => {
                        if (isExpanded) {
                            groupCard.classList.remove('expanded');
                        } else {
                            groupCard.classList.add('expanded');
                        }
                    });
                } else {
                    // 步骤4独立展开/折叠
                    card.classList.toggle('expanded');
                }
            });
            
            // 阻止内容区域的点击事件冒泡
            const content = card.querySelector('.step-content');
            if (content) {
                content.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            }
        }
    });
}

// Update Progress Bar
function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const progress = (scrollTop / documentHeight) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// Check Section Visibility
function checkSectionVisibility() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.7;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < triggerPoint && rect.bottom > 0) {
            section.classList.add('visible');
        }
    });
}

// Show/Hide Back to Top Button
let backToTopTimeout = null;
let isScrollingToTop = false; // 标记是否正在滚动到顶部
let userClickedBackToTop = false; // 标记用户是否点击过回到顶部按钮
let maxScrollAfterClick = 0; // 记录点击按钮后的最大滚动位置

function toggleBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 清除之前的定时器
    if (backToTopTimeout) {
        clearTimeout(backToTopTimeout);
        backToTopTimeout = null;
    }
    
    // 如果正在滚动到顶部，强制显示按钮
    if (isScrollingToTop) {
        backToTop.classList.add('visible');
        // 确保按钮位置在右下角
        backToTop.style.position = 'fixed';
        backToTop.style.bottom = '30px';
        backToTop.style.right = '30px';
        backToTop.style.left = 'auto';
        return;
    }
    
    // 如果用户点击过回到顶部按钮（且滚动已完成）
    if (userClickedBackToTop) {
        // 更新最大滚动位置（只记录向下滚动的最大距离）
        if (scrollTop > maxScrollAfterClick) {
            maxScrollAfterClick = scrollTop;
        }
        
        // 如果用户从顶部向下滚动超过300px，清除标记并隐藏按钮
        if (maxScrollAfterClick > 300) {
            // 用户明确向下滚动超过300px，清除标记并隐藏按钮
            userClickedBackToTop = false;
            maxScrollAfterClick = 0;
            backToTop.classList.remove('visible');
        } else {
            // 在顶部附近（滚动距离小于300px），保持按钮可见
            backToTop.classList.add('visible');
            // 确保按钮位置在右下角
            backToTop.style.position = 'fixed';
            backToTop.style.bottom = '30px';
            backToTop.style.right = '30px';
            backToTop.style.left = 'auto';
        }
        return;
    }
    
    // 正常情况：根据滚动位置显示或隐藏
    if (scrollTop > 300) {
        // 滚动超过300px，显示按钮
        backToTop.classList.add('visible');
        // 确保按钮位置在右下角
        backToTop.style.position = 'fixed';
        backToTop.style.bottom = '30px';
        backToTop.style.right = '30px';
        backToTop.style.left = 'auto';
    } else if (scrollTop < 50) {
        // 在顶部附近，延迟隐藏按钮（只有没有点击过按钮时才隐藏）
        backToTopTimeout = setTimeout(() => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // 只有在顶部且用户没有点击过按钮时才隐藏
            if (currentScrollTop < 50 && !userClickedBackToTop) {
                backToTop.classList.remove('visible');
            }
            backToTopTimeout = null;
        }, 1500); // 延迟1.5秒隐藏
    }
}

// Add Tile Click Animation
function addTileClickAnimation() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', function(e) {
            // 阻止事件冒泡，避免触发父元素的点击事件
            e.stopPropagation();
            
            this.style.transform = 'translateY(-12px) scale(1.15) rotate(5deg)';
            this.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
}

// Add Interactive Tile Hover Effects
function addTileHoverEffects() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            ripple.style.borderRadius = '8px';
            ripple.style.background = 'rgba(28, 176, 246, 0.2)';
            ripple.style.top = '0';
            ripple.style.left = '0';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add Ripple Animation Keyframes
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add Card Flip Animation
function addCardFlipAnimation() {
    const cards = document.querySelectorAll('.tip-card, .step-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// Update Navigation Indicator Position
function updateNavIndicator() {
    const indicator = document.querySelector('.nav-indicator');
    const activeLink = document.querySelector('.nav-link.active');
    const nav = document.querySelector('.nav');
    
    if (!indicator || !nav) return;
    
    if (activeLink) {
        const navRect = nav.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        
        // Calculate position relative to nav container
        const left = linkRect.left - navRect.left;
        const width = linkRect.width;
        
        // Update indicator position with smooth animation
        indicator.style.left = `${left}px`;
        indicator.style.width = `${width}px`;
        indicator.style.opacity = '1';
    } else {
        // Hide indicator if no active link
        indicator.style.opacity = '0';
    }
}

// Add Navigation Active State
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const windowHeight = window.innerHeight;
    const scrollPosition = window.pageYOffset + windowHeight / 2;
    let activeFound = false;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                    activeFound = true;
                }
            });
        }
    });
    
    // If no section is active, check if we're at the top (Introduction)
    if (!activeFound && scrollPosition < sections[0]?.offsetTop) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#intro') {
                link.classList.add('active');
            }
        });
    }
    
    // Update indicator position after active link is determined
    updateNavIndicator();
}

// Add Active State CSS for Nav Links (removed white background, only for tracking)
function addActiveNavStyle() {
    // No longer adding active styles - the indicator handles visual feedback
    // Active class is still used for tracking which link is active
}

// Add Parallax Effect to Hero Section
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
            }
        });
    }
}

// Add Typing Animation to Hero Title and Subtitle
function addTypingAnimation() {
    const titleTextElement = document.getElementById('hero-title-text');
    const subtitleTextElement = document.getElementById('hero-subtitle-text');
    const titleCursor = document.querySelector('.hero-title .typing-cursor');
    const subtitleCursor = document.querySelector('.hero-subtitle .typing-cursor');
    
    if (!titleTextElement || !subtitleTextElement) return;
    
    const titleText = 'Learn Guangdong Mahjong';
    const subtitleText = 'Master the art of this classic Chinese tile game';
    
    // Reset
    titleTextElement.textContent = '';
    subtitleTextElement.textContent = '';
    
    // Show cursors initially
    if (titleCursor) titleCursor.classList.remove('hidden');
    if (subtitleCursor) subtitleCursor.classList.add('hidden');
    
    let titleIndex = 0;
    let subtitleIndex = 0;
    let isTypingTitle = true;
    
    function typeTitle() {
        if (titleIndex < titleText.length) {
            titleTextElement.textContent += titleText.charAt(titleIndex);
            titleIndex++;
            setTimeout(typeTitle, 80); // 打字速度：每80ms一个字符
        } else {
            // Title完成，隐藏title光标，显示subtitle光标，开始打subtitle
            if (titleCursor) titleCursor.classList.add('hidden');
            if (subtitleCursor) subtitleCursor.classList.remove('hidden');
            setTimeout(() => {
                isTypingTitle = false;
                typeSubtitle();
            }, 300); // 短暂停顿后开始subtitle
        }
    }
    
    function typeSubtitle() {
        if (subtitleIndex < subtitleText.length) {
            subtitleTextElement.textContent += subtitleText.charAt(subtitleIndex);
            subtitleIndex++;
            setTimeout(typeSubtitle, 60); // 打字速度：每60ms一个字符
        } else {
            // Subtitle完成，隐藏光标
            if (subtitleCursor) {
                setTimeout(() => {
                    subtitleCursor.classList.add('hidden');
                }, 1000); // 1秒后隐藏光标
            }
        }
    }
    
    // 延迟开始，让页面先加载
    setTimeout(() => {
        typeTitle();
    }, 500);
}

// Add Counter Animation for Numbers
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Add Intersection Observer for Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add Click Effect to Buttons
function addButtonClickEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .back-to-top');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add Tile Stack Animation
function animateTileStack() {
    const tileStacks = document.querySelectorAll('.tile-stack .tile');
    tileStacks.forEach((tile, index) => {
        tile.style.setProperty('--i', index);
    });
}

// Add Winning Hand Demo Animation
function animateWinningHand() {
    const handGroups = document.querySelectorAll('.hand-group');
    handGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Add Seat Diagram Animation
function animateSeatDiagram() {
    const seats = document.querySelectorAll('.seat');
    seats.forEach((seat, index) => {
        seat.style.opacity = '0';
        seat.style.transform = 'scale(0)';
        seat.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            seat.style.opacity = '1';
            seat.style.transform = 'scale(1)';
        }, index * 150);
    });
}

// Add Wall Visual Animation
function animateWallVisual() {
    const wallSegments = document.querySelectorAll('.wall-segment');
    wallSegments.forEach((segment, index) => {
        segment.style.opacity = '0';
        segment.style.transform = 'translateY(20px)';
        segment.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            segment.style.opacity = '1';
            segment.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize All Functions
// 确保回到顶部按钮位置正确
function ensureBackToTopPosition() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        // 强制设置按钮位置在右下角
        backToTop.style.position = 'fixed';
        backToTop.style.bottom = '30px';
        backToTop.style.right = '30px';
        backToTop.style.left = 'auto';
        backToTop.style.top = 'auto';
        backToTop.style.margin = '0';
    }
}

// Setup Bamboo Growth Animation
function setupBambooAnimation() {
    const bambooGroup = document.querySelector('.bamboo-group');
    if (!bambooGroup) return;
    
    const bambooTiles = bambooGroup.querySelectorAll('.tile-img-container[data-tile^="bamboo"]');
    const animationContainer = bambooGroup.querySelector('.bamboo-animation-container');
    
    if (!animationContainer) return;
    
    let isAnimating = false;
    let animationTimeout = null;
    
    // Cleanup function
    function cleanupAnimation() {
        if (animationTimeout) {
            clearTimeout(animationTimeout);
            animationTimeout = null;
        }
        animationContainer.innerHTML = '';
        animationContainer.style.opacity = '1';
        animationContainer.style.transition = '';
        animationContainer.style.transform = '';
        bambooGroup.classList.remove('animating');
        isAnimating = false;
    }
    
    bambooTiles.forEach(tile => {
        tile.style.cursor = 'pointer';
        
        tile.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Prevent multiple animations
            if (isAnimating) return;
            
            // Cleanup previous animation
            cleanupAnimation();
            
            isAnimating = true;
            
            // Use requestAnimationFrame for better performance
            requestAnimationFrame(() => {
                // Get container dimensions
                const containerRect = bambooGroup.getBoundingClientRect();
                const containerWidth = containerRect.width;
                const containerHeight = containerRect.height;
                
                // Fixed 7 bamboos for every click
                const numBamboos = 7;
                const bambooSpacing = containerWidth / (numBamboos + 1);
                const maxHeight = Math.min(containerHeight * 0.7, 200); // Limit max height
                const minHeight = containerHeight * 0.35;
                
                // Create bamboo stalks with staggered heights
                for (let i = 0; i < numBamboos; i++) {
                    const positionRatio = (i + 1) / (numBamboos + 1);
                    const centerDistance = Math.abs(positionRatio - 0.5) * 2;
                    const heightVariation = 1 - (centerDistance * 0.25);
                    
                    const bambooHeight = minHeight + (maxHeight - minHeight) * heightVariation * (0.75 + Math.random() * 0.25);
                    const bambooX = bambooSpacing * (i + 1);
                    const delay = i * 80; // Staggered delay
                    
                    const bamboo = createBambooStalk(bambooX, bambooHeight, delay);
                    animationContainer.appendChild(bamboo);
                }
                
                // Force reflow before starting animation
                void animationContainer.offsetWidth;
                
                // Start animation
                bambooGroup.classList.add('animating');
                
                // Cleanup after animation completes
                animationTimeout = setTimeout(() => {
                    animationContainer.style.transition = 'opacity 0.8s ease-out';
                    animationContainer.style.opacity = '0';
                    
                    animationTimeout = setTimeout(() => {
                        cleanupAnimation();
                    }, 800);
                }, 2500);
            });
        });
    });
}

// Create a single bamboo stalk with leaves (optimized)
function createBambooStalk(x, height, delay) {
    const stalk = document.createElement('div');
    stalk.className = 'bamboo-stalk';
    stalk.style.left = (x - 5) + 'px';
    stalk.style.setProperty('--bamboo-height', height + 'px');
    stalk.style.animationDelay = delay + 'ms';
    stalk.style.willChange = 'transform, opacity'; // GPU acceleration
    
    // Reduce nodes for better performance
    const nodeSpacing = 40;
    const numNodes = Math.floor(height / nodeSpacing);
    // Limit nodes to max 5 for performance
    const actualNodes = Math.min(numNodes, 5);
    for (let i = 1; i < actualNodes; i++) {
        const node = document.createElement('div');
        node.className = 'bamboo-node';
        node.style.bottom = (i * nodeSpacing) + 'px';
        stalk.appendChild(node);
    }
    
    // Random number of leaves: 1-3 leaves per bamboo
    const numLeaves = 1 + Math.floor(Math.random() * 3);
    const leafPositions = [];
    
    // Distribution based on leaf count - higher up for more natural look
    if (numLeaves === 1) {
        leafPositions.push(height * (0.5 + Math.random() * 0.3));
    } else if (numLeaves === 2) {
        leafPositions.push(height * 0.45, height * 0.75);
    } else {
        leafPositions.push(height * 0.4, height * 0.6, height * 0.85);
    }
    
    leafPositions.forEach((leafHeight, i) => {
        const leaf = document.createElement('div');
        leaf.className = 'bamboo-leaf';
        
        // Leaf side: alternate but also randomize first side
        const firstSide = Math.random() > 0.5 ? 1 : -1;
        const leafSide = i % 2 === 0 ? firstSide : -firstSide;
        
        // Rotation: 30-45 degrees away from stalk
        const baseRotation = 35 + Math.random() * 15;
        const leafRotation = leafSide * baseRotation;
        
        // Position leaves so their bottom center (tip/base) is exactly on the bamboo stalk
        const leafWidth = 20; // Matches CSS
        
        // Relative to the stalk (which is ~10px wide, centered at 5px)
        const stalkCenter = 5;
        const stalkHalfWidth = 4;
        const leafLeft = stalkCenter + (leafSide * stalkHalfWidth) - (leafWidth / 2);
        
        leaf.style.bottom = leafHeight + 'px';
        leaf.style.left = leafLeft + 'px';
        leaf.style.setProperty('--leaf-rotation', leafRotation + 'deg');
        leaf.style.animationDelay = (delay + 500 + i * 150) + 'ms';
        leaf.style.willChange = 'transform, opacity';
        
        // Initial state for animation
        leaf.style.transform = `scale(0) rotate(${leafRotation}deg)`;
        
        stalk.appendChild(leaf);
    });
    
    // Subtle width variation
    const widthVariation = 0.95 + Math.random() * 0.1;
    stalk.style.width = (10 * widthVariation) + 'px';
    
    return stalk;
}

// Setup Coin Rain Animation
function setupCoinAnimation() {
    const characterGroup = document.querySelector('.character-group');
    if (!characterGroup) return;
    
    const characterTiles = characterGroup.querySelectorAll('.tile-img-container[data-tile^="char"]');
    const animationContainer = characterGroup.querySelector('.coin-animation-container');
    
    if (!animationContainer) return;
    
    let isAnimating = false;
    let animationTimeout = null;
    let activeCoins = [];
    
    // Cleanup function
    function cleanupAnimation() {
        if (animationTimeout) {
            clearTimeout(animationTimeout);
            animationTimeout = null;
        }
        
        // Remove all coins
        activeCoins.forEach(coin => {
            if (coin.parentNode) {
                coin.remove();
            }
        });
        activeCoins = [];
        
        animationContainer.innerHTML = '';
        animationContainer.style.opacity = '1';
        animationContainer.style.transition = '';
        characterGroup.classList.remove('animating');
        isAnimating = false;
    }
    
    characterTiles.forEach(tile => {
        tile.style.cursor = 'pointer';
        
        tile.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Prevent multiple animations
            if (isAnimating) return;
            
            // Cleanup previous animation
            cleanupAnimation();
            
            isAnimating = true;
            
            // Use requestAnimationFrame for better performance
            requestAnimationFrame(() => {
                // Get container dimensions
                const containerRect = characterGroup.getBoundingClientRect();
                const containerWidth = containerRect.width;
                const containerHeight = containerRect.height;
                
                // Increase coin count for rain-like effect (25-35 coins)
                const numCoins = 25 + Math.floor(Math.random() * 11);
                
                // Create coins with staggered timing for continuous rain effect
                for (let i = 0; i < numCoins; i++) {
                    // Stagger timing more evenly for continuous rain
                    const delay = i * 50 + Math.random() * 30;
                    const coin = createCoin(containerWidth, containerHeight, delay);
                    animationContainer.appendChild(coin);
                    activeCoins.push(coin);
                }
                
                // Force reflow before starting animation
                void animationContainer.offsetWidth;
                
                // Start animation
                characterGroup.classList.add('animating');
                
                // Cleanup after animation completes (longer for rain effect)
                animationTimeout = setTimeout(() => {
                    cleanupAnimation();
                }, 3000);
            });
        });
    });
}

// Create a single coin with random properties (vertical fall, rain-like)
function createCoin(containerWidth, containerHeight, delay) {
    const coin = document.createElement('div');
    coin.className = 'coin';
    
    // Start from top area (most of container width) - rain starts from above
    // Cover 80% of container width from top (10%-90% of width)
    const startX = containerWidth * (0.1 + Math.random() * 0.8);
    const startY = -30 - Math.random() * 40; // Start above container with variation
    
    // End at same X position (vertical fall) - slight random variation for natural look
    const endX = startX + (Math.random() - 0.5) * 20; // Small random drift (±10px)
    const endY = containerHeight + 30 + Math.random() * 20;
    
    // Random animation properties - faster for rain effect
    const baseDuration = 1.5;
    const duration = baseDuration + Math.random() * 0.6; // 1.5-2.1 seconds (faster)
    const rotationSpeed = 0.5 + Math.random() * 0.3; // 0.5-0.8 seconds per rotation (faster)
    
    // Set CSS custom properties for animation (vertical path)
    coin.style.setProperty('--coin-start-x', (startX - 14) + 'px'); // Center coin (14px = half of 28px)
    coin.style.setProperty('--coin-end-x', (endX - 14) + 'px');
    coin.style.setProperty('--coin-end-y', endY + 'px');
    coin.style.setProperty('--coin-duration', duration + 's');
    coin.style.setProperty('--coin-rotation-speed', rotationSpeed + 's');
    
    // Position at top initially
    coin.style.left = (startX - 14) + 'px';
    coin.style.top = startY + 'px';
    coin.style.animationDelay = delay + 'ms';
    
    // Random size variation (slightly smaller for rain density)
    const scale = 0.8 + Math.random() * 0.3;
    coin.style.transform = `scale(${scale}) translateZ(0)`;
    
    // Random z-index for depth
    coin.style.zIndex = Math.floor(Math.random() * 5) + 1;
    
    return coin;
}

// Setup Ripple Animation
function setupRippleAnimation() {
    const dotsGroup = document.querySelector('.dots-group');
    if (!dotsGroup) return;
    
    const dotsTiles = dotsGroup.querySelectorAll('.tile-img-container[data-tile^="dot"]');
    const animationContainer = dotsGroup.querySelector('.ripple-animation-container');
    
    if (!animationContainer) return;
    
    let isAnimating = false;
    let animationTimeout = null;
    let activeRipples = [];
    
    // Cleanup function
    function cleanupAnimation() {
        if (animationTimeout) {
            clearTimeout(animationTimeout);
            animationTimeout = null;
        }
        
        // Remove all ripples
        activeRipples.forEach(ripple => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        });
        activeRipples = [];
        
        animationContainer.innerHTML = '';
        dotsGroup.classList.remove('animating');
        isAnimating = false;
    }
    
    dotsTiles.forEach(tile => {
        tile.style.cursor = 'pointer';
        
        tile.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Prevent multiple animations
            if (isAnimating) return;
            
            // Cleanup previous animation
            cleanupAnimation();
            
            isAnimating = true;
            
            // Use requestAnimationFrame for better performance
            requestAnimationFrame(() => {
                // Get container dimensions
                const containerRect = dotsGroup.getBoundingClientRect();
                const containerWidth = containerRect.width;
                const containerHeight = containerRect.height;
                
                // Get clicked tile position relative to container
                const tileRect = tile.getBoundingClientRect();
                const startX = (tileRect.left + tileRect.width / 2) - containerRect.left;
                const startY = (tileRect.top + tileRect.height / 2) - containerRect.top;
                
                // Create multi-colored ripples (reduced count for cleaner look)
                const numRipples = 3 + Math.floor(Math.random() * 2);
                const colors = ['#1cb0f6', '#ff4b4b', '#2eb33e']; // Blue, Red, Green
                
                for (let i = 0; i < numRipples; i++) {
                    const color = colors[i % colors.length];
                    const ripple = createRipple(startX, startY, containerWidth, containerHeight, i * 250, color);
                    animationContainer.appendChild(ripple);
                    activeRipples.push(ripple);
                }
                
                // Create shimmering particles (reduced for cleaner look)
                const numParticles = 8 + Math.floor(Math.random() * 6);
                for (let i = 0; i < numParticles; i++) {
                    const particle = createDotParticle(startX, startY, colors[i % colors.length]);
                    animationContainer.appendChild(particle);
                    activeRipples.push(particle);
                }
                
                // Force reflow
                void animationContainer.offsetWidth;
                
                dotsGroup.classList.add('animating');
                
                const maxDelay = (numRipples - 1) * 250;
                animationTimeout = setTimeout(() => {
                    cleanupAnimation();
                }, maxDelay + 3000);
            });
        });
    });
}

// Create a single ripple with color
function createRipple(x, y, containerWidth, containerHeight, delay, color) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    
    const maxSize = Math.max(containerWidth, containerHeight) * 1.5;
    const rippleSize = maxSize * (0.6 + Math.random() * 0.4);
    const duration = 2.5 + Math.random() * 1.0;
    
    ripple.style.setProperty('--ripple-size', rippleSize + 'px');
    ripple.style.setProperty('--ripple-duration', duration + 's');
    ripple.style.setProperty('--ripple-color', color);
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.animationDelay = delay + 'ms';
    
    return ripple;
}

// Create a shimmering dot particle
function createDotParticle(x, y, color) {
    const particle = document.createElement('div');
    particle.className = 'dot-particle';
    
    const size = 4 + Math.random() * 6;
    const duration = 1.5 + Math.random() * 1.5;
    const delay = Math.random() * 500;
    
    // Random trajectory
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 150;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.backgroundColor = color;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    particle.style.animation = `dotParticleFade ${duration}s cubic-bezier(0.1, 0.8, 0.3, 1) ${delay}ms forwards`;
    
    return particle;
}

// Setup Wind Animation
function setupWindAnimation() {
    const windGroup = document.querySelector('.wind-group');
    if (!windGroup) return;
    
    const windTiles = windGroup.querySelectorAll('.tile-img-container[data-tile^="wind"]');
    const animationContainer = windGroup.querySelector('.wind-animation-container');
    
    if (!animationContainer) return;
    
    let isAnimating = false;
    let animationTimeout = null;
    let activeParticles = [];
    
    // Cleanup function
    function cleanupAnimation() {
        if (animationTimeout) {
            clearTimeout(animationTimeout);
            animationTimeout = null;
        }
        
        // Remove all particles
        activeParticles.forEach(particle => {
            if (particle.parentNode) {
                particle.remove();
            }
        });
        activeParticles = [];
        
        animationContainer.innerHTML = '';
        windGroup.classList.remove('animating');
        isAnimating = false;
    }
    
    windTiles.forEach(tile => {
        tile.style.cursor = 'pointer';
        
        tile.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (isAnimating) return;
            cleanupAnimation();
            isAnimating = true;
            
            const windType = tile.getAttribute('data-tile').split('-')[1]; // east, south, west, north
            
            requestAnimationFrame(() => {
                const containerRect = windGroup.getBoundingClientRect();
                const containerWidth = containerRect.width;
                const containerHeight = containerRect.height;
                
                // Create wind streaks (long elegant lines)
                const numStreaks = 4 + Math.floor(Math.random() * 3);
                for (let i = 0; i < numStreaks; i++) {
                    const streak = createWindStreak(containerWidth, containerHeight, i * 150, windType);
                    animationContainer.appendChild(streak);
                    activeParticles.push(streak);
                }
                
                // Create wind leaves/petals (small swirling bits)
                const numLeaves = 8 + Math.floor(Math.random() * 6);
                for (let i = 0; i < numLeaves; i++) {
                    const leaf = createWindLeaf(containerWidth, containerHeight, i * 100, windType);
                    animationContainer.appendChild(leaf);
                    activeParticles.push(leaf);
                }
                
                void animationContainer.offsetWidth;
                windGroup.classList.add('animating');
                
                animationTimeout = setTimeout(() => {
                    cleanupAnimation();
                }, 4500); // Wait for all animations to finish
            });
        });
    });
}

// Create an elegant wind streak
function createWindStreak(width, height, delay, type) {
    const streak = document.createElement('div');
    streak.className = 'wind-streak';
    
    let startX, startY, endX, endY;
    const length = 150 + Math.random() * 100;
    
    if (type === 'east') { // Right to Left (Opposite for animation)
        startX = width + length;
        startY = height * (0.2 + Math.random() * 0.6);
        endX = -length;
        endY = startY + (Math.random() - 0.5) * 100;
    } else if (type === 'west') { // Left to Right
        startX = -length;
        startY = height * (0.2 + Math.random() * 0.6);
        endX = width + length;
        endY = startY + (Math.random() - 0.5) * 100;
    } else if (type === 'north') { // Top to Bottom
        startX = width * (0.2 + Math.random() * 0.6);
        startY = -length;
        endX = startX + (Math.random() - 0.5) * 100;
        endY = height + length;
    } else { // south, Bottom to Top
        startX = width * (0.2 + Math.random() * 0.6);
        startY = height + length;
        endX = startX + (Math.random() - 0.5) * 100;
        endY = -length;
    }
    
    streak.style.width = (type === 'north' || type === 'south' ? '2px' : length + 'px');
    streak.style.height = (type === 'north' || type === 'south' ? length + 'px' : '2px');
    streak.style.setProperty('--wind-start-x', startX + 'px');
    streak.style.setProperty('--wind-start-y', startY + 'px');
    streak.style.setProperty('--wind-end-x', endX + 'px');
    streak.style.setProperty('--wind-end-y', endY + 'px');
    streak.style.animationDelay = delay + 'ms';
    streak.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';
    
    return streak;
}

// Create a small swirling leaf/petal
function createWindLeaf(width, height, delay, type) {
    const leaf = document.createElement('div');
    leaf.className = 'wind-leaf';
    
    let startX, startY, endX, endY;
    
    if (type === 'east') { // Right to Left
        startX = width + 20;
        startY = Math.random() * height;
        endX = -20;
        endY = startY + (Math.random() - 0.5) * height;
    } else if (type === 'west') { // Left to Right
        startX = -20;
        startY = Math.random() * height;
        endX = width + 20;
        endY = startY + (Math.random() - 0.5) * height;
    } else if (type === 'north') {
        startX = Math.random() * width;
        startY = -20;
        endX = startX + (Math.random() - 0.5) * width;
        endY = height + 20;
    } else { // south
        startX = Math.random() * width;
        startY = height + 20;
        endX = startX + (Math.random() - 0.5) * width;
        endY = -20;
    }
    
    const size = 6 + Math.random() * 8;
    leaf.style.width = size + 'px';
    leaf.style.height = size + 'px';
    leaf.style.setProperty('--wind-start-x', startX + 'px');
    leaf.style.setProperty('--wind-start-y', startY + 'px');
    leaf.style.setProperty('--wind-end-x', endX + 'px');
    leaf.style.setProperty('--wind-end-y', endY + 'px');
    leaf.style.animationDelay = delay + 'ms';
    leaf.style.animationDuration = (3 + Math.random() * 2) + 's';
    
    // Randomize leaf color
    if (type === 'east' || type === 'south') {
        // Spring/Summer: Green and Pink
        leaf.style.background = Math.random() > 0.5 ? '#98fb98' : '#ffb7c5';
    } else if (type === 'west') {
        // Autumn: Gold and Orange
        leaf.style.background = Math.random() > 0.5 ? '#ffb347' : '#ffcc33';
    } else { // north
        // Winter: Light Blue and Sky Blue (No white)
        leaf.style.background = Math.random() > 0.5 ? '#add8e6' : '#87ceeb';
    }
    
    return leaf;
}

// Setup Winning Hand Tile Switching Animation
function setupWinningHandAnimation() {
    // Define different pairs (2 identical tiles)
    const pairs = [
        ['tiles/D1.png', 'tiles/D1.png'],
        ['tiles/B2.png', 'tiles/B2.png'],
        ['tiles/C3.png', 'tiles/C3.png'],
        ['tiles/D4.png', 'tiles/D4.png'],
        ['tiles/B5.png', 'tiles/B5.png'],
        ['tiles/C6.png', 'tiles/C6.png'],
        ['tiles/D7.png', 'tiles/D7.png'],
        ['tiles/B8.png', 'tiles/B8.png'],
        ['tiles/C9.png', 'tiles/C9.png'],
        ['tiles/R.png', 'tiles/R.png'],
        ['tiles/F.png', 'tiles/F.png'],
        ['tiles/WH.png', 'tiles/WH.png']
    ];
    
    // Define different sequences (3 consecutive tiles)
    const sequences = [
        ['tiles/B1.png', 'tiles/B2.png', 'tiles/B3.png'],
        ['tiles/B2.png', 'tiles/B3.png', 'tiles/B4.png'],
        ['tiles/B3.png', 'tiles/B4.png', 'tiles/B5.png'],
        ['tiles/B4.png', 'tiles/B5.png', 'tiles/B6.png'],
        ['tiles/B5.png', 'tiles/B6.png', 'tiles/B7.png'],
        ['tiles/B6.png', 'tiles/B7.png', 'tiles/B8.png'],
        ['tiles/B7.png', 'tiles/B8.png', 'tiles/B9.png'],
        ['tiles/C1.png', 'tiles/C2.png', 'tiles/C3.png'],
        ['tiles/C2.png', 'tiles/C3.png', 'tiles/C4.png'],
        ['tiles/C3.png', 'tiles/C4.png', 'tiles/C5.png'],
        ['tiles/C4.png', 'tiles/C5.png', 'tiles/C6.png'],
        ['tiles/C5.png', 'tiles/C6.png', 'tiles/C7.png'],
        ['tiles/C6.png', 'tiles/C7.png', 'tiles/C8.png'],
        ['tiles/C7.png', 'tiles/C8.png', 'tiles/C9.png'],
        ['tiles/D1.png', 'tiles/D2.png', 'tiles/D3.png'],
        ['tiles/D2.png', 'tiles/D3.png', 'tiles/D4.png'],
        ['tiles/D3.png', 'tiles/D4.png', 'tiles/D5.png'],
        ['tiles/D4.png', 'tiles/D5.png', 'tiles/D6.png'],
        ['tiles/D5.png', 'tiles/D6.png', 'tiles/D7.png'],
        ['tiles/D6.png', 'tiles/D7.png', 'tiles/D8.png'],
        ['tiles/D7.png', 'tiles/D8.png', 'tiles/D9.png']
    ];
    
    // Define different triplets (3 identical tiles)
    const triplets = [
        ['tiles/C1.png', 'tiles/C1.png', 'tiles/C1.png'],
        ['tiles/B2.png', 'tiles/B2.png', 'tiles/B2.png'],
        ['tiles/D3.png', 'tiles/D3.png', 'tiles/D3.png'],
        ['tiles/C4.png', 'tiles/C4.png', 'tiles/C4.png'],
        ['tiles/B5.png', 'tiles/B5.png', 'tiles/B5.png'],
        ['tiles/D6.png', 'tiles/D6.png', 'tiles/D6.png'],
        ['tiles/C7.png', 'tiles/C7.png', 'tiles/C7.png'],
        ['tiles/B8.png', 'tiles/B8.png', 'tiles/B8.png'],
        ['tiles/D9.png', 'tiles/D9.png', 'tiles/D9.png'],
        ['tiles/R.png', 'tiles/R.png', 'tiles/R.png'],
        ['tiles/F.png', 'tiles/F.png', 'tiles/F.png'],
        ['tiles/WH.png', 'tiles/WH.png', 'tiles/WH.png'],
        ['tiles/E.png', 'tiles/E.png', 'tiles/E.png'],
        ['tiles/S.png', 'tiles/S.png', 'tiles/S.png'],
        ['tiles/W.png', 'tiles/W.png', 'tiles/W.png'],
        ['tiles/N.png', 'tiles/N.png', 'tiles/N.png']
    ];
    
    // Get current tile configuration
    function getCurrentTiles(container) {
        const tiles = Array.from(container.querySelectorAll('.winning-hand-tile img'));
        return tiles.map(img => {
            const src = img.src || img.getAttribute('src');
            // Extract filename from path
            const filename = src.split('/').pop() || src.split('\\').pop();
            // Ensure it starts with 'tiles/'
            return filename.startsWith('tiles/') ? filename : 'tiles/' + filename;
        });
    }
    
    // Get a random different configuration
    function getRandomDifferent(currentTiles, options) {
        // Normalize current tiles format
        const normalizedCurrent = currentTiles.map(t => {
            if (t.startsWith('tiles/')) return t;
            return 'tiles/' + t;
        });
        
        let newOption;
        let attempts = 0;
        do {
            newOption = options[Math.floor(Math.random() * options.length)];
            attempts++;
            // Prevent infinite loop
            if (attempts > 50) break;
        } while (JSON.stringify(newOption) === JSON.stringify(normalizedCurrent));
        return newOption;
    }
    
    // Switch tiles with animation
    function switchTiles(container, newTiles) {
        const tileImgs = Array.from(container.querySelectorAll('.winning-hand-tile img'));
        const tileContainers = Array.from(container.querySelectorAll('.winning-hand-tile'));
        
        if (tileImgs.length !== newTiles.length) return;
        
        // Animate out
        tileContainers.forEach((container, index) => {
            container.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
            container.style.transform = 'scale(0.8) rotateY(90deg)';
            container.style.opacity = '0';
        });
        
        // Change images and animate in
        setTimeout(() => {
            tileImgs.forEach((img, index) => {
                img.src = newTiles[index];
                // Preload image
                const preloadImg = new Image();
                preloadImg.src = newTiles[index];
            });
            
            tileContainers.forEach((container, index) => {
                setTimeout(() => {
                    container.style.transform = 'scale(1) rotateY(0deg)';
                    container.style.opacity = '1';
                }, index * 30); // Stagger animation
            });
            
            // Reset transition after animation
            setTimeout(() => {
                tileContainers.forEach(container => {
                    container.style.transition = '';
                });
            }, 500);
        }, 300);
    }
    
    // Setup click handlers for pairs
    const pairGroups = document.querySelectorAll('.winning-hand-pair');
    pairGroups.forEach(group => {
        const tilesContainer = group.querySelector('.winning-hand-tiles');
        if (!tilesContainer) return;
        
        const tiles = tilesContainer.querySelectorAll('.winning-hand-tile');
        tiles.forEach(tile => {
            tile.style.cursor = 'pointer';
            tile.addEventListener('click', function(e) {
                e.stopPropagation();
                const currentTiles = getCurrentTiles(tilesContainer);
                const newTiles = getRandomDifferent(currentTiles, pairs);
                switchTiles(tilesContainer, newTiles);
            });
        });
    });
    
    // Setup click handlers for sequences
    const sequenceGroups = document.querySelectorAll('.winning-hand-sequence');
    sequenceGroups.forEach(group => {
        const tilesContainer = group.querySelector('.winning-hand-tiles');
        if (!tilesContainer) return;
        
        const tiles = tilesContainer.querySelectorAll('.winning-hand-tile');
        tiles.forEach(tile => {
            tile.style.cursor = 'pointer';
            tile.addEventListener('click', function(e) {
                e.stopPropagation();
                const currentTiles = getCurrentTiles(tilesContainer);
                const newTiles = getRandomDifferent(currentTiles, sequences);
                switchTiles(tilesContainer, newTiles);
            });
        });
    });
    
    // Setup click handlers for triplets
    const tripletGroups = document.querySelectorAll('.winning-hand-triplet');
    tripletGroups.forEach(group => {
        const tilesContainer = group.querySelector('.winning-hand-tiles');
        if (!tilesContainer) return;
        
        const tiles = tilesContainer.querySelectorAll('.winning-hand-tile');
        tiles.forEach(tile => {
            tile.style.cursor = 'pointer';
            tile.addEventListener('click', function(e) {
                e.stopPropagation();
                const currentTiles = getCurrentTiles(tilesContainer);
                const newTiles = getRandomDifferent(currentTiles, triplets);
                switchTiles(tilesContainer, newTiles);
            });
        });
    });
}

// Setup Tile Combination Animation (for 【Tile combinations】section)
// Setup Emoji Assistant Mascot
function setupEmojiAssistant() {
    const assistant = document.getElementById('emojiAssistant');
    const speechBubble = document.getElementById('speechBubble');
    const pupils = document.querySelectorAll('.eye-pupil');
    
    if (!assistant || !speechBubble) return;

    // Show assistant with fade-in
    setTimeout(() => {
        assistant.classList.add('visible');
    }, 1000);

    // 1. Eyes following mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        pupils.forEach(pupil => {
            const rect = pupil.getBoundingClientRect();
            const pupilX = rect.left + rect.width / 2;
            const pupilY = rect.top + rect.height / 2;

            const angle = Math.atan2(mouseY - pupilY, mouseX - pupilX);
            const distance = Math.min(5, Math.hypot(mouseX - pupilX, mouseY - pupilY) / 50);

            const translateX = Math.cos(angle) * distance;
            const translateY = Math.sin(angle) * distance;

            pupil.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });

    // 2. Click tile listener to speak
    const tileNameMap = {
        'B1': 'One Bamboo', 'B2': 'Two Bamboo', 'B3': 'Three Bamboo', 'B4': 'Four Bamboo', 'B5': 'Five Bamboo', 'B6': 'Six Bamboo', 'B7': 'Seven Bamboo', 'B8': 'Eight Bamboo', 'B9': 'Nine Bamboo',
        'C1': 'One Character', 'C2': 'Two Character', 'C3': 'Three Character', 'C4': 'Four Character', 'C5': 'Five Character', 'C6': 'Six Character', 'C7': 'Seven Character', 'C8': 'Eight Character', 'C9': 'Nine Character',
        'D1': 'One Dot', 'D2': 'Two Dot', 'D3': 'Three Dot', 'D4': 'Four Dot', 'D5': 'Five Dot', 'D6': 'Six Dot', 'D7': 'Seven Dot', 'D8': 'Eight Dot', 'D9': 'Nine Dot',
        'E': 'East Wind', 'S': 'South Wind', 'W': 'West Wind', 'N': 'North Wind',
        'R': 'Red Dragon', 'F': 'Green Dragon', 'WH': 'White Dragon'
    };

    let speechTimeout;

    function speak(text) {
        if (!text) return;
        speechBubble.textContent = text;
        speechBubble.classList.add('show');
        assistant.classList.add('talking');

        // Reset the bubble after a delay
        if (speechTimeout) clearTimeout(speechTimeout);
        speechTimeout = setTimeout(() => {
            speechBubble.classList.remove('show');
            assistant.classList.remove('talking');
        }, 2500);
    }

    // Initial greeting
    setTimeout(() => {
        speak("Welcome! I'm your Mahjong guide!");
        
        setTimeout(() => {
            speak("Click any tile, unlock a surprise!");
        }, 3000);
    }, 2000);

    // Global listener for mahjong tile clicks - using capture phase (true)
    // because many individual tile handlers use stopPropagation()
    document.addEventListener('click', (e) => {
        const tileContainer = e.target.closest('.tile-img-container');
        if (tileContainer) {
            const img = tileContainer.querySelector('img');
            if (img) {
                const src = img.getAttribute('src');
                if (src) {
                    // Extract filename without path and extension
                    const parts = src.split(/[/\\]/);
                    const filenameWithExt = parts[parts.length - 1];
                    const filename = filenameWithExt.split('.')[0];
                    
                    const name = tileNameMap[filename] || 'Mahjong Tile';
                    speak(name);
                }
            }
        }
    }, true);
}

function setupTileCombinationAnimation() {
    // Define different pairs (2 identical tiles)
    const pairs = [
        ['tiles/D1.png', 'tiles/D1.png'],
        ['tiles/B2.png', 'tiles/B2.png'],
        ['tiles/C3.png', 'tiles/C3.png'],
        ['tiles/D4.png', 'tiles/D4.png'],
        ['tiles/B5.png', 'tiles/B5.png'],
        ['tiles/C6.png', 'tiles/C6.png'],
        ['tiles/D7.png', 'tiles/D7.png'],
        ['tiles/B8.png', 'tiles/B8.png'],
        ['tiles/C9.png', 'tiles/C9.png'],
        ['tiles/R.png', 'tiles/R.png'],
        ['tiles/F.png', 'tiles/F.png'],
        ['tiles/WH.png', 'tiles/WH.png']
    ];
    
    // Define different sequences (3 consecutive tiles)
    const sequences = [
        ['tiles/B1.png', 'tiles/B2.png', 'tiles/B3.png'],
        ['tiles/B2.png', 'tiles/B3.png', 'tiles/B4.png'],
        ['tiles/B3.png', 'tiles/B4.png', 'tiles/B5.png'],
        ['tiles/B4.png', 'tiles/B5.png', 'tiles/B6.png'],
        ['tiles/B5.png', 'tiles/B6.png', 'tiles/B7.png'],
        ['tiles/B6.png', 'tiles/B7.png', 'tiles/B8.png'],
        ['tiles/B7.png', 'tiles/B8.png', 'tiles/B9.png'],
        ['tiles/C1.png', 'tiles/C2.png', 'tiles/C3.png'],
        ['tiles/C2.png', 'tiles/C3.png', 'tiles/C4.png'],
        ['tiles/C3.png', 'tiles/C4.png', 'tiles/C5.png'],
        ['tiles/C4.png', 'tiles/C5.png', 'tiles/C6.png'],
        ['tiles/C5.png', 'tiles/C6.png', 'tiles/C7.png'],
        ['tiles/C6.png', 'tiles/C7.png', 'tiles/C8.png'],
        ['tiles/C7.png', 'tiles/C8.png', 'tiles/C9.png'],
        ['tiles/D1.png', 'tiles/D2.png', 'tiles/D3.png'],
        ['tiles/D2.png', 'tiles/D3.png', 'tiles/D4.png'],
        ['tiles/D3.png', 'tiles/D4.png', 'tiles/D5.png'],
        ['tiles/D4.png', 'tiles/D5.png', 'tiles/D6.png'],
        ['tiles/D5.png', 'tiles/D6.png', 'tiles/D7.png'],
        ['tiles/D6.png', 'tiles/D7.png', 'tiles/D8.png'],
        ['tiles/D7.png', 'tiles/D8.png', 'tiles/D9.png']
    ];
    
    // Define different triplets (3 identical tiles)
    const triplets = [
        ['tiles/C1.png', 'tiles/C1.png', 'tiles/C1.png'],
        ['tiles/B2.png', 'tiles/B2.png', 'tiles/B2.png'],
        ['tiles/D3.png', 'tiles/D3.png', 'tiles/D3.png'],
        ['tiles/C4.png', 'tiles/C4.png', 'tiles/C4.png'],
        ['tiles/B5.png', 'tiles/B5.png', 'tiles/B5.png'],
        ['tiles/D6.png', 'tiles/D6.png', 'tiles/D6.png'],
        ['tiles/C7.png', 'tiles/C7.png', 'tiles/C7.png'],
        ['tiles/B8.png', 'tiles/B8.png', 'tiles/B8.png'],
        ['tiles/D9.png', 'tiles/D9.png', 'tiles/D9.png'],
        ['tiles/R.png', 'tiles/R.png', 'tiles/R.png'],
        ['tiles/F.png', 'tiles/F.png', 'tiles/F.png'],
        ['tiles/WH.png', 'tiles/WH.png', 'tiles/WH.png'],
        ['tiles/E.png', 'tiles/E.png', 'tiles/E.png'],
        ['tiles/S.png', 'tiles/S.png', 'tiles/S.png'],
        ['tiles/W.png', 'tiles/W.png', 'tiles/W.png'],
        ['tiles/N.png', 'tiles/N.png', 'tiles/N.png']
    ];
    
    // Get current tile configuration
    function getCurrentTiles(container) {
        const tiles = Array.from(container.querySelectorAll('.tile-combination-tile img'));
        return tiles.map(img => {
            const src = img.src || img.getAttribute('src');
            // Extract filename from path
            const filename = src.split('/').pop() || src.split('\\').pop();
            // Ensure it starts with 'tiles/'
            return filename.startsWith('tiles/') ? filename : 'tiles/' + filename;
        });
    }
    
    // Get a random different configuration
    function getRandomDifferent(currentTiles, options) {
        // Normalize current tiles format
        const normalizedCurrent = currentTiles.map(t => {
            if (t.startsWith('tiles/')) return t;
            return 'tiles/' + t;
        });
        
        let newOption;
        let attempts = 0;
        do {
            newOption = options[Math.floor(Math.random() * options.length)];
            attempts++;
            // Prevent infinite loop
            if (attempts > 50) break;
        } while (JSON.stringify(newOption) === JSON.stringify(normalizedCurrent));
        return newOption;
    }
    
    // Switch tiles with animation
    function switchTiles(container, newTiles) {
        const tileImgs = Array.from(container.querySelectorAll('.tile-combination-tile img'));
        const tileContainers = Array.from(container.querySelectorAll('.tile-combination-tile'));
        
        if (tileImgs.length !== newTiles.length) return;
        
        // Animate out
        tileContainers.forEach((container, index) => {
            container.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
            container.style.transform = 'scale(0.8) rotateY(90deg)';
            container.style.opacity = '0';
        });
        
        // Change images and animate in
        setTimeout(() => {
            tileImgs.forEach((img, index) => {
                img.src = newTiles[index];
                // Preload image
                const preloadImg = new Image();
                preloadImg.src = newTiles[index];
            });
            
            tileContainers.forEach((container, index) => {
                setTimeout(() => {
                    container.style.transform = 'scale(1) rotateY(0deg)';
                    container.style.opacity = '1';
                }, index * 30); // Stagger animation
            });
            
            // Reset transition after animation
            setTimeout(() => {
                tileContainers.forEach(container => {
                    container.style.transition = '';
                });
            }, 500);
        }, 300);
    }
    
    // Setup click handlers for pairs
    const pairGroups = document.querySelectorAll('.tile-combination-pair');
    pairGroups.forEach(group => {
        const tilesContainer = group.querySelector('.tile-combination-tiles');
        if (!tilesContainer) return;
        
        const tiles = tilesContainer.querySelectorAll('.tile-combination-tile');
        tiles.forEach(tile => {
            tile.style.cursor = 'pointer';
            tile.addEventListener('click', function(e) {
                e.stopPropagation();
                const currentTiles = getCurrentTiles(tilesContainer);
                const newTiles = getRandomDifferent(currentTiles, pairs);
                switchTiles(tilesContainer, newTiles);
            });
        });
    });
    
    // Setup click handlers for sequences
    const sequenceGroups = document.querySelectorAll('.tile-combination-sequence');
    sequenceGroups.forEach(group => {
        const tilesContainer = group.querySelector('.tile-combination-tiles');
        if (!tilesContainer) return;
        
        const tiles = tilesContainer.querySelectorAll('.tile-combination-tile');
        tiles.forEach(tile => {
            tile.style.cursor = 'pointer';
            tile.addEventListener('click', function(e) {
                e.stopPropagation();
                const currentTiles = getCurrentTiles(tilesContainer);
                const newTiles = getRandomDifferent(currentTiles, sequences);
                switchTiles(tilesContainer, newTiles);
            });
        });
    });
    
    // Setup click handlers for triplets
    const tripletGroups = document.querySelectorAll('.tile-combination-triplet');
    tripletGroups.forEach(group => {
        const tilesContainer = group.querySelector('.tile-combination-tiles');
        if (!tilesContainer) return;
        
        const tiles = tilesContainer.querySelectorAll('.tile-combination-tile');
        tiles.forEach(tile => {
            tile.style.cursor = 'pointer';
            tile.addEventListener('click', function(e) {
                e.stopPropagation();
                const currentTiles = getCurrentTiles(tilesContainer);
                const newTiles = getRandomDifferent(currentTiles, triplets);
                switchTiles(tilesContainer, newTiles);
            });
        });
    });
}

// Setup Seven Pairs Animation
function setupSevenPairsAnimation() {
    const sevenPairsTiles = document.querySelectorAll('.seven-pairs-tile');
    if (sevenPairsTiles.length === 0) return;
    
    let isAnimating = false;
    
    // Add click event to all tiles
    sevenPairsTiles.forEach(tile => {
        tile.style.cursor = 'pointer';
        tile.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isAnimating) return;
            animateSevenPairs();
        });
    });
    
    function animateSevenPairs() {
        isAnimating = true;
        const tiles = Array.from(sevenPairsTiles);
        const tilesContainer = document.querySelector('.seven-pairs-tiles');
        const wrapper = document.querySelector('.seven-pairs-wrapper');
        
        // Store original positions relative to container
        const originalPositions = tiles.map(tile => {
            const rect = tile.getBoundingClientRect();
            const containerRect = tilesContainer.getBoundingClientRect();
            return {
                left: rect.left - containerRect.left,
                top: rect.top - containerRect.top,
                width: rect.width,
                height: rect.height,
                element: tile
            };
        });
        
        // Group tiles into pairs (0-1, 2-3, 4-5, 6-7, 8-9, 10-11, 12-13)
        const pairs = [];
        for (let i = 0; i < tiles.length; i += 2) {
            pairs.push([tiles[i], tiles[i + 1]]);
        }
        
        // Calculate center position for each pair (relative to container)
        const pairCenters = pairs.map((pair, pairIndex) => {
            const pos1 = originalPositions[pairIndex * 2];
            const pos2 = originalPositions[pairIndex * 2 + 1];
            return {
                left: (pos1.left + pos2.left) / 2,
                top: (pos1.top + pos2.top) / 2
            };
        });
        
        // Set container to relative positioning for heart placement
        tilesContainer.style.position = 'relative';
        
        // Animate each pair sequentially
        pairs.forEach((pair, pairIndex) => {
            const delay = pairIndex * 200; // 200ms delay between each pair
            
            setTimeout(() => {
                const [tile1, tile2] = pair;
                const center = pairCenters[pairIndex];
                const originalPos1 = originalPositions[pairIndex * 2];
                const originalPos2 = originalPositions[pairIndex * 2 + 1];
                
                // Calculate movement distance (half the distance between the two tiles)
                const moveDistance = Math.abs(originalPos2.left - originalPos1.left) / 2;
                
                // Use transform only, don't change position - keeps layout stable
                tile1.style.zIndex = '10';
                tile2.style.zIndex = '10';
                tile1.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                tile2.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                
                // Animate collision using transform only
                requestAnimationFrame(() => {
                    // Move tiles towards each other using transform
                    tile1.style.transform = `translateX(${moveDistance}px) scale(1.1)`;
                    tile2.style.transform = `translateX(${-moveDistance}px) scale(1.1)`;
                    
                    // After collision, show heart
                    setTimeout(() => {
                        // Reset scale but keep translateX for visual effect
                        tile1.style.transform = `translateX(${moveDistance}px) scale(1)`;
                        tile2.style.transform = `translateX(${-moveDistance}px) scale(1)`;
                        
                        // Create heart element
                        const heart = document.createElement('div');
                        heart.className = 'seven-pairs-heart';
                        heart.innerHTML = '❤️';
                        heart.style.position = 'absolute';
                        heart.style.left = center.left + 'px';
                        heart.style.top = (center.top - 30) + 'px';
                        heart.style.fontSize = '24px';
                        heart.style.zIndex = '20';
                        heart.style.pointerEvents = 'none';
                        heart.style.opacity = '0';
                        heart.style.transform = 'translateY(0) scale(0)';
                        heart.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        
                        tilesContainer.appendChild(heart);
                        
                        // Animate heart appearance
                        requestAnimationFrame(() => {
                            heart.style.opacity = '1';
                            heart.style.transform = 'translateY(-20px) scale(1.2)';
                            
                            // After animation, fade out
                            setTimeout(() => {
                                heart.style.opacity = '0';
                                heart.style.transform = 'translateY(-40px) scale(0.8)';
                                setTimeout(() => {
                                    heart.remove();
                                }, 500);
                            }, 1500);
                        });
                        
                        // Reset tiles transform after animation
                        setTimeout(() => {
                            tile1.style.transform = '';
                            tile1.style.zIndex = '';
                            tile2.style.transform = '';
                            tile2.style.zIndex = '';
                            tile1.style.transition = '';
                            tile2.style.transition = '';
                        }, 2000);
                        
                        // Re-enable animation after all pairs are done
                        if (pairIndex === pairs.length - 1) {
                            setTimeout(() => {
                                isAnimating = false;
                            }, 2000);
                        }
                    }, 400);
                });
            }, delay);
        });
    }
}

// Setup Dragon Tile Transformation Animation
function setupDragonAnimations() {
    // 1. Red Dragon (Existing flip animation)
    const redDragonTile = document.querySelector('.dragon-red-tile');
    if (redDragonTile) {
        setupRedDragonFlip(redDragonTile);
    }
    
    // 2. Green Dragon (Fa / 发财 - Wealth animation)
    const greenDragonTile = document.querySelector('.tile-img-container[data-tile="dragon-green"]');
    if (greenDragonTile) {
        setupGreenDragonWealth(greenDragonTile);
    }
    
    // 3. White Dragon (Bai / 白板 - Smooth 360 Rotation)
    const whiteDragonTile = document.querySelector('.tile-img-container[data-tile="dragon-white"]');
    if (whiteDragonTile) {
        setupWhiteDragonRotate(whiteDragonTile);
    }
}

function setupRedDragonFlip(tile) {
    const tileImg = tile.querySelector('.tile-img');
    if (!tileImg) return;
    
    const allTiles = [
        'tiles/B1.png', 'tiles/B2.png', 'tiles/B3.png', 'tiles/B4.png', 'tiles/B5.png', 'tiles/B6.png', 'tiles/B7.png', 'tiles/B8.png', 'tiles/B9.png',
        'tiles/C1.png', 'tiles/C2.png', 'tiles/C3.png', 'tiles/C4.png', 'tiles/C5.png', 'tiles/C6.png', 'tiles/C7.png', 'tiles/C8.png', 'tiles/C9.png',
        'tiles/D1.png', 'tiles/D2.png', 'tiles/D3.png', 'tiles/D4.png', 'tiles/D5.png', 'tiles/D6.png', 'tiles/D7.png', 'tiles/D8.png', 'tiles/D9.png',
        'tiles/E.png', 'tiles/S.png', 'tiles/W.png', 'tiles/N.png',
        'tiles/F.png', 'tiles/WH.png'
    ];
    
    const originalSrc = tileImg.src;
    let isAnimating = false;
    tile.style.cursor = 'pointer';
    
    tile.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isAnimating) return;
        isAnimating = true;
        
        const randomTile = allTiles[Math.floor(Math.random() * allTiles.length)];
        
        requestAnimationFrame(() => {
            tileImg.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
            tileImg.style.transform = 'scale(0.8) rotateY(90deg)';
            tileImg.style.opacity = '0';
            
            setTimeout(() => {
                tileImg.src = randomTile;
                requestAnimationFrame(() => {
                    tileImg.style.transform = 'scale(1) rotateY(0deg)';
                    tileImg.style.opacity = '1';
                    
                    setTimeout(() => {
                        tileImg.style.transform = 'scale(0.8) rotateY(-90deg)';
                        tileImg.style.opacity = '0';
                        
                        setTimeout(() => {
                            tileImg.src = originalSrc;
                            requestAnimationFrame(() => {
                                tileImg.style.transform = 'scale(1) rotateY(0deg)';
                                tileImg.style.opacity = '1';
                                setTimeout(() => {
                                    tileImg.style.transition = '';
                                    isAnimating = false;
                                }, 500);
                            });
                        }, 500);
                    }, 800);
                });
            }, 500);
        });
    });
}

function setupGreenDragonWealth(tile) {
    const dragonGroup = document.querySelector('.dragon-group');
    const animationContainer = dragonGroup ? dragonGroup.querySelector('.dragon-animation-container') : null;
    if (!animationContainer) return;

    let isAnimating = false;
    tile.style.cursor = 'pointer';

    tile.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isAnimating) return;
        isAnimating = true;

        // Visual feedback on tile
        tile.classList.add('wealth-glow');
        
        const containerRect = dragonGroup.getBoundingClientRect();
        const tileRect = tile.getBoundingClientRect();
        const startX = (tileRect.left + tileRect.width / 2) - containerRect.left;
        const startY = (tileRect.top + tileRect.height / 2) - containerRect.top;

        // Create burst of gold coins
        const numCoins = 15 + Math.floor(Math.random() * 10);
        for (let i = 0; i < numCoins; i++) {
            const coin = createGoldCoin(startX, startY);
            animationContainer.appendChild(coin);
            
            // Cleanup coin after animation
            setTimeout(() => coin.remove(), 2500);
        }

        setTimeout(() => {
            tile.classList.remove('wealth-glow');
            isAnimating = false;
        }, 2000);
    });
}

function createGoldCoin(x, y) {
    const coin = document.createElement('div');
    coin.className = 'gold-coin';
    
    const size = 15 + Math.random() * 15;
    const angle = Math.random() * Math.PI * 2;
    const velocity = 5 + Math.random() * 10;
    const tx = Math.cos(angle) * (100 + Math.random() * 150);
    const ty = Math.sin(angle) * (100 + Math.random() * 150) - 50; // Tend to go up slightly then fall

    coin.style.width = size + 'px';
    coin.style.height = size + 'px';
    coin.style.left = x + 'px';
    coin.style.top = y + 'px';
    coin.style.setProperty('--tx', tx + 'px');
    coin.style.setProperty('--ty', ty + 'px');
    coin.style.setProperty('--rot', (Math.random() * 720) + 'deg');
    
    return coin;
}

function setupWhiteDragonRotate(tile) {
    let isAnimating = false;
    tile.style.cursor = 'pointer';
    tile.style.perspective = '1000px'; // Enable 3D perspective

    const tileImg = tile.querySelector('.tile-img');
    if (!tileImg) return;

    tile.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isAnimating) return;
        isAnimating = true;

        // Visual feedback: Smooth 360 degree Y-axis rotation with a shine effect
        tile.classList.add('white-dragon-rotate');
        
        // Add a temporary shine element for extra "beauty"
        const shine = document.createElement('div');
        shine.className = 'tile-rotation-shine';
        tile.appendChild(shine);

        setTimeout(() => {
            tile.classList.remove('white-dragon-rotate');
            shine.remove();
            isAnimating = false;
        }, 1000); // Animation duration is 1s
    });
}

// Loading Page Control
function setupLoadingPage() {
    const loadingPage = document.getElementById('loadingPage');
    const mainContent = document.getElementById('mainContent');
    const tileImg = loadingPage ? loadingPage.querySelector('.tile-spinning') : null;
    
    // If no loading page, show main content immediately
    if (!loadingPage) {
        if (mainContent) {
            mainContent.classList.add('loaded');
        }
        return;
    }
    
    // If no main content wrapper, show everything immediately
    if (!mainContent) {
        loadingPage.style.display = 'none';
        return;
    }
    
    // Setup tile rotation and switching
    let tileChangeInterval = null;
    if (tileImg) {
        const tiles = [
            'tiles/R.png',   // Red Dragon
            'tiles/B1.png',  // Bamboo 1
            'tiles/C1.png', // Character 1
            'tiles/D1.png', // Dot 1
            'tiles/F.png',  // Green Dragon
            'tiles/WH.png'  // White Dragon
        ];
        let currentTileIndex = 0;
        
        // Change tile every rotation (when it's at 180deg, invisible side)
        // Animation is 2s, so change at 1s (when rotated to 180deg)
        const changeTile = function() {
            currentTileIndex = (currentTileIndex + 1) % tiles.length;
            // Preload next image to avoid flicker
            const nextImg = new Image();
            nextImg.src = tiles[currentTileIndex];
            nextImg.onload = function() {
                tileImg.src = tiles[currentTileIndex];
            };
            // Fallback: change immediately if image is cached
            if (nextImg.complete) {
                tileImg.src = tiles[currentTileIndex];
            }
        };
        
        // First change at 1s (when rotated to 180deg, back side)
        setTimeout(function() {
            changeTile();
            
            // Then continue changing every 2 seconds
            tileChangeInterval = setInterval(changeTile, 2000);
        }, 1000);
    }
    
    function showMainContent() {
        // Clear tile change interval
        if (tileChangeInterval) {
            clearInterval(tileChangeInterval);
            tileChangeInterval = null;
        }
        
        loadingPage.classList.add('hidden');
        mainContent.classList.add('loaded');
        
        // Start typing animation after loading page is hidden
        setTimeout(function() {
            addTypingAnimation();
            // Setup connection line after content is loaded
            setupThirteenOrphansConnectionLine();
        }, 600);
        
        // Remove loading page from DOM after animation
        setTimeout(function() {
            loadingPage.style.display = 'none';
        }, 600);
    }
    
    // Check if page is already loaded
    if (document.readyState === 'complete') {
        setTimeout(showMainContent, 1200);
    } else {
        window.addEventListener('load', function() {
            // Wait a bit for smooth transition
            setTimeout(showMainContent, 1200);
        });
    }
    
    // Fallback: show content after 3 seconds even if load event doesn't fire
    setTimeout(function() {
        if (!mainContent.classList.contains('loaded')) {
            showMainContent();
        }
    }, 3000);
}

// Setup connection line for Thirteen Orphans
function setupThirteenOrphansConnectionLine() {
    const demo = document.querySelector('.thirteen-orphans-demo');
    if (!demo) return;
    
    const lastTile = demo.querySelector('.tile-special-highlight');
    const annotation = demo.querySelector('.special-annotation');
    const connectionLine = demo.querySelector('.thirteen-orphans-connection-line');
    
    if (!lastTile || !annotation || !connectionLine) return;
    
    function updateConnectionLine() {
        // Get positions
        const lastTileRect = lastTile.getBoundingClientRect();
        const annotationRect = annotation.getBoundingClientRect();
        const demoRect = demo.getBoundingClientRect();
        
        // Calculate relative positions within demo container
        const lastTileBottom = lastTileRect.bottom - demoRect.top;
        const lastTileCenterX = lastTileRect.left + lastTileRect.width / 2 - demoRect.left;
        
        const annotationTop = annotationRect.top - demoRect.top;
        const annotationCenterY = annotationRect.top + annotationRect.height / 2 - demoRect.top;
        const annotationRight = annotationRect.right - demoRect.left;
        
        // Calculate line dimensions
        const verticalLength = annotationCenterY - lastTileBottom;
        const horizontalLength = lastTileCenterX - annotationRight;
        
        // Set connection line position and dimensions
        connectionLine.style.left = lastTileCenterX + 'px';
        connectionLine.style.top = lastTileBottom + 'px';
        
        // Vertical line (down from tile)
        connectionLine.style.setProperty('--vertical-length', verticalLength + 'px');
        
        // Horizontal line (left to annotation right edge)
        connectionLine.style.setProperty('--horizontal-length', Math.abs(horizontalLength) + 'px');
        connectionLine.style.setProperty('--horizontal-top', verticalLength + 'px');
    }
    
    // Update on load and resize
    updateConnectionLine();
    window.addEventListener('resize', updateConnectionLine);
    
    // Also update after a short delay to ensure all elements are rendered
    setTimeout(updateConnectionLine, 100);
}

// Setup Thirteen Orphans Animation
function setupThirteenOrphansAnimation() {
    const demo = document.querySelector('.thirteen-orphans-demo');
    if (!demo) return;
    
    const tilesContainer = demo.querySelector('.thirteen-orphans-tiles');
    if (!tilesContainer) return;
    
    const tiles = Array.from(tilesContainer.querySelectorAll('.thirteen-orphans-tile'));
    const connectionLine = demo.querySelector('.thirteen-orphans-connection-line');
    
    let isAnimating = false;
    
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isAnimating) return;
            isAnimating = true;
            
            // Pulse wave starting from clicked tile
            const clickedIndex = index;
            
            tiles.forEach((t, i) => {
                // Calculate delay based on distance from clicked tile
                const distance = Math.abs(i - clickedIndex);
                const delay = distance * 60;
                
                setTimeout(() => {
                    // Trigger jump animation
                    t.classList.add('animating');
                    t.classList.add('pulse-glow');
                    
                    // Cleanup classes after animation ends
                    setTimeout(() => {
                        t.classList.remove('animating');
                        t.classList.remove('pulse-glow');
                        
                        // Re-enable animation after the last tile in the wave finishes its animation
                        if (i === tiles.length - 1) {
                            isAnimating = false;
                        }
                    }, 800);
                    
                }, delay);
            });
        });
    });
}

function init() {
    // Setup loading page
    setupLoadingPage();
    
    // Setup connection line for Thirteen Orphans
    setupThirteenOrphansConnectionLine();
    
    // Setup Thirteen Orphans interaction animation
    setupThirteenOrphansAnimation();
    
    // 首先确保回到顶部按钮位置正确
    ensureBackToTopPosition();
    
    // Add ripple animation
    addRippleAnimation();
    
    // Add active nav style
    addActiveNavStyle();
    
    // Setup intersection observer
    setupIntersectionObserver();
    
    // 注意：滚动事件监听器在代码后面统一设置（优化版本）
    // 不需要在这里重复添加
    
    // Setup bamboo animation
    setupBambooAnimation();
    
    // Setup coin animation
    setupCoinAnimation();
    
    // Setup ripple animation
    setupRippleAnimation();
    
    // Setup wind animation
    setupWindAnimation();
    
    // Setup dragon tile transformation animation
    setupDragonAnimations();
    
    // Setup Seven Pairs animation
    setupSevenPairsAnimation();
    
    // Setup Winning Hand tile switching animation
    setupWinningHandAnimation();
    
    // Setup Tile Combination animation (for 【Tile combinations】section)
    setupTileCombinationAnimation();
    
    // Setup Emoji Assistant
    setupEmojiAssistant();
    
    // Add tile interactions
    addTileClickAnimation();
    addTileHoverEffects();
    
    // Setup claim card handlers (must be after tile click animation)
    setupClaimCardHandlers();
    
    // Setup Claim Modal Handlers
    setupClaimModalHandlers();
    
    // Setup Step Card Click Handlers
    setupStepCardHandlers();
    
    // Setup Pung and Kong interactive effects
    setupPungKongInteractions();
    
    // Add card animations
    addCardFlipAnimation();
    
    // Add button effects
    addButtonClickEffect();
    
    // Add parallax effect
    addParallaxEffect();
    
    // Typing animation will start after loading page is hidden
    // (called in setupLoadingPage's showMainContent function)
    
    // Animate elements on load
    window.addEventListener('load', () => {
        animateTileStack();
        animateWinningHand();
        animateSeatDiagram();
        animateWallVisual();
        // 页面加载完成后再次确保按钮位置正确
        ensureBackToTopPosition();
        // 初始化导航指示器位置
        updateActiveNavLink();
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active state immediately for better UX
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            updateNavIndicator();
        });
    });
    
    // Initial check
    checkSectionVisibility();
    updateProgressBar();
    toggleBackToTop();
    updateActiveNavLink(); // Initialize active nav and indicator
    
    // 监听窗口大小变化，确保按钮位置正确
    window.addEventListener('resize', ensureBackToTopPosition);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Home') {
        scrollToTop();
    } else if (e.key === 'End') {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - scroll down
            window.scrollBy({
                top: 300,
                behavior: 'smooth'
            });
        } else {
            // Swipe down - scroll up
            window.scrollBy({
                top: -300,
                behavior: 'smooth'
            });
        }
    }
}

// Add performance optimization
let ticking = false;

function optimizedScrollHandler() {
    updateProgressBar();
    checkSectionVisibility();
    toggleBackToTop();
    updateActiveNavLink(); // This will also update the indicator
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(optimizedScrollHandler);
        ticking = true;
    }
});

// Add accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for accessibility
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 3px solid var(--primary-blue);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// ========== Interactive Pung and Kong Effects ==========

// Pung Animation Effect
function triggerPungAnimation(element) {
    const exampleVisual = element.closest('.example-visual');
    if (!exampleVisual) return;
    
    // Prevent multiple clicks during animation
    if (exampleVisual.classList.contains('animating')) return;
    exampleVisual.classList.add('animating');
    
    const tilesInHand = exampleVisual.querySelector('.tiles-in-hand');
    const discardedTile = exampleVisual.querySelector('.tile-img-container.discarded') || element;
    const meldedGroup = exampleVisual.querySelector('.melded-group');
    
    if (!tilesInHand || !discardedTile || !meldedGroup) {
        exampleVisual.classList.remove('animating');
        return;
    }
    
    // Hide plus and equals symbols
    const plus = exampleVisual.querySelector('.plus');
    const equals = exampleVisual.querySelector('.equals');
    if (plus) plus.style.opacity = '0';
    if (equals) equals.style.opacity = '0';
    
    // Get tile positions
    const tiles = Array.from(tilesInHand.querySelectorAll('.tile-img-container'));
    const discardedRect = discardedTile.getBoundingClientRect();
    const meldedRect = meldedGroup.getBoundingClientRect();
    
    // Second tile position (the discarded tile in the middle)
    const secondTileX = discardedRect.left + discardedRect.width / 2;
    const secondTileY = discardedRect.top + discardedRect.height / 2;
    
    // Create clones for first and third tiles (the ones in hand)
    const clonedTiles = [];
    tiles.forEach((tile, index) => {
        const clonedTile = tile.cloneNode(true);
        const tileRect = tile.getBoundingClientRect();
        clonedTile.style.position = 'fixed';
        clonedTile.style.left = tileRect.left + 'px';
        clonedTile.style.top = tileRect.top + 'px';
        clonedTile.style.width = tile.offsetWidth + 'px';
        clonedTile.style.height = tile.offsetHeight + 'px';
        clonedTile.style.zIndex = '10000';
        clonedTile.style.transform = 'scale(1) rotate(0deg)';
        clonedTile.style.opacity = '1';
        clonedTile.classList.add('animated-tile');
        document.body.appendChild(clonedTile);
        clonedTiles.push(clonedTile);
    });
    
    // Phase 1: First and third tiles fly towards second tile, but first move away
    const awayDistance = 80; // Distance to move away
    const approachTime = 600; // Time to approach
    
    clonedTiles.forEach((clonedTile, index) => {
        const tileRect = tiles[index].getBoundingClientRect();
        const startX = tileRect.left + tileRect.width / 2;
        const startY = tileRect.top + tileRect.height / 2;
        
        // Calculate direction away from second tile
        const dx = startX - secondTileX;
        const dy = startY - secondTileY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const awayX = startX + (dx / distance) * awayDistance;
        const awayY = startY + (dy / distance) * awayDistance;
        
        // Step 1: Move away from second tile
        clonedTile.style.transition = `all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`;
        setTimeout(() => {
            clonedTile.style.left = (awayX - clonedTile.offsetWidth / 2) + 'px';
            clonedTile.style.top = (awayY - clonedTile.offsetHeight / 2) + 'px';
            clonedTile.style.transform = 'scale(1.1) rotate(' + (index === 0 ? '-15' : '15') + 'deg)';
        }, 50);
        
        // Step 2: Approach second tile (but not too close)
        setTimeout(() => {
            const approachX = secondTileX + (index === 0 ? -60 : 60); // First tile on left, third on right
            const approachY = secondTileY - 20;
            
            clonedTile.style.transition = `all ${approachTime}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            clonedTile.style.left = (approachX - clonedTile.offsetWidth / 2) + 'px';
            clonedTile.style.top = (approachY - clonedTile.offsetHeight / 2) + 'px';
            clonedTile.style.transform = 'scale(1.2) rotate(' + (index === 0 ? '-10' : '10') + 'deg)';
        }, 450);
    });
    
    // Phase 2: Accelerate and collide with second tile
    const collisionTime = 300; // Fast collision
    const collisionDelay = 450 + approachTime;
    
    clonedTiles.forEach((clonedTile, index) => {
        setTimeout(() => {
            // Accelerate towards second tile
            clonedTile.style.transition = `all ${collisionTime}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
            clonedTile.style.left = (secondTileX - clonedTile.offsetWidth / 2) + 'px';
            clonedTile.style.top = (secondTileY - clonedTile.offsetHeight / 2) + 'px';
            clonedTile.style.transform = 'scale(1.3) rotate(0deg)';
        }, collisionDelay);
    });
    
    // Phase 3: Create collision effect and show "Pung!" text
    setTimeout(() => {
        // Create impact ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = secondTileX + 'px';
        ripple.style.top = secondTileY + 'px';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.border = '4px solid rgba(88, 204, 2, 0.8)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.zIndex = '10001';
        ripple.style.pointerEvents = 'none';
        document.body.appendChild(ripple);
        
        // Animate ripple
        setTimeout(() => {
            ripple.style.transition = 'all 0.5s ease-out';
            ripple.style.width = '120px';
            ripple.style.height = '120px';
            ripple.style.opacity = '0';
            setTimeout(() => ripple.remove(), 500);
        }, 10);
        
        // Fade out cloned tiles
        clonedTiles.forEach(clonedTile => {
            clonedTile.style.transition = 'all 0.2s ease-out';
            clonedTile.style.opacity = '0';
            clonedTile.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (clonedTile.parentNode) {
                    clonedTile.remove();
                }
            }, 200);
        });
        
        // Show "Pung!" text after collision
        setTimeout(() => {
            const pungText = document.createElement('div');
            pungText.className = 'pung-kong-text pung-text';
            pungText.textContent = 'Pung!';
            pungText.style.position = 'fixed';
            pungText.style.left = secondTileX + 'px';
            pungText.style.top = (secondTileY - 60) + 'px';
            pungText.style.transform = 'translateX(-50%) scale(0.3)';
            pungText.style.opacity = '0';
            pungText.style.zIndex = '10002';
            pungText.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            document.body.appendChild(pungText);
            
            // Animate text appearance with bounce
            setTimeout(() => {
                pungText.style.transform = 'translateX(-50%) scale(1.3)';
                pungText.style.opacity = '1';
            }, 50);
            
            // Scale back and fade out
            setTimeout(() => {
                pungText.style.transform = 'translateX(-50%) scale(1) translateY(-15px)';
            }, 400);
            
            // Remove text
            setTimeout(() => {
                pungText.style.opacity = '0';
                pungText.style.transform = 'translateX(-50%) scale(0.9) translateY(-25px)';
                setTimeout(() => pungText.remove(), 500);
            }, 2000);
        }, 100);
    }, collisionDelay + collisionTime);
    
    // Highlight melded group after collision
    setTimeout(() => {
        meldedGroup.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        meldedGroup.style.transform = 'scale(1.15)';
        meldedGroup.style.boxShadow = '0 8px 24px rgba(88, 204, 2, 0.6)';
        meldedGroup.style.border = '3px solid #58cc02';
        
        setTimeout(() => {
            meldedGroup.style.transform = 'scale(1)';
            meldedGroup.style.boxShadow = '0 4px 12px rgba(88, 204, 2, 0.3)';
            setTimeout(() => {
                meldedGroup.style.transform = '';
                meldedGroup.style.boxShadow = '';
                meldedGroup.style.border = '';
                meldedGroup.style.transition = '';
            }, 400);
        }, 600);
    }, collisionDelay + collisionTime + 200);
    
    // Clean up
    setTimeout(() => {
        document.querySelectorAll('.animated-tile').forEach(tile => {
            if (tile.parentNode) {
                tile.remove();
            }
        });
        if (plus) {
            plus.style.transition = 'opacity 0.3s ease-in';
            plus.style.opacity = '1';
        }
        if (equals) {
            equals.style.transition = 'opacity 0.3s ease-in';
            equals.style.opacity = '1';
        }
        exampleVisual.classList.remove('animating');
    }, collisionDelay + collisionTime + 3000);
}

// Kong Animation Effect
function triggerKongAnimation(element) {
    const exampleVisual = element.closest('.example-visual');
    const kongTypeCard = element.closest('.kong-type-card');
    if (!exampleVisual || !kongTypeCard) return;
    
    // Prevent multiple clicks
    if (exampleVisual.classList.contains('animating')) return;
    exampleVisual.classList.add('animating');
    
    const tilesInHand = exampleVisual.querySelector('.tiles-in-hand');
    const meldedGroup = exampleVisual.querySelector('.melded-group');
    const discardedTile = exampleVisual.querySelector('.tile-img-container.discarded') || 
                          exampleVisual.querySelector('.tile.discarded');
    const lastTile = exampleVisual.querySelector('.tile:last-child');
    
    // Check if this is Exposed Kong (has tiles-in-hand and discarded tile)
    if (tilesInHand && discardedTile) {
        triggerExposedKongAnimation(exampleVisual, tilesInHand, discardedTile);
        return;
    }
    
    // Check if this is Added Kong (has melded-group and a fourth tile after plus)
    if (meldedGroup) {
        const allTiles = exampleVisual.querySelectorAll('.tile-img-container');
        const meldedTiles = meldedGroup.querySelectorAll('.tile-img-container');
        const plus = exampleVisual.querySelector('.plus');
        
        // Find the fourth tile (tile that comes after plus, not in melded-group)
        if (plus && allTiles.length > meldedTiles.length) {
            let fourthTile = null;
            // Try to find tile after plus
            for (let tile of allTiles) {
                if (!tile.closest('.melded-group')) {
                    const tilePos = tile.compareDocumentPosition(plus);
                    if (tilePos & Node.DOCUMENT_POSITION_FOLLOWING) {
                        fourthTile = tile;
                        break;
                    }
                }
            }
            // If not found, get the last tile that's not in melded-group
            if (!fourthTile) {
                const tilesArray = Array.from(allTiles);
                fourthTile = tilesArray.find(tile => !tile.closest('.melded-group'));
            }
            
            if (fourthTile && meldedTiles.length >= 3) {
                triggerAddedKongAnimation(exampleVisual, meldedGroup, fourthTile);
                return;
            }
        }
    }
}

// Exposed Kong Animation Effect - Special animation for Exposed Kong
function triggerExposedKongAnimation(exampleVisual, tilesInHand, discardedTile) {
    // Hide plus symbol
    const plusSymbol = exampleVisual.querySelector('.plus');
    if (plusSymbol) plusSymbol.style.opacity = '0';
    
    // Get the third tile (last tile in tiles-in-hand) as target
    const tiles = Array.from(tilesInHand.querySelectorAll('.tile-img-container'));
    if (tiles.length < 3) {
        exampleVisual.classList.remove('animating');
        return;
    }
    
    const thirdTile = tiles[tiles.length - 1]; // Third tile
    const thirdTileRect = thirdTile.getBoundingClientRect();
    const discardedRect = discardedTile.getBoundingClientRect();
    
    // Ensure original elements remain visible
    discardedTile.style.opacity = '1';
    discardedTile.style.visibility = 'visible';
    tilesInHand.style.opacity = '1';
    tilesInHand.style.visibility = 'visible';
    tiles.forEach(tile => {
        tile.style.opacity = '1';
        tile.style.visibility = 'visible';
    });
    
    // Clone the discarded tile for animation
    const clonedDiscarded = discardedTile.cloneNode(true);
    clonedDiscarded.style.position = 'fixed';
    clonedDiscarded.style.left = discardedRect.left + 'px';
    clonedDiscarded.style.top = discardedRect.top + 'px';
    clonedDiscarded.style.width = discardedTile.offsetWidth + 'px';
    clonedDiscarded.style.height = discardedTile.offsetHeight + 'px';
    clonedDiscarded.style.zIndex = '10000';
    clonedDiscarded.style.transform = 'scale(1) rotate(0deg)';
    clonedDiscarded.style.opacity = '1';
    clonedDiscarded.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
    clonedDiscarded.classList.add('animated-tile', 'exposed-kong-clone');
    document.body.appendChild(clonedDiscarded);
    
    // Move to top-right corner of third tile (higher position)
    setTimeout(() => {
        // Position at top-right corner of third tile, higher up
        const topRightX = thirdTileRect.right - 10;
        const topRightY = thirdTileRect.top - 70;
        
        clonedDiscarded.style.left = topRightX + 'px';
        clonedDiscarded.style.top = topRightY + 'px';
        clonedDiscarded.style.transform = 'scale(1.1) rotate(15deg)';
    }, 50);
    
    // Collision effect - move to upper-right side of third tile (碰一下)
    setTimeout(() => {
        // Create bounce/impact effect
        clonedDiscarded.style.transition = 'all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        // Move to the middle-top side of third tile (中上位置碰一下)
        const collisionX = thirdTileRect.left + (thirdTileRect.width / 2) - (clonedDiscarded.offsetWidth / 2);
        const collisionY = thirdTileRect.top - 10;
        
        clonedDiscarded.style.left = collisionX + 'px';
        clonedDiscarded.style.top = collisionY + 'px';
        clonedDiscarded.style.transform = 'scale(1.2) rotate(-10deg)';
        
        // Create impact ripple effect at collision point
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = collisionX + (clonedDiscarded.offsetWidth / 2) + 'px';
        ripple.style.top = collisionY + (clonedDiscarded.offsetHeight / 2) + 'px';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.border = '3px solid rgba(168, 85, 247, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.zIndex = '9999';
        ripple.style.pointerEvents = 'none';
        document.body.appendChild(ripple);
        
        // Animate ripple
        setTimeout(() => {
            ripple.style.transition = 'all 0.4s ease-out';
            ripple.style.width = '60px';
            ripple.style.height = '60px';
            ripple.style.opacity = '0';
            setTimeout(() => ripple.remove(), 400);
        }, 10);
        
        // Bounce back slightly
        setTimeout(() => {
            clonedDiscarded.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            clonedDiscarded.style.left = (collisionX - 5) + 'px';
            clonedDiscarded.style.top = (collisionY - 3) + 'px';
            clonedDiscarded.style.transform = 'scale(1.05) rotate(0deg)';
        }, 250);
    }, 1050);
    
    // Fade out the cloned tile
    setTimeout(() => {
        clonedDiscarded.style.transition = 'all 0.3s ease-out';
        clonedDiscarded.style.opacity = '0';
        clonedDiscarded.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (clonedDiscarded.parentNode) {
                clonedDiscarded.remove();
            }
        }, 300);
    }, 1400);
    
    // Show "Kong!" text after collision
    setTimeout(() => {
        const kongText = document.createElement('div');
        kongText.className = 'pung-kong-text kong-text';
        kongText.textContent = 'Kong!';
        kongText.style.position = 'fixed';
        kongText.style.left = thirdTileRect.left + (thirdTileRect.width / 2) + 'px';
        kongText.style.top = thirdTileRect.top - 50 + 'px';
        kongText.style.transform = 'translateX(-50%) scale(0.3)';
        kongText.style.opacity = '0';
        kongText.style.zIndex = '10001';
        kongText.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        document.body.appendChild(kongText);
        
        // Bounce appearance
        setTimeout(() => {
            kongText.style.transform = 'translateX(-50%) scale(1.3)';
            kongText.style.opacity = '1';
        }, 50);
        
        // Scale back
        setTimeout(() => {
            kongText.style.transform = 'translateX(-50%) scale(1) translateY(-10px)';
        }, 450);
        
        // Fade out and remove (faster)
        setTimeout(() => {
            kongText.style.opacity = '0';
            kongText.style.transform = 'translateX(-50%) scale(0.9) translateY(-20px)';
            setTimeout(() => kongText.remove(), 300);
        }, 1000);
    }, 1500);
    
    // Highlight the tiles group
    setTimeout(() => {
        tilesInHand.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        tilesInHand.style.transform = 'scale(1.12)';
        tiles.forEach(tile => {
            tile.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            tile.style.boxShadow = '0 4px 12px rgba(168, 85, 247, 0.5)';
        });
        
        setTimeout(() => {
            tilesInHand.style.transform = 'scale(1)';
            tiles.forEach(tile => {
                tile.style.boxShadow = '';
                tile.style.transition = '';
            });
            tilesInHand.style.transition = '';
            if (plusSymbol) {
                plusSymbol.style.transition = 'opacity 0.3s ease-in';
                plusSymbol.style.opacity = '1';
            }
            // Ensure original elements remain visible
            discardedTile.style.opacity = '1';
            discardedTile.style.visibility = 'visible';
            tilesInHand.style.opacity = '1';
            tilesInHand.style.visibility = 'visible';
            tiles.forEach(tile => {
                tile.style.opacity = '1';
                tile.style.visibility = 'visible';
            });
            exampleVisual.classList.remove('animating');
        }, 800);
    }, 1500);
    
    // Clean up - only remove this specific cloned tile (already handled above at line 1455)
    // The cleanup is done in the separate setTimeout at the end of the function
    
    // Original Kong animation for other cases
    let tilesToAnimate = [];
    
    if (tilesInHand) {
        tilesToAnimate = Array.from(tilesInHand.querySelectorAll('.tile'));
    } else if (meldedGroup) {
        tilesToAnimate = Array.from(meldedGroup.querySelectorAll('.tile'));
    }
    
    // Find the clicked tile (fourth tile)
    const fourthTile = lastTile || discardedTile || tilesToAnimate[tilesToAnimate.length - 1];
    if (!fourthTile || tilesToAnimate.length < 3) {
        exampleVisual.classList.remove('animating');
        return;
    }
    
    // Hide plus symbol
    const plus = exampleVisual.querySelector('.plus');
    if (plus) plus.style.opacity = '0';
    
    // Get target position (center of the group)
    const firstTileRect = tilesToAnimate[0].getBoundingClientRect();
    const targetX = firstTileRect.left;
    const targetY = firstTileRect.top;
    
    // Animate fourth tile moving to join the group
    const fourthRect = fourthTile.getBoundingClientRect();
    const clonedFourth = fourthTile.cloneNode(true);
    clonedFourth.style.position = 'fixed';
    clonedFourth.style.left = fourthRect.left + 'px';
    clonedFourth.style.top = fourthRect.top + 'px';
    clonedFourth.style.width = fourthTile.offsetWidth + 'px';
    clonedFourth.style.height = fourthTile.offsetHeight + 'px';
    clonedFourth.style.zIndex = '10000';
    clonedFourth.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    clonedFourth.classList.add('animated-tile');
    document.body.appendChild(clonedFourth);
    
    setTimeout(() => {
        clonedFourth.style.left = targetX + (tilesToAnimate.length * 40) + 'px';
        clonedFourth.style.top = targetY + 'px';
        clonedFourth.style.transform = 'scale(1.2) rotate(360deg)';
    }, 50);
    
    // Animate existing tiles moving closer together
    tilesToAnimate.forEach((tile, index) => {
        tile.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            tile.style.transform = `translateX(${-index * 5}px) scale(1.05)`;
        }, 50);
    });
    
    // Show "Kong!" text
    setTimeout(() => {
        const kongText = document.createElement('div');
        kongText.className = 'pung-kong-text kong-text';
        kongText.textContent = 'Kong!';
        kongText.style.position = 'fixed';
        kongText.style.left = targetX + (tilesToAnimate.length * 40) + 60 + 'px';
        kongText.style.top = targetY + 'px';
        kongText.style.zIndex = '10001';
        document.body.appendChild(kongText);
        
        setTimeout(() => {
            kongText.style.transform = 'scale(1.3)';
            kongText.style.opacity = '1';
        }, 50);
        
        setTimeout(() => {
            kongText.style.opacity = '0';
            kongText.style.transform = 'scale(0.8) translateY(-20px) rotate(10deg)';
            setTimeout(() => kongText.remove(), 300);
        }, 2000);
    }, 650);
    
    // Highlight the entire group
    setTimeout(() => {
        const container = tilesInHand || meldedGroup;
        container.style.transform = 'scale(1.1)';
        container.style.filter = 'brightness(1.2)';
        container.style.boxShadow = '0 8px 24px rgba(168, 85, 247, 0.6)';
        
        tilesToAnimate.forEach(tile => {
            tile.style.boxShadow = '0 4px 12px rgba(168, 85, 247, 0.4)';
        });
        
        setTimeout(() => {
            container.style.transform = '';
            container.style.filter = '';
            container.style.boxShadow = '';
            tilesToAnimate.forEach(tile => {
                tile.style.transform = '';
                tile.style.boxShadow = '';
                tile.style.transition = '';
            });
            if (plus) plus.style.opacity = '1';
            exampleVisual.classList.remove('animating');
        }, 800);
    }, 650);
    
    // Clean up
    setTimeout(() => {
        clonedFourth.remove();
    }, 1200);
}

// Added Kong Animation Effect - Special animation for Added Kong
function triggerAddedKongAnimation(exampleVisual, meldedGroup, fourthTile) {
    // Hide plus symbol
    const plusSymbol = exampleVisual.querySelector('.plus');
    if (plusSymbol) plusSymbol.style.opacity = '0';
    
    // Get the third tile (last tile in melded-group) as target
    const tiles = Array.from(meldedGroup.querySelectorAll('.tile-img-container'));
    if (tiles.length < 3) {
        exampleVisual.classList.remove('animating');
        return;
    }
    
    const thirdTile = tiles[tiles.length - 1]; // Third tile
    const thirdTileRect = thirdTile.getBoundingClientRect();
    const fourthTileRect = fourthTile.getBoundingClientRect();
    
    // Ensure original elements remain visible
    fourthTile.style.opacity = '1';
    fourthTile.style.visibility = 'visible';
    meldedGroup.style.opacity = '1';
    meldedGroup.style.visibility = 'visible';
    tiles.forEach(tile => {
        tile.style.opacity = '1';
        tile.style.visibility = 'visible';
    });
    
    // Clone the fourth tile for animation
    const clonedFourth = fourthTile.cloneNode(true);
    clonedFourth.style.position = 'fixed';
    clonedFourth.style.left = fourthTileRect.left + 'px';
    clonedFourth.style.top = fourthTileRect.top + 'px';
    clonedFourth.style.width = fourthTile.offsetWidth + 'px';
    clonedFourth.style.height = fourthTile.offsetHeight + 'px';
    clonedFourth.style.zIndex = '10000';
    clonedFourth.style.transform = 'scale(1) rotate(0deg)';
    clonedFourth.style.opacity = '1';
    clonedFourth.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
    clonedFourth.classList.add('animated-tile', 'added-kong-clone');
    document.body.appendChild(clonedFourth);
    
    // Move to top-right corner of third tile (higher position)
    setTimeout(() => {
        // Position at top-right corner of third tile, higher up
        const topRightX = thirdTileRect.right - 10;
        const topRightY = thirdTileRect.top - 70;
        
        clonedFourth.style.left = topRightX + 'px';
        clonedFourth.style.top = topRightY + 'px';
        clonedFourth.style.transform = 'scale(1.1) rotate(15deg)';
    }, 50);
    
    // Collision effect - move to upper-right side of third tile (碰一下)
    setTimeout(() => {
        // Create bounce/impact effect
        clonedFourth.style.transition = 'all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        // Move to the middle-top side of third tile (中上位置碰一下)
        const collisionX = thirdTileRect.left + (thirdTileRect.width / 2) - (clonedFourth.offsetWidth / 2);
        const collisionY = thirdTileRect.top - 10;
        
        clonedFourth.style.left = collisionX + 'px';
        clonedFourth.style.top = collisionY + 'px';
        clonedFourth.style.transform = 'scale(1.2) rotate(-10deg)';
        
        // Create impact ripple effect at collision point
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = collisionX + (clonedFourth.offsetWidth / 2) + 'px';
        ripple.style.top = collisionY + (clonedFourth.offsetHeight / 2) + 'px';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.border = '3px solid rgba(168, 85, 247, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.zIndex = '9999';
        ripple.style.pointerEvents = 'none';
        document.body.appendChild(ripple);
        
        // Animate ripple
        setTimeout(() => {
            ripple.style.transition = 'all 0.4s ease-out';
            ripple.style.width = '60px';
            ripple.style.height = '60px';
            ripple.style.opacity = '0';
            setTimeout(() => ripple.remove(), 400);
        }, 10);
        
        // Bounce back slightly
        setTimeout(() => {
            clonedFourth.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            clonedFourth.style.left = (collisionX - 5) + 'px';
            clonedFourth.style.top = (collisionY - 3) + 'px';
            clonedFourth.style.transform = 'scale(1.05) rotate(0deg)';
        }, 250);
    }, 1050);
    
    // Fade out the cloned tile
    setTimeout(() => {
        clonedFourth.style.transition = 'all 0.3s ease-out';
        clonedFourth.style.opacity = '0';
        clonedFourth.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (clonedFourth.parentNode) {
                clonedFourth.remove();
            }
        }, 300);
    }, 1400);
    
    // Show "Kong!" text after collision
    setTimeout(() => {
        const kongText = document.createElement('div');
        kongText.className = 'pung-kong-text kong-text';
        kongText.textContent = 'Kong!';
        kongText.style.position = 'fixed';
        kongText.style.left = thirdTileRect.left + (thirdTileRect.width / 2) + 'px';
        kongText.style.top = thirdTileRect.top - 50 + 'px';
        kongText.style.transform = 'translateX(-50%) scale(0.3)';
        kongText.style.opacity = '0';
        kongText.style.zIndex = '10001';
        kongText.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        document.body.appendChild(kongText);
        
        // Bounce appearance
        setTimeout(() => {
            kongText.style.transform = 'translateX(-50%) scale(1.3)';
            kongText.style.opacity = '1';
        }, 50);
        
        // Scale back
        setTimeout(() => {
            kongText.style.transform = 'translateX(-50%) scale(1) translateY(-10px)';
        }, 450);
        
        // Fade out and remove (faster)
        setTimeout(() => {
            kongText.style.opacity = '0';
            kongText.style.transform = 'translateX(-50%) scale(0.9) translateY(-20px)';
            setTimeout(() => kongText.remove(), 300);
        }, 1000);
    }, 1500);
    
    // Highlight the melded group
    setTimeout(() => {
        meldedGroup.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        meldedGroup.style.transform = 'scale(1.12)';
        tiles.forEach(tile => {
            tile.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            tile.style.boxShadow = '0 4px 12px rgba(168, 85, 247, 0.5)';
        });
        
        setTimeout(() => {
            meldedGroup.style.transform = 'scale(1)';
            tiles.forEach(tile => {
                tile.style.boxShadow = '';
                tile.style.transition = '';
            });
            meldedGroup.style.transition = '';
            if (plusSymbol) {
                plusSymbol.style.transition = 'opacity 0.3s ease-in';
                plusSymbol.style.opacity = '1';
            }
            // Ensure original elements remain visible
            meldedGroup.style.opacity = '1';
            meldedGroup.style.visibility = 'visible';
            fourthTile.style.opacity = '1';
            fourthTile.style.visibility = 'visible';
            tiles.forEach(tile => {
                tile.style.opacity = '1';
                tile.style.visibility = 'visible';
            });
            exampleVisual.classList.remove('animating');
        }, 800);
    }, 1500);
    
    // Clean up - only remove this specific cloned tile (Added Kong)
    setTimeout(() => {
        if (clonedFourth && clonedFourth.parentNode) {
            clonedFourth.remove();
        }
        // Also clean up any other added-kong-clone elements that might be orphaned
        document.querySelectorAll('.added-kong-clone').forEach(tile => {
            if (tile.parentNode === document.body) {
                tile.remove();
            }
        });
    }, 3000);
    
    // Ensure original elements remain visible after animation
    setTimeout(() => {
        meldedGroup.style.opacity = '1';
        meldedGroup.style.visibility = 'visible';
        fourthTile.style.opacity = '1';
        fourthTile.style.visibility = 'visible';
        tiles.forEach(tile => {
            tile.style.opacity = '1';
            tile.style.visibility = 'visible';
        });
    }, 3000);
}

// Concealed Kong Animation Effect - Wave animation
function triggerConcealedKongAnimation(exampleVisual, tiles) {
    // Prevent multiple clicks
    if (exampleVisual.classList.contains('animating')) return;
    exampleVisual.classList.add('animating');
    
    const tilesArray = Array.from(tiles);
    if (tilesArray.length !== 4) {
        exampleVisual.classList.remove('animating');
        return;
    }
    
    // Get the center position for text
    const firstTileRect = tilesArray[0].getBoundingClientRect();
    const lastTileRect = tilesArray[tilesArray.length - 1].getBoundingClientRect();
    const centerX = (firstTileRect.left + lastTileRect.right) / 2;
    const centerY = firstTileRect.top - 50;
    
    // Wave animation: each tile moves up and down in sequence with more dynamic effects
    tilesArray.forEach((tile, index) => {
        const originalTransform = tile.style.transform || '';
        const originalTransition = tile.style.transition || '';
        const originalBoxShadow = tile.style.boxShadow || '';
        
        // Set up animation timing - faster for more lively effect
        const delay = index * 120; // 120ms delay between each tile (faster)
        
        // First wave: move up with rotation and scale
        setTimeout(() => {
            tile.style.transition = 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
            tile.style.transform = 'translateY(-25px) scale(1.2) rotate(-5deg)';
            tile.style.boxShadow = '0 8px 20px rgba(168, 85, 247, 0.6)';
            tile.style.zIndex = '10';
        }, delay);
        
        // Bounce back down with opposite rotation
        setTimeout(() => {
            tile.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            tile.style.transform = 'translateY(5px) scale(0.95) rotate(3deg)';
            tile.style.boxShadow = '0 4px 12px rgba(168, 85, 247, 0.4)';
        }, delay + 250);
        
        // Final return with bounce
        setTimeout(() => {
            tile.style.transition = 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
            tile.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            tile.style.boxShadow = originalBoxShadow;
            tile.style.zIndex = '';
        }, delay + 550);
        
        // Restore original styles after animation
        setTimeout(() => {
            tile.style.transform = originalTransform;
            tile.style.transition = originalTransition;
            tile.style.boxShadow = originalBoxShadow;
        }, delay + 800);
    });
    
    // Show "Kong!" text after wave animation starts - more dynamic
    setTimeout(() => {
        const kongText = document.createElement('div');
        kongText.className = 'pung-kong-text kong-text';
        kongText.textContent = 'Kong!';
        kongText.style.position = 'fixed';
        kongText.style.left = centerX + 'px';
        kongText.style.top = centerY + 'px';
        kongText.style.transform = 'translateX(-50%) scale(0.2) rotate(-10deg)';
        kongText.style.opacity = '0';
        kongText.style.zIndex = '10001';
        kongText.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        document.body.appendChild(kongText);
        
        // Bounce appearance with rotation
        setTimeout(() => {
            kongText.style.transform = 'translateX(-50%) scale(1.4) rotate(5deg)';
            kongText.style.opacity = '1';
        }, 50);
        
        // Scale back with slight rotation
        setTimeout(() => {
            kongText.style.transform = 'translateX(-50%) scale(1) rotate(0deg) translateY(-15px)';
        }, 350);
        
        // Slight bounce up
        setTimeout(() => {
            kongText.style.transform = 'translateX(-50%) scale(1.05) rotate(-2deg) translateY(-20px)';
        }, 500);
        
        // Final position
        setTimeout(() => {
            kongText.style.transform = 'translateX(-50%) scale(1) rotate(0deg) translateY(-15px)';
        }, 650);
        
        // Fade out and remove
        setTimeout(() => {
            kongText.style.opacity = '0';
            kongText.style.transform = 'translateX(-50%) scale(0.9) rotate(5deg) translateY(-25px)';
            setTimeout(() => kongText.remove(), 300);
        }, 1800);
    }, 480);
    
    // Reset animating flag after all animations complete
    setTimeout(() => {
        exampleVisual.classList.remove('animating');
    }, 1500);
}

// Setup Pung and Kong Interactive Effects
function setupPungKongInteractions() {
    // Setup Pung interaction - look for discarded tile with img container
    document.querySelectorAll('.example-visual').forEach(visual => {
        // Check if this is in a Pung modal or claim card
        const pungModal = visual.closest('#pung-modal');
        const claimCard = visual.closest('.claim-card');
        const isPung = pungModal || (claimCard && claimCard.querySelector('h4') && claimCard.querySelector('h4').textContent.includes('Pung'));
        
        if (isPung) {
            const discardedTile = visual.querySelector('.tile-img-container.discarded');
            if (discardedTile) {
                discardedTile.style.cursor = 'pointer';
                discardedTile.title = 'Click to see Pung!';
                discardedTile.addEventListener('click', (e) => {
                    e.stopPropagation();
                    triggerPungAnimation(discardedTile);
                });
            }
        }
    });
    
    // Setup Kong interactions
    document.querySelectorAll('.kong-type-card .example-visual').forEach(visual => {
        const kongTypeCard = visual.closest('.kong-type-card');
        const kongTitle = kongTypeCard ? kongTypeCard.querySelector('h5') : null;
        const isConcealedKong = kongTitle && kongTitle.textContent.includes('Concealed Kong');
        
        // Check if this is Concealed Kong (has 4 tiles in tiles-in-hand, no discarded tile, no melded-group)
        const tilesInHand = visual.querySelector('.tiles-in-hand');
        const discardedTile = visual.querySelector('.tile-img-container.discarded');
        const meldedGroup = visual.querySelector('.melded-group');
        const allTiles = visual.querySelectorAll('.tile-img-container');
        
        if (isConcealedKong && tilesInHand && !discardedTile && !meldedGroup && allTiles.length === 4) {
            // Concealed Kong: make all tiles clickable
            allTiles.forEach(tile => {
                tile.style.cursor = 'pointer';
                tile.title = 'Click to see Kong!';
                tile.addEventListener('click', (e) => {
                    e.stopPropagation();
                    triggerConcealedKongAnimation(visual, allTiles);
                });
            });
        } else {
            // Other Kong types: find the fourth tile
            const fourthTile = discardedTile || (allTiles.length > 0 ? allTiles[allTiles.length - 1] : null);
            
            if (fourthTile && !fourthTile.closest('.melded-group')) {
                // Make sure it's not part of the melded group
                fourthTile.style.cursor = 'pointer';
                fourthTile.title = 'Click to see Kong!';
                fourthTile.addEventListener('click', (e) => {
                    e.stopPropagation();
                    triggerKongAnimation(fourthTile);
                });
            }
        }
    });
}

// ========== Challenge Game Functions ==========

// Challenge game state
let challengeState = {
    currentQuestion: 1,
    answers: {},
    correctAnswers: {
        1: 'C', // 8万 forms a pair with 8万
        2: 'B', // 二筒 forms a triplet with two 二筒
        3: 'B'  // 3条 forms a sequence with 4条 and 5条
    }
};

// Open challenge modal
function openChallengeModal() {
    const modal = document.getElementById('challenge-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        resetChallenge();
    }
}

// Close challenge modal
function closeChallengeModal() {
    const modal = document.getElementById('challenge-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Select answer for a question
function selectAnswer(questionNum, answer) {
    // Prevent multiple selections if already answered correctly
    const questionDiv = document.getElementById(`question-${questionNum}`);
    if (questionDiv.classList.contains('answered-correctly')) {
        return;
    }

    // Get the selected button
    const selectedBtn = questionDiv.querySelector(`[data-answer="${answer}"]`);
    const feedbackDiv = document.getElementById(`feedback-${questionNum}`);

    // Check if answer is correct
    const isCorrect = answer === challengeState.correctAnswers[questionNum];

    if (isCorrect) {
        // Mark question as answered correctly
        questionDiv.classList.add('answered-correctly');
        challengeState.answers[questionNum] = answer;

        // Disable all options
        const options = questionDiv.querySelectorAll('.option-btn');
        options.forEach(btn => {
            btn.disabled = true;
            btn.style.pointerEvents = 'none';
        });

        selectedBtn.classList.add('correct');
        feedbackDiv.innerHTML = '<div class="feedback-message correct-feedback centered-feedback">✓ Correct! Well done!</div>';
        
        // Play success animation
        selectedBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            selectedBtn.style.transform = '';
        }, 300);

        // Show next question or results after delay
        setTimeout(() => {
            if (questionNum < 3) {
                showNextQuestion(questionNum + 1);
            } else {
                showResults();
            }
        }, 2000);
    } else {
        // Answer is wrong - allow retry
        selectedBtn.classList.add('incorrect');
        feedbackDiv.innerHTML = '<div class="feedback-message incorrect-feedback centered-feedback">✗ Not quite. Try again!</div>';
        
        // Remove incorrect class after animation, but keep feedback visible
        // Allow user to try other options
        setTimeout(() => {
            selectedBtn.classList.remove('incorrect');
            // Don't disable the button, allow retry
        }, 1000);
    }
}

// Show next question
function showNextQuestion(questionNum) {
    const currentQuestion = document.getElementById(`question-${questionNum - 1}`);
    const nextQuestion = document.getElementById(`question-${questionNum}`);
    
    if (currentQuestion) {
        currentQuestion.classList.add('hidden');
    }
    
    if (nextQuestion) {
        nextQuestion.classList.remove('hidden');
        nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Show results
function showResults() {
    const question3 = document.getElementById('question-3');
    const results = document.getElementById('challenge-results');
    
    if (question3) {
        question3.classList.add('hidden');
    }
    
    if (results) {
        results.classList.remove('hidden');
        // Calculate score
        let score = 0;
        for (let i = 1; i <= 3; i++) {
            if (challengeState.answers[i] === challengeState.correctAnswers[i]) {
                score++;
            }
        }
        
        const scoreDisplay = document.getElementById('score-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = score;
        }
        
        results.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Trigger confetti animation
        triggerConfetti();
    }
}

// Trigger confetti animation
function triggerConfetti() {
    const resultsContent = document.querySelector('.results-content');
    if (!resultsContent) return;

    // Create confetti elements from left side (more pieces for better effect)
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            createConfettiPiece('left', i);
        }, i * 40);
    }

    // Create confetti elements from right side
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            createConfettiPiece('right', i);
        }, i * 40);
    }
}

// Create a single confetti piece
function createConfettiPiece(side, index) {
    const colors = ['#58cc02', '#1cb0f6', '#ffc800', '#ff9600', '#ce82ff', '#a855f7'];
    const confetti = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.className = 'confetti-piece';
    confetti.style.backgroundColor = color;
    confetti.style.position = 'fixed';
    confetti.style.width = Math.random() * 15 + 10 + 'px';
    confetti.style.height = Math.random() * 15 + 10 + 'px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    
    // Starting position based on side
    const modal = document.querySelector('.challenge-modal-content');
    const modalRect = modal ? modal.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 700, height: 600 };
    
    // Calculate center point of results area
    const centerY = modalRect.top + modalRect.height / 2;
    const startY = centerY + (Math.random() - 0.5) * 150;
    
    if (side === 'left') {
        confetti.style.left = (modalRect.left - 30) + 'px';
        confetti.style.top = startY + 'px';
    } else {
        confetti.style.left = (modalRect.right + 30) + 'px';
        confetti.style.top = startY + 'px';
    }
    
    confetti.style.zIndex = '10001';
    confetti.style.opacity = '1';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    document.body.appendChild(confetti);
    
    // Animate confetti - spread outward from center
    const angle = side === 'left' 
        ? Math.random() * 30 + 0  // 0-30 degrees (flying right)
        : Math.random() * 30 + 150; // 150-180 degrees (flying left)
    const distance = Math.random() * 500 + 400;
    const rotation = (Math.random() * 1080 + 360) * (side === 'left' ? 1 : -1);
    const gravity = 300; // Gravity effect
    
    const endX = parseFloat(confetti.style.left) + Math.cos(angle * Math.PI / 180) * distance;
    const endY = parseFloat(confetti.style.top) + Math.sin(angle * Math.PI / 180) * distance + gravity;
    
    confetti.style.transition = 'all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    setTimeout(() => {
        confetti.style.left = endX + 'px';
        confetti.style.top = endY + 'px';
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.style.opacity = '0';
    }, 50);
    
    // Remove confetti after animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.remove();
        }
    }, 2550);
}

// Reset challenge game
function resetChallenge() {
    challengeState.currentQuestion = 1;
    challengeState.answers = {};

    // Remove all confetti
    document.querySelectorAll('.confetti-piece').forEach(piece => {
        piece.remove();
    });

    // Reset all questions
    for (let i = 1; i <= 3; i++) {
        const questionDiv = document.getElementById(`question-${i}`);
        if (questionDiv) {
            questionDiv.classList.remove('answered', 'answered-correctly', 'hidden');
            if (i > 1) {
                questionDiv.classList.add('hidden');
            }

            // Reset options
            const options = questionDiv.querySelectorAll('.option-btn');
            options.forEach(btn => {
                btn.disabled = false;
                btn.style.pointerEvents = '';
                btn.classList.remove('correct', 'incorrect');
            });

            // Clear feedback
            const feedback = document.getElementById(`feedback-${i}`);
            if (feedback) {
                feedback.innerHTML = '';
            }
        }
    }

    // Hide results
    const results = document.getElementById('challenge-results');
    if (results) {
        results.classList.add('hidden');
    }
}

// Setup challenge modal handlers
function setupChallengeModalHandlers() {
    const modal = document.getElementById('challenge-modal');
    if (!modal) return;

    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');

    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', closeChallengeModal);
    }

    // Close on close button click (already handled by onclick, but add here for consistency)
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeChallengeModal();
        }
    });
}

// Initialize challenge modal handlers when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupChallengeModalHandlers);
} else {
    setupChallengeModalHandlers();
}

// ========== Goal Challenge Game Functions ==========

// Goal challenge game state
let goalChallengeState = {
    currentQuestion: 1,
    answers: {},
    correctAnswers: {
        1: 'C', // 6筒 can complete the sequence 5筒-6筒-7筒 for winning hand
        2: 'C', // 8万 can form Seven Pairs (already have one 8万, need another)
        3: 'A'  // 红中 (Red Dragon) can make Thirteen Orphans (need duplicate of any of the 13 tiles)
    }
};

// Open goal challenge modal
function openGoalChallengeModal() {
    const modal = document.getElementById('goal-challenge-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        resetGoalChallenge();
    }
}

// Close goal challenge modal
function closeGoalChallengeModal() {
    const modal = document.getElementById('goal-challenge-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Select answer for goal challenge question
function selectGoalAnswer(questionNum, answer) {
    // Prevent multiple selections if already answered correctly
    const questionDiv = document.getElementById(`goal-question-${questionNum}`);
    if (questionDiv.classList.contains('answered-correctly')) {
        return;
    }

    // Get the selected button
    const selectedBtn = questionDiv.querySelector(`[data-answer="${answer}"]`);
    const feedbackDiv = document.getElementById(`goal-feedback-${questionNum}`);

    // Check if answer is correct
    const isCorrect = answer === goalChallengeState.correctAnswers[questionNum];

    if (isCorrect) {
        // Mark question as answered correctly
        questionDiv.classList.add('answered-correctly');
        goalChallengeState.answers[questionNum] = answer;

        // Disable all options
        const options = questionDiv.querySelectorAll('.option-btn');
        options.forEach(btn => {
            btn.disabled = true;
            btn.style.pointerEvents = 'none';
        });

        selectedBtn.classList.add('correct');
        feedbackDiv.innerHTML = '<div class="feedback-message correct-feedback centered-feedback">✓ Correct! Well done!</div>';
        
        // Play success animation
        selectedBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            selectedBtn.style.transform = '';
        }, 300);

        // Show next question or results after delay
        setTimeout(() => {
            if (questionNum < 3) {
                showNextGoalQuestion(questionNum + 1);
            } else {
                showGoalResults();
            }
        }, 2000);
    } else {
        // Answer is wrong - allow retry
        selectedBtn.classList.add('incorrect');
        feedbackDiv.innerHTML = '<div class="feedback-message incorrect-feedback centered-feedback">✗ Not quite. Try again!</div>';
        
        // Remove incorrect class after animation, but keep feedback visible
        // Allow user to try other options
        setTimeout(() => {
            selectedBtn.classList.remove('incorrect');
            // Don't disable the button, allow retry
        }, 1000);
    }
}

// Show next goal question
function showNextGoalQuestion(questionNum) {
    const currentQuestion = document.getElementById(`goal-question-${questionNum - 1}`);
    const nextQuestion = document.getElementById(`goal-question-${questionNum}`);
    
    if (currentQuestion) {
        currentQuestion.classList.add('hidden');
    }
    
    if (nextQuestion) {
        nextQuestion.classList.remove('hidden');
        nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Show goal results
function showGoalResults() {
    const question3 = document.getElementById('goal-question-3');
    const results = document.getElementById('goal-challenge-results');
    
    if (question3) {
        question3.classList.add('hidden');
    }
    
    if (results) {
        results.classList.remove('hidden');
        // Calculate score
        let score = 0;
        for (let i = 1; i <= 3; i++) {
            if (goalChallengeState.answers[i] === goalChallengeState.correctAnswers[i]) {
                score++;
            }
        }
        
        const scoreDisplay = document.getElementById('goal-score-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = score;
        }
        
        results.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Trigger confetti animation
        triggerGoalConfetti();
    }
}

// Trigger goal confetti animation
function triggerGoalConfetti() {
    const resultsContent = document.querySelector('#goal-challenge-results .results-content');
    if (!resultsContent) return;

    // Create confetti elements from left side (more pieces for better effect)
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            createGoalConfettiPiece('left', i);
        }, i * 40);
    }

    // Create confetti elements from right side
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            createGoalConfettiPiece('right', i);
        }, i * 40);
    }
}

// Create a single goal confetti piece
function createGoalConfettiPiece(side, index) {
    const colors = ['#58cc02', '#1cb0f6', '#ffc800', '#ff9600', '#ce82ff', '#a855f7'];
    const confetti = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.className = 'confetti-piece';
    confetti.style.backgroundColor = color;
    confetti.style.position = 'fixed';
    confetti.style.width = Math.random() * 15 + 10 + 'px';
    confetti.style.height = Math.random() * 15 + 10 + 'px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    
    // Starting position based on side
    const modal = document.querySelector('#goal-challenge-modal .challenge-modal-content');
    const modalRect = modal ? modal.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 700, height: 600 };
    
    // Calculate center point of results area
    const centerY = modalRect.top + modalRect.height / 2;
    const startY = centerY + (Math.random() - 0.5) * 150;
    
    if (side === 'left') {
        confetti.style.left = (modalRect.left - 30) + 'px';
        confetti.style.top = startY + 'px';
    } else {
        confetti.style.left = (modalRect.right + 30) + 'px';
        confetti.style.top = startY + 'px';
    }
    
    confetti.style.zIndex = '10001';
    confetti.style.opacity = '1';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    document.body.appendChild(confetti);
    
    // Animate confetti - spread outward from center
    const angle = side === 'left' 
        ? Math.random() * 30 + 0  // 0-30 degrees (flying right)
        : Math.random() * 30 + 150; // 150-180 degrees (flying left)
    const distance = Math.random() * 500 + 400;
    const rotation = (Math.random() * 1080 + 360) * (side === 'left' ? 1 : -1);
    const gravity = 300; // Gravity effect
    
    const endX = parseFloat(confetti.style.left) + Math.cos(angle * Math.PI / 180) * distance;
    const endY = parseFloat(confetti.style.top) + Math.sin(angle * Math.PI / 180) * distance + gravity;
    
    confetti.style.transition = 'all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    setTimeout(() => {
        confetti.style.left = endX + 'px';
        confetti.style.top = endY + 'px';
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.style.opacity = '0';
    }, 50);
    
    // Remove confetti after animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.remove();
        }
    }, 2550);
}

// Reset goal challenge game
function resetGoalChallenge() {
    goalChallengeState.currentQuestion = 1;
    goalChallengeState.answers = {};

    // Remove all confetti
    document.querySelectorAll('.confetti-piece').forEach(piece => {
        piece.remove();
    });

    // Reset all questions
    for (let i = 1; i <= 3; i++) {
        const questionDiv = document.getElementById(`goal-question-${i}`);
        if (questionDiv) {
            questionDiv.classList.remove('answered', 'answered-correctly', 'hidden');
            if (i > 1) {
                questionDiv.classList.add('hidden');
            }

            // Reset options
            const options = questionDiv.querySelectorAll('.option-btn');
            options.forEach(btn => {
                btn.disabled = false;
                btn.style.pointerEvents = '';
                btn.classList.remove('correct', 'incorrect');
            });

            // Clear feedback
            const feedback = document.getElementById(`goal-feedback-${i}`);
            if (feedback) {
                feedback.innerHTML = '';
            }
        }
    }

    // Hide results
    const results = document.getElementById('goal-challenge-results');
    if (results) {
        results.classList.add('hidden');
    }
}

// Setup goal challenge modal handlers
function setupGoalChallengeModalHandlers() {
    const modal = document.getElementById('goal-challenge-modal');
    if (!modal) return;

    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');

    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', closeGoalChallengeModal);
    }

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeGoalChallengeModal();
        }
    });
}

// Initialize goal challenge modal handlers when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGoalChallengeModalHandlers);
} else {
    setupGoalChallengeModalHandlers();
}

// ========== Pung/Kong Challenge Game Functions ==========

// Pung/Kong challenge game state
let pungKongChallengeState = {
    currentQuestion: 1,
    answers: {},
    correctAnswers: {
        1: 'B', // 7筒 can form a Pung with two 7筒
        2: 'A'  // 1万 can form a Kong with three 1万
    }
};

// Open pung/kong challenge modal
function openPungKongChallengeModal() {
    const modal = document.getElementById('pung-kong-challenge-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        resetPungKongChallenge();
    }
}

// Close pung/kong challenge modal
function closePungKongChallengeModal() {
    const modal = document.getElementById('pung-kong-challenge-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Select answer for pung/kong challenge question
function selectPungKongAnswer(questionNum, answer) {
    // Prevent multiple selections if already answered correctly
    const questionDiv = document.getElementById(`pung-kong-question-${questionNum}`);
    if (questionDiv.classList.contains('answered-correctly')) {
        return;
    }

    // Get the selected button
    const selectedBtn = questionDiv.querySelector(`[data-answer="${answer}"]`);
    const feedbackDiv = document.getElementById(`pung-kong-feedback-${questionNum}`);

    // Check if answer is correct
    const isCorrect = answer === pungKongChallengeState.correctAnswers[questionNum];

    if (isCorrect) {
        // Mark question as answered correctly
        questionDiv.classList.add('answered-correctly');
        pungKongChallengeState.answers[questionNum] = answer;

        // Disable all options
        const options = questionDiv.querySelectorAll('.option-btn');
        options.forEach(btn => {
            btn.disabled = true;
            btn.style.pointerEvents = 'none';
        });

        selectedBtn.classList.add('correct');
        feedbackDiv.innerHTML = '<div class="feedback-message correct-feedback centered-feedback">✓ Correct! Well done!</div>';
        
        // Play success animation
        selectedBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            selectedBtn.style.transform = '';
        }, 300);

        // Show next question or results after delay
        setTimeout(() => {
            if (questionNum < 2) {
                showNextPungKongQuestion(questionNum + 1);
            } else {
                showPungKongResults();
            }
        }, 2000);
    } else {
        // Answer is wrong - allow retry
        selectedBtn.classList.add('incorrect');
        feedbackDiv.innerHTML = '<div class="feedback-message incorrect-feedback centered-feedback">✗ Not quite. Try again!</div>';
        
        // Remove incorrect class after animation, but keep feedback visible
        // Allow user to try other options
        setTimeout(() => {
            selectedBtn.classList.remove('incorrect');
            // Don't disable the button, allow retry
        }, 1000);
    }
}

// Show next pung/kong question
function showNextPungKongQuestion(questionNum) {
    const currentQuestion = document.getElementById(`pung-kong-question-${questionNum - 1}`);
    const nextQuestion = document.getElementById(`pung-kong-question-${questionNum}`);
    
    if (currentQuestion) {
        currentQuestion.classList.add('hidden');
    }
    
    if (nextQuestion) {
        nextQuestion.classList.remove('hidden');
        nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Show pung/kong results
function showPungKongResults() {
    const question2 = document.getElementById('pung-kong-question-2');
    const results = document.getElementById('pung-kong-challenge-results');
    
    if (question2) {
        question2.classList.add('hidden');
    }
    
    if (results) {
        results.classList.remove('hidden');
        // Calculate score
        let score = 0;
        for (let i = 1; i <= 2; i++) {
            if (pungKongChallengeState.answers[i] === pungKongChallengeState.correctAnswers[i]) {
                score++;
            }
        }
        
        const scoreDisplay = document.getElementById('pung-kong-score-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = score;
        }
        
        results.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Trigger confetti animation
        triggerPungKongConfetti();
    }
}

// Trigger pung/kong confetti animation
function triggerPungKongConfetti() {
    const resultsContent = document.querySelector('#pung-kong-challenge-results .results-content');
    if (!resultsContent) return;

    // Create confetti elements from left side (more pieces for better effect)
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            createPungKongConfettiPiece('left', i);
        }, i * 40);
    }

    // Create confetti elements from right side
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            createPungKongConfettiPiece('right', i);
        }, i * 40);
    }
}

// Create a single pung/kong confetti piece
function createPungKongConfettiPiece(side, index) {
    const colors = ['#58cc02', '#1cb0f6', '#ffc800', '#ff9600', '#ce82ff', '#a855f7'];
    const confetti = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.className = 'confetti-piece';
    confetti.style.backgroundColor = color;
    confetti.style.position = 'fixed';
    confetti.style.width = Math.random() * 15 + 10 + 'px';
    confetti.style.height = Math.random() * 15 + 10 + 'px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    
    // Starting position based on side
    const modal = document.querySelector('#pung-kong-challenge-modal .challenge-modal-content');
    const modalRect = modal ? modal.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 1000, height: 600 };
    
    // Calculate center point of results area
    const centerY = modalRect.top + modalRect.height / 2;
    const startY = centerY + (Math.random() - 0.5) * 150;
    
    if (side === 'left') {
        confetti.style.left = (modalRect.left - 30) + 'px';
        confetti.style.top = startY + 'px';
    } else {
        confetti.style.left = (modalRect.right + 30) + 'px';
        confetti.style.top = startY + 'px';
    }
    
    confetti.style.zIndex = '10001';
    confetti.style.opacity = '1';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    document.body.appendChild(confetti);
    
    // Animate confetti - spread outward from center
    const angle = side === 'left' 
        ? Math.random() * 30 + 0  // 0-30 degrees (flying right)
        : Math.random() * 30 + 150; // 150-180 degrees (flying left)
    const distance = Math.random() * 500 + 400;
    const rotation = (Math.random() * 1080 + 360) * (side === 'left' ? 1 : -1);
    const gravity = 300; // Gravity effect
    
    const endX = parseFloat(confetti.style.left) + Math.cos(angle * Math.PI / 180) * distance;
    const endY = parseFloat(confetti.style.top) + Math.sin(angle * Math.PI / 180) * distance + gravity;
    
    confetti.style.transition = 'all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    setTimeout(() => {
        confetti.style.left = endX + 'px';
        confetti.style.top = endY + 'px';
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.style.opacity = '0';
    }, 50);
    
    // Remove confetti after animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.remove();
        }
    }, 2550);
}

// Reset pung/kong challenge game
function resetPungKongChallenge() {
    pungKongChallengeState.currentQuestion = 1;
    pungKongChallengeState.answers = {};

    // Remove all confetti
    document.querySelectorAll('.confetti-piece').forEach(piece => {
        piece.remove();
    });

    // Reset all questions
    for (let i = 1; i <= 2; i++) {
        const questionDiv = document.getElementById(`pung-kong-question-${i}`);
        if (questionDiv) {
            questionDiv.classList.remove('answered', 'answered-correctly', 'hidden');
            if (i > 1) {
                questionDiv.classList.add('hidden');
            }

            // Reset options
            const options = questionDiv.querySelectorAll('.option-btn');
            options.forEach(btn => {
                btn.disabled = false;
                btn.style.pointerEvents = '';
                btn.classList.remove('correct', 'incorrect');
            });

            // Clear feedback
            const feedback = document.getElementById(`pung-kong-feedback-${i}`);
            if (feedback) {
                feedback.innerHTML = '';
            }
        }
    }

    // Hide results
    const results = document.getElementById('pung-kong-challenge-results');
    if (results) {
        results.classList.add('hidden');
    }
}

// Setup pung/kong challenge modal handlers
function setupPungKongChallengeModalHandlers() {
    const modal = document.getElementById('pung-kong-challenge-modal');
    if (!modal) return;

    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');

    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', closePungKongChallengeModal);
    }

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePungKongChallengeModal();
        }
    });
}

// Initialize pung/kong challenge modal handlers when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPungKongChallengeModalHandlers);
} else {
    setupPungKongChallengeModalHandlers();
}


