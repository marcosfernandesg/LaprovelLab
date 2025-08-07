// Menu Mobile
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
        });
        
        // Sistema de Abas
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover classe active de todos os botões e conteúdos
                tabButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                
                // Adicionar classe active no botão clicado
                this.classList.add('active');
                
                // Mostrar o conteúdo correspondente
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Validação do Formulário
        const form = document.querySelector('.appointment-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validação básica
                const nome = document.getElementById('nome').value.trim();
                const telefone = document.getElementById('telefone').value.trim();
                const email = document.getElementById('email').value.trim();
                
                if (!nome || !telefone || !email) {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                    return;
                }
                
                // Simular envio
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                form.reset();
            });
        }
        
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Fechar menu mobile se aberto
                    const menu = document.getElementById('mobile-menu');
                    if (menu && menu.classList.contains('flex')) {
                        menu.classList.remove('flex');
                        menu.classList.add('hidden');
                    }
                }
            });
        });