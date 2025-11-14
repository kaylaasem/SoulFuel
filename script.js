const questions = [
    {
        question: "Apa arti Sola Scriptura?",
        options: ["Keselamatan dari tradisi", "Alkitab sebagai otoritas tertinggi", "Manusia bebas menentukan kebenaran", "Konsili gereja sebagai pusat ajaran"],
        correct: 1
    },
    {
        question: "Prinsip mana yang menegaskan bahwa keselamatan hanya melalui iman?",
        options: ["Sola Gratia", "Sola Fide", "Solus Christus", "Soli Deo Gloria"],
        correct: 1
    },
    {
        question: "Prinsip mana yang menekankan bahwa hanya Kristus yang menyelamatkan?",
        options: ["Sola Scriptura", "Sola Fide", "Solus Christus", "Sola Gratia"],
        correct: 2
    },
    {
        question: "Apa fokus dari Sola Gratia?",
        options: ["Kasih Allah", "Anugerah Allah", "Hukum Taurat", "Perbuatan baik"],
        correct: 1
    },
    {
        question: "Apa isi utama Soli Deo Gloria?",
        options: ["Segala kemuliaan hanya bagi Allah", "Kemuliaan bagi gereja", "Kemuliaan bagi manusia", "Kemuliaan bagi malaikat"],
        correct: 0
    },
    {
        question: "Sola Fide mengajarkan bahwa manusia dibenarkan oleh apa?",
        options: ["Perbuatan baik", "Iman kepada Kristus", "Ketaatan pada hukum adat", "Ritual keagamaan"],
        correct: 1
    },
    {
        question: "Sola Scriptura menolak otoritas apa sebagai sumber kebenaran tertinggi?",
        options: ["Tradisi yang setara dengan Alkitab", "Bahasa asli Alkitab", "Rasul-rasul", "Nubuat Perjanjian Lama"],
        correct: 0
    },
    {
        question: "Sola Gratia menekankan bahwa keselamatan adalah pemberian apa?",
        options: ["Upah", "Anugerah", "Hasil usaha manusia", "Pengorbanan imam"],
        correct: 1
    },
    {
        question: "Solus Christus mengakui siapa sebagai satu-satunya perantara?",
        options: ["Malaikat", "Nabi", "Kristus", "Roh Kudus"],
        correct: 2
    },
    {
        question: "Soli Deo Gloria mengingatkan bahwa hidup orang percaya harus memuliakan siapa?",
        options: ["Pemimpin gereja", "Sesama", "Allah", "Diri sendiri"],
        correct: 2
    },
    {
        question: "Sola Scriptura memastikan bahwa ajaran iman berasal dari mana?",
        options: ["Keputusan politik", "Filsafat Yunani", "Alkitab", "Tradisi keluarga"],
        correct: 2
    },
    {
        question: "Sola Fide menolak gagasan bahwa keselamatan dicapai melalui apa?",
        options: ["Iman", "Perbuatan baik", "Doa", "Mendengar firman"],
        correct: 1
    },
    {
        question: "Sola Gratia mengajarkan bahwa manusia tidak dapat diselamatkan oleh apa?",
        options: ["Rahmat", "Usaha manusia", "Pengampunan Allah", "Pengorbanan Kristus"],
        correct: 1
    },
    {
        question: "Solus Christus menegaskan bahwa keselamatan tidak datang melalui siapa?",
        options: ["Kristus", "Para rasul", "Manusia lain", "Khotbah gereja"],
        correct: 2
    },
    {
        question: "Soli Deo Gloria meyakinkan bahwa pelayanan dan hidup seseorang harus diarahkan untuk apa?",
        options: ["Popularitas", "Kemuliaan Allah", "Kekuasaan", "Kekayaan"],
        correct: 1
    },
    {
        question: "Prinsip mana yang menjadi dasar Reformasi Protestan?",
        options: ["Sola Scriptura", "Sola Tempora", "Sola Cultura", "Sola Historia"],
        correct: 0
    },
    {
        question: "Sola Fide berakar dari ajaran rasul siapa?",
        options: ["Petrus", "Paulus", "Yohanes", "Yakobus"],
        correct: 1
    },
    {
        question: "Sola Gratia menunjukkan bahwa keselamatan diberikan tanpa apa?",
        options: ["Kasih Allah", "Bayaran", "Iman", "Pengorbanan Kristus"],
        correct: 1
    },
    {
        question: "Solus Christus menunjukkan bahwa karya keselamatan diselesaikan melalui apa?",
        options: ["Hukum Taurat", "Salib Kristus", "Pengorbanan domba", "Puasa"],
        correct: 1
    },
    {
        question: "Soli Deo Gloria menegaskan bahwa tujuan akhir karya keselamatan adalah apa?",
        options: ["Kejayaan kerajaan Israel", "Kemuliaan Allah", "Kesejahteraan bangsa", "Kepuasan pribadi"],
        correct: 1
    }
];


let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function startQuiz() {
    document.querySelector('.start-screen').classList.remove('active');
    document.querySelector('.quiz-screen').classList.add('active');
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('questionNumber').textContent =
        `Pertanyaan ${currentQuestion + 1} dari ${questions.length}`;
    document.getElementById('questionText').textContent = question.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });

    document.getElementById('nextBtn').style.display = 'none';
    selectedAnswer = null;
    updateProgress();
}

function selectAnswer(index) {
    if (selectedAnswer !== null) return;

    selectedAnswer = index;
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option');

    options.forEach((opt, i) => {
        if (i === question.correct) {
            opt.classList.add('correct');
        } else if (i === index && i !== question.correct) {
            opt.classList.add('wrong');
        }
        opt.style.pointerEvents = 'none';
    });

    if (index === question.correct) score++;

    document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function showResults() {
    document.querySelector('.quiz-screen').classList.remove('active');
    document.querySelector('.result-screen').classList.add('active');

    const percentage = (score / questions.length) * 100;
    document.getElementById('finalScore').textContent =
        `${score}/${questions.length}`;

    let message = "";
    if (percentage === 100) {
        message = '🏆 SEMPURNA! Pengetahuan Alkitab Anda luar biasa!';
    } else if (percentage >= 80) {
        message = '⭐ HEBAT! Anda sangat mengenal Firman Tuhan!';
    } else if (percentage >= 60) {
        message = '👍 BAGUS! Teruslah belajar Firman Tuhan!';
    } else {
        message = '📖 Terus semangat mempelajari Alkitab!';
    }

    document.getElementById('resultMessage').textContent = message;
}

function restartQuiz() {
    document.querySelector('.result-screen').classList.remove('active');
    document.querySelector('.start-screen').classList.add('active');
}
