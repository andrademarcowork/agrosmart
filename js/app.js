/* =========================================================
   ELEMENTOS DA PÁGINA
========================================================= */

const grid =
  document.getElementById("cropGrid");

const details =
  document.getElementById("details");

const locationBtn =
  document.getElementById("locationBtn");

const locationName =
  document.getElementById("locationName");

const locationStatus =
  document.getElementById("locationStatus");

const weatherPanel =
  document.getElementById("weatherPanel");


/* =========================================================
   CRIA OS CARDS DAS CULTURAS
========================================================= */

grid.innerHTML = CULTIVOS.map(c => {

  return `
    <button
      class="crop-card"
      onclick="showCrop('${c.id}')"
    >

      <img
        src="${c.img}"
        alt="${c.name}"
        loading="lazy"
      >

      <div class="crop-body">

        <h3>
          ${c.emoji} ${c.name}
        </h3>

        <span>
          Ver recomendações →
        </span>

      </div>

    </button>
  `;

}).join("");


/* =========================================================
   MOSTRA INFORMAÇÕES DA CULTURA
========================================================= */

function showCrop(id) {

  const c =
    CULTIVOS.find(
      x => x.id === id
    );

  if (!c) {
    return;
  }


  details.style.display = "block";


  details.innerHTML = `

    <div class="detail-wrap">

      <div class="detail-image">

        <img
          src="${c.img}"
          alt="${c.name}"
        >

      </div>


      <div class="detail-content">

        <button
          class="close"
          onclick="details.style.display='none'"
        >
          ×
        </button>


        <div class="eyebrow">
          RECOMENDAÇÃO PARA O CULTIVO
        </div>


        <h2>
          ${c.emoji} ${c.name}
        </h2>


        <p class="detail-sub">
          Informações gerais para orientar
          o manejo da irrigação.
        </p>


        <div class="metrics">


          <div class="metric">

            💧

            <small>
              Frequência de rega
            </small>

            <strong>
              ${c.water}
            </strong>

          </div>


          <div class="metric">

            🌡️

            <small>
              Faixa recomendada
            </small>

            <strong>
              ${c.temp}
            </strong>

          </div>


          <div class="metric">

            ❄️

            <small>
              Temperatura mínima
            </small>

            <strong>
              ${c.min}
            </strong>

          </div>


          <div class="metric">

            ☀️

            <small>
              Temperatura máxima
            </small>

            <strong>
              ${c.max}
            </strong>

          </div>


        </div>


        <div class="water">

          <strong>
            💧 Necessidade de água:
            ${c.level}
          </strong>

          <br>

          Use a umidade real do solo como
          referência antes de irrigar.

        </div>


        <div class="tip">

          <strong>
            💡 Dica para economizar água
          </strong>

          ${c.tip}

        </div>


        <p class="note">

          * Valores orientativos. Variedade,
          fase da cultura, tipo de solo,
          clima, chuva e sistema de irrigação
          podem alterar a necessidade real.

        </p>


      </div>

    </div>

  `;


  details.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================================
   BOTÃO DE LOCALIZAÇÃO
========================================================= */

locationBtn.addEventListener(
  "click",
  getLocation
);


/* =========================================================
   OBTÉM GPS / LOCALIZAÇÃO
========================================================= */

function getLocation() {

  if (!navigator.geolocation) {

    locationStatus.textContent =
      "Seu navegador não oferece geolocalização.";

    return;
  }


  locationBtn.disabled = true;

  locationBtn.textContent =
    "📡 Obtendo localização...";


  locationStatus.textContent =
    "Aguardando permissão do aparelho...";


  navigator.geolocation.getCurrentPosition(

    position => {

      const latitude =
        position.coords.latitude;

      const longitude =
        position.coords.longitude;


      loadWeather(
        latitude,
        longitude
      );

    },


    error => {

      locationBtn.disabled = false;

      locationBtn.textContent =
        "📍 Tentar novamente";


      let message =
        "Não foi possível obter sua localização.";


      if (error.code === 1) {

        message =
          "Permissão de localização negada. " +
          "Libere o acesso nas configurações " +
          "do navegador.";

      }


      if (error.code === 2) {

        message =
          "A localização não está disponível.";

      }


      if (error.code === 3) {

        message =
          "A localização demorou muito para responder.";

      }


      locationStatus.textContent =
        message;

    },


    {
      enableHighAccuracy: true,

      timeout: 15000,

      maximumAge: 300000
    }

  );

}


/* =========================================================
   CONSULTA OPEN-METEO
========================================================= */

async function loadWeather(
  latitude,
  longitude
) {

  locationStatus.textContent =
    `Coordenadas: ${latitude.toFixed(4)}, ` +
    `${longitude.toFixed(4)}`;


  /*
    URL principal da API Open-Meteo
  */

  const url =
    new URL(
      "https://api.open-meteo.com/v1/forecast"
    );


  /*
    Coordenadas
  */

  url.searchParams.set(
    "latitude",
    latitude
  );

  url.searchParams.set(
    "longitude",
    longitude
  );


  /*
    Dados atuais
  */

  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "wind_speed_10m"
    ].join(",")
  );


  /*
    Dados horários
  */

  url.searchParams.set(
    "hourly",
    [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation_probability",
      "precipitation",
      "weather_code"
    ].join(",")
  );


  /*
    Dados diários
  */

  url.searchParams.set(
    "daily",
    [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "precipitation_probability_max",
      "weather_code"
    ].join(",")
  );


  /*
    Previsão de 3 dias
  */

  url.searchParams.set(
    "forecast_days",
    "3"
  );


  /*
    Timezone automático
  */

  url.searchParams.set(
    "timezone",
    "auto"
  );


  try {

    const response =
      await fetch(url);


    if (!response.ok) {

      throw new Error(
        "Falha ao consultar Open-Meteo."
      );

    }


    const data =
      await response.json();


    renderWeather(
      data,
      latitude,
      longitude
    );


    locationBtn.disabled = false;

    locationBtn.textContent =
      "🔄 Atualizar clima";


  } catch (error) {

    console.error(error);


    locationBtn.disabled = false;

    locationBtn.textContent =
      "📍 Tentar novamente";


    locationStatus.textContent =
      "Não foi possível consultar o clima agora.";


    weatherPanel.innerHTML = `

      <div class="weather-placeholder">

        <div class="placeholder-icon">
          ⚠️
        </div>

        <h3>
          Erro ao consultar o clima
        </h3>

        <p>
          Verifique sua conexão com a internet
          e tente novamente.
        </p>

      </div>

    `;

  }

}


