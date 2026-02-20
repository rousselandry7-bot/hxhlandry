const infos = {
    nen: "<h2>Le Nen (念)</h2><br><p>Le Nen est une technique permettant de manipuler l'énergie vitale (aura). Il est essentiel pour tout Hunter professionnel.</p>",
    fourmis: "<h2>Fourmis Chimères</h2><br><p>Des insectes mutants extrêmement dangereux venus du Continent Caché, capables d'absorber les gènes de leurs proies.</p>",
    continent: "<h2>Le Continent Caché</h2><br><p>Un monde mystérieux situé au-delà des limites du monde connu, rempli de créatures gigantesques et de dangers mortels.</p>"
};

let scoreHunter = 0;
let questionActuelle = 0;

const questionsExamen = [
    { q: "Quel principe consiste à maintenir l'aura dans le corps ?", r: ["Ten", "Zetsu", "Ren", "Hatsu"], c: 0 },
    { q: "Comment s'appelle le test du verre d'eau ?", r: ["Divination", "Méditation", "Lévitation", "Infusion"], c: 0 },
    { q: "Quel est l'objectif de Gon ?", r: ["Devenir riche", "Venger son clan", "Trouver son père", "Tuer Hisoka"], c: 2 },
    { q: "Le Nen de Kirua est de quel type ?", r: ["Renforcement", "Transformation", "Émission", "Spécialisation"], c: 1 },
    { q: "Combien de membres compte l'Araignée ?", r: ["10", "12", "13", "15"], c: 2 },
    { q: "Le Nen de Gon est de quel type ?", r: ["Renforcement", "Manipulation", "Matérialisation", "Émission"], c: 0 },
    { q: "Comment s'appelle le Roi des Fourmis Chimères ?", r: ["Youpi", "Pitou", "Pouf", "Meruem"], c: 3 },
    { q: "Quel est le futur métier de Léolio ?", r: ["Assassin", "Médecin", "Cuisinier", "Pilote"], c: 1 },
    { q: "Où vit la famille Zoldyck ?", r: ["Mont Kukuru", "Île de la Baleine", "York Shin City", "NGL"], c: 0 },
    { q: "Peut-on remplacer une licence Hunter perdue ?", r: ["Oui", "Non", "Seulement si on paye", "Une seule fois"], c: 1 }
];

function ouvrirModal(type) {
    const modalBody = document.getElementById('modal-body');
    const container = document.getElementById('modal-container');
    if (infos[type]) { modalBody.innerHTML = infos[type]; } 
    else if (type === 'createur-carte') { scoreHunter = 0; questionActuelle = 0; afficherQuestion(); }
    container.style.display = 'flex';
}

function afficherQuestion() {
    const modalBody = document.getElementById('modal-body');
    const q = questionsExamen[questionActuelle];
    modalBody.innerHTML = `
        <h3 style="color:#d41414; margin-bottom:10px;">Examen Hunter - Question ${questionActuelle + 1}/10</h3>
        <p style="margin-bottom:20px; font-weight:bold; font-size:18px;">${q.q}</p>
        <div id="quiz-options" style="display:flex; flex-direction:column; gap:10px;">
            ${q.r.map((rep, index) => `<button class="btn-quiz" onclick="verifierReponse(${index})">${rep}</button>`).join('')}
        </div>
        <p style="margin-top:15px; font-size:12px; color:#888;">Score actuel : ${scoreHunter}</p>`;
}

function verifierReponse(indexChoisi) {
    if (indexChoisi === questionsExamen[questionActuelle].c) { scoreHunter++; }
    questionActuelle++;
    if (questionActuelle < questionsExamen.length) { afficherQuestion(); } 
    else { finirExamen(); }
}

function finirExamen() {
    const modalBody = document.getElementById('modal-body');
    if (scoreHunter >= 7) {
        modalBody.innerHTML = `
            <h2 style="color:#2ecc71; margin-bottom:15px;">FÉLICITATIONS !</h2>
            <p>Score : <b>${scoreHunter}/10</b>. Ton Nen est suffisant.</p>
            <div id="form-final" style="text-align:center; margin-top:20px;">
                <input type="text" id="nom-hunter" placeholder="Ton Nom" style="padding:10px; width:80%; margin:15px 0; border:2px solid #333; border-radius:5px;">
                <input type="file" id="photo-hunter" accept="image/*" style="margin-bottom:15px; font-size:12px;">
                <br><button id="btn-submit-hunter" onclick="genererCarte()">Obtenir ma Licence</button>
            </div>
            <div id="resultat-carte"></div>`;
    } else {
        modalBody.innerHTML = `
            <h2 style="color:#d41414; margin-bottom:15px;">ÉCHEC...</h2>
            <p>Score : <b>${scoreHunter}/10</b>. Reviens quand tu seras plus fort.</p>
            <button onclick="ouvrirModal('createur-carte')" style="margin-top:20px; background:#333; color:white;">Retenter l'Examen</button>`;
    }
}

