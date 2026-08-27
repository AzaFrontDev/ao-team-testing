async function loadAndRenderServices() {
  const container = document.getElementById('services-list');
  const formContainer = document.getElementById('form-services-list');

  try {
    const res = await fetch('./service.json');
    if (!res.ok) throw new Error('Файл service.json не найден');

    const data = await res.json();
    const services = data.items || data;

    // 1. Отрисовка карточек в секции "Услуги"
    if (container) {
      container.innerHTML = services.map(item => `
        <li class="card card--hover card--pad service is-visible">
          <span class="service__num">${String(item.id).padStart(2, '0')}</span>
          <h3 class="card__title">${item.title}</h3>
          <p class="card__text">${item.description}</p>
          <div class="service__price">${item.price}</div>
          <span class="service__line" aria-hidden="true"></span>
        </li>
      `).join('');
    }

    // 2. Отрисовка радиокнопок в форме заявки
    if (formContainer) {
      formContainer.innerHTML = services.map((item, index) => `
        <li>
          <label class="form__service-card">
            <input 
              type="radio" 
              name="service" 
              value="${item.title}" 
              ${index === 0 ? 'required' : ''}
            >
            <span class="form__service-title">${item.title}</span>
            <span class="form__service-price">${item.price}</span>
          </label>
        </li>
      `).join('');
    }

  } catch (err) {
    console.error('Ошибка загрузки прайса:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadAndRenderServices);