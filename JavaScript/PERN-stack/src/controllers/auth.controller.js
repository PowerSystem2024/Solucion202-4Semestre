// import { isValid } from "zod/v3";
import {pool} from "../db.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";

export const signin = (req, res) => {
  res.send("Ingresando al sistema");
};

export const signup = async(req, res) => {

  const {name, email, password} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password,10);    
    const result = await pool.query("INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword]);

    const token = await createAccessToken({id: result.rows[0].id}); // Puedo aqui hacer que guarde lo que quiera, en este caso vamos a decirle que me guarde el id
    // return res.json(result.rows[0])
    res.cookie("token", token, {
        httpOnly: true,
        SameSite: "none",
        maxAge: 60 * 60 * 24 * 1000,
    }); // maxAge seteado en un dia

    return res.json(result.rows[0]);
  } catch (error) {
    // res.send("Falló creación de usuario") // si dejo esta respuesta no se ejecuta el if
    if (error.code === "23505"){
      return res.status(400).json({message: "El correo ya esta registrado"});
    }
  }
};

export const logout = (req, res) => {
    res.send("Cerrando sesión");
};

export const profile = (req, res) => {
    res.send("Perfil de usuario");
};