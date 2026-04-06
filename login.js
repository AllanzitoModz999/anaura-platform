document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const senha = document.getElementById('senha').value;
    const senhaCorreta = '6761';
    
    if (senha === senhaCorreta) {
        localStorage.setItem('adminLogado', 'true');
        window.location.href = 'painel.html';
    } else {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.classList.remove('hidden');
        document.getElementById('senha').value = '';
        
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 3000);
    }
});