/* =========================================================
   MOSTRA DADOS DO CLIMA
========================================================= */

function renderWeather(
  data,
  latitude,
  longitude
) {

  const current =
    data.current;

  const daily =
    data.daily;


  const weather =
    weatherLabel(
      current.weather_code
    );


  /*
    Nome da localização

    Neste primeiro momento usamos o timezone
    fornecido pelo Open-Meteo.

    Depois podemos adicionar uma API de
    geocodificação para mostrar:

    "Viçosa - MG"
  */

  locationName.textContent =
    `📍 Sua região · ${data.timezone}`;


  locationStatus.textContent =
    `Atualizado em ${formatTime(current.time)} · ` +
    `Dados meteorológicos: Open-Meteo`;


  /*
    Monta previsão
  */

  let forecast = "";


  for (
    let i = 0;
    i < 3;
    i++
  ) {

    const weatherDay =
      weatherLabel(
        daily.weather_code[i]
      );


    forecast += `

      <div class="forecast-item">

        <small>
          ${formatDate(daily.time[i])}
        </small>


        <b>
          ${weatherDay.icon}
          ${weatherDay.text}
        </b>


        <span>
          ${Math.round(
            daily.temperature_2m_min[i]
          )}°

          /

          ${Math.round(
            daily.temperature_2m_max[i]
          )}°
        </span>


        <small>
          🌧️
          ${daily.precipitation_probability_max[i] ?? 0}%

          ·

          ${Number(
            daily.precipitation_sum[i] ?? 0
          ).toFixed(1)}

          mm
        </small>

      </div>

    `;

  }


  /*
    Atualiza painel
  */

  weatherPanel.innerHTML = `

    <div class="weather-card">

      <div class="icon">
        ${weather.icon}
      </div>

      <small>
        Condição atual
      </small>

      <strong>
        ${weather.text}
      </strong>

    </div>


    <div class="weather-card">

      <div class="icon">
        🌡️
      </div>

      <small>
        Temperatura
      </small>

      <strong>
        ${Math.round(
          current.temperature_2m
        )}°C
      </strong>

      <br>

      <small>
        Sensação
        ${Math.round(
          current.apparent_temperature
        )}°C
      </small>

    </div>


    <div class="weather-card">

      <div class="icon">
        💧
      </div>

      <small>
        Umidade do ar
      </small>

      <strong>
        ${current.relative_humidity_2m}%
      </strong>

    </div>


    <div class="weather-card">

      <div class="icon">
        🌧️
      </div>

      <small>
        Chuva agora
      </small>

      <strong>
        ${Number(
          current.precipitation ?? 0
        ).toFixed(1)} mm
      </strong>

      <br>

      <small>
        Vento
        ${Math.round(
          current.wind_speed_10m
        )} km/h
      </small>

    </div>


    <div class="forecast">

      ${forecast}

    </div>

  `;

}


/* =========================================================
   CÓDIGOS METEOROLÓGICOS
========================================================= */

function weatherLabel(code) {

  const map = {

    0: ["☀️", "Céu limpo"],

    1: ["🌤️", "Principalmente limpo"],

    2: ["⛅", "Parcialmente nublado"],

    3: ["☁️", "Nublado"],

    45: ["🌫️", "Neblina"],

    48: ["🌫️", "Neblina"],

    51: ["🌦️", "Garoa leve"],

    53: ["🌦️", "Garoa"],

    55: ["🌧️", "Garoa forte"],

    61: ["🌦️", "Chuva leve"],

    63: ["🌧️", "Chuva"],

    65: ["🌧️", "Chuva forte"],

    71: ["🌨️", "Neve leve"],

    73: ["🌨️", "Neve"],

    75: ["❄️", "Neve forte"],

    80: ["🌦️", "Pancadas leves"],

    81: ["🌧️", "Pancadas"],

    82: ["⛈️", "Pancadas fortes"],

    95: ["⛈️", "Trovoada"],

    96: ["⛈️", "Trovoada com granizo"],

    99: ["⛈️", "Trovoada com granizo"]

  };


  const result =
    map[code] ||
    ["🌡️", "Condição desconhecida"];


  return {

    icon: result[0],

    text: result[1]

  };

}


/* =========================================================
   FORMATA HORÁRIO
========================================================= */

function formatTime(time) {

  return new Date(
    time
  ).toLocaleTimeString(
    "pt-BR",
    {
      hour: "2-digit",
      minute: "2-digit"
    }
  );

}


/* =========================================================
   FORMATA DATA
========================================================= */

function formatDate(date) {

  return new Date(
    date + "T12:00:00"
  ).toLocaleDateString(
    "pt-BR",
    {
      weekday: "short",
      day: "2-digit",
      month: "2-digit"
    }
  );

}
