import { Router } from "express";
import { signin, signup, logout, profile } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/profile", profile);

// router.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   // Aquí iría la lógica de autenticación
//   if (username === "admin" && password === "password") {
//     res.json({ message: "Login exitoso", token: "fake-jwt-token" });
//   } else {
//     res.status(401).json({ message: "Credenciales inválidas" });
//   }
// });

export default router;