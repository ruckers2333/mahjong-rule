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

// Add Navigation Active State
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const windowHeight = window.innerHeight;
    const scrollPosition = window.pageYOffset + windowHeight / 2;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Add Active State CSS for Nav Links
function addActiveNavStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            background: rgba(255, 255, 255, 0.3);
            font-weight: 700;
        }
    `;
    document.head.appendChild(style);
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

// Add Typing Animation to Hero Title
function addTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }
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

function init() {
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
    
    // Animate elements on load
    window.addEventListener('load', () => {
        animateTileStack();
        animateWinningHand();
        animateSeatDiagram();
        animateWallVisual();
        // 页面加载完成后再次确保按钮位置正确
        ensureBackToTopPosition();
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Initial check
    checkSectionVisibility();
    updateProgressBar();
    toggleBackToTop();
    
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
    updateActiveNavLink();
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
    
    // Animate tiles moving together
    const tiles = tilesInHand.querySelectorAll('.tile-img-container');
    const discardedRect = discardedTile.getBoundingClientRect();
    const meldedRect = meldedGroup.getBoundingClientRect();
    
    // Create animated tiles with staggered timing
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
        clonedTile.style.transition = 'all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)';
        clonedTile.classList.add('animated-tile');
        document.body.appendChild(clonedTile);
        
        // Stagger animation for smoother effect
        setTimeout(() => {
            const targetX = meldedRect.left + (index * 50);
            const targetY = meldedRect.top;
            
            // Animate through control points for smooth arc
            clonedTile.style.left = targetX + 'px';
            clonedTile.style.top = targetY + 'px';
            clonedTile.style.transform = 'scale(1.15) rotate(' + (5 + index * 2) + 'deg)';
        }, 30 + (index * 40));
        
        // Fade out after reaching destination
        setTimeout(() => {
            clonedTile.style.transition = 'all 0.3s ease-out';
            clonedTile.style.opacity = '0';
            clonedTile.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (clonedTile.parentNode) {
                    clonedTile.remove();
                }
            }, 300);
        }, 1030 + (index * 40));
    });
    
    // Animate discarded tile with smooth arc
    const clonedDiscarded = discardedTile.cloneNode(true);
    clonedDiscarded.style.position = 'fixed';
    clonedDiscarded.style.left = discardedRect.left + 'px';
    clonedDiscarded.style.top = discardedRect.top + 'px';
    clonedDiscarded.style.width = discardedTile.offsetWidth + 'px';
    clonedDiscarded.style.height = discardedTile.offsetHeight + 'px';
    clonedDiscarded.style.zIndex = '10000';
    clonedDiscarded.style.transform = 'scale(1) rotate(0deg)';
    clonedDiscarded.style.opacity = '1';
    clonedDiscarded.style.transition = 'all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)';
    clonedDiscarded.classList.add('animated-tile');
    document.body.appendChild(clonedDiscarded);
    
    setTimeout(() => {
        const targetX = meldedRect.left + (tiles.length * 50);
        const targetY = meldedRect.top;
        
        clonedDiscarded.style.left = targetX + 'px';
        clonedDiscarded.style.top = targetY + 'px';
        clonedDiscarded.style.transform = 'scale(1.15) rotate(-8deg)';
    }, 150);
    
    // Fade out discarded tile after reaching destination
    setTimeout(() => {
        clonedDiscarded.style.transition = 'all 0.3s ease-out';
        clonedDiscarded.style.opacity = '0';
        clonedDiscarded.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (clonedDiscarded.parentNode) {
                clonedDiscarded.remove();
            }
        }, 300);
    }, 1050);
    
    // Show "Pung!" text with smooth animation (after tiles disappear)
    setTimeout(() => {
        const pungText = document.createElement('div');
        pungText.className = 'pung-kong-text pung-text';
        pungText.textContent = 'Pung!';
        pungText.style.position = 'fixed';
        pungText.style.left = meldedRect.left + (meldedRect.width / 2) + 'px';
        pungText.style.top = meldedRect.top - 40 + 'px';
        pungText.style.transform = 'translateX(-50%) scale(0.5)';
        pungText.style.opacity = '0';
        pungText.style.zIndex = '10001';
        pungText.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        document.body.appendChild(pungText);
        
        // Animate text appearance with bounce
        setTimeout(() => {
            pungText.style.transform = 'translateX(-50%) scale(1.2)';
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
    }, 1400);
    
    // Highlight melded group with smooth transition (after tiles disappear)
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
    }, 1400);
    
    // Clean up cloned tiles (they should already be removed from fade out)
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
    }, 3800);
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


