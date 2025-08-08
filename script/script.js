        // Aguarda o DOM carregar completamente
        document.addEventListener('DOMContentLoaded', function() {
            const formulario = document.getElementById('formularioConsulta');
            
            if (formulario) {
                formulario.addEventListener('submit', enviarFormularioWhatsApp);
            }
        });

        function enviarFormularioWhatsApp(event) {
            event.preventDefault(); // Impede a página de recarregar
            
            // Pega os dados do formulário
            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();
            const servico = document.getElementById('servico').value;
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Validação básica
            if (!nome || !telefone || !email) {
                alert('Por favor, preencha todos os campos obrigatórios (Nome, Telefone e Email).');
                return;
            }
            
            // Monta a mensagem para o WhatsApp
            const textoWhatsApp = `*Solicitação de Consulta - Laprovel*

*Nome:* ${nome}
*Telefone:* ${telefone}
*Email:* ${email}
*Serviço:* ${servico || 'Não informado'}
*Mensagem:* ${mensagem || 'Não informado'}

_Mensagem enviada através do site_`;
            
            // Abre o WhatsApp
            const numero = "5527997268119";
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(textoWhatsApp)}`;
            window.open(url, '_blank');
            
            // Feedback visual
            const botao = event.target.querySelector('button[type="submit"]');
            const textoOriginal = botao.innerHTML;
            botao.innerHTML = '<i class="fas fa-check mr-2"></i>Enviado!';
            botao.disabled = true;
            
            // Limpa o formulário após 2 segundos
            setTimeout(() => {
                formulario.reset();
                botao.innerHTML = textoOriginal;
                botao.disabled = false;
            }, 2000);
        }