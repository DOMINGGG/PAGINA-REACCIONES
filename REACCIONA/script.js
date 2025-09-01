// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://TU_PROJECT_ID.firebaseio.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "NUMERO",
  appId: "APP_ID"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const refReacciones = db.ref("reacciones");

// Escuchar cambios en tiempo real
refReacciones.on("value", (snapshot) => {
  const data = snapshot.val() || {};
  mostrarReacciones(data);
});

// Función para reaccionar
function reaccion(tipo) {
  refReacciones.child(tipo).transaction((actual) => {
    return (actual || 0) + 1;
  });
}

// Mostrar en la página
function mostrarReacciones(data) {
  let texto = "Reacciones: ";
  for (let tipo in data) {
    texto += `${tipo} ${data[tipo]}  `;
  }
  document.getElementById("contador").textContent = texto;
}
