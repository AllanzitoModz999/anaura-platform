document.getElementById('denunciaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nomeSuspeito = document.getElementById('nomeSuspeito').value;
    const tiposCrime = document.getElementById('tiposCrime').value;
    const descricao = document.getElementById('descricao').value;
    const prova = document.getElementById('prova').files[0];
    
    if (nomeSuspeito && tiposCrime && descricao && prova) {
        const formData = new FormData();
        formData.append('nomeSuspeito', nomeSuspeito);
        formData.append('tiposCrime', tiposCrime);
        formData.append('descricao', descricao);
        formData.append('prova', prova);
        
        let denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const denuncia = {
                id: Date.now(),
                nomeSuspeito: nomeSuspeito,
                tiposCrime: tiposCrime,
                descricao: descricao,
                prova: e.target.result,
                status: 'Em análise',
                dataEnvio: new Date().toLocaleDateString('pt-BR')
            };
            
            denuncias.push(denuncia);
            localStorage.setItem('denuncias', JSON.stringify(denuncias));
            
            document.getElementById('denunciaForm').style.display = 'none';
            document.getElementById('successMessage').classList.remove('hidden');
            
            setTimeout(() => {
                document.getElementById('denunciaForm').style.display = 'block';
                document.getElementById('successMessage').classList.add('hidden');
                document.getElementById('denunciaForm').reset();
                document.getElementById('previewContainer').innerHTML = '';
            }, 3000);
        };
        reader.readAsDataURL(prova);
    }
});

document.getElementById('prova').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('previewContainer');
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
});
