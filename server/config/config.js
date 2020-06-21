// ============================ Puerto
process.env.PORT = process.env.PORT || 3000;


// ============================ Entorno
process.env.NODE_ENV = process.env.NODE_ENV || "dev";


// ========= BD =========
let urlDB;

if (process.env.NODE_ENV === "dev") {
  // BD_LOCAL
  urlDB = "mongodb://localhost:27017/cafe";

} else {
  //BD_REMOTA
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


// ========= vencimiento token =========
// { expiresIn: 60 * 60 * 24 * 30 } ); //espira en  30 dias
// 60 SEGUNDOS, 60 MINUTOS, 24 HORAS, 30 DIAS
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// ========= AUTENTIFICACION TOKEN =========
process.env.SEED =  process.env.SEED || 'smavo';


// ========= GOOGLE CLIENT ID =========
process.env.CLIENT_ID = process.env.CLIENT_ID  || '897602283055-372jtcsq7dmpg57gf65aepueukj5jnun.apps.googleusercontent.com';

