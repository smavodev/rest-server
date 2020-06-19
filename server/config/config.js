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