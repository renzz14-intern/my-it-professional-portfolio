(() => {
  const data = window.PORTFOLIO_DATA;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const safeHref = value => /^(https?:|mailto:|#)/i.test(value || '') ? value : '';
  const placeholder = text => {
    const value = String(text ?? '');
    return /^\[[^\]]+\]$/.test(value.trim()) ? `<span class="placeholder-text">${escapeHTML(value)}</span>` : escapeHTML(value);
  };

  function render() {
    $('#education-list').innerHTML = data.education.map(item => `<article class="education-entry"><span class="education-entry__date">${escapeHTML(item.period)}</span><div><h4>${escapeHTML(item.qualification)}</h4><p>${placeholder(item.school)}</p><small>${placeholder(item.detail)}</small></div></article>`).join('');
    $('#skills-table').innerHTML = data.skills.map(item => `<tr><td data-label="Area">${escapeHTML(item.area)}</td><td data-label="Skill">${escapeHTML(item.skill)}</td><td data-label="Level">${item.level ? `<span class="skill-level">${escapeHTML(item.level)}</span>` : placeholder('[Not assessed]')}</td><td data-label="Evidence / Project">${safeHref(item.evidenceHref) ? `<a class="table-link" href="${escapeHTML(safeHref(item.evidenceHref))}" target="_blank" rel="noreferrer">${escapeHTML(item.evidence)} <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>` : escapeHTML(item.evidence)}</td></tr>`).join('');
    $('#project-list').innerHTML = data.projects.map((item, index) => `<article class="project-card reveal"><div class="project-card__visual project-card__visual--${index + 1}"><span>${String(index + 1).padStart(2, '0')} / ${escapeHTML(item.category)}</span><i class="bi ${index === 0 ? 'bi-window' : index === 1 ? 'bi-database' : 'bi-tools'}" aria-hidden="true"></i><span class="project-card__visual-label">${escapeHTML(item.status)}</span></div><div class="project-card__body"><div class="project-card__title"><h3>${placeholder(item.title)}</h3><span class="project-arrow"><i class="bi bi-arrow-up-right" aria-hidden="true"></i></span></div><p>${placeholder(item.description)}</p><div class="tag-row">${item.tech.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div><div class="project-card__links">${safeHref(item.github) ? `<a href="${escapeHTML(safeHref(item.github))}" target="_blank" rel="noreferrer">Repository <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>` : '<span>Starter idea</span>'}${safeHref(item.live) ? `<a href="${escapeHTML(safeHref(item.live))}" target="_blank" rel="noreferrer">Live demo <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>` : ''}</div></div></article>`).join('');
    const webProjects = data.projects.filter(item => item.category === 'WEB DEVELOPMENT');
    $('#web-project-list').innerHTML = webProjects.map((item, index) => {
      const links = [
        safeHref(item.live) ? `<a class="text-link" href="${escapeHTML(safeHref(item.live))}" target="_blank" rel="noreferrer">Live demo <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>` : '',
        safeHref(item.github) ? `<a class="text-link" href="${escapeHTML(safeHref(item.github))}" target="_blank" rel="noreferrer">Repository <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>` : '',
        index === 0 ? '<a class="text-link" href="#project-readme">Project README <i class="bi bi-arrow-down-right" aria-hidden="true"></i></a>' : ''
      ].filter(Boolean).join('');
      const preview = item.thumb
        ? `<img class="web-project__preview-image" src="${escapeHTML(item.thumb)}" alt="${escapeHTML(item.title)} homepage screenshot" loading="lazy">`
        : '<div class="preview-line"></div><div class="preview-line preview-line--short"></div><div class="preview-box"></div>';
      return `<article class="web-project"><div class="web-project__index">PROJECT<br><strong>${String(index + 1).padStart(2, '0')}</strong></div><div class="web-project__main"><span class="status-tag">${escapeHTML(item.status)}</span><h3>${placeholder(item.title)}</h3><p>${placeholder(item.description)}</p><div class="tag-row">${item.tech.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div><div class="web-project__links">${links}</div></div><div class="web-project__preview"><div class="preview-top"><i></i><i></i><i></i><span>PROJECT PREVIEW</span></div><div class="preview-content">${preview}</div></div></article>`;
    }).join('');
    const fields = data.readmeFields.map((field, index) => `<div class="readme-field"><span>${String(index + 1).padStart(2, '0')}</span><div><strong>${escapeHTML(field.label)}</strong><p>${escapeHTML(field.detail)}</p></div></div>`).join('');
    $('#readme-fields').innerHTML = fields;
    $('#readme-fields-duplicate').innerHTML = fields;
    $('#ai-log-table').innerHTML = data.aiLog.map(row => `<tr><td data-label="Date">${escapeHTML(row.date)}</td><td data-label="Task">${escapeHTML(row.task)}</td><td data-label="AI Assistance">${escapeHTML(row.assistance)}</td><td data-label="My Verification">${escapeHTML(row.verification)}</td></tr>`).join('');
    const documented = data.troubleshooting.filter(item => item.status === 'real' || item.status === 'simulated').length;
    $('#case-count').innerHTML = `${documented} / 5<br><small>verified</small>`;
    $('.troubleshoot-intro > p').textContent = 'Beginner troubleshooting examples, not claims about incidents I personally fixed. Work through each scenario, record your actual observations and result, then mark it simulated or real to count it as verified.';
    $('#troubleshooting-list').innerHTML = data.troubleshooting.map((item, index) => `<details class="case-item"><summary><span class="case-item__number">CASE ${String(index + 1).padStart(2, '0')}</span><span class="case-item__title">${placeholder(item.problem)}</span><span class="case-item__status">${escapeHTML(item.status === 'real' ? 'REAL' : item.status === 'simulated' ? 'SIMULATED' : item.status === 'example' ? 'EXAMPLE' : item.status === 'practice' ? 'PRACTICE DRAFT' : 'NOT DOCUMENTED')}</span><i class="bi bi-plus-lg" aria-hidden="true"></i></summary><div class="case-item__body"><dl><div><dt>Possible causes</dt><dd>${placeholder(item.causes)}</dd></div><div><dt>Diagnostic procedure</dt><dd>${placeholder(item.procedure)}</dd></div><div><dt>Example resolution</dt><dd>${placeholder(item.solution)}</dd></div><div><dt>Lesson learned</dt><dd>${placeholder(item.lesson)}</dd></div></dl></div></details>`).join('');
    $('#certificate-list').innerHTML = data.certificates.map(item => `<article class="certificate-item"><a class="certificate-item__thumb" href="${escapeHTML(item.image)}" target="_blank" rel="noreferrer" aria-label="Open full certificate: ${escapeHTML(item.title)}"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)} certificate" loading="lazy"></a><div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.issuer)} <span>·</span> ${escapeHTML(item.date)}</p><small>${escapeHTML(item.description)}</small></div>${safeHref(item.verify) ? `<a class="certificate-item__verify" href="${escapeHTML(safeHref(item.verify))}" target="_blank" rel="noreferrer" aria-label="Verify certificate"><i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>` : ''}</article>`).join('');
    $('#repo-list').innerHTML = data.repos.length ? data.repos.map(repo => `<a class="repo-item" href="${escapeHTML(safeHref(repo.url))}" target="_blank" rel="noreferrer"><i class="bi bi-folder2-open" aria-hidden="true"></i><span><strong>${escapeHTML(repo.name)}</strong><small>${escapeHTML(repo.description || '')}</small></span><i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>`).join('') : `<p class="repo-empty">[Add verified repositories in js/data.js when you have work to share.]</p>`;
    $('#career-plan-fields').innerHTML = data.careerPlan.map((item, index) => `<article class="career-plan-field"><span class="career-plan-field__number">${String(index + 1).padStart(2, '0')}</span><div><h3>${escapeHTML(item.field)}</h3><p class="career-plan-field__value">${escapeHTML(item.plan)}</p></div></article>`).join('');
    $('[data-reflection]').innerHTML = data.reflection.map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join('');
    $('.reflection-panel__meta .eyebrow').textContent = 'STEP 24 / FINAL REFLECTION / DRAFT';
    const documentationSection = $('#project-documentation');
    const webDevelopmentSection = $('#web-development');
    if (documentationSection && webDevelopmentSection) {
      documentationSection.classList.add('content-section', 'section-shell');
      webDevelopmentSection.insertAdjacentElement('afterend', documentationSection);
    }
    const sections = [['home', 'Home'], ['about', 'About Me'], ['skills', 'Technical Skills'], ['projects', 'Projects'], ['interview', 'Mock Interview'], ['database', 'Database Project'], ['data-analysis', 'Data Analysis'], ['cybersecurity', 'Cybersecurity'], ['web-development', 'Web Development'], ['project-documentation', 'Project Documentation / Step 16'], ['cloud', 'Cloud / Deployment'], ['ai-literacy', 'AI Project or AI Literacy Evidence'], ['troubleshooting', 'Troubleshooting'], ['resume', 'Resume'], ['certificates', 'Certificates / Achievements'], ['github', 'GitHub'], ['linkedin', 'LinkedIn'], ['career-plan', 'Career Plan'], ['reflection', 'Reflection'], ['contact', 'Contact Information']];
    $('#section-menu').innerHTML = sections.map(([id, label], index) => `<a href="#${id}"><span>${String(index + 1).padStart(2, '0')}</span>${label}</a>`).join('');
    $('#current-year').textContent = new Date().getFullYear();
    const socialLinks = [
      ['.social-panel .button', data.config.github, 'View GitHub profile'],
      ['.linkedin-card .button', data.config.linkedin, 'View LinkedIn profile']
    ];
    socialLinks.forEach(([selector, url, label]) => {
      const link = $(selector);
      if (!/^https?:\/\//i.test(url || '')) return;
      link.href = safeHref(url);
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.removeAttribute('aria-disabled');
      link.classList.remove('disabled-link');
      link.innerHTML = `${label} <i class="bi bi-arrow-up-right" aria-hidden="true"></i>`;
    });
    [
      ['#home-github-link', data.config.github],
      ['#home-linkedin-link', data.config.linkedin]
    ].forEach(([selector, url]) => {
      const link = $(selector);
      if (!link || !/^https?:\/\//i.test(url || '')) return;
      link.href = safeHref(url);
      link.target = '_blank';
      link.rel = 'noreferrer';
    });
    const emailLink = $('[data-contact-email]');
    if (data.config.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.config.email)) {
      const link = document.createElement('a');
      link.className = emailLink.className;
      link.href = `mailto:${data.config.email}`;
      link.textContent = data.config.email;
      emailLink.replaceWith(link);
    }
  }

  function setupTypingName() {
    const greetingElement = $('#hero-greeting');
    const nameElement = $('#hero-name');
    if (!greetingElement || !nameElement || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const parts = [greetingElement, nameElement].map((element, index) => {
      const textNode = document.createTextNode('');
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      cursor.textContent = '_';
      cursor.hidden = index !== 0;
      cursor.setAttribute('aria-hidden', 'true');
      element.replaceChildren(textNode, cursor);
      return { element, text: element.dataset.text, textNode, cursor };
    });

    let partIndex = 0;
    let character = 0;
    const typeNextCharacter = () => {
      const part = parts[partIndex];
      if (character < part.text.length) {
        part.textNode.textContent += part.text[character];
        character += 1;
        window.setTimeout(typeNextCharacter, 95);
      } else if (partIndex < parts.length - 1) {
        part.cursor.remove();
        partIndex += 1;
        character = 0;
        parts[partIndex].cursor.hidden = false;
        window.setTimeout(typeNextCharacter, 180);
      } else {
        window.setTimeout(() => part.cursor.remove(), 1200);
      }
    };

    window.setTimeout(typeNextCharacter, 350);
  }

  function setupNavigation() {
    const toggle = $('.menu-toggle');
    const nav = $('#site-nav');
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('is-open', open);
    });
    $$('a', nav).forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }));
    const sectionLinks = $$('.site-nav a[href^="#"]');
    const sections = sectionLinks.map(link => $(link.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      }), { rootMargin: '-30% 0px -60% 0px' });
      sections.forEach(section => observer.observe(section));
    }
    const backTop = $('#back-top');
    window.addEventListener('scroll', () => backTop.classList.toggle('is-visible', window.scrollY > 640), { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function setupReveal() {
    const targets = $$('.section-heading, .education-entry, .profile-panel, .security-item, .interview-grid article, .certificate-item, .case-item, .project-card');
    targets.forEach(target => target.classList.add('reveal'));
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(target => target.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    targets.forEach(target => observer.observe(target));
  }

  function setupContact() {
    const form = $('#contact-form');
    const result = $('#form-result');
    form.addEventListener('submit', async event => {
      event.preventDefault();
      let valid = true;
      $$('.form-row', form).forEach(row => {
        const input = $('input, textarea', row);
        const error = $('.field-error', row);
        const message = !input.value.trim() ? 'This field is required.' : input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value) ? 'Enter a valid email address.' : '';
        error.textContent = message;
        input.setAttribute('aria-invalid', String(Boolean(message)));
        valid = valid && !message;
      });
      result.textContent = '';
      if (!valid) return;
      const values = Object.fromEntries(new FormData(form).entries());
      if (data.config.formEndpoint) {
        try {
          const response = await fetch(data.config.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(values) });
          if (!response.ok) throw new Error('Form service returned an error.');
          result.textContent = 'Message sent. Thank you for reaching out.';
          form.reset();
        } catch {
          result.textContent = 'Message not sent. The form service could not be reached.';
        }
      } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.config.email || '')) {
        const subject = encodeURIComponent(`Portfolio message from ${values.name}`);
        const body = encodeURIComponent(`${values.message}\n\nFrom: ${values.name} (${values.email})`);
        window.location.href = `mailto:${data.config.email}?subject=${subject}&body=${body}`;
        result.textContent = 'Your email app should open with the message ready. It has not been sent yet.';
      } else {
        result.textContent = 'Message NOT sent. Add an email address or form endpoint in js/data.js to enable contact.';
      }
    });
    $$('.form-row input, .form-row textarea', form).forEach(input => input.addEventListener('input', () => {
      input.removeAttribute('aria-invalid');
      $('.field-error', input.closest('.form-row')).textContent = '';
    }));
  }

  function setupEditMode() {
    if (new URLSearchParams(location.search).get('edit') !== '1') return;
    const toolbar = $('#edit-toolbar');
    toolbar.hidden = false;
    const candidates = $$('[data-editable], .placeholder-text, .data-table tbody td, .career-plan-field__value, .interview-grid h3, .interview-grid p, .security-item p, .analysis-note h3, .analysis-note > p, .web-project__main > h3, .web-project__main > p, .deployment-flow small, .ai-project-note p')
      .filter(element => !element.matches('td') || !element.querySelector('.placeholder-text, a, i'));
    const keyCounts = new Map();
    const draftKeys = candidates.map((element, index) => {
      const baseKey = element.dataset.editable || `draft-${String(index + 1).padStart(3, '0')}`;
      const occurrence = keyCounts.get(baseKey) || 0;
      keyCounts.set(baseKey, occurrence + 1);
      return occurrence ? `${baseKey}-${occurrence + 1}` : baseKey;
    });
    candidates.forEach((element, index) => {
      const key = draftKeys[index];
      const saved = localStorage.getItem(`portfolio:${key}`);
      if (saved !== null) element.textContent = saved;
      element.contentEditable = 'true';
      element.classList.add('editable');
      element.setAttribute('aria-label', `Edit ${element.textContent.trim().slice(0, 60) || key}`);
      element.addEventListener('input', () => {
        localStorage.setItem(`portfolio:${key}`, element.textContent);
        updateReflectionCount();
      });
    });
    $('#export-edits').addEventListener('click', () => {
      const edits = Object.fromEntries(candidates.map((element, index) => [draftKeys[index], element.textContent.trim()]));
      const blob = new Blob([JSON.stringify(edits, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'portfolio-draft.json';
      link.click();
      URL.revokeObjectURL(link.href);
    });
  }

  function updateReflectionCount() {
    const reflection = $('[data-reflection]');
    const count = (reflection.innerText || reflection.textContent).trim().split(/\s+/).filter(Boolean).length;
    $('#reflection-count').textContent = `${count} words / target 500–800`;
    $('#reflection-count').classList.toggle('is-on-target', count >= 500 && count <= 800);
  }

  render();
  setupTypingName();
  setupNavigation();
  setupReveal();
  setupContact();
  setupEditMode();
  updateReflectionCount();
})();