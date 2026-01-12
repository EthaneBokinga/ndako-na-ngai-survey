document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('surveyForm');
  const toast = document.getElementById('toast');
  const problemAutre = document.getElementById('problem-autre');
  const problemsOther = document.getElementById('problemsOther');
  const budgetSelect = document.getElementById('budget');
  const budgetCustom = document.getElementById('budgetCustom');
  const demarcheurRadios = document.getElementsByName('demarcheur');
  const demarcheurDetails = document.getElementById('demarcheurDetails');

  if(problemAutre){
    problemAutre.addEventListener('change', function(){
      if(this.checked) problemsOther.style.display = 'block';
      else problemsOther.style.display = 'none';
    });
  }

  if(budgetSelect && budgetCustom){
    budgetSelect.addEventListener('change', function(){
      if(this.value === 'autre') budgetCustom.style.display = 'block';
      else budgetCustom.style.display = 'none';
    });
  }

  // Neighborhood custom handling: show text input when 'Autre' selected
  const neighborhoodSelect = document.getElementById('neighborhood');
  const neighborhoodCustom = document.getElementById('neighborhoodCustom');
  if(neighborhoodSelect && neighborhoodCustom){
    neighborhoodSelect.addEventListener('change', function(){
      if(this.value === 'Autre') neighborhoodCustom.style.display = 'block';
      else neighborhoodCustom.style.display = 'none';
    });
  }

  if(demarcheurRadios && demarcheurDetails){
    demarcheurRadios.forEach(r=>{
      r.addEventListener('change', function(){
        if(this.value === 'oui') demarcheurDetails.style.display = 'block';
        else demarcheurDetails.style.display = 'none';
      });
    });
  }

  // Admin link is always visible - security is enforced on admin.html via Firebase Auth

  function showToast(msg = 'Merci ! Votre réponse a été enregistrée.', ms = 3500){
    toast.textContent = msg;
    toast.style.display = 'block';
    toast.setAttribute('aria-hidden','false');
    setTimeout(()=>{toast.style.display='none';toast.setAttribute('aria-hidden','true')}, ms);
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(form);
    // Convert formData into a plain object
    const payload = {};
    for(const [k,v] of data.entries()){
      // initial assignment
      payload[k] = v;
    }

    // ensure checkbox groups are arrays
    const getChecked = name => Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(i=>i.value);
    payload.problems = getChecked('problems');
    payload.features = getChecked('features');
    payload.demarcheurIssues = getChecked('demarcheurIssues');
    // include the 'other' details if present
    if(document.getElementById('problemsOther') && document.getElementById('problemsOther').value.trim()){
      payload.problemsOther = document.getElementById('problemsOther').value.trim();
    }

    // budget: if 'autre' use custom value
    if(budgetSelect){
      if(budgetSelect.value === 'autre' && budgetCustom && budgetCustom.value.trim()){
        payload.budget = budgetCustom.value.trim() + ' FCFA (personnalisé)';
      } else {
        payload.budget = budgetSelect.value || '';
      }
    }

    // demarcheur details
    const demarcheurEl = document.querySelector('input[name="demarcheur"]:checked');
    if(demarcheurEl) payload.demarcheur = demarcheurEl.value;
    const demAmt = document.getElementById('demarcheurAmount');
    if(demAmt && demAmt.value.trim()) payload.demarcheurAmount = demAmt.value.trim();
    const demFreq = document.getElementById('demarcheurFrequency');
    if(demFreq && demFreq.value) payload.demarcheurFrequency = demFreq.value;
    const demComments = document.getElementById('demarcheurComments');
    if(demComments && demComments.value.trim()) payload.demarcheurComments = demComments.value.trim();

    // neighborhood custom handling
    const neighSelect = document.getElementById('neighborhood');
    if(neighSelect){
      if(neighSelect.value === 'Autre'){
        const custom = document.getElementById('neighborhoodCustom');
        payload.neighborhood = custom && custom.value.trim() ? custom.value.trim() : '';
      } else {
        payload.neighborhood = neighSelect.value || '';
      }
    }

    // Sauvegarde locale comme sauvegarde de secours
    try{
      const store = JSON.parse(localStorage.getItem('ndaSurvey')||'[]');
      store.push({ts:Date.now(), data:payload});
      localStorage.setItem('ndaSurvey', JSON.stringify(store));
      console.log('Enregistré localement');
    }catch(err){
      console.warn('LocalStorage erreur',err);
    }

    // Tentative d'envoi vers Firestore si configuré.
    if(window.firebaseDB){
      try{
        const doc = Object.assign({}, payload);
        doc._ts = Date.now();
        window.firebaseDB.collection('surveys').add(doc).then(()=>{
          console.log('Envoyé vers Firestore');
          showToast('Merci — envoyé au cloud', 3500);
          form.reset();
        }).catch(err=>{
          console.warn('Erreur Firestore:', err);
          // informer l'utilisateur et garder la sauvegarde locale
          showToast('Impossible d\'enregistrer sur le cloud — sauvegarde locale effectuée', 6000);
          form.reset();
        });
      }catch(err){
        console.warn('Erreur envoi Firebase', err);
        showToast('Erreur lors de l\'envoi cloud — sauvegarde locale effectuée', 6000);
        form.reset();
      }
    } else {
      // Pas de Firestore : utilisateur en local/demo
      showToast();
      form.reset();
    }
  });
});
