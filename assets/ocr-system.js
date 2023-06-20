const fileSelector = document.querySelector('input');
const start = document.querySelector('button');
const img = document.querySelector('img');
const progress = document.querySelector('.progress');
const textarea = document.querySelector('textarea');
const nimInput = document.querySelector('#nim');
const namaInput = document.querySelector('#nama');
const jurusanInput = document.querySelector('#jurusan');

// Tampilkan gambar ketika upload
fileSelector.onchange = () => {
    var file = fileSelector.files[0];
    var imgUrl = window.URL.createObjectURL(
        new Blob([file], { type: 'image/jpg' })
    );
    img.src = imgUrl;
};

// Text recognition
start.onclick = () => {
    nimInput.value = '';
    namaInput.value = '';
    jurusanInput.value = '';
    const rec = new Tesseract.TesseractWorker();

    rec.recognize(fileSelector.files[0]).progress(function (response) {
        if (response.status == 'recognizing text') {
            progress.innerHTML = response.status + '   ' + response.progress;
        } else {
            progress.innerHTML = response.status;
        }
    })
    .then(function (data) {
        progress.innerHTML = 'Done.';

        // Extract NIM, nama, and jurusan dari hasil recognize
        const recognizedText = data.text;
        const nimRegex = /0\d{9}/g; // Regex untuk NIM mulai dari 0 dan memiliki 10 digit
        const namaJurusanRegex = /^[A-Z\s]+$/gm; // Regex untuk nama and jurusan dengan uppercase dan whitespace only

        const extractedNIM = recognizedText.match(nimRegex);
        const extractedNamaJurusan = recognizedText.match(namaJurusanRegex);

        if (extractedNIM && extractedNIM.length > 0) {
            nimInput.value = extractedNIM[0];
        }

        if (extractedNamaJurusan && extractedNamaJurusan.length > 0) {
            const namaJurusanText = extractedNamaJurusan.join('\n');
            const cleanedText = namaJurusanText.replace(/[^\w\s]/g, ''); // Remove symbols
            const splitText = cleanedText.split('\n');

            if (splitText.length >= 2) {
                namaInput.value = splitText[0];
                jurusanInput.value = splitText[1];
            }
        }
    });
};    