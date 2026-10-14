/**
 * RossoMix — Calculadora Interactiva de Hormigón
 * Powered by taste-skill & engineering precision
 */

// Función para manejar el cambio entre pestañas
function openCalc(evt, calcName) {
  // Ocultar todos los contenidos de las pestañas
  const calcContent = document.getElementsByClassName("calc-content");
  for (let i = 0; i < calcContent.length; i++) {
    calcContent[i].style.display = "none";
  }

  // Desactivar todos los botones de las pestañas
  const tabButtons = document.getElementsByClassName("calc-tab-btn");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  // Compatibilidad con clase antigua si existiera
  const legacyTabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < legacyTabButtons.length; i++) {
    legacyTabButtons[i].classList.remove("active");
  }

  // Mostrar el contenido de la pestaña seleccionada y activar el botón
  const targetContent = document.getElementById(calcName);
  if (targetContent) {
    targetContent.style.display = "block";
  }
  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add("active");
  }
}

// Función para mostrar el resultado formateado
function mostrarResultado(elementId, volumen, tipoEstructura) {
  const resultadoDiv = document.getElementById(elementId);
  if (!resultadoDiv) return;

  if (isNaN(volumen) || volumen <= 0) {
    resultadoDiv.style.display = "block";
    resultadoDiv.innerHTML = `
      <div style="color: #dc2626; font-weight: 600; padding: 12px; background: #fef2f2; border-radius: 8px;">
        <i class="fa-solid fa-triangle-exclamation me-1"></i> Por favor, ingresá dimensiones válidas mayores a cero.
      </div>
    `;
    return;
  }

  // Recomendación técnica: 7% de margen por asentamiento y desperdicio en obra
  const volumenRecomendado = volumen * 1.07;
  const estructuraNombre = tipoEstructura || "estructura";
  const whatsappMsg = encodeURIComponent(
    `Hola RossoMix! Realicé el cálculo en su web para una ${estructuraNombre}. Volumen neto: ${volumen.toFixed(2)} m³, con 7% recomendado: ${volumenRecomendado.toFixed(2)} m³. Quisiera solicitar cotización y consultar disponibilidad de entrega.`
  );
  const whatsappUrl = `https://wa.me/5493814146366?text=${whatsappMsg}`;

  resultadoDiv.style.display = "block";
  resultadoDiv.innerHTML = `
    <div class="result-headline">Estimación de Material Requerido</div>
    <div class="result-volume">${volumen.toFixed(2)} <span style="font-size: 1.5rem; color: #64748b; font-weight: 600;">m³ netos</span></div>
    <div class="result-note">
      Volumen recomendado con <strong>7% de reserva</strong> por compactación y encofrado:
      <strong style="color: #102a83; font-size: 1.15rem; display: block; margin-top: 4px;">${volumenRecomendado.toFixed(2)} m³</strong>
    </div>
    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-quote">
      <i class="fa-brands fa-whatsapp fa-lg"></i> Pedir Cotización Directa con este Cálculo
    </a>
  `;

  // Scroll suave hacia el resultado si está en vista reducida
  resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Cálculo para Losa / Platea
function calcularLosa() {
  const largo = parseFloat(document.getElementById('losa-largo')?.value);
  const ancho = parseFloat(document.getElementById('losa-ancho')?.value);
  const espesor = parseFloat(document.getElementById('losa-espesor')?.value);

  if (isNaN(largo) || isNaN(ancho) || isNaN(espesor)) {
    mostrarResultado('resultadoLosa', NaN);
    return;
  }

  const espesorEnMetros = espesor / 100;
  const volumen = largo * ancho * espesorEnMetros;
  mostrarResultado('resultadoLosa', volumen, "Losa / Platea");
}

// Cálculo para Columnas
function calcularColumna() {
  const altura = parseFloat(document.getElementById('columna-altura')?.value);
  const diametro = parseFloat(document.getElementById('columna-diametro')?.value);
  const cantidad = parseInt(document.getElementById('columna-cantidad')?.value || '1', 10);

  if (isNaN(altura) || isNaN(diametro) || isNaN(cantidad)) {
    mostrarResultado('resultadoColumna', NaN);
    return;
  }

  const radioEnMetros = (diametro / 100) / 2;
  const volumenPorColumna = Math.PI * Math.pow(radioEnMetros, 2) * altura;
  const volumenTotal = volumenPorColumna * cantidad;
  mostrarResultado('resultadoColumna', volumenTotal, `${cantidad} Columna(s)`);
}

// Cálculo para Vigas
function calcularViga() {
  const largo = parseFloat(document.getElementById('viga-largo')?.value);
  const ancho = parseFloat(document.getElementById('viga-ancho')?.value);
  const alto = parseFloat(document.getElementById('viga-alto')?.value);

  if (isNaN(largo) || isNaN(ancho) || isNaN(alto)) {
    mostrarResultado('resultadoViga', NaN);
    return;
  }

  const anchoEnMetros = ancho / 100;
  const altoEnMetros = alto / 100;
  const volumen = largo * anchoEnMetros * altoEnMetros;
  mostrarResultado('resultadoViga', volumen, "Viga / Encadenado");
}