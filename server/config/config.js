// ============================ Puerto
process.env.PORT = process.env.PORT || 3000;


// ============================ Entorno
process.env.NODE_ENV = process.env.NODE_ENV || "dev";


// ========= BD =========
let urlDB;

if (process.env.NODE_ENV || "dev") {
  // BD_LOCAL
  urlDB = "mongodb://localhost:27017/cafe";

} else {
  //BD_REMOTA
  urlDB = "mongodb+srv://smavo:WFIuYEL9YVdHr1zS@cluster0-qf1lr.mongodb.net/cafe";
}

process.env.URLDB = urlDB;