function genererCarte() {
    const nom = document.getElementById('nom-hunter').value || "Hunter Inconnu";
    const nenTypes = ["Renforcement", "Transformation", "Matérialisation", "Émission", "Manipulation", "Spécialisation"];
    const nenResultat = nenTypes[Math.floor(Math.random() * nenTypes.length)];
    const photoInput = document.getElementById('photo-hunter');
    const resultat = document.getElementById('resultat-carte');
    document.getElementById('form-final').style.display = 'none';
    const afficherLicence = (imgUrl) => {
        resultat.innerHTML = `
            <div class="hunter-license">
                <div class="license-top">
                    <div class="photo-container"><img src="${imgUrl}" alt="Photo"></div>
                    <div class="logo-white-box"><div class="logo-xx">XX</div><div class="logo-red-diamond"></div></div>
                </div>
                <div class="license-bottom">
                    <div class="name-display-area">${nom}</div>
                    <div class="nen-type-label">TYPE : ${nenResultat.toUpperCase()}</div>
                </div>
            </div>
            <button class="btn-download-card" onclick="window.print()">📥 Imprimer ma Licence</button>`;
    };
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => afficherLicence(e.target.result);
        reader.readAsDataURL(photoInput.files[0]);
    } else { afficherLicence("https://via.placeholder.com/80x100?text=Hunter"); }
}

function fermerModal() { document.getElementById('modal-container').style.display = 'none'; }

async function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    // --- COUPE BIEN TA CLÉ ICI ---
    const p1 = "AIzaSy"; // Le début de ta clé
    const p2 = "CqYzl78v3R3LdnulydDlQXyeMtbSrL_7E"; // La suite de ta clé
    const key = p1 + p2;

    input.value = '';
    appendMessage(text, true);

    const messages = document.getElementById('messages');
    const loadingId = "loading-" + Date.now();
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai-message';
    loadingDiv.id = loadingId;
    loadingDiv.innerHTML = "L'examinateur concentre son Nen...";
    messages.appendChild(loadingDiv);
    scrollToBottom();

    try {
        // Cette URL est la seule qui fonctionne sans erreur 404
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
        
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Tu es un expert Hunter x Hunter. Réponds court : " + text }] }]
            })
        });

        const data = await response.json();

        if (data.error) {
            // Si la clé est mauvaise, l'IA nous dira pourquoi
            document.getElementById(loadingId).innerText = "Erreur : " + data.error.message;
        } else {
            const aiResponse = data.candidates[0].content.parts[0].text;
            document.getElementById(loadingId).innerText = aiResponse;
        }

    } catch (error) {
        document.getElementById(loadingId).innerText = "Impossible de joindre l'Association des Hunters...";
        console.error("Erreur complète:", error);
    }
    scrollToBottom();
}


     {
        // URL MISE À JOUR (Vérifie bien cette ligne)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
        
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Tu es un expert Hunter x Hunter. Réponds court : " + text }] }]
            })
        });

        const data = await response.json();

        if (data.error) {
            document.getElementById(loadingId).innerText = "Erreur API : " + data.error.message;
        } else {
            const aiResponse = data.candidates[0].content.parts[0].text;
            document.getElementById(loadingId).innerText = aiResponse;
        }

    } catch (error) {
        document.getElementById(loadingId).innerText = "Problème de connexion (Vérifie ta clé).";
        console.error("Erreur complète:", error);
    }
    scrollToBottom();
}

function toggleChat() {
    const body = document.getElementById('chat-body');
    body.style.display = (body.style.display === 'flex') ? 'none' : 'flex';
}

function appendMessage(text, isUser) {
    const messages = document.getElementById('messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    msgDiv.textContent = text;
    messages.appendChild(msgDiv);
    scrollToBottom();
}

function scrollToBottom() {
    const m = document.getElementById('messages');
    if(m) m.scrollTop = m.scrollHeight;
}

function toggleMusic() {
    const audio = document.getElementById('hxh-audio');
    const btn = document.getElementById('music-btn');
    if (audio.paused) { audio.play(); btn.innerText = "Pause"; }
    else { audio.pause(); btn.innerText = "Lecture"; }
}
