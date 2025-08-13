document.addEventListener('DOMContentLoaded', () => {
      let lessonsData = [];
      let completedLessons = new Set();
      const progressKey = 'ccrFundamentosProgress';
      const lastLessonKey = 'ccrFundamentosLastLesson';

      // Font size constants
      const DEFAULT_FONT_SIZE = 1.1;
      const MAX_FONT_SIZE = 1.8;
      const MIN_FONT_SIZE = 0.8;
      const FONT_STEP = 0.1;
      let currentFontSize = DEFAULT_FONT_SIZE;

      // DOM References
      const sidebarList = document.getElementById('lesson-list-container');
      const contentArea = document.querySelector('#lesson-content .lesson-body');
      const initialMessage = document.querySelector('#lesson-content .initial-message');
      const modalTitle = document.getElementById('transcriptModalLabel');
      const modalBody = document.querySelector('#transcript-modal .modal-body .transcripcion-contenido');
      const modalElement = document.getElementById('transcript-modal');
      const increaseFontBtn = document.getElementById('increase-font');
      const decreaseFontBtn = document.getElementById('decrease-font');
      const resetFontBtn = document.getElementById('reset-font');

      // --- Progress Logic ---
      function loadProgress() {
        const progress = localStorage.getItem(progressKey);
        if (progress) {
          completedLessons = new Set(JSON.parse(progress));
        }
      }

      function toggleProgress(index) {
        if (lessonsData[index].id === 'introduccion') return; // No track progress for intro
        if (completedLessons.has(index)) {
          completedLessons.delete(index);
        } else {
          completedLessons.add(index);
        }
        localStorage.setItem(progressKey, JSON.stringify([...completedLessons]));
        updateProgressUI(index);
      }

      function updateProgressUI(index) {
        const lessonItem = document.querySelector(`.lesson-list-item[data-lesson-index="${index}"]`);
        const progressButton = document.getElementById('progress-toggle-btn');

        if (completedLessons.has(index)) {
          lessonItem?.classList.add('completed');
          if (progressButton) {
            progressButton.classList.remove('btn-outline-primary');
            progressButton.classList.add('btn-success');
            progressButton.innerHTML = '<i class="bi bi-check-circle-fill"></i> Lección Completada';
          }
        } else {
          lessonItem?.classList.remove('completed');
          if (progressButton) {
            progressButton.classList.remove('btn-success');
            progressButton.classList.add('btn-outline-primary');
            progressButton.innerHTML = 'Marcar como completada';
          }
        }
      }

      function renderLessonList() {
        sidebarList.innerHTML = lessonsData.map((lesson, index) => {
          const isCompleted = completedLessons.has(index);
          const titleHTML = lesson.id === 'introduccion'
            ? `<strong>${lesson.title}</strong>`
            : `<strong>Lección ${lesson.lessonNumber}:</strong> ${lesson.title}`;

          return `
            <li class="lesson-list-item ${isCompleted ? 'completed' : ''}" data-lesson-index="${index}">
              <a href="#" data-index="${index}">
                <span class="lesson-title">${titleHTML}</span>
                ${lesson.id !== 'introduccion' ? '<i class="bi bi-check-circle-fill completion-icon"></i>' : ''}
              </a>
            </li>
          `;
        }).join('');

        document.querySelectorAll('.lesson-list-item a').forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            displayLesson(index);
          });
        });
      }

      function displayLesson(index) {
        const lesson = lessonsData[index];
        if (!lesson) return;

        initialMessage.style.display = 'none';
        localStorage.setItem(lastLessonKey, index);

        let lessonContentHTML = '';

        if (lesson.id === 'introduccion') {
          const introContent = lesson.content.replace(/\n/g, '<br>');
          const alertHTML = `
            <div class="alert alert-info mt-4" role="alert">
              <h4 class="alert-heading">Contenido Original</h4>
              <p>Te animamos a visitar el material original de este curso directamente en la página de Gracia a Vosotros para una experiencia de estudio más completa.</p>
              <hr>
              <p class="mb-0">
                <a href="https://www.gracia.org/library/topical-series-library/GAV-302/fundamentos-de-la-fe" class="alert-link" target="_blank">Visitar Gracia.org <i class="bi bi-box-arrow-up-right"></i></a>
              </p>
            </div>
          `;
          lessonContentHTML = `
            <h2>${lesson.title}</h2>
            <hr>
            <div class="introduction-content">${introContent}</div>
            ${alertHTML}
          `;
        } else {
          const referencesHTML = lesson.references.map(ref => `
            <a href="${ref.link}" target="_blank" class="btn btn-sm btn-outline-secondary me-2 mb-2">
              ${ref.text}
            </a>
          `).join('');

          const transcriptButtonHTML = `
            <div class="text-start my-4">
              <button class="btn btn-outline-primary mb-3" type="button" data-bs-toggle="modal" data-bs-target="#transcript-modal" data-lesson-index="${index}">
                <i class="bi bi-text-paragraph"></i> Ver Transcripción
              </button>
            </div>
          `;
          
          const isCompleted = completedLessons.has(index);
          const progressButtonHTML = `
              <hr class="my-4">
              <div class="text-center mt-3 mb-3">
                  <button class="btn ${isCompleted ? 'btn-success' : 'btn-outline-primary'}" id="progress-toggle-btn">
                      ${isCompleted ? '<i class="bi bi-check-circle-fill"></i> Lección Completada' : 'Marcar como completada'}
                  </button>
              </div>
          `;

          lessonContentHTML = `
            <h2>${lesson.title}</h2>
            <hr>
            <iframe style="border-radius:12px; margin-bottom:1rem;" src="${lesson.spotifyLink}" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            ${transcriptButtonHTML}
            <h4>Referencias Bíblicas</h4>
            <div class="d-flex flex-wrap">
              ${referencesHTML}
            </div>
            ${progressButtonHTML}
          `;
        }

        // Navigation Buttons
        const prevDisabled = index === 0 ? 'disabled' : '';
        const nextDisabled = index === lessonsData.length - 1 ? 'disabled' : '';
        const navigationHTML = `
          <hr class="my-4">
          <div class="lesson-navigation">
            <button class="btn btn-outline-secondary" id="prev-lesson-btn" ${prevDisabled}>
              <i class="bi bi-arrow-left"></i> Anterior
            </button>
            <button class="btn btn-outline-secondary" id="next-lesson-btn" ${nextDisabled}>
              Siguiente <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        `;

        contentArea.innerHTML = lessonContentHTML;
        contentArea.insertAdjacentHTML('beforeend', navigationHTML);
        
        // Add event listeners for dynamic buttons
        if (lesson.id !== 'introduccion') {
          document.getElementById('progress-toggle-btn').addEventListener('click', () => toggleProgress(index));
        }
        document.getElementById('prev-lesson-btn').addEventListener('click', () => displayLesson(index - 1));
        document.getElementById('next-lesson-btn').addEventListener('click', () => displayLesson(index + 1));

        // Update sidebar active state
        document.querySelectorAll('.lesson-list-item a').forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.lesson-list-item a[data-index="${index}"]`);
        activeLink?.classList.add('active');
      }
      
      modalElement.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const lessonIndex = button.getAttribute('data-lesson-index');
        const lesson = lessonsData[lessonIndex];

        modalTitle.textContent = "Transcripción: " + lesson.title;
        const rawTranscript = window.transcripcionesData[lesson.transcriptKey] || '';
        const formattedTranscript = rawTranscript
                                      .split(/\n\s*\n/)
                                      .map(p => p.trim())
                                      .filter(p => p.length > 0)
                                      .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
                                      .join('');
        modalBody.innerHTML = formattedTranscript;
        
        currentFontSize = DEFAULT_FONT_SIZE;
        updateFontSize();
      });

      fetch('assets/clases.json')
        .then(response => response.json())
        .then(data => {
          lessonsData = data;
          loadProgress();
          renderLessonList();

          const lastLessonIndex = localStorage.getItem(lastLessonKey);
          if (lastLessonIndex !== null && lessonsData[parseInt(lastLessonIndex, 10)]) {
            displayLesson(parseInt(lastLessonIndex, 10));
          } else {
            displayLesson(0); // Show introduction by default
          }
        })
        .catch(error => {
          console.error('Error al cargar las lecciones:', error);
          sidebarList.innerHTML = '<p class="text-danger">No se pudo cargar el temario.</p>';
        });

      const modalContent = document.querySelector('#transcript-modal .modal-body');
      const backToTopBtn = document.getElementById('back-to-top');

      function updateFontSize() {
        modalBody.style.fontSize = `${currentFontSize}rem`;
        decreaseFontBtn.disabled = currentFontSize.toFixed(1) <= MIN_FONT_SIZE;
        increaseFontBtn.disabled = currentFontSize.toFixed(1) >= MAX_FONT_SIZE;
      }

      increaseFontBtn.addEventListener('click', () => {
        if (currentFontSize < MAX_FONT_SIZE) {
          currentFontSize += FONT_STEP;
          updateFontSize();
        }
      });

      decreaseFontBtn.addEventListener('click', () => {
        if (currentFontSize > MIN_FONT_SIZE) {
          currentFontSize -= FONT_STEP;
          updateFontSize();
        }
      });

      resetFontBtn.addEventListener('click', () => {
        currentFontSize = DEFAULT_FONT_SIZE;
        updateFontSize();
      });

      modalContent.addEventListener('scroll', () => {
        if (modalContent.scrollTop > 200) {
          backToTopBtn.style.display = 'block';
        } else {
          backToTopBtn.style.display = 'none';
        }
      });

      backToTopBtn.addEventListener('click', () => {
        modalContent.scrollTo({ top: 0, behavior: 'smooth' });
      });

      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      const sidebar = document.getElementById('lesson-sidebar');

      mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
      });

      sidebar.addEventListener('click', (e) => {
        if (e.target.closest('a') && window.innerWidth < 768) {
          sidebar.classList.remove('show');
        }
      });
    });