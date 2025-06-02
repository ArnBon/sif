const { response } = require('express');
const Persona = require('../models/personas.model'); 
 
 
 
 /*creamos una funcion para valdiar que la fecha sea la correcta */
 const validarFecha = (fechaStr) => {
    // 1. Verificar si se proporcionó una fecha
    if (!fechaStr) {
        return { valido: false, error: "No se proporcionó ninguna fecha" };
    }

    // 2. Expresión regular para validar el formato dd-mm-yyyy
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;

    // 3. Verificar formato básico
    if (!regex.test(fechaStr)) {
        return { 
            valido: false, 
            error: "Formato de fecha inválido. Debe ser dd-mm-yyyy (ej: 25-12-2023)" 
        };
    }

    // 4. Extraer componentes
    const [dia, mes, anio] = fechaStr.split('-').map(Number);

    // 5. Validar año (ejemplo: entre 1900 y 2100)
    if (anio < 1900 || anio > 2100) {
        return { 
            valido: false, 
            error: "Año fuera de rango válido (1900-2100)" 
        };
    }

    // 6. Crear objeto Date para validación avanzada
    const fechaObj = new Date(anio, mes - 1, dia);

    // 7. Validar coherencia de la fecha
    if (fechaObj.getFullYear() !== anio || 
        fechaObj.getMonth() !== (mes - 1) || 
        fechaObj.getDate() !== dia) {
        return { 
            valido: false, 
            error: "Fecha no válida (ej: 31-04-2023 no existe)" 
        };
    }

    // 8. Validar fecha no futura (opcional)
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaObj > hoy) {
        return { 
            valido: false, 
            error: "La fecha no puede ser futura" 
        };
    }

    // Si pasa todas las validaciones
    return { valido: true, error: null };
};

// Middleware para parsear fecha de nacimiento al crear persona
const parsearFechaNacimientoCrear = (req, res, next) => {
    const { fecha_nac } = req.body;

    if (fecha_nac) {
        const validacion = validarFecha(fecha_nac);
        
        if (!validacion.valido) {
            return res.status(400).json({
                ok: false,
                msg: validacion.error // Mensaje específico del error
            });
        }

        const [dia, mes, anio] = fecha_nac.split('-');
        req.body.fecha_nac = new Date(`${anio}-${mes}-${dia}`);
    }
    next();
};

// Middleware para parsear fecha de nacimiento al actualizar persona
const parsearFechaNacimientoActualizar = (req, res, next) => {
    if (req.body.fecha_nac) {
        const validacion = validarFecha(req.body.fecha_nac);
        
        if (!validacion.valido) {
            return res.status(400).json({
                ok: false,
                msg: validacion.error // Mensaje específico del error
            });
        }

        const [dia, mes, anio] = req.body.fecha_nac.split('-');
        req.body.fecha_nac = new Date(`${anio}-${mes}-${dia}`);
    }
    next();
};

// Middleware para formatear la respuesta de fechas
/*const formatearFechaRespuesta = (req, res, next) => {
    const originalJson = res.json;
    
    res.json = function(data) {
        if (data.persona) {
            // Para respuestas de una sola persona
            const formatearFecha = (fecha) => {
                if (!fecha) return null;
                const dia = String(fecha.getDate()).padStart(2, '0');
                const mes = String(fecha.getMonth() + 1).padStart(2, '0');
                const anio = fecha.getFullYear();
                return `${dia}-${mes}-${anio}`;
            };

            const personaFormateada = {
                ...data.persona.toObject ? data.persona.toObject() : data.persona,
                fecha_nac: data.persona.fecha_nac ? 
                    formatearFecha(data.persona.fecha_nac) : null
            };

            data.persona = personaFormateada;
        } else if (Array.isArray(data)) {
            // Para arrays de personas
            data = data.map(persona => {
                const formatearFecha = (fecha) => {
                    if (!fecha) return null;
                    const dia = String(fecha.getDate()).padStart(2, '0');
                    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
                    const anio = fecha.getFullYear();
                    return `${dia}-${mes}-${anio}`;
                };

                return {
                    ...persona.toObject ? persona.toObject() : persona,
                    fecha_nac: persona.fecha_nac ? 
                        formatearFecha(persona.fecha_nac) : null
                };
            });
        }
        
        originalJson.call(this, data);
    };
    
    next();
};*/
const formatearFechaRespuesta = (req, res, next) => {
    const originalJson = res.json;
    
    res.json = function(data) {
        const formatearFecha = (fecha) => {
            if (!fecha) return null;
            
            // Si ya está en formato dd-mm-yyyy
            if (typeof fecha === 'string' && /^\d{2}-\d{2}-\d{4}$/.test(fecha)) {
                return fecha;
            }
            
            const date = new Date(fecha);
            if (isNaN(date.getTime())) return null;
            
            const dia = String(date.getDate()).padStart(2, '0');
            const mes = String(date.getMonth() + 1).padStart(2, '0');
            return `${dia}-${mes}-${date.getFullYear()}`;
        };

        // Transformar array de personas
        if (data.personas && Array.isArray(data.personas)) {
            data.personas = data.personas.map(persona => ({
                ...persona.toObject ? persona.toObject() : persona,
                fecha_nac: formatearFecha(persona.fecha_nac)
            }));
        }
        // Transformar objeto individual
        else if (data.persona) {
            data.persona = {
                ...data.persona.toObject ? data.persona.toObject() : data.persona,
                fecha_nac: formatearFecha(data.persona.fecha_nac)
            };
        }

        originalJson.call(this, data);
    };
    
    next();
};

module.exports = {
    parsearFechaNacimientoCrear,
    parsearFechaNacimientoActualizar,
    formatearFechaRespuesta,
    validarFecha
};